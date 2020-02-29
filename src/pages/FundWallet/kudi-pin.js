import React, { Fragment, useState } from 'react'
import { Button, Input, Card, CardHeader } from '@kudi-inc/dip'
import { Close, WalletSuccess, WalletFail, Back } from 'assets/svg'
import { Header, Content } from 'components/Layout'
import styles from './fund-wallet.module.scss'
const KudiPin = ({ history }) => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSuccess, setIsSuccess] = useState(true)
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
                                <div onClick={() => history.goBack()}>
                                    <Back />
                                    <p> Change Amount / Card</p>
                                </div>
                            </CardHeader>

                            <div className={styles.KudiPinBody}>
                                {!isSubmitted && (
                                    <form className={styles.KudiPinBodyForm}>
                                        <Input
                                            type="password"
                                            label="Enter Kudi PIN"
                                            required
                                        />
                                        <div
                                            className={
                                                styles.KudiPinBodyFormSubmit
                                            }
                                        >
                                            <Button
                                                onClick={() =>
                                                    setIsSubmitted(!isSubmitted)
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
                                    </form>
                                )}
                                {isSubmitted && isSuccess && (
                                    <div className={styles.KudiPinBodySuccess}>
                                        <WalletSuccess />
                                        <h2>Wallet Top-Up Successful</h2>
                                        <p>
                                            Your wallet has being credited with
                                            N1,000.00
                                        </p>
                                        <Button
                                            onClick={() => history.goBack()}
                                            type="button"
                                        >
                                            Continue
                                        </Button>
                                    </div>
                                )}
                                {isSubmitted && !isSuccess && (
                                    <div className={styles.KudiPinBodyFail}>
                                        <WalletFail />
                                        <h2>Wallet Top-Up Failed </h2>
                                        <p>
                                            Your wallet wasn’t credited fund
                                            your account & try again.
                                        </p>
                                        <Button>Continue</Button>
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
export default KudiPin
