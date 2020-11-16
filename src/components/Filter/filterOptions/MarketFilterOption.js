import React, { Component } from 'react'
import { Dropdown } from '../dropDowns'

class MarketFilterOption extends Component {
  constructor() {
    super()
    this.state = {
      filters: [
        {
          id: 0,
          title: 'BALOGUN',
          selected: false,
          name: 'balogun'
        },
        {
          id: 1,
          title: 'SURULERE',
          selected: false,
          name: 'surulere'
        },
        {
          id: 2,
          title: 'SOUTH-WEST',
          selected: false,
          name: 'south-west'
        },
        {
          id: 3,
          title: 'SOUTH-SOUTH',
          selected: false,
          name: 'south-south'
        },
        {
          id: 4,
          title: 'SOUTH-EAST',
          selected: false,
          name: 'south-east'
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
        title="Market"
        list={this.state.filters}
        resetThenSet={this.resetThenSet}
      />
    )
  }
}

export default MarketFilterOption
