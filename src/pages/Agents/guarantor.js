import React from 'react'
import { Button, Input, Select } from '@kudi-inc/dip'
import styles from './create-agent.module.scss'
import { Close, Back } from 'assets/svg'
import { states } from 'utils/data'
const Guarantor = ({ step, setStep, agent, setAgent }) => {
    const handleGuarantor = ({ target }) => {
        setAgent({
            ...agent,
            guarantor: { ...agent.guarantor, [target.name]: target.value }
        })
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
                            value={agent.guarantor.firstName}
                            onChange={e => handleGuarantor(e)}
                            label="First name"
                        />
                        <Input
                            type="tel"
                            label="Phone number"
                            name="phoneNumber"
                            required
                            value={agent.guarantor.phoneNumber}
                            onChange={e => handleGuarantor(e)}
                        />
                        <Input
                            type="text"
                            label="BVN"
                            name="bvn"
                            required
                            value={agent.guarantor.bvn}
                            onChange={e => handleGuarantor(e)}
                        />
                        <div className={styles.CAFormTwo}>
                            <div className={styles.CAFormTwoCheck}>
                                <p>Male</p>
                                <div className={styles.CAFormTwoCheckbox}>
                                    <input
                                        type="checkbox"
                                        value="MALE"
                                        id="MALE"
                                        name="gender"
                                        checked={
                                            agent.guarantor.gender === 'MALE'
                                        }
                                        onChange={e => handleGuarantor(e)}
                                    />
                                    <label htmlFor="MALE"></label>
                                </div>
                            </div>
                            <div className={styles.CAFormTwoCheck}>
                                <p>Female</p>
                                <div className={styles.CAFormTwoCheckbox}>
                                    <input
                                        type="checkbox"
                                        value="FEMALE"
                                        id="FEMALE"
                                        name="gender"
                                        checked={
                                            agent.guarantor.gender === 'FEMALE'
                                        }
                                        onChange={e => handleGuarantor(e)}
                                    />
                                    <label htmlFor="FEMALE"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Input
                            type="text"
                            name="lastName"
                            value={agent.guarantor.lastName}
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
                            value={agent.guarantor.email}
                        />
                        <Input
                            type="text"
                            label="Address"
                            name="address"
                            onChange={e => handleGuarantor(e)}
                            required
                            value={agent.guarantor.address}
                        />
                        <div className={styles.CAFormTwo}>
                            <Select
                                onSelect={state =>
                                    setAgent({ ...agent, state })
                                }
                                name="state"
                                label="Select State"
                                options={states}
                            />

                            <Input
                                type="text"
                                name="lga"
                                required
                                value={agent.guarantor.lga}
                                label="LGA"
                                onChange={e => handleGuarantor(e)}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.CAIDSubmit}>
                    <Button
                        icon={<Back />}
                        variant="flat"
                        onClick={() => setStep(step - 1)}
                        type="button"
                    >
                        Back
                    </Button>
                    <Button onClick={() => setStep(step + 1)} type="button">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )
}
export default Guarantor
