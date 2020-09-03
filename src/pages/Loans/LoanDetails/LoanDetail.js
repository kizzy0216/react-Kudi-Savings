import React, { Fragment } from 'react'
import { ChevronLeft, CustomersLink } from '../../../assets/svg'
import agent from '../../../assets/images/agent.png';
import { Content, Header } from '../../../components/Layout'
import { Badge, Button, Card, CardBody } from '@kudi-inc/dip'

import './loan-detail.scss'
import Guarantors from './Guarantors'
import PaymentOverview from './PaymentOverview'
import { Link } from 'react-router-dom'

export default ({ history, match: { params } }) => {

  let { id: loanId } = params
  console.log('Loan Id', loanId)

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
        <div className={'section-1'}>
          <Card className={'card-1'}>
            <CardBody className={'first-card'}>
              <div className="Customer-Info-Header">
                <span className={'heading'}>Customer Information</span>
                <p className={'view-profile'}><CustomersLink/> <span>View Profile</span></p>
              </div>
              <div className="second-section">
                <div className="Customer-Picture">
                  <img src={agent} alt="customer picture"/>
                </div>
                <div className="Customer-Info">
                  <p><span className={'key'}>Name:</span> <span className={'value'}>Firstname Lastname</span></p>
                  <p><span className={'key'}>Phone Number:</span> <span className={'value'}>08062361452</span></p>
                  <p><span className={'key'}>Gender:</span> <span className={'value'}>Male</span></p>
                  <p><span className={'key'}>Address:</span> <span className={'value'}>1 Name of street, Town, LGA, Nigeria</span></p>
                  <p><span className={'key'}>Assigned Market:</span> <span className={'value'}>Alimosho</span></p>
                  <p><span className={'key'}>DSA Phone Number:</span> <span className={'value'}>08062172454</span></p>
                  <p><span className={'key'}>Wallet Balance:</span> <span className={'value'}>N980,000</span></p>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className={'card-2'}>
            {parseInt(loanId) % 2 === 0 ? <Guarantors/> : <PaymentOverview/>}
          </Card>
        </div>
        <div className="section-2">
          <Card className={'card-3'}>
            <CardBody>
              <p className={'add-border-bottom'}><span className="heading">Application Status</span> <Badge variant={'warning'}>Pending</Badge></p>
              <p className={'add-border-bottom'}><span className="key">Loan Amount</span> <span className="value">N50,000</span></p>
              <p className={'add-border-bottom'}><span className="key">Interest</span> <span className="value">N16,250</span></p>
              <p className={'add-border-bottom'}><span className="key">Repayment</span> <span className="value">N66,000</span></p>
              <p className={'add-border-bottom'}><span className="key">Tenure</span> <span className="value"># Months</span></p>
              <p className={'add-border-bottom'}><span className="key">Repayment Plan</span> <span className="value">Weekly</span></p>
              <p className={'add-border-bottom'}><span className="key">Weekly Amount</span> <span className="value">N4,000</span></p>
              <p className={'add-border-bottom'}><span className="key">Guarantors</span> <span className="value">Verified</span></p>
              {
                parseInt(loanId) % 2 === 0 ? <p><Button>Approve</Button>  <Button className={'btn-blue'}>Decline</Button></p>
                  : <p><Link to={'/loans/repayments'} className={'btn-block'}><Button className={'btn-block'}>View Repayment History</Button></Link></p>
              }

            </CardBody>
          </Card>
        </div>
      </Content>
    </Fragment>
  )
}
