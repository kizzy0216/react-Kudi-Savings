import React from 'react'
import { SideBarItem } from '@kudi-inc/dip'
import cx from 'classnames'
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
    LogoutIcon,
    MarketsLink 
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
            title: 'Markets',
            link: '/markets',
            icon: <MarketsLink />
        },
        {
            title: 'Agents',
            link: '/agents',
            icon: <AgentsLink />
        },
        {
            title: 'Zonal Heads',
            link: '/zonal-heads',
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
                <LogoSection history={history} />
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
                <SideBarItem
                    className={cx(styles.navSectionLinks, styles.logout)}
                    icon={<LogoutIcon />}
                    text={'Logout'}
                    active={window.location.pathname === '/logout'}
                    onClick={() => setLogout()}
                />
            </div>

            <div className={styles.main}>{children}</div>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node
}

export default withAuth(Layout)
