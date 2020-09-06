import React, { useState } from 'react'
import { useQuery } from 'react-query'
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Select
} from '@kudi-inc/dip'
import { updateCustomer, uploadAvatar } from 'services/customers'
import { toaster } from 'evergreen-ui'
import styles from './customer-profile.module.scss'
import { states, markets } from 'utils/data'
import { fecthImage } from 'utils/function'
import AgentImg from 'assets/svg/profile-pic.svg'
import { isValidUpdate } from './validation'
import Markets from 'pages/Markets'

const EditCustomer = ({ setShowEdit, refetch, customer, auth }) => {
  const [loading, setLoading] = useState(false)
  const [uploadedAvatar, setUploadedAvatar] = useState({})
  const [imgUploaded, setImgUploaded] = useState(false)
  const [uploadedId, setUploadedId] = useState({})
  const [idUploaded, setIdUploaded] = useState(false)
  const [edited, setEdited] = useState(customer)
  const [errors, setErrors] = useState({})
  const [imgProgress, setImgProcess] = useState(0)
  const [idProgress, setIdProcess] = useState(0)
  let { data: avatar } = useQuery(
    edited && edited.pictureId && ['Image', { id: edited.pictureId }],
    fecthImage
  )
  let { data: idCard } = useQuery(
    edited &&
      edited.identificationCardImageId && [
        'ID',
        { id: edited.identificationCardImageId }
      ],
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

  const handleEditCustomer = async e => {
    e.preventDefault()
    setLoading(true)

    if (uploadedId && uploadedId.data) {
      edited.identificationCardImageId = uploadedId.data.id
    }
    if (uploadedAvatar && uploadedAvatar.data) {
      edited.pictureId = uploadedAvatar.data.id
    }
    const errors = isValidUpdate(edited)
    setErrors(errors)

    if (Object.keys(errors).length > 0) {
      setLoading(false)
      return
    }

    let { market, ...rest } = edited

    try {
      await updateCustomer(rest)
      setLoading(false)
      toaster.success('Edit customer details successful. Updates will reflect soon')
      refetch({ disableThrow: true })
      setShowEdit(false)
    } catch (e) {
      setLoading(false)
      if (e.data.message) {
        return toaster.danger(e.data.message)
      }
      toaster.danger('Edit Customer Failed')
    }
  }

  return (
    <Card className={styles.Edit}>
      <CardHeader className={styles.EditHeader}>Edit Customer</CardHeader>
      <CardBody className={styles.EditBody}>
        <form onSubmit={handleEditCustomer} className={styles.EditForm}>
          <div className={styles.EditFormProfile}>
            <div className={styles.EditFormProfileAvatar}>
              {imgUploaded ? (
                <img src={uploadedAvatar.data.medium} alt="avatar" />
              ) : (
                <label>
                  <input accept="image/*" type="file" onChange={handleChange} />
                  <img
                    src={avatar && avatar.data ? avatar.data.medium : AgentImg}
                    alt="avatar"
                  />
                </label>
              )}
              <p>
                {imgProgress ? (
                  ` ${
                    imgProgress === 100 && !uploadedAvatar.data
                      ? 99
                      : imgProgress
                  }%`
                ) : errors && errors.pictureId ? (
                  <span className="danger">{errors.pictureId} </span>
                ) : (
                  'Change Avatar'
                )}
              </p>
            </div>

            <div className={styles.EditFormProfileAvatar}>
              <div className={styles.EditFormProfileAvatar}>
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
                        idCard && idCard.data ? idCard.data.medium : AgentImg
                      }
                      alt="id card"
                    />
                  </label>
                )}

                <p>
                  {idProgress ? (
                    `${
                      idProgress === 100 && !uploadedId.data ? 99 : idProgress
                    }%`
                  ) : errors && errors.identificationCardImageId ? (
                    <span className="danger">
                      {errors.identificationCardImageId}
                    </span>
                  ) : (
                    'Change Id'
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.EditFormContent}>
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
              onChange={e => setEdited({ ...edited, lastName: e.target.value })}
              error={errors.lastName}
              status={errors.lastName && 'error'}
            />
            <Input
              type="text"
              label="Phone Number"
              disabled={!auth.type.includes('ADMIN')}
              value={edited.phoneNumber ? edited.phoneNumber : ''}
              onChange={e =>
                setEdited({ ...edited, phoneNumber: e.target.value })
              }
              error={errors.phoneNumber}
              status={errors.phoneNumber && 'error'}
            />

            <Input
              type="businessName"
              label="Business Name"
              onChange={e =>
                setEdited({ ...edited, businessName: e.target.value })
              }
              value={edited.businessName}
              error={errors.businessName}
              status={errors.businessName && 'error'}
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
            <Input
              value={edited.address}
              name="address"
              type="text"
              label="Address"
              onChange={e => setEdited({ ...edited, address: e.target.value })}
              error={errors.address}
              status={errors.address && 'error'}
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
              onChange={e => setEdited({ ...edited, lga: e.target.value })}
              error={errors.lga}
              status={errors.lga && 'error'}
            />
            
            <Select
              onSelect={state =>
                setEdited({
                  ...edited,
                  state
                })
              }
              name="market"
              value={edited?.market?.name}
              required
              label="Market"
              options={markets}
              autoComplete="market"
              error={errors?.market?.name}
              status={errors?.market?.name && 'error'}
            />
          </div>
          <Button type="submit" loading={loading}>
            Submit
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}
export default EditCustomer
