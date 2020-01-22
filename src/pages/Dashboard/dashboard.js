import React, { Fragment } from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    ButtonGroup,
    Button,
    Table,
    Badge
} from '@kudi-inc/dip'
import { Header, Content } from 'components/Layout'
import styles from './dashboard.module.scss'
import cx from 'classnames'
import Chart from 'components/Chart'

const dataSource = [
    {
        label: '2007',
        value: '1380000'
    },
    {
        label: '2008',
        value: '1450000'
    },
    {
        label: '2009',
        value: '1610000'
    },
    {
        label: '2010',
        value: '1540000'
    },
    {
        label: '2011',
        value: '1480000'
    },
    {
        label: '2012',
        value: '1573000'
    },
    {
        label: '2013',
        value: '2232000'
    },
    {
        label: '2014',
        value: '2476000'
    },
    {
        label: '2015',
        value: '2832000'
    },
    {
        label: '2016',
        value: '3808000'
    }
]
const Dashboard = () => {
    return (
        <Fragment>
            <Header>
                <p> Dashboard </p>
            </Header>
            <Content className={styles.content}>
                <div className={styles.Dashboard}>
                    <div className={styles.DashboardLeft}>
                        <Card className={styles.DashboardCard}>
                            <CardBody>
                                <div className={styles.Dashboard_flex}>
                                    <p>New Agents</p>
                                    <span>34</span>
                                </div>
                                <div className={styles.Dashboard_flex}>
                                    <p>Active Agents</p>
                                    <span>56</span>
                                </div>
                                <div className={styles.Dashboard_flex}>
                                    <p>Inactive Agents</p>
                                    <span>56</span>
                                </div>
                            </CardBody>
                            <CardFooter>
                                <div
                                    className={cx(
                                        styles.Dashboard_flex,
                                        styles.footer
                                    )}
                                >
                                    <p>Total Agents</p>
                                    <span> N1,175,430 </span>
                                </div>
                            </CardFooter>
                        </Card>
                        <Card className={styles.DashboardCard}>
                            <CardBody>
                                <div className={styles.Dashboard_center}>
                                    <p>Agent Transactions</p>
                                    <h3> N1,175,430</h3>
                                </div>
                            </CardBody>
                            <CardFooter>
                                <div className={styles.Dashboard_center_footer}>
                                    <p> Total Commission - N176,100</p>
                                </div>
                            </CardFooter>
                        </Card>
                        <Card className={styles.DashboardCard}>
                            <CardBody>
                                <div className={styles.Dashboard_flex}>
                                    <p>New Customers</p>
                                    <span>450</span>
                                </div>
                                <div className={styles.Dashboard_flex}>
                                    <p>Active Customers</p>
                                    <span>450</span>
                                </div>
                                <div className={styles.Dashboard_flex}>
                                    <p>Inactive Customers</p>
                                    <span>66</span>
                                </div>
                                <div
                                    className={cx(
                                        styles.Dashboard_flex,
                                        styles.footer
                                    )}
                                >
                                    <p>Total Customers</p>
                                    <span>866</span>
                                </div>
                            </CardBody>
                            <CardFooter>
                                <div className={styles.Dashboard_center}>
                                    <p>Total Savings</p>
                                    <h3> N1,175,430</h3>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className={styles.DashboardRight}>
                        <Card>
                            <CardHeader>
                                <h3>RECENT ACTIVITY</h3>
                                <ButtonGroup>
                                    <Button active>Week 1</Button>
                                    <Button>Week 2</Button>
                                    <Button>Week 3</Button>
                                    <Button>Week 4</Button>
                                </ButtonGroup>
                            </CardHeader>
                            <CardBody>
                                <Table
                                    column={[
                                        { key: 'date', render: 'Date' },
                                        {
                                            key: 'fullName',
                                            render: 'Fullname'
                                        },
                                        { key: 'amount', render: 'Amount' },
                                        {
                                            key: 'walletBalance',
                                            render: 'Current Balance'
                                        },
                                        {
                                            key: 'status',
                                            render: 'Status'
                                        },
                                        {
                                            key: 'action',
                                            render: ''
                                        }
                                    ]}
                                    data={[
                                        {
                                            date: '02 Jun 19',
                                            fullName: 'Kunle Afolayan',
                                            amount: 'N200',
                                            walletBalance: 'N2000',
                                            status: <Badge>PENDING</Badge>
                                        },
                                        {
                                            date: '02 Jun 19',
                                            fullName: 'Kunle Afolayan',
                                            amount: 'N200',
                                            walletBalance: 'N2000',
                                            status: <Badge>PENDING</Badge>
                                        },
                                        {
                                            date: '02 Jun 19',
                                            fullName: 'Kunle Afolayan',
                                            amount: 'N200',
                                            walletBalance: 'N2000',
                                            status: <Badge>PENDING</Badge>
                                        }
                                    ]}
                                />
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader></CardHeader>
                            <CardBody>
                                {/* <Chart
                                    dataSource={dataSource}
                                  
                                /> */}
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </Content>
        </Fragment>
    )
}
export default Dashboard
