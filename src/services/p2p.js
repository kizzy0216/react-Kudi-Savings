import Axios, { MediaService } from 'utils/axios'
import clean from 'lodash-clean'
export const getTransaction = async ({ from, to, ...params }) =>
  await Axios.get(`/p2p-trxs/filter?from=${from}&to=${to}`, clean({ params }))
