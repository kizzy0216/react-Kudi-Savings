import React, { Fragment, useReducer, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { Content, Filters, Header } from '../../../components/Layout'
import Table from '../../../components/Table'
import { Button, Card, CardBody, CardHeader, DateRangePicker } from '@kudi-inc/dip'
import './overview.scss'
import moment from 'moment'
import { DefaultParams, ParamsReducer } from '../../../utils/function'
import Select from '../../../components/Select'
import { DownloadIcon, Eye, Reassign } from '../../../assets/svg'
import { initialMarkets, loanStatuses, tableColumns, tableData, formatTableData } from '../utils'



export default ({ history }) => {
  const { url } = useRouteMatch();
  const [overviewParams, setOverviewParams] = useReducer(ParamsReducer, DefaultParams)
  const [tableParams, setTableParams] = useReducer(ParamsReducer, DefaultParams)
  const [markets, setMarkets] = useState(initialMarkets)

  const formattedTableData = formatTableData(tableData, history, url, 0, 10);

  const onOverviewDateChange = ({ startDate, endDate }) => {
    if (startDate) {
      setOverviewParams({
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
      setOverviewParams({
        type: 'UPDATE_DATE',
        payload: {
          endDate: endDate,
          to: moment(endDate).format('YYYY-MM-DD HH:mm:ss'),
          showReset: true
        }
      })
    }
  }
  const onOverviewFocusChange = focusedInput => {
    setOverviewParams({
      type: 'UPDATE_FOCUSEDINPUT',
      payload: focusedInput
    })
  }

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
      <div className={'Header'}>
        <Header><p>Loans Overview</p></Header>
        <Link to={'/loans/overdue'}>
          <Button icon={<Reassign/>}>Overdue Loans</Button>
        </Link>
      </div>
      <div className={'Actions'}>
        <Filters>
          <DateRangePicker
            onDatesChange={onOverviewDateChange}
            onFocusChange={onOverviewFocusChange}
            displayFormat="DD/MM/YYYY"
            focusedInput={overviewParams.focusedInput}
            startDate={overviewParams.startDate}
            endDate={overviewParams.endDate}
            isOutsideRange={() => false}
          />
        </Filters>
        <div className="Select">
          <Select
            active={overviewParams.status}
            options={markets}
            onSelect={value =>
              setOverviewParams({
                type: 'UPDATE_STATUS',
                payload: { status: value, showReset: true }
              })
            }
          />
        </div>
        <div className="Download-Report">
          <p><DownloadIcon/> Download Report</p>
        </div>
      </div>
      <div className={'Overview'}>
        <div className="first-row">
          <Card className={'Overview-card'}>
            <p className={'p1'}>Loans Disbursed</p>
            <p className={'p2'}>101</p>
          </Card>
          <Card className={'Overview-card'}>
            <p className={'p1'}>Loan Amount Disbursed</p>
            <p className={'p2'}>N450,000</p>
          </Card>
          <Card className={'Overview-card'}>
            <p className={'p1'}>Interest Earnings</p>
            <p className={'p2'}>N65,000</p>
          </Card>
          <Card className={'Overview-card'}>
            <p className={'p1'}>Loan Amount Recovered</p>
            <p className={'p2'}>N65,000</p>
          </Card>
        </div>
        <div className="second-row">
          <Card className={'Overview-card'}>
            <div className={'add-border-bottom'}>
              <span>Initial Loan Purse Amount</span> <span>N8,500,000</span>
            </div>
            <div className={'add-border-bottom'}>
              <span>Overdue Amount</span> <span>N8,500,000</span>
            </div>
            <div className={'add-border-bottom'}>
              <span>Total Borrowers</span> <span>N8,500,000</span>
            </div>
          </Card>
          <Card className={'Overview-card'}>
            <div className={'add-border-bottom'}>
              <span>Loans in progress</span> <span>N8,500,000</span>
            </div>
            <div className={'add-border-bottom'}>
              <span>Completed Loans</span> <span>N8,500,000</span>
            </div>
            <div className={'add-border-bottom'}>
              <span>Declined Loans</span> <span>N8,500,000</span>
            </div>
          </Card>
        </div>
      </div>
      <Content>
        <Card className={'Card-Table'}>
          <CardHeader className={'Table-Header'}>
            <span className={'table-heading'}>Loan Requests</span>
            <div className={'flex'}>
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
              <div className="Select">
                <Select
                  active={tableParams.status}
                  options={loanStatuses}
                  onSelect={value =>
                    setTableParams({
                      type: 'UPDATE_STATUS',
                      payload: { status: value, showReset: true }
                    })
                  }
                />
              </div>
              <div className="Download-Report">
                <Link to={'/loans/all'}>
                  <p><Eye/> View All</p>
                </Link>

              </div>
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
