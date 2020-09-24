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
import Select from 'components/Select'
import { getWithdrawals } from 'services/cashout'
import { Filters, Content } from 'components/Layout'
import Table from 'components/Table'
import styles from './customers.module.scss'
import { statusOptions } from '../Cashout/function'
import {
  ParamsReducer,
  DefaultParams,
  formatCashoutLog,
  CashoutLogTableColumn
} from 'utils/function'
import { TableLoading } from 'components/loading'
import { Close, ChevronLeft, Eye } from 'assets/svg'

const CashoutLog = props => {
  let { url } = useRouteMatch()
  let { minimized } = props
  let history = useHistory()
  const [focusedInput, setfocusedInput] = useState(null)
  const [showReset, setShowReset] = useState(false)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [endDate, setEndDate] = useState('')
  const [startDate, setStartDate] = useState('')
  const [params, setParams] = useReducer(ParamsReducer, DefaultParams)
  let formattedData = []
  let limit = minimized ? 3 : 50
  let totalPage = 0
  const { data, isLoading, error, refetch } = useQuery(
    [
      'Withdrawals',
      {
        page: params.page,
        limit,
        phoneNumber: params.phoneNumber,
        params: { from, to },
        status: params.status
      }
    ],
    getWithdrawals
  )

  if (data && data.data) {
    formattedData = formatCashoutLog(
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
          .subtract(1, 'days')
          .format('YYYY-MM-DD HH:mm:ss')
      )
    }
    if (endDate) {
      setEndDate(endDate)
      setTo(moment(endDate).format('YYYY-MM-DD HH:mm:ss'))
    }
    setShowReset(true)
  }
  const onFocusChange = focusedInput => {
    setfocusedInput(focusedInput)
  }

  return (
    <Content className={styles.content}>
      <Card className={styles.contentCard}>
        <CardHeader className={styles.ViewAll}>
          <h3>CASHOUT LOG</h3>

          {props.minimized ? (
            <Button
              icon={<Eye />}
              variant="flat"
              onClick={() => history.push(`${url}/customer-cashout-log`)}
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
        <CardBody className={styles.Customers}>
          <div className={styles.CustomersHeader}>
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
                column={CashoutLogTableColumn}
                placeholder="Cashout Logs"
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

export default CashoutLog
