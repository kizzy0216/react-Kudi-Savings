import React, { Fragment, useState } from 'react'
import { Content, Filters, Header } from '../../../components/Layout'
import { ChevronLeft, Close, Search } from '../../../assets/svg'
import './overdue.scss'
import { formatTableData, tableColumns } from './utils'
import moment from 'moment'
import { Button, Card, CardBody, CardHeader, DateRangePicker } from '@kudi-inc/dip'
import Select from '../../../components/Select'
import Table from '../../../components/Table/table'
import { useRouteMatch } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getMarkets } from '../../../services/markets'
import { getOverdueLoans } from '../../../services/loans'
import { TableLoading } from '../../../components/loading'
import { initialMarkets } from '../utils'

export default ({ history }) => {
  const { url } = useRouteMatch()
  const { data: marketRes } = useQuery(['Markets', { page: 0, limit: 100 }], getMarkets)
  let markets = initialMarkets;
  if (marketRes && marketRes.data && marketRes.data.data && marketRes.data.data.list) {
    let newmarkets = marketRes.data.data.list.map(({ id, name }) => ({ text: name, value: id }))
    markets = [ ...initialMarkets, ...newmarkets];
  }

  const [tableStartDate, setTableStartDate] = useState('')
  const [tableEndDate, setTableEndDate] = useState('')
  const [tableFrom, setTableFrom] = useState(null)
  const [tableTo, setTableTo] = useState(null)
  const [marketId, setMarketId] = useState('')
  const [tableFocusedInput, setTableFocusedInput] = useState(null)

  const [page, setPage] = useState(0)
  const limit = 20

  const filterParams = { from: tableFrom, to: tableTo, marketId, page, limit }
  const { data: res, isLoading, error, refetch } = useQuery(['OverdueLoans', filterParams], getOverdueLoans)
  let tableData = []
  let totalTablePage = 0
  if (res && res.data) {
    tableData = formatTableData(
      res.data.data.list,
      history,
      url,
      page,
      limit
    )
    totalTablePage = Math.ceil(res.data.data.total / limit)
  }

  const onTableDateChange = ({ startDate, endDate }) => {
    if (startDate) {
      setTableStartDate(startDate)
      setTableFrom(moment(startDate)
        .subtract(1, 'days')
        .format('YYYY-MM-DD HH:mm:ss'))
    }
    if (endDate) {
      setTableEndDate(endDate)
      setTableTo(moment(endDate).format('YYYY-MM-DD HH:mm:ss'))
    }
  }
  const onTableFocusChange = focusedInput => {
    setTableFocusedInput(focusedInput)
  }

  return (
    <Fragment>
      <div className="Header">
        <Header>
          <p>
            <ChevronLeft role="button" onClick={() => history.goBack()}/> Loans
          </p>
        </Header>
      </div>
      <Content>
        <Card className={'Card-Table'}>
          <CardHeader className={'Table-Header'}>
            <span className={'table-heading'}>Customers with Overdue Payments</span>
            <div className={'flex'}>
              <div className="Select">
                <Select
                  active={marketId}
                  options={markets}
                  onSelect={value =>
                    setMarketId(value)
                  }
                />
              </div>
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
            </div>
          </CardHeader>
          <CardBody>
            {isLoading && <TableLoading/>}
            {error && (
              <span>
                Error! {error.message}
                <button onClick={() => refetch({ disableThrow: true })}>Retry</button>
              </span>
            )}
            {res && <Table
              column={tableColumns}
              placeholder={'Loans'}
              data={tableData}
            />}
          </CardBody>
          <div className={'pagination'}>
            {page > 0 && (
              <Button variant={'flat'} onClick={() => setPage(page - 1)} icon={<ChevronLeft/>}></Button>
            )}
            <p>Page {page + 1} of {totalTablePage}</p>
            {tableData.length === limit && (
              <Button variant={'flat'} onClick={() => setPage(page + 1)}></Button>
            )}
          </div>
        </Card>
      </Content>
    </Fragment>
  )
}
