import React, { useState, Fragment } from 'react'
import { Card, CardHeader, CardBody } from '@kudi-inc/dip'
import styles from './stash-transaction-details.module.scss'
import moment from 'moment'
import { formatCurrency } from 'utils/function'
import { Header, Content } from 'components/Layout'

const StashDetails = ({ stashDetails }) => {
    
  return (
    <Fragment>
      <Header className={styles.Header}>
        <p>Transaction Details</p>
      </Header>
      <Content>
        <Card className={styles.Container}>
          <CardHeader className={styles.ContainerHeader}>SENDER'S DETAILS</CardHeader>
          <CardBody>
            <div className={styles.ContainerBody}>
              <div className={styles.ContainerBodyFlex}>
                <span>Source Amount Name:</span>
                <span>{stashDetails.sourceAccountName || '-'}</span>
              </div>
              <div className={styles.ContainerBodyFlex}>
                <span>Source Bank Name:</span>
                <span>{stashDetails.sourceBankName || '-'}</span>
              </div>
              <div className={styles.ContainerBodyFlex}>
                <span>Source Account Number:</span>
                <span>{stashDetails.sourceAccountNumber || '-'}</span>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className={styles.Container}>
          <CardBody>
            <div className={styles.ContainerBody}>
              <div className={styles.ContainerBodyFlex}>
                <span>Amount: </span>
                <span>{formatCurrency(stashDetails.amount)}</span>
              </div>
              <div className={styles.ContainerBodyFlex}>
                <span>Source: </span>
                <span>{stashDetails.type}</span>
              </div>
              <div className={styles.ContainerBodyFlex}>
                <span>Transaction Type: </span>
                <span>{stashDetails.transactionType || '-'}</span>
              </div>
              <div className={styles.ContainerBodyFlex}>
                <span>Transaction Ref: </span>
                <span>{stashDetails.reference}</span>
              </div>
              <div className={styles.ContainerBodyFlex}>
                <span>Date/Time Created: </span>
                <span>
                  {moment(stashDetails.timeCreated).format(
                    'Do MMM, YYYY hh:mm a'
                  )}
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      </Content>
    </Fragment>
  )
}
export default StashDetails
