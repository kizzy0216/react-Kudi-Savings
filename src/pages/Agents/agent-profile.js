import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import { SideSheet } from 'evergreen-ui'
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Badge,
  CardFooter
} from '@kudi-inc/dip'
import { SettingsLink, Bin, Eye, ChevronLeft } from 'assets/svg'
import { Header, Content } from 'components/Layout'
import styles from './agent-profile.module.scss'
import AgentImg from 'assets/svg/profile-pic.svg'
import Customers from './customers'
import { getAgent, getUsers } from 'services/agents'
import { ProfileLoading } from 'components/loading'
import { formatCurrency, fecthImage } from 'utils/function'
import EditAgent from './edit-agent'

const ViewCashout = ({ history, match: { params, url } }) => {
  let [show, setShow] = useState(false)
  let [showEdit, setShowEdit] = useState(false)
  const { data, isLoading, error, refetch } = useQuery(
    ['SingleAgent', { id: params.id }],
    getAgent
  )
  let agent = data && data.data ? data.data.data : {}
  const { data: imageData, isLoading: imageLoading } = useQuery(
    data && ['Image', { id: agent.imageId }],
    fecthImage
  )
  let identity = useQuery(
    data && ['Image', { id: agent.identificationImageId }],
    fecthImage
  )
  const users = useQuery(data && ['Image', { id: agent.id }], getUsers)

  return (
    <Fragment>
      <Header>
        <p>
          <ChevronLeft role="button" onClick={() => history.goBack()} />
          Agent Profile
        </p>
      </Header>
      <Content className={styles.content}>
        {isLoading && <ProfileLoading />}
        {error && (
          <span>
            Error!
            <button onClick={() => refetch({ disableThrow: true })}>
              Retry
            </button>
          </span>
        )}
        {data && data.data && (
          <div className={styles.contentCard}>
            <div className={styles.First}>
              <Card>
                <CardHeader>
                  <div className={styles.FirstHeader}>
                    <h3> AGENT INFORMATION</h3>

                    <Button
                      variant="flat"
                      onClick={() => history.push(`/${url}/edit`)}
                      icon={<SettingsLink />}
                    >
                      Edit Profile
                    </Button>
                    <Button variant="flat" icon={<Bin />}>
                      Suspend Agent
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className={styles.FirstBody}>
                  <div className={styles.FirstBodyGrid}>
                    <div className={styles.FirstBodyGridProfile}>
                      <img
                        className={styles.FirstBodyGridProfileImg}
                        src={imageData ? imageData.data.medium : AgentImg}
                        alt="agent"
                      />
                    </div>
                    <div>
                      <div className={styles.FirstBodyGridContent}>
                        <span>Name</span>
                        <span> {`${agent.lastName} ${agent.firstName}`}</span>
                      </div>
                      <div className={styles.FirstBodyGridContent}>
                        <span>Phone number</span>
                        <span>{agent.phoneNumber}</span>
                      </div>
                      <div className={styles.FirstBodyGridContent}>
                        <span>Gender</span>
                        <span>{agent.gender}</span>
                      </div>

                      <div className={styles.FirstBodyGridContent}>
                        <span>Address</span>
                        <span>{agent.address}</span>
                      </div>
                      <div className={styles.FirstBodyGridContent}>
                        <span>Assigned Market: </span>
                        <span> {agent.assignedMarket.name}</span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <div className={styles.FirstHeader}>
                    <h3> SIGNUP INFORMATION</h3>

                    <Badge
                      className={styles.FirstHeaderBadge}
                      variant="success"
                    >
                      {agent.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardBody className={styles.FirstBody}>
                  <div className={styles.FirstBodyFlex}>
                    <span>Date Onboarded:</span>
                    <span>
                      {moment(agent.timeCreated).format('Do MMM, YYYY')}
                    </span>
                  </div>
                  <div className={styles.FirstBodyFlex}>
                    <span>Active Customers: </span>
                    <span> N/A</span>
                  </div>
                  <div className={styles.FirstBodyFlex}>
                    <span> Inactive Customers </span>
                    <span>N/A</span>
                  </div>
                  <div className={styles.FirstBodyFlex}>
                    <span> Total Customers </span>
                    <span>{agent.totalCustomers}</span>
                  </div>
                </CardBody>
                <CardFooter className={styles.FirstBodyButton}>
                  <Button
                    variant="flat"
                    type="button"
                    icon={<Eye />}
                    onClick={() => setShow(!show)}
                  >
                    {show ? 'Hide ' : 'View '}Customers
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className={styles.Second}>
              <Card>
                <div className={styles.Wallet}>
                  <CardBody className={styles.WalletContent}>
                    <p>Wallet Balance</p>
                    <h2>{formatCurrency(agent.cashBalance)}</h2>
                    <Button variant="flat" type="button" icon={<Eye />}>
                      View History
                    </Button>
                  </CardBody>
                </div>
              </Card>
              <Card>
                <div className={styles.Withdrawal}>
                  <div className={styles.WithdrawalContent}>
                    <CardBody className={styles.WithdrawalContentBody}>
                      <p>Amount Seeded</p>
                      <h4>{formatCurrency(agent.amountSeeded)}</h4>
                    </CardBody>
                    <CardBody>
                      <p>cash Withdrawn</p>
                      <h4>N/A</h4>
                    </CardBody>
                  </div>

                  <CardBody className={styles.ProgressCardBody}>
                    <Button type="button">Reconcile</Button>
                  </CardBody>
                </div>
              </Card>
              <Card>
                <CardHeader className={styles.FirstHeader}>
                  <h3>Zonal Head</h3>
                  <Button variant="flat" icon={<SettingsLink />}>
                    View Profile
                  </Button>
                </CardHeader>
                <CardBody>
                  <div className={styles.FirstBodyFlex}>
                    <span>Full Name: </span>
                    <span>
                      {`${agent.manager.lastName} ${agent.manager.firstName}`}
                    </span>
                  </div>
                  <div className={styles.FirstBodyFlex}>
                    <span>Email: </span>
                    <span>{agent.manager.email}</span>
                  </div>
                </CardBody>
              </Card>
            </div>
            <div className={styles.Third}>
              {show && <Customers users={users} />}
            </div>
          </div>
        )}
        {/* <SideSheet
          onCloseComplete={() => setShowEdit(false)}
          isShown={showEdit}
          width={1200}
        >
          <EditAgent
            avatar={imageData ? imageData.data.medium : null}
            idCard={identity && identity.data? identity.data.data.medium: null}
            setShowEdit={setShowEdit}
            agent={agent}
          />
        </SideSheet> */}
      </Content>
    </Fragment>
  )
}
export default ViewCashout
