import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import {
  Card,
  CardBody,
  Button,
  Table,
  CardHeader,
  ButtonGroup,
  Badge,
  CardFooter
} from '@kudi-inc/dip'
import { useRouteMatch } from 'react-router-dom'
import { Header, Content } from 'components/Layout'
import { Eye, Add, ChevronLeft } from 'assets/svg'
import styles from './agents.module.scss'
import { getAgents } from 'services/agents'
import { TableLoading } from 'components/loading'
import { formatCurrency } from 'utils/function'

const Agents = ({ history }) => {
  let { url } = useRouteMatch()
  let [active, setActive] = useState('all')
  const [page, setPage] = useState(1)
  let limit = 60
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
        market: market ? market.name : 'N/A',
        status: status ? (
          <Badge variant={status === 'ACTIVE' ? 'success' : 'pending'}>
            {status}
          </Badge>
        ) : (
          'N/A'
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
  }
  return (
    <Fragment>
      <Header>
        <p> Agents </p>
        <Button
          variant="flat"
          icon={<Add />}
          onClick={() => history.push('/create-agent')}
        >
          Add new agent
        </Button>
      </Header>
      <Content className={styles.content}>
        <Card className={styles.contentCard}>
          <CardHeader className={styles.Header}>
            All
            <ButtonGroup>
              <Button
                active={active === 'all'}
                onClick={() => setActive('all')}
              >
                All
              </Button>
              <Button
                active={active === 'highest'}
                onClick={() => setActive('highest')}
              >
                Highest
              </Button>
              <Button
                active={active === 'highest'}
                onClick={() => setActive('highest')}
              >
                Lowest
              </Button>
            </ButtonGroup>
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
                className={styles.AgentTable}
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
            <CardFooter>
              <div className={styles.AgentTablePagination}>
                {page > 1 && (
                  <Button
                    variant="flat"
                    onClick={() => setPage(page - 1)}
                    icon={<ChevronLeft />}
                  ></Button>
                )}
                <p> Page {page} </p>
                <Button
                  variant="flat"
                  onClick={() => setPage(page + 1)}
                ></Button>
              </div>
            </CardFooter>
          )}
        </Card>
      </Content>
    </Fragment>
  )
}
export default Agents
