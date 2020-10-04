import React, { Fragment, useState, useReducer } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  ButtonGroup,
  DateRangePicker
} from '@kudi-inc/dip'
import Select from 'components/Select'
import { Header, Content, Filters } from 'components/Layout'
import Table from 'components/Table'
import { ChevronLeft, Close } from 'assets/svg'
import { TableLoading } from 'components/loading'
import styles from '../Transactions/transactions.module.scss'
import {
  FormatStashData,
  ParamsReducer,
  DefaultParams,
  StashTableColumn
} from 'utils/function'
import { useHistory, useRouteMatch } from 'react-router-dom'
import SampleData from './utils/sample-stash-data'

const StashHistory = () => {
  let history = useHistory()
  let { url } = useRouteMatch()
  const [page, setPage] = useState(1)
  const [type, setType] = useState('')
  const [startDate, setStartDate] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [endDate, setEndDate] = useState('')
  const [showReset, setShowReset] = useState(false)
  const [params, setParams] = useReducer(ParamsReducer, DefaultParams)
  const [focusedInput, setfocusedInput] = useState(null)
  let limit = 50
  let formattedData = []

  formattedData = FormatStashData(SampleData, history, url)

  const onDatesChange = ({ startDate, endDate }) => {
    if (startDate) {
      setStartDate(startDate)
      setFrom(
        moment(startDate)
          .subtract(12, 'hours')
          .format('YYYY-MM-DD HH:mm:ss')
      )
    }
    if (endDate) {
      setEndDate(endDate)
      setTo(
        moment(endDate)
          .add(11, 'hours')
          .add(59, 'minutes')
          .add(59, 'seconds')
          .format('YYYY-MM-DD HH:mm:ss')
      )
    }
    setShowReset(true)
  }
  const onFocusChange = focusedInput => {
    setfocusedInput(focusedInput)
  }

  return (
    <Fragment>
      <Header>
        <p>
          <ChevronLeft role="button" onClick={() => history.goBack()} />
          Stash Transaction History
        </p>
      </Header>
      <Content className={styles.content}>
        <Card className={styles.contentCard}>
          <CardHeader className={styles.Header}>
            <h3>STASH HISTORY</h3>

            <div className="flex">
              <Filters className={styles.filters}>
                <DateRangePicker
                  onDatesChange={onDatesChange}
                  onFocusChange={onFocusChange}
                  displayFormat="DD MMM, YY"
                  focusedInput={focusedInput}
                  startDate={startDate}
                  endDate={endDate}
                  isOutsideRange={() => false}
                />
              </Filters>
              <ButtonGroup>
                <Button active={type === ''} onClick={() => setType('')}>
                  All
                </Button>
                <Button
                  active={type === 'DEBIT'}
                  onClick={() => setType('DEBIT')}
                >
                  Debit
                </Button>
                <Button
                  active={type === 'CREDIT'}
                  onClick={() => setType('CREDIT')}
                >
                  Credit
                </Button>
              </ButtonGroup>
              {showReset && (
                <Close
                  className="danger"
                  onClick={() => {
                    setFrom('')
                    setTo('')
                    setStartDate('')
                    setEndDate('')
                    return setShowReset(false)
                  }}
                />
              )}
            </div>
          </CardHeader>
          <CardBody className={styles.Transactions}>
            <Table
              column={StashTableColumn}
              placeholder="stash transactions"
              data={formattedData}
            />  
          </CardBody>
        </Card>
      </Content>
    </Fragment>
  )
}

export default StashHistory