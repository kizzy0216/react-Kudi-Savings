import Axios from 'utils/axios'
import clean from 'lodash-clean'
export const getCollections = async params =>
  await Axios.get(`/collections`, clean({ params }))

export const getCollection = async ({ id }) =>
  await Axios.get(`/collections/${id}/details`)