import React, { Fragment } from 'react'
import { Card, CardBody, CardHeader, Button, Badge } from '@kudi-inc/dip'
import { Header, Content } from 'components/Layout'
import styles from './agents.module.scss'
const Agents = () => {
    return (
        <Fragment>
            <Header>
                <p> Agent </p>
            </Header>
            <Content className={styles.content}>
                <div className={styles.contentCard}>
                    
                </div>
            </Content>
        </Fragment>
    )
}
export default Agents
