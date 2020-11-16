import React, { Component } from 'react'
import CustomFieldsDropdown from './CustomFieldsDropdown'

class CustomersFields extends Component {
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
          title: 'Full Name',
          selected: false,
          name: 'full-name'
        },
        {
          id: 2,
          title: 'KTA Details',
          selected: false,
          name: 'kta-details'
        },
        {
          id: 3,
          title: 'Referral Status',
          selected: false,
          name: 'referral-status'
        },
        {
          id: 4,
          title: "Referral's Market",
          selected: false,
          name: 'referral-market'
        },
        {
          id: 5,
          title: "Referral's Phone Number",
          selected: false,
          name: 'referral-phone'
        },
        {
          id: 6,
          title: 'Next of Kin',
          selected: false,
          name: 'next-of-kin'
        },
        {
          id: 7,
          title: 'Date of Birth',
          selected: false,
          name: 'dob'
        },
        {
          id: 8,
          title: 'Amount Saved',
          selected: false,
          name: 'amount-saved'
        },
        {
          id: 9,
          title: 'Amount Withdrawn',
          selected: false,
          name: 'amount-withdrawn'
        },
        {
          id: 10,
          title: 'Loan Status',
          selected: false,
          name: 'loan-status'
        },
        {
          id: 11,
          title: "DSA's Name",
          selected: false,
          name: 'dsa-name'
        },
        {
          id: 12,
          title: "DSA's Phone Number",
          selected: false,
          name: 'dsa-phone'
        },
        {
          id: 13,
          title: 'Time Created',
          selected: false,
          name: 'time-created'
        },
        {
          id: 14,
          title: 'Market',
          selected: false,
          name: 'market'
        },
        {
          id: 15,
          title: 'Business Type',
          selected: false,
          name: 'business-type'
        },
        {
          id: 16,
          title: 'Gender',
          selected: false,
          name: 'gender'
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
      <div>
        <CustomFieldsDropdown
          titleHelper="Selected Field"
          title="Custom Fields"
          list={this.state.filters}
          toggleItem={this.toggleItem}
        />
      </div>
    )
  }
}

export default CustomersFields
