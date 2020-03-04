import React, { Fragment, useState, useContext } from 'react'
import { useQuery } from 'react-query'
import { SideSheet } from 'evergreen-ui'
import moment from 'moment'
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from '@kudi-inc/dip'
import { Header, Content } from 'components/Layout'
import Table from 'components/Table'
import { SettingsLink, Add, ChevronLeft } from 'assets/svg'
import styles from './markets.module.scss'
import { getMarkets } from 'services/markets'
import { TableLoading } from 'components/loading'
import EditMarket from './edit-market'
import AuthContext from 'context/AuthContext'
import { Headers } from './data'

const Markets = ({ history }) => {
  const [auth] = useContext(AuthContext)
  const [show, setShow] = useState(false)
  let limit = 60
  const [page, setPage] = useState(1)
  let [active, setActive] = useState('all')
  let formattedData = []
  const [market, setMarket] = useState({})
  const { data, isLoading, error, refetch } = useQuery(
    ['Markets', { page, limit }],
    getMarkets
  )

  if (data && data.data && data.data.data && data.data.data.list) {
    formattedData = data.data.data.list.map(
      ({ city, state, lga, id, timeCreated, population, ...rest }) => ({
        ...rest,
        timeCreated: timeCreated
          ? moment(timeCreated).format('Do MMM, YYYY')
          : 'N/A',

        city: city ? city : 'N/A',
        lga: lga ? lga : 'N/A',
        state: state ? state : 'N/A',
        population: population ? population : 'N/A',
        action: (
          <Button
            icon={<SettingsLink />}
            variant="flat"
            onClick={() => {
              setMarket({
                city,
                state,
                lga,
                id,
                timeCreated,
                population,
                ...rest
              })
              return setShow(true)
            }}
          >
            Edit Market
          </Button>
        )
      })
    )
  }
  let headers = Headers.map(({ key, render, access }) =>
    access.includes(auth.type) ? { key, render } : []
  )
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
          <CardBody className={styles.Market}>
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
                className={styles.MarketTable}
                column={headers}
                data={formattedData}
              />
            )}
          </CardBody>
          {data && formattedData.length > 20 && (
            <CardFooter>
              <div className={styles.MarketTablePagination}>
                {page > 1 && (
                  <Button
                    variant="flat"
                    onClick={() => setPage(page - 1)}
                    icon={<ChevronLeft />}
                  ></Button>
                )}
                <p> Page {page} </p>
                {formattedData.length === limit && (
                  <Button
                    variant="flat"
                    onClick={() => setPage(page + 1)}
                  ></Button>
                )}
              </div>
            </CardFooter>
          )}
        </Card>
        <SideSheet onCloseComplete={() => setShow(false)} isShown={show}>
          <EditMarket setShow={setShow} market={market} refetch={refetch} />
        </SideSheet>
      </Content>
    </Fragment>
  )
}
export default Markets
