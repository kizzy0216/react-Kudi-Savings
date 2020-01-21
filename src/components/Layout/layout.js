import React from 'react'
import { SideBarItem } from '@kudi-inc/dip'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { withAuth } from 'utils/hoc'
import { DashboardLink } from 'assets/svg'
import styles from './layout.module.scss'
import { Logo, User } from 'assets/svg'

const Layout = ({ children, auth }) => {
    const [, , setLogout] = auth

    let history = useHistory()
    const isDashboard = window.location.pathname === '/'

    return (
        <div className={styles.layout}>
            <div className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <Logo />
                </div>
                <div className={styles.sidebarList}>
                    <SideBarItem
                        className={styles.links}
                        icon={<DashboardLink />}
                        text=""
                        active={isDashboard}
                        onClick={() => history.push('/')}
                    />
                </div>
                <div className={styles.sidebarFooter}>
                    <User onClick={setLogout} title={'Logout'} />
                </div>
            </div>
            <div className={styles.main}>{children}</div>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node
}

export default withAuth(Layout)
