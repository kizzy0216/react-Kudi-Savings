import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { ChevronLeft } from 'assets/svg'
import { Header } from 'components/Layout'
import styles from '../Agents/agent-profile.module.scss'
import CashoutLog from './cashout-log'

const ViewCashoutLog = props => {
  let history = useHistory()
  let { location} = props
  let planId = location.state

  return (
    <Fragment>
      <Header>
        <p>
          <ChevronLeft role="button" onClick={() => history.goBack()} />
          Cashout
        </p>
      </Header>
      <div className={styles.DivContent}>
        <CashoutLog minimized={false} id={planId}/>
      </div>
    </Fragment>
  )
}

export default ViewCashoutLog
