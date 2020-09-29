import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ChevronLeft } from 'assets/svg'
import { Header, Content } from 'components/Layout'
import styles from '../Agents/agent-profile.module.scss'
import WalletHistory from './wallet-history'
import { SideSheet } from 'evergreen-ui'

const ViewWalletHistory = props => {
  let id = props.location.state
  let phoneNumber = props.location.phone
  let enabled = props.location.enableTransaction
  let history = useHistory()
  let [showCreditDialog, setShowCreditDialog] = useState(false)
  let [showDebitDialog, setShowDebitDialog] = useState(false)
  
  return (
    <Fragment>
      <Header>
        <p>
          <ChevronLeft role="button" onClick={() => history.goBack()} />
          Wallet History
        </p>
      </Header>
      <div className={styles.DivContent}>
        <WalletHistory transaction={enabled} minimized={false} id={id} phone={phoneNumber}/>
      </div>
      <Content>
        <SideSheet
          onCloseComplete={() => setShowCreditDialog(false)}
          isShown={showCreditDialog}
        ></SideSheet>
        <SideSheet
          onCloseComplete={() => setShowDebitDialog(false)}
          isShown={showDebitDialog}
        ></SideSheet>
      </Content>
    </Fragment>
  )
}

export default ViewWalletHistory