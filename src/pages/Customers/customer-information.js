import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Card, CardBody, CardFooter, Button } from '@kudi-inc/dip'
import styles from './customer-profile.module.scss'
import moment from 'moment'
import { Reassign } from 'assets/svg'

const CustomerInformation = ({ setShowInformation, customer }) => {
  return (
    <CardBody className={styles.Details}>
      <div className={styles.DetailsBody}>
        <div className={styles.DetailsBodyFlex}>
          <span>Name</span>
          <span>
            {' '}
            {`${customer?.lastName ?? ''} ${customer?.firstName ?? ''}`}{' '}
          </span>
        </div>
        <div className={styles.DetailsBodyFlex}>
          <span> Phone Number </span>
          <span>{customer.phoneNumber}</span>
        </div>
        <div className={styles.DetailsBodyFlex}>
          <span> Gender </span>
          <span>{customer.gender}</span>
        </div>
        <div className={styles.DetailsBodyFlex}>
          <span> Date of Birth</span>
          <span>dob</span>
        </div>
        <div className={styles.DetailsBodyFlex}>
          <span> Next of Kin </span>
          <span>next of kin</span>
        </div>
        <div className={styles.DetailsBodyFlex}>
          <span> Phone Number </span>
          <span>phoneNumber</span>
        </div>
        <div className={styles.DetailsBodyFlex}>
          <span> Business Name </span>
          <span>{customer.businessName}</span>
        </div>
        <div className={styles.DetailsBodyFlex}>
          <span> Business Type </span>
          <span>Business Type</span>
        </div>
        <div className={styles.DetailsBodyFlex}>
          <span>Date Onboarded </span>
          <span>{moment(customer.timeCreated).format('Do MMM, YYYY')}</span>
        </div>
        <div className={styles.DetailsBodyFlex}>
          <span> Security Question </span>
          <span>Security question</span>
        </div>
        <div className={styles.DetailsBodyFlex}>
          <span> Answer </span>
          <span>Answer</span>
        </div>
        <CardFooter className={styles.DetailsFooter}>
          <Button variant="flat" icon={<Reassign />}>
            Reset pin
          </Button>
        </CardFooter>
      </div>
    </CardBody>
  )
}

export default CustomerInformation
