import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table
} from '@kudi-inc/dip'
import { useRouteMatch } from 'react-router-dom'
import { Header, Content } from 'components/Layout'
import { Eye, Add, ChevronLeft } from 'assets/svg'
import styles from './markets.module.scss'
import { getMarkets } from 'services/markets'
import { TableLoading } from 'components/loading'

const Markets = ({ history }) => {
  let { url } = useRouteMatch()
  const [page, setPage] = useState(1)
  let [active, setActive] = useState('all')
  let formattedData = []
  const { data, isLoading, error, refetch, fetchMore } = useQuery(
    ['Markets', { page }],
    getMarkets
  )

  if (data && data.data && data.data.data && data.data.data.list) {
    formattedData = data.data.data.list.map(
      ({ city, state, lga, id, timeCreated, ...rest }) => ({
        ...rest,
        timeCreated: timeCreated
          ? moment(timeCreated).format('Do MMM, YYYY')
          : 'N/A',
        state: state ? state : 'N/A',
        city: city ? city : 'N/A',
        lga: lga ? lga : 'N/A',
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
        <p> Markets </p>
        <Button
          variant="flat"
          icon={<Add />}
          onClick={() => history.push('/create-market')}
        >
          Add New Market
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
              <Fragment>
                <Table
                  className={styles.AgentTable}
                  column={[
                    {
                      key: 'name',
                      render: 'Market Name'
                    },
                    {
                      key: 'timeCreated',
                      render: 'Time Created'
                    },
                    { key: 'city', render: 'City' },

                    { key: 'state', render: 'State' },
                    {
                      key: 'lga',
                      render: 'LGA'
                    },
                    {
                      key: 'action',
                      render: 'ACTION'
                    }
                  ]}
                  data={formattedData}
                />
              </Fragment>
            )}
          </CardBody>
          <CardFooter>
            <div className={styles.AgentTablePagination}>
              <Button
                variant="flat"
                onClick={() => setPage(page - 1)}
                icon={<ChevronLeft />}
              ></Button>
              <p> Page {page}</p>
              <Button variant="flat" onClick={() => setPage(page + 1)}></Button>
            </div>
          </CardFooter>
        </Card>
      </Content>
    </Fragment>
  )
}
export default Markets
