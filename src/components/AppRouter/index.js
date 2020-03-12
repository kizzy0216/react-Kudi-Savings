import React, { lazy, Suspense } from 'react'
import { withAuth } from 'utils/hoc'
import PrivateRoute from './PrivateRoute'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
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
const Settings = lazy(() =>
  import(/* webpackChunkName: "Settings" */ 'pages/Settings')
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

const Customers = lazy(() =>
  import(/* webpackChunkName: "Customers" */ 'pages/Customers')
)
const CustomerProfile = lazy(() =>
  import(
    /* webpackChunkName: "SingleCustomer" */ 'pages/Customers/customer-profile'
  )
)
const EditCustomer = lazy(() =>
  import(/* webpackChunkName: "EditCustomer" */ 'pages/Customers/edit-customer')
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
        <PrivateRoute exact path="/fund-wallet" component={FundWallet} />
        <PrivateRoute exact path="/fund-wallet/enter-pin" component={KudiPin} />
        <PrivateRoute path="/customers" exact component={Customers} />
        <PrivateRoute path="/customers/:id" exact component={CustomerProfile} />
        <PrivateRoute path="/customers/:id/edit" exact component={EditCustomer} />
        <PrivateRoute path="/plans" exact component={Plans} />
        <PrivateRoute path="/zonal-heads" exact component={ZonalHeads} />
        <PrivateRoute
          path="/zonal-heads/:id"
          exact
          component={SingleZonalHead}
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
        <PrivateRoute path="/settings" exact component={Settings} />
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
