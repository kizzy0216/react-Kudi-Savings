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
import { getCollections } from 'services/collections'
import {
  ParamsReducer,
  DefaultParams,
  formatCollections,
  PlanCollectionTableColumn
} from 'utils/function'
import styles from './customers.module.scss'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { ChevronLeft, Eye, Close } from 'assets/svg'
import { useQuery } from 'react-query'
import { Content, Filters } from 'components/Layout'
import moment from 'moment'

const PlanCollections = props => {
  let { url } = useRouteMatch()
  let history = useHistory()
  let { minimized } = props
  const [focusedInput, setfocusedInput] = useState(null)
  const [showReset, setShowReset] = useState(false)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [endDate, setEndDate] = useState('')
  const [startDate, setStartDate] = useState('')
  const [params, setParams] = useReducer(ParamsReducer, DefaultParams)
  let limit = minimized ? 3 : 30
  let formattedData = []
  let totalPage = 0
  const { data, isLoading, error, refetch } = useQuery(
    [
      'Collections',

      {
        page: params.page,
        limit,
        params:{from, to},
      }
    ],
    getCollections
  )

  if (data && data.data) {
    formattedData = formatCollections(
      history,
      url,
      params.page,
      limit,
      data.data.data.list
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
          <h3>PLAN COLLECTIONS</h3>

          {props.minimized ? (
            <Button
              icon={<Eye />}
              variant="flat"
              onClick={() => history.push(`${url}/customer-plan-collection`)}
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

export default PlanCollections
