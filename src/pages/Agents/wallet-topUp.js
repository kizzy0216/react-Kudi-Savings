import React, { useState } from 'react'
import { Content, Filters } from 'components/Layout'
import moment from 'moment'
import {
  Card,
  CardHeader,
  Button,
  CardBody,
  DateRangePicker
} from '@kudi-inc/dip'
import styles from './recent-collections.module.scss'
import Table from 'components/Table'
import { useQuery } from 'react-query'
import { walletHistory } from 'services/agents'
import { TableLoading } from 'components/loading'
import { formatWalletData, WalletTopUpTableColumns } from 'utils/function'
import { ChevronLeft, Eye, Close } from 'assets/svg'
import { useRouteMatch, useHistory } from 'react-router-dom'

const WalletTopUp = props => {
  let history = useHistory()
  let { url } = useRouteMatch()
  const [page, setPage] = useState(1)
  const initialStartDate = props.minimized ? ' ' : moment().subtract(29, 'days')
  const initialEndDate = props.minimized ? ' ' : moment()
  const initialFrom = props.minimized
    ? ' '
    : initialStartDate.format('YYYY-MM-DD HH:mm:ss')
  const initialTo = props.minimized
    ? ' '
    : initialEndDate.format('YYYY-MM-DD HH:mm:ss')
  const [from, setFrom] = useState(initialFrom)
  const [to, setTo] = useState(initialTo)
  const [endDate, setEndDate] = useState(initialEndDate)
  const [startDate, setStartDate] = useState(initialStartDate)
  const [showReset, setShowReset] = useState(false)
  const [focusedInput, setfocusedInput] = useState(null)
  let limit = props.minimized ? 3 : 50

  let totalPage = 0
  let formattedData = []
  let type = 'CREDIT'
  const { data, isLoading, error, refetch } = useQuery(
    ['topUp', { id: props.id, params: { page, limit, type, from, to } }],
    walletHistory
  )

  if (data && data.data) {
    formattedData = formatWalletData(data.data.data.list, limit, page)
    totalPage = Math.ceil(data.data.data.total / limit)
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
  return (
    <Content className={styles.content}>
      <Card className={styles.contentCard}>
        <CardHeader className={styles.Header}>
          <h3>WALLET TOP UP</h3>

          {props.minimized ? (
            <Button
              icon={<Eye />}
              variant="flat"
              onClick={() =>
                history.push({
                  pathname: `${url}/view-all-wallet-topup`,
                  state: props.id
                })
              }
            >
              View All
            </Button>
          ) : (
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
          )}
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
                column={WalletTopUpTableColumns}
                placeholder="wallet topUp"
                data={formattedData}
              />
            )}
          </div>
        </CardBody>
        {data &&
          (props.minimized ? (
            <></>
          ) : (
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
          ))}
      </Card>
    </Content>
  )
}

export default WalletTopUp
