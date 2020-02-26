import React, { useState } from 'react'
import { Button, Input, Select } from '@kudi-inc/dip'
import styles from './create-agent.module.scss'
import { states } from 'utils/data'
import { Close } from 'assets/svg'
import { uploadAvatar } from 'services/agents'
import { isInfo } from './validation'

const Form = ({ step, setStep, handleAgent, agent, setAgent }) => {
    const [id, setId] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState({})

    const handleChange = async event => {
        setIsSubmitted(true)
        setId(URL.createObjectURL(event.target.files[0]))
        let file = new FormData()
        file.append('file', event.target.files[0])
        const response = await uploadAvatar(file)
        setAgent({ ...agent, imageId: response.data.id })
    }

    const handleContinue = () => {
        const errors = isInfo(agent)
        setErrors(errors)
        if (Object.keys(errors).length > 0) return
        setStep(step + 1)
        console.log('got here')
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
                    <p>
                        {!id ? (
                            <>
                                {errors && errors.imageId
                                    ? errors.imageId
                                    : 'Chane Picture'}
                            </>
                        ) : (
                            'Upload Picture'
                        )}
                    </p>
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
                    <div className={styles.CAFormLeft}>
                        <Input
                            type="text"
                            required
                            name="firstName"
                            value={agent.firstName}
                            label="First name"
                            onChange={e => handleAgent(e)}
                            autoComplete="firstname"
                            error={errors.firstName}
                            status={errors.firstName && 'error'}
                        />
                        <Input
                            type="tel"
                            required
                            autoComplete="phoneNumber"
                            name="phoneNumber"
                            label="Phone number"
                            value={agent.phoneNumber}
                            onChange={e => handleAgent(e)}
                            status={errors.phoneNumber && 'error'}
                            error={errors.phoneNumber}
                        />
                        <Input
                            type="number"
                            required
                            autoComplete="bvn"
                            name="bvn"
                            label="BVN"
                            value={agent.bvn}
                            onChange={e => handleAgent(e)}
                            status={errors.bvn && 'error'}
                            error={errors.bvn}
                        />
                        <Select
                            required
                            autoComplete="marketId"
                            name="marketId"
                            value={agent.marketId}
                            label="Assign Market"
                            options={[]}
                            status={errors.marketId && 'error'}
                            error={errors.marketId}
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
                                        checked={agent.gender === 'MALE'}
                                        onChange={e => handleAgent(e)}
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
                                        autoComplete="FEMALE"
                                        name="gender"
                                        checked={agent.gender === 'FEMALE'}
                                        onChange={e => handleAgent(e)}
                                    />
                                    <label htmlFor="FEMALE"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.CAFormRight}>
                        <Input
                            type="text"
                            label="Last name"
                            required
                            autoComplete="lastName"
                            name="lastName"
                            value={agent.lastName}
                            onChange={e => handleAgent(e)}
                            error={errors.lastName}
                            status={errors.lastName && 'error'}
                        />
                        <Input
                            type="email"
                            required
                            autoComplete="email"
                            name="email"
                            value={agent.email}
                            label="Email address"
                            onChange={e => handleAgent(e)}
                            error={errors.email}
                            status={errors.email && 'error'}
                        />
                        <Input
                            type="date"
                            name="dob"
                            required
                            value={agent.dob}
                            label="Date of Birth"
                            onChange={e => handleAgent(e)}
                            error={errors.dob}
                            status={errors.dob && 'error'}
                        />
                        <Input
                            type="text"
                            name="address"
                            value={agent.address}
                            label="Address"
                            autoComplete="address"
                            required
                            onChange={e => handleAgent(e)}
                            error={errors.address}
                            status={errors.address && 'error'}
                        />
                        <div className={styles.CAFormTwo}>
                            <Select
                                onSelect={state =>
                                    setAgent({ ...agent, state })
                                }
                                name="state"
                                value={agent.state}
                                required
                                label="Select State"
                                options={states}
                                autoComplete="state"
                                error={errors.state}
                                status={errors.state && 'error'}
                            />

                            <Input
                                type="text"
                                name="lga"
                                required
                                value={agent.lga}
                                label="LGA"
                                autoComplete="lga"
                                onChange={e => handleAgent(e)}
                                error={errors.lga}
                                status={errors.lga && 'error'}
                            />
                        </div>
                    </div>
                </div>
                <Button
                    type="button"
                    className={styles.CAFormButton}
                    onClick={handleContinue}
                >
                    Continue
                </Button>
            </div>
        </form>
    )
}
export default Form
