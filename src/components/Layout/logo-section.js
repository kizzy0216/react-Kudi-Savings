import React from 'react'
import styles from './layout.module.scss'
import { KudiLogo, Avatar, Wallet } from 'assets/svg'
import { formatCurrency } from 'utils/function'
const LogoSection = ({ user }) => {
  return (
    <div className={styles.logoSection}>
      <header className={styles.logoSectionHeader}>
        <KudiLogo />
      </header>
      <div className={styles.logoSectionFlex}>
        <Avatar />

        <div className={styles.logoSectionContent}>
          <p>Name</p>
          <span>{user.firstName? user.firstName:user.username}</span>
        </div>
      </div>
      <div className={styles.logoSectionFlex}>
        <Wallet />
        <div className={styles.logoSectionContent}>
          <p>Wallet Balance</p>
          <span>{formatCurrency(user.walletBalance)}</span>
        </div>
      </div>
    </div>
  )
}

export default LogoSection
