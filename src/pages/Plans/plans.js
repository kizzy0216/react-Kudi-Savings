import React, { Fragment, useState, useContext } from 'react'
import { useQuery } from 'react-query'
import { SideSheet } from 'evergreen-ui'
import { Card, CardBody, Button, CardHeader } from '@kudi-inc/dip'
import { Header, Content } from 'components/Layout'
import Table from 'components/Table'
import { getPlans } from 'services/plans'
import styles from './plans.module.scss'
import AuthContext from 'context/AuthContext'
import { TableLoading } from 'components/loading'
import { Pencil } from 'assets/svg'
import EditPlan from './edit-plan'
import { formatCurrency } from 'utils/function'

const Plans = () => {
  const [auth] = useContext(AuthContext)
  const [page, setPage] = useState(1)
  const [plan, setPlan] = useState({})
  const [show, setShow] = useState(false)
  let limit = 25
  const { data, isLoading, error, refetch } = useQuery(
    ['Plans', { page, limit, id: auth.id }],
    getPlans
  )
  let formattedData = []
  if (data && data.data) {
    formattedData = data.data.data.plans.map(plan => ({
      title: plan.title ? plan.title : 'N/A',
      low: plan.low ? formatCurrency(plan.low) : 'N/A',
      high: plan.high ? formatCurrency(plan.high) : 'N/A',
      action: (
        <Button
          icon={<Pencil />}
          variant="flat"
          onClick={() => {
            setPlan(plan)
            return setShow(true)
          }}
        >
          Edit Plan
        </Button>
      )
    }))
  }

  return (
    <Fragment>
      <Header>
        <p> Plans</p>
        {/* <Button
          variant="flat"
          icon={<Add />}
          onClick={() => history.push('/create-plan')}
        >
          Add New Plan
        </Button> */}
      </Header>
      <Content className={styles.content}>
        <Card className={styles.contentCard}>
          <CardHeader className={styles.Header}>All Plans</CardHeader>
          <CardBody className={styles.Plans}>
            <div className={styles.PlansHeader}>
              {isLoading && <TableLoading />}
              {data && data.data && (
                <Table
                  className={styles.PlansTable}
                  column={[
                    { key: 'title', render: 'Title' },
                    {
                      key: 'low',
                      render: 'Low'
                    },
                    {
                      key: 'high',
                      render: 'high'
                    },

                    {
                      key: 'action',
                      render: 'Action'
                    }
                  ]}
                  data={formattedData}
                />
              )}
            </div>
          </CardBody>
        </Card>
      </Content>
      <SideSheet onCloseComplete={() => setShow(false)} isShown={show}>
        <EditPlan setShow={setShow} planInfo={plan} refetch={refetch} />
      </SideSheet>
    </Fragment>
  )
}
export default Plans
