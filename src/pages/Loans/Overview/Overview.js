import React, { Fragment, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { Content, Filters, Header } from '../../../components/Layout'
import Table from '../../../components/Table'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  DateRangePicker
} from '@kudi-inc/dip'
import './overview.scss'
import moment from 'moment'
import Select from '../../../components/Select'
import { ChevronLeft, DownloadIcon, Eye, Reassign } from '../../../assets/svg'
import {
  amountWithCommas,
  formatTableData,
  initialMarkets,
  loanStatuses,
  tableColumns
} from '../utils'
import { useQuery } from 'react-query'
import {
  dashboardOverview,
  filterLoans,
  getLoanDetails
} from '../../../services/loans'
import { DashboardLoading, TableLoading } from '../../../components/loading'
import { getMarkets } from '../../../services/markets'
import FundLoan from '../FundLoanPurse/fund-loan-purse'
import { SideSheet } from 'evergreen-ui'
import LoanDetail from '../LoanDetails/LoanDetail'
import { formatCurrency } from 'utils/function'
import { getPurseDetails } from 'services/admin'
const initialStartDate = moment().subtract(29, 'days')
const initialEndDate = moment()
const initialFrom = initialStartDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ')
const initialTo = initialEndDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ')
export default ({ history }) => {
  let { url } = useRouteMatch()
  const { data: marketRes } = useQuery(
    ['Markets', { page: 0, limit: 100 }],
    getMarkets
  )
  let markets = initialMarkets
  if (
    marketRes &&
    marketRes.data &&
    marketRes.data.data &&
    marketRes.data.data.list
  ) {
    let newmarkets = marketRes.data.data.list.map(({ id, name }) => ({
      text: name,
      value: id
    }))
    markets = [...initialMarkets, ...newmarkets]
  }

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
  const [page, setPage] = useState(0)
  const limit = 10

  const overviewParams = { from: overviewFrom, to: overviewTo, marketId }
  const tableParams = {
    from: tableFrom || overviewFrom,
    to: tableTo || overviewTo,
    status,
    page,
    limit,
    dashboard: true
  }

  const {
    data: overviewRes,
    isLoading: overviewIsLoading,
    error: overviewError,
    refetch: overviewRefetch
  } = useQuery(['LoansOverview', overviewParams], dashboardOverview)
  let overviewData = {}
  if (overviewRes && overviewRes.data) {
    overviewData = overviewRes.data.data
  }
  const {
    data: tableRes,
    isLoading: tableIsLoading,
    error: tableError,
    refetch: tableRefetch
  } = useQuery(['LoansOverviewTable', tableParams], filterLoans)
  let tableData = []
  let totalTablePage = 0
  if (tableRes && tableRes.data) {
    tableData = formatTableData(
      tableRes.data.data.list,
      history,
      url,
      page,
      limit
    )
    totalTablePage = Math.ceil(tableRes.data.data.total / limit)
  }

  const { data: walletData } = useQuery(
    ['LoanWalletDetails', {}],
    getPurseDetails
  )

  const onOverviewDateChange = ({ startDate, endDate }) => {
    if (startDate) {
      setOverviewStartDate(startDate)
      setOverviewFrom(moment(startDate).format('YYYY-MM-DDTHH:mm:ss.SSSZ'))
    }
    if (endDate) {
      setOverviewEndDate(endDate)
      setOverviewTo(moment(endDate).format('YYYY-MM-DDTHH:mm:ss.SSSZ'))
    }
  }
  const onOverviewFocusChange = focusedInput => {
    setOverviewFocusedInput(focusedInput)
  }

  const onTableDateChange = ({ startDate, endDate }) => {
    if (startDate) {
      setTableStartDate(startDate)
      setTableFrom(moment(startDate).format('YYYY-MM-DDTHH:mm:ss.SSSZ'))
    }
    if (endDate) {
      setTableEndDate(endDate)
      setTableTo(moment(endDate).format('YYYY-MM-DDTHH:mm:ss.SSSZ'))
    }
  }
  const onTableFocusChange = focusedInput => {
    setTableFocusedInput(focusedInput)
  }

  return (
    <Fragment>
      <div className={'Header'}>
        <Header>
          <p>Loans Overview</p>
        </Header>
        <Link to={'/loans/overdue'}>
          <Button icon={<Reassign />}>Overdue Loans</Button>
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
            onSelect={value => setMarketId(value)}
          />
        </div>
        <div className="Download-Report">
          <p>
            <DownloadIcon /> Download Report
          </p>
        </div>
      </div>
      {overviewIsLoading && <DashboardLoading />}
      {overviewError && (
        <span>
          Error!
          <button onClick={() => overviewRefetch({ disableThrow: true })}>
            Retry
          </button>
        </span>
      )}
      {overviewData && (
        <div className={'Overview'}>
          <div className="first-row">
            <Card className={'Overview-card'}>
              <p className={'p1'}>Loans Disbursed</p>
              <p className={'p2'}>{overviewData.loansDisbursed}</p>
            </Card>
            <Card className={'Overview-card'}>
              <p className={'p1'}>Loan Amount Disbursed</p>
              <p className={'p2'}>
                {formatCurrency(overviewData.amountDisbursed)}
              </p>
            </Card>
            <Card className={'Overview-card'}>
              <p className={'p1'}>Interest Earnings</p>
              <p className={'p2'}>
                {formatCurrency(overviewData.interestEarned)}
              </p>
            </Card>
            <Card className={'Overview-card'}>
              <p className={'p1'}>Loan Amount Recovered</p>
              <p className={'p2'}>
                {formatCurrency(overviewData.amountRecovered)}
              </p>
            </Card>
          </div>
          <div className="second-row">
            <Card className={'Overview-card'}>
              <div className={'add-border-bottom'}>
                <span>Initial Loan Purse Amount</span>{' '}
                <span>{formatCurrency(walletData?.data?.data.amount)}</span>
              </div>
              <div className={'add-border-bottom'}>
                <span>Overdue Amount</span>{' '}
                <span>{formatCurrency(overviewData.overdueAmount)}</span>
              </div>
              <div className={'add-border-bottom'}>
                <span>Total Borrowers</span>{' '}
                <span>{overviewData.borrowers}</span>
              </div>
            </Card>
            <Card className={'Overview-card'}>
              <div className={'add-border-bottom'}>
                <span>Loans in progress</span>{' '}
                <span>{overviewData.loansInProgress}</span>
              </div>
              <div className={'add-border-bottom'}>
                <span>Completed Loans</span>{' '}
                <span>{overviewData.completedLoans}</span>
              </div>
              <div className={'add-border-bottom'}>
                <span>Declined Loans</span>{' '}
                <span>{overviewData.declinedLoans}</span>
              </div>
            </Card>
          </div>
        </div>
      )}
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
                  onSelect={value => setStatus(value)}
                />
              </div>
              <div className="Download-Report">
                <Link to={'/loans/all'}>
                  <p>
                    <Eye /> View All
                  </p>
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            {tableIsLoading && <TableLoading />}
            {tableError && (
              <span>
                Error! {tableError.message}
                <button onClick={() => tableRefetch({ disableThrow: true })}>
                  Retry
                </button>
              </span>
            )}
            {tableRes && (
              <Table
                column={tableColumns}
                placeholder={'Loans'}
                data={tableData}
              />
            )}
          </CardBody>
          {tableRes && (
            <div className={'pagination'}>
              {page > 0 && (
                <Button
                  variant={'flat'}
                  onClick={() => setPage(page - 1)}
                  icon={<ChevronLeft />}
                ></Button>
              )}
              <p>
                Page {page + 1} of {totalTablePage}
              </p>
              {tableData.length === limit && (
                <Button
                  variant={'flat'}
                  onClick={() => setPage(page + 1)}
                ></Button>
              )}
            </div>
          )}
        </Card>
      </Content>
    </Fragment>
  )
}
