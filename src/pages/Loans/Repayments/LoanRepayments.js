import React, { Fragment, useState } from 'react'
import { Content, Filters, Header } from '../../../components/Layout'
import { ChevronLeft } from '../../../assets/svg'

import './repayments.scss'
import { formatTableData, tableColumns, tableData } from './utils'
import moment from 'moment'
import { useRouteMatch } from 'react-router-dom'
import { Button, ButtonGroup, Card, CardBody, CardHeader, DateRangePicker } from '@kudi-inc/dip'
import Table from '../../../components/Table/table'

export default ({ history }) => {

  const { url } = useRouteMatch()
  const [tableStartDate, setTableStartDate] = useState('')
  const [tableEndDate, setTableEndDate] = useState('')
  const [tableFrom, setTableFrom] = useState(null)
  const [tableTo, setTableTo] = useState(null)
  const [type, setType] = useState('')
  const [tableFocusedInput, setTableFocusedInput] = useState(null)

  const filterParams = {from: tableFrom, to: tableTo, type}
  console.log('Repayment History Filters:', filterParams)

  const formattedTableData = formatTableData(tableData, history, url, 0, 10)

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
            <ChevronLeft role="button" onClick={() => history.goBack()}/> Repayment History
          </p>
        </Header>
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
              <Table
                column={tableColumns}
                placeholder={'Loan Repayments'}
                data={formattedTableData}
              />
            </CardBody>
          </Card>
        </Content>
      </div>
    </Fragment>
  )
}
