import React, { Fragment, useState, useContext } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import { Dialog, toaster, SideSheet } from 'evergreen-ui'
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Input
} from '@kudi-inc/dip'
import { getWithdrawal, processWithdrawal } from 'services/cashout'
import {
  Close,
  ChevronLeft,
  Eye,
  Reassign,
  UpdateLink,
  SettingsLink
} from 'assets/svg'
import { Header, Content } from 'components/Layout'
import AuthContext from 'context/AuthContext'
import styles from './view-cashout.module.scss'
import AgentImg from 'assets/svg/profile-pic.svg'
import { ProfileLoading } from 'components/loading'
import { formatCurrency, formatText, fecthImage } from 'utils/function'
import Kyc from './kyc'
import TransferLog from './transfer-log'

const ViewCashout = ({ history, location, match: { params } }) => {
  let transactionType = location.type
  let [auth] = useContext(AuthContext)
  let [isShown, setIsShown] = useState(false)
  let [loading, setLoading] = useState(false)
  let [type, setType] = useState('')
  let [reason, setReason] = useState({ reason: '' })
  let [showKyc, setShowKyc] = useState(false)
  let [showEdit, setShowEdit] = useState(false)
  let [showTransferLog, setShowTransferLog] = useState(false)
  const { data, isLoading, error, refetch } = useQuery(
    ['Withdrawal', { id: params.id }],
    getWithdrawal
  )

  let withdrawal = data?.data?.data || {}

  const { data: imageData } = useQuery(
    ['Image', { id: withdrawal?.user?.pictureId }],
    fecthImage
  )

  const handleWithdrawal = async status => {
    setLoading(true)
    await processWithdrawal(params.id, status, reason)
      .then(({ data }) => {
        setLoading(false)
        toaster.success('Cashout Request Processed')
        refetch({ disableThrow: true })
        setReason({ reason: '' })
        setIsShown(false)
      })
      .catch(data => {
        setLoading(false)

        if (data && data.data.message) return toaster.danger(data.data.message)
        toaster.danger('Withdrawal request failed')
      })
  }
  let dialogContent = {
    approve: {
      title: 'Approve Request',
      content: `Approve the withdrawal request of ${withdrawal &&
        formatCurrency(withdrawal.amount)}`,
      submit: () => handleWithdrawal('APPROVED')
    },
    decline: {
      title: 'Decline Request',
      content: 'Decline the withdrawal request.',
      submit: () => handleWithdrawal('DECLINED')
    },
    cash_delivered: {
      title: 'Update to Cash Delivered',
      content: `Update status of ${withdrawal &&
        formatCurrency(withdrawal.amount)} to cash delivered`,
      submit: () => handleWithdrawal('CASH_DELIVERED')
    }
  }

  return (
    <Fragment>
      <Header className={styles.Header}>
        <p>
          <ChevronLeft onClick={() => history.goBack()} /> Cash Out Request
        </p>

        {['CASH_DELIVERED', 'APPROVED_PENDING_DISBURSEMENT'].includes(
          withdrawal.status
        ) && (
          <Button
            variant="flat"
            onClick={() => setShowTransferLog(true)}
            icon={<Reassign />}
          >
            View Transfer log
          </Button>
        )}
      </Header>
      <Content className={styles.content}>
        {isLoading && <ProfileLoading />}
        {error && (
          <div>
            Error!
            <Button onClick={() => refetch({ disableThrow: true })}>
              Retry
            </Button>
          </div>
        )}
        {data && (
          <div className={styles.contentCard}>
            <div className={styles.First}>
              <Card>
                <CardHeader>
                  <div className={styles.FirstHeader}>
                    <h3> USER INFORMATION </h3>

                    <Button
                      variant="flat"
                      onClick={() => setShowEdit(true)}
                      icon={<SettingsLink />}
                    >
                      Edit Profile
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className={styles.FirstBody}>
                  <div className={styles.FirstBodyGrid}>
                    <div className={styles.FirstBodyGridProfile}>
                      <img
                        className={styles.FirstBodyGridProfileImg}
                        src={imageData?.data?.medium || AgentImg}
                        alt="agent"
                      />
                    </div>
                    <div>
                      <div className={styles.FirstBodyGridContent}>
                        <span>Name</span>
                        <span>
                          {withdrawal.user &&
                            formatText(withdrawal.user.firstName)}{' '}
                          {withdrawal.user &&
                            formatText(withdrawal.user.lastName)}
                        </span>
                      </div>
                      <div className={styles.FirstBodyGridContent}>
                        <span>Phone number</span>
                        <span>
                          {withdrawal.user &&
                            formatText(withdrawal.user.phoneNumber)}
                        </span>
                      </div>
                      <div className={styles.FirstBodyGridContent}>
                        <span>Gender</span>
                        <span>
                          {withdrawal.user &&
                            formatText(withdrawal.user.gender)}
                        </span>
                      </div>

                      <div className={styles.FirstBodyGridContent}>
                        <span>Address</span>
                        <span>
                          {withdrawal.user && formatText(withdrawal.user.lga)}/
                          {withdrawal.user && formatText(withdrawal.user.state)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <div className={styles.FirstHeader}>
                    <h3> Cashout</h3>

                    <Badge
                      className={styles.FirstHeaderBadge}
                      variant={
                        withdrawal.status === 'APPROVED'
                          ? 'primary'
                          : withdrawal.status ===
                            'APPROVED_PENDING_DISBURSEMENT'
                          ? 'warning'
                          : withdrawal.status === 'CASH_DELIVERED'
                          ? 'success'
                          : withdrawal.status === 'DECLINED'
                          ? 'danger'
                          : withdrawal.status === 'PENDING'
                          ? 'warning'
                          : withdrawal.status === 'PENDING_IMAGE_VALIDATION'
                          ? 'warning'
                          : withdrawal.status === 'PENDING_VALIDATION'
                          ? 'warning'
                          : withdrawal.status === 'VOUCHER_REDEEMED'
                          ? 'primary'
                          : withdrawal.status === 'REDEEMED'
                          ? 'primary'
                          : 'warning'
                      }
                    >
                      {withdrawal.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardBody className={styles.FirstBody}>
                  <div className={styles.FirstBodyFlex}>
                    <span>Date:</span>
                    <span> {moment(withdrawal.timeCreated).format('lll')}</span>
                  </div>
                  <div className={styles.FirstBodyFlex}>
                    <span>Amount:</span>
                    <span>{formatCurrency(withdrawal.amount)}</span>
                  </div>
                  <div className={styles.FirstBodyFlex}>
                    <span>Customer:</span>
                    <span>{`${withdrawal.user.firstName} ${withdrawal.user.lastName}`}</span>
                  </div>
                  <div className={styles.FirstBodyFlex}>
                    <span>Transaction Type:</span>
                    <span>{formatText(transactionType)}</span>
                  </div>
                </CardBody>
                {!auth.type.includes('LOANS_MANAGER') && (
                  <>
                    {withdrawal &&
                      withdrawal.status !== 'APPROVED' &&
                      withdrawal.status !== 'DECLINED' &&
                      withdrawal.status !== 'CASH_DELIVERED' && (
                        <CardFooter className={styles.FirstFooter}>
                          <Button
                            onClick={() => {
                              setType('approve')
                              return setIsShown(true)
                            }}
                            type="button"
                          >
                            Approve
                          </Button>
                          <Button
                            variant="flat"
                            onClick={() => {
                              setType('decline')
                              return setIsShown(true)
                            }}
                            type="button"
                            icon={<Close />}
                          >
                            Decline
                          </Button>
                        </CardFooter>
                      )}
                    {withdrawal.status === 'PENDING_IMAGE_VALIDATION' ? (
                      <div className={styles.Kyc}>
                        <Button
                          type="button"
                          variant="flat"
                          icon={<Eye />}
                          onClick={() => setShowKyc(true)}
                        >
                          View KYC
                        </Button>
                      </div>
                    ) : withdrawal.status ===
                      'APPROVED_PENDING_DISBURSEMENT' ? (
                      <CardFooter className={styles.disbursement}>
                        <div className={styles.disbursementActivate}>
                          <Button
                            type="button"
                            variant="flat"
                            onClick={() => {
                              setType('cash_delivered')
                              return setIsShown(true)
                            }}
                            icon={<UpdateLink />}
                          >
                            Update to Cash Delivered
                          </Button>
                        </div>
                        <div className={styles.disbursementDecline}>
                          <Button
                            type="button"
                            variant="flat"
                            onClick={() => {
                              setType('decline')
                              return setIsShown(true)
                            }}
                            icon={<Close />}
                          >
                            Decline
                          </Button>
                        </div>
                      </CardFooter>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </Card>
            </div>
            <div className={styles.Second}>
              <Card>
                <CardHeader>
                  <div className={styles.FirstHeader}>
                    <h3> Collection & Plan Details</h3>

                    <Badge
                      className={styles.FirstHeaderBadge}
                      variant={
                        withdrawal &&
                        withdrawal.userPlan &&
                        withdrawal.userPlan.planStatus === 'ACTIVE'
                          ? 'success'
                          : 'danger'
                      }
                    >
                      {formatText(withdrawal.userPlan.planStatus)}
                    </Badge>
                  </div>
                </CardHeader>

                <div className={styles.FirstBodyGridContainer}>
                  <CardBody className={styles.FirstBody}>
                    <div className={styles.FirstBodyFlex}>
                      <span>Amount</span>
                      <span> {formatCurrency(withdrawal.amountCollected)}</span>
                    </div>
                    <div className={styles.FirstBodyFlex}>
                      <span> Plan</span>
                      <span>
                        {formatText(withdrawal.userPlan.plan.title)} ({' '}
                        {formatCurrency(withdrawal.userPlan.plan.low)} {` - `}
                        {formatCurrency(withdrawal.userPlan.plan.high)} )
                      </span>
                    </div>
                    <div className={styles.FirstBodyFlex}>
                      <span>Collection Date</span>
                      <span>
                        {moment(withdrawal.collectionDate).format(
                          'Do MMM, YYYY'
                        )}
                      </span>
                    </div>
                    <div className={styles.FirstBodyFlex}>
                      <span>Time Created </span>
                      <span>
                        {moment(withdrawal.timeCreated).format('Do MMM, YYYY')}
                      </span>
                    </div>
                    <div className={styles.FirstBodyFlex}>
                      <span> Collection ID</span>
                      <span>{formatText(withdrawal.collectionId)}</span>
                    </div>
                  </CardBody>
                  <CardBody className={styles.FirstBody}>
                    <div className={styles.FirstBodyFlex}>
                      <span>User Plan</span>
                      <span> {formatText(withdrawal.userPlan.title)}</span>
                    </div>
                    <div className={styles.FirstBodyFlex}>
                      <span>Collection Count</span>
                      <span>
                        {formatText(withdrawal.userPlan.collectionCount)}
                      </span>
                    </div>
                    <div className={styles.FirstBodyFlex}>
                      <span>Collection Duration</span>
                      <span>{formatText(withdrawal.userPlan.duration)}</span>
                    </div>
                    <div className={styles.FirstBodyFlex}>
                      <span> Daily Amount</span>
                      <span>
                        {formatCurrency(withdrawal.userPlan.dailyAmount)}
                      </span>
                    </div>
                    <div className={styles.FirstBodyFlex}>
                      <span> Last Collection Date</span>
                      <span>
                        {moment(
                          withdrawal.userPlan.plan.lastCollectionDate
                        ).format('Do MMM, YYYY')}
                      </span>
                    </div>
                  </CardBody>
                </div>
              </Card>
            </div>

            <div className={styles.Second}>
              <Card>
                <CardHeader>
                  <div className={styles.FirstHeader}>
                    <h3> Manager Details</h3>
                  </div>
                </CardHeader>

                <div className={styles.FirstBodyGridContainer}>
                  <CardBody className={styles.FirstBody}>
                    <div className={styles.FirstBodyFlex}>
                      <span>Agent Name</span>
                      <span>
                        {withdrawal.agent &&
                          formatText(
                            `${withdrawal.agent.firstName} ${withdrawal.agent.lastName}`
                          )}
                      </span>
                    </div>
                    <div className={styles.FirstBodyFlex}>
                      <span>Agent Phone Number</span>
                      <span>
                        {withdrawal.agent &&
                          formatText(withdrawal.agent.phoneNumber)}
                      </span>
                    </div>
                    <div className={styles.FirstBodyFlex}>
                      <span>Market</span>
                      <span>
                        {withdrawal.agent &&
                          formatText(withdrawal.agent.assignedMarket.name)}
                      </span>
                    </div>
                  </CardBody>
                  <CardBody className={styles.FirstBody}>
                    <div className={styles.FirstBodyFlex}>
                      <span>Zonal Head </span>
                      <span>
                        {withdrawal.agent &&
                          withdrawal.agent.manager &&
                          formatText(
                            `${withdrawal.agent.manager.firstName} ${withdrawal.agent.manager.lastName}`
                          )}
                      </span>
                    </div>
                    <div className={styles.FirstBodyFlex}>
                      <span> Zonal Phone Number </span>
                      <span>
                        {withdrawal.agent &&
                          withdrawal.agent.manager &&
                          formatText(withdrawal.agent.manager.phoneNumber)}
                      </span>
                    </div>
                  </CardBody>
                </div>
              </Card>
            </div>
          </div>
        )}

        {isShown && (
          <Dialog
            isShown={isShown}
            title={dialogContent[type].title}
            hasFooter={false}
            hasHeader={false}
            confirmLabel="Submit"
            onConfirm={() => setIsShown(false)}
            onCloseComplete={() => setIsShown(false)}
            onCancel={() => setIsShown(false)}
            className="dialog"
          >
            <div className="dialogHeader">
              <h4>{dialogContent[type].title}</h4>
            </div>
            <div className={type === 'approve' ? 'dialogFlex' : 'dialogBody'}>
              <p>{dialogContent[type].content}</p>
              {type === 'decline' && (
                <Input
                  label="Reason"
                  placeholder=""
                  onChange={e => setReason({ reason: e.target.value })}
                  value={reason.reason}
                  type="text"
                  name="reason"
                  id="reason"
                  className="formInput"
                />
              )}
            </div>
            <div className="dialogFooter">
              <Button
                variant="flat"
                icon={<Close />}
                onClick={() => setIsShown(false)}
              >
                Close
              </Button>
              <Button loading={loading} onClick={dialogContent[type].submit}>
                Submit
              </Button>
            </div>
          </Dialog>
        )}

        {showKyc && (
          <SideSheet
            isShown={showKyc}
            onCloseComplete={() => setShowKyc(false)}
          >
            <Kyc setShow={setShowKyc} withdrawal={withdrawal} />
          </SideSheet>
        )}
        {showTransferLog && (
          <SideSheet
            isShown={showTransferLog}
            onCloseComplete={() => setShowTransferLog(false)}
          >
            <TransferLog
              setShowTransferLog={setShowTransferLog}
              withdrawal={withdrawal}
            />
          </SideSheet>
        )}
      </Content>
    </Fragment>
  )
}
export default ViewCashout
