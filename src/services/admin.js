import Axios from 'utils/axios'
import clean from 'lodash-clean'
//Get wallet history details
export const walletHistory = async ({ params }) =>
  await Axios.get(`/admin/wallets`, clean({ params }))

export const FundPurse = async (amount, debitWalletId) =>
  await Axios.put(
    `/admin-wallets/credit?amount=${amount}&debitWalletId=${debitWalletId}&type=LOAN`
  )

export const getPurseDetails = async ({ params }) =>
  await Axios.get(`/admin-wallets/details?type=LOAN`, clean({ params }))

export const getWallets = async ({ params }) =>
  await Axios.get(`/admin-wallets?type=LOAN`, clean({ params }))

export const getWalletIdForLoan = async () =>
  await Axios.get(`/admin-wallets?type=LOAN`)
