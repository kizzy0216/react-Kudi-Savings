import React from 'react'
import { Button, Input } from '@kudi-inc/dip'
import styles from './create-agent.module.scss'
const Form = () => (
    <form className={styles.CAID}>
        <div className={styles.CAIDUpload}>
            <input type="file" />
            <p> Upload Valid Identity Card</p>
            <Button type="submit">Continue</Button>
        </div>
    </form>
)
export default Form
