import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Button, Select } from '@kudi-inc/dip'
import { updateStatus } from 'services/agents'
import { toaster } from 'evergreen-ui'
import styles from './fund-wallet.module.scss'
const UpdateStatus = ({ agent, refetch, setShowStatus }) => {
  const [status, setStatus] = useState(agent.status)
  const [loading, setLoading] = useState(false)
  const handleUpdateStatus = async e => {
    e.preventDefault()
    setLoading(true)

    await updateStatus(agent.id, status)
      .then(() => {
        setLoading(false)
        toaster.success('Status Updated')
        refetch({ disableThrow: true })
        setShowStatus(false)
      })
      .catch(data => {
        if (data && data.data.message) return toaster.danger(data.data.message)
        toaster.danger('Update agent failed')
      })
  }
  return (
    <Card className={styles.FundWallet}>
      <CardHeader className={styles.FundWalletHeader}>Update Status</CardHeader>
      <CardBody className={styles.FundWalletBody}>
        <form onSubmit={handleUpdateStatus} className={styles.FundWalletForm}>
          <Select
            required
            autoComplete="status"
            name="status"
            value={status}
            label="Select Status"
            options={[
              { text: 'ACTIVE', value: 'ACTIVE' },
              { text: 'FRAUDULENT', value: 'FRAUDULENT' },
              { text: 'PENDING', value: 'PENDING' },
              { text: 'SUSPENDED', value: 'SUSPENDED' }
            ]}
            onSelect={status => setStatus(status)}
          />

          <Button type="submit" loading={loading}>
            Submit
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}
export default UpdateStatus
