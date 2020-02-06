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
const Agents = lazy(() =>
    import(/* webpackChunkName: "ZonalHeads" */ 'pages/Agents')
)
const CreateAgent = lazy(() =>
    import(/* webpackChunkName: "ZonalHeads" */ 'pages/Agents/create-agent')
)
const Transactions = lazy(() =>
    import(/* webpackChunkName: "Transactions" */ 'pages/Transactions')
)
const SingleTransaction = lazy(() =>
    import(/* webpackChunkName: "Transaction" */ 'pages/SingleTransaction')
)
const CustomerInsights = lazy(() =>
    import(/* webpackChunkName: "CustomerInsights" */ 'pages/CustomerInsights')
)
const SingleAgent = lazy(() =>
    import(/* webpackChunkName: "SingleAgent" */ 'pages/Agents/agent-profile')
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
                    component={() => <Redirect to="/dashboard" />}
                />

                <PrivateRoute path="/dashboard" exact component={Dashboard} />
                <PrivateRoute path="/cashout" exact component={Cashout} />
                <PrivateRoute path="/cashout/:id" component={ViewCashout} />
                <PrivateRoute
                    exact
                    path="/fund-wallet"
                    component={FundWallet}
                />
                <PrivateRoute
                    exact
                    path="/fund-wallet/enter-pin"
                    component={KudiPin}
                />
                <PrivateRoute
                    path="/zonal-heads"
                    exact
                    component={ZonalHeads}
                />
                <PrivateRoute path="/agents" exact component={Agents} />
                <PrivateRoute
                    path="/create-agent"
                    exact
                    component={CreateAgent}
                />
                <PrivateRoute
                    path="/agents/:id"
                    exact
                    component={SingleAgent}
                />
                <PrivateRoute path="/settings" exact component={Settings} />
                <PrivateRoute
                    path="/transactions"
                    exact
                    component={Transactions}
                />
                <PrivateRoute
                    path="/transactions/:id"
                    component={SingleTransaction}
                />
                <PrivateRoute
                    path="/customer-insights"
                    component={CustomerInsights}
                />
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
