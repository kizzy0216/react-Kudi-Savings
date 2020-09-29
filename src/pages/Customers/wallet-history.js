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
import { SideSheet } from 'evergreen-ui'
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
import DebitPlan from './debit-plan'
import CreditPlan from './credit-plan'

const WalletHistory = props => {
  let { minimized, id, phone, source } = props
  let history = useHistory()
  let { url } = useRouteMatch()
  const [focusedInput, setfocusedInput] = useState(null)
  const [showReset, setShowReset] = useState(false)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [showDebit, setShowDebit] = useState(false)
  const [showCredit, setShowCredit] = useState(false)
  const [endDate, setEndDate] = useState('')
  const [startDate, setStartDate] = useState('')
  const [type, setType] = useState('')
  const [params, setParams] = useReducer(ParamsReducer, DefaultParams)
  let limit = minimized ? 3 : 30
  let formattedData = []
  let totalPage = 0

  console.log(source)
  const { data, isLoading, error, refetch } = useQuery(
    ['history', { id: id, limit, params: { type, from, to } }],
    getHistoryByPlan
  )
  if (data && data.data) {
    formattedData = formatWalletHistory(data.data.data.list, params.page, limit)
    totalPage = Math.ceil(data.data.data.total / limit)
  }
  let finalFormattedData = formattedData.slice(0, limit)

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
                  phone: phone,
                  state: id,
                  source
                })
              }
            >
              View All
            </Button>
          ) : (
            <div className="flex">
              <>
                {source === 'customer' && (
                  <>
                    <div className={styles.Credit}>
                      <Button
                        variant="flat"
                        icon={<Reassign />}
                        onClick={() => setShowCredit(true)}
                      >
                        Credit Plan
                      </Button>
                    </div>
                    <div className={styles.Debit}>
                      <Button
                        variant="flat"
                        icon={<Reassign />}
                        onClick={() => setShowDebit(true)}
                      >
                        Debit Plan
                      </Button>
                    </div>
                  </>
                )}
              </>
              <Filters className={styles.filters}>
                <DateRangePicker
                  onDatesChange={onDatesChange}
                  displayFormat="DD/MM/YYYY"
                  onFocusChange={onFocusChange}
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
                data={finalFormattedData}
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
      <SideSheet
        onCloseComplete={() => setShowDebit(false)}
        isShown={showDebit}
        width={800}
      >
        <DebitPlan setShowDebit={setShowDebit} id={id} phoneNumber={phone} />
      </SideSheet>
      <SideSheet
        onCloseComplete={() => setShowCredit(false)}
        isShown={showCredit}
        width={800}
      >
        <CreditPlan setShowCredit={setShowCredit} id={id} phoneNumber={phone} />
      </SideSheet>
    </Content>
  )
}

export default WalletHistory
