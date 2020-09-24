import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { ChevronLeft } from 'assets/svg'
import { Header } from 'components/Layout'
import styles from '../Agents/agent-profile.module.scss'
import PlanRevenue from './plan-revenue-log'

const ViewPlanRevenueLog = ({location}) => {
  let history = useHistory()
  let logId = location.state

  return (
    <Fragment>
      <Header>
        <p>
          <ChevronLeft role="button" onClick={() => history.goBack()} />
          Revenue Log
        </p>
      </Header>
      <div className={styles.DivContent}>
        <PlanRevenue minimized={false} id={logId} />
      </div>
    </Fragment>
  )
}

export default ViewPlanRevenueLog
