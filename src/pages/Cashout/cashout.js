import React, { Fragment } from 'react'
import {
    Card,
    CardBody,
    Table,
    ButtonGroup,
    Button,
    Badge
} from '@kudi-inc/dip'
import cx from 'classnames'
import { Header, Content } from 'components/Layout'
import { Eye } from 'assets/svg'
import styles from './cashout.module.scss'
const Cashout = () => (
    <Fragment>
        <Header>
            <p> Cashout </p>
            <ButtonGroup className={styles.ButtonGroup}>
                <Button active>Cash Out Requests</Button>
                <Button>Cash Out History</Button>
            </ButtonGroup>
        </Header>
        <Content className={styles.content}>
            <Card className={styles.contentCard}>
                <CardBody className={styles.Cashout}>
                    <Table
                        className={styles.CashoutTable}
                        column={[
                            { key: 'date', render: 'Date' },
                            {
                                key: 'agentName',
                                render: 'Agent Name'
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
                                agentName: 'Kunle Afolayan',
                                amount: 'N200',
                                walletBalance: 'N19,000,500',
                                status: (
                                    <Badge
                                        variant="warning"
                                        className={styles.CashoutBadge}
                                    >
                                        Pending
                                    </Badge>
                                ),
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
                                amount: 'N19,000,500',
                                walletBalance: 'N2,000',
                                status: (
                                    <Badge
                                        variant="warning"
                                        className={styles.CashoutBadge}
                                    >
                                        Pending
                                    </Badge>
                                ),
                                action: (
                                    <Button
                                        className={styles.CashoutButton}
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
                                walletBalance: 'N2,000',
                                status: (
                                    <Badge
                                        variant="warning"
                                        className={styles.CashoutBadge}
                                    >
                                        Pending
                                    </Badge>
                                ),
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
                                walletBalance: 'N19,000,500',
                                status: (
                                    <Badge
                                        variant="warning"
                                        className={styles.CashoutBadge}
                                    >
                                        Pending
                                    </Badge>
                                ),
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
                                walletBalance: 'N19,800',
                                status: (
                                    <Badge
                                        variant="warning"
                                        className={styles.CashoutBadge}
                                    >
                                        Pending
                                    </Badge>
                                ),
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
                                walletBalance: 'N9,500',
                                status: (
                                    <Badge
                                        variant="warning"
                                        className={styles.CashoutBadge}
                                    >
                                        Pending
                                    </Badge>
                                ),
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
                                walletBalance: 'N19,000,500',
                                status: (
                                    <Badge
                                        variant="warning"
                                        className={styles.CashoutBadge}
                                    >
                                        Pending
                                    </Badge>
                                ),
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
                                walletBalance: 'N19,000,500',
                                status: (
                                    <Badge
                                        variant="warning"
                                        className={styles.CashoutBadge}
                                    >
                                        Pending
                                    </Badge>
                                ),
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
                                walletBalance: 'N19,000,500',
                                status: (
                                    <Badge
                                        variant="warning"
                                        className={styles.CashoutBadge}
                                    >
                                        Pending
                                    </Badge>
                                ),
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
                                walletBalance: 'N19,000,500',
                                status: (
                                    <Badge
                                        variant="warning"
                                        className={styles.CashoutBadge}
                                    >
                                        Pending
                                    </Badge>
                                ),
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
                                walletBalance: 'N19,000,500',
                                status: (
                                    <Badge
                                        variant="warning"
                                        className={styles.CashoutBadge}
                                    >
                                        Pending
                                    </Badge>
                                ),
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
                                walletBalance: 'N19,000,500',
                                status: (
                                    <Badge
                                        variant="warning"
                                        className={styles.CashoutBadge}
                                    >
                                        Pending
                                    </Badge>
                                ),
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
