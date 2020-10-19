import React, { Fragment } from 'react'
import { useQuery } from 'react-query'
import { Card, CardBody, CardFooter, Button, CardHeader } from '@kudi-inc/dip'
import styles from './loan-manager-details.module.scss'
import AgentImg from 'assets/svg/profile-pic.svg'
import { fecthImage } from 'utils/function'
import { SettingsLink, Bin } from 'assets/svg'
import cx from 'classnames'
import { ProfileLoading } from 'components/loading'
import { getLoanManager } from 'services/loan-manager'
import { Header, Content } from 'components/Layout'

const LoanManagerDetails = ({ id }) => {
  const { data: loanManager, isLoading, error, refetch } = useQuery(
    [
      'LoanManager',
      {
        id
      }
    ],
    getLoanManager
  )

  let agent = loanManager?.data?.data ?? {}

  const { data: imageData } = useQuery(
    loanManager && agent.pictureId && ['Image', { id: agent.pictureId }],
    fecthImage
  )

  return (
    <Fragment>
      <Header className={styles.Header}>
        <h4>Loan Manager Profile</h4>
      </Header>
      <Content className={cx(styles.content, styles.CA)}>
        {isLoading && <ProfileLoading />}
        {error && (
          <span>
            Error!
            <button onClick={() => refetch({ disableThrow: true })}>
              Retry
            </button>
          </span>
        )}
        {loanManager?.data && (
          <Card className={styles.Details}>
            <CardHeader className={styles.DetailsHeader}>
              <h5> LOAN MANAGER DETAILS</h5>
            </CardHeader>
            <CardBody className={styles.DetailsBody}>
              <div className={styles.DetailsBodyGrid}>
                <div className={styles.DetailsBodyGridProfile}>
                  <img
                    className={styles.DetailsBodyGridProfileImg}
                    src={imageData?.data?.medium || AgentImg}
                    alt="agent"
                  />
                </div>
                <div>
                  <div className={styles.DetailsBodyGridContent}>
                    <span>Name</span>
                    <span>{`${agent.firstName} ${agent.lastName}`}</span>
                  </div>
                  <div className={styles.DetailsBodyGridContent}>
                    <span> Phone Number </span>
                    <span>{agent.phoneNumber || '-'}</span>
                  </div>
                  <div className={styles.DetailsBodyGridContent}>
                    <span> Gender </span>
                    <span>{agent.gender || '-'}</span>
                  </div>
                  <div className={styles.DetailsBodyGridContent}>
                    <span> Address </span>
                    <span>{agent.address || '-'}</span>
                  </div>
                </div>
              </div>
            </CardBody>
            <CardFooter className={styles.DetailsFooterButton}>
              <Button variant="flat" icon={<SettingsLink />}>
                Edit Profile
              </Button>
              <Button variant="flat" icon={<Bin />}>
                Suspend
              </Button>
            </CardFooter>
          </Card>
        )}
      </Content>
    </Fragment>
  )
}

export default LoanManagerDetails
