import React, { useEffect, useState } from 'react'
import { withAuth } from 'utils/hoc'
import { Button, AuthLayout, Input } from '@kudi-inc/dip'
import { useForm } from 'components/Form'
import LoginImage from 'assets/images/appImg.jpeg'
import LoginTiny from 'assets/images/appImg-tiny.jpeg'
import validation from './validation'
import styles from './auth.module.scss'
import Axios from 'utils/axios'

const Login = ({ auth, history }) => {
    const [token, setUser] = auth
    const [authError, setAuthError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    let defaultValues = { username: '', password: '' }
    const { values, errors, handleChange, handleSubmit } = useForm(
        submitData,
        validation,
        defaultValues
    )
    useEffect(() => {
        if (token) {
            return history.push('/')
        }
    }, [token, history])

    function submitData() {
        setIsLoading(true)
        Axios.post(`/login`, values)
            .then(({ data }) => {
                const { jwt, role, wallet, agent } = data
                setIsLoading(false)
                setUser({
                    token: jwt,
                    role,
                    wallet,
                    agent
                })
                history.push(`/`)
            })
            .catch(response => {
                setIsLoading(false)
                if (response) {
                    setAuthError(response.data.data.message)
                } else {
                    setAuthError('Weird!, an error occured')
                }
            })
    }

    return (
        <AuthLayout
            infoBackground={LoginImage}
            infoBackgroundPlaceholder={LoginTiny}
        >
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.formIntro}>
                    {authError ? authError : 'Hello, welcome back.'}
                </h2>
                <Input
                    label="Phone Number"
                    placeholder="08XXX"
                    onChange={handleChange}
                    value={values.username}
                    required
                    name="username"
                    id="username"
                    error={errors.username}
                    className="formInput"
                />

                <Input
                    id="password"
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    type="password"
                    label="Password"
                    minLength={4}
                    maxLength={4}
                    placeholder=""
                    error={errors.password}
                    required
                    className="formInput"
                />
                <Button loading={isLoading} type="submit">
                    Submit
                </Button>
            </form>
        </AuthLayout>
    )
}

export default withAuth(Login)
