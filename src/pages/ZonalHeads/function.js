import React from 'react'
import { Badge } from '@kudi-inc/dip'
import { formatCurrency, formatText } from 'utils/function'
import moment from 'moment'
export const formatWalletData = (data, page, limit) => {
  return data.map(
    (
      { amount, meta, status, time_updated, wallet_balance, transaction_type },
      index
    ) => ({
      sN: (page - 1) * limit + (index + 1),
      credit: transaction_type === 'CREDIT' && transaction_type?transaction_type:'- - -',
      debit: transaction_type === 'DEBIT' && transaction_type?transaction_type:'- - -' ,
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
