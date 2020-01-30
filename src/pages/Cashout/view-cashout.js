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
import styles from './view-cashout.module.scss'
import AgentImg from 'assets/images/agent.png'
const ViewCashout = () => {
    return (
        <Fragment>
            <Header>
                <p> Cashout Request </p>
            </Header>
            <Content className={styles.content}>
                <div className={styles.contentCard}>
                    <div className={styles.VC}>
                        <Card>
                            <CardHeader>
                                <div className={styles.VCHeader}>
                                    <h3> ZA INFORMATION</h3>

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
                            <CardBody className={styles.VCBody}>
                                <div className={styles.VCBodyGrid}>
                                    <div className={styles.VCBodyGridProfile}>
                                        <img
                                            className={
                                                styles.VCBodyGridProfileImg
                                            }
                                            src={AgentImg}
                                            alt="agent"
                                        />
                                    </div>
                                    <div>
                                        <div
                                            className={styles.VCBodyGridContent}
                                        >
                                            <span>Name</span>
                                            <span> Firstname Lastname</span>
                                        </div>
                                        <div
                                            className={styles.VCBodyGridContent}
                                        >
                                            <span>Phone number</span>
                                            <span> 08062361452</span>
                                        </div>
                                        <div
                                            className={styles.VCBodyGridContent}
                                        >
                                            <span>Gender</span>
                                            <span>Male</span>
                                        </div>

                                        <div
                                            className={styles.VCBodyGridContent}
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
                                <div className={styles.VCHeader}>
                                    <h3> Cashout</h3>

                                    <Badge
                                        className={styles.VCHeaderBadge}
                                        variant="success"
                                    >
                                        Success
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardBody className={styles.VCBody}>
                                <div className={styles.VCBodyFlex}>
                                    <span>Date</span>
                                    <span> 2 June, 2019</span>
                                </div>
                                <div className={styles.VCBodyFlex}>
                                    <span>Amount</span>
                                    <span> ₦100,000</span>
                                </div>
                                <div className={styles.VCBodyFlex}>
                                    <span> Reference ID</span>
                                    <span>
                                        AAP-DSTV-A2022-1a56c83e-a11a-4612-b2b3-bb3c1b376ef6
                                    </span>
                                </div>
                            </CardBody>
                            <CardFooter className={styles.VCBodyButton}>
                                <Button
                                    variant="flat"
                                    type="button"
                                    icon={<Eye />}
                                >
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
export default ViewCashout
