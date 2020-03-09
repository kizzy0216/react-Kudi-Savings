import React, { useState, useContext, Fragment } from 'react'
import { useQuery } from 'react-query'
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Select
} from '@kudi-inc/dip'
import { Header, Content } from 'components/Layout'
import { ChevronLeft } from 'assets/svg'
import { updateAgent, uploadAvatar, getAgent } from 'services/agents'
import { toaster } from 'evergreen-ui'
import styles from './agents.module.scss'
import { states } from 'utils/data'
import AuthContext from 'context/AuthContext'
import { fecthImage } from 'utils/function'
import AgentImg from 'assets/svg/profile-pic.svg'
import { isValidUpdate } from './validation'

const EditAgent = ({ history, match }) => {
  const [auth] = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [uploadedAvatar, setUploadedAvatar] = useState({})
  const [imgUploaded, setImgUploaded] = useState(false)
  const [uploadedId, setUploadedId] = useState({})
  const [idUploaded, setIdUploaded] = useState(false)
  const [edited, setEdited] = useState(
    JSON.parse(localStorage.getItem('agent'))
  )
  const [errors, setErrors] = useState({})
  const [imgProgress, setImgProcess] = useState(0)
  const [idProgress, setIdProcess] = useState(0)
  let { data: avatar } = useQuery(['Image', { id: edited.imageId }], fecthImage)
  let { data: idCard } = useQuery(
    ['Image', { id: edited.identificationImageId }],
    fecthImage
  )

  const uploadProgress = {
    onUploadProgress: ProgressEvent => {
      const totalLength = ProgressEvent.lengthComputable
        ? ProgressEvent.total
        : ProgressEvent.target.getResponseHeader('content-length') ||
          ProgressEvent.target.getResponseHeader(
            'x-decompressed-content-length'
          )
      if (totalLength !== null) {
        setImgProcess(Math.floor((ProgressEvent.loaded * 100) / totalLength))
      }
    }
  }

  const uploadIdProgress = {
    onUploadProgress: ProgressEvent => {
      const totalLength = ProgressEvent.lengthComputable
        ? ProgressEvent.total
        : ProgressEvent.target.getResponseHeader('content-length') ||
          ProgressEvent.target.getResponseHeader(
            'x-decompressed-content-length'
          )
      if (totalLength !== null) {
        setIdProcess(Math.floor((ProgressEvent.loaded * 100) / totalLength))
      }
    }
  }

  const handleChange = async event => {
    try {
      let file = new FormData()
      file.append('file', event.target.files[0])
      const response = await uploadAvatar(file, uploadProgress)
      setUploadedAvatar(response)
      setImgUploaded(true)
    } catch (e) {
      console.log(e, e.response)
    }
  }

  const handleIdChange = async event => {
    try {
      let file = new FormData()
      file.append('file', event.target.files[0])
      const response = await uploadAvatar(file, uploadIdProgress)
      setUploadedId(response)
      setIdUploaded(true)
    } catch (e) {
      console.log(e, e.response)
    }
  }

  const handleEditWallet = async e => {
    e.preventDefault()
    const errors = isValidUpdate(edited)

    setErrors(errors)
    if (Object.keys(errors).length > 0) return

    setLoading(true)
    if (!edited.marketId) {
      edited.marketId = edited.assignedMarket.id
    }
    if (uploadedId && uploadedId.data) {
      edited.identificationImageId = uploadedId.data.id
    }
    if (uploadedAvatar && uploadedAvatar.data) {
      edited.imageId = uploadedAvatar.data.id
    }
    let {
      token,
      tokenExpired,
      tokenExpiredAt,
      timeCreated,
      cashBalance,
      assignedMarket,
      lastCollectionTime,
      totalCustomers,
      walletId,
      status,
      manager,
      amountSeeded,
      ...rest
    } = edited
    try {
      await updateAgent(rest)
      setLoading(false)
      toaster.success('Agent Details Updated')
      history.goBack()
    } catch (e) {
      setLoading(false)
      if (e.data.message) {
        return toaster.danger(e.data.message)
      }
      toaster.danger('Edit Agent Failed')
    }
  }

  return (
    <Fragment>
      <Header>
        <p>
          <ChevronLeft role="button" onClick={() => history.goBack()} />
          Edit Agent
        </p>
      </Header>
      <Content className={styles.content}>
        <Card className={styles.EditAgent}>
          <CardHeader className={styles.EditAgentHeader}>
            Fill Information
          </CardHeader>
          <CardBody className={styles.EditAgentBody}>
            <form onSubmit={handleEditWallet} className={styles.EditAgentForm}>
              <div className={styles.EditAgentFormBody}>
                <div className={styles.EditAgentFormBodyProfile}>
                  <div className={styles.EditAgentFormBodyProfileAvatar}>
                    {imgUploaded ? (
                      <img src={uploadedAvatar.data.medium} alt="avatar" />
                    ) : (
                      <label>
                        <input
                          accept="image/*"
                          type="file"
                          onChange={handleChange}
                        />
                        <img
                          src={
                            avatar && avatar.data
                              ? avatar.data.medium
                              : AgentImg
                          }
                          alt="avatar"
                        />
                      </label>
                    )}
                    <p>
                      {imgProgress
                        ? ` ${
                            imgProgress === 100 && !uploadedAvatar.data
                              ? 99
                              : imgProgress
                          }%`
                        : 'Change Avatar'}
                    </p>
                  </div>
                  <div className={styles.EditAgentFormBodyProfileInfo}>
                    <div className={styles.EditAgentFormHeader}>
                      PERSONAL INFORMATION
                    </div>
                    <section>
                      <Input
                        type="text"
                        label="First Name"
                        name="firstName"
                        value={edited.firstName}
                        onChange={e =>
                          setEdited({ ...edited, firstName: e.target.value })
                        }
                        error={errors.firstName}
                        status={errors.firstName && 'error'}
                      />
                      <Input
                        type="text"
                        label="Last Name"
                        name="lastName"
                        value={edited.lastName}
                        onChange={e =>
                          setEdited({ ...edited, lastName: e.target.value })
                        }
                        error={errors.lastName}
                        status={errors.lastName && 'error'}
                      />
                      <Input
                        type="text"
                        label="Phone Number"
                        value={edited.phoneNumber ? edited.phoneNumber : ''}
                        onChange={e =>
                          setEdited({ ...edited, phoneNumber: e.target.value })
                        }
                        error={errors.phoneNumber}
                        status={errors.phoneNumber && 'error'}
                      />
                      <Input
                        value={edited.email}
                        name="email"
                        type="text"
                        label="Email"
                        onChange={e =>
                          setEdited({ ...edited, email: e.target.value })
                        }
                        error={errors.email}
                        status={errors.email && 'error'}
                      />
                      <Input
                        type="number"
                        label="BVN"
                        onChange={e =>
                          setEdited({ ...edited, bvn: e.target.value })
                        }
                        value={edited.bvn}
                        error={errors.bvn}
                        status={errors.bvn && 'error'}
                      />

                      <Select
                        onSelect={gender => setEdited({ ...edited, gender })}
                        name="gender"
                        value={edited.gender}
                        label="Gender"
                        options={[
                          { text: 'Male', value: 'MALE' },
                          { text: 'Female', value: 'FEMALE' }
                        ]}
                        autoComplete="gender"
                        error={errors.gender}
                        status={errors.gender && 'error'}
                      />
                      <Select
                        onSelect={state =>
                          setEdited({
                            ...edited,
                            state
                          })
                        }
                        name="state"
                        value={edited.state}
                        required
                        label="State"
                        options={states}
                        autoComplete="state"
                        error={errors.state}
                        status={errors.state && 'error'}
                      />
                      <Input
                        value={edited.lga}
                        name="lga"
                        type="text"
                        label="LGA"
                        onChange={e =>
                          setEdited({ ...edited, lga: e.target.value })
                        }
                        error={errors.lga}
                        status={errors.lga && 'error'}
                      />
                      <Select
                        onSelect={marketId =>
                          setEdited({
                            ...edited,
                            marketId
                          })
                        }
                        name="state"
                        value={edited && edited.assignedMarket &&edited.assignedMarket.name}
                        label="Reassign Market"
                        options={
                          auth && auth.markets
                            ? auth.markets.map(({ name, id }) => ({
                                text: name,
                                value: id
                              }))
                            : []
                        }
                        autoComplete="marketId"
                        error={errors.marketId}
                        status={errors.marketId && 'error'}
                      />
                    </section>
                  </div>
                </div>
              </div>

              <div className={styles.EditAgentFormBody}>
                <div className={styles.EditAgentFormBodyProfile}>
                  <div className={styles.EditAgentFormBodyProfileAvatar}>
                    <div className={styles.EditAgentFormBodyProfileAvatar}>
                      {idUploaded ? (
                        <img src={uploadedId.data.medium} alt="avatar" />
                      ) : (
                        <label>
                          <input
                            accept="image/*"
                            type="file"
                            onChange={handleIdChange}
                          />
                          <img
                            className="img-id"
                            src={
                              idCard && idCard.data
                                ? idCard.data.medium
                                : AgentImg
                            }
                            alt="id card"
                          />
                        </label>
                      )}

                      <p>
                        {idProgress
                          ? `${
                              idProgress === 100 && !uploadedId.data
                                ? 99
                                : idProgress
                            }%`
                          : 'Change Id'}
                      </p>
                    </div>
                  </div>
                  <div className={styles.EditAgentFormBodyProfileInfo}>
                    <div className={styles.EditAgentFormHeader}>
                      GUARANTOR'S INFORMATION
                    </div>
                    <section>
                      <Input
                        type="text"
                        label="First name"
                        name="guarantorName"
                        error={errors.guarantorFirstName}
                        status={errors.guarantorFirstName && 'error'}
                        value={edited.guarantor.firstName}
                        onChange={e =>
                          setEdited({
                            ...edited,
                            guarantor: {
                              ...edited.guarantor,
                              firstName: e.target.value
                            }
                          })
                        }
                      />
                      <Input
                        type="text"
                        label="Last name"
                        name="guarantorlastName"
                        value={edited.guarantor.lastName}
                        error={errors.guarantorLastName}
                        status={errors.guarantorLastName && 'error'}
                        onChange={e =>
                          setEdited({
                            ...edited,
                            guarantor: {
                              ...edited.guarantor,
                              lastName: e.target.value
                            }
                          })
                        }
                      />
                      <Input
                        type="text"
                        label="Phone Number"
                        name="guarantorPhoneNumber"
                        value={edited.guarantor.phoneNumber}
                        error={errors.guarantorPhoneNumber}
                        status={errors.guarantorPhoneNumber && 'error'}
                        onChange={e =>
                          setEdited({
                            ...edited,
                            guarantor: {
                              ...edited.guarantor,
                              phoneNumber: e.target.value
                            }
                          })
                        }
                      />
                      <Input
                        type="bvn"
                        name="guarantorAddress"
                        label="Address"
                        value={edited.guarantor.address}
                        error={errors.guarantorAddress}
                        status={errors.guarantorAddress && 'error'}
                        onChange={e =>
                          setEdited({
                            ...edited,
                            guarantor: {
                              ...edited.guarantor,
                              address: e.target.value
                            }
                          })
                        }
                      />
                      <Select
                        onSelect={state =>
                          setEdited({
                            ...edited,
                            guarantor: { ...edited.guarantor, state }
                          })
                        }
                        name="state"
                        value={edited.guarantor.gender}
                        label="Gender"
                        options={[
                          { text: 'MALE', value: 'MALE' },
                          { text: 'FEMALE', value: 'FEMALE' }
                        ]}
                        autoComplete="gender"
                        error={errors.guarantorGender}
                        status={errors.guarantorGender && 'error'}
                      />
                    </section>
                  </div>
                </div>
              </div>

              <Button type="submit" loading={loading}>
                Submit
              </Button>
            </form>
          </CardBody>
        </Card>
      </Content>
    </Fragment>
  )
}
export default EditAgent
