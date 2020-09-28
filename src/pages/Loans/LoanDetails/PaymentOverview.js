import React from 'react'
import './payment-history.scss'
import { CardBody } from '@kudi-inc/dip'
import { useQuery } from 'react-query'
import { getPaymentsOverview, nextPaymentData } from '../../../services/loans'
import { formatCurrency } from 'utils/function'

const defaultPaymentOverview = { totalPayments: '-', paidCount: '-' }

export default ({ loan }) => {
  const { data: nextPaymentRes } = useQuery(
    loan && loan.id && ['LoanNextPayment', { loanId: loan.id }],
    nextPaymentData
  )
  const { data: paymentsOverviewRes } = useQuery(
    loan && loan.id && ['LoanPaymentsOverview', { loanId: loan.id }],
    getPaymentsOverview
  )
  const nextPayment = nextPaymentRes
    ? nextPaymentRes.data
      ? nextPaymentRes.data.data
      : null
    : null
  const paymentsOverview = paymentsOverviewRes
    ? paymentsOverviewRes.data
      ? paymentsOverviewRes.data.data
      : defaultPaymentOverview
    : defaultPaymentOverview
  console.log('Next Payment:', nextPayment)

  return (
    <CardBody className={'Payment-History-Card'}>
      <div className="part-1">
        <p className={'add-margin-bottom'}>
          <span className="key">Amount Repaid</span>{' '}
          <span className="value">{formatCurrency(loan.amountRepaid)}</span>
        </p>
        <p className={'add-margin-bottom'}>
          <span className="key">Amount Left</span>{' '}
          <span className="value">
            {formatCurrency(loan.repayment - loan.amountRepaid)}
          </span>
        </p>
        <p>
          <span className="key">KTA Details</span>{' '}
          <span className="value">{loan.kta}</span>
        </p>
      </div>
      <div className="part-2">
        <p className={'add-margin-bottom'}>
          <span className="key">Next Payment</span>{' '}
          <span className="value">
            {nextPayment ? `${formatCurrency(nextPayment.amount)}` : '--'}
          </span>
        </p>
        <p className={'add-margin-bottom'}>
          <span className="key">Due Date</span>{' '}
          <span className="value">
            {nextPayment
              ? new Date(nextPayment.expectedRepaymentDate)
                  .toISOString()
                  .split('T')[0]
              : '-- --'}
          </span>
        </p>
        <p>
          <span className="key">Payment Count</span>{' '}
          <span className="value">
            {paymentsOverview.paidCount} of {paymentsOverview.totalPayments}
          </span>
        </p>
      </div>
    </CardBody>
  )
}
