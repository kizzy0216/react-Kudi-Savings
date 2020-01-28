import React, { Fragment } from 'react'
import { Header, Content } from 'components/Layout'
import styles from './agents.module.scss'
const Agents = () => {
    return (
        <Fragment>
            <Header>
                <p> Agents </p>
            </Header>
            <Content className={styles.content}>
                
            </Content>
        </Fragment>
    )
}
export default Agents
