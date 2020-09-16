`import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { ChevronLeft } from 'assets/svg'
import { Header, Content } from 'components/Layout'
import styles from '../Agents/agent-profile.module.scss'
import Collection from './plan-collections'

const ViewPlanCollection = props => {
  let history = useHistory()

  return (
    <Fragment>
      <Header>
        <p>
          <ChevronLeft role="button" onClick={() => history.goBack()} />
          Collections
        </p>
      </Header>
      <div className={styles.DivContent}>
        <Collection minimized={false} />
      </div>
    </Fragment>
  )
}

export default ViewPlanCollection
