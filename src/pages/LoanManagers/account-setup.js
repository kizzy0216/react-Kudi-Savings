import React, { Fragment } from 'react'
import { SetupSuccess, ChevronLeft } from 'assets/svg'
import styles from './create-loan-manager.module.scss'
import { Button, Card, CardBody } from '@kudi-inc/dip'
import { Header, Content } from 'components/Layout'
const AccountSetup = ({ history }) => {
  return (
    <Fragment>
      <Header>
        <p>
          <ChevronLeft
            role="button"
            onClick={() => history.push(`/loan-managers`)}
          />
          Account Created
        </p>
      </Header>
      <Content>
        <Card className={styles.AccountSetup}>
          <CardBody className={styles.AccountSetupBody}>
            <SetupSuccess />
            <h2> Account Setup Successful</h2>
            <p>An account has being created</p>
            <p>An invite has been sent to your agent</p>
            <Button onClick={() => history.push(`/loan-managers`)}>
              Continue
            </Button>
          </CardBody>
        </Card>
      </Content>
    </Fragment>
  )
}
export default AccountSetup
