import React from 'react'
import { SideBarItem } from '@kudi-inc/dip'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { withAuth } from 'utils/hoc'
import {
  SettingsLink,
  CashoutLink,
  AgentsLink,
  TransactionsLink,
  LogoutIcon,
  MarketsLink,
  CustomersLink,
  PlansLink,
  ReferralLink,
  LoanIcon
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
      userType: ['ADMIN', 'ZONAL', 'SUPER_ADMIN']
    },
    {
      title: 'Agents',
      link: '/agents',
      icon: <AgentsLink />,
      userType: ['ADMIN', 'ZONAL', 'SUPER_ADMIN']
    },
    {
      title: 'Zonal Heads',
      link: '/zonal-heads',
      icon: <AgentsLink />,
      userType: ['ADMIN', 'SUPER_ADMIN']
    },
    {
      title: 'Transactions',
      link: '/transactions',
      icon: <TransactionsLink />,
      userType: ['ADMIN', 'ZONAL', 'SUPER_ADMIN']
    },
    {
      title: 'Customers',
      link: '/customers',
      icon: <CustomersLink />,
      userType: ['ADMIN', 'ZONAL', 'SUPER_ADMIN']
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
      userType: ['ADMIN', 'SUPER_ADMIN']
    },
    {
      title: 'Cashout',
      link: '/cashout',
      icon: <CashoutLink />,
      userType: ['ADMIN', 'ZONAL', 'SUPER_ADMIN']
    },
    {
      title: 'Referrals',
      link: '/referrals',
      icon: <ReferralLink />,
      userType: ['ADMIN', 'ZONAL', 'SUPER_ADMIN']
    },
    {
      title: 'Loans',
      link: '/loans',
      icon: <LoanIcon />,
      userType: ['ADMIN', 'SUPER_ADMIN']
    },
    {
      title: 'Settings',
      link: '/settings',
      icon: <SettingsLink />,
      userType: ['ADMIN', 'ZONAL', 'SUPER_ADMIN']
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
                active={window.location.pathname.includes(item.link)}
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
