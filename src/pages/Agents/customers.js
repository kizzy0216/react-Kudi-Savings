import React, { useState } from 'react'
import moment from 'moment'
import {
  Table,
  Card,
  CardHeader,
  Button,
  ButtonGroup,
  Badge
} from '@kudi-inc/dip'
import { useRouteMatch } from 'react-router-dom'
import { Eye } from 'assets/svg'
import styles from './agents.module.scss'
import { TableLoading } from 'components/loading'
import { formatCurrency } from 'utils/function'

const Customers = ({ history, users }) => {
  let { data, isLoading, error, refetch } = users
  let { url } = useRouteMatch()
  let [active, setActive] = useState('all')
  let customer = []

  if (data && data.data) {
    customer = data.data.data.list.map(
      ({
        firstName,
        lastName,
        status,
        totalSaved,
        totalWithdrawn,
        cashBalance,
        timeCreated,
        id,
        ...rest
      }) => ({
        ...rest,
        fullName: `${firstName} ${lastName}`,
        totalSaved: formatCurrency(totalSaved),
        totalWithdrawn: formatCurrency(totalWithdrawn),
        timeCreated: timeCreated
        ? moment(timeCreated).format('Do MMM, YYYY')
        : 'N/A',
        // action: (
        //   <Button
        //     icon={<Eye />}
        //     variant="flat"
        //     onClick={() => history.push(`${url}/${id}`)}
        //   >
        //     View
        //   </Button>
        // )
      })
    )
  }
  return (
    <div>
      <Card>
        <CardHeader className={styles.Header}>
          Customers
          <ButtonGroup>
            <Button active={active === 'all'} onClick={() => setActive('all')}>
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
            className={styles.CashoutTable}
            column={[
              {
                key: 'fullName',
                render: 'Full Name'
              },
              { key: 'phoneNumber', render: 'Phone Number' },
              {
                key: 'totalSaved',
                render: 'Amount Saved'
              },
              {
                key: 'totalWithdrawn',
                render: 'Amount Withdrawn'
              },
              {
                key: 'timeCreated',
                render: 'Time Created'
              }
            ]}
            data={customer}
          />
        )}
      </Card>
    </div>
  )
}
export default Customers
