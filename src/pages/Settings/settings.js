import React, { Fragment } from 'react'
import { Card, CardBody, CardHeader } from '@kudi-inc/dip'
import { Header, Content } from 'components/Layout'
import styles from './settings.module.scss'
const Settings = () => {
    return (
        <Fragment>
            <Header>
                <p> Settings </p>
            </Header>
            <Content className={styles.content}>
                <div className={styles.Settings}>
                    <Card>
                        <CardHeader className={styles.SettingsHeader}>
                            Account Information
                        </CardHeader>
                        <CardBody></CardBody>
                    </Card>
                    <Card>
                        <CardHeader className={styles.SettingsHeader}>
                            Business Information
                        </CardHeader>
                        <CardBody></CardBody>
                    </Card>
                    <Card>
                        <CardHeader>Your Account</CardHeader>
                        <CardBody></CardBody>
                    </Card>
                </div>
            </Content>
        </Fragment>
    )
}
export default Settings
