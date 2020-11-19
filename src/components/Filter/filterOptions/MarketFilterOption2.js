import React, { useState, useEffect } from 'react'
import { Dropdown } from '../dropDowns'
import { useQuery } from 'react-query'
import { getMarkets } from 'services/markets'
import { setCustomerMarketId } from 'redux/customer/actions/customer-filter'
import { connect } from "react-redux";

const MarketFilterOption = ({ setCustomerMarketId }) => {
  useEffect(() => {
    // fetchMarkets()
    window.addEventListener('keydown', tabKeyPressed)
    window.addEventListener('mousedown', mouseClicked)
  }, [])

  let markets = []
  let selectedMarketId = ''

  const { data: marketRes } = useQuery(
    ['Markets', { page: 0, limit: 100 }],
    getMarkets
  )

  if (
    marketRes &&
    marketRes.data &&
    marketRes.data.data &&
    marketRes.data.data.list
  ) {
    let newmarkets = []

    marketRes.data.data.list.map(({ id, name }) => {
      newmarkets.push({
        title: name,
        id: id
      })
    })

    markets = newmarkets
  }
  console.log('marketRes',marketRes)
  console.log(markets)

  const tabKeyPressed = e => {
    if (e.keyCode === 9) {
      document.querySelector('body').classList.remove('noFocus')
      window.removeEventListener('keydown', tabKeyPressed)
      window.addEventListener('mousedown', mouseClicked)
    }
  }

  const mouseClicked = e => {
    document.querySelector('body').classList.add('noFocus')
    window.removeEventListener('mousedown', mouseClicked)
    window.addEventListener('keydown', tabKeyPressed)
  }

  const resetThenSet = id => {
    setCustomerMarketId(id);
    console.log(id)
    const temp = JSON.parse(JSON.stringify(markets))
    // temp.forEach(item => (item.selected = false))
    // temp[id].selected = true
    selectedMarketId = id

    console.log('markets',markets)
    // const sItem = markets.find(item => item.id = id)
    // console.log('sItem',sItem)
    // console.log('markets',markets)
    // const index = markets.indexOf(sItem)
    // console.log('markets',markets)

    // console.log(index)

    // sItem.selected = true

    // if (index !== -1) {
    //   markets[index] = sItem
    // }
  }

  return (
    <Dropdown
      title="Market"
      list={markets}
      resetThenSet={resetThenSet}
    />
  )
}

export default connect(null, {
  setCustomerMarketId
})(MarketFilterOption)