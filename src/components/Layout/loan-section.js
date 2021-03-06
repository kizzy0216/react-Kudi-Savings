import React, { useContext, useState } from 'react'
import styles from './layout.module.scss'
import { Button } from '@kudi-inc/dip'
import { Wallet } from 'assets/svg'
import AuthContext from 'context/AuthContext'
import { formatCurrency } from 'utils/function'
import { getWallets} from 'services/admin'
import { useQuery } from 'react-query'
import moment from 'moment'
import { useLocation } from 'react-router-dom'

const LoanSection = ({ history, setShowFundPurse }) => {
  let [auth] = useContext(AuthContext)
  let location = useLocation()

  const { data} = useQuery(['LoanPurseBalance', {}], getWallets)


  let purseData = data?.data?.data ?? {}

  return (
    <>
      {['ADMIN', 'LOANS_MANAGER'].includes(auth.type) &&
        !auth.type.includes('SUPER_ADMIN') && (
          <>
            {location.pathname === '/loans' && (
              <div className={styles.logoSection}>
                <div className={styles.logoSectionFlex}>
                  <Wallet />
                  <div className={styles.logoSectionContent}>
                    <p>Loan Purse Balance</p>
                    <span>{formatCurrency(purseData.fundingBalance || 0)}</span>
                  </div>
                </div>
                <>
                  {!auth.type.includes('LOANS_MANAGER') && (
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
                  )}
                </>
              </div>
            )}
          </>
        )}
    </>
  )
}
export default LoanSection
