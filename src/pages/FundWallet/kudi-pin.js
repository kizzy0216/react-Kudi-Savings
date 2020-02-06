import React, { Fragment } from 'react'
import styles from './fund-wallet.module.scss'
import { Button, Input, Card, CardHeader } from '@kudi-inc/dip'
import { Close, WalletSuccess, WalletFail } from 'assets/svg'

import { Header, Content } from 'components/Layout'
const KudiPin = () => {
    return (
        <Fragment>
            <Header>
                <p> Kudi Pin</p>
            </Header>
            <Content className={styles.content}>
                <Card className={styles.contentCard}>
                    <div className={styles.KudiPin}>
                        <div>
                            <CardHeader className={styles.KudiPinHeader}>
                                <p> Change Amount / Card</p>
                            </CardHeader>

                            <div className={styles.KudiPinBody}>
                                <form className={styles.KudiPinBodyForm}>
                                    <Input
                                        type="password"
                                        label="Enter Kudi PIN"
                                    />
                                    <div
                                        className={styles.KudiPinBodyFormSubmit}
                                    >
                                        <Button type="button">Continue</Button>
                                        <Button
                                            icon={<Close />}
                                            variant="flat"
                                            type="button"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                                <div className={styles.KudiPinBodySuccess}>
                                    <WalletSuccess />
                                    <h2>Wallet Top-Up Successful</h2>
                                    <p>
                                        Your wallet has being credited with
                                        N1,000.00
                                    </p>
                                    <Button>Continue</Button>
                                </div>
                                <div className={styles.KudiPinBodyFail}>
                                    <WalletFail />
                                    <h2>Wallet Top-Up Failed </h2>
                                    <p>
                                        Your wallet wasn’t credited fund your
                                        account & try again.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </Content>
        </Fragment>
    )
}
export default KudiPin
