import Axios from 'utils/axios'
import clean from 'lodash-clean'
//Get wallet history details
export const walletHistory = async ({ params }) =>
  await Axios.get(`/admin/wallets`, clean({ params }))
