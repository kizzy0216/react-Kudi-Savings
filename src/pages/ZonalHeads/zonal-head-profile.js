import React, { Fragment, useState, useContext } from 'react'
import moment from 'moment'
import { useQuery } from 'react-query'
import { SideSheet } from 'evergreen-ui'
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Badge,
  CardFooter,
  Table
} from '@kudi-inc/dip'
import { SettingsLink, Bin, Eye, ChevronLeft } from 'assets/svg'
import { Header, Content } from 'components/Layout'
import { ProfileLoading } from 'components/loading'
import styles from './profile.module.scss'
import AgentImg from 'assets/svg/profile-pic.svg'
import AuthContext from 'context/AuthContext'
import { getManager } from 'services/zonal-heads'
import { formatCurrency } from 'utils/function'
import FundWallet from './fund-wallet'
import EditZH from './edit-zonal'
import UpdateStatus from './update-status'

const ViewCashout = ({ history, match: { params, url } }) => {
  const [auth] = useContext(AuthContext)
  let [show, setShow] = useState(false)
  const [fundAmount, setFundAmount] = useState(0)
  let [marketShow, setMarketShow] = useState(true)
  let [showStatus, setShowStatus] = useState(false)
  let [showDialog, setShowDialog] = useState(false)
  let [showEdit, setShowEdit] = useState(false)
  const { data, isLoading, error, refetch } = useQuery(
    ['SingleManager', { id: params.id }],
    getManager
  )

  let zonalHead = data && data.data ? data.data.data : {}
  return (
    <Fragment>
      <Header>
        <p>
          <ChevronLeft role="button" onClick={() => history.goBack()} />
          Zonal Head Profile
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
                    <h3> ZONAL HEAD INFORMATION</h3>

                    <Button
                      variant="flat"
                      onClick={() => setShowEdit(true)}
                      icon={<SettingsLink />}
                    >
                      Edit Profile
                    </Button>
                    {auth && auth.type === 'ADMIN' && (
                      <Button
                        variant="flat"
                        onClick={() => setShowStatus(true)}
                        icon={<Bin />}
                      >
                        Update Status
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardBody className={styles.FirstBody}>
                  <div className={styles.FirstBodyGrid}>
                    <div className={styles.FirstBodyGridProfile}>
                      <img
                        className={styles.FirstBodyGridProfileImg}
                        src={AgentImg}
                        alt="agent"
                      />
                    </div>
                    <div>
                      <div className={styles.FirstBodyGridContent}>
                        <span>Name</span>
                        <span>
                          {`${zonalHead.lastName} ${zonalHead.firstName}`}
                        </span>
                      </div>
                      <div className={styles.FirstBodyGridContent}>
                        <span>Phone number</span>
                        <span>{zonalHead.phoneNumber}</span>
                      </div>
                      <div className={styles.FirstBodyGridContent}>
                        <span>Gender</span>
                        <span> {zonalHead.gender}</span>
                      </div>

                      <div className={styles.FirstBodyGridContent}>
                        <span>Email</span>
                        <span>{zonalHead.email}</span>
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
                      {zonalHead.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardBody className={styles.FirstBody}>
                  <div className={styles.FirstBodyFlex}>
                    <span>Date Onboarded:</span>
                    <span>
                      {moment(zonalHead.timeCreated).format('Do MMM, YYYY')}
                    </span>
                  </div>
                  <div className={styles.FirstBodyFlex}>
                    <span>Active Agents: </span>
                    <span> N/A</span>
                  </div>
                  <div className={styles.FirstBodyFlex}>
                    <span> Inactive Agents </span>
                    <span>N/A</span>
                  </div>
                  <div className={styles.FirstBodyFlex}>
                    <span> Total Agents </span>
                    <span>N/A</span>
                  </div>
                </CardBody>
                <CardFooter className={styles.FirstBodyButton}>
                  {/* <Button
                    variant="flat"
                    type="button"
                    icon={<Eye />}
                    onClick={() => setShow(!show)}
                  >
                    {show ? 'Hide ' : 'View '}Agents
                  </Button> */}

                  <Button
                    variant="flat"
                    type="button"
                    icon={<Eye />}
                    onClick={() => setMarketShow(!marketShow)}
                  >
                    {marketShow ? 'Hide ' : 'View '}Markets
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className={styles.Second}>
              <Card>
                <div className={styles.Wallet}>
                  <CardBody className={styles.WalletContent}>
                    <p>Wallet Balance</p>
                    <h2>
                      {formatCurrency(
                        zonalHead.walletBalance + Number(fundAmount)
                      )}
                    </h2>
                    <Button
                      variant="flat"
                      onClick={() => history.push(`${url}/wallet-history`)}
                      type="button"
                      icon={<Eye />}
                    >
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
                      <h4>{formatCurrency(zonalHead.amountSeeded)}</h4>
                    </CardBody>
                    <CardBody>
                      <p>Cash Withdrawn</p>
                      <h4>N/A</h4>
                    </CardBody>
                  </div>

                  <CardBody className={styles.ProgressCardBody}>
                    <Button onClick={() => setShowDialog(true)} type="button">
                      Fund wallet
                    </Button>
                  </CardBody>
                </div>
              </Card>
            </div>
            <div>
              {marketShow && (
                <Table
                  className={styles.AgentTable}
                  column={[
                    {
                      key: 'name',
                      render: 'Market Name'
                    },
                    {
                      key: 'timeCreated',
                      render: 'Time Created'
                    },
                    { key: 'city', render: 'City' },

                    { key: 'state', render: 'State' },
                    {
                      key: 'lga',
                      render: 'LGA'
                    }
                  ]}
                  data={zonalHead.markets}
                />
              )}
              {show && (
                <Table
                  className={styles.AgentTable}
                  column={[
                    {
                      key: 'firstName',
                      render: 'First Name'
                    },
                    {
                      key: 'lastName',
                      render: 'Last Name'
                    },

                    {
                      key: 'phoneNumber',
                      render: 'Phone Number'
                    },
                    {
                      key: 'timeCreated',
                      render: 'Time Created'
                    },
                    { key: 'state', render: 'State' },
                    {
                      key: 'lga',
                      render: 'LGA'
                    }
                  ]}
                  data={[]}
                />
              )}
            </div>
          </div>
        )}
        <SideSheet
          onCloseComplete={() => setShowStatus(false)}
          isShown={showStatus}
        >
          <UpdateStatus
            setShowStatus={setShowStatus}
            zonalhead={zonalHead}
            refetch={refetch}
          />
        </SideSheet>
        <SideSheet
          onCloseComplete={() => setShowDialog(false)}
          isShown={showEdit}
        >
          <EditZH
            setShowEdit={setShowEdit}
            zonalHead={zonalHead}
            refetch={refetch}
          />
        </SideSheet>
        <SideSheet
          onCloseComplete={() => setShowDialog(false)}
          isShown={showDialog}
        >
          <FundWallet
            setShowDialog={setShowDialog}
            zonalHead={zonalHead}
            refetch={refetch}
            setFundAmount={setFundAmount}
          />
        </SideSheet>
      </Content>
    </Fragment>
  )
}
export default ViewCashout
