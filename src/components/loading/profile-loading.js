import React from 'react'
import styles from './loading.module.scss'
import ContentLoader from 'react-content-loader'
import { Card, CardBody } from '@kudi-inc/dip'

const ProfileLoading = () => {
    return (
        <div className={styles.Profile}>
            <div className={styles.ProfileTop}>
                <Card>
                    <CardBody>
                        <ContentLoader
                            primaryColor={'#F0F4F9'}
                            secondaryColor={'#fdfdfd'}
                            height={260}
                        >
                            <rect
                                x="0"
                                y="17"
                                rx="5"
                                ry="5"
                                width="140"
                                height="210"
                            />
                            <rect
                                x="170"
                                y="17"
                                rx="4"
                                ry="4"
                                width="250"
                                height="10"
                            />
                            <rect
                                x="170"
                                y="60"
                                rx="3"
                                ry="3"
                                width="250"
                                height="10"
                            />
                            <rect
                                x="170"
                                y="100"
                                rx="3"
                                ry="3"
                                width="250"
                                height="10"
                            />
                            <rect
                                x="170"
                                y="140"
                                rx="3"
                                ry="3"
                                width="250"
                                height="10"
                            />
                            <rect
                                x="170"
                                y="180"
                                rx="3"
                                ry="3"
                                width="250"
                                height="10"
                            />
                            <rect
                                x="170"
                                y="220"
                                rx="3"
                                ry="3"
                                width="250"
                                height="10"
                            />
                        </ContentLoader>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        {Array(5)
                            .fill()
                            .map((_, index) => (
                                <ContentLoader
                                    primaryColor={'#F0F4F9'}
                                    secondaryColor={'#fdfdfd'}
                                    height={21}
                                >
                                    <rect
                                        x="0"
                                        y="16"
                                        rx="2"
                                        ry="2"
                                        width="70"
                                        height="10"
                                    />

                                    <rect
                                        x="90"
                                        y="16"
                                        rx="2"
                                        ry="2"
                                        width="300"
                                        height="10"
                                    />
                                </ContentLoader>
                            ))}
                    </CardBody>
                </Card>
            </div>
            <div className={styles.ProfileBottom}>
                <Card>
                    <CardBody>
                        {Array(5)
                            .fill()
                            .map((_, index) => (
                                <ContentLoader
                                    primaryColor={'#F0F4F9'}
                                    secondaryColor={'#fdfdfd'}
                                    height={20}
                                >
                                    <rect
                                        x="0"
                                        y="15"
                                        rx="2"
                                        ry="2"
                                        width="70"
                                        height="10"
                                    />

                                    <rect
                                        x="90"
                                        y="15"
                                        rx="2"
                                        ry="2"
                                        width="300"
                                        height="10"
                                    />
                                </ContentLoader>
                            ))}
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        {Array(5)
                            .fill()
                            .map((_, index) => (
                                <ContentLoader
                                    primaryColor={'#F0F4F9'}
                                    secondaryColor={'#fdfdfd'}
                                    height={20}
                                >
                                    <rect
                                        x="0"
                                        y="15"
                                        rx="2"
                                        ry="2"
                                        width="160"
                                        height="10"
                                    />

                                    <rect
                                        x="180"
                                        y="15"
                                        rx="2"
                                        ry="2"
                                        width="300"
                                        height="10"
                                    />
                                </ContentLoader>
                            ))}
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default ProfileLoading
