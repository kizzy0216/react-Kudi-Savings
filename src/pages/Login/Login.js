import React, { useEffect, useState } from 'react'
import { withAuth } from 'utils/hoc'
import { Link } from 'react-router-dom';
import { Button, AuthLayout, Input } from '@kudi-inc/dip'
import { useForm } from 'components/Form'
import LoginImage from 'assets/images/savings.png'
import LoginTiny from 'assets/images/savings-tiny.png'
import { PhoneWarning } from 'assets/svg'
import validation from './validation'
import styles from './auth.module.scss'
import Axios from 'utils/axios'

const Login = ({ auth, history }) => {
    const [token, setUser] = auth
    const [authError, setAuthError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    let defaultValues = { email: '', password: '' }
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
            .catch(({ response }) => {
                setIsLoading(false)
                //TODO: temporary response till endpoints are available
                setUser({
                    token: 'helloo',
                    user: values.email
                })
                history.push(`/`)
                // if (response) {
                //     return setAuthError(response.data.data.message)
                // }
                // return setAuthError('Weird!, an error occured')
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
                    label="Email Address"
                    placeholder="xxx@kudi.com"
                    onChange={handleChange}
                    value={values.email}
                    required
                    name="email"
                    id="email"
                    error={errors.email}
                    className="formInput"
                />

                <Input
                    id="password"
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    type="password"
                    label="Password"
                    placeholder=""
                    error={errors.password}
                    required
                    className="formInput"
                />
                <div className={styles.formButtonGroup}>
                    <Button loading={isLoading} type="submit">
                        Submit
                    </Button>
                    <Button
                        type="button"
                        
                        icon={<PhoneWarning />}
                        variant="flat"
                        className={styles.formButtonReset}
                    >
                    <Link to="/forgot-password"> Can’t Login?</Link>
                       
                    </Button>
                </div>
            </form>
        </AuthLayout>
    )
}

export default withAuth(Login)
