import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { Card, CardBody, Button, CardHeader } from '@kudi-inc/dip'
import { Header, Content } from 'components/Layout'
import Table from 'components/Table'
import { getPlans } from 'services/plans'
import styles from './plans.module.scss'
const Plans = () => {
  const [page, setPage] = useState(0)
  let limit = 60
  const { data, isLoading, error, refetch } = useQuery(
    ['Plans', { page, limit }],
    getPlans
  )
  if (data) {
    console.log(data.data)
  }

  return (
    <Fragment>
      <Header>
        <p> Plans</p>
      </Header>
      <Content className={styles.content}>
        <Card className={styles.contentCard}>
          <CardHeader className={styles.Header}>All Plans</CardHeader>
          <CardBody className={styles.Plans}>
            <div className={styles.PlansHeader}>
              <Table
                className={styles.PlansTable}
                column={[
                  { key: 'date', render: 'Date' },
                  {
                    key: 'fullName',
                    render: 'Full name'
                  },
                  {
                    key: 'phoneNumber',
                    render: 'Phone Number'
                  },
                  { key: 'amountSaved ', render: 'Amount Saved' },

                  {
                    key: 'amountWithdrawn',
                    render: 'Amount Withdrawn'
                  },

                  {
                    key: 'status',
                    render: 'Status'
                  },
                  {
                    key: 'action',
                    render: ''
                  }
                ]}
                data={[]}
              />
            </div>
          </CardBody>
        </Card>
      </Content>
    </Fragment>
  )
}
export default Plans
