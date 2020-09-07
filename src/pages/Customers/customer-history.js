import React, { Fragment } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import {
  Card,
  CardHeader,
  CardBody,
  Badge
} from '@kudi-inc/dip'
import { ProfileLoading } from 'components/loading'
import { Header, Content } from 'components/Layout'
import { ChevronLeft, Close } from 'assets/svg'
import styles from './customer-profile.module.scss'
import { getPlan } from 'services/plans'
import { formatCurrency } from 'utils/function'
import PlanCollections from './plan-collections'
import PlanRevenueLog from './plan-revenue-log'
import CashoutLog from './cashout-log'
import WalletHistory from './wallet-history'

const CustomerHistory = ({ history, match: { params } }) => {
  let limit = 50
  let totalData = 0
  let totalPage = 0
  let formattedData = []

  let { data, isLoading, error, refetch } = useQuery(
    ['Plan', { id: params.planId }],
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
        <PlanCollections minimized />
      </div>
      <div className={styles.DivContent}>
        <PlanRevenueLog minimized id={params.planId} />
      </div>
      <div className={styles.DivContent}>
        <CashoutLog minimized />
      </div>
      <div className={styles.DivContent}>
        <WalletHistory minimized id={params.planId}/>
      </div>
    </Fragment>
  )
}
export default CustomerHistory
