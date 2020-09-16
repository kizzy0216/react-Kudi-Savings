import React, { Fragment } from 'react'
import { ChevronLeft, CustomersLink } from '../../../assets/svg'
import agentImage from '../../../assets/images/agent.png'
import { Content, Header } from '../../../components/Layout'
import { Badge, Button, Card, CardBody } from '@kudi-inc/dip'

import './loan-detail.scss'
import Guarantors from './Guarantors'
import PaymentOverview from './PaymentOverview'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { approveLoan, declineLoan, getLoanDetails } from '../../../services/loans'
import { fecthImage } from '../../../utils/function'
import { ProfileLoading } from '../../../components/loading'

export default ({ history, match: { params } }) => {
  let { id: loanId } = params
  console.log('Loan Id', loanId)
  const { data: res, isLoading, error, refetch } = useQuery(['LoanDetails', { loanId }], getLoanDetails)
  let loan = res && res.data ? res.data.data : { repayment: 0, modeOfRepayment: 'WEEKLY' }
  let customer = loan && loan.userDetails ? loan.userDetails : {}
  let market = customer && customer.marketModel ? customer.marketModel : {}
  let agent = customer && customer.agentModel ? customer.agentModel : {}
  let tenure = loan && loan.tenure ? loan.tenure : { weeks: 1, days: 30 }
  const { data: imageData } = useQuery(
    customer && customer.pictureId && ['CustomerImage', { id: customer.pictureId }],
    fecthImage)
  let loanStatus = loan.status
  let badgeType = ['ACTIVE', 'PAID'].includes(loanStatus) ? 'success' : loanStatus === 'DECLINED' ? 'danger' : 'warning'
  let isWeekly = loan.modeOfRepayment === 'WEEKLY'
  console.log('repayment', loan.repayment, 'isweekly', isWeekly, 'tenure', tenure)

  let intervalAmount = loan.repayment / isWeekly ? tenure.weeks : tenure.days
  console.log('Customer Info', customer)

  const handleApproveClick = () => {
    approveLoan({ loanId }).then(res => {
      res.data.status ? alert('Loan Approved') : alert('Error Approving')
    })
      .catch(console.error)
  }

  const handleDeclineClick = () => {
    declineLoan({ loanId }).then(res => {
      res.data.status ? alert('Loan Declined') : alert('Error Declining')
    })
      .catch(console.error)
  }


  return (
    <Fragment>
      <div className="Header">
        <Header>
          <p>
            <ChevronLeft role="button" onClick={() => history.goBack()}/> Loans
          </p>
        </Header>
      </div>
      <Content className={'Content'}>
        {isLoading && <ProfileLoading/>}
        {error && (
          <span>
            Error!
            <button onClick={() => refetch({ disableThrow: true })}>
              Retry
            </button>
          </span>
        )}
        {loan && <Fragment>
          <div className={'section-1'}>
            <Card className={'card-1'}>
              <CardBody className={'first-card'}>
                <div className="Customer-Info-Header">
                  <span className={'heading'}>Customer Information</span>
                  <p className={'view-profile'}><CustomersLink/> <span> <Link to={`/customers/${customer.id}`}>View Profile</Link> </span></p>
                </div>
                <div className="second-section">
                  <div className="Customer-Picture">
                    <img src={imageData ? imageData.data.medium : agentImage} alt="customer picture"/>
                  </div>
                  <div className="Customer-Info">
                    <p><span className={'key'}>Name:</span> <span
                      className={'value'}>{customer.firstName} {customer.lastName}</span></p>
                    <p><span className={'key'}>Phone Number:</span> <span
                      className={'value'}>{customer.phoneNumber}</span></p>
                    <p><span className={'key'}>Gender:</span> <span className={'value'}>{customer.gender}</span></p>
                    <p><span className={'key'}>Address:</span> <span className={'value'}>{customer.address}</span>
                    </p>
                    <p><span className={'key'}>Assigned Market:</span> <span className={'value'}>{market.name}</span>
                    </p>
                    <p><span className={'key'}>DSA Phone Number:</span> <span
                      className={'value'}>{agent.phoneNumber}</span></p>
                    <p><span className={'key'}>Wallet Balance:</span> <span className={'value'}>TBD</span></p>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card className={'card-2'}>
              {loan.disbursementStatus && loan.disbursementStatus === 'SUCCESS' ? <PaymentOverview loan={loan}/> :
                <Guarantors loan={loan}/>}
            </Card>
          </div>
          <div className="section-2">
            <Card className={'card-3'}>
              <CardBody>
                <p className={'add-border-bottom'}><span className="heading">Application Status</span> <Badge
                  variant={badgeType}>{loanStatus}</Badge></p>
                <p className={'add-border-bottom'}><span className="key">Loan Amount</span> <span
                  className="value">N{loan.amount}</span></p>
                <p className={'add-border-bottom'}><span className="key">Interest</span> <span
                  className="value">N{loan.repayment - loan.amount}</span></p>
                <p className={'add-border-bottom'}><span className="key">Repayment</span> <span
                  className="value">N{loan.repayment}</span></p>
                <p className={'add-border-bottom'}><span className="key">Tenure</span> <span
                  className="value"># {tenure.durationInMonths}</span></p>
                <p className={'add-border-bottom'}><span className="key">Repayment Plan</span> <span
                  className="value">{loan.modeOfRepayment}</span></p>
                <p className={'add-border-bottom'}><span
                  className="key">{loan.modeOfRepayment.toLowerCase()} Amount</span> <span
                  className="value">N{intervalAmount}</span></p>
                <p className={'add-border-bottom'}><span className="key">Guarantors</span> <span
                  className="value">Verified</span></p>
                {
                  ['ACTIVE', 'PAID'].includes(loanStatus) ?
                    <p><Link to={`/loans/repayments/${loanId}`} className={'btn-block'}><Button className={'btn-block'}>View
                      Repayment History</Button></Link></p> :
                    <p><Button onClick={handleApproveClick} disabled={loanStatus === 'DECLINED'}>Approve</Button>
                      <Button className={'btn-blue'}
                              onClick={handleDeclineClick}
                              disabled={loanStatus === 'DECLINED'}>Decline</Button>
                    </p>
                }
              </CardBody>
            </Card>
          </div>
        </Fragment>
        }
      </Content>
    </Fragment>
  )
}
