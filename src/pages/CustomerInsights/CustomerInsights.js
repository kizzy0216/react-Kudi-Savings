import React from 'react'
import { Card, CardHeader, CardBody } from '@kudi-inc/dip'
import styles from './customer-insights.module.scss'
const CustomerInsights= () => {
    return (
        <div>
            <div className={styles.CI}>
                <Card>
                    <CardHeader className={styles.CIHeader}>
                        <p>Customer Insights</p>
                    </CardHeader>

                    <CardBody></CardBody>
                </Card>
            </div>
        </div>
    )
}
export default CustomerInsights