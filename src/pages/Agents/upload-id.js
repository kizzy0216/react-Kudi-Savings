import React, { useState } from 'react'
import { Button } from '@kudi-inc/dip'
import styles from './create-agent.module.scss'
import { Close, Back } from 'assets/svg'
import Axios from 'utils/axios'
const Form = ({ step, setStep, agent }) => {
    const [id, setId] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const handleImageChange = event => {
        setIsSubmitted(true)
        setId(URL.createObjectURL(event.target.files[0]))
    }
    const handleSubmit=()=>{
        Axios.post(`/agents/create`, agent)
        .then(({ data }) => {
           

        })
        .catch(({ response }) => {
           
        })
    
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
                    <Button
                        icon={<Back />}
                        variant="flat"
                        onClick={() => setStep(step - 1)}
                        type="button"
                    >
                        Back
                    </Button>
                    <Button onClick={()=>handleSubmit} type="submit">
                        Submit
                    </Button>
                </div>
            </div>
        </form>
    )
}
export default Form
