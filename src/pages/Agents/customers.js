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
import { ChevronLeft } from 'assets/svg'
import styles from './agents.module.scss'
import { TableLoading } from 'components/loading'
import { formatCurrency } from 'utils/function'

const Customers = ({ history, users, page, setPage, limit }) => {
  let { data, isLoading, error, refetch } = users
  let [active, setActive] = useState('all')
  let customer = []
  let totalPage = 0
  if (data && data.data) {
    customer = data.data.data.list.map(
      (
        {
          firstName,
          lastName,
          status,
          totalSaved,
          totalWithdrawn,
          cashBalance,
          timeCreated,
          id,
          ...rest
        },
        index
      ) => ({
        ...rest,
        sN: (page - 1) * limit + (index + 1),
        fullName: `${firstName} ${lastName}`,
        totalSaved: formatCurrency(totalSaved),
        totalWithdrawn: formatCurrency(totalWithdrawn),
        timeCreated: timeCreated
          ? moment(timeCreated).format('Do MMM, YYYY')
          : 'N/A'
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
    totalPage = Math.ceil(data.data.data.total / limit)
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
                key: 'sN',
                render: 'S/N'
              },
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
        {!isLoading && (
          <div className={styles.AgentTablePagination}>
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
            {customer.length === limit && (
              <Button variant="flat" onClick={() => setPage(page + 1)}></Button>
            )}
            {isLoading && page > 1 && <>Fetching</>}
          </div>
        )}
      </Card>
    </div>
  )
}
export default Customers
