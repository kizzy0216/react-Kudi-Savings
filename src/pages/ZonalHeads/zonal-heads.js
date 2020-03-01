import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import {
  Card,
  CardBody,
  Button,
  Table,
  CardHeader,
  ButtonGroup,
  Badge
} from '@kudi-inc/dip'
import moment from 'moment'
import cx from 'classnames'
import { useRouteMatch } from 'react-router-dom'
import { Header, Content } from 'components/Layout'
import { TableLoading } from 'components/loading'
import { Eye, Add } from 'assets/svg'
import styles from './zonal-heads.module.scss'
import { getManagers } from 'services/zonal-heads'

const ZonalHeads = ({ history }) => {
  let { url } = useRouteMatch()
  let [active, setActive] = useState('all')
  let formattedData = []

  const { data, isLoading, error, refetch } = useQuery(
    ['Managers', {}],
    getManagers
  )

  if (data) {
    formattedData = data.data.data.list.map(
      ({ firstName, lastName, status, email, timeCreated, id, ...rest }) => ({
        ...rest,
        timeCreated: timeCreated
          ? moment(timeCreated).format('Do MMM YYYY')
          : 'N/A',
        fullName: `${firstName} ${lastName}`,
        status: status ? (
          <Badge variant={status === 'ACTIVE' ? 'success' : 'pending'}>
            {status}
          </Badge>
        ) : (
          'N/A'
        ),

        email: email ? email : 'N/A',

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
        <p> Zonal Heads </p>
        <Button
          variant="flat"
          icon={<Add />}
          onClick={() => history.push('/create-zonal-head')}
        >
          Add Zonal Head
        </Button>
      </Header>
      <Content className={styles.content}>
        <Card className={styles.contentCard}>
          <CardHeader className={cx(styles.Header, styles.ZHHeader)}>
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
          <CardBody className={styles.ZH}>
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
                className={styles.ZHTable}
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
                    key: 'email',
                    render: 'Email'
                  },
                  { key: 'status', render: 'Status' },
                  { key: 'type', render: 'Type' },
                  {
                    key: 'timeCreated',
                    render: 'Time Created'
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
        </Card>
      </Content>
    </Fragment>
  )
}
export default ZonalHeads
