import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import { Dialog, toaster, SideSheet } from 'evergreen-ui'
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Input
} from '@kudi-inc/dip'
import { getCollection } from 'services/collections'
import { Close, ChevronLeft, Eye } from 'assets/svg'
import { Header, Content } from 'components/Layout'
import styles from '../Cashout/view-cashout.module.scss'
import AgentImg from 'assets/svg/profile-pic.svg'
import { ProfileLoading } from 'components/loading'
import { formatCurrency, formatText, fecthImage } from 'utils/function'


const TransactionDetails = ({ history, match: { params } }) =>
{

    const { data, isLoading, error, refetch } = useQuery(
        ['Collection', { id: params.id }],
        getCollection
      )
    
      let collection = data?.data?.data || {}
      console.log(JSON.stringify(collection))
  
      const { data: imageData } = useQuery(
        ['Image', { id: collection?.user?.pictureId }],
        fecthImage
      )

      return(
        <Fragment>
          <Header>
            <p>
              <ChevronLeft onClick={() => history.goBack()} /> Transaction Details
            </p>
          </Header>
          <Content className={styles.content}>
            {isLoading && <ProfileLoading />}
            {error && (
              <div>
                Error!
                <Button onClick={() => refetch({ disableThrow: true })}>
                  Retry
                </Button>
              </div>
            )}
       {data && (
          <div className={styles.contentCard}>
            <div className={styles.First}>
            <Card>
                <CardHeader>
                  <div className={styles.FirstHeader}>
                    <h3> AGENT INFORMATION </h3>
                  </div>
                </CardHeader>
                <CardBody className={styles.FirstBody}>
                  <div className={styles.FirstBodyGrid}>
                    <div className={styles.FirstBodyGridProfile}>
                      <img
                        className={styles.FirstBodyGridProfileImg}
                        src={imageData?.data?.medium || AgentImg}
                        alt="agent"
                      />
                    </div>
                    <div>
                      <div className={styles.FirstBodyGridContent}>
                        <span>Name</span>
                        <span>
                          {collection.agent &&
                            formatText(collection.agent.firstName)}{' '}
                          {collection.user &&
                            formatText(collection.agent.lastName)}
                        </span>
                      </div>
                      <div className={styles.FirstBodyGridContent}>
                        <span>Phone number</span>
                        <span>
                          {collection.agent &&
                            formatText(collection.agent.phoneNumber)}
                        </span>
                      </div>
                      <div className={styles.FirstBodyGridContent}>
                        <span>Gender</span>
                        <span>
                          {collection.agent &&
                            formatText(collection.agent.gender)}
                        </span>
                      </div>

                      <div className={styles.FirstBodyGridContent}>
                        <span>Address</span>
                        
                        <span>
                          {collection.agent && formatText(collection.agent.address)}
                       </span>  
                       <span>
                          {collection.agent && formatText(collection.agent.lga)}/
                          {collection.agent && formatText(collection.agent.state)}
                        </span>
                        
                      </div>
                      <div className={styles.FirstBodyGridContent}>
                        <span>Assigned Market</span>
                        <span>
                          {collection.agent && collection.agent.assignedMarket &&
                            formatText(collection.agent.assignedMarket.name)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <div className={styles.FirstHeader}>
                    <h3> SAVINGS</h3>

                    <Badge
                      className={styles.FirstHeaderBadge}
                      variant={
                        collection &&
                        collection.userPlan &&
                        collection.userPlan.planStatus === 'ACTIVE'
                          ? 'success'
                          : 'danger'
                      }
                    >
                      {formatText(collection.userPlan.planStatus)}
                    </Badge>
                  </div>
                </CardHeader>
                </Card>
          </div>
          </div>)}
          </Content>
        </Fragment>  
      )
    
}
export default TransactionDetails