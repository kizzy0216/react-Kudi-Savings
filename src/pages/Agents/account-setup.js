import React from 'react'
import { Button } from '@kudi-inc/dip'
import {SetupSuccess} from "assets/svg"
import styles from "./create-agent.module.scss"
const AccountSetup = () => {
    return (
        <div className={styles.AccountSetup}>
            <SetupSuccess/>
            <h2> Account Setup Successful</h2>
            <p> An account has being created with wallet number 08023456789.</p>
            <Button>Continue</Button>>
        </div>
    )
}
export default AccountSetup
