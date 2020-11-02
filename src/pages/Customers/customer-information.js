import React from 'react'
import { CardBody, CardFooter, Button } from '@kudi-inc/dip'
import styles from './customer-profile.module.scss'
import moment from 'moment'
import { Reassign } from 'assets/svg'
import { Header, Content } from 'components/Layout'
import { resetPin } from 'services/ussd'
import { toaster } from 'evergreen-ui'

const CustomerInformation = ({ customer }) => {
  const handleResetPin = () => {
    resetPin(customer.phoneNumber)
      .then(() => {
        toaster.success('Reset Pin Successful')
      })
      .catch(error => {
        if (error?.data?.message) return toaster.danger(error?.data?.message)
        toaster.danger('Error Resetting Pin')
      })
  }

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
            {customer?.previouslyChangedPhoneNumbers?.[0] && (
              <div className={styles.DetailsBodyFlex}>
                <span>Wallet Number History</span>
                <span>{customer.previouslyChangedPhoneNumbers}</span>
              </div>
            )}
            <div className={styles.DetailsBodyFlex}>
              <span> Gender </span>
              <span>{customer.gender}</span>
            </div>
            <div className={styles.DetailsBodyFlex}>
              <span> Date of Birth</span>
              <span>
                {(customer.dob &&
                  moment(customer.dob).format('Do MMMM, YYYY')) ||
                  '-'}
              </span>
            </div>
            <div className={styles.DetailsBodyFlex}>
              <span> Next of Kin </span>
              <span>
                {(customer.nokFirstName &&
                  customer.nokLastName &&
                  `${customer?.nokFirstName} ${customer?.nokLastName}`) ||
                  '-'}
              </span>
            </div>
            <div className={styles.DetailsBodyFlex}>
              <span>Next of Kin's Phone Number </span>
              <span>{customer?.nokPhoneNumber || '-'}</span>
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
                  moment(customer.timeCreated).format('Do MMMM, YYYY')) ||
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
              <Button
                variant="flat"
                onClick={handleResetPin}
                icon={<Reassign />}
              >
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
