import Axios, { MediaService } from 'utils/axios'
import clean from 'lodash-clean'
export const getTransaction = ({id}) =>
  Axios.get(`/p2p-trxs/${id}`)
