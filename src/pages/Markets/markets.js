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
import { TableLoading } from 'components/loading'

const Markets = ({ history }) => {
    let { url } = useRouteMatch()
    let [active, setActive] = useState('all')
    let formattedData = []
    const { data, isLoading, error, refetch } = useQuery(
        ['Markets', {}],
        getMarkets
    )

    if (data) {
        formattedData = data.data.data.list.map(
            ({ city, state, lga, id, timeCreated, ...rest }) => ({
                ...rest,
                timeCreated: timeCreated ? timeCreated : 'N/A',
                state: state ? state : 'N/A',
                city: city ? city : 'N/A',
                lga: lga ? lga : 'N/A',
                action: (
                    <Button
                        icon={<Eye />}
                        variant="flat"
                        onClick={() => history.push(`${url}/${id}`)}
                    >
                        View
                    </Button>
                )
            })
        )
    }
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
                        {isLoading && <TableLoading />}

                        {error && (
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
                        )}

                        {data && (
                            <Table
                                className={styles.AgentTable}
                                column={[
                                    {
                                        key: 'name',
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
                                data={formattedData}
                            />
                        )}
                    </CardBody>
                </Card>
            </Content>
        </Fragment>
    )
}
export default Markets
