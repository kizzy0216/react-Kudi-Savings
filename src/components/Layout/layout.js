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
  MarketsLink,
  CustomersLink,
  PlansLink
} from 'assets/svg'
import LogoSection from './logo-section'
import styles from './layout.module.scss'

const Layout = ({ children, auth }) => {
  const [user, , setLogout] = auth

  let history = useHistory()
  const navItems = [
    // {
    //   title: 'Dashboard',
    //   link: '/dashboard',
    //   icon: <DashboardLink />,
    //   userType: ['ADMIN']
    // },
    // {
    //   title: 'Dashboard',
    //   link: '/dashboard/zonal',
    //   icon: <DashboardLink />,
    //   userType: ['ZONAL']
    // },
    {
      title: 'Markets',
      link: '/markets',
      icon: <MarketsLink />,
      userType: ['ADMIN', 'ZONAL']
    },
    {
      title: 'Agents',
      link: '/agents',
      icon: <AgentsLink />,
      userType: ['ADMIN', 'ZONAL']
    },
    {
      title: 'Zonal Heads',
      link: '/zonal-heads',
      icon: <AgentsLink />,
      userType: ['ADMIN']
    },
    {
      title: 'Transactions',
      link: '/transactions',
      icon: <TransactionsLink />,
      userType: ['ADMIN', 'ZONAL']
    },
    {
      title: 'Customers',
      link: '/customers',
      icon: <CustomersLink />,
      userType: ['ADMIN', 'ZONAL']
    },
    // {
    //   title: 'Customer Insights',
    //   link: '/customer-insights',
    //   icon: <CILink />,
    //   userType: ['ADMIN', 'ZONAL']
    // },
    {
      title: 'Plans',
      link: '/plans',
      icon: <PlansLink />,
      userType: ['ADMIN']
    },
    {
      title: 'Cashout',
      link: '/cashout',
      icon: <CashoutLink />,
      userType: ['ADMIN', 'ZONAL']
    },
    {
      title: 'Settings',
      link: '/settings',
      icon: <SettingsLink />,
      userType: ['ADMIN', 'ZONAL']
    }
  ]
  return (
    <div className={styles.layout}>
      <div className={styles.sideNav}>
        <LogoSection history={history} user={user} />
        <div className={styles.navSection}>
          {navItems.map((item, id) =>
            item && item.userType.includes(user.type) ? (
              <SideBarItem
                key={id}
                className={styles.navSectionLinks}
                icon={item.icon}
                text={item.title}
                active={window.location.pathname === item.link}
                onClick={() => history.push(`${item.link}`)}
              />
            ) : (
              ''
            )
          )}
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
