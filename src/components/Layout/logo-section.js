import React from 'react'
import styles from './layout.module.scss'
import { Button } from '@kudi-inc/dip'
import { ChevronLeft, Wallet } from 'assets/svg'

const LogoSection = () => {
    return (
        <div className={styles.logoSection}>
            <div class="dashboardLayout_agentAvatar__q8Ebz">
                <img alt="" />
            </div>
            <div className={styles.logoSection_Content}>
                <div>Business Name</div>
                <span>08087948111</span>
            </div>
            <Button className={styles.logoSection_btn}>Fund Wallet</Button>
        </div>
    )
}

export default LogoSection
