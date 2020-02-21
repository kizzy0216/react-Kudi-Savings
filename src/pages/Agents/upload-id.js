import React, { useState } from 'react'
import { Button } from '@kudi-inc/dip'
import styles from './create-agent.module.scss'
import { Close, Back } from 'assets/svg'
const Form = ({ step, setStep }) => {
    const [id, setId] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const handleImageChange = event => {
        setIsSubmitted(true)
        setId(URL.createObjectURL(event.target.files[0]))
    }
    return (

        <form className={styles.CAID}>
            <div className={styles.CAIDUpload}>
                {!isSubmitted ? (
                    <div className={styles.CAIDOverlay}>
                        <input
                            accept="image/*"
                            type="file"
                            onChange={handleImageChange}
                        />
                    </div>
                ) : (
                    <img src={id} alt="id card" />
                )}

                <div className={styles.CAIDUploadFlex}>
                    <p>Upload Valid Identity Card</p>
                    {isSubmitted && (
                        <Button
                        icon={<Close />}
                        variant="flat"
                        onClick={() => setIsSubmitted(!isSubmitted)}
                        type="button"
                    >
                    Remove Image
                    </Button>
                        
                    )}
                </div>
                <div className={styles.CAIDSubmit}>
                    <Button onClick={() => setStep(step + 1)} type="submit">
                        Continue
                    </Button>
                    <Button
                        icon={<Back />}
                        variant="flat"
                        onClick={() => setStep(step - 1)}
                        type="button"
                    >
                        Back
                    </Button>
                </div>
            </div>
        </form>
    )
}
export default Form
