import React, { useState, useContext } from 'react'
import { useQuery } from 'react-query'
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Select
} from '@kudi-inc/dip'
import { updateAgent, uploadAvatar } from 'services/agents'

import { toaster } from 'evergreen-ui'
import styles from './agents.module.scss'
import { states } from 'utils/data'
import AuthContext from 'context/AuthContext'

const EditAgent = ({ setShowEdit, agent, avatar, idCard }) => {
  const [auth] = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [imgUploaded, setImgUploaded] = useState(false)
  const [edited, setEdited] = useState(agent)
  const [errors, setErrors] = useState({})
  const [imgProgress, setImgProcess] = useState(0)

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

  const handleChange = async event => {
    event.preventDefault()
    setImgUploaded(true)
    let file = new FormData()
    file.append('file', event.target.files[0])
    const response = await uploadAvatar(file, uploadProgress)
    console.log(response, 'hmmmmm')
    setEdited({ ...edited, imageId: response.data.medium })
  }

  const handleIdChange = e => {
    e.preventDefault()
  }
  const handleFundWallet = async e => {
    e.preventDefault()
    setLoading(true)
    setShowEdit(false)
    // await fundWallet(zonalHead.id)
    // .then(({ data }) => {
    //   setLoading(false)
    //   toaster.success('Processing Top Up')

    // })
    // .catch(({ response }) => {
    //   toaster.danger('Create Agent Failed')
    // })
  }
  console.log(idCard, 'idCr')
  return (
    <Card className={styles.EditAgent}>
      <CardHeader className={styles.EditAgentHeader}>Fund Wallet</CardHeader>
      <CardBody className={styles.EditAgentBody}>
        <form onSubmit={handleFundWallet} className={styles.EditAgentForm}>
          <div className={styles.EditAgentFormBody}>
            <div className={styles.EditAgentFormBodyProfile}>
              <div className={styles.EditAgentFormBodyProfileAvatar}>
                <img src={avatar} alt="avatar" />
                <input accept="image/*" type="file" onChange={()=>handleChange} />
                <div>
                  <span>Change Picture</span>
                </div>
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
                  />
                  <Input
                    type="text"
                    label="Last Name"
                    name="lastName"
                    value={edited.lastName}
                    onChange={e =>
                      setEdited({ ...edited, lastName: e.target.value })
                    }
                  />
                  <Input
                    type="text"
                    label="Phone Number"
                    value={edited.phoneNumber ? edited.phoneNumber : ''}
                    onChange={e =>
                      setEdited({ ...edited, phoneNumber: e.target.value })
                    }
                  />
                  <Input
                    value={edited.email}
                    name="email"
                    type="text"
                    label="Email"
                    onChange={e =>
                      setEdited({ ...edited, email: e.target.value })
                    }
                  />
                  <Input
                    type="number"
                    label="BVN"
                    onChange={e =>
                      setEdited({ ...edited, bvn: e.target.value })
                    }
                    value={edited.bvn}
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
                        guarantor: { ...edited.guarantor, state }
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
                  />
                  <Select
                    onSelect={state =>
                      setEdited({
                        ...edited,
                        guarantor: { ...edited.guarantor, state }
                      })
                    }
                    name="state"
                    value={edited.assignedMarket.name}
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
                <img src={idCard} className="img-id" alt="id card" />
                <input accept="image/*" type="file" onChange={()=>handleIdChange} />
                <div>
                  <span>Change ID</span>
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
                    value={edited.guarantor.firstName}
                  />
                  <Input
                    type="text"
                    label="Last name"
                    name="guarantorlastName"
                    value={edited.guarantor.lastName}
                  />
                  <Input
                    type="text"
                    label="Phone Number"
                    name="guarantorPhoneNumber"
                    value={edited.guarantor.phoneNumber}
                  />
                  <Input
                    type="bvn"
                    name="guarantorAddress"
                    label="Address"
                    value={edited.guarantor.address}
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
                    error={errors.gender}
                    status={errors.gender && 'error'}
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
  )
}
export default EditAgent
