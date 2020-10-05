import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import { Card, CardBody, CardHeader, Button } from '@kudi-inc/dip'
import { SettingsLink, ChevronLeft, Reassign } from 'assets/svg'
import { Header, Content } from 'components/Layout'
import { ProfileLoading } from 'components/loading'
import styles from './markets.module.scss'
import { getSingleMarket } from 'services/markets'

const SingleMarket = ({ history, match: { params } }) => {
  const [show, setShow] = useState(false)
  let market = {}
  const { data, isLoading, error, refetch } = useQuery(
    params && ['SingleMarket', { id: params.id }],
    getSingleMarket
  )
  if (data) {
    market = data.data.data
  }

  return (
    <Fragment>
      <Header>
        <p>
          <ChevronLeft role="button" onClick={() => history.goBack()} />
          Market  
        </p>
      </Header>
      <Content className={styles.content}>
        <div className={styles.contentCard}>
          {isLoading && <ProfileLoading />}
          {error && (
            <span>
              Error!
              <button onClick={() => refetch({ disableThrow: true })}>
                Retry
              </button>
            </span>
          )}
          {data && (
            <div className={styles.SM}>
              <Card>
                <CardHeader className={styles.SMHeader}>
                  <h3> MARKET</h3>

                  <Button
                    variant="flat"
                    onClick={() => setShow(true)}
                    icon={<SettingsLink />}
                  >
                    Edit
                  </Button>
                </CardHeader>
                <CardBody className={styles.SMBody}>
                  <div className={styles.SMBodyList}>
                    <div>
                      <span>Market Name</span>
                      <span> {market.name}</span>
                    </div>
                    {/* <div>
                      <span>Population</span>
                      <span> {market.population}</span>
                    </div> */}
                    <div>
                      <span>City</span>
                      <span> {market.city}</span>
                    </div>
                    <div>
                      <span>Lga</span>
                      <span>{market.lga}</span>
                    </div>
                    <div>
                      <span>State</span>
                      <span>{market.state}</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader className={styles.SMHeader}>
                  <h3> ASSIGNED ZONAL HEADS</h3>
                </CardHeader>
                <CardBody className={styles.SMBody}>
                  <div className={styles.SMBodyList}>
                    <div>
                      <span>Date Created:</span>
                      <span>
                        {' '}
                        {moment(market.timeCreated).format('Do MMM, YYYY')}{' '}
                      </span>
                      <Button variant="flat" icon={<Reassign />}>
                        Reassign
                      </Button>
                      <Button variant="flat" icon={<SettingsLink />}>
                        View Profile
                      </Button>
                    </div>
                    <div>
                      <span>Active Customers: </span>
                      <span> N/A</span>
                      <Button variant="flat" icon={<Reassign />}>
                        Reassign
                      </Button>
                      <Button variant="flat" icon={<SettingsLink />}>
                        View Profile
                      </Button>
                    </div>
                    <div>
                      <span> Inactive Customers </span>
                      <span>N/A</span>
                      <Button variant="flat" icon={<Reassign />}>
                        Reassign
                      </Button>
                      <Button variant="flat" icon={<SettingsLink />}>
                        View Profile
                      </Button>
                    </div>
                    <div>
                      <span> Total Customers </span>
                      <span>N/A</span>
                      <Button variant="flat" icon={<Reassign />}>
                        Reassign
                      </Button>
                      <Button variant="flat" icon={<SettingsLink />}>
                        View Profile
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          )}
        </div>
      </Content>
    </Fragment>
  )
}
export default SingleMarket
