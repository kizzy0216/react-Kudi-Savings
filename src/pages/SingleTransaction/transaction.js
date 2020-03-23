import React, { Fragment } from 'react'
import moment from 'moment'
import { useQuery } from 'react-query'
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Badge,
  CardFooter
} from '@kudi-inc/dip'
import { SettingsLink, Bin, Eye } from 'assets/svg'
import { Header, Content } from 'components/Layout'
import { getTransaction } from 'services/transactions'
import styles from './singleTransaction.module.scss'
import AgentImg from 'assets/svg/profile-pic.svg'
import { formatCurrency, formatText, fecthImage } from 'utils/function'
import { ProfileLoading } from 'components/loading'
const Transaction = ({ match: { params } }) => {
  const { data, isLoading, error, refetch } = useQuery(
    ['SingleTxn', { id: params.id }],
    getTransaction
  )

  let txn = data && data.data ? data.data.data : {}
  const { data: imageData } = useQuery(
    data && txn && ['Image', { id: txn.user.pictureId }],
    fecthImage
  )
  return (
    <Fragment>
      <Header>
        <p> Transaction Details</p>
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
            <div className={styles.ST}>
              <Card>
                <CardHeader>
                  <div className={styles.STHeader}>
                    <h3> USER INFORMATION</h3>

                    {/* <Button variant="flat" icon={<SettingsLink />}>
                      Edit Profile
                    </Button>
                    <Button variant="flat" icon={<Bin />}>
                      Suspend Agent
                    </Button> */}
                  </div>
                </CardHeader>
                <CardBody className={styles.STBody}>
                  <div className={styles.STBodyGrid}>
                    <div className={styles.STBodyGridProfile}>
                      <img
                        className={styles.FirstBodyGridProfileImg}
                        src={imageData ? imageData.data.medium : AgentImg}
                        alt="agent"
                      />
                    </div>
                    <div className={styles.STBodyGridContainer}>
                      <div>
                        <div className={styles.STBodyGridContent}>
                          <span>Name</span>
                          <span>
                            {formatText(txn.user.firstName)}{' '}
                            {formatText(txn.user.lastName)}
                          </span>
                        </div>
                        <div className={styles.STBodyGridContent}>
                          <span>Phone number</span>
                          <span>{formatText(txn.user.phoneNumber)}</span>
                        </div>
                        <div className={styles.STBodyGridContent}>
                          <span>Gender</span>
                          <span>{formatText(txn.user.gender)}</span>
                        </div>

                        <div className={styles.STBodyGridContent}>
                          <span>BusinessName</span>
                          <span>{formatText(txn.user.businessName)}</span>
                        </div>
                      </div>
                      <div>
                        <div className={styles.STBodyGridContent}>
                          <span>Lga/State</span>
                          <span>
                            {txn && txn.user && txn.user.lga}/
                            {txn && txn.user && txn.user.state}
                          </span>
                        </div>
                        <div className={styles.STBodyGridContent}>
                          <span>Total Saved</span>
                          <span>
                            {txn &&
                              txn.user &&
                              formatCurrency(txn.user.totalSaved)}
                          </span>
                        </div>
                        <div className={styles.STBodyGridContent}>
                          <span>Total Withdrawn</span>
                          <span>
                            {txn &&
                              txn.user &&
                              formatCurrency(txn.user.totalWithdrawn)}
                          </span>
                        </div>

                        <div className={styles.STBodyGridContent}>
                          <span>Market</span>
                          <span>{formatText(txn.user.market.name)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <div className={styles.STHeader}>
                    <h3> Collection & Plan Details</h3>

                    <Badge
                      className={styles.STHeaderBadge}
                      variant={
                        txn &&
                        txn.userPlan &&
                        txn.userPlan.planStatus === 'ACTIVE'
                          ? 'success'
                          : 'danger'
                      }
                    >
                      {formatText(txn.userPlan.planStatus)}
                    </Badge>
                  </div>
                </CardHeader>

                <div className={styles.STBodyGridContainer}>
                  <CardBody className={styles.STBody}>
                    <div className={styles.STBodyFlex}>
                      <span>Amount</span>
                      <span> {formatCurrency(txn.amountCollected)}</span>
                    </div>
                    <div className={styles.STBodyFlex}>
                      <span> Plan</span>
                      <span>
                        {formatText(txn.userPlan.plan.title)} ({' '}
                        {formatCurrency(txn.userPlan.plan.low)} {` - `}
                        {formatCurrency(txn.userPlan.plan.high)} )
                      </span>
                    </div>
                    <div className={styles.STBodyFlex}>
                      <span>Collection Date</span>
                      <span>
                        {moment(txn.collectionDate).format('Do MMM, YYYY')}
                      </span>
                    </div>
                    <div className={styles.STBodyFlex}>
                      <span>Time Created </span>
                      <span>
                        {moment(txn.timeCreated).format('Do MMM, YYYY')}
                      </span>
                    </div>
                    <div className={styles.STBodyFlex}>
                      <span> Collection ID</span>
                      <span>{formatText(txn.collectionId)}</span>
                    </div>
                  </CardBody>
                  <CardBody className={styles.STBody}>
                    <div className={styles.STBodyFlex}>
                      <span>User Plan</span>
                      <span> {formatText(txn.userPlan.title)}</span>
                    </div>
                    <div className={styles.STBodyFlex}>
                      <span>Collection Count</span>
                      <span>{formatText(txn.userPlan.collectionCount)}</span>
                    </div>
                    <div className={styles.STBodyFlex}>
                      <span>Collection Duration</span>
                      <span>{formatText(txn.userPlan.duration)}</span>
                    </div>
                    <div className={styles.STBodyFlex}>
                      <span> Daily Amount</span>
                      <span>{formatCurrency(txn.userPlan.dailyAmount)}</span>
                    </div>
                    <div className={styles.STBodyFlex}>
                      <span> Last Collection Date</span>
                      <span>
                        {moment(txn.userPlan.plan.lastCollectionDate).format(
                          'Do MMM, YYYY'
                        )}
                      </span>
                    </div>
                  </CardBody>
                </div>
              </Card>
            </div>
          </div>
        )}
      </Content>
    </Fragment>
  )
}
export default Transaction
