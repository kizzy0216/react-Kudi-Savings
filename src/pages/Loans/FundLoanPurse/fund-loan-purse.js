import React, { useState, Fragment, useContext } from 'react'
import { useQuery } from 'react-query'
import { Header, Content } from 'components/Layout'
import { toaster } from 'evergreen-ui'
import { ChevronLeft, Close } from 'assets/svg'
import styles from './fund-loan.module.scss'
import { Card, CardBody, CardHeader, Button, Input } from '@kudi-inc/dip'
import cx from 'classnames'
import { FundPurse ,getWalletIdForLoan} from 'services/admin'
import AuthContext from 'context/AuthContext'

const FundLoanPurse = ({ history }) => {
  const [auth] = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState(0)
  const [successful, setIsSuccessful] = useState(false)
  const type = 'LOAN'

  const { data } = useQuery(
   [
      'getWallet',
      {}
    ],
    getWalletIdForLoan
  )

  let id = data?.data?.data.walletId


  console.log(id)
  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    await FundPurse(amount, id)
    .then(({data}) => {
      setLoading(false)
        toaster.success('Credit Loan Purse Processed')
        history.goBack()
    })
    .catch( data => {
      setLoading(false)

        if (data?.data?.message) return toaster.danger(data.data.message)
        toaster.danger('Credit Loan Purse Failed')
    })

  }
  return (
    <Fragment>
      <Header>
        <p>
          <ChevronLeft role="button" onClick={() => history.goBack()} />
          Fund Loan Purse
        </p>
      </Header>
      <Content className={styles.content}>
        <Card className={cx(styles.contentCard, styles.FundLoan)}>
          <CardHeader className={styles.FundLoanHeader}>Fund Loan Purse</CardHeader>
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
              <Button
                    type="submit" 
                    loading={loading}
                  >
                    Submit
                  </Button>
                  </div>
            </form>
          </CardBody>
        </Card>
      </Content>
    </Fragment>
  )
}

export default FundLoanPurse
