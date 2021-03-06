import React, { Fragment, useState, useReducer } from 'react'
import { Card, CardBody, CardHeader } from '@kudi-inc/dip'
import { Header, Content } from 'components/Layout'
import { ChevronLeft } from 'assets/svg'
import cx from 'classnames'
import styles from './create-agent.module.scss'
import Form from './fill-info'
import UploadId from './upload-id'
import GUARANTOR from './guarantor'
import AccountSetup from './account-setup'
import { AgentReducer, DefaultAgent } from './agent-reducer'
const CreateAgent = ({ history }) => {
  let [step, setStep] = useState(0)
  const [agent, setAgent] = useReducer(AgentReducer, DefaultAgent)

  const handleAgent = ({ target }) => {
    setAgent({
      type: 'UPDATE_DETAILS',
      payload: { [target.name]: target.value }
    })
  }
  let active = [
    {
      index: 0,
      title: 'FILL IN YOUR INFORMATION BELOW',
      content: (
        <Form
          setStep={setStep}
          step={step}
          handleAgent={handleAgent}
          agent={agent}
          setAgent={setAgent}
        />
      )
    },
    {
      index: 1,
      title: 'FILL IN guarantor details below',
      content: (
        <GUARANTOR
          setStep={setStep}
          step={step}
          setAgent={setAgent}
          agent={agent}
        />
      )
    },
    {
      index: 2,
      title: 'UploaD VALID IDENTITY CARD',
      content: (
        <UploadId
          setStep={setStep}
          step={step}
          handleAgent={handleAgent}
          agent={agent}
          setAgent={setAgent}
          history={history}
        />
      )
    },

    { index: 3, content: <AccountSetup /> }
  ]
  return (
    <Fragment>
      {active[`${step}`] && (
        <div>
          <Header>
            <p>
              <ChevronLeft role="button" onClick={() => history.goBack()} />
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
