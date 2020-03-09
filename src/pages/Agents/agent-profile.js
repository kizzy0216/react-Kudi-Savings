import React, { Fragment, useState, useContext } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import { SideSheet, Dialog } from 'evergreen-ui'
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Badge,
  CardFooter
} from '@kudi-inc/dip'
import { SettingsLink, Bin, Eye, ChevronLeft, Close } from 'assets/svg'
import { Header, Content } from 'components/Layout'
import styles from './agent-profile.module.scss'
import AgentImg from 'assets/svg/profile-pic.svg'
import Customers from './customers'
import { getAgent, getUsers } from 'services/agents'
import { ProfileLoading } from 'components/loading'
import { formatCurrency, fecthImage } from 'utils/function'
import FundWallet from './fund-wallet'
import AuthContext from 'context/AuthContext'

const SingleAgent = ({ history, match: { params, url } }) => {
  const [auth] = useContext(AuthContext)
  const [fundAmount, setFundAmount] = useState(0)
  let [page, setPage] = useState(1)
  let [show, setShow] = useState(false)
  let [isShown, setIsShown] = useState(false)
  let [showDialog, setShowDialog] = useState(false)
  let limit = 50
  let [phoneNumber, setPhoneNumber] = useState('')
  const { data, isLoading, error, refetch } = useQuery(
    ['SingleAgent', { id: params.id }],
    getAgent
  )
  let agent = data && data.data ? data.data.data : {}

  const { data: imageData } = useQuery(
    data && ['Image', { id: agent.imageId }],
    fecthImage
  )

  const users = useQuery(
    data && ['Customers', { id: agent.id, page, limit, phoneNumber }],
    getUsers
  )

  if (agent) {
    localStorage.setItem('agent', JSON.stringify(agent))
  }

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
                      onClick={() => history.push(`${url}/edit`)}
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
                        <span>
                          {' '}
                          {`${agent && agent.lastName ? agent.lastName : ''} ${
                            agent && agent.firstName ? agent.firstName : ''
                          }`}
                        </span>
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
                        <span>
                          {' '}
                          {agent && agent.assignedMarket
                            ? agent.assignedMarket.name
                            : 'N/A'}
                        </span>
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
                    <h2>{formatCurrency(agent.cashBalance + fundAmount)}</h2>
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
                    <Button onClick={() => setIsShown(true)} type="button">
                      RECONCILE
                    </Button>
                  </CardBody>
                </div>
              </Card>
              {auth && auth.type === 'ADMIN' && (
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
                        {`${agent &&
                          agent.manager &&
                          agent.manager.lastName} ${agent &&
                          agent.manager &&
                          agent.manager.firstName}`}
                      </span>
                    </div>
                    <div className={styles.FirstBodyFlex}>
                      <span>Email: </span>
                      <span>
                        {agent && agent.manager && agent.manager.email}
                      </span>
                    </div>
                  </CardBody>
                </Card>
              )}
              {auth && auth.type === 'ZONAL' && (
                <Card>
                  <CardHeader className={styles.FundHeader}>
                    <h3>TOP UP WALLET</h3>
                  </CardHeader>
                  <CardBody className={styles.FundBody}>
                    <div>
                      <Button onClick={() => setShowDialog(true)} type="button">
                        FUND WALLET
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              )}
            </div>
            <div className={styles.Third}>
              {show && (
                <Customers
                  users={users}
                  limit={limit}
                  page={page}
                  setPage={setPage}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                />
              )}
            </div>
          </div>
        )}
        <SideSheet
          onCloseComplete={() => setShowDialog(false)}
          isShown={showDialog}
        >
          <FundWallet
            setShowDialog={setShowDialog}
            zonalHead={agent}
            refetch={refetch}
            setFundAmount={setFundAmount}
          />
        </SideSheet>
        {isShown && (
          <Dialog
            isShown={isShown}
            title="RECONCILE"
            hasFooter={false}
            confirmLabel="C"
            className={styles.Dialog}
          >
            <Card>
              <CardBody className={styles.DialogBody}>
                <p>Coming soon</p>
              </CardBody>
              <CardFooter className={styles.DialogFooter}>
                <Button
                  variant="flat"
                  icon={<Close />}
                  onClick={() => setIsShown(false)}
                >
                  Close
                </Button>
              </CardFooter>
            </Card>
          </Dialog>
        )}
      </Content>
    </Fragment>
  )
}
export default SingleAgent
