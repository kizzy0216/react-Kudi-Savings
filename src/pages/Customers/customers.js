import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { Card, CardBody, Button, CardHeader, Badge } from '@kudi-inc/dip'
import { useRouteMatch } from 'react-router-dom'
import { Header, Content } from 'components/Layout'
import Table from 'components/Table'
import styles from './customers.module.scss'
import { getCustomers } from 'services/customers'
import { Eye, ChevronLeft } from 'assets/svg'
import { formatData } from './function'
import { TableLoading } from 'components/loading'

const Customers = ({ history }) => {
  let { url } = useRouteMatch()
  const [page, setPage] = useState(1)
  const [show, setShow] = useState(false)
  let limit = 50
  let totalData = 0
  let totalPage = 0
  const { data, isLoading, error, refetch } = useQuery(
    ['Customers', { page, limit }],
    getCustomers
  )
  let formattedData = []
  if (data && data.data) {
    formattedData = formatData(data.data.data.list, history, url, page, limit)
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
                  column={[
                    { key: 'sN', render: 'S/N' },
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
export default Customers
