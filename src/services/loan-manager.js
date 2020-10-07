import Axios, { MediaService } from 'utils/axios'
import clean from 'lodash-clean'

export const CreateLoanManager = async data =>
  await Axios.post(`/loans-manager`, data)

export const uploadPicture = (image, callback) =>
  MediaService.post(`/images`, image, callback)
