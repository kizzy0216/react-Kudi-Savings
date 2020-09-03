import { Badge, CardBody } from '@kudi-inc/dip'
import agent from '../../../assets/images/agent.png'
import React from 'react'

import './guarantors.scss'

export default () => (
  <CardBody className={'second-card'}>
    <div className="Guarantor-Info-Header">
      <p className={'header'}>Guarantors Information</p>
      <Badge className={'badge'} variant={'success'}>Verified</Badge>
    </div>
    <div className="Guarantor-Info">
      <div className={'Guarantor-1'}>
        <div className="Guarantor-Info-Picture">
          <img src={agent} alt="guarantor picture"/>
        </div>
        <div className="Info">
          <p className="name">Firstname Lastname</p>
          <p className="profile"> View Profile</p>
        </div>
      </div>
      <div className="Guarantor-2">
        <div className="Guarantor-Info-Picture">
          <img src={agent} alt="guarantor picture"/>
        </div>
        <div className="Info">
          <p className="name">Firstname Lastname</p>
          <p className="profile"> View Profile</p>
        </div>
      </div>
    </div>
  </CardBody>
)
