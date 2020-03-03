import React, { useState, useContext, Fragment } from 'react'
import { useQuery } from 'react-query'
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Select
} from '@kudi-inc/dip'
import { Header, Content } from 'components/Layout'
import { ChevronLeft } from 'assets/svg'
import { updateZH, getAgent } from 'services/zonal-heads'
import { toaster } from 'evergreen-ui'
import styles from './zonal-heads.module.scss'
import { states } from 'utils/data'
import AuthContext from 'context/AuthContext'
import { isValidEdit } from './validation'

const EditAgent = ({ history, zonalHead, setShowEdit }) => {
  const [auth] = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [edited, setEdited] = useState(zonalHead)
  const handleEditZh = async e => {
    e.preventDefault()
    const errors = isValidEdit(edited)

    setErrors(errors)
    if (Object.keys(errors).length > 0) return

    setLoading(true)

    let {
      token,
      tokenExpired,
      tokenExpiredAt,
      timeCreated,
      cashBalance,
   lastCollectionTime,
      totalCustomers,
      walletId,
      status,
      manager,
      amountSeeded,
      ...rest
    } = edited
    try {
      await updateZH(rest)
      setLoading(false)
      toaster.success('AH Details Updated')
      history.goBack()
    } catch (e) {
      setLoading(false)
      if (e.data.message) {
        return toaster.danger(e.data.message)
      }
      toaster.danger('Update ZH Failed')
    }
  }

  return (
    <Card className={styles.Edit}>
      <CardHeader className={styles.EditHeader}>Edit Zonal HeaD</CardHeader>
      <CardBody className={styles.EditBody}>
        <form onSubmit={handleEditZh} className={styles.EditForm}>

          <Input
            type="text"
            label="First Name"
            name="firstName"
            value={edited.firstName}
            onChange={e =>
              setEdited({ ...edited, firstName: e.target.value })
            }
          />
          <Input
            type="text"
            label="Last Name"
            name="lastName"
            value={edited.lastName}
            onChange={e =>
              setEdited({ ...edited, lastName: e.target.value })
            }
          />
          <Input
            type="text"
            label="Phone Number"
            value={edited.phoneNumber ? edited.phoneNumber : ''}
            onChange={e =>
              setEdited({ ...edited, phoneNumber: e.target.value })
            }
          />
          <Input
            value={edited.email}
            name="email"
            type="text"
            label="Email"
            onChange={e => setEdited({ ...edited, email: e.target.value })}
          />
         

          <Select
            onSelect={gender => setEdited({ ...edited, gender })}
            name="gender"
            value={edited.gender}
            label="Gender"
            options={[
              { text: 'Male', value: 'MALE' },
              { text: 'Female', value: 'FEMALE' }
            ]}
            autoComplete="gender"
            error={errors.gender}
            status={errors.gender && 'error'}
          />
          
          <Input
            value={edited.address}
            name="address"
            type="text"
            label="Address"
            onChange={e => setEdited({ ...edited, lga: e.target.value })}
            error={errors.lga}
            status={errors.lga && 'error'}
          />
         

          <Button type="submit" loading={loading}>
            Submit
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}
export default EditAgent
