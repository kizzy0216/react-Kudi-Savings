import React, { useContext } from 'react'
import styles from './layout.module.scss'
import { Button } from '@kudi-inc/dip'
import { Wallet } from 'assets/svg'
import AuthContext from 'context/AuthContext'
import { formatCurrency } from 'utils/function'
const LoanSection = ({ user, history }) => {
  let [auth] = useContext(AuthContext)

  return (
    <>
      {auth.type.includes('ADMIN') && (
        <div className={styles.logoSection}>
          <div className={styles.logoSectionFlex}>
            <Wallet />
            <div className={styles.logoSectionContent}>
              <p>Loan Purse Balance</p>
              <span>{"Loan Purse loading"}</span>
            </div>
          </div>
          <div className={styles.logoSectionFlex}>
            <Button
              onClick={() => {
                console.log(JSON.stringify(user))
                history.push({pathname:'/fund-purse'})
              }}
              className={styles.logoSectionFundButton}
              type="button"
            >
              Fund Loan Purse
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
export default LoanSection
