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
import { ChevronLeft, Close } from 'assets/svg'
import { Header, Content } from 'components/Layout'
import { states } from 'utils/data'
import styles from './markets.module.scss'

const CreateMarket = ({ history }) => {
    const [market, setMarket] = useState({
        marketName: '',
        town: '',
        state: '',
        lga: ''
    })

    const [errors, setErrors] = useState({})

    const handleMarket = ({ target }) => {
        setMarket({ ...market, [target.name]: target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
    }
    return (
        <Fragment>
            <div>
                <Header>
                    <p>
                        <ChevronLeft
                            role="button"
                            onClick={() => history.goBack()}
                        />
                        Create New Agent
                    </p>
                </Header>
                <Content className={styles.content}>
                    <Card className={cx(styles.contentCard, styles.CM)}>
                        <CardHeader className={styles.CMHeader}>
                            <div>FILL IN YOUR INFORMATION BELOW</div>
                        </CardHeader>
                        <CardBody>
                            <form
                                onSubmit={handleSubmit}
                                className={styles.CMForm}
                            >
                                <Input
                                    type="text"
                                    required
                                    name="marketName"
                                    value={market.marketName}
                                    label="Market name"
                                    onChange={e => handleMarket(e)}
                                    autoComplete="marketName"
                                    error={errors.marketName}
                                    status={errors.marketName && 'error'}
                                />
                                <Input
                                    type="text"
                                    required
                                    autoComplete="town"
                                    name="town"
                                    label="Town"
                                    value={market.town}
                                    onChange={e => handleMarket(e)}
                                    status={errors.town && 'error'}
                                    error={errors.town}
                                />
                               

                                <Select
                                    onSelect={state =>
                                        setMarket({ ...market, state })
                                    }
                                    name="state"
                                    value={market.state}
                                    required
                                    label="Select State"
                                    options={states}
                                    autoComplete="state"
                                    error={errors.state}
                                    status={errors.state && 'error'}
                                />
                                <Input
                                    type="text"
                                    required
                                    autoComplete="lga"
                                    name="lga"
                                    label="lga"
                                    value={market.lga}
                                    onChange={e => handleMarket(e)}
                                    status={errors.lga && 'error'}
                                    error={errors.lga}
                                />
                                <div className={styles.CMFormSubmit}>
                                    <Button
                                        type="submit"
                                        className={styles.CAFormButton}
                                    >
                                        Submit
                                    </Button>
                                    <Button type="submit" icon={<Close/>} variant="flat">
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
