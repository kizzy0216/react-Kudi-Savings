import React, { Fragment } from 'react'
import { Card, CardBody, Button, CardHeader } from '@kudi-inc/dip'
import { Header, Content } from 'components/Layout'
import { ChevronLeft } from 'assets/svg'
import styles from './create-agent.module.scss'
const CreateAgent = ({ history }) => {
    return (
        <Fragment>
            <Header>
                <p>
                    <ChevronLeft
                        role="button"
                        onClick={() => history.goBack()}
                    />
                    Create New Agent
                </p>
            </Header>
            <Content className={styles.content}>
                <Card className={styles.contentCard}>
                    <CardHeader className={styles.Header}></CardHeader>
                </Card>
            </Content>
        </Fragment>
    )
}
export default CreateAgent
