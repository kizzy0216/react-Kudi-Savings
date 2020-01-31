import React, { Fragment, useState } from 'react'
import {
    Card,
    CardBody,
    Button,
    Table,
    CardHeader,
    ButtonGroup
} from '@kudi-inc/dip'
import { useRouteMatch } from 'react-router-dom'
import { Header, Content } from 'components/Layout'
import { ProgressBar } from 'components/Common'
import { Eye } from 'assets/svg'
import styles from './agents.module.scss'
const Agents = ({ history }) => {
    let { url } = useRouteMatch()
    let [active, setActive] = useState('all')
    return (
        <Fragment>
            <Header>
                <p> Agents </p>
                <Button onClick={() => history.push('/create-agent')}>
                    Add new agent
                </Button>
            </Header>
            <Content className={styles.content}>
                <Card className={styles.contentCard}>
                    <CardHeader className={styles.Header}>
                        All
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
                    <CardBody className={styles.Agent}>
                        <Table
                            className={styles.AgentTable}
                            column={[
                                {
                                    key: 'checkbox',
                                    render: <input type="checkbox" />
                                },
                                { key: 'start_date', render: 'Start Date' },
                                {
                                    key: 'agentName',
                                    render: 'Full Name'
                                },
                                { key: 'amount', render: 'Amount' },
                                {
                                    key: 'progress',
                                    render: 'Progress'
                                },
                                {
                                    key: 'action',
                                    render: 'ACTION'
                                }
                            ]}
                            data={[
                                {
                                    start_date: '02 Jun 19',
                                    agentName: 'Kunle Afolayan',
                                    amount: 'N200',

                                    progress: (
                                        <ProgressBar
                                            className={styles.progress}
                                            percentage={70}
                                        />
                                    ),
                                    checkbox: <input type="checkbox" />,
                                    action: (
                                        <Button
                                            className={styles.contentCardButton}
                                            icon={<Eye />}
                                            variant="flat"
                                            onClick={() =>
                                                history.push(`${url}/1234`)
                                            }
                                        >
                                            View
                                        </Button>
                                    )
                                },
                                {
                                    start_date: '02 Jun 19',
                                    agentName: 'Kunle Afolayan',
                                    amount: 'N19,000,500',

                                    checkbox: <input type="checkbox" />,
                                    progress: (
                                        <ProgressBar
                                            className={styles.progress}
                                            percentage={20}
                                        />
                                    ),
                                    action: (
                                        <Button
                                            className={styles.AgentButton}
                                            icon={<Eye />}
                                            variant="flat"
                                            onClick={() =>
                                                history.push(`${url}/1234`)
                                            }
                                        >
                                            View
                                        </Button>
                                    )
                                },

                                {
                                    start_date: '02 Jun 19',
                                    agentName: 'Kunle Afolayan',
                                    amount: 'N200',

                                    checkbox: <input type="checkbox" />,
                                    progress: (
                                        <ProgressBar
                                            className={styles.progress}
                                            percentage={70}
                                        />
                                    ),
                                    action: (
                                        <Button
                                            className={styles.contentCardButton}
                                            icon={<Eye />}
                                            variant="flat"
                                            onClick={() =>
                                                history.push(`${url}/1234`)
                                            }
                                        >
                                            View
                                        </Button>
                                    )
                                },
                                {
                                    start_date: '02 Jun 19',
                                    agentName: 'Kunle Afolayan',
                                    amount: 'N200',
                                    checkbox: <input type="checkbox" />,
                                    progress: (
                                        <ProgressBar
                                            className={styles.progress}
                                            percentage={49}
                                        />
                                    ),
                                    action: (
                                        <Button
                                            className={styles.contentCardButton}
                                            icon={<Eye />}
                                            variant="flat"
                                            onClick={() =>
                                                history.push(`${url}/234`)
                                            }
                                        >
                                            View
                                        </Button>
                                    )
                                },
                                {
                                    start_date: '02 Jun 19',
                                    agentName: 'Kunle Afolayan',
                                    amount: 'N200',

                                    checkbox: <input type="checkbox" />,
                                    progress: (
                                        <ProgressBar
                                            className={styles.progress}
                                            percentage={34}
                                        />
                                    ),
                                    action: (
                                        <Button
                                            className={styles.contentCardButton}
                                            icon={<Eye />}
                                            variant="flat"
                                            onClick={() =>
                                                history.push(`${url}/124`)
                                            }
                                        >
                                            View
                                        </Button>
                                    )
                                },
                                {
                                    start_date: '02 Jun 19',
                                    agentName: 'Kunle Afolayan',
                                    amount: 'N200',

                                    checkbox: <input type="checkbox" />,
                                    progress: (
                                        <ProgressBar
                                            className={styles.progress}
                                            percentage={70}
                                        />
                                    ),
                                    action: (
                                        <Button
                                            className={styles.contentCardButton}
                                            icon={<Eye />}
                                            variant="flat"
                                            onClick={() =>
                                                history.push(`${url}/34`)
                                            }
                                        >
                                            View
                                        </Button>
                                    )
                                },
                                {
                                    start_date: '02 Jun 19',
                                    agentName: 'Kunle Afolayan',
                                    amount: 'N200',

                                    checkbox: <input type="checkbox" />,
                                    progress: (
                                        <ProgressBar
                                            className={styles.progress}
                                            percentage={20}
                                        />
                                    ),
                                    action: (
                                        <Button
                                            className={styles.contentCardButton}
                                            icon={<Eye />}
                                            variant="flat"
                                            onClick={() =>
                                                history.push(`${url}/94`)
                                            }
                                        >
                                            View
                                        </Button>
                                    )
                                },
                                {
                                    start_date: '02 Jun 19',
                                    agentName: 'Kunle Afolayan',
                                    amount: 'N200',

                                    checkbox: <input type="checkbox" />,
                                    progress: (
                                        <ProgressBar
                                            className={styles.progress}
                                            percentage={70}
                                        />
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
                                    start_date: '02 Jun 19',
                                    agentName: 'Kunle Afolayan',
                                    amount: 'N200',
                                    checkbox: <input type="checkbox" />,
                                    progress: (
                                        <ProgressBar
                                            className={styles.progress}
                                            percentage={70}
                                        />
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
                                    start_date: '02 Jun 19',
                                    agentName: 'Kunle Afolayan',
                                    amount: 'N200',
                                    checkbox: <input type="checkbox" />,
                                    progress: (
                                        <ProgressBar
                                            className={styles.progress}
                                            percentage={70}
                                        />
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
                                    start_date: '02 Jun 19',
                                    agentName: 'Kunle Afolayan',
                                    amount: 'N200',
                                    checkbox: <input type="checkbox" />,
                                    progress: (
                                        <ProgressBar
                                            className={styles.progress}
                                            percentage={70}
                                        />
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
}
export default Agents
