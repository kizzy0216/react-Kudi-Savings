import React, { Fragment } from 'react'
import { Card, CardHeader, CardBody } from '@kudi-inc/dip'
import { Header, Filters, Content, Layout } from 'components/Layout'
import styles from './dashboard.module.scss'
const Dashboard = () => {
    return (
        <Fragment>
            <Header>
                <p> Dashboard </p>
            </Header>
            <Content className={styles.content}>
                <Card className={styles.contentCard}>
                    <CardBody></CardBody>
                </Card>
            </Content>
        </Fragment>
    )
}
export default Dashboard
