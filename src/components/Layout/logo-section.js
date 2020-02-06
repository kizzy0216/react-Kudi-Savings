import React from 'react'
import styles from './layout.module.scss'
import { Button } from '@kudi-inc/dip'
import { KudiLogo, Avatar, Wallet } from 'assets/svg'

const LogoSection = ({ history }) => {
    return (
        <div className={styles.logoSection}>
            <header className={styles.logoSectionHeader}>
                <KudiLogo />
            </header>
            <div className={styles.logoSectionFlex}>
                <Avatar />

                <div className={styles.logoSectionContent}>
                    <p> Business Name</p>
                    <span>08000000000</span>
                </div>
            </div>
            <div className={styles.logoSectionFlex}>
                <Wallet />
                <div className={styles.logoSectionContent}>
                    <p>Wallet Balance</p>
                    <span>&#8358; 500,000</span>
                </div>
            </div>
            <div className={styles.logoSectionFlex}>
                <Button
                    className={styles.logoSectionButton}
                    onClick={() => history.push('/fund-wallet')}
                >
                    Fund Wallet
                </Button>
            </div>
        </div>
    )
}

export default LogoSection
