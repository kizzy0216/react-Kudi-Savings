import React, { Fragment } from 'react'
import {
  Card,
  CardBody,
  CardHeader
} from '@kudi-inc/dip'
import { Header, Content } from 'components/Layout'
import Table from 'components/Table'
import styles from './cashout.module.scss'

const Cashout = () => {
  return (
    <Fragment>
      <Header>
        <p> Cashout </p>
      </Header>
      <Content className={styles.content}>
        <Card className={styles.contentCard}>
          <CardHeader className={styles.Header}>Cashout</CardHeader>
          <CardBody className={styles.Cashout}>
            <Table
              column={[
                { key: 'date', render: 'Date' },
                {
                  key: 'agentName',
                  render: 'Agent Name'
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
              placeholder="cashout"
              data={[]}
            />
          </CardBody>
        </Card>
      </Content>
    </Fragment>
  )
}

export default Cashout
