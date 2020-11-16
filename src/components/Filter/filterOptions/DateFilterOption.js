import React, { Component } from 'react'
import { Dropdown } from '../dropDowns'

class DateFilterOption extends Component {
  constructor() {
    super()
    this.state = {
      filters: [
        {
          id: 0,
          title: 'This Month',
          selected: false,
          name: 'thisMonth'
        },
        {
          id: 1,
          title: 'This Week',
          selected: false,
          name: 'thisWeek'
        },
        {
          id: 2,
          title: 'This Year',
          selected: false,
          name: 'thisYear'
        },
        {
          id: 3,
          title: 'Today',
          selected: false,
          name: 'today'
        }
      ]
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

    this.setState({
      filters: temp
    })
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
      <Dropdown
        title="Time Created"
        list={this.state.filters}
        resetThenSet={this.resetThenSet}
      />
    )
  }
}

export default DateFilterOption