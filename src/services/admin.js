import Axios from 'utils/axios'
//Get wallet history details
export const walletHistory = async ({ params }) =>
  await Axios.get(`/admin/wallets`, { params })
