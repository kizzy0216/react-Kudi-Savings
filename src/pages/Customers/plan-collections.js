import React, { useReducer, useState } from 'react'
import Table from 'components/Table'
import {
  CardBody,
  Card,
  CardHeader,
  Button,
  DateRangePicker
} from '@kudi-inc/dip'
import { TableLoading } from 'components/loading'
import { getCollectionsByPlan } from 'services/collections'
import {
  ParamsReducer,
  DefaultParams,
  formatCollections,
  formatCurrency,
  PlanCollectionTableColumn
} from 'utils/function'
import styles from './customers.module.scss'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { ChevronLeft, Eye, Close } from 'assets/svg'
import { useQuery } from 'react-query'
import { Content, Filters } from 'components/Layout'
import moment from 'moment'

const PlanCollections = props => {
  let { id,minimized } = props
  let { url } = useRouteMatch()
  let history = useHistory()
  const [page, setPage] = useState(1)
  const [focusedInput, setfocusedInput] = useState(null)
  const [showReset, setShowReset] = useState(false)
  const initialStartDate = minimized ? ' ' : moment().subtract(29, 'days')
  const initialEndDate = minimized ? ' ' : moment()
  const initialFrom = minimized
    ? ' '
    : initialStartDate.format('YYYY-MM-DD+HH:mm:ss')
  const initialTo = minimized
    ? ' '
    : initialEndDate.format('YYYY-MM-DD+HH:mm:ss')
  const [from, setFrom] = useState(initialFrom)
  const [to, setTo] = useState(initialTo)
  const [endDate, setEndDate] = useState(initialEndDate)
  const [startDate, setStartDate] = useState(initialStartDate)
  const [params, setParams] = useReducer(ParamsReducer, DefaultParams)
  let limit = minimized ? 3 : 30
  let formattedData = []
  let totalPage = 0
  let dashboard = true

  const { data, isLoading, error, refetch } = useQuery(
    id && [
      'CollectionsByPlanId',
      { planId: id, from, to, dashboard, limit, page: params.page }
    ],
    getCollectionsByPlan
  )

  if (data?.data?.data) {
    formattedData = formatCollections(
      history,
      url,
      params.page,
      limit,
      data.data.data.collections.list
    )

    totalPage = Math.ceil(data.data.data.collections.total / limit)
  }
  let finalFormattedData = formattedData.slice(0, limit)

  const onDatesChange = ({ startDate, endDate }) => {
    if (startDate) {
      setStartDate(startDate)
      setFrom(
        moment(startDate)
          .subtract(12, 'hours')
          .format('YYYY-MM-DD+HH:mm:ss')
      )
    }
    if (endDate) {
      setEndDate(endDate)
      setTo(
        moment(endDate)
          .add(11, 'hours')
          .add(59, 'minutes')
          .add(59, 'seconds')
          .format('YYYY-MM-DD+HH:mm:ss')
      )
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
          <h3>PLAN COLLECTIONS</h3>

          {props.minimized ? (
            <Button
              icon={<Eye />}
              variant="flat"
              onClick={() =>
                history.push({
                  pathname: `${url}/customer-plan-collection`,
                  state: id
                })
              }
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
                placeholder="Plan Collections"
                column={PlanCollectionTableColumn}
                data={finalFormattedData}
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

export default PlanCollections
