import React, { useState, useContext } from 'react'
import { Button, Input, Select } from '@kudi-inc/dip'
import styles from './create-agent.module.scss'
import { states } from 'utils/data'
import { Close } from 'assets/svg'
import { uploadAvatar } from 'services/agents'
import { isInfo } from './validation'
import AuthContext from 'context/AuthContext'

const Form = ({ step, setStep, handleAgent, agent, setAgent }) => {
    const [auth] = useContext(AuthContext)
    const [isUploaded, setIsUploaded] = useState(false)
    const [errors, setErrors] = useState({})

    const [progressData, setProgressData] = useState(0)
    let markets = auth.markets.map(({ city, id }) => ({
        text: city,
        value: id
    }))
    const uploadProgress = {
        onUploadProgress: ProgressEvent => {
            const totalLength = ProgressEvent.lengthComputable
                ? ProgressEvent.total
                : ProgressEvent.target.getResponseHeader('content-length') ||
                  ProgressEvent.target.getResponseHeader(
                      'x-decompressed-content-length'
                  )
            if (totalLength !== null) {
                setProgressData(
                    Math.floor((ProgressEvent.loaded * 100) / totalLength)
                )
            }
        }
    }
    const handleChange = async event => {
        setIsUploaded(true)
        let file = new FormData()
        file.append('file', event.target.files[0])
        const response = await uploadAvatar(file, uploadProgress)

        setAgent({
            type: 'UPDATE_AVATAR',
            payload: response.data
        })
    }

    const handleContinue = () => {
        const errors = isInfo(agent)
        setErrors(errors)
        if (Object.keys(errors).length > 0) return
        setStep(step + 1)
    }

    return (
        <form className={styles.CABody}>
            <div className={styles.CABodyUpload}>
                {!agent.imageId ? (
                    <div className={styles.CABodyOverlay}>
                        <input
                            accept="image/*"
                            type="file"
                            onChange={handleChange}
                        />
                    </div>
                ) : (
                    <img src={agent.avatar.thumbnail} alt="id card" />
                )}
                <div className={styles.CABodyUploadFlex}>
                    <p>
                        {!isUploaded ? (
                            errors && errors.imageId ? (
                                <span>{errors.imageId}</span>
                            ) : (
                                'Upload Picture'
                            )
                        ) : (
                            <span
                                className={`${
                                    agent.imageId ? 'img-success' : ''
                                }`}
                            >
                                {agent.imageId ? `` : 'Uploading...'}
                                {progressData === 100 && !agent.imageId
                                    ? 99
                                    : progressData}
                                %
                            </span>
                        )}
                    </p>
                    {isUploaded && (
                        <Button
                            icon={<Close />}
                            variant="flat"
                            onClick={() => {
                                setAgent({
                                    type: 'REMOVE_AVATAR'
                                })
                                setProgressData(0)
                                return setIsUploaded(!isUploaded)
                            }}
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
                            options={markets}
                            status={errors.marketId && 'error'}
                            error={errors.marketId}
                            onSelect={marketId =>
                                setAgent({
                                    type: 'UPDATE_DETAILS',
                                    payload: { marketId }
                                })
                            }
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
                                    setAgent({
                                        type: 'UPDATE_DETAILS',
                                        payload: { state }
                                    })
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
