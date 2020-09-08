import React, { Fragment } from 'react'
import { Header, Content } from 'components/Layout'
import { ChevronLeft } from 'assets/svg'
import styles from './agent-profile.module.scss'
import WalletTopUp from './wallet-topUp'
import { useHistory } from 'react-router-dom'

const TopUps = props => {
  let id = props.location.state

  let history = useHistory()
  return (
    <Fragment>
      <Header>
        <p>
          <ChevronLeft role="button" onClick={() => history.goBack()} />
          Wallet Top Up
        </p>
      </Header>
      <div className={styles.DivContent}>
        <WalletTopUp minimized={false} id={id} />
      </div>
    </Fragment>
  )
}

export default TopUps
