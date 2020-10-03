import Axios from 'utils/axios'
import clean from 'lodash-clean'
export const getCollections = async params =>
  await Axios.get(`/collections`, clean({ params }))

export const getCollection = async ({ id }) =>
  await Axios.get(`/collections/${id}/details`)

export const getCollectionsByPlan = async ({ planId, from, to ,page, limit, dashboard }) =>
  await Axios.get(`/collections/${planId}?from=${from}&to=${to}&page=${page}&limit=${limit}&dashboard=${dashboard}`)
    
