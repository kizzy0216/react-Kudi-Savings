import React, { Fragment } from 'react'
import { Card, CardBody, CardHeader, Button, Badge } from '@kudi-inc/dip'
import { Header, Content } from 'components/Layout'
import styles from './customer-insights.module.scss'
import Chart from 'components/Chart'

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
const dataSourceDonut = [
    {
        label: 'Food',
        value: '285040'
    },
    {
        label: 'Electronics',
        value: '105070'
    },
    {
        label: 'Household',
        value: '49100'
    }
]
const CustomerInsights = () => {
    return (
        <Fragment>
            <Header>
                <p> Customer Insights</p>
            </Header>
            <Content className={styles.content}>
                <div className={styles.CI}>
                    <div className={styles.CIFirst}>
                        <Card>
                            <CardHeader></CardHeader>
                        </Card>
                        <Card>
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
                                        palettecolors: '#109CF1',
                                        theme: 'fusion'
                                    }}
                                />
                            </CardBody>
                        </Card>
                    </div>
                    <div className={styles.CISecond}>
                        <Card>
                            <CardBody>
                                <div className={styles.CIFlex}>
                                    <span className={styles.CIHeader}>
                                        Savings
                                    </span>
                                </div>
                                <div className={styles.CIFlex}>
                                    <span>New Plans</span>
                                    <span>67</span>
                                </div>

                                <div className={styles.CIFlex}>
                                    <span>Active Plans</span>
                                    <span>320</span>
                                </div>

                                <div className={styles.CIFlex}>
                                    <span>Inactive Plans</span>
                                    <span>76</span>
                                </div>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader className={styles.CIHeader}>
                                CUSTOMERS
                            </CardHeader>
                            <CardBody>
                                <Chart
                                    type="doughnut2d"
                                    width="100%"
                                    chart={{
                                        caption: '',
                                        yaxisname: '',
                                        subcaption: '',
                                        valueFontSize: '10',
                                        baseFont: 'HelveticaNeue',
                                        valueFont: 'HelveticaNeue',
                                        enableSmartLabels: '0',
                                        pieRadius: '100',
                                        doughnutRadius: '90',
                                        showLegend: '0',
                                        showLabels: '0',
                                        palettecolors:
                                            '#F7685B,#2ED47A,#FFB946',
                                        theme: 'fusion'
                                    }}
                                    dataFormat="JSON"
                                    dataSource={dataSourceDonut}
                                />
                                <div className={styles.CIFlex}>
                                    <span>New </span>
                                    <span>67</span>
                                </div>

                                <div className={styles.CIFlex}>
                                    <span>Active</span>
                                    <span>320</span>
                                </div>

                                <div className={styles.CIFlex}>
                                    <span>Inactive</span>
                                    <span>76</span>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </Content>
        </Fragment>
    )
}

export default CustomerInsights
