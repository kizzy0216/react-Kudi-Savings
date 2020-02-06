import React, { Fragment, useState } from 'react'
import styles from './fund-wallet.module.scss'
import { Button, Input, ButtonGroup, Card, CardHeader } from '@kudi-inc/dip'
import { Verve, Close, Bank, CardIcon } from 'assets/svg'
import Visa from 'assets/images/visa.png'
import MasterCard from 'assets/images/mastercard.png'
import { Header, Content } from 'components/Layout'
const FundWallet = ({ history, match }) => {
    const [type, setType] = useState('card')
    const [walletType, setWalletType] = useState('wallet')
    return (
        <Fragment>
            <Header>
                <p> Fund Wallet</p>
            </Header>
            <Content className={styles.content}>
                <Card className={styles.contentCard}>
                    <div className={styles.FundWallet}>
                        <div>
                            <CardHeader className={styles.FundWalletHeader}>
                                <div className={styles.FundWalletHeaderTab}>
                                    <Button
                                        variant="flat"
                                        onClick={() => setType('card')}
                                        className={
                                            type === 'class'
                                                ? styles.FundWalletHeaderTabActive
                                                : ''
                                        }
                                        icon={<CardIcon />}
                                    >
                                        With Card
                                    </Button>
                                    <Button
                                        variant="flat"
                                        onClick={() => setType('bank')}
                                        className={
                                            type === 'bank'
                                                ? styles.FundWalletHeaderTabActive
                                                : ''
                                        }
                                        icon={<Bank />}
                                    >
                                        With Bank
                                    </Button>
                                </div>
                                <p> Wallet Balance - N980.00</p>
                            </CardHeader>

                            <div className={styles.FundWalletBody}>
                                <div>
                                    <ButtonGroup className={styles.ButtonGroup}>
                                        <Button
                                            active={walletType === 'wallet'}
                                            onClick={() =>
                                                setWalletType('wallet')
                                            }
                                        >
                                            My Wallet
                                        </Button>
                                        <Button
                                            active={
                                                walletType === 'agent-wallet'
                                            }
                                            onClick={() =>
                                                setWalletType('agent-wallet')
                                            }
                                        >
                                            Agent’s Wallet
                                        </Button>
                                    </ButtonGroup>
                                </div>
                                {walletType === 'wallet' && (
                                    <div>
                                        <div
                                            className={
                                                styles.FundWalletBodyInput
                                            }
                                        >
                                            <Input
                                                type="number"
                                                label="Enter number"
                                            />
                                        </div>
                                        <div
                                            className={
                                                styles.FundWalletBodyCard
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.FundWalletBodyFlex
                                                }
                                            >
                                                <div>Choose A Card</div>
                                                <div>
                                                    <Button
                                                        variant="flat"
                                                        icon={<CardIcon />}
                                                    >
                                                        Add A New Card
                                                    </Button>
                                                </div>
                                            </div>
                                            <div>
                                                <div
                                                    className={
                                                        styles.FundWalletBodyCardList
                                                    }
                                                >
                                                    <div></div>
                                                    <Verve />
                                                </div>
                                                <div
                                                    className={
                                                        styles.FundWalletBodyCardList
                                                    }
                                                >
                                                    <div></div>
                                                    <img
                                                        src={MasterCard}
                                                        alt="mastercard"
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        styles.FundWalletBodyCardList
                                                    }
                                                >
                                                    <div></div>
                                                    <img
                                                        src={Visa}
                                                        alt="Visa"
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    styles.FundWalletBodyCardSubmit
                                                }
                                            >
                                                <Button
                                                    onClick={() =>
                                                        history.push(
                                                            `${match.url}/enter-pin`
                                                        )
                                                    }
                                                    type="button"
                                                >
                                                    Continue
                                                </Button>
                                                <Button
                                                    icon={<Close />}
                                                    variant="flat"
                                                    type="button"
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {walletType === 'agent-wallet' && (
                                    <div>
                                        <div
                                            className={
                                                styles.FundWalletBodyInput
                                            }
                                        >
                                            <Input
                                                type="number"
                                                label="Enter number"
                                            />
                                            <Input
                                                type="text"
                                                label="Wallet number"
                                                value=""
                                            />
                                            <Input
                                                type="text"
                                                label="Name"
                                                placeholder=""
                                                value="Abiodun Toluwanimi Samuel"
                                                disabled
                                            />
                                            <div
                                                className={
                                                    styles.FundWalletBodyCardSubmit
                                                }
                                            >
                                                <Button
                                                    onClick={() =>
                                                        history.push(
                                                            `${match.url}/enter-pin`
                                                        )
                                                    }
                                                    type="button"
                                                >
                                                    Continue
                                                </Button>
                                                <Button
                                                    icon={<Close />}
                                                    variant="flat"
                                                    type="button"
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Card>
            </Content>
        </Fragment>
    )
}
export default FundWallet
