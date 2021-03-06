import React, { useState, Fragment } from 'react'
import { Card, CardHeader, CardBody } from '@kudi-inc/dip'
import styles from './stash-transaction-details.module.scss'
import moment from 'moment'
import { formatCurrency } from 'utils/function'
import { Header, Content } from 'components/Layout'
import { formatStashStatus } from 'utils/function'

const StashTopUpDetails = ({ stashDetails }) => {
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
            <p>SENDER'S DETAILS</p>
          </CardHeader>
          <CardBody>
            <div className={styles.ContainerBody}>
              <div className={styles.ContainerBodyFlex}>
                <span>Source Amount Name:</span>
                <span>{stashDetails?.paymentDetail?.accountName || '-'}</span>
              </div>
              <div className={styles.ContainerBodyFlex}>
                <span>Source Bank Code:</span>
                <span>{stashDetails?.paymentDetail?.bankCode || '-'}</span>
              </div>
              <div className={styles.ContainerBodyFlex}>
                <span>Source Account Number:</span>
                <span>{stashDetails?.paymentDetail?.accountNumber || '-'}</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </Content>
    </Fragment>
  )
}
export default StashTopUpDetails
