import React, { Fragment } from 'react'
import {
    Card,
    CardBody,
    Table,
    ButtonGroup,
    Button,
    Badge
} from '@kudi-inc/dip'
import { useRouteMatch} from 'react-router-dom'
import { Header, Content } from 'components/Layout'
import { Eye } from 'assets/svg'
import styles from './transactions.module.scss'

const Transactions = ({history}) => {
    let { url } = useRouteMatch()
    return (
        <Fragment>
            <Header>
                <p> Transactions </p>
            </Header>
            <Content className={styles.content}>
                <Card className={styles.contentCard}>
                    <CardBody className={styles.Transactions}>
                        <div className={styles.TransactionsHeader}>
                            <Table
                                className={styles.TransactionsTable}
                                column={[
                                    { key: 'date', render: 'Date' },
                                    {
                                        key: 'type',
                                        render: 'Action'
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
                                        type: 'Withdrawal',
                                        amount: 'N200',
                                        walletBalance: 'N19,000,500',
                                        status: (
                                            <Badge
                                                variant="success"
                                                className={
                                                    styles.TransactionsBadge
                                                }
                                            >
                                                Success
                                            </Badge>
                                        ),
                                        action: (
                                            <Button
                                                className={
                                                    styles.contentCardButton
                                                }
                                                icon={<Eye />}
                                                variant="flat"
                                                type="button"
                                                onClick={() => history.push(`${url}/1234`)}
                                            >
                                               View
                                            </Button>
                                        )
                                    },
                                    {
                                        date: '02 Jun 19',
                                        type: 'Withdrawal',
                                        amount: 'N19,000,500',
                                        walletBalance: 'N2,000',
                                        status: (
                                            <Badge
                                                variant="success"
                                                className={
                                                    styles.TransactionsBadge
                                                }
                                            >
                                                Success
                                            </Badge>
                                        ),
                                        action: (
                                            <Button
                                                className={
                                                    styles.TransactionsButton
                                                }
                                                icon={<Eye />}
                                                variant="flat"
                                                onClick={() => history.push(`${url}/1234`)}
                                            >
                                                View
                                            </Button>
                                        )
                                    },
                                    {
                                        date: '02 Jun 19',
                                        type: 'Withdrawal',
                                        amount: 'N200',
                                        walletBalance: 'N2,000',
                                        status: (
                                            <Badge
                                                variant="warning"
                                                className={
                                                    styles.TransactionsBadge
                                                }
                                            >
                                                Pending
                                            </Badge>
                                        ),
                                        action: (
                                            <Button
                                                className={
                                                    styles.contentCardButton
                                                }
                                                icon={<Eye />}
                                                variant="flat"
                                                onClick={() => history.push(`${url}/34`)}
                                            >
                                                View
                                            </Button>
                                        )
                                    },
                                    {
                                        date: '02 Jun 19',
                                        type: 'Withdrawal',
                                        amount: 'N200',
                                        walletBalance: 'N19,000,500',
                                        status: (
                                            <Badge
                                                variant="success"
                                                className={
                                                    styles.TransactionsBadge
                                                }
                                            >
                                                Success
                                            </Badge>
                                        ),
                                        action: (
                                            <Button
                                                className={
                                                    styles.contentCardButton
                                                }
                                                icon={<Eye />}
                                                variant="flat"
                                                onClick={() => history.push(`${url}/134`)}
                                            >
                                                View
                                            </Button>
                                        )
                                    },
                                    {
                                        date: '02 Jun 19',
                                        type: 'Wallet TopUp',
                                        amount: 'N200',
                                        walletBalance: 'N19,800',
                                        status: (
                                            <Badge
                                                variant="warning"
                                                className={
                                                    styles.TransactionsBadge
                                                }
                                            >
                                                Pending
                                            </Badge>
                                        ),
                                        action: (
                                            <Button
                                                className={
                                                    styles.contentCardButton
                                                }
                                                icon={<Eye />}
                                                variant="flat"
                                            >
                                                View
                                            </Button>
                                        )
                                    },
                                    {
                                        date: '02 Jun 19',
                                        type: 'Withdrawal',
                                        amount: 'N200',
                                        walletBalance: 'N9,500',
                                        status: (
                                            <Badge
                                                variant="success"
                                                className={
                                                    styles.TransactionsBadge
                                                }
                                            >
                                                Success
                                            </Badge>
                                        ),
                                        action: (
                                            <Button
                                                className={
                                                    styles.contentCardButton
                                                }
                                                icon={<Eye />}
                                                variant="flat"
                                            >
                                                View
                                            </Button>
                                        )
                                    },
                                    {
                                        date: '02 Jun 19',
                                        type: 'Withdrawal',
                                        amount: 'N200',
                                        walletBalance: 'N19,000,500',
                                        status: (
                                            <Badge
                                                variant="danger"
                                                className={
                                                    styles.TransactionsBadge
                                                }
                                            >
                                                Failed
                                            </Badge>
                                        ),
                                        action: (
                                            <Button
                                                className={
                                                    styles.contentCardButton
                                                }
                                                icon={<Eye />}
                                                variant="flat"
                                            >
                                                View
                                            </Button>
                                        )
                                    },
                                    {
                                        date: '02 Jun 19',
                                        type: 'Wallet TopUp',
                                        amount: 'N200',
                                        walletBalance: 'N19,000,500',
                                        status: (
                                            <Badge
                                                variant="warning"
                                                className={
                                                    styles.TransactionsBadge
                                                }
                                            >
                                                Pending
                                            </Badge>
                                        ),
                                        action: (
                                            <Button
                                                className={
                                                    styles.contentCardButton
                                                }
                                                icon={<Eye />}
                                                variant="flat"
                                            >
                                                View
                                            </Button>
                                        )
                                    },
                                    {
                                        date: '02 Jun 19',
                                        type: 'Agent Cash Out',
                                        amount: 'N200',
                                        walletBalance: 'N19,000,500',
                                        status: (
                                            <Badge
                                                variant="success"
                                                className={
                                                    styles.TransactionsBadge
                                                }
                                            >
                                                Success
                                            </Badge>
                                        ),
                                        action: (
                                            <Button
                                                className={
                                                    styles.contentCardButton
                                                }
                                                icon={<Eye />}
                                                variant="flat"
                                            >
                                                View
                                            </Button>
                                        )
                                    },
                                    {
                                        date: '02 Jun 19',
                                        type: 'Withdrawal',
                                        amount: 'N200',
                                        walletBalance: 'N19,000,500',
                                        status: (
                                            <Badge
                                                variant="success"
                                                className={
                                                    styles.TransactionsBadge
                                                }
                                            >
                                                Success
                                            </Badge>
                                        ),
                                        action: (
                                            <Button
                                                className={
                                                    styles.contentCardButton
                                                }
                                                icon={<Eye />}
                                                variant="flat"
                                            >
                                                View
                                            </Button>
                                        )
                                    },
                                    {
                                        date: '02 Jun 19',
                                        type: 'Withdrawal',
                                        amount: 'N200',
                                        walletBalance: 'N19,000,500',
                                        status: (
                                            <Badge
                                                variant="danger"
                                                className={
                                                    styles.TransactionsBadge
                                                }
                                            >
                                                Failed
                                            </Badge>
                                        ),
                                        action: (
                                            <Button
                                                className={
                                                    styles.contentCardButton
                                                }
                                                icon={<Eye />}
                                                variant="flat"
                                            >
                                                View
                                            </Button>
                                        )
                                    },
                                    {
                                        date: '02 Jun 19',
                                        type: 'Withdrawal',
                                        amount: 'N200',
                                        walletBalance: 'N19,000,500',
                                        status: (
                                            <Badge
                                                variant="warning"
                                                className={
                                                    styles.TransactionsBadge
                                                }
                                            >
                                                Pending
                                            </Badge>
                                        ),
                                        action: (
                                            <Button
                                                className={
                                                    styles.contentCardButton
                                                }
                                                icon={<Eye />}
                                                variant="flat"
                                            >
                                                View
                                            </Button>
                                        )
                                    }
                                ]}
                            />
                        </div>
                    </CardBody>
                </Card>
            </Content>
        </Fragment>
    )
}

export default Transactions
