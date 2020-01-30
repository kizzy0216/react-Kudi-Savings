import React, { Fragment } from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    Button,
    Badge,
    CardFooter,
    Table
} from '@kudi-inc/dip'
import { SettingsLink, Bin, Eye } from 'assets/svg'
import { Header, Content } from 'components/Layout'
import styles from './profile.module.scss'
import AgentImg from 'assets/images/agent.png'
const ViewCashout = () => {
    return (
        <Fragment>
            <Header>
                <p> Agent Profile </p>
            </Header>
            <Content className={styles.content}>
                <div className={styles.contentCard}>
                    <div className={styles.First}>
                        <Card>
                            <CardHeader>
                                <div className={styles.FirstHeader}>
                                    <h3> ZA INFORMATION</h3>

                                    <Button
                                        variant="flat"
                                        icon={<SettingsLink />}
                                    >
                                        Edit Profile
                                    </Button>
                                    <Button variant="flat" icon={<Bin />}>
                                        Suspend Agent
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardBody className={styles.FirstBody}>
                                <div className={styles.FirstBodyGrid}>
                                    <div
                                        className={styles.FirstBodyGridProfile}
                                    >
                                        <img
                                            className={
                                                styles.FirstBodyGridProfileImg
                                            }
                                            src={AgentImg}
                                            alt="agent"
                                        />
                                    </div>
                                    <div>
                                        <div
                                            className={
                                                styles.FirstBodyGridContent
                                            }
                                        >
                                            <span>Name</span>
                                            <span> Firstname Lastname</span>
                                        </div>
                                        <div
                                            className={
                                                styles.FirstBodyGridContent
                                            }
                                        >
                                            <span>Phone number</span>
                                            <span> 08062361452</span>
                                        </div>
                                        <div
                                            className={
                                                styles.FirstBodyGridContent
                                            }
                                        >
                                            <span>Gender</span>
                                            <span>Male</span>
                                        </div>

                                        <div
                                            className={
                                                styles.FirstBodyGridContent
                                            }
                                        >
                                            <span>Address</span>
                                            <span>Streetname, lga, state</span>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                <div className={styles.FirstHeader}>
                                    <h3> Cashout</h3>

                                    <Badge
                                        className={styles.FirstHeaderBadge}
                                        variant="success"
                                    >
                                        Success
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardBody className={styles.FirstBody}>
                                <div className={styles.FirstBodyFlex}>
                                    <span>Date</span>
                                    <span> 2 June, 2019</span>
                                </div>
                                <div className={styles.FirstBodyFlex}>
                                    <span>Amount</span>
                                    <span> ₦100,000</span>
                                </div>
                                <div className={styles.FirstBodyFlex}>
                                    <span> Reference ID</span>
                                    <span>
                                        AAP-DSTV-A2022-1a56c83e-a11a-4612-b2b3-bb3c1b376ef6
                                    </span>
                                </div>
                            </CardBody>
                            <CardFooter className={styles.FirstBodyButton}>
                                <Button
                                    variant="flat"
                                    type="button"
                                    icon={<Eye />}
                                >
                                    {' '}
                                    View
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className={styles.Second}>
                        <Card>
                            <CardHeader>
                                <div className={styles.SecondHeader}>
                                    <h3> CUSTOMER CASH OUT REQUEST</h3>
                                </div>
                            </CardHeader>
                            <CardBody>
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
                                   
                                },
                               
                            ]}
                        />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </Content>
        </Fragment>
    )
}
export default ViewCashout
