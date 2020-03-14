import React, { useState } from 'react'
import {  Card, CardHeader, CardBody } from '@kudi-inc/dip'
import { toaster } from 'evergreen-ui'
import styles from './settings.module.scss'
import { changePassword } from 'services/auth'
import { passwordValidation } from './validation'

const EditProfile = ({ setShowEdit }) => {
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
        // refetch({ disableThrow: true })
        setShowEdit(false)
      })
      .catch(data => {
        let { response } = data
        setLoading(false)
        if (response) {
          return toaster.danger('Error updating Admin details')
        }
        toaster.danger('Error Occured, contact Admin')
      })
  }
  const handleChange = ({ target }) => {
    setPassword({ ...password, [target.name]: target.value })
  }

  return (
    <Card className={styles.Change}>
      <CardHeader className={styles.ChangeHeader}>Edit Profile</CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className={styles.ChangeBody}>
          <h3>Edit User Profile not available yet</h3>
        </form>
      </CardBody>
    </Card>
  )
}
export default EditProfile
