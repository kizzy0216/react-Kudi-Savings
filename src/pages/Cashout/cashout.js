import React, { Fragment, useState } from 'react'
import { Card, CardBody, CardHeader, Button } from '@kudi-inc/dip'
import { useRouteMatch } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getWithdrawals } from 'services/cashout'
import { Header, Content } from 'components/Layout'
import Table from 'components/Table'
import styles from './cashout.module.scss'
import { formatData } from './function'
import { TableLoading } from 'components/loading'
import { Close, ChevronLeft, Search } from 'assets/svg'
const Cashout = ({ history }) => {
  let { url } = useRouteMatch()
  const [page, setPage] = useState(1)
  let [number, setNumber] = useState('')
  let [phoneNumber, setPhoneNumber] = useState('')
  let formattedData = []
  let limit = 50
  let totalData = 0
  let totalPage = 0
  const { data, isLoading, error, refetch } = useQuery(
    ['Withdrawals', { page, limit, phoneNumber }],
    getWithdrawals
  )

  if (data && data.data) {
    formattedData = formatData(data.data.data.list, history, url, page, limit)
    totalPage = Math.ceil(data.data.data.total / limit)
    totalData = data.data.data.total
  }
  // const handleSearch = ({ target: { value } }) => {
  //   const debounced_doSearch = debounce(() => setPhoneNumber(value), 1000)
  //   debounced_doSearch()
  // }
  return (
    <Fragment>
      <Header>
        <p> Cashout </p>
      </Header>
      <Content className={styles.content}>
        <Card className={styles.contentCard}>
          <CardHeader className={styles.Header}>  {totalData ? `Cashout Requests - ${totalData.toLocaleString()}` : ''}</CardHeader>
          <CardBody className={styles.Cashout}>
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
              
                  {
                    key: 'name',
                    render: 'Name'
                  },
                  {
                    key: 'planTitle',
                    render: 'Plan'
                  },
                  {
                    key: 'marketName',
                    render: 'Market Name'
                  },
                  {
                    key: 'agentName',
                    render: 'Agent Name'
                  },
                  {
                    key: 'managerName',
                    render: 'Manager Name'
                  },
                  { key: 'amount', render: 'Amount' },

                  {
                    key: 'status',
                    render: 'Status'
                  },
                  {
                    key: 'timeCreated',
                    render: 'Time Requested'
                  },
                  {
                    key: 'action',
                    render: ''
                  }
                ]}
                placeholder="cashout"
                data={formattedData}
              />
            )}
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

export default Cashout
