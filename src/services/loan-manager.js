import Axios, { MediaService } from 'utils/axios'
import clean from 'lodash-clean'

export const CreateLoanManager = async data =>
  await Axios.post(`/loans-manager`, data)

export const uploadPicture = (image, callback) =>
  MediaService.post(`/images`, image, callback)

export const getLoanManagers = async ({phoneNumber,page, limit, ...params }) => 
Axios.get(`/loans-manager?page=${page}&limit=${limit}&phoneNumber=${phoneNumber}`, clean({params}))

export const getLoanManager = async ({id}) => 
await Axios.get(`/loans-manager/${id}`)
