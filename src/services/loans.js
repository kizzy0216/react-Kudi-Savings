import Axios from '../utils/axios'
import clean from 'lodash-clean'

export const dashboardOverview
  =
  async params => await Axios.get('/loans/dashboard/overview', clean({ params }))

export const filterLoans = async params => {
  const queryParams = { ...params, dashboard: true }
  return await Axios.get('/loans/filter', clean({ params: queryParams }))
}

export const getLoanDetails = async params => await Axios.get('/loans/detail', clean({ params }))

export const getOverdueLoans = async params => await Axios.get('/loans/overdue', clean({ params }))

export const getRepaymentHistory = async params => await Axios.get('/loans/repayment-history', clean({ params }))

export const approveLoan = async params => await Axios.put('/loans/approve', null, clean({ params }))

export const declineLoan = async params => await Axios.put('/loans/decline', null, clean({ params }))
