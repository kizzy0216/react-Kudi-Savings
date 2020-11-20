import React, { Component } from 'react'
import CustomFieldsDropdown from './CustomFieldsDropdown'

class CustomersFields extends Component {

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

  render() {
    return (
      <div>
        <CustomFieldsDropdown
          titleHelper="Selected Field"
          title="Custom Fields"
          list={this.props.filters}
          toggleItem={this.props.toggleItem}
        />
      </div>
    )
  }
}

export default CustomersFields
