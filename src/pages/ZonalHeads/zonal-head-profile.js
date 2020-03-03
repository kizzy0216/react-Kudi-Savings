import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { SideSheet } from 'evergreen-ui'
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Badge,
  CardFooter,

} from '@kudi-inc/dip'
import { SettingsLink, Bin, Eye, ChevronLeft, UpIcon } from 'assets/svg'
import { Header, Content } from 'components/Layout'
import { ProgressBar } from 'components/Common'
import { ProfileLoading } from 'components/loading'
import styles from './profile.module.scss'
import AgentImg from 'assets/images/agent.png'
import { getManager } from 'services/zonal-heads'
import { formatCurrency } from 'utils/function'
import FundWallet from './fund-wallet.js'

const ViewCashout = ({ history, match: { params } }) => {
  let [show, setShow] = useState(false)
  let [marketShow, setMarketShow] = useState(false)
  let [showDialog, setShowDialog] = useState(false)
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

                    <Button variant="flat" icon={<SettingsLink />}>
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
                    <span> {zonalHead.timeCreated}</span>
                  </div>
                  <div className={styles.FirstBodyFlex}>
                    <span>Active Agents: </span>
                    <span> 130</span>
                  </div>
                  <div className={styles.FirstBodyFlex}>
                    <span> Inactive Agents </span>
                    <span>56</span>
                  </div>
                  <div className={styles.FirstBodyFlex}>
                    <span> Total Agents </span>
                    <span>56</span>
                  </div>
                </CardBody>
                <CardFooter className={styles.FirstBodyButton}>
                  <Button
                    variant="flat"
                    type="button"
                    icon={<Eye />}
                    onClick={() => setShow(!show)}
                  >
                    {show ? 'Hide ' : 'View '}Agents
                  </Button>

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
                    <h2> {formatCurrency(zonalHead.walletBalance)}</h2>
                    <Button variant="flat" type="button" icon={<Eye />}>
                      View History
                    </Button>
                  </CardBody>
                  <div className={styles.Progress}>
                    <CardBody className={styles.ProgressCardBody}>
                      <p>Badge</p>
                      <Badge variant="success">
                        <UpIcon />
                        <small> 8.5% </small>
                      </Badge>
                    </CardBody>
                    <CardBody className={styles.ProgressCardBody}>
                      <p>Progress</p>
                      <ProgressBar
                        className={styles.progress}
                        percentage={70}
                      />
                    </CardBody>
                  </div>
                </div>
              </Card>
              <Card>
                <div className={styles.Withdrawal}>
                  <div className={styles.WithdrawalContent}>
                    <CardBody className={styles.WithdrawalContentBody}>
                      <p>cash Collected</p>
                      <h4>N1,825,000</h4>
                    </CardBody>
                    <CardBody>
                      <p>cash Withdrawn</p>
                      <h4>N1,825,000</h4>
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
          </div>
        )}
        {/* onCloseComplete={() => setState({ isShown: false, isLoading: false })}
        isConfirmLoading={state.isLoading}
        onConfirm={() => setState({ isLoading: true })}
        confirmLabel={state.isLoading ? 'Loading...' : 'Confirm Loading'} */}
        <SideSheet
          onCloseComplete={() => setShowDialog(false)}
          isShown={showDialog}
        >
          <FundWallet setShowDialog={setShowDialog} zonalHead={zonalHead} />
        </SideSheet>
      </Content>
    </Fragment>
  )
}
export default ViewCashout
