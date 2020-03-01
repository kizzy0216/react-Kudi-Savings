import React, { Fragment } from 'react'
import { useQuery } from 'react-query'
import { Card, CardBody, CardHeader, Button } from '@kudi-inc/dip'
import { SettingsLink, ChevronLeft, Reassign } from 'assets/svg'
import { Header, Content } from 'components/Layout'
import { ProfileLoading } from 'components/loading'
import styles from './markets.module.scss'
import { getSingleMarket } from 'services/markets'

const SingleMarket = ({ history, match: { params } }) => {
    const { data, isLoading, error, refetch } = useQuery(
        ['SingleMarket', {}],
        getSingleMarket(params.id)
    )

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
                    {isLoading && <ProfileLoading />}
                    {error && (
                        <span>
                            Error!
                            <button
                                onClick={() => refetch({ disableThrow: true })}
                            >
                                Retry
                            </button>
                        </span>
                    )}
                    {data && (
                        <div className={styles.SM}>
                            <Card>
                                <CardHeader className={styles.SMHeader}>
                                    <h3> MARKET</h3>

                                    <Button
                                        variant="flat"
                                        icon={<SettingsLink />}
                                    >
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
                    )}{' '}
                </div>
            </Content>
        </Fragment>
    )
}
export default SingleMarket
