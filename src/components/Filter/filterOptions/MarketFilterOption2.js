import React, { useState, useEffect } from 'react'
import { Dropdown } from '../dropDowns'
import { useQuery } from 'react-query'
import { getMarkets } from 'services/markets'

export default ({ history }) => {
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
    const temp = JSON.parse(JSON.stringify(markets))
    // temp.forEach(item => (item.selected = false))
    // temp[id].selected = true
    selectedMarketId = id

    const sItem = markets.find(item => item.id = id)
    const index = markets.indexOf(sItem)

    console.log(index)

    sItem.selected = true

    // if (index !== -1) {
    //   markets[index] = sItem
    // }

    console.log(markets)
  }

  return (
    <Dropdown
      title="Market"
      list={markets}
      resetThenSet={resetThenSet}
    />
  )
}
