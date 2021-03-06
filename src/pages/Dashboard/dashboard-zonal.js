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
import { DateFilter } from 'components/Filter'
import { Eye } from 'assets/svg'

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
      <DateFilter />
      <Content className={styles.content}>
        <div className={styles.Dashboard}>
          <div className={styles.DashboardBottom}>
            <div className={styles.DashboardLeft}>
              <Card className={styles.DashboardCard}>
                <CardBody>
                  <div className={styles.Dashboard_flex}>
                    <p>New Agents</p>
                    <span>N/A</span>
                  </div>
                  <div className={styles.Dashboard_flex}>
                    <p>Active Agents</p>
                    <span>N/A</span>
                  </div>
                  <div className={styles.Dashboard_flex}>
                    <p>Inactive Agents</p>
                    <span>N/A</span>
                  </div>
                </CardBody>
                <CardFooter>
                  <div className={cx(styles.Dashboard_flex, styles.footer)}>
                    <p>Total Agents</p>
                    <span> N/A </span>
                  </div>
                </CardFooter>
              </Card>
              <Card className={styles.DashboardCard}>
                <CardBody>
                  <div className={styles.Dashboard_center}>
                    <p>Agent Transactions </p>
                    <h4> N/A </h4>
                  </div>
                </CardBody>
                <CardFooter>
                  <div className={styles.Dashboard_center_footer}>
                    <p> Total Commission - N/A</p>
                  </div>
                </CardFooter>
              </Card>
              <Card className={styles.DashboardCard}>
                <CardBody>
                  <div className={styles.Dashboard_flex}>
                    <p>New Customers</p>
                    <span>N/A</span>
                  </div>
                  <div className={styles.Dashboard_flex}>
                    <p>Active Customers</p>
                    <span>N/A</span>
                  </div>
                  <div className={styles.Dashboard_flex}>
                    <p>Inactive Customers</p>
                    <span>N/A</span>
                  </div>
                  <div className={cx(styles.Dashboard_flex, styles.footer)}>
                    <p>Total Customers</p>
                    <span>N/A</span>
                  </div>
                </CardBody>
                <CardFooter>
                  <div className={styles.Dashboard_center}>
                    <p>Total Savings</p>
                    <h4> N/A</h4>
                  </div>
                </CardFooter>
              </Card>
            </div>
            <div className={styles.DashboardRight}>
              <Card className={styles.DashboardRightCard}>
                <CardHeader>
                  <div className={styles.DashboardRightHeader}>
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
                        type: <Badge className="badges">Deposit</Badge>
                      },
                      {
                        date: '02 Jun 19',
                        fullName: 'Kunle Afolayan',
                        amount: 'N200',
                        walletNumber: '08087988121',
                        type: (
                          <Badge variant="danger" className="badges">
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
                          <Badge variant="success" className="badges">
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
                  <div className={styles.DashboardRightHeader}>
                    <h3>TRANSACTION COUNT</h3>
                    <div className={styles.DashboardRightHeader_Dropdown}>
                      <span>Show:</span>
                      <Button
                        className={styles.DashboardRightHeader_DropdownButton}
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
                    height={220}
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
                      palettecolors: '#109CF1',
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
