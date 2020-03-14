import React, { Fragment, useContext, useState } from 'react'
import { Card, CardBody, CardHeader, Button, Badge } from '@kudi-inc/dip'
import moment from 'moment'
import { SideSheet } from 'evergreen-ui'
import { Header, Content } from 'components/Layout'
import styles from './settings.module.scss'
import AuthContext from 'context/AuthContext'
import userImg from 'assets/svg/profile-pic.svg'
import { SettingsLink, Pencil } from 'assets/svg'
import ChangePassword from './change-password'
import EditProfile from './edit-profile'
const Settings = ({ history }) => {
  const [auth] = useContext(AuthContext)
  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  return (
    <Fragment>
      <Header>
        <p> Settings </p>
      </Header>
      <Content className={styles.content}>
        <div className={styles.Settings}>
          <Card>
            <CardHeader className={styles.SettingsHeader}>
              <h3> Account Information</h3>
              <div>
                <Button
                  variant="flat"
                  onClick={() => setShow(true)}
                  icon={<SettingsLink />}
                >
                  Change password
                </Button>
                <Button
                  variant="flat"
                  onClick={() => setShowEdit(true)}
                  icon={<Pencil />}
                >
                  Edit Profile
                </Button>
              </div>
            </CardHeader>
            {auth.type === 'ADMIN' && (
              <CardBody>
                <div className={styles.SettingsBody}>
                  <div className={styles.SettingsBodyProfile}>
                    <img
                      className={styles.SettingsBodyProfileImg}
                      src={userImg}
                      alt="user"
                    />
                  </div>
                  <div>
                    <div className={styles.SettingsBodyContent}>
                      <span>Name</span>
                      <span>{auth.username}</span>
                    </div>
                    <div className={styles.SettingsBodyContent}>
                      <span>Address</span>
                      <span>Kudi HQ</span>
                    </div>
                    <div className={styles.SettingsBodyContent}>
                      <span>User Role</span>
                      <span>
                        <Badge>{auth.type}</Badge>
                      </span>
                    </div>
                    <div className={styles.SettingsBodyContent}>
                      <span>Date Onboarded</span>
                      <span>
                        {moment(auth.timeCreated).format('Do MMM, YYYY')}
                      </span>
                    </div>
                  </div>
                </div>
              </CardBody>
            )}
            {auth.type === 'ZONAL' && (
              <CardBody>
                <div className={styles.SettingsBody}>
                  <div className={styles.SettingsBodyProfile}>
                    <img
                      className={styles.SettingsBodyProfileImg}
                      src={userImg}
                      alt="user"
                    />
                  </div>
                  <div>
                    <div className={styles.SettingsBodyContent}>
                      <span>Name</span>
                      <span>
                        {`${auth && auth.lastName ? auth.lastName : ''} ${
                          auth && auth.firstName ? auth.firstName : ''
                        }`}
                      </span>
                    </div>
                    <div className={styles.SettingsBodyContent}>
                      <span>Phone number</span>
                      <span>{auth.phoneNumber}</span>
                    </div>
                    <div className={styles.SettingsBodyContent}>
                      <span>Gender</span>
                      <span>{auth.gender}</span>
                    </div>

                    <div className={styles.SettingsBodyContent}>
                      <span>Address</span>
                      <span>{auth.address}</span>
                    </div>
                    <div className={styles.SettingsBodyContent}>
                      <span>User Role</span>
                      <span>
                        <Badge>{auth.type}</Badge>
                      </span>
                    </div>
                    <div className={styles.SettingsBodyContent}>
                      <span>Date Onboarded</span>
                      <span>
                        {moment(auth.timeCreated).format('Do MMM, YYYY')}
                      </span>
                    </div>
                  </div>
                </div>
              </CardBody>
            )}
          </Card>

          {/* 
          <Card>
            <CardHeader className={styles.SettingsHeader}>
              <h3>Your Account</h3>
            </CardHeader>
            <CardBody></CardBody>
          </Card> */}
        </div>
        <SideSheet onCloseComplete={() => setShow(false)} isShown={show}>
          <ChangePassword setShow={setShow} />
        </SideSheet>
        <SideSheet
          onCloseComplete={() => setShowEdit(false)}
          isShown={showEdit}
        >
          <EditProfile setShowEdit={setShowEdit} />
        </SideSheet>
      </Content>
    </Fragment>
  )
}
export default Settings
