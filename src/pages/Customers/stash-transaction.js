import React, { Fragment, useState, useReducer } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  DateRangePicker
} from '@kudi-inc/dip'
import Select from 'components/Select'
import { Header, Content, Filters } from 'components/Layout'
import Table from 'components/Table'
import { ChevronLeft, Close } from 'assets/svg'
import { TableLoading } from 'components/loading'
import styles from '../Transactions/transactions.module.scss'
import {
  FormatStashData,
  StashTableColumn,
  stashSourceOptions
} from 'utils/function'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { getStashTransactions } from 'services/stash'
import { SideSheet } from 'evergreen-ui'
import StashTopUpDetails from './transaction-stash-top-up-details'
import PlanTopUpDetails from './transaction-plan-top-up-details'
import CollectionDetails from './transaction-plan-collection-details'
import ReferralDetails from './transaction-referral-details'
import LoanRepaymentDetails from './transaction-loan-repayment-details'
import CashoutDetails from './transaction-cashout-details'
import ReversalDetails from './transaction-reversal-details'

const StashHistory = ({ location }) => {
  let stashId = location.stashId
  let history = useHistory()
  let { url } = useRouteMatch()

  const [page, setPage] = useState(0)
  const [type, setType] = useState('')
  const initialStartDate = moment().subtract(29, 'days')
  const initialEndDate = moment()
  const initialFrom = initialStartDate.format('YYYY-MM-DD')
  const initialTo = initialEndDate.format('YYYY-MM-DD')
  const [from, setFrom] = useState(initialFrom)
  const [to, setTo] = useState(initialTo)
  const [endDate, setEndDate] = useState(initialEndDate)
  const [startDate, setStartDate] = useState(initialStartDate)
  const [showReset, setShowReset] = useState(false)
  const [focusedInput, setfocusedInput] = useState(null)
  const [stashDetails, setStashDetails] = useState({})
  const [showStashDetails, setShowStashDetails] = useState(false)
  const [source, setSource] = useState('')

  let limit = 20
  let formattedData = []
  let totalPage = 0

  const { data, isLoading, error, refetch } = useQuery(
    ['StashTransactions', { to, from, limit, page, type, stashId }],
    getStashTransactions
  )

  if (data?.data?.data) {
    formattedData = FormatStashData(
      data.data.data.list,
      setStashDetails,
      setShowStashDetails,
      setSource
    )
    totalPage = Math.ceil(data.data.data.total / limit)
  }

  const onDatesChange = ({ startDate, endDate }) => {
    if (startDate) {
      setStartDate(startDate)
      setFrom(
        moment(startDate)
          .subtract(12, 'hours')
          .format('YYYY-MM-DD')
      )
    }
    if (endDate) {
      setEndDate(endDate)
      setTo(
        moment(endDate)
          .add(11, 'hours')
          .add(59, 'minutes')
          .add(59, 'seconds')
          .format('YYYY-MM-DD')
      )
    }
    setShowReset(true)
  }

  const onFocusChange = focusedInput => {
    setfocusedInput(focusedInput)
  }

  return (
    <Fragment>
      <Header>
        <p>
          <ChevronLeft role="button" onClick={() => history.goBack()} />
          Stash Transaction History
        </p>
      </Header>
      <Content className={styles.content}>
        <Card className={styles.contentCard}>
          <CardHeader className={styles.Header}>
            <h3>STASH HISTORY</h3>

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
              <Select
                active={type}
                options={stashSourceOptions}
                onSelect={value => setType(value)}
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
          </CardHeader>
          <CardBody className={styles.Transactions}>
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
                column={StashTableColumn}
                placeholder="stash transactions"
                data={formattedData}
              />
            )}
          </CardBody>
          {data && (
            <div className={'pagination'}>
              {page > 0 && (
                <Button
                  variant={'flat'}
                  onClick={() => setPage(page - 1)}
                  icon={<ChevronLeft />}
                ></Button>
              )}
              <p>
                Page {page + 1} of {totalPage}
              </p>
              {formattedData.length === limit && (
                <Button
                  variant={'flat'}
                  onClick={() => setPage(page + 1)}
                ></Button>
              )}
            </div>
          )}
        </Card>
        {stashDetails &&
          (source === 'STASH_TOPUP' ? (
            <SideSheet
              isShown={showStashDetails}
              width={600}
              onCloseComplete={() => setShowStashDetails(false)}
            >
              <StashTopUpDetails stashDetails={stashDetails} />
            </SideSheet>
          ) : source === 'PLAN_TOPUP' ? (
            <SideSheet
              isShown={showStashDetails}
              width={600}
              onCloseComplete={() => setShowStashDetails(false)}
            >
              <PlanTopUpDetails stashDetails={stashDetails} />
            </SideSheet>
          ) : source === 'PLAN_COLLECTION' ? (
            <SideSheet
              isShown={showStashDetails}
              width={600}
              onCloseComplete={() => setShowStashDetails(false)}
            >
              <CollectionDetails stashDetails={stashDetails} />
            </SideSheet>
          ) : source === 'REFERRALS' ? (
            <SideSheet
              isShown={showStashDetails}
              width={600}
              onCloseComplete={() => setShowStashDetails(false)}
            >
              <ReferralDetails stashDetails={stashDetails} />
            </SideSheet>
          ) : source === 'LOAN_REPAYMENT' ? (
            <SideSheet
              isShown={showStashDetails}
              width={600}
              onCloseComplete={() => setShowStashDetails(false)}
            >
              <LoanRepaymentDetails stashDetails={stashDetails} />
            </SideSheet>
          ) : source === 'CASHOUT' ? (
            <SideSheet
              isShown={showStashDetails}
              width={600}
              onCloseComplete={() => setShowStashDetails(false)}
            >
              <CashoutDetails stashDetails={stashDetails} />
            </SideSheet>
          ) : source === 'REVERSAL' ? (
            <SideSheet
              isShown={showStashDetails}
              width={600}
              onCloseComplete={() => setShowStashDetails(false)}
            >
              <ReversalDetails stashDetails={stashDetails} />
            </SideSheet>
          ) : (
            <></>
          ))}
      </Content>
    </Fragment>
  )
}

export default StashHistory
