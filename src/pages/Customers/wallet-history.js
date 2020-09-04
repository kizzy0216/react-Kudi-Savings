import React, { useReducer, useState } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  ButtonGroup,
  DateRangePicker
} from '@kudi-inc/dip'
import { Filters, Content } from 'components/Layout'
import Table from 'components/Table'
import { ChevronLeft, Eye, Close, Reassign } from 'assets/svg'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { getHistoryByPlan } from 'services/customers'
import {
  ParamsReducer,
  DefaultParams,
  formatWalletHistory,
  PlanWalletHistoryTableColumn
} from 'utils/function'
import { TableLoading } from 'components/loading'
import styles from './customers.module.scss'

const WalletHistory = props => {
  let { minimized, id } = props
  let history = useHistory()
  let { url } = useRouteMatch()
  const [focusedInput, setfocusedInput] = useState(null)
  const [showReset, setShowReset] = useState(false)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [endDate, setEndDate] = useState('')
  const [startDate, setStartDate] = useState('')
  const [type, setType] = useState('')
  const [params, setParams] = useReducer(ParamsReducer, DefaultParams)
  let limit = minimized ? 3 : 30
  let formattedData = []
  let totalPage = 0

  const { data, isLoading, error, refetch } = useQuery(
    ['history', { id: id, params: { type, from, to } }],
    getHistoryByPlan
  )

  if (data && data.data) {
    formattedData = formatWalletHistory(data.data.data.list, params.page, limit)
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
          <h3>WALLET HISTORY</h3>

          {props.minimized ? (
            <Button
              icon={<Eye />}
              variant="flat"
              onClick={() =>
                history.push({
                  pathname: `${url}/customer-wallet-history`,
                  state: props.id
                })
              }
            >
              View All
            </Button>
          ) : (
            <div className="flex">
              <div className={styles.Credit}>
                <Button variant="flat" icon={<Reassign />}>
                  Credit Plan
                </Button>
              </div>
              <div className={styles.Debit}>
                <Button variant="flat" icon={<Reassign />}>
                  Debit Plan
                </Button>
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
                <ButtonGroup>
                  <Button active={type === ''} onClick={() => setType('')}>
                    All
                  </Button>
                  <Button
                    active={type === 'DEBIT'}
                    onClick={() => setType('DEBIT')}
                  >
                    Debit
                  </Button>
                  <Button
                    active={type === 'CREDIT'}
                    onClick={() => setType('CREDIT')}
                  >
                    Credit
                  </Button>
                </ButtonGroup>
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
            {data && data.data && (
              <Table
                placeholder="Wallet History"
                column={PlanWalletHistoryTableColumn}
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

export default WalletHistory
