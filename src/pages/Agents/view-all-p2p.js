import React, { Fragment } from 'react'
import { Header, Content } from 'components/Layout'
import { ChevronLeft } from 'assets/svg'
import styles from './agent-profile.module.scss'
import P2PLog from './p2p'
import { useHistory } from 'react-router-dom'

const P2P = ({ location }) => {

    let p2pId = location.state
    let history = useHistory()
    return (
      <Fragment>
        <Header>
          <p>
            <ChevronLeft role="button" onClick={() => history.goBack()} />
            P2P
          </p>
        </Header>
        <div className={styles.DivContent}>
          <P2PLog minimized={false} id={p2pId}/>
        </div>
      </Fragment>
    )
  }
  
  export default P2P
  