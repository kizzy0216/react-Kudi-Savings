import { Badge, CardBody, Button } from '@kudi-inc/dip'
import agent from '../../../assets/images/agent.png'
import React from 'react'
import { UserIconLink } from '../../../assets/svg'
import './guarantors.scss'
import { useQuery } from 'react-query'
import { fecthImage } from '../../../utils/function'
import { useHistory } from 'react-router-dom'

export default ({ loan }) => {
  let history = useHistory()
  const firstGuarantor = loan && loan.guarantor1 ? loan.guarantor1 : {}
  const secondGuarantor = loan && loan.guarantor2 ? loan.guarantor2 : {}

  const { data: firstGuarantorImage } = useQuery(
    firstGuarantor &&
    firstGuarantor.pictureId && ['FirstGuarantorImage', { id: firstGuarantor.pictureId }],
    fecthImage
  )

  const { data: secondGuarantorImage } = useQuery(
    secondGuarantor &&
    secondGuarantor.pictureId && ['secondGuarantorImage', { id: secondGuarantor.pictureId }],
    fecthImage
  )

  return (
    <CardBody className={'second-card'}>
      <div className="Guarantor-Info-Header">
        <p className={'header'}>Guarantors Information</p>
        <Badge className={'badge'} variant={'success'}>
          Verified
        </Badge>
      </div>
      <div className="Guarantor-Info">
        <div className={'Guarantor-1'}>
          <div className="Guarantor-Info-Picture">
            <img
              src={firstGuarantorImage ? firstGuarantorImage.data.medium : agent}
              alt="guarantor 1 picture"
            />
          </div>
          <div className="Info">
            <p className="name">
              {firstGuarantor.firstName} {firstGuarantor.lastName}
            </p>
            <p className="profile">
              <Button
                variant="flat"
                onClick={() => history.push(`/customers/${firstGuarantor.id}`)}
                type="button"
                icon={<UserIconLink />}
              >
                View Profile
              </Button>
            </p>
          </div>
        </div>
        <div className="Guarantor-2">
          <div className="Guarantor-Info-Picture">
            <img
              src={secondGuarantorImage ? secondGuarantorImage.data.medium : agent}
              alt="guarantor 2 picture"
            />
          </div>
          <div className="Info">
            <p className="name">
              {secondGuarantor.firstName} {secondGuarantor.lastName}
            </p>
            <p className="profile">
              <Button
                variant="flat"
                onClick={() => history.push(`/customers/${secondGuarantor.id}`)}
                type="button"
                icon={<UserIconLink />}
              >
                View Profile
              </Button>
            </p>
          </div>
        </div>
      </div>
    </CardBody>
  )
}
