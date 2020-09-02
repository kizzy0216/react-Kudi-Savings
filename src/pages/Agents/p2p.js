import React, { useReducer } from 'react'
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
import { formatP2P, P2PTableColumns } from './function'
import { ParamsReducer, DefaultParams } from 'utils/function'
import { ChevronLeft, Eye, Close } from 'assets/svg'
import { useHistory } from 'react-router-dom'

const P2P = props => {
  let history = useHistory()
  let { url } = useRouteMatch()
  const [params, setParams] = useReducer(ParamsReducer, DefaultParams)
  let formattedData = []
  let limit = props.minimized ? 3 : 50
  let totalPage = 0
  const { data, isLoading, error, refetch } = useQuery(
    [
      'P2P',

      {
        id: props.id,
        page: params.page,
        limit,
        from: params.from,
        to: params.to
      }
    ],
    getTransaction
  )
  let agent = data && data.data ? data.data.data : {}

  console.log(JSON.stringify(agent))

  if (data && data.data) {
    formattedData = formatP2P(params.page, limit, data.data.data.list)
    totalPage = Math.ceil(data.data.data.total / limit)
  }

  const onDatesChange = ({ startDate, endDate }) => {
    if (startDate) {
      setParams({
        type: 'UPDATE_DATE',
        payload: {
          startDate: startDate,
          from: moment(startDate)
            .subtract(1, 'days')
            .format('YYYY-MM-DD HH:mm:ss'),
          showReset: true
        }
      })
    }
    if (endDate) {
      setParams({
        type: 'UPDATE_DATE',
        payload: {
          endDate: endDate,
          to: moment(endDate).format('YYYY-MM-DD HH:mm:ss'),
          showReset: true
        }
      })
    }
  }
  const onFocusChange = focusedInput => {
    setParams({
      type: 'UPDATE_FOCUSEDINPUT',
      payload: focusedInput
    })
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
              onClick={() => history.push(`${url}/view-all-p2p`)}
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
                  focusedInput={params.focusedInput}
                  startDate={params.startDate}
                  endDate={params.endDate}
                  isOutsideRange={() => false}
                />
              </Filters>
              {params.showReset && (
                <Close
                  className="danger"
                  onClick={() => {
                    setParams({
                      type: 'RESET'
                    })
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
                placeholder="collection"
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

export default P2P
