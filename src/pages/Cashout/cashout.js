import React, { Fragment } from 'react'
import {
    Card,
    CardBody,
    Table,
    ButtonGroup,
    Button,
    Badge
} from '@kudi-inc/dip'

import { Header, Content } from 'components/Layout'
import { Eye } from 'assets/svg'
import styles from './cashout.module.scss'
const Cashout = () => (
    <Fragment>
        <Header>
            <p> Cashout </p>
            <ButtonGroup>
                <Button active>Cash Out Requests</Button>
                <Button>Cash Out History</Button>
            </ButtonGroup>
        </Header>
        <Content className={styles.content}>
            <Card className={styles.contentCard}>
                <CardBody>
                    <Table
                        column={[
                            { key: 'date', render: 'Date' },
                            {
                                key: 'agentName',
                                render: 'Agent Name'
                            },
                            { key: 'amount', render: "Amount"},
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
                                agentName: 'Kunle Afolayan',
                                amount: 'N200',
                                walletBalance: 'N2000',
                                status: <Badge>PENDING</Badge>,
                                action: (
                                    <Button
                                        className={styles.contentCardButton}
                                        icon={<Eye />}
                                        variant="flat"
                                    >
                                        View
                                    </Button>
                                )
                            },
                            {
                                date: '02 Jun 19',
                                agentName: 'Kunle Afolayan',
                                amount: 'N200',
                                walletBalance: 'N2000',
                                status: <Badge>PENDING</Badge>,
                                action: (
                                    <Button
                                        className={styles.contentCardButton}
                                        icon={<Eye />}
                                        variant="flat"
                                    >
                                        View
                                    </Button>
                                )
                            },
                            {
                                date: '02 Jun 19',
                                agentName: 'Kunle Afolayan',
                                amount: 'N200',
                                walletBalance: 'N2000',
                                status: <Badge>PENDING</Badge>,
                                action: (
                                    <Button
                                        className={styles.contentCardButton}
                                        icon={<Eye />}
                                        variant="flat"
                                    >
                                        View
                                    </Button>
                                )
                            }
                        ]}
                    />
                </CardBody>
            </Card>
        </Content>
    </Fragment>
)

export default Cashout
