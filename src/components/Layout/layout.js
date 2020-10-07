import React, { useState, Fragment } from 'react'
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
  LoanManager,
  CustomersLink,
  PlansLink,
  ReferralLink,
  LoanIcon
} from 'assets/svg'
import { Content } from '../Layout'
import LogoSection from './logo-section'
import LoanSection from './loan-section'
import styles from './layout.module.scss'
import { Dialog, SideSheet } from 'evergreen-ui'
import FundLoanPurse from '../../pages/Loans/FundLoanPurse/fund'

const Layout = ({ children, auth }) => {
  const [user, , setLogout] = auth
  let history = useHistory()
  let [showFundPurse, setShowFundPurse] = useState(false)
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
      userType: ['ADMIN', 'ZONAL', 'SUPER_ADMIN', 'LOANS_MANAGER']
    },
    {
      title: 'Agents',
      link: '/agents',
      icon: <AgentsLink />,
      userType: ['ADMIN', 'ZONAL', 'SUPER_ADMIN', 'LOANS_MANAGER']
    },
    {
      title: 'Zonal Heads',
      link: '/zonal-heads',
      icon: <AgentsLink />,
      userType: ['ADMIN', 'SUPER_ADMIN', 'LOANS_MANAGER']
    },
    {
      title: 'Loan Managers',
      link: '/loan-managers',
      icon: <LoanManager />,
      userType: ['ADMIN', 'SUPER_ADMIN']
    },
    {
      title: 'Transactions',
      link: '/transactions',
      icon: <TransactionsLink />,
      userType: ['ADMIN', 'ZONAL', 'SUPER_ADMIN', 'LOANS_MANAGER']
    },
    {
      title: 'Customers',
      link: '/customers',
      icon: <CustomersLink />,
      userType: ['ADMIN', 'ZONAL', 'SUPER_ADMIN', 'LOANS_MANAGER']
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
      userType: ['ADMIN', 'ZONAL', 'SUPER_ADMIN', 'LOANS_MANAGER']
    },
    {
      title: 'Referrals',
      link: '/referrals',
      icon: <ReferralLink />,
      userType: ['ADMIN', 'ZONAL', 'SUPER_ADMIN', 'LOANS_MANAGER']
    },
    {
      title: 'Loans',
      link: '/loans',
      icon: <LoanIcon />,
      userType: ['ADMIN', 'SUPER_ADMIN', 'LOANS_MANAGER']
    },
    {
      title: 'Settings',
      link: '/settings',
      icon: <SettingsLink />,
      userType: ['ADMIN', 'ZONAL', 'SUPER_ADMIN', 'LOANS_MANAGER']
    }
  ]
  return (
    <>
      <div className={styles.layout}>
        <div className={styles.sideNav}>
          <LogoSection history={history} user={user} />
          <LoanSection history={history} setShowFundPurse={setShowFundPurse} />
          <div className={styles.side}>
            <div className={styles.sideNavSection}>
              {navItems.map((item, id) =>
                item && item.userType.includes(user.type) ? (
                  <SideBarItem
                    key={id}
                    className={styles.sideNavSectionLinks}
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
              className={styles.sideLogoutLinks}
              icon={<LogoutIcon />}
              text={'Logout'}
              active={window.location.pathname === '/logout'}
              onClick={() => setLogout()}
            />
          </div>
        </div>

        <div className={styles.main}>{children}</div>
      </div>
      <Fragment>
        <Content className={styles.content}>
          <SideSheet
            onCloseComplete={() => setShowFundPurse(false)}
            isShown={showFundPurse}
            width={600}
          >
            <FundLoanPurse setShowFundPurse={setShowFundPurse} />
          </SideSheet>
        </Content>
      </Fragment>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}

export default withAuth(Layout)
