import React from 'react'
import { Button, Input } from '@kudi-inc/dip'
import styles from './create-agent.module.scss'
import {Close} from "assets/svg"
const Form = ({ step, setStep }) => (
    <form className={styles.CAID}>
        <div className={styles.CAIDUpload}>
        <div className={styles.CAIDOverlay}>
            <input type="file" />
            </div>
            <p> Upload Valid Identity Card</p>
            <div className={styles.CAIDSubmit}>
            <Button onClick={() => setStep(step + 1)} type="submit">
                Continue
            </Button>
            <Button icon={<Close/>} variant="flat" onClick={() => setStep(step - 1)} type="submit">
                Cancel
            </Button>
            </div>
        </div>
    </form>
)
export default Form
