import React from 'react'
import { Button, Input } from '@kudi-inc/dip'
import styles from './create-agent.module.scss'
import AgentImg from 'assets/images/agent.png'
import { Resend } from 'assets/svg'
const Otp = () => (
    <form className={styles.CAOtp}>
        <div className={styles.CAOtpBody}>
            <img src={AgentImg} alt="agent" />
            <p>
                We sent a text message to 080234567890, enter the 4-digit code
                below to continue.
            </p>
            <div className={styles.CAOtpBodyForm}>
                <form>
                    <input placeholder="0" />
                    <input placeholder="0" />
                    <input placeholder="0" />
                    <input placeholder="0" />
                </form>
            </div>
            <div className={styles.CAOtpSubmit}>
                <Button variant="flat" icon={<Resend />} type="button">
                    Resend OTP
                </Button>
                <p>Time Left 01 : 33</p>
            </div>
        </div>
    </form>
)
export default Otp
