import React, { useState } from 'react'
import { useQuery } from 'react-query'
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Select
} from '@kudi-inc/dip'
import { toaster } from 'evergreen-ui'
import styles from './debit-plan.module.scss'
import { isValidUpdate } from './validation'
import { getPlan } from 'services/plans'

const DebitPlan = ({ setShowCredit, id }) => {
  const { data, refetch } = useQuery(['Plan', { id: id }], getPlan)

  let plan = data?.data?.data ?? {}

  const [amount, setAmount] = useState(0)
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <Card className={styles.DebitPlan}>
      <CardHeader className={styles.DebitPlanHeader}>Credit Plan</CardHeader>
      <CardBody className={styles.DebitPlanBody}>
        <form className={styles.DebitPlanForm}>
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
            value={plan?.plan?.walletNumber ?? 'N/A'}
            disabled
          />
          <Input
            value={amount}
            onChange={e => setAmount(e.target.value)}
            name="amount"
            type="number"
            label="Amount"
          />
          <Input
            value={reason}
            onChange={e => setReason(e.target.value)}
            name="Reason for credit"
            type="text"
            label="Reason for credit"
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
