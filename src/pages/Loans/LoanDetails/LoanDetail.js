import React, { Fragment, useContext, useState } from 'react'
import {
  ChevronLeft,
  UserIconLink,
  Close,
  Reassign,
  UpdateLink
} from '../../../assets/svg'
import agentImage from '../../../assets/images/agent.png'
import { Content, Header } from '../../../components/Layout'
import { Badge, Button, Card, CardBody, CardFooter } from '@kudi-inc/dip'
import AuthContext from 'context/AuthContext'
import './loan-detail.scss'
import styles from './loan-detail.scss'
import Guarantors from './Guarantors'
import PaymentOverview from './PaymentOverview'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { toaster, SideSheet } from 'evergreen-ui'
import TransferLog from './transfer-log'
import { ProfileLoading } from 'components/loading'
import {
  approveLoan,
  activateLoan,
  declineLoan,
  fetchWalletBalance,
  getLoanDetails
} from '../../../services/loans'
import { formatStatus } from '../utils'
import { fecthImage, formatCurrency } from 'utils/function'

export default ({ history, match: { params } }) => {
  let { id: loanId } = params
  let [auth] = useContext(AuthContext)
  let [showTransferLog, setShowTransferLog] = useState(false)

  const { data: res, isLoading, error, refetch } = useQuery(
    ['LoanDetails', { loanId }],
    getLoanDetails
  )
  let loan =
    res && res.data
      ? res.data.data
      : { repayment: 0, modeOfRepayment: 'WEEKLY' }
  let customer = loan && loan.userDetails ? loan.userDetails : {}
  let market = customer && customer.marketModel ? customer.marketModel : {}
  let agent = customer && customer.agentModel ? customer.agentModel : {}
  let tenure = loan && loan.tenure ? loan.tenure : { weeks: 1, days: 30 }
  const { data: imageData } = useQuery(
    customer &&
      customer.pictureId && ['CustomerImage', { id: customer.pictureId }],
    fecthImage
  )
  const { data: walletRes } = useQuery(
    customer &&
      customer.id && ['CustomerWalletBalance', { customerId: customer.id }],
    fetchWalletBalance
  )
  const walletBalance = walletRes
    ? walletRes.data
      ? walletRes.data.data
      : 0
    : 0
  let loanStatus = loan.status

  let badgeType =
    loanStatus === 'PAID'
      ? 'success'
      : loanStatus === 'ACTIVE'
      ? 'primary'
      : loanStatus === 'PENDING_APPROVAL'
      ? 'warning'
      : loanStatus === 'PENDING_DISBURSEMENT'
      ? 'warning'
      : loanStatus === 'DECLINED'
      ? 'danger'
      : 'warning'
  let isWeekly = loan.modeOfRepayment === 'WEEKLY'

  let intervalAmount = loan.repayment / (isWeekly ? tenure.weeks : tenure.days)

  const handleApproveClick = () => {
    approveLoan({ loanId })
      .then(res => {
        res.data.status
          ? toaster.success('Loan Approved')
          : toaster.danger('Error Approving')
      })
      .catch(console.error)
  }

  const handleDeclineClick = () => {
    declineLoan({ loanId })
      .then(res => {
        res.data.status
          ? toaster.success('Loan Declined')
          : toaster.danger('Error Declining')
      })
      .catch(console.error)
  }

  const handleActivation = () => {
    activateLoan({ loanId })
      .then(() => {
        toaster.success('Loan In Progress')
      })
      .catch(data => {
        if (data?.data?.message) return toaster.danger(data?.data?.message)
        toaster.danger('Error updating to In Progress')
      })
  }

  const tenureDuration =
    tenure.durationInMonths === 1
      ? `${tenure.durationInMonths}month`
      : tenure.durationInMonths > 1
      ? `${tenure.durationInMonths}months`
      : `${tenure.durationInMonths}month`

  return (
    <Fragment>
      <Header className={'Header'}>
        <p>
          <ChevronLeft role="button" onClick={() => history.goBack()} />
          Customer Loan Request
        </p>

        {['ACTIVE', 'PENDING_DISBURSEMENT', 'PAID'].includes(loanStatus) && (
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
          <span>
            Error!
            <button onClick={() => refetch({ disableThrow: true })}>
              Retry
            </button>
          </span>
        )}
        {res && res.data && (
          <div className={'Content'}>
            <div className={'section-1'}>
              <Card className={'card-1'}>
                <CardBody className={'first-card'}>
                  <div className="Customer-Info-Header">
                    <span className={'heading'}>Customer Information</span>
                    <p className={'view-profile'}>
                      <Button
                        variant="flat"
                        onClick={() =>
                          history.push(`/customers/${customer.id}`)
                        }
                        type="button"
                        icon={<UserIconLink />}
                      >
                        View Profile
                      </Button>
                    </p>
                  </div>
                  <div className="second-section">
                    <div className="Customer-Picture">
                      <img
                        src={imageData ? imageData.data.medium : agentImage}
                        alt="customer picture"
                      />
                    </div>
                    <div className="Customer-Info">
                      <p>
                        <span className={'key'}>Name:</span>{' '}
                        <span className={'value'}>
                          {customer.firstName} {customer.lastName}
                        </span>
                      </p>
                      <p>
                        <span className={'key'}>Phone Number:</span>{' '}
                        <span className={'value'}>{customer.phoneNumber}</span>
                      </p>
                      <p>
                        <span className={'key'}>Gender:</span>{' '}
                        <span className={'value'}>{customer.gender}</span>
                      </p>
                      <p>
                        <span className={'key'}>Address:</span>{' '}
                        <span className={'value'}>{customer.address}</span>
                      </p>
                      <p>
                        <span className={'key'}>Assigned Market:</span>{' '}
                        <span className={'value'}>{market.name}</span>
                      </p>
                      <p>
                        <span className={'key'}>DSA Phone Number:</span>{' '}
                        <span className={'value'}>{agent.phoneNumber}</span>
                      </p>
                      <p>
                        <span className={'key'}>Wallet Balance:</span>{' '}
                        <span className={'value'}>{walletBalance}</span>
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card className={'card-2'}>
                {loan.disbursementStatus &&
                loan.disbursementStatus === 'SUCCESS' ? (
                  <PaymentOverview loan={loan} />
                ) : (
                  <Guarantors loan={loan} />
                )}
              </Card>
            </div>
            <div className="section-2">
              <Card className={'card-3'}>
                <CardBody>
                  <p className={'add-border-bottom'}>
                    <span className="heading">Application Status</span>{' '}
                    <Badge variant={badgeType}>
                      {formatStatus(loanStatus)}
                    </Badge>
                  </p>
                  <p className={'add-border-bottom'}>
                    <span className="key">Loan Amount</span>{' '}
                    <span className="value">{formatCurrency(loan.amount)}</span>
                  </p>
                  <p className={'add-border-bottom'}>
                    <span className="key">Interest</span>{' '}
                    <span className="value">
                      {formatCurrency(loan.repayment - loan.amount)}
                    </span>
                  </p>
                  <p className={'add-border-bottom'}>
                    <span className="key">Repayment</span>{' '}
                    <span className="value">
                      {formatCurrency(loan.repayment)}
                    </span>
                  </p>
                  <p className={'add-border-bottom'}>
                    <span className="key">Tenure</span>{' '}
                    <span className="value">{tenureDuration}</span>
                  </p>
                  <p className={'add-border-bottom'}>
                    <span className="key">Repayment Plan</span>{' '}
                    <span className="value">{loan.modeOfRepayment}</span>
                  </p>
                  <p className={'add-border-bottom'}>
                    <span className="key">
                      {loan.modeOfRepayment.toLowerCase()} Amount
                    </span>{' '}
                    <span className="value">
                      {formatCurrency(intervalAmount)}
                    </span>
                  </p>
                  <p className={'add-border-bottom'}>
                    <span className="key">Guarantors</span>{' '}
                    <span className="value">Verified</span>
                  </p>
                  {['ACTIVE', 'PAID'].includes(loanStatus) && (
                    <p>
                      <Link
                        to={`/loans/repayments/${loanId}`}
                        className={'btn-block'}
                      >
                        <Button className={'btn-block'}>
                          View Repayment History
                        </Button>
                      </Link>
                    </p>
                  )}
                  <div className={'ApplicationFooter'}>
                    {auth.type.includes('LOANS_MANAGER') && loanStatus.includes('PENDING_APPROVAL') && (
                      <>
                        <p>
                          <Button
                            onClick={handleApproveClick}
                          >
                            Approve
                          </Button>
                          <Button
                            className={'btn-blue'}
                            onClick={handleDeclineClick}
                            icon={<Close />}
                          >
                            Decline
                          </Button>
                        </p>
                      </>
                    )}
                  </div>
                </CardBody>
                {auth.type.includes('LOANS_MANAGER') && (
                  <>
                    {loanStatus === 'PENDING_DISBURSEMENT' && (
                      <div className={'disbursement'}>
                        <div className={'disbursementAction'}>
                          <Button
                            type="button"
                            variant="flat"
                            onClick={handleActivation}
                            icon={<UpdateLink />}
                          >
                            Update to in Progress
                          </Button>
                        </div>
                        <div className={'declineAction'}>
                          <Button
                            type="button"
                            variant="flat"
                            onClick={handleDeclineClick}
                            icon={<Close />}
                          >
                            Decline
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </Card>
            </div>
          </div>
        )}
        {showTransferLog && (
          <SideSheet
            isShown={showTransferLog}
            onCloseComplete={() => setShowTransferLog(false)}
          >
            <TransferLog setShowTransferLog={setShowTransferLog} loan={loan} />
          </SideSheet>
        )}
      </Content>
    </Fragment>
  )
}
