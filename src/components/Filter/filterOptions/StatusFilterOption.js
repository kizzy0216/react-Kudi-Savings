import React, { Component } from 'react'
import { Dropdown } from '../dropDowns'
import { setCustomerStatus } from 'redux/customer/actions/customer-filter'
import { connect } from "react-redux";


class StatusFilterOption extends Component {
  constructor() {
    super()
    this.state = {
      filters: [
        {
          id: 0,
          title: 'New',
          selected: false,
          name: 'new'
        },
        {
          id: 1,
          title: 'Active',
          selected: false,
          name: 'active'
        },
        {
          id: 2,
          title: 'Inactive',
          selected: false,
          name: 'inactive'
        },
        {
          id: 3,
          title: 'Dormant',
          selected: false,
          name: 'dormant'
        },
        {
          id: 4,
          title: 'Expired',
          selected: false,
          name: 'expired'
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
    console.log('id', id);
    this.props.setCustomerStatus(temp[id].title)
  }

  render() {
    return (
      <Dropdown
        title="Status"
        list={this.state.filters}
        resetThenSet={this.resetThenSet}
      />
    )
  }
}

export default connect(null, {
  setCustomerStatus
})(StatusFilterOption)
