import React, { Fragment, useState } from 'react'
import { Card, CardBody, CardHeader } from '@kudi-inc/dip'
import { Header, Content } from 'components/Layout'
import { ChevronLeft } from 'assets/svg'
import cx from 'classnames'
import styles from './create-agent.module.scss'
import Form from './fill-info'
const CreateAgent = ({ history }) => {
    let [active, setActive] = useState({
        title: 'FILL IN YOUR INFORMATION BELOW',
        content: <Form />
    })
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
                <Card className={cx(styles.contentCard, styles.CA)}>
                    <CardHeader className={styles.CAHeader}>
                        <div>{active.title}</div>
                    </CardHeader>
                    <CardBody>{active.content}</CardBody>
                </Card>
            </Content>
        </Fragment>
    )
}
export default CreateAgent
