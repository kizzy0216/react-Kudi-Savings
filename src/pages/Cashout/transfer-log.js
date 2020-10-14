import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Card, CardHeader, CardBody, CardFooter, Button } from '@kudi-inc/dip'
import styles from '../Customers/customer-profile.module.scss'
import moment from 'moment'
import { formatCurrency } from 'utils/function'

const TransferLog = ({ setShowTransferLog, withdrawal }) => {
  return (
    <Card>
      <CardHeader>
        <b>
          <h3>Transfer Log</h3>
        </b>
      </CardHeader>
      <CardBody className={styles.Details}>
        <div className={styles.DetailsBody}>
          <div className={styles.DetailsBodyFlex}>
            <span>Amount</span>
            <span>{formatCurrency(withdrawal.amount)} </span>
          </div>
          <div className={styles.DetailsBodyFlex}>
            <span> Date/Time </span>
            <span>
              {moment(withdrawal.timeCreated).format('Do MMM, YYYY hh:mm a')}
            </span>
          </div>
          <div className={styles.DetailsBodyFlex}>
            <span> Status </span>
            <span>
              {withdrawal.status === 'PENDING_DISBURSEMENT'
                ? 'Pending'
                : withdrawal.status === 'CASH_DELIVERED'
                ? 'Success'
                : ''}
            </span>
          </div>
          <div className={styles.DetailsBodyFlex}>
            <span> Transaction Ref</span>
            <span>{}</span>
          </div>
          <div className={styles.DetailsBodyFlex}>
            <span> Billing Ref </span>
            <span>{}</span>
          </div>
          <div className={styles.DetailsBodyFlex}>
            <span> Billing Vendor </span>
            <span>{}</span>
          </div>
          <div className={styles.DetailsBodyFlex}>
            <span> Payment Fee </span>
            <span>{}</span>
          </div>
          <div className={styles.DetailsBodyFlex}>
            <span> Recipient Bank Account: </span>
            <span>{}</span>
          </div>
          <div className={styles.DetailsBodyFlex}>
            <span>Customer Billing ID</span>
            <span>{}</span>
          </div>
          <div className={styles.DetailsBodyFlex}>
            <span> Gateway Message </span>
            <span>{}</span>
          </div>
          <div className={styles.DetailsBodyFlex}>
            <span> Plan ID </span>
            <span>{withdrawal.userPlan.id}</span>
          </div>
          <div className={styles.DetailsBodyFlex}>
            <span> Transaction Source </span>
            <span>{}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default TransferLog
