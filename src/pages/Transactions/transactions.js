import React, { Fragment, useReducer, useState } from 'react'
import { debounce } from 'lodash'
import moment from 'moment'
import { useQuery } from 'react-query'
import { toaster } from 'evergreen-ui'
import fileDownload from 'js-file-download'

import {
  Card,
  CardBody,
  CardHeader,
  Button,
  DateRangePicker
} from '@kudi-inc/dip'
import { useRouteMatch } from 'react-router-dom'
import { Header, Content, Filters } from 'components/Layout'
import Table from 'components/Table'
import { ChevronLeft, Close, DownloadIcon, Search } from 'assets/svg'
import styles from './transactions.module.scss'
import { getTransactions, downloadTransaction } from 'services/transactions'
import { TableLoading } from 'components/loading'
import { formatData, TableColumns } from './function'
import { ParamsReducer, DefaultParams } from 'utils/function'

const Transactions = ({ history }) => {
  let { url } = useRouteMatch()
  const initialStartDate = moment().subtract(29, 'days')
  const initialEndDate = moment()
  const initialFrom = initialStartDate.format('YYYY-MM-DD HH:mm:ss')
  const initialTo = initialEndDate.format('YYYY-MM-DD HH:mm:ss')
  const [from, setFrom] = useState(initialFrom)
  const [to, setTo] = useState(initialTo)
  const [endDate, setEndDate] = useState(initialEndDate)
  const [startDate, setStartDate] = useState(initialStartDate)
  const [params, setParams] = useReducer(ParamsReducer, DefaultParams)
  const [focusedInput, setfocusedInput] = useState(null)
  const [showReset, setShowReset] = useState(false)
  let limit = 50
  let totalData = 0
  let totalPage = 0
  let formattedData = []

  const { data, isLoading, error, refetch } = useQuery(
    [
      'Transactions',
      {
        page: params.page,
        limit,
        from,
        to,
        phoneNumber: params.phoneNumber
      }
    ],
    getTransactions
  )

  if (data && data.data) {
    formattedData = formatData(
      data.data.data.list,
      history,
      url,
      params.page,
      limit
    )
    totalPage = Math.ceil(data.data.data.total / limit)
    totalData = data.data.data.total
  }

  const onDatesChange = ({ startDate, endDate }) => {
    if (startDate) {
      setStartDate(startDate)
      setFrom(
        moment(startDate)
          .subtract(12, 'hours')
          .format('YYYY-MM-DD HH:mm:ss')
      )
    }
    if (endDate) {
      setEndDate(endDate)
      setTo(
        moment(endDate)
          .add(11, 'hours')
          .add(59, 'minutes')
          .add(59, 'seconds')
          .format('YYYY-MM-DD HH:mm:ss')
      )
    }
    setShowReset(true)
  }

  const onFocusChange = focusedInput => {
    setfocusedInput(focusedInput)
  }

  const handleDownload = async e => {
    try {
      e.preventDefault()
      toaster.success('Please wait, file download in process')
      const response = await downloadTransaction({
        to: params.to,
        from: params.from,
        page: params.page,
        limit
      })
      fileDownload(response.data, 'transactions.csv')
    } catch (e) {
      toaster.danger('Download failed')
      return
    }
  }
  const handleSearch = ({ target: { value } }) => {
    const debounced_doSearch = debounce(
      () => setParams({ type: 'UPDATE_PHONENUMBER', payload: value }),
      1000
    )
    debounced_doSearch()
  }
  return (
    <Fragment>
      <Header>
        <p> Transactions </p>
      </Header>
      <Content className={styles.content}>
        <Card className={styles.contentCard}>
          <CardHeader className={styles.Header}>
            <h3>
              Transaction History
              {totalData ? ` - ${totalData.toLocaleString()}` : ''}
            </h3>
            <div className="flex">
              {/* <input
                value={params.phoneNumber}
                name="phoneNumber"
                placeholder="Search by number"
                onChange={e => handleSearch(e)}
              /> */}
              <div className={[styles.marginSearch, 'header-search'].join('')}>
                <input
                  value={params.phoneNumber}
                  name="phoneNumber"
                  placeholder="Search by Phone number"
                  onChange={e => handleSearch(e)}
                />
                {params.phoneNumber.length > 1 ? (
                  <Close
                    className="danger"
                    onClick={() => {
                      setParams({ type: 'UPDATE_PHONENUMBER', payload: '' })
                    }}
                  />
                ) : (
                  <Search />
                )}
              </div>
              <Filters className={styles.filters}>
                <DateRangePicker
                  onDatesChange={onDatesChange}
                  onFocusChange={onFocusChange}
                  displayFormat="DD/MM/YYYY"
                  focusedInput={focusedInput}
                  startDate={startDate}
                  endDate={endDate}
                  isOutsideRange={() => false}
                />
              </Filters>
              {params.to && params.from && (
                <Button
                  type="button"
                  variant="flat"
                  className={styles.download}
                  onClick={e => handleDownload(e)}
                  icon={<DownloadIcon />}
                >
                  Download Result (Page {params.page})
                </Button>
              )}
              {showReset && (
                <Button
                  type="button"
                  variant="flat"
                  className={styles.danger}
                  onClick={() => {
                    setFrom('')
                    setTo('')
                    setStartDate('')
                    setEndDate('')
                    return setShowReset(false)
                  }}
                  icon={<Close />}
                >
                  Clear
                </Button>
              )}
            </div>
          </CardHeader>
          <CardBody className={styles.Transactions}>
            <div className={styles.TransactionsHeader}>
              {isLoading && <TableLoading />}
              {error && (
                <span>
                  Error!
                  <button onClick={() => refetch({ disableThrow: true })}>
                    Retry
                  </button>
                </span>
              )}
              {data && (
                <Table
                  column={TableColumns}
                  placeholder="transactions"
                  data={formattedData}
                />
              )}
            </div>
          </CardBody>
          {data && (
            <div className="pagination">
              {params.page > 1 && (
                <Button
                  variant="flat"
                  onClick={() =>
                    setParams({
                      type: 'UPDATE_PAGE',
                      payload: params.page - 1
                    })
                  }
                  icon={<ChevronLeft />}
                ></Button>
              )}
              <p>
                Page {params.page} of {totalPage}
              </p>
              {formattedData.length === limit && (
                <Button
                  variant="flat"
                  onClick={() =>
                    setParams({
                      type: 'UPDATE_PAGE',
                      payload: params.page + 1
                    })
                  }
                ></Button>
              )}
            </div>
          )}
        </Card>
      </Content>
    </Fragment>
  )
}

export default Transactions
