import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { Card, CardBody, CardHeader, Button } from '@kudi-inc/dip'
import { useRouteMatch } from 'react-router-dom'
import { Header, Content } from 'components/Layout'
import Table from 'components/Table'
import { ChevronLeft } from 'assets/svg'
import styles from './transactions.module.scss'
import { getTransactions } from 'services/transactions'
import { TableLoading } from 'components/loading'
import { formatData } from './function'

const Transactions = ({ history }) => {
  let { url } = useRouteMatch()
  const [page, setPage] = useState(1)
  let limit = 50
  let totalData = 0
  let totalPage = 0
  let formattedData = []
  const { data, isLoading, error, refetch } = useQuery(
    ['Transactions', { page, limit }],
    getTransactions
  )
  if (data && data.data) {
    formattedData = formatData(data.data.data.list, history, url, page, limit)
    totalPage = Math.ceil(data.data.data.total / limit)
    totalData = data.data.data.total
  }
  return (
    <Fragment>
      <Header>
        <p> Transactions </p>
      </Header>
      <Content className={styles.content}>
        <Card className={styles.contentCard}>
          <CardHeader className={styles.Header}>
            Transaction History{' '}
            {totalData ? ` - ${totalData.toLocaleString()}` : ''}
          </CardHeader>
          <CardBody className={styles.Transactions}>
            <div className={styles.TransactionsHeader}>
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
                    { key: 'sN', render: 'S/N' },
                    {
                      key: 'marketName',
                      render: 'Market'
                    },
                    { key: 'agentName', render: 'DSA' },
                    {
                      key: 'plan',
                      render: 'Plan'
                    },
                    {
                      key: 'amount',
                      render: 'Amount'
                    },
                    {
                      key: 'totalAmountSaved',
                      render: 'Total Saved'
                    },
                    { key: 'collectionDate', render: 'Date Collected' },
                    { key: 'timeCreated', render: 'Date Created' }
                  ]}
                  placeholder="transactions"
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

export default Transactions
