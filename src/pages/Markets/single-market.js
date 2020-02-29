import React, { Fragment, useState } from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    Button,
    Badge,
    CardFooter
} from '@kudi-inc/dip'
import { SettingsLink, ChevronLeft, Reassign } from 'assets/svg'
import { Header, Content } from 'components/Layout'
import { ProgressBar } from 'components/Common'
import styles from './markets.module.scss'

const SingleMarket = ({ history }) => {
    let [show, setShow] = useState(false)
    return (
        <Fragment>
            <Header>
                <p>
                    <ChevronLeft
                        role="button"
                        onClick={() => history.goBack()}
                    />
                    Market
                </p>
            </Header>
            <Content className={styles.content}>
                <div className={styles.contentCard}>
                    <div className={styles.SM}>
                        <Card>
                            <CardHeader className={styles.SMHeader}>
                                <h3> MARKET</h3>

                                <Button variant="flat" icon={<SettingsLink />}>
                                    Edit
                                </Button>
                            </CardHeader>
                            <CardBody className={styles.SMBody}>
                                <div className={styles.SMBodyList}>
                                    <div>
                                        <span>Name</span>
                                        <span> Firstname Lastname</span>
                                    </div>
                                    <div>
                                        <span>Phone number</span>
                                        <span> 08062361452</span>
                                    </div>
                                    <div>
                                        <span>Gender</span>
                                        <span>Male</span>
                                    </div>

                                    <div>
                                        <span>Address</span>
                                        <span>Streetname, lga, state</span>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader className={styles.SMHeader}>
                                <h3> ASSIGNED ZONAL HEADS</h3>

                                
                            </CardHeader>
                            <CardBody className={styles.SMBody}>
                                <div className={styles.SMBodyList}>
                                    <div>
                                        <span>Date Onboarded:</span>
                                        <span> 2 </span>
                                        <Button
                                            variant="flat"
                                            icon={<Reassign />}
                                        >
                                            Reassign
                                        </Button>
                                        <Button
                                            variant="flat"
                                            icon={<SettingsLink />}
                                        >
                                            View Profile
                                        </Button>
                                    </div>
                                    <div>
                                        <span>Active Customers: </span>
                                        <span> 130</span>
                                        <Button
                                            variant="flat"
                                            icon={<Reassign />}
                                        >
                                            Reassign
                                        </Button>
                                        <Button
                                            variant="flat"
                                            icon={<SettingsLink />}
                                        >
                                            View Profile
                                        </Button>
                                    </div>
                                    <div>
                                        <span> Inactive Customers </span>
                                        <span>56</span>
                                        <Button
                                            variant="flat"
                                            icon={<Reassign />}
                                        >
                                            Reassign
                                        </Button>
                                        <Button
                                            variant="flat"
                                            icon={<SettingsLink />}
                                        >
                                            View Profile
                                        </Button>
                                    </div>
                                    <div>
                                        <span> Total Customers </span>
                                        <span>56</span>
                                        <Button
                                            variant="flat"
                                            icon={<Reassign />}
                                        >
                                            Reassign
                                        </Button>
                                        <Button
                                            variant="flat"
                                            icon={<SettingsLink />}
                                        >
                                            View Profile
                                        </Button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </Content>
        </Fragment>
    )
}
export default SingleMarket
