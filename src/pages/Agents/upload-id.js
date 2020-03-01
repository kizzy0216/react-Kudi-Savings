import React, { useState } from 'react'
import { Button } from '@kudi-inc/dip'
import styles from './create-agent.module.scss'
import { Close, Back } from 'assets/svg'
import { uploadAvatar, createAgent } from 'services/agents'
import { toaster } from 'evergreen-ui'
const Form = ({ step, setStep, agent, setAgent }) => {
    const [progressData, setProgressData] = useState(0)
    const [idUploaded, setIdUploaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState('')

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

    const handleImageChange = async event => {
        setIdUploaded(true)
        let file = new FormData()
        file.append('file', event.target.files[0])
        const response = await uploadAvatar(file, uploadProgress)
        setAgent({
            type: 'UPDATE_ID',
            payload: response.data
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        let { avatar, idCard, ...data } = agent
        if (!agent.identificationImageId) {
            return setErrors('Upload Valid ID Card')
        }
        await createAgent(data)
            .then(({ data }) => {
                setLoading(false)
                toaster.success('Agent Created Successfully')
            })
            .catch(({ response }) => {
                toaster.danger('Create Agent Failed')
            })
    }
    return (
        <form onSubmit={handleSubmit} className={styles.CAID}>
            <div className={styles.CAIDUpload}>
                {!agent.identificationImageId ? (
                    <div className={styles.CAIDOverlay}>
                        <input
                            accept="image/*"
                            type="file"
                            onChange={handleImageChange}
                        />
                    </div>
                ) : (
                    <img src={agent.idCard.thumbnail} alt="id card" />
                )}

                <div className={styles.CAIDUploadFlex}>
                    <p>
                        {!idUploaded ? (
                            errors && errors ? (
                                <span>{errors}</span>
                            ) : (
                                'Upload ID Card'
                            )
                        ) : (
                            <span
                                className={`${
                                    agent.identificationImageId
                                        ? 'img-success'
                                        : ''
                                }`}
                            >
                                {agent.identificationImageId
                                    ? ``
                                    : 'Uploading...'}
                                {progressData === 100 &&
                                !agent.identificationImageId
                                    ? 99
                                    : progressData}
                                %
                            </span>
                        )}
                    </p>
                    {idUploaded && (
                        <Button
                            icon={<Close />}
                            variant="flat"
                            onClick={() => {
                                setAgent({
                                    type: 'REMOVE_ID'
                                })
                                setProgressData(0)
                                return setIdUploaded(!idUploaded)
                            }}
                            type="button"
                        >
                            Remove
                        </Button>
                    )}
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
                    <Button loading={loading} type="submit">
                        Submit
                    </Button>
                </div>
            </div>
        </form>
    )
}
export default Form
