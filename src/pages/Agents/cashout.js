import React, { useReducer, useState } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  DateRangePicker
} from '@kudi-inc/dip'
import moment from 'moment'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getWithdrawals } from 'services/cashout'
import { Content, Filters } from 'components/Layout'
import Table from 'components/Table'
import styles from './recent-collections.module.scss'
import Select from 'components/Select'
import {
  CashoutTableColumns,
  formatCashoutData,
  statusOptions
} from 'utils/function'
import { ParamsReducer, DefaultParams } from 'utils/function'
import { TableLoading } from 'components/loading'
import { Close, ChevronLeft, Eye } from 'assets/svg'

const Cashout = props => {
  let history = useHistory()
  let { url } = useRouteMatch()
  const [focusedInput, setfocusedInput] = useState(null)
  const [showReset, setShowReset] = useState(false)
  const initialStartDate =props.minimized ? ' ' : moment().subtract(29, 'days')
  const initialEndDate =props.minimized ? ' ' : moment()
  const initialFrom = initialStartDate.format('YYYY-MM-DD HH:mm:ss')
  const initialTo = initialEndDate.format('YYYY-MM-DD HH:mm:ss')
  const [from, setFrom] = useState(initialFrom)
  const [to, setTo] = useState(initialTo)
  const [endDate, setEndDate] = useState(initialEndDate)
  const [startDate, setStartDate] = useState(initialStartDate)
  const [params, setParams] = useReducer(ParamsReducer, DefaultParams)
  let formattedData = []
  let limit = props.minimized ? 3 : 50
  let totalPage = 0
  const { data, isLoading, error, refetch } = useQuery(
    [
      'Withdrawals',
      {
        page: params.page,
        limit,
        from,
        to,
        status: params.status
      }
    ],
    getWithdrawals
  )
  if (data && data.data) {
    formattedData = formatCashoutData(
      data.data.data.list,
      history,
      url,
      params.page,
      limit
    )
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
          <h3>CASHOUT LOG</h3>

          {props.minimized ? (
            <Button
              icon={<Eye />}
              variant="flat"
              onClick={() => history.push(`${url}/view-all-cashout-logs`)}
            >
              View All
            </Button>
          ) : (
            <div className="flex">
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
                column={CashoutTableColumns}
                placeholder="cashout"
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
                {' '}
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
          ))}
      </Card>
    </Content>
  )
}

export default Cashout
