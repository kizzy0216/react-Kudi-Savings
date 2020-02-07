import React, { Fragment, useState } from 'react'
import { Card, CardBody, CardHeader } from '@kudi-inc/dip'
import { Header, Content } from 'components/Layout'
import { ChevronLeft } from 'assets/svg'
import cx from 'classnames'
import styles from './create-agent.module.scss'
import Form from './fill-info'
import UploadId from './upload-id'
import OTP from './otp'
import AccountSetup from './account-setup'
const CreateAgent = ({ history }) => {
    let [step, setStep] = useState(0)
    let active = [
        {
            index: 0,
            title: 'FILL IN YOUR INFORMATION BELOW',
            content: <Form setStep={setStep} step={step} />
        },
        {
            index: 1,
            title: 'UploaD VALID IDENTITY CARD',
            content: <UploadId setStep={setStep} step={step} />
        },
        {
            index: 2,
            title: 'type in 4 digit otp',
            content: <OTP setStep={setStep} step={step} />
        },
        { index: 2, content: <AccountSetup /> }
    ]
    return (
        <Fragment>
            {active[`${step}`] && (
                <div>
                    <Header>
                        <p>
                            <ChevronLeft
                                role="button"
                                onClick={() => history.goBack()}
                            />
                            Create New Agent
                        </p>
                    </Header>
                    <Content className={styles.content}>
                        <Card className={cx(styles.contentCard, styles.CA)}>
                            <CardHeader className={styles.CAHeader}>
                                <div>{active[`${step}`].title}</div>
                            </CardHeader>
                            <CardBody>{active[`${step}`].content}</CardBody>
                        </Card>
                    </Content>
                </div>
            )}
        </Fragment>
    )
}
export default CreateAgent
