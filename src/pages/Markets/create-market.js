import React, { useState, Fragment } from 'react'
import {
  Input,
  Button,
  Select,
  Card,
  CardHeader,
  CardBody
} from '@kudi-inc/dip'
import cx from 'classnames'
import { toaster } from 'evergreen-ui'
import { ChevronLeft, Close } from 'assets/svg'
import { Header, Content } from 'components/Layout'
import { states } from 'utils/data'
import styles from './markets.module.scss'
import { createMarket } from 'services/markets'
import { marketValidation } from './validation'

const CreateMarket = ({ history }) => {
  const [loading, setLoading] = useState(false)
  const [market, setMarket] = useState({
    name: '',
    city: '',
    state: '',
    lga: '',
  })

  const [errors, setErrors] = useState({})

  const handleMarket = ({ target }) => {
    setMarket({ ...market, [target.name]: target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errors = marketValidation(market)
    setErrors(errors)
    if (Object.keys(errors).length > 0) return
    setLoading(true)
    await createMarket(market)
      .then(() => {
        setLoading(false)
        toaster.success('Market Created Successfully')

        history.goBack()
      })
      .catch(({ response }) => {
        setLoading(false)
        if (response) {
          return toaster.danger('Error creating market')
        }
        toaster.danger('Error Occured, contact Admin')
      })
  }

  return (
    <Fragment>
      <div>
        <Header>
          <p>
            <ChevronLeft role="button" onClick={() => history.goBack()} />
            Create New Market
          </p>
        </Header>
        <Content className={styles.content}>
          <Card className={cx(styles.contentCard, styles.CM)}>
            <CardHeader className={styles.CMHeader}>
              <div>FILL IN YOUR INFORMATION BELOW</div>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit} className={styles.CMForm}>
                <Input
                  type="text"
                  name="name"
                  value={market.name}
                  label="Market name"
                  onChange={e => handleMarket(e)}
                  autoComplete="name"
                  error={errors.name}
                  status={errors.name && 'error'}
                />
                <Input
                  type="text"
                  autoComplete="city"
                  name="city"
                  label="City"
                  value={market.city}
                  onChange={e => handleMarket(e)}
                  status={errors.city && 'error'}
                  error={errors.city}
                />

                <Select
                  onSelect={state => setMarket({ ...market, state })}
                  name="state"
                  value={market.state}
                  label="Select State"
                  options={states}
                  autoComplete="state"
                  error={errors.state}
                  status={errors.state && 'error'}
                />
                <Input
                  type="text"
                  autoComplete="lga"
                  name="lga"
                  label="lga"
                  value={market.lga}
                  onChange={e => handleMarket(e)}
                  status={errors.lga && 'error'}
                  error={errors.lga}
                />
                {/* <Input
                  type="text"
                  autoComplete="population"
                  name="population"
                  label="population"
                  value={market.population}
                  onChange={e => handleMarket(e)}
                  status={errors.population && 'error'}
                  error={errors.population}
                /> */}
                <div className={styles.CMFormSubmit}>
                  <Button
                    type="submit"
                    className={styles.CAFormButton}
                    loading={loading}
                  >
                    Submit
                  </Button>
                  <Button
                    type="submit"
                    icon={<Close />}
                    variant="flat"
                    onClick={() => history.goBack()}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </Content>
      </div>
    </Fragment>
  )
}
export default CreateMarket
