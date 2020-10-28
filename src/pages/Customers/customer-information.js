import React from 'react'
import { CardBody, CardFooter, Button } from '@kudi-inc/dip'
import styles from './customer-profile.module.scss'
import moment from 'moment'
import { Reassign } from 'assets/svg'
import { Header, Content } from 'components/Layout'

const CustomerInformation = ({ customer }) => {
  return (
    <>
      <Header className={styles.DetailsHeader}>
        <p>Customer Information</p>
      </Header>
      <Content className={styles.content}>
        <CardBody className={styles.Details}>
          <div className={styles.DetailsBody}>
            <div className={styles.DetailsBodyFlex}>
              <span>Name</span>
              <span>
                {' '}
                {`${customer?.lastName ?? ''} ${customer?.firstName ??
                  ''}`}{' '}
              </span>
            </div>
            <div className={styles.DetailsBodyFlex}>
              <span> Phone Number </span>
              <span>{customer.phoneNumber}</span>
            </div>
            {customer?.previouslyChangedPhoneNumbers?.[0] && 
            <div className={styles.DetailsBodyFlex}>
              <span>Wallet Number History</span>
              <span>{customer.previouslyChangedPhoneNumbers}</span>
            </div>
            }
            <div className={styles.DetailsBodyFlex}>
              <span> Gender </span>
              <span>{customer.gender}</span>
            </div>
            <div className={styles.DetailsBodyFlex}>
              <span> Date of Birth</span>
              <span>{customer.dateOfBirth && moment(customer.dateOfBirth).format('Do MMM, YYYY') || '-'}</span>
            </div>
            <div className={styles.DetailsBodyFlex}>
              <span> Next of Kin </span>
              <span>{customer?.nextOfKin?.name || '-'}</span>
            </div>
            <div className={styles.DetailsBodyFlex}>
              <span>Next of Kin's Phone Number </span>
              <span>{customer?.nextOfKin?.phoneNumber || '-'}</span>
            </div>
            <div className={styles.DetailsBodyFlex}>
              <span> Business Name </span>
              <span>{customer.businessName || '-'}</span>
            </div>
            <div className={styles.DetailsBodyFlex}>
              <span> Business Type </span>
              <span>{customer.businessType || '-'}</span>
            </div>
            <div className={styles.DetailsBodyFlex}>
              <span>Date Onboarded </span>
              <span>
                {(customer.timeCreated &&
                  moment(customer.timeCreated).format('Do MMM, YYYY')) ||
                  '-'}
              </span>
            </div>
            <div className={styles.DetailsBodyFlex}>
              <span> Security Question </span>
              <span>{customer.securityQuestion || '-'}</span>
            </div>
            <div className={styles.DetailsBodyFlex}>
              <span> Answer </span>
              <span>{customer.securityAnswer || '-'}</span>
            </div>
            <CardFooter className={styles.DetailsFooter}>
              <Button variant="flat" icon={<Reassign />}>
                Reset pin
              </Button>
            </CardFooter>
          </div>
        </CardBody>
      </Content>
    </>
  )
}

export default CustomerInformation
