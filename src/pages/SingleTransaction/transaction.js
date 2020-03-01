import React, { Fragment } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Badge,
  CardFooter
} from '@kudi-inc/dip'
import { SettingsLink, Bin, Eye } from 'assets/svg'
import { Header, Content } from 'components/Layout'
import styles from './singleTransaction.module.scss'
import AgentImg from 'assets/images/agent.png'
const Transaction = () => {
  return (
    <Fragment>
      <Header>
        <p> Transaction Overview </p>
      </Header>
      <Content className={styles.content}>
        <div className={styles.contentCard}>
          <div className={styles.ST}>
            <Card>
              <CardHeader>
                <div className={styles.STHeader}>
                  <h3> AGENT INFORMATION</h3>

                  <Button variant="flat" icon={<SettingsLink />}>
                    Edit Profile
                  </Button>
                  <Button variant="flat" icon={<Bin />}>
                    Suspend Agent
                  </Button>
                </div>
              </CardHeader>
              <CardBody className={styles.STBody}>
                <div className={styles.STBodyGrid}>
                  <div className={styles.STBodyGridProfile}>
                    <img
                      className={styles.STBodyGridProfileImg}
                      src={AgentImg}
                      alt="agent"
                    />
                  </div>
                  <div>
                    <div className={styles.STBodyGridContent}>
                      <span>Name</span>
                      <span> Firstname Lastname</span>
                    </div>
                    <div className={styles.STBodyGridContent}>
                      <span>Phone number</span>
                      <span> 08062361452</span>
                    </div>
                    <div className={styles.STBodyGridContent}>
                      <span>Gender</span>
                      <span>Male</span>
                    </div>

                    <div className={styles.STBodyGridContent}>
                      <span>Address</span>
                      <span>Streetname, lga, state</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <div className={styles.STHeader}>
                  <h3> Cashout</h3>

                  <Badge className={styles.STHeaderBadge} variant="success">
                    Success
                  </Badge>
                </div>
              </CardHeader>
              <CardBody className={styles.STBody}>
                <div className={styles.STBodyFlex}>
                  <span>Date</span>
                  <span> 2 June, 2019</span>
                </div>
                <div className={styles.STBodyFlex}>
                  <span>Amount</span>
                  <span> ₦100,000</span>
                </div>
                <div className={styles.STBodyFlex}>
                  <span> Reference ID</span>
                  <span>
                    AAP-DSTV-A2022-1a56c83e-a11a-4612-b2b3-bb3c1b376ef6
                  </span>
                </div>
              </CardBody>
              <CardFooter className={styles.STBodyButton}>
                <Button variant="flat" type="button" icon={<Eye />}>
                  {' '}
                  View
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </Content>
    </Fragment>
  )
}
export default Transaction
