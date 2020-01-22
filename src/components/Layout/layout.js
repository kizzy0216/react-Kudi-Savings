import React from 'react'
import { SideBar, SideBarList, SideBarItem } from '@kudi-inc/dip'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { withAuth } from 'utils/hoc'
import {
    DashboardLink,
    SettingsLink,
    CILink,
    CashoutLink,
    AgentsLink,
    TransactionsLink
} from 'assets/svg'
import LogoSection from "./logo-section"
import styles from './layout.module.scss'

const Layout = ({ children, auth }) => {
    const [, , setLogout] = auth

    let history = useHistory()
    const isDashboard = window.location.pathname === '/'
    const isAgent = window.location.pathname === '/agents'
    const isTransactions = window.location.pathname === '/transactions'
    const isCustomerInsights = window.location.pathname === '/customer-insights'
    const isCashout = window.location.pathname === '/cashout'
    const isSettings = window.location.pathname === '/settings'
    // const isCashout = window.location.pathname === "/cashout"
    // const isZonalHeads = window.location.pathname === "/zonal-heads"

    return (
        <div className={styles.layout}>
          
            <SideBar onLogout={() => setLogout()} className={styles.sidebar}>
          
                <SideBarList>
           
                    <SideBarItem
                        className={styles.links}
                        icon={<DashboardLink />}
                        text="Dashboard"
                        active={isDashboard}
                        onClick={() => history.push('/')}
                    />

                    <SideBarItem
                        className={styles.links}
                        icon={<AgentsLink />}
                        text="Agents"
                        active={isAgent}
                        onClick={() => history.push('/agents')}
                    />
                    <SideBarItem
                        className={styles.links}
                        icon={<TransactionsLink />}
                        text="Transactions"
                        active={isTransactions}
                        onClick={() => history.push('/transactions')}
                    />
                    <SideBarItem
                        className={styles.links}
                        icon={<CILink />}
                        text="Customer Insights"
                        active={isCustomerInsights}
                        onClick={() => history.push('/customer-insights')}
                    />
                    <SideBarItem
                        className={styles.links}
                        icon={<CashoutLink />}
                        text="Cashout"
                        active={isCashout}
                        onClick={() => history.push('/cashout')}
                    />
                    <SideBarItem
                        className={styles.links}
                        icon={<SettingsLink />}
                        text="Settings"
                        active={isSettings}
                        onClick={() => history.push('/settings')}
                    />
                </SideBarList>
            </SideBar>
            <div className={styles.main}>{children}</div>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node
}

export default withAuth(Layout)
