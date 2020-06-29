import React, { useState } from 'react'
import { Card, CardHeader, CardBody } from '@kudi-inc/dip'
import { useQuery } from 'react-query'
import { fecthImage } from 'utils/function'
import AgentImg from 'assets/svg/profile-pic.svg'
import styles from './view-cashout.module.scss'
const Kyc = ({ showKyc, withdrawal }) => {
  const { data } = useQuery(
    ['Image', { id: withdrawal.agent.imageId }],
    fecthImage
  )
  return (
    <Card className={styles.Edit}>
      <CardHeader className={styles.EditHeader}>View KYC</CardHeader>
      <CardBody>
        <div className={styles.EditBody}>
          <div className={styles.verifyImage}>
            <p>
              {withdrawal.user && withdrawal.user.firstName}{' '}
              {withdrawal.user && withdrawal.user.lastName}
            </p>
            <p>
              {withdrawal.user && withdrawal.user.phoneNumber}
            </p>
            <img src={data ? data.data.medium : AgentImg} alt="view biodata" />
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default Kyc
