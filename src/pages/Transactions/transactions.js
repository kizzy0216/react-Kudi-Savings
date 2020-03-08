import React, { Fragment, useState } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  ButtonGroup,
  Button,
  Badge
} from '@kudi-inc/dip'
import { useRouteMatch } from 'react-router-dom'
import { Header, Content } from 'components/Layout'
import Table from 'components/Table'
import { Eye } from 'assets/svg'
import styles from './transactions.module.scss'

const Transactions = ({ history }) => {
  let { url } = useRouteMatch()
  let [active, setActive] = useState('all')
  return (
    <Fragment>
      <Header>
        <p> Transactions </p>
      </Header>
      <Content className={styles.content}>
        <Card className={styles.contentCard}>
          <CardHeader className={styles.Header}>
            Transaction History
            <ButtonGroup>
              <Button
                active={active === 'all'}
                onClick={() => setActive('all')}
              >
                All
              </Button>
              <Button
                active={active === 'wallet'}
                onClick={() => setActive('wallet')}
              >
                Wallet
              </Button>
              <Button
                active={active === 'bankAccount'}
                onClick={() => setActive('bankAccount')}
              >
                Bank Account
              </Button>
            </ButtonGroup>
          </CardHeader>
          <CardBody className={styles.Transactions}>
            <div className={styles.TransactionsHeader}>
              <Table
                className={styles.table}
                column={[
                  { key: 'date', render: 'Date' },
                  {
                    key: 'type',
                    render: 'Type'
                  },
                  { key: 'amount', render: 'Amount' },
                  {
                    key: 'walletBalance',
                    render: 'Current Balance'
                  },
                  {
                    key: 'status',
                    render: 'Status'
                  },
                  {
                    key: 'action',
                    render: ''
                  }
                ]}
                placeholder="transactions"
                data={[]}
              />
            </div>
          </CardBody>
        </Card>
      </Content>
    </Fragment>
  )
}

export default Transactions
