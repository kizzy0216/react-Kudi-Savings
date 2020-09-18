import React, { useReducer, useState } from 'react'
import Table from 'components/Table'
import { CardBody, Card, CardHeader, Button, DateRangePicker } from '@kudi-inc/dip'
import { TableLoading } from 'components/loading'
import { useHistory, useRouteMatch } from 'react-router-dom'
import styles from './customers.module.scss'
import { ChevronLeft, Eye, Close } from 'assets/svg'
import { useQuery } from 'react-query'
import { ParamsReducer, DefaultParams, formatPlanRevenueLog, PlanRevenueLogTableColumn } from 'utils/function'
import { Content, Filters } from 'components/Layout'
import { getRevenue } from 'services/customers'
import moment from 'moment'

const PlanRevenueLog = props => {
  let { id, minimized } = props
  let history = useHistory()
  let { url } = useRouteMatch()
  const [showReset, setShowReset] = useState(false)
  const [focusedInput, setfocusedInput] = useState(null)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [endDate, setEndDate] = useState('')
  const [startDate, setStartDate] = useState('')
  const [params, setParams] = useReducer(ParamsReducer, DefaultParams)
  let limit = minimized ? 3 : 30
  let formattedData = []
  let totalPage = 0
  let { data, isLoading, error, refetch } = useQuery(
    ['PlanRevenueLog', { userPlanId: id, limit, params:{from, to} }], getRevenue)

    let plano = data?.data?.data ?? {}
    console.log(JSON.stringify(plano))
  
  if (data?.data?.data) {
    formattedData = formatPlanRevenueLog(
      data.data.data.list,
      params.page,
      limit
    )
    totalPage = Math.ceil(data.data.data.total / limit)
  }

  const onDatesChange = ({ startDate, endDate }) => {
    if (startDate) {
      setStartDate(startDate)
      setFrom(
        moment(startDate)
          .subtract(1, 'days')
          .format('YYYY-MM-DD HH:mm:ss')
      )
    }
    if (endDate) {
      setEndDate(endDate)
      setTo(moment(endDate).format('YYYY-MM-DD HH:mm:ss'))
    }
    setShowReset(true)
  }
  const onFocusChange = focusedInput => {
    setfocusedInput(focusedInput)
  }

  return (
    <Content className={styles.content}>
      <Card className={styles.contentCard}>
        <CardHeader className={styles.ViewAll}>
          <h3>PLAN REVENUE LOG</h3>

          {props.minimized ? (
            <Button
              icon={<Eye />}
              variant="flat"
              onClick={() => history.push({
                pathname:`${url}/view-all-plan-revenue-log`,
                state: id
                })}
            >
              View All
            </Button>
          ) : (
            <div className="flex">
              <Filters className={styles.filters}>
                <DateRangePicker
                  onDatesChange={onDatesChange}
                  onFocusChange={onFocusChange}
                  displayFormat="DD/MM/YYYY"
                  focusedInput={focusedInput}
                  startDate={startDate}
                  endDate={endDate}
                  isOutsideRange={() => false}
                />
              </Filters>
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
          )}
        </CardHeader>
        <CardBody className={styles.Customers}>
          <div className={styles.CustomersHeader}>
            {isLoading && <TableLoading />}
            {error && (
              <span>
                Error!
                <button onClick={() => refetch({ disableThrow: true })}>
                  Retry
                </button>
              </span>
            )}
            {data && data.data && (
              <Table
                placeholder="Plan Revenue Log"
                column={PlanRevenueLogTableColumn}
                data={formattedData}
              />
            )}
          </div>
        </CardBody>
        {data &&
          (props.minimized ? (
            <></>
          ) : (
            <div className="pagination">
              {params.page > 1 && (
                <Button
                  variant="flat"
                  onClick={() =>
                    setParams({
                      type: 'UPDATE_PAGE',
                      payload: params.page - 1
                    })
                  }
                  icon={<ChevronLeft />}
                ></Button>
              )}
              <p>
                {' '}
                Page {params.page} of {totalPage}
              </p>
              {formattedData.length === limit && (
                <Button
                  variant="flat"
                  onClick={() =>
                    setParams({
                      type: 'UPDATE_PAGE',
                      payload: params.page + 1
                    })
                  }
                ></Button>
              )}
            </div>
          ))}
      </Card>
    </Content>
  )
}

export default PlanRevenueLog
