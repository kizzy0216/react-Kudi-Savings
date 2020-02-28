import React, { useState, Fragment, useEffect } from 'react'
import {
    Input,
    Button,
    Select,
    Card,
    CardHeader,
    CardBody
} from '@kudi-inc/dip'

import cx from 'classnames'
import { toaster, SelectMenu, Button as SelectMenuButton } from 'evergreen-ui'
import { ChevronLeft, Close } from 'assets/svg'
import { Header, Content } from 'components/Layout'
import { states } from 'utils/data'
import styles from './zonal-heads.module.scss'
import { createZH } from 'services/zonal-heads'
import { getMarkets } from 'services/markets'
import { zonalHeadValidation } from './validation'

const CreateZonalHead = ({ history }) => {
    const [loading, setLoading] = useState(false)
    const [markets, setMarkets] = useState([])
    const [marketIds, setMarketIds] = useState([])
    const [selectedNames, setSelectedNames] = useState('')
    const [zonalHead, setZH] = useState({
        firstName: '',
        lastName: '',
        bvn: '',
        email: '',
        gender: 'MALE',
        address: '',
        state: '',
        type: '',
        phoneNumber: ''
    })

    const [errors, setErrors] = useState({})

    const handleZH = ({ target }) => {
        setZH({ ...zonalHead, [target.name]: target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const errors = zonalHeadValidation(zonalHead)
        setErrors(errors)
        if (Object.keys(errors).length > 0) return
        setLoading(true)
        await createZH(zonalHead)
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
                toaster.danger('An Error occured, contact Admin')
            })
    }

    const fetchMarkets = async () => {
        const response = await getMarkets()
        const formatMarket = response.data.data.list.map(({ id, name }) => ({
            value: id,
            label: name
        }))

        setMarkets(formatMarket)
    }
    useEffect(() => {
        fetchMarkets()
    }, [])
    const assignMarket = market => {
        let selectedMarkets
        let selected = []
        if (marketIds.length === 0) {
            selectedMarkets = `${market.label} selected`
            selected = [...marketIds, market.value]
        } else {
            if (marketIds.includes(market.value)) {
                selected = marketIds.filter(item => item !== market.value)
                selectedMarkets = `${selected.length} markets selected`
            } else {
                selected = [...marketIds, market.value]
                selectedMarkets = `${selected.length} markets selected`
            }
        }
        setMarketIds(selected)
        setSelectedNames(selectedMarkets)
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
                        Create Zonal Head
                    </p>
                </Header>
                <Content className={styles.content}>
                    <Card className={cx(styles.contentCard, styles.ZH)}>
                        <CardHeader className={styles.ZHHeader}>
                            <div>FILL INFORMATION BELOW</div>
                        </CardHeader>
                        <CardBody className={styles.ZHBody}>
                            <form
                                onSubmit={handleSubmit}
                                className={styles.ZHForm}
                                autoComplete="off"
                            >
                                <div className={styles.ZHFormBody}>
                                    <Input
                                        type="text"
                                        name="firstName"
                                        value={zonalHead.firstName}
                                        label="First name"
                                        onChange={e => handleZH(e)}
                                        autoComplete="firstname"
                                        error={errors.firstName}
                                        status={errors.firstName && 'error'}
                                    />
                                    <Input
                                        type="text"
                                        label="Last name"
                                        autoComplete="lastName"
                                        name="lastName"
                                        value={zonalHead.lastName}
                                        onChange={e => handleZH(e)}
                                        error={errors.lastName}
                                        status={errors.lastName && 'error'}
                                    />
                                    <Input
                                        type="tel"
                                        autoComplete="phoneNumber"
                                        name="phoneNumber"
                                        label="Phone number"
                                        value={zonalHead.phoneNumber}
                                        onChange={e => handleZH(e)}
                                        status={errors.phoneNumber && 'error'}
                                        error={errors.phoneNumber}
                                    />
                                    <Input
                                        type="email"
                                        autoComplete="email"
                                        name="email"
                                        value={zonalHead.email}
                                        label="Email address"
                                        onChange={e => handleZH(e)}
                                        error={errors.email}
                                        status={errors.email && 'error'}
                                    />
                                    <div className={styles.ZHTwo}>
                                        <div className={styles.ZHTwoCheck}>
                                            <p>Male</p>
                                            <div
                                                className={styles.ZHTwoCheckbox}
                                            >
                                                <input
                                                    type="checkbox"
                                                    value="MALE"
                                                    id="MALE"
                                                    name="gender"
                                                    checked={
                                                        zonalHead.gender ===
                                                        'MALE'
                                                    }
                                                    onChange={e => handleZH(e)}
                                                />
                                                <label htmlFor="MALE"></label>
                                            </div>
                                        </div>
                                        <div className={styles.ZHTwoCheck}>
                                            <p>Female</p>
                                            <div
                                                className={styles.ZHTwoCheckbox}
                                            >
                                                <input
                                                    type="checkbox"
                                                    value="FEMALE"
                                                    id="FEMALE"
                                                    autoComplete="FEMALE"
                                                    name="gender"
                                                    checked={
                                                        zonalHead.gender ===
                                                        'FEMALE'
                                                    }
                                                    onChange={e => handleZH(e)}
                                                />
                                                <label htmlFor="FEMALE"></label>
                                            </div>
                                        </div>
                                    </div>

                                    <Select
                                        onSelect={state =>
                                            setZH({ ...zonalHead, state })
                                        }
                                        name="state"
                                        value={zonalHead.state}
                                        label="Select State"
                                        options={states}
                                        autoComplete="state"
                                        error={errors.state}
                                        status={errors.state && 'error'}
                                    />
                                    <Select
                                        onSelect={type =>
                                            setZH({ ...zonalHead, type })
                                        }
                                        name="state"
                                        value={zonalHead.type}
                                        label="Select Type"
                                        options={[
                                            { value: 'ADMIN', text: 'Admin' },
                                            {
                                                value: 'ZONAL',
                                                text: 'Zonal head'
                                            }
                                        ]}
                                        autoComplete="type"
                                        error={errors.type}
                                        status={errors.type && 'error'}
                                    />
                                    <div className={styles.ZHMultipleSelect}>
                                        <SelectMenu
                                            isMultiSelect
                                            title="Select multiple markets"
                                            options={markets}
                                            selected={selectedNames}
                                            onSelect={market =>
                                                assignMarket(market)
                                            }
                                            onDeselect={() =>
                                                console.log('hmm')
                                            }
                                        >
                                            <SelectMenuButton type="button">
                                                {selectedNames ||
                                                    'Select Markets...'}
                                            </SelectMenuButton>
                                        </SelectMenu>
                                    </div>
                                </div>
                                <div className={styles.ZHFormSubmit}>
                                    <Button
                                        type="submit"
                                        className={styles.ZHButton}
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

export default CreateZonalHead
