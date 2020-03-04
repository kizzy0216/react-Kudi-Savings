import React, { Fragment } from 'react'
import {
  Card,
  CardBody,
  Button,
  CardHeader

} from '@kudi-inc/dip'
import { Header, Content } from 'components/Layout'
import Table from 'components/Table'
import styles from './customers.module.scss'
const Customers = () => {
  return (
    <Fragment>
      <Header>
        <p> Customers </p>
      </Header>
      <Content className={styles.content}>
        <Card className={styles.contentCard}>
        <CardHeader className={styles.Header}>
            All Customers
            
          </CardHeader>
          <CardBody className={styles.Transactions}>
            <div className={styles.TransactionsHeader}>
              <Table
                className={styles.TransactionsTable}
                column={[
                  { key: 'date', render: 'Date' },
                  {
                    key: 'fullName',
                    render: 'Full name'
                  },
                  {
                    key: 'phoneNumber',
                    render: 'Phone Number'
                  },
                  { key: 'amountSaved ', render: 'Amount Saved' },

                  {
                    key: 'amountWithdrawn',
                    render: 'Amount Withdrawn'
                  },
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
               
                data={[]}
              />
            </div>
          </CardBody>
        </Card>
      </Content>
    </Fragment>
  )
}
export default Customers
