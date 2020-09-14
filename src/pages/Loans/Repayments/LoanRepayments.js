import React, { Fragment, useState } from 'react'
import { Content, Filters, Header } from '../../../components/Layout'
import { ChevronLeft } from '../../../assets/svg'

import './repayments.scss'
import { formatTableData, tableColumns } from './utils'
import moment from 'moment'
import { useRouteMatch } from 'react-router-dom'
import { Button, ButtonGroup, Card, CardBody, CardHeader, DateRangePicker } from '@kudi-inc/dip'
import Table from '../../../components/Table/table'
import { useQuery } from 'react-query'
import { getRepaymentHistory } from '../../../services/loans'
import { TableLoading } from '../../../components/loading'

const initialStartDate = moment().subtract(31, 'days')
const initialEndDate = moment().add(1, 'days')
const initialFrom = initialStartDate.format('YYYY-MM-DD')
const initialTo = initialEndDate.format('YYYY-MM-DD')

export default ({ history,  match: { params } }) => {
  let { id: loanId } = params
  console.log('Loan Id', loanId)
  const { url } = useRouteMatch()
  const [tableStartDate, setTableStartDate] = useState(initialStartDate)
  const [tableEndDate, setTableEndDate] = useState(initialEndDate)
  const [tableFrom, setTableFrom] = useState(initialFrom)
  const [tableTo, setTableTo] = useState(initialTo)
  const [type, setType] = useState('')
  const [tableFocusedInput, setTableFocusedInput] = useState(null)

  const [page, setPage] = useState(0)
  const limit = 20

  const filterParams = { from: tableFrom, to: tableTo, type, page, limit, dashboard: true, loanId }
  console.log('Repayment History Filters:', filterParams)
  const { data: res, isLoading, error, refetch } = useQuery(['LoanRepayments', filterParams], getRepaymentHistory)
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
      <div className="Header">
        <Header>
          <p>
            <ChevronLeft role="button" onClick={() => history.goBack()}/> Repayment History
          </p>
        </Header>
      </div>
      <Content>
        <Card className={'Card-Table'}>
          <CardHeader className={'Table-Header'}>
            <span className={'table-heading'}>Loan Repayment History</span>
            <div className={'flex'}>
              <ButtonGroup>
                <Button
                  active={type === ''}
                  onClick={() => setType('')}
                >All</Button>
                <Button
                  active={type === 'CASH'}
                  onClick={() => setType('CASH')}
                >Cash</Button>
                <Button
                  active={type === 'TRANSFER'}
                  onClick={() => setType('TRANSFER')}
                >Transfer</Button>
              </ButtonGroup>
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
              placeholder={'Loan Repayments'}
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
