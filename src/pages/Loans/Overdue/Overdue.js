import React, { Fragment, useReducer, useState } from 'react'
import { Content, Filters, Header } from '../../../components/Layout'
import { ChevronLeft, Close, Eye, Search } from '../../../assets/svg'
import './overdue.scss';
import { DefaultParams, ParamsReducer } from '../../../utils/function'
import { formatTableData, initialMarkets, tableColumns, tableData } from './utils'
import moment from 'moment'
import { Card, CardBody, CardHeader, DateRangePicker } from '@kudi-inc/dip'
import Select from '../../../components/Select'
import Table from '../../../components/Table/table'
import { useRouteMatch } from 'react-router-dom'

export default ({ history }) => {
  const { url } = useRouteMatch();
  const [phoneNumber, setPhoneNumber] = useState('')
  const [tableParams, setTableParams] = useReducer(ParamsReducer, DefaultParams)
  const [markets, setMarkets] = useState(initialMarkets)

  const formattedTableData = formatTableData(tableData, history, url, 0, 10);

  const onTableDateChange = ({ startDate, endDate }) => {
    if (startDate) {
      setTableParams({
        type: 'UPDATE_DATE',
        payload: {
          startDate: startDate,
          from: moment(startDate)
            .subtract(1, 'days')
            .format('YYYY-MM-DD HH:mm:ss'),
          showReset: true
        }
      })
    }
    if (endDate) {
      setTableParams({
        type: 'UPDATE_DATE',
        payload: {
          endDate: endDate,
          to: moment(endDate).format('YYYY-MM-DD HH:mm:ss'),
          showReset: true
        }
      })
    }
  }
  const onTableFocusChange = focusedInput => {
    setTableParams({
      type: 'UPDATE_FOCUSEDINPUT',
      payload: focusedInput
    })
  }

  return (
    <Fragment>
      <div className="Header">
        <Header>
          <p>
            <ChevronLeft role="button" onClick={() => history.goBack()}/> Loans
          </p>
        </Header>
        <div className="header-search">
          <input
            placeholder="Search by Phone Number"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            type="text"
          />
          <div className={'search-icon'}>
            {phoneNumber.length > 1 ? (
              <Close
                className="danger"
                onClick={() => {
                  setPhoneNumber('')
                  return setPhoneNumber('')
                }}
              />
            ) : (
              <Search/>
            )}
          </div>

        </div>
      </div>
      <Content>
        <Card className={'Card-Table'}>
          <CardHeader className={'Table-Header'}>
            <span className={'table-heading'}>Customers with Overdue Payments</span>
            <div className={'flex'}>
              <div className="Select">
                <Select
                  active={tableParams.status}
                  options={initialMarkets}
                  onSelect={value =>
                    setTableParams({
                      type: 'UPDATE_STATUS',
                      payload: { status: value, showReset: true }
                    })
                  }
                />
              </div>
              <Filters className={'Filter'}>
                <DateRangePicker
                  onDatesChange={onTableDateChange}
                  onFocusChange={onTableFocusChange}
                  displayFormat="DD/MM/YYYY"
                  focusedInput={tableParams.focusedInput}
                  startDate={tableParams.startDate}
                  endDate={tableParams.endDate}
                  isOutsideRange={() => false}
                />
              </Filters>
            </div>
          </CardHeader>
          <CardBody>
            <Table
              column={tableColumns}
              placeholder={'Loans'}
              data={formattedTableData}
            />
          </CardBody>
        </Card>
      </Content>
    </Fragment>
  )
}
