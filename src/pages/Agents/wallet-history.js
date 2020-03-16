import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  DateRangePicker
} from '@kudi-inc/dip'

import { Header, Content, Filters } from 'components/Layout'
import Table from 'components/Table'
import { ChevronLeft } from 'assets/svg'
import { walletHistory } from 'services/agents'
import { TableLoading } from 'components/loading'
import styles from '../Transactions/transactions.module.scss'
import { formatWalletData } from 'utils/function'

const WalletHistory = ({ match: { params } }) => {
  const [page, setPage] = useState(1)

  let limit = 50
  let totalData = 0
  let totalPage = 0
  let formattedData = []

  const { data, isLoading, error, refetch } = useQuery(
    params &&
      params.id && ['history', { id: params.id, params: { page, limit } }],
    walletHistory
  )
  if (data && data.data) {
    formattedData = formatWalletData(data.data.data.list, page, limit)
    totalPage = Math.ceil(data.data.data.total / limit)
    totalData = data.data.data.total
  }

  return (
    <Fragment>
      <Header>
        <p> Wallet History </p>
      </Header>
      <Content className={styles.content}>
        <Card className={styles.contentCard}>
          <CardHeader className={styles.Header}>
            <h3>
              All
              {totalData ? ` - ${totalData.toLocaleString()}` : ''}
            </h3>
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
                    { key: 'transaction_type', render: 'Type' },
                    {
                      key: 'status',
                      render: 'Status'
                    },
                    {
                      key: 'amount',
                      render: 'Amount'
                    },
                    {
                      key: 'wallet_balance',
                      render: 'Balance'
                    },
                    { key: 'time', render: 'Date' }
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

export default WalletHistory
