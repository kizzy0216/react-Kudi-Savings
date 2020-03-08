import React, { useEffect, useState } from 'react'
import { withAuth } from 'utils/hoc'
import { Link } from 'react-router-dom'
import { Button, AuthLayout, Input } from '@kudi-inc/dip'
import { useForm } from 'components/Form'
import LoginImage from 'assets/images/savings.png'
import LoginTiny from 'assets/images/savings-tiny.png'
import { PhoneWarning } from 'assets/svg'
import validation from './validation'
import styles from './auth.module.scss'
import { loginUser } from 'services/auth'
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

  async function submitData() {
    setIsLoading(true)
    await loginUser(values)
      .then(({ data }) => {
        setIsLoading(false)
        setUser(data.data)
        history.push(`/`)
      })
      .catch(data => {
        setIsLoading(false)
        if (data && data.response) {
          if (data.response) {
            return setAuthError(data.response.data.message)
          }
          return setAuthError('Weird! an error occured')
        }
        return setAuthError('Weird! an error occured')
      })
  }

  return (
    <AuthLayout
      infoBackground={LoginImage}
      infoBackgroundPlaceholder={LoginTiny}
    >
      <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
        <h2 className={styles.formIntro}>
          {authError ? authError : 'Hello, welcome back.'}
        </h2>
        <Input
          label="Email Address"
          placeholder="xxx@kudi.com"
          onChange={handleChange}
          value={values.username}
          required
          type="email"
          name="username"
          id="username"
          error={errors.username}
          className="formInput"
          autoComplete="username"
        />

        <Input
          id="password"
          onChange={handleChange}
          value={values.password}
          name="password"
          type="password"
          label="Password"
          error={errors.password}
          required
          className="formInput"
          autoComplete="password"
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
