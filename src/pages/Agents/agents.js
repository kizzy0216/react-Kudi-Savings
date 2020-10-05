import React, { Fragment, useState, useContext } from 'react'
import { useQuery } from 'react-query'
import {
  Card,
  CardBody,
  Button,
  CardHeader,
  Badge
} from '@kudi-inc/dip'
import { useRouteMatch } from 'react-router-dom'
import { Header, Content } from 'components/Layout'
import { Eye, Add, ChevronLeft } from 'assets/svg'
import styles from './agents.module.scss'
import { getAgents } from 'services/agents'
import { TableLoading } from 'components/loading'
import Table from 'components/Table'
import { formatCurrency } from 'utils/function'
import AuthContext from 'context/AuthContext'

const Agents = ({ history }) => {
  let { url } = useRouteMatch()
  const [auth] = useContext(AuthContext)
  const [page, setPage] = useState(1)
  let totalPage = 0
  let limit = 20
  let formattedData = []
  const { data, isLoading, error, refetch } = useQuery(
    ['Agents', { page, limit }],
    getAgents
  )

  if (data && data.data) {
    formattedData = data.data.data.list.map(
      ({ firstName, lastName, status, cashBalance, id, market, ...rest }) => ({
        ...rest,
        fullName: `${firstName} ${lastName}`,
        cashBalance: formatCurrency(cashBalance),
        market: market ? market.name : '-',
        status: status ? (
          <Badge
            variant={
              status === 'ACTIVE'
                ? 'success'
                : status === 'SUSPENDED'
                ? 'danger'
                : 'primary'
            }
          >
            {status}
          </Badge>
        ) : (
          '-'
        ),

        action: (
          <Button
            icon={<Eye />}
            variant="flat"
            onClick={() => history.push(`${url}/${id}`)}
          >
            View
          </Button>
        )
      })
    )
    totalPage = Math.ceil(data.data.data.total / limit)
  }
  return (
    <Fragment>
      <Header>
        <p> Agents </p>
        {auth && auth.type === 'ZONAL' && (
          <Button
            variant="flat"
            icon={<Add />}
            onClick={() => history.push('/create-agent')}
          >
            Add new agent
          </Button>
        )}
      </Header>
      <Content className={styles.content}>
        <Card className={styles.contentCard}>
          <CardHeader className={styles.Header}>
            All
          </CardHeader>
          <CardBody className={styles.Agent}>
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
                column={[
                  {
                    key: 'fullName',
                    render: 'Full Name'
                  },

                  {
                    key: 'phoneNumber',
                    render: 'Phone Number'
                  },
                  {
                    key: 'market',
                    render: 'Market'
                  },
                  {
                    key: 'cashBalance',
                    render: 'Balance'
                  },
                  {
                    key: 'status',
                    render: 'status'
                  },
                  {
                    key: 'action',
                    render: 'ACTION'
                  }
                ]}
                data={formattedData}
              />
            )}
          </CardBody>
          {data && (
            <div className="pagination">
              {page > 1 && (
                <Button
                  variant="flat"
                  onClick={() => setPage(page - 1)}
                  icon={<ChevronLeft />}
                ></Button>
              )}
              <p>
                Page {page} of {totalPage}
              </p>
              {formattedData.length === limit && (
                <Button
                  variant="flat"
                  onClick={() => setPage(page + 1)}
                ></Button>
              )}
            </div>
          )}
        </Card>
      </Content>
    </Fragment>
  )
}
export default Agents
