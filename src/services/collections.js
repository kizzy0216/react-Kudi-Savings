import Axios from 'utils/axios'
import clean from 'lodash-clean'
export const getCollections = async params =>
  await Axios.get(`/collections`, clean({ params }))

export const getCollection = async ({ id }) =>
  await Axios.get(`/collections/${id}/details`)

export const getAgentCollections = async ({ agentId, from, to, page, limit }) =>
  await Axios.get(
    `/collections/agent?agentId=${agentId}&from=${from}&to=${to}&page=${page}&limit=${limit}`
  )

export const getCollectionsByPlan = async ({
  planId,
  from,
  to,
  page,
  limit,
  dashboard
}) =>
  await Axios.get(
    `/collections/${planId}?from=${from}&to=${to}&page=${page}&limit=${limit}&dashboard=${dashboard}`
  )
