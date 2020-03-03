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
const EditMarket = ({ market }) => {
  const [edited, setEdited] = useState(market)
  const [errors, setErrors] = useState({})
  const handleEdit = e => {
    e.preventDefault()
    
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
            error={errors.state}
            status={errors.state && 'error'}
          />
          <Input
            name="population"
            label="Population Size"
            value={edited.population}
            onChange={handleChange}
            error={errors.state}
            status={errors.state && 'error'}
          />
          <Input
            name="city"
            label="City"
            value={edited.city}
            onChange={handleChange}
            error={errors.state}
            status={errors.state && 'error'}
          />
          <Input
            name="lga"
            label="Lga"
            value={edited.lga}
            onChange={handleChange}
            error={errors.state}
            status={errors.state && 'error'}
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
          <Button type="submit">Edit</Button>
        </form>
      </CardBody>
    </Card>
  )
}
export default EditMarket
