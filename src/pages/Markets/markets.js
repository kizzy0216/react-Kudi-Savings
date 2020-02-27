import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
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
import { Eye, Add } from 'assets/svg'
import styles from './markets.module.scss'
import { getMarkets } from 'services/markets'

const Markets = ({ history }) => {
    let { url } = useRouteMatch()
    let [active, setActive] = useState('all')

    const {
        data,
        isLoading,
        isFetching,
        error,
        failureCount,
        refetch
    } = useQuery(['Markets', {}], getMarkets)
    console.log(data, 'hmm')
    return (
        <Fragment>
            <Header>
                <p> Markets </p>
                <Button
                    variant="flat"
                    icon={<Add />}
                    onClick={() => history.push('/create-market')}
                >
                    Add New Market
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
                        {isLoading ? (
                            <span>
                                Loading... (Attempt: {failureCount + 1})
                            </span>
                        ) : error ? (
                            <span>
                                Error!
                                <button
                                    onClick={() =>
                                        refetch({ disableThrow: true })
                                    }
                                >
                                    Retry
                                </button>
                            </span>
                        ) : (
                            <Table
                                className={styles.AgentTable}
                                column={[
                                    {
                                        key: 'checkbox',
                                        render: <input type="checkbox" />
                                    },
                                    {
                                        key: 'marketName',
                                        render: 'Market Name'
                                    },
                                    {
                                        key: 'timeCreated',
                                        render: 'Time Created'
                                    },
                                    { key: 'city', render: 'City' },

                                    { key: 'state', render: 'State' },
                                    {
                                        key: 'lga',
                                        render: 'LGA'
                                    },
                                    {
                                        key: 'action',
                                        render: 'ACTION'
                                    }
                                ]}
                                data={data && data.data.list}
                            />
                        )}
                    </CardBody>
                </Card>
            </Content>
        </Fragment>
    )
}
export default Markets
