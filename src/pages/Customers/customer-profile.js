import React, { Fragment, useState, useContext } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import { Dialog } from 'evergreen-ui'
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Badge,
  CardFooter
} from '@kudi-inc/dip'
import { SettingsLink, Reassign, Eye, ChevronLeft, Close } from 'assets/svg'
import { Header, Content } from 'components/Layout'
import styles from './customer-profile.module.scss'
import AgentImg from 'assets/svg/profile-pic.svg'
import Customers from './customers'
import { getCustomer, getUsers } from 'services/customers'
import { ProfileLoading } from 'components/loading'
import { formatCurrency, fecthImage } from 'utils/function'
import AuthContext from 'context/AuthContext'

const CustomerProfile = ({ history, match: { params, url } }) => {
  const [auth] = useContext(AuthContext)
  let [page, setPage] = useState(1)
  let [show, setShow] = useState(false)
  let [isShown, setIsShown] = useState(false)
  let [showDialog, setShowDialog] = useState(false)
  let limit = 50
  const { data, isLoading, error, refetch } = useQuery(
    ['SingleCustomer', { id: params.id }],
    getCustomer
  )
  let customer = data && data.data ? data.data.data : {}

  const { data: imageData } = useQuery(
    data && ['Image', { id: customer.pictureId }],
    fecthImage
  )

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
                    <h3> AGENT INFORMATION</h3>

                    <Button
                      variant="flat"
                      onClick={() => history.push(`${url}/edit`)}
                      icon={<SettingsLink />}
                    >
                      Edit Profile
                    </Button>
                    <Button variant="flat" icon={<Reassign />}>
                      Reassign
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
                          {`${
                            customer && customer.lastName
                              ? customer.lastName
                              : ''
                          } ${
                            customer && customer.firstName
                              ? customer.firstName
                              : ''
                          }`}
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
              </Card>
              <Card>
                <CardHeader>
                  <div className={styles.FirstHeader}>
                    <h3> SAVINGS PLAN</h3>

                    <Badge
                      className={styles.FirstHeaderBadge}
                      variant="success"
                    >
                      {customer.status}
                    </Badge>
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
                </CardBody>
                <CardFooter className={styles.FirstBodyButton}>
                  <Button
                    variant="flat"
                    type="button"
                    icon={<Eye />}
                    onClick={() => setShow(!show)}
                  >
                    {show ? 'Hide ' : 'View '} History
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className={styles.Second}>
              <Card>
                <div className={styles.Wallet}>
                  <CardBody className={styles.WalletContent}>
                    <p>Wallet Balance</p>
                    <h2>{formatCurrency(customer.cashBalance)}</h2>
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
              </Card>
              {auth && auth.type === 'ADMIN' && (
                <Card>
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
                        {`${customer && customer.agent ?customer.agent.lastName:""} ${customer && customer.agent?customer.agent.firstName: "N/A"}`}
                      </span>
                    </div>
                    <div className={styles.FirstBodyFlex}>
                      <span>Email: </span>
                      <span>{customer && customer.agent?customer.agent.email:"N/A"}</span>
                    </div>
                  </CardBody>
                </Card>
              )} 
              
            </div>
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
      </Content>
    </Fragment>
  )
}
export default CustomerProfile
