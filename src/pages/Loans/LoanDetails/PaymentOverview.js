import React from 'react';
import './payment-history.scss'
import { CardBody } from '@kudi-inc/dip'

export default ({ loan }) => (
  <CardBody className={'Payment-History-Card'}>
    <div className="part-1">
      <p className={'add-margin-bottom'}><span className="key">Amount Repaid</span> <span className="value">N{loan.amountRepaid}</span></p>
      <p className={'add-margin-bottom'}><span className="key">Amount Left</span> <span className="value">N{loan.repayment - loan.amountRepaid}</span></p>
      <p><span className="key">KTA Details</span> <span className="value">{loan.kta}</span></p>
    </div>
    <div className="part-2">
      <p className={'add-margin-bottom'}><span className="key">Next Payment</span> <span className="value">-- --</span></p>
      <p className={'add-margin-bottom'}><span className="key">Due Date</span> <span className="value">-- --</span></p>
      <p><span className="key">Payment Count</span> <span className="value">- of -</span></p>
    </div>
  </CardBody>
)
