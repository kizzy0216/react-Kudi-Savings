import React from 'react'
import { Button, Input, Select } from '@kudi-inc/dip'
import styles from './create-agent.module.scss'
const Form = ({step, setStep}) => (
    <form className={styles.CABody}>
        <div className={styles.CABodyUpload}>
        <div className={styles.CABodyOverlay}>
            <input type="file" />
            </div>
            <p>Upload Picture</p>
        </div>
        <div>
            <div className={styles.CAForm}>
                <div>
                    <Input type="text" label="First name" />
                    <Input type="tel" label="Phone number" />
                    <Input type="text" label="Business Name" />
                    <div className={styles.CAFormTwo}>
                        <Input type="checkbox" />

                        <Input type="checkbox" />
                    </div>
                </div>
                <div>
                    <Input type="text" label="Last name" />
                    <Input type="text" label="Email address" />
                    <Input type="text" label="Address" />
                    <div className={styles.CAFormTwo}>
                        <Select label="Select State" options={[]} />

                        <Select label="Select LGA" options={[]} />
                    </div>
                </div>
            </div>
            <Button type="button" onClick={()=> setStep(step+1)}>Continue</Button>
        </div>
    </form>
)
export default Form
