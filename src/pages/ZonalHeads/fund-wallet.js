import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Button, Input } from '@kudi-inc/dip'
import { fundWallet } from 'services/zonal-heads'
import { toaster } from 'evergreen-ui'
import styles from './fund-wallet.module.scss'
const FundWallet = ({ setShowDialog, zonalHead, setFundAmount }) => {
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)
  const handleFundWallet = async e => {
    e.preventDefault()
    setLoading(true)

    await fundWallet(zonalHead.id, amount)
      .then(({ data }) => {
        setLoading(false)
        setShowDialog(false)
        toaster.success('Processing Top Up')
        setFundAmount(amount)
      })
      .catch(data => {
        setLoading(false)
        if (data && data.data.message) return toaster.danger(data.data.message)
        toaster.danger('Top Up Wallet Failed')
      })
  }
  return (
    <Card className={styles.FundWallet}>
      <CardHeader className={styles.FundWalletHeader}>Fund Wallet</CardHeader>
      <CardBody className={styles.FundWalletBody}>
        <form onSubmit={handleFundWallet} className={styles.FundWalletForm}>
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
            onChange={e => setAmount(e.target.value)}
            name="amount"
            type="number"
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
