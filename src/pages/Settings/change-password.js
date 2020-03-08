import React, { useState } from 'react'
import { Input, Card, CardHeader, CardBody, Button } from '@kudi-inc/dip'
import { toaster } from 'evergreen-ui'
import styles from './settings.module.scss'
import { changePassword } from 'services/auth'
import { passwordValidation } from './validation'

const ChangePassword = ({  setShow }) => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: ''
  })
  const handleSubmit = async e => {
    e.preventDefault()

    const errors = passwordValidation(password)
    setErrors(errors)
    if (Object.keys(errors).length > 0) return
    setLoading(true)
    await changePassword(password)
      .then(response => {
        setLoading(false)
        toaster.success('Password Changed')
        setShow(false)
      })
      .catch(data => {
        let { response } = data
        setLoading(false)
        if (response) {
          return toaster.danger('Error updating Password')
        }
        toaster.danger('Error Occured, contact Admin')
      })
  }
  const handleChange = ({ target }) => {
    setPassword({ ...password, [target.name]: target.value })
  }

  return (
    <Card className={styles.Change}>
      <CardHeader className={styles.ChangeHeader}>Change Password</CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className={styles.ChangeBody}>
          <Input
            name="currentPassword"
            label="Current Password"
            value={password.currentPassword}
            onChange={handleChange}
            error={errors.currentPassword}
            status={errors.currentPassword && 'error'}
          />
          <Input
            name="newPassword"
            label="New Password"
            value={password.newPassword}
            onChange={handleChange}
            error={errors.newPassword}
            status={errors.newPassword && 'error'}
          />

          <Button loading={loading} type="submit">
            Submit
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}
export default ChangePassword
