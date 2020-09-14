import { Badge, CardBody } from '@kudi-inc/dip'
import agent from '../../../assets/images/agent.png'
import React from 'react'

import './guarantors.scss'
import { useQuery } from 'react-query'
import { fecthImage } from '../../../utils/function'

export default ({ loan }) => {
  const guarantor1 = loan && loan.guarantor1 ? loan.guarantor1 : {}
  const guarantor2 = loan && loan.guarantor2 ? loan.guarantor2 : {}

  const { data: guarantor1Image } = useQuery(
    guarantor1 && guarantor1.pictureId && ['Guarantor1Image', { id: guarantor1.pictureId }],
    fecthImage
  )

  const { data: guarantor2Image } = useQuery(
    guarantor2 && guarantor2.pictureId && ['Guarantor2Image', { id: guarantor2.pictureId }],
    fecthImage
  )

  return (<CardBody className={'second-card'}>
      <div className="Guarantor-Info-Header">
        <p className={'header'}>Guarantors Information</p>
        <Badge className={'badge'} variant={'success'}>Verified</Badge>
      </div>
      <div className="Guarantor-Info">
        <div className={'Guarantor-1'}>
          <div className="Guarantor-Info-Picture">
            <img src={guarantor1Image ? guarantor1Image.data.medium : agent} alt="guarantor 1 picture"/>
          </div>
          <div className="Info">
            <p className="name">{guarantor1.firstName} {guarantor1.lastName}</p>
            <p className="profile"> View Profile</p>
          </div>
        </div>
        <div className="Guarantor-2">
          <div className="Guarantor-Info-Picture">
            <img src={guarantor2Image ? guarantor2Image.data.medium : agent} alt="guarantor 2 picture"/>
          </div>
          <div className="Info">
            <p className="name">{guarantor2.firstName} {guarantor2.lastName}</p>
            <p className="profile"> View Profile</p>
          </div>
        </div>
      </div>
    </CardBody>
  )
}
