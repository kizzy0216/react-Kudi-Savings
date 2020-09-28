import React, { useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import Table from 'components/Table'
import { CardBody, Card, Button, Badge } from '@kudi-inc/dip'
import { TableLoading } from 'components/loading'
import { UserPlanTableColumn, formatCurrency, formatText } from 'utils/function'
import styles from './customers.module.scss'
import { Eye } from 'assets/svg'

const UserPlans = ({ plans, history, phoneNumber }) => {
  let { url } = useRouteMatch()
  let formattedData = []
  let { data, isLoading, error, refetch } = plans
  if (data && data.data && data.data.data) {
    formattedData = data.data.data.plans.list.map(
      ({
        collectionCount,
        duration,
        dailyAmount,
        amountSaved,
        planStatus,
        plan,
        id,
        title,
        ...rest
      }) => ({
        ...rest,
        plan: `${title}(${plan.title})`,
        collectionCount: formatText(collectionCount),
        duration: `${formatText(duration)} days`,
        amountSaved: formatCurrency(amountSaved),
        dailyAmount: formatCurrency(dailyAmount),
        planStatus: planStatus ? (
          <Badge variant={planStatus === 'ACTIVE' ? 'success' : 'danger'}>
            {planStatus}
          </Badge>
        ) : (
          '-'
        ),
        action: (
          <Button
            icon={<Eye />}
            variant="flat"
            onClick={() =>
              history.push({
                pathname: `${url}/plan/${id}`,
                state: phoneNumber
              })
            }
          >
            View
          </Button>
        )
      })
    )
  }
  return (
    <Card>
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
              placeholder="User Plan"
              column={UserPlanTableColumn}
              data={formattedData}
            />
          )}
        </div>
      </CardBody>
    </Card>
  )
}
export default UserPlans
