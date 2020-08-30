import React, { Fragment } from 'react'
import { Header, Content } from 'components/Layout'
import { ChevronLeft } from 'assets/svg'
import styles from './agent-profile.module.scss'
import Collection from './recent-collections'
import { useHistory } from 'react-router-dom'

const Collections = (props, { match: params }) => {

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

export default Collections
