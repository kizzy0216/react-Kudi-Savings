 import React, { Fragment, useState } from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    Button,
    Badge,
    CardFooter
} from '@kudi-inc/dip'
import { SettingsLink, Bin, Eye, ChevronLeft, UpIcon } from 'assets/svg'
import { Header, Content } from 'components/Layout'
import { ProgressBar } from 'components/Common'
import styles from './agent-profile.module.scss'
import AgentImg from 'assets/images/agent.png'
import Customers from './customers'
const ViewCashout = ({ history }) => {
    let [show, setShow] = useState(false)
    return (
        <Fragment>
            <Header>
                <p>
                    <ChevronLeft
                        role="button"
                        onClick={() => history.goBack()}
                    />
                    Agent Profile
                </p>
            </Header>
            <Content className={styles.content}>
                <div className={styles.contentCard}>
                    <div className={styles.First}>
                        <Card>
                            <CardHeader>
                                <div className={styles.FirstHeader}>
                                    <h3> AGENT INFORMATION</h3>

                                    <Button
                                        variant="flat"
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
                                    <div
                                        className={styles.FirstBodyGridProfile}
                                    >
                                        <img
                                            className={
                                                styles.FirstBodyGridProfileImg
                                            }
                                            src={AgentImg}
                                            alt="agent"
                                        />
                                    </div>
                                    <div>
                                        <div
                                            className={
                                                styles.FirstBodyGridContent
                                            }
                                        >
                                            <span>Name</span>
                                            <span> Firstname Lastname</span>
                                        </div>
                                        <div
                                            className={
                                                styles.FirstBodyGridContent
                                            }
                                        >
                                            <span>Phone number</span>
                                            <span> 08062361452</span>
                                        </div>
                                        <div
                                            className={
                                                styles.FirstBodyGridContent
                                            }
                                        >
                                            <span>Gender</span>
                                            <span>Male</span>
                                        </div>

                                        <div
                                            className={
                                                styles.FirstBodyGridContent
                                            }
                                        >
                                            <span>Address</span>
                                            <span>Streetname, lga, state</span>
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
                                        Success
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardBody className={styles.FirstBody}>
                                <div className={styles.FirstBodyFlex}>
                                    <span>Date Onboarded:</span>
                                    <span> 2 June, 2019</span>
                                </div>
                                <div className={styles.FirstBodyFlex}>
                                    <span>Active Customers: </span>
                                    <span> 130</span>
                                </div>
                                <div className={styles.FirstBodyFlex}>
                                    <span> Inactive Customers </span>
                                    <span>56</span>
                                </div>
                                <div className={styles.FirstBodyFlex}>
                                    <span> Total Customers </span>
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
                                    <h2>N1,825,000</h2>
                                    <Button
                                        variant="flat"
                                        type="button"
                                        icon={<Eye />}
                                    >
                                        View History
                                    </Button>
                                </CardBody>
                                <div className={styles.Progress}>
                                    <CardBody
                                        className={styles.ProgressCardBody}
                                    >
                                        <p>Badge</p>
                                        <Badge variant="success">
                                            {' '}
                                            <UpIcon />
                                            <small> 8.5% </small>
                                        </Badge>
                                    </CardBody>
                                    <CardBody
                                        className={styles.ProgressCardBody}
                                    >
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
                                    <CardBody
                                        className={styles.WithdrawalContentBody}
                                    >
                                        <p>cash Collected</p>
                                        <h4>N1,825,000</h4>
                                    </CardBody>
                                    <CardBody>
                                        <p>cash Withdrawn</p>
                                        <h4>N1,825,000</h4>
                                    </CardBody>
                                </div>

                                <CardBody className={styles.ProgressCardBody}>
                                    <Button type="button">Reconcile</Button>
                                </CardBody>
                            </div>
                        </Card>
                    </div>
                    <div className={styles.Third}>{show && <Customers />}</div>
                </div>
            </Content>
        </Fragment>
    )
}
export default ViewCashout
