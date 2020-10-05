import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Button, Input } from '@kudi-inc/dip'
import { toaster } from 'evergreen-ui'
import styles from './fund-wallet.module.scss'

const DebitWallet =({ setShowDebitWallet, zonalHead, refetch, setDeductionAmount }) =>{
    const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)
  
  const handleDebitWallet = async e => {
    e.preventDefault()
    setLoading(true)
  }

  return (
    <Card className={styles.FundWallet}>
      <CardHeader className={styles.FundWalletHeader}>Debit Wallet</CardHeader>
      <CardBody className={styles.FundWalletBody}>
        <form onSubmit={handleDebitWallet} className={styles.FundWalletForm}>
          <Input
            type="text"
            label="Name"
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

export default DebitWallet