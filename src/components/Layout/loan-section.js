import React, { useContext, useState } from 'react'
import styles from './layout.module.scss'
import { Button } from '@kudi-inc/dip'
import { Wallet } from 'assets/svg'
import AuthContext from 'context/AuthContext'
import { formatCurrency } from 'utils/function'
import { dashboardOverview } from 'services/loans'
import { useQuery } from 'react-query'
import moment from 'moment'
import { useLocation } from 'react-router-dom'

const LoanSection = ({ history, setShowFundPurse }) => {
  let [auth] = useContext(AuthContext)
  let location = useLocation()

  console.log(location)

  const initialFrom = moment()
    .subtract(29, 'days')
    .format('YYYY-MM-DD')
  const initialTo = moment()
    .format('YYYY-MM-DD')

  const params = { from: initialFrom, to: initialTo }
  const { data } = useQuery(['LoanPurseBalance', params], dashboardOverview)

  let purseData = data?.data?.data ?? {}

  return (
    <>
      {auth.type.includes('ADMIN') && !auth.type.includes('SUPER_ADMIN') &&(
        <>
        {location.pathname === '/loans' &&(
        <div className={styles.logoSection}>
          <div className={styles.logoSectionFlex}>
            <Wallet />
            <div className={styles.logoSectionContent}>
              <p>Loan Purse Balance</p>
              <span>{formatCurrency(purseData.walletBalance || 0)}</span>
            </div>
          </div>
          <div className={styles.logoSectionFlex}>
            <Button
              // onClick={() => {
              //   history.push({pathname:'/fund-purse'})
              // }}
              onClick={() => {
                history.push('/loans')
                setShowFundPurse(true)
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
      )}
    </>
  )
}
export default LoanSection
