import React, { Fragment, useState, useContext } from 'react'
import { useQuery } from 'react-query'
import { SideSheet, Dialog } from 'evergreen-ui'
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Badge,
  CardFooter
} from '@kudi-inc/dip'
import {
  SettingsLink,
  Bin,
  Eye,
  ChevronLeft,
  Close,
  Reassign
} from 'assets/svg'
import { Header, Content } from 'components/Layout'
import styles from './agent-profile.module.scss'
import AgentImg from 'assets/svg/profile-pic.svg'
import { getAgent, getUsers, getUsersOnboarded } from 'services/agents'
import { ProfileLoading } from 'components/loading'
import { formatCurrency, fecthImage } from 'utils/function'
import FundWallet from './fund-wallet'
import DebitWallet from './debit-wallet'
import UpdateStatus from './update-status'
import CustomersByMarkets from './customers-by-markets'
import CustomersOnboarded from './customers-by-onboarding'
import AuthContext from 'context/AuthContext'
import Collections from './recent-collections'
import WalletTopUp from './wallet-topUp'
import Cashout from './cashout'
import Transaction from './p2p'

const SingleAgent = ({ history, match: { params, url } }) => {
  const [current, setCurrent] = useState('default')
  const [auth] = useContext(AuthContext)
  const [fundAmount, setFundAmount] = useState(0)
  let [page, setPage] = useState(1)
  // let [show, setShow] = useState(false)
  let [showStatus, setShowStatus] = useState(false)
  let [isShown, setIsShown] = useState(false)
  let [showDialog, setShowDialog] = useState(false)
  let [showDebitWallet, setShowDebitWallet] = useState(false)
  let [deductAmount, setDeductionAmount] = useState(0)
  let limit = 50
  let isActive = true
  let [phoneNumber, setPhoneNumber] = useState('')
  let [mobile, setMobile] = useState('')
  const { data, isLoading, error, refetch } = useQuery(
    ['SingleAgent', { id: params.id }],
    getAgent
  )

  let agent = data?.data?.data ?? {}

  const { data: imageData } = useQuery(
    data && ['Image', { id: agent.imageId }],
    fecthImage
  )
  const users = useQuery(
    data && ['Customers', { id: agent.id, page, limit, phoneNumber }],
    getUsers
  )

  let customersLimit = agent.totalCustomers
  const { data: isActiveUsers } = useQuery(
    [
      'Customers',
      { id: agent.id, isActive, page, limit: customersLimit, phoneNumber }
    ],
    getUsers
  )

  let isActiveCount = isActiveUsers?.data?.data.list.length ?? '0'

  const { data: isInActiveUsers } = useQuery(
    data && [
      'Customers',
      {
        id: agent.id,
        isActive: !isActive,
        page,
        limit: customersLimit,
        phoneNumber
      }
    ],
    getUsers
  )

  let isInActiveCount = isInActiveUsers?.data?.data.list.length ?? '0'

  const usersOnboarded = useQuery(
    data && ['onboarded', { id: agent.id, page, limit, phoneNumber: mobile }],
    getUsersOnboarded
  )
  if (agent) {
    localStorage.setItem('agent', JSON.stringify(agent))
  }

  return (
    <div>
      {current === 'default' && (
        <Fragment>
          <Header>
            <p>
              <ChevronLeft role="button" onClick={() => history.goBack()} />
              Agent Profile
            </p>
            <Button type="button" icon={<Reassign />}>
              View New Referrals
            </Button>
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

                        <Button
                          variant="flat"
                          onClick={() => setShowStatus(true)}
                          icon={<Bin />}
                        >
                          {agent.status !== 'ACTIVE'
                            ? 'Update Status'
                            : 'Suspend Account'}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardBody className={styles.FirstBody}>
                      <div className={styles.FirstBodyGrid}>
                        <div className={styles.FirstBodyGridProfile}>
                          <img
                            className={styles.FirstBodyGridProfileImg}
                            src={imageData?.data?.medium || AgentImg}
                            alt="agent"
                          />
                        </div>
                        <div>
                          <div className={styles.FirstBodyGridContent}>
                            <span>Name</span>
                            <span>
                              {`${agent?.lastName ?? ''} ${agent?.firstName ??
                                ''}`}
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

                          {/* <div className={styles.FirstBodyGridContent}>
                        <span>Date Onboarded:</span>
                        <span>
                          {moment(agent.timeCreated).format('Do MMM, YYYY')}
                        </span>
                      </div> */}
                          <div className={styles.FirstBodyGridContent}>
                            <span>Assigned Market: </span>
                            <span>{agent?.assignedMarket?.name ?? 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  <div className={styles.Container}>
                    <CardHeader>
                      <div className={styles.FirstHeader}>
                        <h3> CUSTOMERS</h3>

                        <Badge
                          className={styles.FirstHeaderBadge}
                          variant={
                            agent.status === 'ACTIVE' ? 'success' : 'danger'
                          }
                        >
                          {agent.status}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardBody className={styles.FirstBody}>
                      <div className={styles.FirstBodyFlex}>
                        <span>Active Customers: </span>
                        <span>{isActiveCount}</span>
                      </div>
                      <div className={styles.FirstBodyFlex}>
                        <span> Inactive Customers </span>
                        <span>{isInActiveCount}</span>
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
                        onClick={() => setCurrent('Markets')}
                      >
                        View by Markets
                      </Button>
                      <Button
                        variant="flat"
                        type="button"
                        icon={<Eye />}
                        onClick={() => setCurrent('Onboarded')}
                      >
                        View Onboarded
                      </Button>
                    </CardFooter>
                  </div>
                </div>
                <div className={styles.Second}>
                  <Card className={styles.Card}>
                    <div className={styles.WalletHeader}>
                      <h3>Wallet Balance</h3>
                    </div>
                    <div className={styles.Wallet}>
                      <CardBody className={styles.WalletContent}>
                        <h2>
                          {Number(fundAmount) > 0
                            ? formatCurrency(Number(fundAmount))
                            : formatCurrency(agent.cashBalance)}
                        </h2>
                      </CardBody>
                    </div>
                    {/* <div className={styles.WalletFooter}> */}
                      <CardFooter className={styles.FirstBodyButton1}>
                        <Button
                          variant="flat"
                          onClick={() =>
                            history.push({
                              pathname: `${url}/wallet-history`,
                              state: agent.id
                            })
                          }
                          type="button"
                          icon={<Eye />}
                        >
                          View History
                        </Button>
                        {/* <div className={styles.WalletFooterDebit}>
                          <Button
                            variant="flat"
                            icon={<Reassign />}
                            onClick={() => setShowDebitWallet(true)}
                          >
                            Debit Wallet
                          </Button>
                        </div> */}
                      </CardFooter>
                    {/* </div> */}
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
                  {auth && auth.type.includes('ADMIN') && (
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
                          <Button
                            onClick={() => setShowDialog(true)}
                            type="button"
                          >
                            FUND WALLET
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
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

            <SideSheet
              onCloseComplete={() => setShowDebitWallet(false)}
              isShown={showDebitWallet}
            >
              <DebitWallet
                setShowDebitWallet={setShowDebitWallet}
                zonalHead={agent}
                refetch={refetch}
                setDeductionAmount={setDeductionAmount}
              />
            </SideSheet>

            <SideSheet
              onCloseComplete={() => setShowStatus(false)}
              isShown={showStatus}
            >
              <UpdateStatus
                setShowStatus={setShowStatus}
                agent={agent}
                refetch={refetch}
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
          <div className={styles.DivContent}>
            <Collections minimized />
          </div>
          <div className={styles.DivContent}>
            <Transaction minimized id={agent.id} />
          </div>
          <div className={styles.DivContent}>
            <WalletTopUp minimized id={agent.id} />
          </div>
          <div className={styles.DivContent}>
            <Cashout minimized />
          </div>
        </Fragment>
      )}
      {current === 'Markets' && (
        <CustomersByMarkets
          history={history}
          users={users}
          limit={limit}
          page={page}
          setPage={setPage}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          agent={agent}
          setCurrent={setCurrent}
        />
      )}
      {current === 'Onboarded' && (
        <CustomersOnboarded
          history={history}
          usersOnboarded={usersOnboarded}
          limit={limit}
          page={page}
          setPage={setPage}
          phoneNumber={mobile}
          setPhoneNumber={setMobile}
          agent={agent}
          setCurrent={setCurrent}
        />
      )}
    </div>
  )
}
export default SingleAgent
