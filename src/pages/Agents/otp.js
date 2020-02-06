import React from 'react'
import { Button, Input } from '@kudi-inc/dip'
import styles from './create-agent.module.scss'
const Otp = () => (
    <form className={styles.CAOtp}>
        <div className={styles.CAOtp}>
            <img src="" />
            <p>
                We sent a text message to 080234567890, enter the 4-digit code
                below to continue.
            </p>
            <div className={styles.CAOtp}>
                <input />
                <input />
                <input />
                <input />
            </div>
            <Button variant="flat" type="submit">
                Resend OTP{' '}
            </Button>
        </div>
    </form>
)
export default Otp
