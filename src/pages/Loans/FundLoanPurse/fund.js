import React, { useState, useContext } from 'react'
import { useQuery } from 'react-query'
import { Card, CardBody, CardHeader, Button, Input } from '@kudi-inc/dip'
import { Content } from 'components/Layout'
import { toaster } from 'evergreen-ui'
import cx from 'classnames'
import styles from './fund-loan.module.scss'
import { FundPurse } from 'services/admin'
import AuthContext from 'context/AuthContext'

const Fund = ({ setShowFundPurse }) => {
  const [auth] = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState(0)
  const [successful, setIsSuccessful] = useState(false)

  const id = auth.walletId

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    await FundPurse(amount, id)
      .then(({ data }) => {
        setLoading(false)
        toaster.success('Credit Loan Purse Processed')
        setShowFundPurse(false)
      })
      .catch(data => {
        setLoading(false)

        if (data?.data?.message) return toaster.danger(data.data.message)
        toaster.danger('Credit Loan Purse Failed')
      })
  }
  return (
    <Content className={styles.content}>
      <Card className={cx(styles.contentCard, styles.FundLoan)}>
        <CardHeader className={styles.FundLoanHeader}>
          Fund Loan Purse
        </CardHeader>
        <CardBody>
          <form className={styles.FundLoanForm} onSubmit={handleSubmit}>
            <Input
              type="text"
              label="Amount"
              name="Amount"
              value={amount}
              required
              onChange={e => setAmount(e.target.value)}
            />
            <div className={styles.FundLoanFormSubmit}>
              <Button type="submit" loading={loading}>
                Submit
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </Content>
  )
}

export default Fund
