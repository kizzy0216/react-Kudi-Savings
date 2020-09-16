import Axios, { MediaService } from 'utils/axios'
import clean from 'lodash-clean'
export const getTransaction = async ({ params }) =>
 await Axios.get(`/p2p-trxs/filter`, clean({ params }))
