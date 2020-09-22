import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Card, CardBody, CardHeader, Button, Input } from '@kudi-inc/dip'
import { toaster } from 'evergreen-ui'
import styles from './debit-plan.module.scss'
import { getPlan } from 'services/plans'
import { processTransaction } from 'services/markets'

const DebitPlan = ({ setShowDebit, id, phoneNumber }) => {
  const { data, refetch } = useQuery(['Plan', { id: id }], getPlan)

  let plan = data?.data?.data ?? {}

  const [amount, setAmount] = useState(0)
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)

  const transaction_type = 'DEBIT'

  const handleTransaction = async e => {
    e.preventDefault()
    setLoading(true)
    await processTransaction(plan.id, amount, transaction_type, reason)
      .then(({ data }) => {
        setLoading(false)
        toaster.success('Debit Plan Processed')
        refetch({ disableThrow: true })
        setReason({ reason })
        setShowDebit(false)
      })
      .catch(data => {
        setLoading(false)

        if (data?.data?.message) return toaster.danger(data.data.message)
        toaster.danger('Credit Plan Failed')
      })
  }

  return (
    <Card className={styles.DebitPlan}>
      <CardHeader className={styles.DebitPlanHeader}>Debit Plan</CardHeader>
      <CardBody className={styles.DebitPlanBody}>
        <form className={styles.DebitPlanForm} onSubmit={handleTransaction}>
          <Input
            type="text"
            label="Plan"
            placeholder=""
            value={plan?.plan?.title}
            disabled
          />
          <Input
            type="text"
            label="Wallet Number"
            placeholder=""
            value={phoneNumber}
            disabled
          />
          <Input
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
            name="amount"
            type="number"
            label="Amount"
          />
          <Input
            value={reason}
            onChange={e => setReason(e.target.value)}
            name="Reason for debit"
            type="text"
            label="Reason for debit"
            placeholder=""
          />
          <Button type="submit" loading={loading}>
            Submit
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}

export default DebitPlan
