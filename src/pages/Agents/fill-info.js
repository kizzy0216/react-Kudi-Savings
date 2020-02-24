import React, { useState } from 'react'
import { Button, Input, Select } from '@kudi-inc/dip'
import styles from './create-agent.module.scss'
import {states} from "./states"
import { Close } from 'assets/svg'
const Form = ({ step, setStep, handleAgent, agent }) => {
    const [id, setId] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const handleChange = event => {
        setIsSubmitted(true)
        setId(URL.createObjectURL(event.target.files[0]))
    }
    return (
        <form className={styles.CABody}>
            <div className={styles.CABodyUpload}>
                {!isSubmitted ? (
                    <div className={styles.CABodyOverlay}>
                        <input
                            accept="image/*"
                            type="file"
                            onChange={handleChange}
                        />
                    </div>
                ) : (
                    <img src={id} alt="id card" />
                )}
                <div className={styles.CABodyUploadFlex}>
                    <p>Upload Picture</p>
                    {isSubmitted && (
                        <Button
                            icon={<Close />}
                            variant="flat"
                            onClick={() => setIsSubmitted(!isSubmitted)}
                            type="button"
                        >
                            Remove
                        </Button>
                    )}
                </div>
            </div>
            <div>
                <div className={styles.CAForm}>
                    <div>
                        <Input
                            type="text"
                            required
                            name="firstName"
                            value={agent.firstName}
                            label="First name"
                            onChange={e => handleAgent(e)}
                        />
                        <Input
                            type="tel"
                            required
                            name="phoneNumber"
                            label="Phone number"
                            value={agent.phoneNumber}
                            onChange={e => handleAgent(e)}
                        />
                        <Input
                            type="number"
                            required
                            name="bvn"                      
                            label="BVN"
                            value={agent.bvn}
                            onChange={e => handleAgent(e)}
                        />
                        <Select
                            required
                            name="marketId"
                            value={agent.marketId}
                            label="Assign Market"
                            options={[]}
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
                                        checked={agent.gender==="MALE"}
                                        onChange={(e)=> handleAgent(e)}
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
                                        checked={agent.gender==="FEMALE"}
                                        onChange={(e)=> handleAgent(e)}
                                    />
                                    <label htmlFor="FEMALE"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Input
                            type="text"
                            label="Last name"
                            required
                            name="lastName"
                            value={agent.lastName}
                            onChange={e => handleAgent(e)}
                        />
                        <Input
                            type="email"
                            required
                            name="email"
                            value={agent.email}
                            label="Email address"
                            onChange={e => handleAgent(e)}
                        />
                        <Input
                            type="date"
                            name="dob"
                            required
                            value={agent.dob}
                            label="Date of Birth"
                            onChange={e => handleAgent(e)}
                        />
                        <Input
                            type="text"
                            name="address"
                            value={agent.address}
                            label="Address"
                            required
                            onChange={e => handleAgent(e)}
                        />
                        <div className={styles.CAFormTwo}>
                            <Select
                                name="state"
                                value={agent.state}
                                required
                                label="Select State"
                                options={states}
                            />

                            <Select
                                label="Select LGA"
                                value={agent.lga}
                                required
                                options={[]}
                            />
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
            </div>
        </form>
    )
}
export default Form
