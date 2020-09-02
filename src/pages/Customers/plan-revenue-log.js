import React, { useReducer } from 'react'
import Table from 'components/Table'
import { CardBody, Card, CardHeader, Button } from '@kudi-inc/dip'
import { TableLoading } from 'components/loading'
import { useHistory, useRouteMatch } from 'react-router-dom'
import styles from './customers.module.scss'
import { ChevronLeft, Eye } from 'assets/svg'
import { useQuery } from 'react-query'
import { ParamsReducer, DefaultParams } from 'utils/function'
import { Content } from 'components/Layout'
import moment from 'moment'
import { getPlan } from 'services/plans'
import { formatPlanRevenueLog } from './function'

const PlanRevenueLog = props => {
  let { plan, minimized } = props
  let history = useHistory()
  let { url } = useRouteMatch()
  const [params, setParams] = useReducer(ParamsReducer, DefaultParams)
  let limit = minimized ? 3 : 30
  let formattedData = []
  let totalPage = 0
  let { data, isLoading, error, refetch } = plan

  //console.log(JSON.stringify(plan))
  if (data && data.data && data.data.data) {
    formattedData = formatPlanRevenueLog(
      data.data.data.plan,
      history,
      params.page,
      limit
    )
    totalPage = Math.ceil(data.data.data.total / limit)
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
              onClick={() => history.push(`${url}/view-all-plan-revenue-log`)}
            >
              View All
            </Button>
          ) : (
            <></>
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
                column={[
                  {
                    key: `expectedDeductionDate`,
                    render: 'EXPECTED DEDUCTION DATE'
                  },
                  {
                    key: 'actualDeductionDate',
                    render: 'ACTUAL DEDUCTION DATE'
                  },
                  {
                    key: 'amount',
                    render: 'AMOUNT'
                  },
                  {
                    key: 'planStatus',
                    render: 'STATUS'
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

export default PlanRevenueLog
