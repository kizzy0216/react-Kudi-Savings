
import React from 'react'
import { Badge } from '@kudi-inc/dip'
import moment from 'moment'
import { MediaService } from 'utils/axios'

export const convertObjToArray = obj => {
  const newArray = Object.keys(obj).map(item => obj[item])
  return newArray
}

export const formatCurrency = num =>
  typeof num === 'number'
    ? `₦${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
    : `N/A`

export const fecthImage = async ({ id }) =>
  await MediaService.get(`/images/${id}`)

export const formatText = text => (text ? text : `N/A`)


export const formatWalletData = (data, page, limit) => {
  return data.map(
    (
      { amount, meta, status, time_updated, wallet_balance, transaction_type },
      index
    ) => ({
      sN: (page - 1) * limit + (index + 1),
      transaction_type: formatText(transaction_type),
      sender: meta && meta.sender ? formatText(meta.sender) : 'N/A',
      status: status ? (
        <Badge variant={status === 'SUCCESS' ? 'success' : 'danger'}>
          {status}
        </Badge>
      ) : (
        'N/A'
      ),
      amount: formatCurrency(amount),
      wallet_balance: formatCurrency(wallet_balance),
      time: moment(time_updated).format('llll')
    })
  )
}

