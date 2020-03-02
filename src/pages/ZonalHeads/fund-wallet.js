import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Card, CardBody, CardHeader, Button, Input } from '@kudi-inc/dip'
import { fundWallet } from 'services/zonal-heads'
import { toaster } from 'evergreen-ui'
import styles from "./fund-wallet.module.scss"
const FundWallet = ({ managerId, setShowDialog, zonalHead }) => {
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)
  const handleFundWallet = async e => {
    e.preventDefault()
    setLoading(true)
    setShowDialog(false)
    // await fundWallet(zonalHead.id)
    // .then(({ data }) => {
    //   setLoading(false)
    //   toaster.success('Processing Top Up')

    // })
    // .catch(({ response }) => {
    //   toaster.danger('Create Agent Failed')
    // })
  }
  return (
    <Card className={styles.FundWallet}>
      <CardHeader className={styles.FundWalletHeader}>Fund Wallet</CardHeader>
      <CardBody className={styles.FundWalletBody}>
        <form onSubmit={handleFundWallet} className={styles.FundWalletForm} >
          <Input
            type="text"
            label="Full name"
            name="name"
            placeholder=""
            value={`${zonalHead.lastName} ${zonalHead.firstName}`}
            disabled
          />
          <Input
            type="text"
            label="Wallet Number"
            placeholder=""
            value={zonalHead.phoneNumber}
            disabled
          />
          <Input
            value={amount}
            name="amount"
            type="tel"
            label="Enter Amount"
          />
          <Button type="submit" loading={loading}>
            Submit
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}
export default FundWallet
