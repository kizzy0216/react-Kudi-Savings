import React, { useState, Fragment, useEffect } from 'react'
import {
  Input,
  Button,
  Select,
  Card,
  CardHeader,
  CardBody
} from '@kudi-inc/dip'
import { useRouteMatch } from 'react-router-dom'
import cx from 'classnames'
import { toaster, SelectMenu, Button as SelectMenuButton } from 'evergreen-ui'
import { ChevronLeft, Close } from 'assets/svg'
import { Header, Content } from 'components/Layout'
import { states } from 'utils/data'
import AgentImg from 'assets/svg/profile-pic.svg'
import styles from './create-loan-manager.module.scss'
import { LoanManagerValidation } from './utils/validation'
import { CreateLoanManager, uploadPicture } from 'services/loan-manager'

const LoanManager = ({ history }) => {
  const { url } = useRouteMatch()
  const [loading, setLoading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState({})
  const [imgUploaded, setImgUploaded] = useState(false)
  const [imgProgress, setImgProcess] = useState(0)
  const [errors, setErrors] = useState({})
  const [loanManager, setLoanManager] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: 'MALE',
    state: '',
    phoneNumber: '',
    imageId: ''
  })

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
    try {
      let file = new FormData()
      file.append('file', event.target.files[0])
      const response = await uploadPicture(file, uploadProgress)
      setUploadedImage(response)
      setImgUploaded(true)
    } catch (e) {
      toaster.danger(e)
    }
  }

  const handleLoanManager = ({ target }) => {
    setLoanManager({ ...loanManager, [target.name]: target.value })
  }
  const handleSubmit = async e => {
    e.preventDefault()

    if (uploadedImage && uploadedImage.data) {
      loanManager.imageId = uploadedImage.data.id
    }

    const errors = LoanManagerValidation({ ...loanManager })

    setErrors(errors)
    if (Object.keys(errors).length > 0) return
    setLoading(true)
    await CreateLoanManager({ ...loanManager })
      .then(() => {
        setLoading(false)
        history.push(`/account-setup`)
      })
      .catch(({ res }) => {
        setLoading(false)
        if (res) {
          return toaster.danger('Error creating Loan manager')
        }
        toaster.danger('An error occurred, contact Admin')
      })
  }

  return (
    <Fragment>
      <div>
        <Header>
          <p>
            <ChevronLeft role="button" onClick={() => history.goBack()} />
            Create Account
          </p>
        </Header>
        <Content className={styles.Content}>
          <Card className={cx(styles.contentCard, styles.CreateLM)}>
            <CardHeader className={styles.CreateLMHeader}>
              <h4>
                <b>FILL INFORMATION BELOW</b>
              </h4>
              <p>Step 1/2</p>
            </CardHeader>

            <CardBody className={styles.CreateLMBody}>
              <form
                onSubmit={handleSubmit}
                className={styles.CreateLMForm}
                autoComplete="off"
              >
                <div className={styles.CreateLMFormProfile}>
                  <div className={styles.CreateLMFormProfileAvatar}>
                    {imgUploaded ? (
                      <img src={uploadedImage.data.medium} alt="Picture" />
                    ) : (
                      <label>
                        <input
                          accept="image/*"
                          type="file"
                          onChange={handleChange}
                        />
                        <img src={AgentImg} alt="Picture" />
                      </label>
                    )}
                    <p>
                      {imgProgress ? (
                        `
                        ${
                          imgProgress === 100 && !uploadedImage.data
                            ? 99
                            : imgProgress
                        }%`
                      ) : errors && errors.imageId ? (
                        <span className="danger">{errors.imageId}</span>
                      ) : (
                        'Change Picture'
                      )}
                    </p>
                  </div>
                </div>
                <div className={styles.CreateLMFormBody}>
                  <Input
                    type="text"
                    name="firstName"
                    value={loanManager.firstName}
                    label="First name"
                    onChange={e => handleLoanManager(e)}
                    autoComplete="firstname"
                    error={errors.firstName}
                    status={errors.firstName && 'error'}
                  />
                  <Input
                    type="email"
                    autoComplete="email"
                    name="email"
                    value={loanManager.email}
                    label="Email address"
                    onChange={e => handleLoanManager(e)}
                    error={errors.email}
                    status={errors.email && 'error'}
                  />
                  <Input
                    type="text"
                    label="Last name"
                    autoComplete="lastName"
                    name="lastName"
                    value={loanManager.lastName}
                    onChange={e => handleLoanManager(e)}
                    error={errors.lastName}
                    status={errors.lastName && 'error'}
                  />
                  <Input
                    onChange={e => handleLoanManager(e)}
                    name="password"
                    value={loanManager.password}
                    label="Password"
                    type="password"
                    required
                    autoComplete="password"
                    error={errors.password}
                    status={errors.password && 'error'}
                  />
                  <Input
                    type="tel"
                    autoComplete="phoneNumber"
                    name="phoneNumber"
                    label="Phone number"
                    value={loanManager.phoneNumber}
                    onChange={e => handleLoanManager(e)}
                    status={errors.phoneNumber && 'error'}
                    error={errors.phoneNumber}
                  />
                  <Select
                    onSelect={state =>
                      setLoanManager({ ...loanManager, state })
                    }
                    name="state"
                    value={loanManager.state}
                    label="Select State"
                    options={states}
                    autoComplete="state"
                    error={errors.state}
                    status={errors.state && 'error'}
                  />
                  <div className={styles.CreateLMTwo}>
                    <div className={styles.CreateLMTwoCheck}>
                      <p>Male</p>
                      <div className={styles.CreateLMTwoCheckbox}>
                        <input
                          type="checkbox"
                          value="MALE"
                          id="MALE"
                          autoComplete="MALE"
                          name="gender"
                          checked={loanManager.gender === 'MALE'}
                          onChange={e => handleLoanManager(e)}
                        />
                        <label htmlFor="MALE"></label>
                      </div>
                    </div>
                    <div className={styles.CreateLMTwoCheck}>
                      <p>Female</p>
                      <div className={styles.CreateLMTwoCheckbox}>
                        <input
                          type="checkbox"
                          value="FEMALE"
                          id="FEMALE"
                          autoComplete="FEMALE"
                          name="gender"
                          checked={loanManager.gender === 'FEMALE'}
                          onChange={e => handleLoanManager(e)}
                        />
                        <label htmlFor="FEMALE"></label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.CreateLMFormSubmit}>
                  <Button
                    type="submit"
                    className={styles.CreateLMButton}
                    loading={loading}
                  >
                    Submit
                  </Button>
                  <Button
                    type="submit"
                    icon={<Close />}
                    variant="flat"
                    onClick={() => history.goBack()}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </Content>
      </div>
    </Fragment>
  )
}

export default LoanManager
