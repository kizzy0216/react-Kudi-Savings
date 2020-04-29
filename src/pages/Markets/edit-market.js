import React, { useState } from 'react'
import {
  Input,
  Card,
  CardHeader,
  CardBody,
  Button,
  Select
} from '@kudi-inc/dip'
import { toaster } from 'evergreen-ui'
import styles from './markets.module.scss'
import { states } from 'utils/data'
import { editMarket } from 'services/markets'
import { marketValidation } from './validation'
const EditMarket = ({ market, setShow, refetch }) => {
  const [loading, setLoading] = useState(false)
  const [edited, setEdited] = useState(market)
  const [errors, setErrors] = useState({})

  const handleEdit = async e => {
    e.preventDefault()

    const errors = marketValidation(edited)
    setErrors(errors)
    if (Object.keys(errors).length > 0) return
    setLoading(true)
    await editMarket(edited)
      .then(() => {
        setLoading(false)
        toaster.success('Market Edited Successfully')
        refetch({ disableThrow: true })
        setShow(false)
      })
      .catch(({ response }) => {
        setLoading(false)
        if (response) {
          return toaster.danger('Error editing market')
        }
        toaster.danger('Error Occured, contact Admin')
      })
  }
  const handleChange = ({ target }) => {
    setEdited({ ...edited, [target.name]: target.value })
  }

  return (
    <Card className={styles.Edit}>
      <CardHeader className={styles.EditHeader}>Edit Market</CardHeader>
      <CardBody>
        <form onSubmit={handleEdit} className={styles.EditBody}>
          <Input
            name="name"
            label="Market Name"
            value={edited.name}
            onChange={handleChange}
            error={errors.name}
            status={errors.name && 'error'}
          />
          {/* <Input
            name="population"
            label="Population Size"
            value={edited.population}
            onChange={handleChange}
            error={errors.population}
            status={errors.population && 'error'}
          /> */}
          <Input
            name="city"
            label="City"
            value={edited.city}
            onChange={handleChange}
            error={errors.city}
            status={errors.city && 'error'}
          />
          <Input
            name="lga"
            label="Lga"
            value={edited.lga}
            onChange={handleChange}
            error={errors.lga}
            status={errors.lga && 'error'}
          />
          <Select
            onSelect={state => setEdited({ ...market, state })}
            name="state"
            value={edited.state}
            label="Select State"
            options={states}
            autoComplete="state"
            error={errors.state}
            status={errors.state && 'error'}
          />
          <Button loading={loading} type="submit">
            Edit
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}
export default EditMarket
