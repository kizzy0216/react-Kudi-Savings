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
import Filter from 'components/Filter'
import { Eye, UpIcon, DownIcon } from 'assets/svg'

const dataSource = [
    {
        label: '2007',
        value: '10000'
    },
    {
        label: '2008',
        value: '9100'
    },
    {
        label: '2009',
        value: '50000'
    },
    {
        label: '2010',
        value: '9000'
    },
    {
        label: '2011',
        value: '130000'
    }
]
const Dashboard = () => {
    return (
        <Fragment>
            <Header>
                <p> Dashboard </p>
            </Header>
            <Filter />
            <Content className={styles.content}>
                <div className={styles.Dashboard}>
                    <div className={styles.DashboardTop}>
                        <Card className={styles.DashboardCard}>
                            <CardBody>
                                <div className={styles.Dashboard_center}>
                                    <p>Cash Collected Today</p>
                                    <h3> N575,430</h3>
                                </div>
                            </CardBody>
                            <CardFooter>
                                <div className={styles.Dashboard_center_footer}>
                                    <div
                                        className={
                                            styles.Dashboard_center_footer_text
                                        }
                                    >
                                        {' '}
                                        <Badge variant="success">
                                            <UpIcon /> <small> 8.5% </small>{' '}
                                        </Badge>{' '}
                                        Up from yesterday
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>

                        <Card className={styles.DashboardCard}>
                            <CardBody>
                                <div className={styles.Dashboard_center}>
                                    <p>Cash Withdrawn Today </p>
                                    <h3> N387,980</h3>
                                </div>
                            </CardBody>
                            <CardFooter>
                                <div className={styles.Dashboard_center_footer}>
                                    <div
                                        className={
                                            styles.Dashboard_center_footer_text
                                        }
                                    >
                                        {' '}
                                        <Badge variant="danger">
                                            <DownIcon />
                                            <small> 8.5% </small>
                                        </Badge>{' '}
                                        Down from yesterday
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>

                        <Card className={styles.DashboardCard}>
                            <CardBody>
                                <div className={styles.Dashboard_center}>
                                    <p>Agent Onboarded Today</p>
                                    <h3> 98</h3>
                                </div>
                            </CardBody>
                            <CardFooter>
                                <div className={styles.Dashboard_center_footer}>
                                    <div
                                        className={
                                            styles.Dashboard_center_footer_text
                                        }
                                    >
                                        {' '}
                                        <Badge variant="danger">
                                            <DownIcon />
                                            <small> 8.5% </small>{' '}
                                        </Badge>{' '}
                                        Down from yesterday
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className={styles.DashboardBottom}>
                        <div className={styles.DashboardLeft}>
                            <Card className={styles.DashboardCard}>
                                <CardBody>
                                    <div className={styles.Dashboard_center}>
                                        <p>Zonal Heads</p>
                                        <h3> 43</h3>
                                    </div>
                                </CardBody>
                                <CardFooter>
                                    <div
                                        className={
                                            styles.Dashboard_center_footer
                                        }
                                    >
                                        <p> Total Commission - N176,100</p>
                                    </div>
                                </CardFooter>
                            </Card>

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
                                        <h4> N1,175,430</h4>
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                        <div className={styles.DashboardRight}>
                            <Card className={styles.DashboardRightCard}>
                                <CardHeader>
                                    <div
                                        className={styles.DashboardRightHeader}
                                    >
                                        <h3>RECENT ACTIVITY</h3>
                                        <ButtonGroup>
                                            <Button active>Week 1</Button>
                                            <Button>Week 2</Button>
                                            <Button>Week 3</Button>
                                            <Button>Week 4</Button>
                                        </ButtonGroup>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <Table
                                        column={[
                                            { key: 'date', render: 'Date' },
                                            {
                                                key: 'fullName',
                                                render: 'Fullname'
                                            },

                                            {
                                                key: 'walletNumber',
                                                render: 'Wallet Number'
                                            },
                                            { key: 'amount', render: 'Amount' },

                                            {
                                                key: 'type',
                                                render: ''
                                            }
                                        ]}
                                        data={[
                                            {
                                                date: '02 Jun 19',
                                                fullName: 'Kunle Afolayan',
                                                amount: 'N200',
                                                walletNumber: '08087948121',
                                                type: (
                                                    <Badge className="badges">
                                                        Deposit
                                                    </Badge>
                                                )
                                            },
                                            {
                                                date: '02 Jun 19',
                                                fullName: 'Kunle Afolayan',
                                                amount: 'N200',
                                                walletNumber: '08087988121',
                                                type: (
                                                    <Badge
                                                        variant="danger"
                                                        className="badges"
                                                    >
                                                        Withdrawal
                                                    </Badge>
                                                )
                                            },
                                            {
                                                date: '02 Jun 19',
                                                fullName: 'Kunle Afolayan',
                                                amount: 'N200',
                                                walletNumber: '09987948121',
                                                type: (
                                                    <Badge
                                                        variant="success"
                                                        className="badges"
                                                    >
                                                        New User
                                                    </Badge>
                                                )
                                            }
                                        ]}
                                    />
                                    <div className={styles.DashboardRightMore}>
                                        <Button icon={<Eye />} variant="flat">
                                            View All transactions
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <div
                                        className={styles.DashboardRightHeader}
                                    >
                                        <h3>TRANSACTION COUNT</h3>
                                        <div
                                            className={
                                                styles.DashboardRightHeader_Dropdown
                                            }
                                        >
                                            <span>Show:</span>
                                            <Button
                                                className={
                                                    styles.DashboardRightHeader_DropdownButton
                                                }
                                                value="weekly"
                                                options={[
                                                    {
                                                        value: 'daily',
                                                        text: 'Daily'
                                                    },
                                                    {
                                                        value: 'weekly',
                                                        text: 'Weekly'
                                                    },
                                                    {
                                                        value: 'pending',
                                                        text: 'Monthly'
                                                    },
                                                    {
                                                        value: 'paused',
                                                        text: 'Yearly'
                                                    }
                                                ]}
                                                dropdown
                                            />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <Chart
                                        dataSource={dataSource}
                                        type="splinearea"
                                        chart={{
                                            caption: '',
                                            yaxisname: '',
                                            subcaption: '',
                                            valueFontSize: '10',
                                            baseFont: 'HelveticaNeue',
                                            valueFont: 'HelveticaNeue',
                                            captionAlignment: 'left',
                                            yaxisminvalue: '0',
                                            xaxisminvalue: '0',
                                            setAdaptiveYMin: '0',
                                            palettecolors:"#109CF1",
                                            theme: 'fusion'
                                        }}
                                    />
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </Content>
        </Fragment>
    )
}
export default Dashboard
