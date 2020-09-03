import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import {
  Card,
  CardHeader,
  CardBody,
  Badge,
  DateRangePicker,
  Button,
  ButtonGroup
} from '@kudi-inc/dip'
import { ProfileLoading } from 'components/loading'
import { Header, Content } from 'components/Layout'
import { ChevronLeft, Close } from 'assets/svg'
import styles from './customer-profile.module.scss'
import { getPlan } from 'services/plans'
import { formatCurrency, } from 'utils/function'
import PlanCollections from './plan-collections'
import PlanRevenueLog from './plan-revenue-log'
import CashoutLog from './cashout-log'
import WalletHistory from './wallet-history'

const CustomerHistory = ({ history, match: { params } }) => {
  const [page, setPage] = useState(1)
  const [type, setType] = useState('')
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
  // const { data, isLoading, error, refetch } = useQuery(
  //   params && [
  //     'CustomerHistory',
  //     { id: params.planId, params: { page, limit, type, from, to } }
  //   ],
  //   getHistoryByPlan
  // )
  let { data, isLoading, error, refetch } = useQuery(
    ['Plan', { id: params.planId }],
    getPlan
  )

  let plan = data && data.data ? data.data.data : {}

  // if (data && data.data) {
  //   formattedData = formatWalletData(data.data.data.list, page, limit)
  //   totalPage = Math.ceil(data.data.data.total / limit)
  //   totalData = data.data.data.total
  // }
  // const onDatesChange = ({ startDate, endDate }) => {
  //   if (startDate) {
  //     setStartDate(startDate)
  //     setFrom(
  //       moment(startDate)
  //         .subtract(1, 'days')
  //         .format('YYYY-MM-DD HH:mm:ss')
  //     )
  //   }
  //   if (endDate) {
  //     setEndDate(endDate)
  //     setTo(moment(endDate).format('YYYY-MM-DD HH:mm:ss'))
  //   }
  //   setShowReset(true)
  // }

  // const onFocusChange = focusedInput => {
  //   setfocusedInput(focusedInput)
  // }
  return (
    <Fragment>
      <Header>
        <p>
          <ChevronLeft role="button" onClick={() => history.goBack()} />
          {plan && plan.plan && plan.plan.title} - Plan Overview
        </p>
      </Header>
      <Content className={styles.content}>
        {isLoading && <ProfileLoading />}
        {error && (
          <span>
            Error!
            <button onClick={() => refetch({ disableThrow: true })}>
              Retry
            </button>
          </span>
        )}
        {data && data.data && (
          <div className={styles.contentCard}>
            <div className={styles.First}>
              <Card>
                <CardHeader>
                  <div className={styles.FirstHeader}>
                    <h3> PLAN OVERVIEW</h3>
                  </div>
                </CardHeader>
                <CardBody className={styles.FirstBody}>
                  <div className={styles.FirstBodyFlex}>
                    <span>PLAN TITLE</span>
                    <span>{plan.title} </span>
                  </div>

                  <div className={styles.FirstBodyFlex}>
                    <span> COLLECTION COUNT </span>
                    <span>{plan.collectionCount}</span>
                  </div>
                  <div className={styles.FirstBodyFlex}>
                    <span> DURATION</span>
                    <span>{plan.duration} Days</span>
                  </div>
                  <div className={styles.FirstBodyFlex}>
                    <span> DATE CREATED</span>
                    <span>
                      {moment(plan.timeCreated).format('Do MMM, YYYY ')}
                    </span>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <div className={styles.FirstHeader}>
                    <h3> STATUS</h3>

                    {plan && plan.planStatus && (
                      <Badge
                        className={styles.FirstHeaderBadge}
                        variant="success"
                      >
                        {plan.planStatus}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardBody className={styles.FirstBody}>
                  <div className={styles.FirstBodyFlex}>
                    <span>DAILY AMOUNT</span>
                    <span>{formatCurrency(plan.dailyAmount)} </span>
                  </div>
                  <div className={styles.FirstBodyFlex}>
                    <span> AMOUNT SAVED </span>
                    <span>{formatCurrency(plan.amountSaved)}</span>
                  </div>
                  <div className={styles.FirstBodyFlex}>
                    <span> TOTAL WITHDRAWN</span>
                    <span>{formatCurrency(plan.totalWithdrawnAmount)}</span>
                  </div>
                  <div className={styles.FirstBodyFlex}>
                    <span> PLAN BALANCE </span>
                    <span>{formatCurrency(plan.collectionBalance)}</span>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        )}
      </Content>
      <div className={styles.DivContent}>
        <PlanCollections minimized />
      </div>
      <div className={styles.DivContent}>
        <PlanRevenueLog minimized plan={plan} />
      </div>
      <div className={styles.DivContent}>
        <CashoutLog minimized />
      </div>
      <div className={styles.DivContent}>
        <WalletHistory minimized id={params.planId} />
      </div>

      {/* <Content className={styles.content}>
        <Card className={styles.contentCard}>
          <CardHeader className={styles.Header}>
            <h3>
              Customer Transaction
              {totalData ? ` - ${totalData.toLocaleString()}` : ''}
            </h3>
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
              {data && data.data && (
                <Table
                  column={[
                    { key: 'sN', render: 'S/N' },
                    { key: 'transaction_type', render: 'Type' },
                    {
                      key: 'status',
                      render: 'Status'
                    },
                    {
                      key: 'amount',
                      render: 'Amount'
                    },
                    {
                      key: 'wallet_balance',
                      render: 'Balance'
                    },
                    { key: 'time', render: 'Date' }
                  ]}
                  placeholder="customer transaction history"
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
      </Content> */}
    </Fragment>
  )
}
export default CustomerHistory
