import React, { Fragment } from 'react'
import styles from './loading.module.scss'
import ContentLoader from 'react-content-loader'
import { Card, CardBody } from '@kudi-inc/dip'

const Dashboard = () => {
    return (
        <Fragment>
            <div>
                <Card>
                    <CardBody className={styles.Table}>
                        {Array(105)
                            .fill()
                            .map((_, index) => (
                                <ContentLoader
                                    key={index}
                                    height={100}
                                    speed={2}
                                    primaryColor={'#F0F4F9'}
                                    secondaryColor={'#fdfdfd'}
                                >
                                    <rect
                                        x="25"
                                        y="15"
                                        rx="5"
                                        ry="5"
                                        width="300"
                                        height="20"
                                    />
                                </ContentLoader>
                            ))}
                    </CardBody>
                </Card>
            </div>
        </Fragment>
    )
}

export default Dashboard
