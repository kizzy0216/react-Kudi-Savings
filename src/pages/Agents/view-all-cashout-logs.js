import React, { Fragment } from 'react'
import { Header } from 'components/Layout'
import { ChevronLeft } from 'assets/svg'
import styles from './agent-profile.module.scss'
import CashoutLog from './cashout'
import { useHistory } from 'react-router-dom'

const Cashout = (props, { match: params }) => {
  let history = useHistory()
  return (
    <Fragment>
      <Header>
        <p>
          <ChevronLeft role="button" onClick={() => history.goBack()} />
          Cashout
        </p>
      </Header>
      <div className={styles.DivContent}>
        <CashoutLog minimized={false} />
      </div>
    </Fragment>
  )
}

export default Cashout
