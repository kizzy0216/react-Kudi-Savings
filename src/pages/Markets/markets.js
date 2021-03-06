import React, { Fragment, useState, useContext } from 'react'
import { useQuery } from 'react-query'
import { SideSheet } from 'evergreen-ui'
import moment from 'moment'
import { Button, Card, CardHeader, CardBody } from '@kudi-inc/dip'
import { Header, Content } from 'components/Layout'
import Table from 'components/Table'
import { SettingsLink, Add, ChevronLeft } from 'assets/svg'
import styles from './markets.module.scss'
import { getMarkets } from 'services/markets'
import { TableLoading } from 'components/loading'
import EditMarket from './edit-market'
import AuthContext from 'context/AuthContext'
import { Headers } from './data'
import { formatCurrency } from '../../utils/function'

const Markets = ({ history }) => {
  const [auth] = useContext(AuthContext)
  const [show, setShow] = useState(false)
  let limit = 20
  let totalPage = 0
  const [page, setPage] = useState(1)
  let formattedData = []
  const [market, setMarket] = useState({})
  const { data, isLoading, error, refetch } = useQuery(
    ['Markets', { page, limit }],
    getMarkets
  )
  if (data && data.data && data.data.data && data.data.data.list) {
    formattedData = data.data.data.list.map(
      ({ city, state, lga, id, timeCreated, totalRevenue, ...rest }) => ({
        ...rest,
        timeCreated: timeCreated
          ? moment(timeCreated).format('Do MMM, YYYY')
          : 'N/A',
        totalRevenue: formatCurrency(totalRevenue),
        city: city ? city : 'N/A',
        lga: lga ? lga : 'N/A',
        state: state ? state : 'N/A',
        // population: population ? population : 'N/A',
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
                totalRevenue,
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
    totalPage = Math.ceil(data.data.data.total / limit)
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
            {/* <ButtonGroup>
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
            </ButtonGroup> */}
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

            {data && <Table column={headers} data={formattedData} />}
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
                Page {page} of {totalPage}{' '}
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
        <SideSheet onCloseComplete={() => setShow(false)} isShown={show}>
          <EditMarket setShow={setShow} market={market} refetch={refetch} />
        </SideSheet>
      </Content>
    </Fragment>
  )
}
export default Markets
