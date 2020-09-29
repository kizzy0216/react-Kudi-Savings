import React, { Fragment, useReducer } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  DateRangePicker
} from '@kudi-inc/dip'
import moment from 'moment'
import { useRouteMatch } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getWithdrawals } from 'services/cashout'
import { Header, Content, Filters } from 'components/Layout'
import Table from 'components/Table'
import Select from 'components/Select'
import styles from './cashout.module.scss'
import { formatData, statusOptions, TableColumns } from './function'
import { ParamsReducer, DefaultParams } from 'utils/function'
import { TableLoading } from 'components/loading'
import { Close, ChevronLeft } from 'assets/svg'
const Cashout = ({ history }) => {
  let { url } = useRouteMatch()
  const [params, setParams] = useReducer(ParamsReducer, DefaultParams)
  let formattedData = []
  let limit = 50
  let totalData = 0
  let totalPage = 0
  const { data, isLoading, error, refetch } = useQuery(
    [
      'Withdrawals',
      {
        page: params.page,
        limit,
        phoneNumber: params.phoneNumber,
        from: params.from,
        to: params.to,
        status: params.status
      }
    ],
    getWithdrawals
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
      setParams({
        type: 'UPDATE_DATE',
        payload: {
          startDate: startDate,
          from: moment(startDate)
            .subtract(1, 'days')
            .format('YYYY-MM-DD HH:mm:ss'),
          showReset: true
        }
      })
    }
    if (endDate) {
      setParams({
        type: 'UPDATE_DATE',
        payload: {
          endDate: endDate,
          to: moment(endDate).format('YYYY-MM-DD HH:mm:ss'),
          showReset: true
        }
      })
    }
  }
  const onFocusChange = focusedInput => {
    setParams({
      type: 'UPDATE_FOCUSEDINPUT',
      payload: focusedInput
    })
  }
  // const handleSearch = ({ target: { value } }) => {
  //   const debounced_doSearch = debounce(() => setPhoneNumber(value), 1000)
  //   debounced_doSearch()
  // }
  return (
    <Fragment>
      <Header>
        <p> Cashout </p>
      </Header>
      <Content className={styles.content}>
        <Card className={styles.contentCard}>
          <CardHeader className={styles.Header}>
            Cash out Requests
            <div className="flex">
              <Filters className={styles.filters}>
                <DateRangePicker
                  onDatesChange={onDatesChange}
                  onFocusChange={onFocusChange}
                  displayFormat="DD/MM/YYYY"
                  focusedInput={params.focusedInput}
                  startDate={params.startDate}
                  endDate={params.endDate}
                  isOutsideRange={() => false}
                />
              </Filters>
              <Select
                active={params.status}
                options={statusOptions}
                onSelect={value =>
                  setParams({
                    type: 'UPDATE_STATUS',
                    payload: { status: value, showReset: true }
                  })
                }
              />
              {params.showReset && (
                <Close
                  className="danger"
                  onClick={() => {
                    setParams({
                      type: 'RESET'
                    })
                  }}
                />
              )}
            </div>
          </CardHeader>
          <CardBody className={styles.Cashout}>
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
                placeholder="cashout"
                data={formattedData}
              />
            )}
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

export default Cashout
