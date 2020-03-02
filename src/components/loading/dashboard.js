import React, { Fragment } from 'react'
import styles from './loading.module.scss'
import ContentLoader from 'react-content-loader'
import { Card, CardBody } from '@kudi-inc/dip'

const Dashboard = () => {
  return (
    <Fragment>
      <div className={styles.header}>
        <ContentLoader
          height={10}
          speed={2}
          primaryColor={'#e3e4e6'}
          secondaryColor={'#fdfdfd'}
        >
          <rect x="0" y="0" rx="2" ry="2" width="50" height="10" />
        </ContentLoader>
      </div>
      <div className={styles.filter}>
        <ContentLoader
          height={10}
          speed={2}
          primaryColor={'#e3e4e6'}
          secondaryColor={'#fdfdfd'}
        >
          <rect x="0" y="0" rx="2" ry="2" width="60" height="10" />
          <rect x="70" y="0" rx="2" ry="2" width="60" height="10" />
        </ContentLoader>
      </div>
      <div className={styles.content}>
        {Array(3)
          .fill()
          .map((_, index) => (
            <Card key={index}>
              <CardBody>
                <ContentLoader
                  height={200}
                  speed={2}
                  primaryColor={'#F0F4F9'}
                  secondaryColor={'#fdfdfd'}
                >
                  <rect x="0" y="0" rx="15" ry="15" width="100" height="30" />
                  <rect x="200" y="10" rx="7" ry="7" width="200" height="12" />
                  <rect x="0" y="80" rx="15" ry="15" width="250" height="30" />
                  <rect x="0" y="150" rx="7" ry="7" width="130" height="12" />
                  <rect x="140" y="150" rx="7" ry="7" width="260" height="12" />
                  <rect x="0" y="170" rx="7" ry="7" width="190" height="12" />
                  <rect x="200" y="170" rx="7" ry="7" width="200" height="12" />
                  <rect x="0" y="190" rx="7" ry="7" width="400" height="12" />
                  <rect x="0" y="240" rx="7" ry="7" width="80" height="14" />
                  <rect x="0" y="260" rx="7" ry="7" width="160" height="14" />
                  <rect x="240" y="240" rx="7" ry="7" width="80" height="14" />
                  <rect x="240" y="260" rx="7" ry="7" width="160" height="14" />
                  <rect x="0" y="300" rx="7" ry="7" width="80" height="14" />
                  <rect x="0" y="320" rx="7" ry="7" width="160" height="14" />
                  <rect x="240" y="300" rx="7" ry="7" width="80" height="14" />
                  <rect x="240" y="320" rx="7" ry="7" width="160" height="14" />
                </ContentLoader>
              </CardBody>
            </Card>
          ))}
      </div>
      <div className={styles.block}>
        {Array(1)
          .fill()
          .map((_, index) => (
            <Card key={index}>
              <CardBody>
                <ContentLoader
                  height={420}
                  speed={2}
                  primaryColor={'#F0F4F9'}
                  secondaryColor={'#fdfdfd'}
                >
                  <rect x="0" y="0" rx="13" ry="13" width="400" height="26" />

                  <rect x="0" y="70" rx="13" ry="13" width="400" height="26" />
                  <rect x="0" y="150" rx="13" ry="13" width="400" height="26" />
                  <rect x="0" y="230" rx="13" ry="13" width="400" height="26" />
                  <rect x="0" y="310" rx="13" ry="13" width="400" height="26" />
                  <rect x="0" y="390" rx="13" ry="13" width="400" height="26" />
                </ContentLoader>
              </CardBody>
            </Card>
          ))}
        {Array(1)
          .fill()
          .map((_, index) => (
            <Card key={index}>
              <CardBody>
                <ContentLoader
                  height={390}
                  speed={2}
                  primaryColor={'#F0F4F9'}
                  secondaryColor={'#fdfdfd'}
                >
                  <rect x="0" y="0" rx="7" ry="7" width="130" height="10" />
                  <rect x="140" y="0" rx="7" ry="7" width="260" height="10" />
                  <rect x="0" y="20" rx="7" ry="7" width="190" height="10" />
                  <rect x="200" y="20" rx="7" ry="7" width="200" height="10" />
                  <rect x="0" y="40" rx="7" ry="7" width="300" height="10" />
                  <rect x="310" y="40" rx="7" ry="7" width="80" height="12" />
                  <rect x="0" y="60" rx="7" ry="7" width="180" height="12" />
                  <rect x="200" y="60" rx="7" ry="7" width="220" height="12" />
                  <rect x="240" y="80" rx="7" ry="7" width="160" height="12" />
                  <rect x="0" y="80" rx="7" ry="7" width="80" height="12" />
                  <rect x="0" y="100" rx="7" ry="7" width="240" height="12" />
                  <rect x="260" y="100" rx="7" ry="7" width="140" height="12" />
                  <rect x="0" y="120" rx="7" ry="7" width="220" height="10" />
                  <rect x="240" y="120" rx="7" ry="7" width="160" height="10" />
                </ContentLoader>
              </CardBody>
            </Card>
          ))}
      </div>
    </Fragment>
  )
}

export default Dashboard
