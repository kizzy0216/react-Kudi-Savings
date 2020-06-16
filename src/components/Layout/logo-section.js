import React from 'react'
import styles from './layout.module.scss'
import { Button } from '@kudi-inc/dip'
import { KudiLogo, Avatar, Wallet } from 'assets/svg'
import { formatCurrency } from 'utils/function'
const LogoSection = ({ user, history }) => {
  return (
    <div className={styles.logoSection}>
      <header className={styles.logoSectionHeader}>
        <KudiLogo />
      </header>
      <div className={styles.logoSectionFlex}>
        <Avatar />

        <div className={styles.logoSectionContent}>
          <p>Name</p>
          <span>{user.firstName ? user.firstName : user.username}</span>
        </div>
      </div>
      <div className={styles.logoSectionFlex}>
        <Wallet />
        <div className={styles.logoSectionContent}>
          <p>Wallet Balance</p>
          <span>{formatCurrency(user.walletBalance)}</span>
        </div>
      </div>
      <div className={styles.logoSectionFlex}>
        <Button
          variant="flat"
          icon={null}
          className={styles.logoSectionButton}
          onClick={() => history.push('/wallet-history')}
        >
          WALLET HISTORY
        </Button>
      </div>
    </div>
  )
}

export default LogoSection
