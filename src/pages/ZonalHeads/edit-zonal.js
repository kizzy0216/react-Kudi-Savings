import React, { useState, useEffect } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Select
} from '@kudi-inc/dip'

import { updateZH } from 'services/zonal-heads'
import { getMarkets } from 'services/markets'
import { toaster, SelectMenu, Button as SelectMenuButton } from 'evergreen-ui'
import styles from './zonal-heads.module.scss'
import { isValidEdit } from './validation'

const EditZH = ({ zonalHead, setShowEdit, refetch }) => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [markets, setMarkets] = useState([])
  const [marketIds, setMarketIds] = useState(
    zonalHead.markets.map(item => item.id)
  )
  const [edited, setEdited] = useState(zonalHead)

  const [selectedNames, setSelectedNames] = useState(
    `${zonalHead.markets.length} markets selected`
  )

  const fetchMarkets = async () => {
    const response = await getMarkets({ page: 1, limit: 60 })
    const formatMarket = response.data.data.list.map(({ id, name }) => ({
      value: id,
      label: name
    }))
    setMarkets(formatMarket)
  }
  useEffect(() => {
    fetchMarkets()
  }, [])

  const handleEditZh = async e => {
    e.preventDefault()
    // const errors = isValidEdit({...edited, marketIds })
    // setErrors(errors)
    // if (Object.keys(errors).length > 0) return
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
      markets,
      ...rest
    } = edited
    try {
      await updateZH({ ...rest, marketIds })
      setLoading(false)
      toaster.success('Zonal Heads Details Updated')
      refetch({ disableThrow: true })
      setShowEdit(false)
    } catch (e) {
      setLoading(false)
      if (e.data.message) {
        return toaster.danger(e.data.message)
      }
      toaster.danger('Update Zonal Head Failed')
    }
  }
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
  const deSelectMarket = item => {
    const deselectedItemIndex = marketIds.indexOf(item.value)
    const selectedItems = marketIds.filter(
      (_item, i) => i !== deselectedItemIndex
    )
    const selectedItemsLength = selectedItems.length
    let selectedNames = ''
    if (selectedItemsLength === 0) {
      selectedNames = ''
    } else {
      selectedNames = selectedItemsLength.toString() + ' selected...'
    }
    setMarketIds(selectedItems)
    setSelectedNames(selectedNames)
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
            onChange={e => setEdited({ ...edited, firstName: e.target.value })}
            error={errors.firstName}
            status={errors.firstName && 'error'}
          />
          <Input
            type="text"
            label="Last Name"
            name="lastName"
            value={edited.lastName}
            onChange={e => setEdited({ ...edited, lastName: e.target.value })}
            error={errors.lastName}
            status={errors.lastName && 'error'}
          />
          <Input
            type="text"
            label="Phone Number"
            value={edited.phoneNumber ? edited.phoneNumber : ''}
            onChange={e =>
              setEdited({ ...edited, phoneNumber: e.target.value })
            }
            error={errors.phoneNumber}
            status={errors.phoneNumber && 'error'}
          />
          <Input
            value={edited.email}
            name="email"
            type="text"
            label="Email"
            onChange={e => setEdited({ ...edited, email: e.target.value })}
            error={errors.email}
            status={errors.email && 'error'}
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
            onChange={e => setEdited({ ...edited, address: e.target.value })}
            error={errors.address}
            status={errors.address && 'error'}
          />

          <SelectMenu
            isMultiSelect={true}
            title="Select multiple markets"
            options={markets}
            selected={marketIds}
            onSelect={market => assignMarket(market)}
            onDeselect={market => deSelectMarket(market)}
            className={'multiSelect'}
          >
            <SelectMenuButton type="button">
              {selectedNames || 'Select Markets...'}
            </SelectMenuButton>
          </SelectMenu>
          <div></div>
          <Button type="submit" loading={loading}>
            Submit
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}
export default EditZH
