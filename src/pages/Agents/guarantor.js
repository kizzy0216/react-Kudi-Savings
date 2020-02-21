import React, { useState } from 'react'
import { Button, Input, Select } from '@kudi-inc/dip'
import styles from './create-agent.module.scss'
import { Close, Back } from 'assets/svg'
const Guarantor = ({ step, setStep, agent, handleAgent }) => {
    const [id, setId] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const handleChange = event => {
        setIsSubmitted(true)
        setId(URL.createObjectURL(event.target.files[0]))
    }
    const [guarantor, setGuarantor] = useState({})
    const handleGuarantor = ({ target }) => {
        setGuarantor({ ...guarantor, [target.name]: target.value })
    }

    return (
        <div className={styles.CAGuarantor}>
            <form className={styles.CAGuarantorForm}>
                <div className={styles.CAGuarantorFormFlex}>
                    <div>
                        <Input
                            type="text"
                            name="firstName"
                            required
                            value={guarantor.firstName}
                            onChange={e => handleGuarantor(e)}
                            label="First name"
                        />
                        <Input
                            type="tel"
                            label="Phone number"
                            name="phoneNumber"
                            required
                            value={guarantor.phoneNumber}
                            onChange={e => handleGuarantor(e)}
                        />
                        <Input
                            type="text"
                            label="BVN"
                            name="bvn"
                            required
                            value={guarantor.bvn}
                            onChange={e => handleGuarantor(e)}
                        />
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
                        <Input
                            type="text"
                            name="lastName"
                            value={guarantor.lastName}
                            onChange={e => handleGuarantor(e)}
                            label="Last name"
                            required
                        />
                        <Input
                            type="text"
                            label="Email address"
                            name="email"
                            onChange={e => handleGuarantor(e)}
                            required
                            value={guarantor.email}
                        />
                        <Input
                            type="text"
                            label="Address"
                            name="address"
                            onChange={e => handleGuarantor(e)}
                            required
                            value={guarantor.address}
                        />
                        <div className={styles.CAFormTwo}>
                            <Select     onChange={e => handleGuarantor(e)} label="Select State" options={[]} />

                            <Select     onChange={e => handleGuarantor(e)} label="Select LGA" options={[]} />
                        </div>
                    </div>
                </div>
                <Button
                    type="button"
                    className={styles.CAFormButton}
                    onClick={() => setStep(step + 1)}
                >
                    Continue
                </Button>
            </form>
        </div>
    )
}
export default Guarantor
