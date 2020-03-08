import React, { Fragment } from 'react'
import {
  Card,
  CardBody,
  ButtonGroup,
  Button,
  Badge,
  CardHeader
} from '@kudi-inc/dip'
import { useRouteMatch } from 'react-router-dom'
import { Header, Content } from 'components/Layout'
import Table from 'components/Table'
import { Eye } from 'assets/svg'
import styles from './cashout.module.scss'
const Cashout = ({ history }) => {
  let { url } = useRouteMatch()
  return (
    <Fragment>
      <Header>
        <p> Cashout </p>
        <ButtonGroup className={styles.ButtonGroup}>
          <Button active>Cash Out Requests</Button>
          <Button>Cash Out History</Button>
        </ButtonGroup>
      </Header>
      <Content className={styles.content}>
        <Card className={styles.contentCard}>
          <CardHeader className={styles.Header}>Cashout</CardHeader>
          <CardBody className={styles.Cashout}>
            <Table
              className={styles.table}
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
