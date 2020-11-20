import React, { Component, Fragment } from 'react'
import { Add } from '../../../assets/svg'
import styles from './addFilter.module.scss'
import { Dropdown, DropdownMultiple } from '../dropDowns'
import {
  DateFilterOption,
  StatusFilterOption,
  MarketFilterOption
} from 'components/Filter'
import { DateRangePicker } from '@kudi-inc/dip'
import { setCustomerDate, clearCustomerMarketId, clearCustomerStatus, clearCustomerDate } from 'redux/customer/actions/customer-filter'
import { connect } from "react-redux";
import { Filters } from 'components/Layout'

import moment from 'moment'

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

      selectedFilter: [],
      focusedInput: null
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
    if(temp[id].selected == false){
      if(id === 0)
        this.props.clearCustomerStatus();
      if(id === 1)
        this.props.clearCustomerDate();
      else if(id === 2)
        this.props.clearCustomerMarketId();
    } 
    else if(id === 1)
      this.setDateRange(0);

    this.setState({
      filters: temp
    })
  }

  onDatesChange = ({ startDate, endDate }) => {
    let updateData = {};
    if(startDate)
      updateData.startDate = startDate;
    if(endDate)
      updateData.endDate = endDate;
    this.props.setCustomerDate(updateData);
  }

  onFocusChange = focusedInput => {
    this.setState({
      focusedInput: focusedInput
    })
  }

  setDateRange = (id) => {
    let startDate, endDate = moment();
    switch(id){
      case 0:
        startDate = moment().subtract(29, 'days');
        break;
      case 1:
        startDate = moment();
        break;
      case 2:
        startDate = moment().startOf('week');
        break;
      case 3:
        startDate = moment().startOf('month');
        break;
      case 4:
        startDate = moment().startOf('year');
        break;
    }
    this.props.setCustomerDate({startDate, endDate});
  }

  renderSelectedFilter = () => {
    return (
      <div className={styles.filterWrapper}>
        {this.state.filters.some(el => el.selected && el.name === 'date') && (
          <Fragment>
            <Filters className={styles.filters}>
              <DateRangePicker
                onDatesChange={this.onDatesChange.bind(this)}
                onFocusChange={this.onFocusChange.bind(this)}
                displayFormat="DD/MM/YYYY"
                focusedInput={this.state.focusedInput}
                startDate={moment(this.props.startDate)}
                endDate={moment(this.props.endDate)}
                isOutsideRange={() => false}
              />
            </Filters>
            <DateFilterOption setDateRange={this.setDateRange.bind(this)}/>
          </Fragment>
        )}

        {this.state.filters.some(el => el.selected && el.name === 'status') && (
          <StatusFilterOption />
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

const mapStateToProps = state => ({
  startDate: state.CustomerFilters.startDate,
  endDate: state.CustomerFilters.endDate
})

export default connect(mapStateToProps, {
  setCustomerDate, clearCustomerMarketId, clearCustomerStatus, clearCustomerDate
})(addFilter)
