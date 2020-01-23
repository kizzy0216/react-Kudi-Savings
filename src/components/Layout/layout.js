import React from 'react'
import {  SideBarItem, Button } from '@kudi-inc/dip'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { withAuth } from 'utils/hoc'
import {
    DashboardLink,
    SettingsLink,
    CILink,
    CashoutLink,
    AgentsLink,
    TransactionsLink,
    LogoutIcon
} from 'assets/svg'
import LogoSection from './logo-section'
import styles from './layout.module.scss'

const Layout = ({ children, auth }) => {
    const [, , setLogout] = auth

    let history = useHistory()
    const navItems = [
        {
            title: 'Dashboard',
            link: '/dashboard',
            icon: <DashboardLink />
        },
        {
            title: 'Agents',
            link: '/agents',
            icon: <AgentsLink />
        },
        {
            title: 'Transactions',
            link: '/transactions',
            icon: <TransactionsLink />
        },
        {
            title: 'Customer Insights',
            link: '/customer-insights',
            icon: <CILink />
        },
        {
            title: 'Cashout',
            link: '/cashout',
            icon: <CashoutLink />
        },
        {
            title: 'Settings',
            link: '/settings',
            icon: <SettingsLink />
        }
    ]

    return (
        <div className={styles.layout}>
            <div className={styles.sideNav}>
                <LogoSection />
                <div className={styles.navSection}>
                  
                        {navItems.map((item, id) => (
                            <SideBarItem
                                key={id}
                                className={styles.navSectionLinks}
                                icon={item.icon}
                                text={item.title}
                                active={window.location.pathname === item.link}
                                onClick={() => history.push(`${item.link}`)}
                            />
                        ))}
                   
                </div>
                {/* <Button
                variant="flat"
                    icon={<LogoutIcon />}
                    className={styles.logoutButton}
                    onClick={()=>setLogout()}
                >
                    Log Out
                </Button> */}
            </div>

            <div className={styles.main}>{children}</div>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node
}

export default withAuth(Layout)
