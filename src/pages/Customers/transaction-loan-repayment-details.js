import React, { Fragment } from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@kudi-inc/dip'
import styles from './stash-transaction-details.module.scss'
import moment from 'moment'
import { Eye } from 'assets/svg'
import { Button } from '@kudi-inc/dip'
import { formatCurrency } from 'utils/function'
import { Header, Content } from 'components/Layout'
import { formatStashStatus } from 'utils/function'

const LoanRepaymentDetails = ({ stashDetails }) => {
  return (
    <Fragment>
      <Header className={styles.Header}>
        <p>Transaction Details</p>
      </Header>

      <Content>
        <Card className={styles.Container}>
          <CardHeader className={styles.ContainerHeader}>
            <p>SOURCE</p>
            <p>{formatStashStatus(stashDetails.type)}</p>
          </CardHeader>
          <CardBody>
            <div className={styles.ContainerBody}>
              <div className={styles.ContainerBodyFlex}>
                <span>Transaction Type: </span>
                <span>{stashDetails.transactionType || '-'}</span>
              </div>
              <div className={styles.ContainerBodyFlex}>
                <span>Amount: </span>
                <span>{formatCurrency(stashDetails.amount)}</span>
              </div>
              <div className={styles.ContainerBodyFlex}>
                <span>Date/Time Created: </span>
                <span>
                  {moment(stashDetails.timeCreated).format(
                    'Do MMM, YYYY hh:mm a'
                  )}
                </span>
              </div>
              <div className={styles.ContainerBodyFlex}>
                <span>Transaction Ref: </span>
                <span className={styles.ContainerBodyFlexReference}>
                  {stashDetails.reference}
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className={styles.Container}>
          <CardHeader className={styles.ContainerHeader}>
            <p>LOAN REPAYMENT</p>
          </CardHeader>
          <CardBody>
            <div className={styles.ContainerBody}>
              <div className={styles.ContainerBodyFlex}>
                <span>Loan Amount:</span>
                <span>{'-'}</span>
              </div>
              <div className={styles.ContainerBodyFlex}>
                <span>Repayment:</span>
                <span>{'-'}</span>
              </div>
              <div className={styles.ContainerBodyFlex}>
                <span>Start Date of Loan:</span>
                <span>{'-'}</span>
              </div>
              <div className={styles.ContainerBodyFlex}>
                <span>End Date of Loan:</span>
                <span>{'-'}</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </Content>
    </Fragment>
  )
}
export default LoanRepaymentDetails
