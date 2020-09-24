import React, { Fragment } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { Badge, Card, CardBody, CardHeader } from '@kudi-inc/dip'
import { ChevronLeft } from 'assets/svg'
import { Header, Content } from 'components/Layout'
import styles from '../Cashout/view-cashout.module.scss'
import { ProfileLoading } from 'components/loading'
import { formatCurrency } from 'utils/function'
import { getPlan } from 'services/plans'
import CashoutLog from '../Customers/cashout-log'
import WalletHistory from '../Customers/wallet-history'
import PlanRevenueLog from '../Customers/plan-revenue-log'
import PlanCollections from  '../Customers/plan-collections'

const TransactionDetails = ({ location }) => {
  let history = useHistory()
  let planId = location.state

  let { data, isLoading, error, refetch } = useQuery(
    ['Plan', { id: planId }],
    getPlan
  )

  let plan = data?.data?.data ?? {}

  return (
    <Fragment>
      <Header>
        <p>
          <ChevronLeft role="button" onClick={() => history.goBack()} />
          {plan?.plan?.title} - Plan Overview
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
        <PlanCollections minimized id={planId} />
      </div>
      <div className={styles.DivContent}>
        <PlanRevenueLog minimized id={planId} />
      </div>
      <div className={styles.DivContent}>
        <CashoutLog minimized />
      </div>
      <div className={styles.DivContent}>
        <WalletHistory minimized id={planId} />
      </div>
    </Fragment>
  )
}
export default TransactionDetails
