export const AgentReducer = (agent, { type, payload }) => {
  switch (type) {
    case 'UPDATE_DETAILS':
      return {
        ...agent,
        ...payload
      }
    case 'UPDATE_GUARANTOR':
      return {
        ...agent,
        guarantor: {
          ...agent.guarantor,
          ...payload
        }
      }
    case 'UPDATE_AVATAR':
      return {
        ...agent,
        imageId: payload.id,
        avatar: payload
      }
    case 'REMOVE_AVATAR':
      return {
        ...agent,
        imageId: '',
        avatar: {}
      }
    case 'UPDATE_ID':
      return {
        ...agent,
        identificationImageId: payload.id,
        idCard: payload
      }
    case 'REMOVE_ID':
      return {
        ...agent,
        identificationImageId: '',
        idCard: {}
      }

    default:
      return agent
  }
}

export const DefaultAgent = {
  firstName: '',
  lastName: '',
  bvn: '',
  dob: '',
  email: '',
  gender: 'MALE',
  address: '',
  state: '',
  lga: '',
  marketId: '',
  phoneNumber: '',
  identificationImageId: '',
  imageId: '',
  guarantor: {
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    state: '',
    lga: '',
    phoneNumber: '',
    gender: 'MALE'
  },
  avatar: {},
  idCard: {}
}
