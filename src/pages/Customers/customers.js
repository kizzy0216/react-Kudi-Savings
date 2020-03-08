import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { Card, CardBody, Button, CardHeader, Badge } from '@kudi-inc/dip'
import { Header, Content } from 'components/Layout'
import Table from 'components/Table'
import styles from './customers.module.scss'
import { getCustomers } from 'services/customers'
import { Eye, ChevronLeft } from 'assets/svg'
import { formatCurrency } from 'utils/function'
import { TableLoading } from 'components/loading'

const Customers = () => {
  const [page, setPage] = useState(1)
  const [customer, setCustomer] = useState({})
  const [show, setShow] = useState(false)
  let limit = 100
  let totalData = 0
  let totalPage = 0
  const { data, isLoading, error, refetch } = useQuery(
    ['Customers', { page, limit }],
    getCustomers
  )
  let formattedData = []
  if (data && data.data) {
    formattedData = data.data.data.list.map(
      ({
        firstName,
        market,
        lastName,
        cashBalance,
        status,
        phoneNumber,
        totalSaved,
        totalWithdrawn
      }) => ({
        fullName: `${firstName} ${lastName}`,
        cashBalance: formatCurrency(cashBalance),
        market: market ? market.name : 'N/A',
        phoneNumber: phoneNumber ? phoneNumber : 'N/A',
        totalSaved: formatCurrency(totalSaved) ,
        totalWithdrawn: formatCurrency(totalSaved),
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
            onClick={() => {
              setCustomer({
                firstName,
                market,
                lastName,
                cashBalance,
                status,
                phoneNumber,
                totalSaved,
                totalWithdrawn
              })
              return setShow(true)
            }}
          >
            View
          </Button>
        )
      })
    )
    totalPage = Math.ceil(data.data.data.total / limit)
    totalData = data.data.data.total
  }

  return (
    <Fragment>
      <Header>
        <p> Customers </p>
      </Header>
      <Content className={styles.content}>
        <Card className={styles.contentCard}>
          <CardHeader className={styles.Header}>
            Total Customers - {totalData.toLocaleString()}
          </CardHeader>
          <CardBody className={styles.Customers}>
            <div className={styles.CustomersHeader}>
              {isLoading && <TableLoading />}
              {data && (
                <Table
                  className={styles.CustomersTable}
                  column={[
                    {
                      key: 'fullName',
                      render: 'Full name'
                    },
                    {
                      key: 'phoneNumber',
                      render: 'Phone Number'
                    },

                    { key: 'totalSaved', render: 'Amount Saved' },

                    {
                      key: 'totalWithdrawn',
                      render: 'Amount Withdrawn'
                    },

                    {
                      key: 'action',
                      render: 'ACTION'
                    }
                  ]}
                  data={formattedData}
                />
              )}
            </div>
          </CardBody>
          {data && (
            <div className={styles.CustomersTablePagination}>
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
export default Customers
