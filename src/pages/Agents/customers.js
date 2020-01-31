import React, { useState } from 'react'
import { Table, Card, CardHeader, Button, ButtonGroup } from '@kudi-inc/dip'
import { useRouteMatch } from 'react-router-dom'
import { Eye } from 'assets/svg'
import styles from './agents.module.scss'
const Customers = ({ history }) => {
    let { url } = useRouteMatch()
    let [active, setActive] = useState('all')
    return (
        <div>
            <Card>
                <CardHeader className={styles.Header}>
                    Customers
                    <ButtonGroup>
                        <Button
                            active={active === 'all'}
                            onClick={() => setActive('all')}
                        >
                            All
                        </Button>
                        <Button
                            active={active === 'highest'}
                            onClick={() => setActive('highest')}
                        >
                            Highest
                        </Button>
                        <Button
                            active={active === 'highest'}
                            onClick={() => setActive('highest')}
                        >
                            Lowest
                        </Button>
                    </ButtonGroup>
                </CardHeader>

                <Table
                    className={styles.CashoutTable}
                    column={[
                        {
                            key: 'fullName',
                            render: 'Full Name'
                        },
                        { key: 'phoneNumber', render: 'Phone Number' },
                        {
                            key: 'walletNumber',
                            render: 'Current Balance'
                        },

                        {
                            key: 'savingsPlan',
                            render: 'Savings Plan'
                        },
                        { key: 'withdrawals', render: 'Withdrawals' },

                        {
                            key: 'action',
                            render: ''
                        }
                    ]}
                    data={[
                        {
                            fullName: 'Kunle Afolayan',
                            withdrawals: 'N200',
                            walletNumber: 'N19,000,500',
                            savingsPlan: '1',
                            action: (
                                <Button
                                    className={styles.contentCardButton}
                                    icon={<Eye />}
                                    variant="flat"
                                    onClick={() => history.push(`${url}/1234`)}
                                >
                                    View
                                </Button>
                            )
                        },
                        {
                            fullName: 'Kunle Afolayan',
                            withdrawals: 'N19,000,500',
                            walletNumber: 'N2,000',
                            savingsPlan: '1',
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
                            fullName: 'Kunle Afolayan',
                            withdrawals: 'N200',
                            walletNumber: 'N2,000',
                            savingsPlan: '1',
                            action: (
                                <Button
                                    className={styles.contentCardButton}
                                    icon={<Eye />}
                                    variant="flat"
                                    onClick={() => history.push(`${url}/1234`)}
                                >
                                    View
                                </Button>
                            )
                        },
                        {
                            fullName: 'Kunle Afolayan',
                            withdrawals: 'N200',
                            walletNumber: 'N19,000,500',
                            savingsPlan: '1',
                            action: (
                                <Button
                                    className={styles.contentCardButton}
                                    icon={<Eye />}
                                    variant="flat"
                                    onClick={() => history.push(`${url}/1234`)}
                                >
                                    View
                                </Button>
                            )
                        },
                        {
                            fullName: 'Kunle Afolayan',
                            withdrawals: 'N200',
                            walletNumber: 'N19,800',
                            savingsPlan: '1',
                            action: (
                                <Button
                                    className={styles.contentCardButton}
                                    icon={<Eye />}
                                    variant="flat"
                                    onClick={() => history.push(`${url}/234`)}
                                >
                                    View
                                </Button>
                            )
                        },
                        {
                            fullName: 'Kunle Afolayan',
                            withdrawals: 'N200',
                            walletNumber: 'N9,500',
                            savingsPlan: '1',
                            action: (
                                <Button
                                    className={styles.contentCardButton}
                                    icon={<Eye />}
                                    variant="flat"
                                    onClick={() => history.push(`${url}/124`)}
                                >
                                    View
                                </Button>
                            )
                        },
                        {
                            fullName: 'Kunle Afolayan',
                            withdrawals: 'N200',
                            walletNumber: 'N19,000,500',
                            savingsPlan: '1',
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
                            fullName: 'Kunle Afolayan',
                            withdrawals: 'N200',
                            walletNumber: 'N19,000,500',
                            savingsPlan: '1',
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
                            fullName: 'Kunle Afolayan',
                            withdrawals: 'N200',
                            walletNumber: 'N19,000,500',
                            savingsPlan: '1',
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
                            fullName: 'Kunle Afolayan',
                            withdrawals: 'N200',
                            walletNumber: 'N19,000,500',
                            savingsPlan: '1',
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
                            fullName: 'Kunle Afolayan',
                            withdrawals: 'N200',
                            walletNumber: 'N19,000,500',
                            savingsPlan: '1',
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
                            fullName: 'Kunle Afolayan',
                            withdrawals: 'N200',
                            walletNumber: 'N19,000,500',
                            savingsPlan: '1',
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
            </Card>
        </div>
    )
}
export default Customers
