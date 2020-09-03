import React, { Fragment, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { Content, Filters, Header } from '../../../components/Layout'
import Table from '../../../components/Table'
import { Button, Card, CardBody, CardHeader, DateRangePicker } from '@kudi-inc/dip'
import './overview.scss'
import moment from 'moment'
import Select from '../../../components/Select'
import { DownloadIcon, Eye, Reassign } from '../../../assets/svg'
import { formatTableData, initialMarkets, loanStatuses, tableColumns, tableData } from '../utils'

const initialStartDate = moment().subtract(31, 'days')
const initialEndDate = moment().add(1, 'days')
const initialFrom = initialStartDate.format('YYYY-MM-DD')
const initialTo = initialEndDate.format('YYYY-MM-DD')

export default ({ history }) => {
  const { url } = useRouteMatch()
  const [markets, setMarkets] = useState(initialMarkets)

  const [overviewStartDate, setOverviewStartDate] = useState(initialStartDate)
  const [overviewEndDate, setOverviewEndDate] = useState(initialEndDate)
  const [overviewFrom, setOverviewFrom] = useState(initialFrom)
  const [overviewTo, setOverviewTo] = useState(initialTo)
  const [marketId, setMarketId] = useState('')
  const [overviewFocusedInput, setOverviewFocusedInput] = useState(null)

  const [tableStartDate, setTableStartDate] = useState(initialStartDate)
  const [tableEndDate, setTableEndDate] = useState(initialEndDate)
  const [tableFrom, setTableFrom] = useState(initialFrom)
  const [tableTo, setTableTo] = useState(initialTo)
  const [status, setStatus] = useState('')
  const [tableFocusedInput, setTableFocusedInput] = useState(null)

  const formattedTableData = formatTableData(tableData, history, url, 0, 10)

  const overviewParams = { from: overviewFrom, to: overviewTo, marketId }
  console.log('Overview Request Params:', overviewParams)
  const tableParams = {from: tableFrom || overviewFrom, to: tableTo || overviewTo, status }
  console.log('Table Request Params:', tableParams)


  const onOverviewDateChange = ({ startDate, endDate }) => {
    if (startDate) {
      setOverviewStartDate(startDate)
      setOverviewFrom(moment(startDate).subtract(1, 'days').format('YYYY-MM-DD'))
    }
    if (endDate) {
      setOverviewEndDate(endDate)
      setOverviewTo(moment(endDate).format('YYYY-MM-DD'))
    }
  }
  const onOverviewFocusChange = focusedInput => {
    setOverviewFocusedInput(focusedInput)
  }

  const onTableDateChange = ({ startDate, endDate }) => {
    if (startDate) {
      setTableStartDate(startDate)
      setTableFrom(moment(startDate)
        .subtract(1, 'days')
        .format('YYYY-MM-DD'))
    }
    if (endDate) {
      setTableEndDate(endDate)
      setTableTo(moment(endDate).format('YYYY-MM-DD'))
    }
  }
  const onTableFocusChange = focusedInput => {
    setTableFocusedInput(focusedInput)
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
            focusedInput={overviewFocusedInput}
            startDate={overviewStartDate}
            endDate={overviewEndDate}
            isOutsideRange={() => false}
          />
        </Filters>
        <div className="Select">
          <Select
            active={marketId}
            options={markets}
            onSelect={value =>
              setMarketId(value)
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
                  focusedInput={tableFocusedInput}
                  startDate={tableStartDate}
                  endDate={tableEndDate}
                  isOutsideRange={() => false}
                />
              </Filters>
              <div className="Select">
                <Select
                  active={status}
                  options={loanStatuses}
                  onSelect={value =>
                    setStatus(value)
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
