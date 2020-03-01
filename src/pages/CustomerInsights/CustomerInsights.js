import React, { Fragment, useState } from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    Button,
    DateRangePicker
} from '@kudi-inc/dip'
import cx from 'classnames'
import Calendar from 'react-calendar'
import moment from 'moment'
import { Header, Content } from 'components/Layout'
import { ProgressBar } from 'components/Common'
import { DownloadIcon } from 'assets/svg'
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
    let [date, setDate] = useState(new Date())
    const [startDate, setStartDate] = useState(moment())
    const [endDate, setEndDate] = useState(moment().add(1, 'months'))
    const [focusedInput, setfocusedInput] = useState(null)

    const onDatesChange = ({ startDate, endDate }) => {
        setStartDate(startDate)
        setEndDate(endDate)
    }

    const onFocusChange = focusedInput => {
        setfocusedInput(focusedInput)
    }
    return (
        <Fragment>
            <Header>
                <p> Customer Insights</p>
            </Header>
            <Content className={styles.content}>
                <div className={styles.CI}>
                    <div className={styles.CIFirst}>
                        <Card>
                            <CardHeader className={styles.CIFirstHeader}>
                                <div className={styles.CIFirstHeaderFlex}>
                                    <h2>65 new customers</h2>
                                    <div className={styles.CIFirstHeaderFlex}>
                                        <div>
                                            <DateRangePicker
                                                onDatesChange={onDatesChange}
                                                onFocusChange={() => false}
                                                displayFormat="DD MMM, YY"
                                                focusedInput={focusedInput}
                                                startDate={startDate}
                                                endDate={endDate}
                                                className={
                                                    styles.CIFirstHeaderFlexDate
                                                }
                                            />
                                        </div>
                                        {/* <div
                                            className={
                                                styles.CIFirstHeaderDropdown
                                            }
                                        >
                                            <span>Show:</span>
                                            <Button
                                                className={
                                                    styles.CIFirstHeaderDropdownButton
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
                                        </div> */}
                                    </div>
                                </div>
                                <ProgressBar
                                    className={cx(
                                        styles.progress,
                                        styles.Progress
                                    )}
                                    percentage={85}
                                />
                            </CardHeader>
                            <CardBody>
                                <Calendar
                                    onChange={date => setDate(date)}
                                    value={date}
                                />
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <Chart
                                    dataSource={dataSource}
                                    type="splinearea"
                                    height={330}
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
                                <div className={styles.CIFlexFooter}>
                                    <Button
                                        variant="flat"
                                        icon={<DownloadIcon />}
                                    >
                                        Dowload Report
                                    </Button>
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
