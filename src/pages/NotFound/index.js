import React from 'react'
import { Card, CardBody } from '@kudi-inc/dip'
import styles from './notFound.module.scss'
import { Page404 } from 'assets/svg'
import { Link } from 'react-router-dom'
import { Content } from 'components/Layout'

const NotFound = () => {
  return (
    <Content className={styles.content}>
      <Card className={styles.NotFound}>
        <CardBody className={styles.NotFoundBody}>
          <Page404 />
          <p>
            <Link to="/">
              <button> Go to Dashboard </button>
            </Link>
          </p>
        </CardBody>
      </Card>
    </Content>
  )
}

export default NotFound
