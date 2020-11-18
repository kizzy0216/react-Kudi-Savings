import React, { Component } from 'react'
import { Add } from '../../../assets/svg'
import styles from './addFilter.module.scss'
import { Dropdown, DropdownMultiple } from '../dropDowns'
import {
  DateFilterOption,
  StatusFilterOption,
  MarketFilterOption
} from 'components/Filter'

class addFilter extends Component {
  constructor() {
    super()
    this.state = {
      filters: [
        {
          id: 0,
          title: 'Status',
          selected: false,
          name: 'status'
        },
        {
          id: 1,
          title: 'Date',
          selected: false,
          name: 'date'
        },
        {
          id: 2,
          title: 'Market',
          selected: false,
          name: 'market'
        }
      ],

      selectedFilter: []
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.tabKeyPressed)
    window.addEventListener('mousedown', this.mouseClicked)
  }

  tabKeyPressed = e => {
    if (e.keyCode === 9) {
      document.querySelector('body').classList.remove('noFocus')
      window.removeEventListener('keydown', this.tabKeyPressed)
      window.addEventListener('mousedown', this.mouseClicked)
    }
  }

  mouseClicked = e => {
    document.querySelector('body').classList.add('noFocus')
    window.removeEventListener('mousedown', this.mouseClicked)
    window.addEventListener('keydown', this.tabKeyPressed)
  }

  toggleItem = id => {
    const temp = JSON.parse(JSON.stringify(this.state.filters))
    temp[id].selected = !temp[id].selected

    console.log(id)

    this.setState({
      filters: temp
    })
  }

  renderSelectedFilter = () => {
    return (
      <div className={styles.filterWrapper}>
        {this.state.filters.some(el => el.selected && el.name === 'status') && (
          <StatusFilterOption />
        )}

        {this.state.filters.some(el => el.selected && el.name === 'date') && (
          <DateFilterOption />
        )}

        {this.state.filters.some(el => el.selected && el.name === 'market') && (
          <MarketFilterOption />
        )}
      </div>
    )
  }

  resetThenSet = id => {
    const temp = JSON.parse(JSON.stringify(this.state.filters))
    temp.forEach(item => (item.selected = false))
    temp[id].selected = true
    this.setState({
      filters: temp
    })
  }

  render() {
    return (
      <div className={styles.filterWrapper}>
        <div>{this.renderSelectedFilter()}</div>

        <DropdownMultiple
          list={this.state.filters}
          toggleItem={this.toggleItem}
        />
      </div>
    )
  }
}

export default addFilter
