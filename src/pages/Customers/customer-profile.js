import React, { Fragment, useState, useContext, useReducer } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import { Dialog, SideSheet } from 'evergreen-ui'
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Badge,
  CardFooter
} from '@kudi-inc/dip'
import { SettingsLink, ChevronLeft, Close, Reassign, Eye } from 'assets/svg'
import { Header, Content } from 'components/Layout'
import styles from './customer-profile.module.scss'
import AgentImg from 'assets/svg/profile-pic.svg'
import { getCustomer, getPlans } from 'services/customers'
import { ProfileLoading } from 'components/loading'
import { formatCurrency, fecthImage } from 'utils/function'
import AuthContext from 'context/AuthContext'
import { useRouteMatch } from 'react-router-dom'
import EditCustomer from './edit-customer'
import UserPlans from './userPlans'
import CustomerInformation from './customer-information'
import { AgentReducer, DefaultAgent } from '../Agents/agent-reducer'

const CustomerProfile = ({ history, match: { params } }) => {
  let { url } = useRouteMatch()
  const [auth] = useContext(AuthContext)
  let [showEdit, setShowEdit] = useState(false)
  let [showInformation, setShowInformation] = useState(false)
  let [isShown, setIsShown] = useState(false)
  let walletBalance = 0
  const [agent, setAgent] = useReducer(AgentReducer, DefaultAgent)

  const { data, isLoading, error, refetch } = useQuery(
    ['SingleCustomer', { id: params.id }],
    getCustomer
  )
  const userPlans = useQuery(['Plans', { id: params.id }], getPlans)

  let customer = data?.data?.data ?? {}

  const { data: imageData } = useQuery(
    data && customer.pictureId && ['Image', { id: customer.pictureId }],
    fecthImage
  )
  walletBalance = userPlans?.data?.data?.data?.walletBalance
  return (
    <Fragment>
      <Header>
        <p>
          <ChevronLeft role="button" onClick={() => history.goBack()} />
          Customer Profile
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
                    <h3> CUSTOMER INFORMATION</h3>
{/* 
                    <Button
                      variant="flat"
                      icon={<Reassign />}
                    >
                      My Referrals
                    </Button> */}

                    <Button
                      variant="flat"
                      onClick={() => setShowEdit(true)}
                      icon={<SettingsLink />}
                    >
                      Edit Profile
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
                          {`${customer?.lastName ?? ''} ${customer?.firstName ??
                            ''}`}
                        </span>
                      </div>
                      <div className={styles.FirstBodyGridContent}>
                        <span>Phone number</span>
                        <span>{customer.phoneNumber}</span>
                      </div>
                      <div className={styles.FirstBodyGridContent}>
                        <span>Gender</span>
                        <span>{customer.gender}</span>
                      </div>
                      <div className={styles.FirstBodyGridContent}>
                        <span>Date Onboarded:</span>
                        <span>
                          {moment(customer.timeCreated).format('Do MMM, YYYY')}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardBody>
                {/* <CardFooter className={styles.FirstBodyFooterButton}>
                  <Button
                    variant="flat"
                    onClick={() => setShowInformation(true)}
                    type="button"
                    icon={<Eye />}
                  >
                    View All Information
                  </Button>
                </CardFooter> */}
              </Card>
              <Card>
                <CardHeader>
                  <div className={styles.FirstHeader}>
                    <h3> SAVINGS PLAN</h3>

                    {customer?.status && (
                      <Badge
                        className={styles.FirstHeaderBadge}
                        variant="success"
                      >
                        {customer.status}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardBody className={styles.FirstBody}>
                  <div className={styles.FirstBodyFlex}>
                    <span>Market</span>
                    <span>{customer.market.name} </span>
                  </div>

                  <div className={styles.FirstBodyFlex}>
                    <span> Total Saved </span>
                    <span>{formatCurrency(customer.totalSaved)}</span>
                  </div>
                  <div className={styles.FirstBodyFlex}>
                    <span> Total Withdrawn</span>
                    <span>{formatCurrency(customer.totalWithdrawn)}</span>
                  </div>
                  <div className={styles.FirstBodyFlex}>
                    <span> Wallet Balance</span>
                    <span>{formatCurrency(walletBalance)}</span>
                  </div>
                </CardBody>
              </Card>
            </div>
            {/* <div className={styles.Second}>
              <Card>
                <div className={styles.Wallet}>
                  <CardBody className={styles.WalletContent}>
                    <p>Wallet Balance</p>
                    <h2>{formatCurrency(walletBalance)}</h2>
                  </CardBody>
                </div>
              </Card> */}
            {/* <Card>
                <div className={styles.Withdrawal}>
                  <div className={styles.WithdrawalContent}>
                    <CardBody className={styles.WithdrawalContentBody}>
                      <p>Amount Seeded</p>
                      <h4>{formatCurrency(customer.amountSeeded)}</h4>
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
              </Card> */}

            {/* <Card>
                <CardHeader className={styles.FirstHeader}>
                  <h3>DSA</h3>
                  <Button variant="flat" icon={<SettingsLink />}>
                    View Profile
                  </Button>
                </CardHeader>
                <CardBody>
                  <div className={styles.FirstBodyFlex}>
                    <span>Full Name: </span>
                    <span>
                      {`${
                        customer?.agent
                          ?? ''
                      } ${
                       customer?.agent
                          ?? 'N/A'
                      }`}
                    </span>
                  </div>
                  <div className={styles.FirstBodyFlex}>
                    <span>Email: </span>
                    <span>
                      {customer?.agent
                        ? customer.agent.email
                        : 'N/A'}
                    </span>
                  </div>
                </CardBody>
              </Card>
            </div> */}
            {/* <div className={styles.Overview}>
              <div className={styles.OverviewRow}>
                <Card className={styles.OverviewRowCard}>
                  <CardHeader className={styles.OverviewRowCardHeader}>
                    <p>Wallet Balance</p>
                  </CardHeader>
                  <p className={styles.OverviewRowCardp2}>
                    {formatCurrency(walletBalance)}
                  </p>
                </Card>
                <Card className={styles.OverviewRowCard}>
                  <CardHeader className={styles.OverviewRowCardHeader}>
                    <p>Stash Balance</p>
                  </CardHeader>
                  <p className={styles.OverviewRowCardp2}>
                    {formatCurrency(25000)}
                  </p>
                  <p className={styles.OverviewRowCardFooterButton}>
                    <Button
                      variant="flat"
                      onClick={() => history.push(`${url}/stash`)}
                      type="button"
                      icon={<Eye />}
                    >
                      View Transaction History
                    </Button>
                  </p>
                </Card>
                <Card className={styles.OverviewRowCard}>
                  <CardHeader className={styles.OverviewRowCardHeader}>
                    <p>KTA Details</p>
                  </CardHeader>

                  <p className={styles.OverviewRowCardp2}>0123456789</p>
                  <p className={styles.OverviewRowCardp1}>Providus Bank</p>
                </Card>
              </div>
            </div> */}

            <div className={styles.Second}>
              <UserPlans
                plans={userPlans}
                history={history}
                phoneNumber={customer.phoneNumber}
              />
            </div>
            {customer?.previouslyChangedPhoneNumbers?.[0] && (
              <div className={styles.DivContent}>
                <Card>
                  <CardHeader>
                    <div className={styles.FirstHeader}>
                      <h3> Wallet Number History</h3>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className={styles.FirstBodyGridContent}>
                      <span>Previous Wallet Number</span>
                      <span>{customer.previouslyChangedPhoneNumbers}</span>
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}
          </div>
        )}

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
        <SideSheet
          onCloseComplete={() => setShowEdit(false)}
          isShown={showEdit}
          width={800}
        >
          <EditCustomer
            setShowEdit={setShowEdit}
            customer={customer}
            refetch={refetch}
            auth={auth}
            agent={agent}
            setAgent={setAgent}
          />
        </SideSheet>
        <SideSheet
          onCloseComplete={() => setShowInformation(false)}
          isShown={showInformation}
          width={600}
        >
          <CustomerInformation
            setShowEdit={setShowInformation}
            customer={customer}
          />
        </SideSheet>
      </Content>
    </Fragment>
  )
}
export default CustomerProfile
