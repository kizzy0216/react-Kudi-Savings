import React, { useReducer } from 'react'
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
import { ParamsReducer, DefaultParams } from 'utils/function'
import { formatCollections } from './function'
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
        from: params.from,
        to: params.to
      }
    ],
    getCollections
  )

  let collection = data && data.data ? data.data.data : {}

  console.log(JSON.stringify(collection))
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
                column={[
                  {
                    key: `collectionDate`,
                    render: 'COLLECTION DATE'
                  },
                  {
                    key: 'timeCreated',
                    render: 'TIME CREATED'
                  },
                  {
                    key: 'totalAmountSaved',
                    render: 'AMOUNT COLLECTED'
                  },
                  {
                    key: 'balance',
                    render: 'BALANCE'
                  },

                  {
                    key: 'agentName',
                    render: 'AGENT'
                  }
                ]}
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
