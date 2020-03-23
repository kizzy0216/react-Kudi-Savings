import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
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
import { ChevronLeft, Close } from 'assets/svg'
import styles from './transactions.module.scss'
import { getTransactions } from 'services/transactions'
import { TableLoading } from 'components/loading'
import { formatData } from './function'

const Transactions = ({ history }) => {
  let { url } = useRouteMatch()
  const [page, setPage] = useState(1)
  const [startDate, setStartDate] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [endDate, setEndDate] = useState('')
  const [showReset, setShowReset] = useState(false)
  const [focusedInput, setfocusedInput] = useState(null)
  let limit = 50
  let totalData = 0
  let totalPage = 0
  let formattedData = []

  const { data, isLoading, error, refetch } = useQuery(
    ['Transactions', { page, limit, from, to }],
    getTransactions
  )
  if (data && data.data) {
    formattedData = formatData(data.data.data.list, history, url, page, limit)
    totalPage = Math.ceil(data.data.data.total / limit)
    totalData = data.data.data.total
  }

  const onDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate)
    setEndDate(endDate)
    setFrom(moment(startDate).format('YYYY-MM-DD HH:mm:ss'))
    setTo(moment(endDate).format('YYYY-MM-DD HH:mm:ss'))
    setShowReset(true)
  }

  const onFocusChange = focusedInput => {
    setfocusedInput(focusedInput)
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
              <Filters className={styles.filters}>
                <DateRangePicker
                  onDatesChange={onDatesChange}
                  onFocusChange={onFocusChange}
                  displayFormat="DD MMM, YY"
                  focusedInput={focusedInput}
                  startDate={startDate}
                  endDate={endDate}
                  isOutsideRange={() => false}
                />
              </Filters>
              {showReset && (
                <Close
                  className="danger"
                  onClick={() => {
                    setFrom('')
                    setTo('')
                    setStartDate('')
                    setEndDate('')
                    return setShowReset(false)
                  }}
                />
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
                  column={[
                    { key: 'sN', render: 'S/N' },
                    {
                      key: 'marketName',
                      render: 'Market'
                    },
                    { key: 'agentName', render: 'DSA' },
                    {
                      key: 'plan',
                      render: 'Plan'
                    },
                    {
                      key: 'amount',
                      render: 'Amount'
                    },
                    {
                      key: 'totalAmountSaved',
                      render: 'Total Saved'
                    },
                    { key: 'timeCreated', render: 'Date Created' },
                    { key: 'collectionDate', render: 'Collection Date' },
                    { key: 'action', render: 'action' }
                  ]}
                  placeholder="transactions"
                  data={formattedData}
                />
              )}
            </div>
          </CardBody>
          {data && (
            <div className="pagination">
              {page > 1 && (
                <Button
                  variant="flat"
                  onClick={() => setPage(page - 1)}
                  icon={<ChevronLeft />}
                ></Button>
              )}
              <p>
                Page {page} of {totalPage}
              </p>
              {formattedData.length === limit && (
                <Button
                  variant="flat"
                  onClick={() => setPage(page + 1)}
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
