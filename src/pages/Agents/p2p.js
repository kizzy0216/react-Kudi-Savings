import React, { useReducer, useState } from 'react'
import { Content, Filters } from 'components/Layout'
import moment from 'moment'
import {
  Card,
  CardHeader,
  Button,
  CardBody,
  DateRangePicker
} from '@kudi-inc/dip'
import styles from './recent-collections.module.scss'
import Table from 'components/Table'
import { getTransaction } from 'services/p2p'
import { useRouteMatch } from 'react-router-dom'
import { useQuery } from 'react-query'
import { TableLoading } from 'components/loading'
import {
  formatP2P,
  P2PTableColumns,
  ParamsReducer,
  DefaultParams
} from 'utils/function'
import { ChevronLeft, Eye, Close } from 'assets/svg'
import { useHistory } from 'react-router-dom'

const P2P = props => {
  let history = useHistory()
  let { url } = useRouteMatch()
  const [focusedInput, setfocusedInput] = useState(null)
  const [showReset, setShowReset] = useState(false)
  const initialStartDate = moment().subtract(29, 'days')
  const initialEndDate = moment()
  const initialFrom = initialStartDate.format('YYYY-MM-DD')
  const initialTo = initialEndDate.format('YYYY-MM-DD')
  const [from, setFrom] = useState(initialFrom)
  const [to, setTo] = useState(initialTo)
  const [endDate, setEndDate] = useState(initialEndDate)
  const [startDate, setStartDate] = useState(initialStartDate)
  const [params, setParams] = useReducer(ParamsReducer, DefaultParams)
  let formattedData = []
  let limit = props.minimized ? 3 : 50
  let totalPage = 0
  const { data, isLoading, error, refetch } = useQuery(
    [
      'P2P',

      {
        agentId: props.id,
        page: params.page,
        limit,
        from,
        to
      }
    ],
    getTransaction
  )

  if (data?.data?.data) {
    formattedData = formatP2P(params.page, limit, data.data.data)
    totalPage = Math.ceil(data.data.data.total / limit)
  }

  const onDatesChange = ({ startDate, endDate }) => {
    if (startDate) {
      setStartDate(startDate)
      setFrom(
        moment(startDate)
          .subtract(1, 'days')
          .format('YYYY-MM-DD')
      )
    }
    if (endDate) {
      setEndDate(endDate)
      setTo(moment(endDate).format('YYYY-MM-DD'))
    }
    setShowReset(true)
  }
  const onFocusChange = focusedInput => {
    setfocusedInput(focusedInput)
  }

  return (
    <Content className={styles.content}>
      <Card className={styles.contentCard}>
        <CardHeader className={styles.Header}>
          <h3>P2P</h3>

          {props.minimized ? (
            <Button
              icon={<Eye />}
              variant="flat"
              onClick={() =>
                history.push({
                  pathname: `${url}/view-all-p2p`,
                  state: props.id
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
        <CardBody className={styles.Transactions}>
          <div className={styles.TransactionsHeader}>
            {isLoading && <TableLoading />}
            {error && (
              <span>
                Error!
                <button onClick={() => refetch({ disableThrow: true })}>
                  Retry
                </button>
              </span>
            )}
            {data && (
              <Table
                column={P2PTableColumns}
                placeholder="P2P"
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
              {totalPage ? (
                <p>
                  {' '}
                  Page {params.page} of {totalPage}
                </p>
              ) : (
                <></>
              )}
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

export default P2P
