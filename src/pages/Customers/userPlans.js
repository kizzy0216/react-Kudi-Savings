import React, { useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import Table from 'components/Table'
import { Card } from '@kudi-inc/dip'
import { TableLoading } from 'components/loading'
import { formatPlan } from './function'
const UserPlans = ({ plans, history }) => {
  let { url } = useRouteMatch()
  const [page, setPage] = useState(1)
  let limit = 30
  let formattedData = []
  let { data, isLoading, error, refetch } = plans
  if (data && data.data && data.data.data) {
    formattedData = formatPlan(
      data.data.data.plans.list,
      history,
      url,
      page,
      limit
    )
  }
  return (
    <div>
      {isLoading && <TableLoading />}
      {error && (
        <span>
          Error!
          <button onClick={() => refetch({ disableThrow: true })}>Retry</button>
        </span>
      )}
      {data && data.data && (
        <Card>
          <Table
            placeholder="User Plan"
            column={[
              {
                key: `plan`,
                render: 'Plan'
              },
              {
                key: 'collectionCount',
                render: 'Collection Count'
              },
              { key: 'dailyAmount', render: 'Daily Amount' },

              { key: 'amountSaved', render: 'Amount Saved' },

              {
                key: 'planStatus',
                render: 'Plan Status'
              },

              {
                key: 'action',
                render: 'VIEW HISTORY'
              }
            ]}
            data={formattedData}
          />
        </Card>
      )}
    </div>
  )
}
export default UserPlans
