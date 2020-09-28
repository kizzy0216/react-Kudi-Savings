import React, { lazy, Suspense } from 'react'
import { withAuth } from 'utils/hoc'
import PrivateRoute from './PrivateRoute'
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { AppLoading } from '../loading'

const history = createBrowserHistory()

const Login = lazy(() => import(/* webpackChunkName: "Login" */ 'pages/Login'))

const Dashboard = lazy(() =>
  import(/* webpackChunkName: "Dashboard" */ 'pages/Dashboard')
)
const Markets = lazy(() =>
  import(/* webpackChunkName: "Markets" */ 'pages/Markets')
)
const SingleMarket = lazy(() =>
  import(/* webpackChunkName: "SingleMarket" */ 'pages/Markets/single-market')
)
const CreateMarket = lazy(() =>
  import(/* webpackChunkName: "CreateMarket" */ 'pages/Markets/create-market')
)
const ZonalDashboard = lazy(() =>
  import(
    /* webpackChunkName: "ZonalDashboard" */ 'pages/Dashboard/dashboard-zonal'
  )
)
const Cashout = lazy(() =>
  import(/* webpackChunkName: "Cashout" */ 'pages/Cashout')
)
const ViewCashout = lazy(() =>
  import(/* webpackChunkName: "Transaction" */ 'pages/Cashout/view-cashout')
)
const LoansOverview = lazy(() => import('../../pages/Loans/Overview/Overview'))
const OverdueLoans = lazy(() => import('../../pages/Loans/Overdue/Overdue'))
const AllLoans = lazy(() => import('../../pages/Loans/AllLoans/AllLoans'))
const LoanDetail = lazy(() => import('../../pages/Loans/LoanDetails/LoanDetail'))
const LoanRepayments = lazy(() => import('../../pages/Loans/Repayments/LoanRepayments'))
const FundLoanPurse = lazy(() => import('pages/Loans/FundLoanPurse/fund-loan-purse'))

const Settings = lazy(() =>
  import(/* webpackChunkName: "Settings" */ 'pages/Settings')
)
const Referrals = lazy(() =>
  import(/* webpackChunkName: "Referrals" */ 'pages/Referrals')
)
const ZonalHeads = lazy(() =>
  import(/* webpackChunkName: "ZonalHeads" */ 'pages/ZonalHeads')
)
const CreateZonalHead = lazy(() =>
  import(
    /* webpackChunkName: "CreateZonalHead" */ 'pages/ZonalHeads/create-zonal-head'
  )
)
const SingleZonalHead = lazy(() =>
  import(
    /* webpackChunkName: "SingleZonalHead" */ 'pages/ZonalHeads/zonal-head-profile'
  )
)
const ZonalWalletHistory = lazy(() =>
  import(
    /* webpackChunkName: "ZonalHeadWallet" */ 'pages/ZonalHeads/wallet-history'
  )
)
const Agents = lazy(() =>
  import(/* webpackChunkName: "Agents" */ 'pages/Agents')
)
const EditAgent = lazy(() =>
  import(/* webpackChunkName: "EditAgent" */ 'pages/Agents/edit-agent')
)
const CreateAgent = lazy(() =>
  import(/* webpackChunkName: "CreateAgent" */ 'pages/Agents/create-agent')
)

const SingleAgent = lazy(() =>
  import(/* webpackChunkName: "SingleAgent" */ 'pages/Agents/agent-profile')
)
const AgentWalletHistory = lazy(() =>
  import(
    /* webpackChunkName: "AgentWalletHistory" */ 'pages/Agents/wallet-history'
  )
)
const AdminWalletHistory = lazy(() =>
  import(
    /* webpackChunkName: "AdminWalletHistory" */ 'pages/AdminWalletHistory'
  )
)
const Customers = lazy(() =>
  import(/* webpackChunkName: "Customers" */ 'pages/Customers')
)
const CustomerProfile = lazy(() =>
  import(
    /* webpackChunkName: "SingleCustomer" */ 'pages/Customers/customer-profile'
  )
)
const CustomerHistory = lazy(() =>
  import(
    /* webpackChunkName: "CustomerHistory" */ 'pages/Customers/customer-plan-details'
  )
)
const CustomerPlanCollection = lazy(() =>
  import(
    /* webpackChunkName: "CustomerPlanCollection" */ 'pages/Customers/view-all-plan-collection'
  )
)
const CustomerCashoutLog = lazy(() =>
  import(
    /* webpackChunkName: "CustomerCashoutLog" */ 'pages/Customers/view-all-cashout-log'
  )
)
const CustomerRevenuePlanLog = lazy(() =>
  import(
    /* webpackChunkName: "CustomerRevenuePlanLog" */ 'pages/Customers/view-all-plan-revenue-log'
  )
)
const CustomerWalletHistory = lazy(() =>
  import(
    /* webpackChunkName: "CustomerWalletHistory" */ 'pages/Customers/customer-wallet-history'
  )
)
const Plans = lazy(() => import(/* webpackChunkName: "Plans" */ 'pages/Plans'))

const Transactions = lazy(() =>
  import(/* webpackChunkName: "Transactions" */ 'pages/Transactions')
)

const SingleTransaction = lazy(() =>
  import(/* webpackChunkName: "SingleTransaction" */ 'pages/SingleTransaction')
)
const CustomerInsights = lazy(() =>
  import(/* webpackChunkName: "CustomerInsights" */ 'pages/CustomerInsights')
)

const FundWallet = lazy(() =>
  import(/* webpackChunkName: "FundWallet" */ 'pages/FundWallet')
)
const KudiPin = lazy(() =>
  import(/* webpackChunkName: "KudiPin" */ 'pages/FundWallet/kudi-pin')
)
const NotFound = lazy(() =>
  import(/* webpackChunkName: "NotFound" */ 'pages/NotFound')
)
const Collections = lazy(() =>
  import(
    /* webpackChunkName: "Collections" */ 'pages/Agents/view-all-collections'
  )
)
const WalletTopUps = lazy(() =>
  import(
    /* webpackChunkName: "WalletTopUps" */ 'pages/Agents/view-all-wallet-topup'
  )
)
const P2PLog = lazy(() =>
  import(
    /* webpackChunkName: "P2PLog" */ 'pages/Agents/view-all-p2p'
  )
)
const CashoutLog = lazy(() =>
  import(
    /* webpackChunkName: "CashoutLog" */ 'pages/Agents/view-all-cashout-logs'
  )
)
const ViewAgentCashout = lazy(() =>
  import(/* webpackChunkName: "ViewAgentCashout" */ 'pages/Agents/view-cashout')
)
const ViewAgentTransaction = lazy(() =>
  import(
    /* webpackChunkName: "ViewAgentTransaction" */ 'pages/Agents/transaction-details'
  )
)
const AppRouter = () => (
  <Router history={history}>
    <Suspense fallback={<AppLoading />}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route
          path="/forgot-password"
          component={() => {
            return <div>Page Not Found</div>
          }}
        />
        <PrivateRoute
          path="/"
          exact
          component={() => <Redirect to="/markets" />}
        />

        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <PrivateRoute
          path="/dashboard/zonal"
          exact
          component={ZonalDashboard}
        />
        <PrivateRoute path="/markets" exact component={Markets} />
        <PrivateRoute path="/markets/:id" exact component={SingleMarket} />
        <PrivateRoute path="/create-market" exact component={CreateMarket} />
        <PrivateRoute path="/cashout" exact component={Cashout} />
        <PrivateRoute path="/cashout/:id" component={ViewCashout} />
        <PrivateRoute path="/loans" exact component={LoansOverview}/>
        <PrivateRoute path="/loans/overdue" component={OverdueLoans}/>
        <PrivateRoute path="/loans/all" component={AllLoans}/>
        <PrivateRoute path="/loans/repayments/:id" component={LoanRepayments}/>
        <PrivateRoute path="/loans/details/:id" component={LoanDetail}/>
        <PrivateRoute path="/fund-purse" component={FundLoanPurse}/>
        <PrivateRoute exact path="/fund-wallet" component={FundWallet}/>
        <PrivateRoute exact path="/fund-wallet/enter-pin" component={KudiPin}/>
        <PrivateRoute path="/customers" exact component={Customers} />
        <PrivateRoute path="/customers/:id" exact component={CustomerProfile} />
        <PrivateRoute
          path="/customers/:id/plan/:planId"
          exact
          component={CustomerHistory}
        />
        <PrivateRoute path="/plans" exact component={Plans} />
        <PrivateRoute
          path="/customers/:id/plan/:planId/customer-plan-collection"
          exact
          component={CustomerPlanCollection}
        />
        <PrivateRoute
          path="/customers/:id/plan/:planId/customer-cashout-log"
          exact
          component={CustomerCashoutLog}
        />
        <PrivateRoute
          path="/customers/:id/plan/:planId/view-all-plan-revenue-log"
          exact
          component={CustomerRevenuePlanLog}
        />
        <PrivateRoute
          path="/customers/:id/plan/:planId/customer-wallet-history"
          exact
          component={CustomerWalletHistory}
        />
        <PrivateRoute path="/zonal-heads" exact component={ZonalHeads} />

        <PrivateRoute
          path="/zonal-heads/:id"
          exact
          component={SingleZonalHead}
        />
        <PrivateRoute
          path="/zonal-heads/:id/wallet-history"
          exact
          component={ZonalWalletHistory}
        />
        <PrivateRoute
          path="/create-zonal-head"
          exact
          component={CreateZonalHead}
        />
        <PrivateRoute path="/agents" exact component={Agents} />
        <PrivateRoute path="/create-agent" exact component={CreateAgent} />
        <PrivateRoute path="/agents/:id" exact component={SingleAgent} />
        <PrivateRoute path="/agents/:id/edit" exact component={EditAgent} />
        <PrivateRoute
          path="/agents/:id/wallet-history"
          exact
          component={AgentWalletHistory}
        />
        <PrivateRoute
          path="/wallet-history"
          exact
          component={AdminWalletHistory}
        />
        <PrivateRoute
          path="/agents/:id/view-all-collections"
          exact
          component={Collections}
        />
        <PrivateRoute
          path="/agents/:id/view-all-wallet-topup"
          exact
          component={WalletTopUps}
        />
        <PrivateRoute
          path="/agents/:id/view-all-p2p"
          exact
          component={P2PLog}
        />
        <PrivateRoute
          path="/agents/:id/view-all-cashout-logs"
          exact
          component={CashoutLog}
        />
        <PrivateRoute
          path="/agents/:id/view-all-cashout-logs/cashout-details"
          exact
          component={ViewAgentCashout}
        />
        <PrivateRoute
          path="/agents/:id/cashout-details"
          exact
          component={ViewAgentCashout}
        />
        <PrivateRoute
          path="/agents/:id/customer-plan"
          exact
          component={ViewAgentTransaction}
        />
        <PrivateRoute
          path="/agents/:id/view-all-collections/customer-plan"
          exact
          component={ViewAgentTransaction}
        />
        <PrivateRoute
          path="/agents/:id/customer-plan/customer-plan-collection"
          exact
          component={CustomerPlanCollection}
        />
        <PrivateRoute
          path="/agents/:id/customer-plan/customer-cashout-log"
          exact
          component={CustomerCashoutLog}
        />
        <PrivateRoute
          path="/agents/:id/customer-plan/view-all-plan-revenue-log"
          exact
          component={CustomerRevenuePlanLog}
        />
        <PrivateRoute
          path="/agents/:id/customer-plan/customer-wallet-history"
          exact
          component={CustomerWalletHistory}
        />
        <PrivateRoute path="/settings" exact component={Settings} />
        <PrivateRoute path="/referrals" exact component={Referrals} />
        <PrivateRoute path="/transactions" exact component={Transactions} />
        <PrivateRoute path="/transactions/:id" component={SingleTransaction} />
        <PrivateRoute path="/customer-insights" component={CustomerInsights} />
        <PrivateRoute component={NotFound} />
        <Route
          render={() => {
            return <Redirect to="/" />
          }}
        />
      </Switch>
    </Suspense>
  </Router>
)

export default withAuth(AppRouter)
