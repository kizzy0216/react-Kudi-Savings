import React from 'react'
import { Button, Input, Select } from '@kudi-inc/dip'
import styles from './create-agent.module.scss'
const Form = ({ step, setStep }) => (
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
                        <div className={styles.CAFormTwoCheck}>
                            <p>Male</p>
                            <div className={styles.CAFormTwoCheckbox}>
                                <input
                                    type="checkbox"
                                    value="None"
                                    id="roundedOne"
                                    name="check"
                                    checked={true}
                                />
                                <label for="roundedOne"></label>
                            </div>
                        </div>
                        <div className={styles.CAFormTwoCheck}>
                            <p>Female</p>
                            <div className={styles.CAFormTwoCheckbox}>
                                <input
                                    type="checkbox"
                                    value="None"
                                    id="roundedOne"
                                    name="check"
                                    checked={false}
                                />
                                <label for="roundedOne"></label>
                            </div>
                        </div>
                       
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
            <Button type="button" className={styles.CAFormButton} onClick={() => setStep(step + 1)}>
                Continue
            </Button>
        </div>
    </form>
)
export default Form
