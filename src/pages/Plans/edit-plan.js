import React, { useState, Fragment } from 'react'
import {
  Input,
  Button,
  Select,
  Card,
  CardHeader,
  CardBody
} from '@kudi-inc/dip'
import { toaster } from 'evergreen-ui'
import styles from './plans.module.scss'
import { editPlan } from 'services/plans'
import { editValidation } from './validation'

const CreatePlan = ({ planInfo, refetch, setShow }) => {
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState(planInfo)
  const [errors, setErrors] = useState({})
  const handleplan = ({ target }) => {
    setPlan({ ...plan, [target.name]: target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errors = editValidation(plan)
    setErrors(errors)
    if (Object.keys(errors).length > 0) return
    setLoading(true)
    await editPlan(plan)
      .then(() => {
        setLoading(false)
        toaster.success('Plan Updated Successfully')
        refetch({ disableThrow: true })
        setShow(false)
      })
      .catch(data => {
        let { response } = data
        setLoading(false)
        if (response) {
          return toaster.danger('Error editing plan')
        }
        toaster.danger('Error Occured, contact Admin')
      })
  }

  return (
    <Card className={styles.Edit}>
      <CardHeader className={styles.EditHeader}>
        <div>EDIT PLAN</div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className={styles.EditBody}>
          <Input
            type="text"
            name="title"
            value={plan.title}
            label="Title"
            onChange={e => handleplan(e)}
            autoComplete="name"
            error={errors.title}
            status={errors.title && 'error'}
          />
          <Input
            type="text"
            autoComplete="low"
            name="low"
            label="Low"
            value={plan.low}
            onChange={e => handleplan(e)}
            status={errors.low && 'error'}
            error={errors.low}
          />

          <Input
            type="text"
            autoComplete="high"
            name="high"
            label="high"
            value={plan.high}
            onChange={e => handleplan(e)}
            status={errors.high && 'error'}
            error={errors.high}
          />

          <div className={styles.EditFormSubmit}>
            <Button
              type="submit"
              className={styles.CAFormButton}
              loading={loading}
            >
              Submit
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}
export default CreatePlan
