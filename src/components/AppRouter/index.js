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
const Settings = lazy(() =>
    import(/* webpackChunkName: "Settings" */ 'pages/Settings')
)
const ZonalHeads = lazy(() =>
    import(/* webpackChunkName: "ZonalHeads" */ 'pages/ZonalHeads')
)
const Transactions = lazy(() =>
    import(/* webpackChunkName: "Transactions" */ 'pages/Transactions')
)
const CustomerInsights = lazy(() =>
    import(/* webpackChunkName: "CustomerInsights" */ 'pages/CustomerInsights')
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

                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/cashout" component={Cashout} />
                <PrivateRoute path="/zonal-heads" component={ZonalHeads} />
                <PrivateRoute path="/settings" component={Settings} />
                <PrivateRoute path="/transactions" component={Transactions} />
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
