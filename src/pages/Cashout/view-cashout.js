import React, { Fragment } from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    Button,
    Badge,
    CardFooter
} from '@kudi-inc/dip'
import { SettingsLink, Bin, Close, ChevronLeft } from 'assets/svg'
import { Header, Content } from 'components/Layout'
import styles from './view-cashout.module.scss'
import AgentImg from 'assets/images/agent.png'
const ViewCashout = ({ history }) => {
    return (
        <Fragment>
            <Header>
                <p>
                    <ChevronLeft onClick={() => history.goBack()} /> Cashout
                    Request{' '}
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
                                    <h3> Cashout</h3>

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
                                    <span>Date</span>
                                    <span> 2 June, 2019</span>
                                </div>
                                <div className={styles.FirstBodyFlex}>
                                    <span>Amount</span>
                                    <span> ₦100,000</span>
                                </div>
                                <div className={styles.FirstBodyFlex}>
                                    <span> Wallet Balance</span>
                                    <span>₦180,000</span>
                                </div>
                            </CardBody>
                            <CardFooter className={styles.FirstFooter}>
                                <Button type="button">Approve</Button>
                                <Button type="button" icon={<Close />}>
                                    Decline
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </Content>
        </Fragment>
    )
}
export default ViewCashout
