import React from 'react'
import moment from 'moment'
import { Button, Badge } from '@kudi-inc/dip'
import { formatCurrency, formatText } from 'utils/function'
import { Eye } from 'assets/svg'

export const formatData = (history, url, page, limit, data) => {
  return data.map(
    (
      {
        name,
        walletBalance,
        totalAmountSaved,
        timeCreated,
        collectionDate,
        amount,
        id
      },
      index
    ) => ({
      SN: (page - 1) * limit + (index + 1),
      name: `${name}`,
      collectionDate: collectionDate
        ? moment(collectionDate).format('DD/MM/YY')
        : 'N/A',
      timeCreated: timeCreated
        ? moment(timeCreated).format('Do MMM, YYYY hh:mm a')
        : 'N/A',
      walletBalance: formatCurrency(walletBalance),
      totalAmountSaved: formatCurrency(totalAmountSaved),
      amountCollected: amount ? formatCurrency(amount) : 'N/A',
      action: (
        <Button
          icon={<Eye />}
          variant="flat"
          onClick={() => console.log('view clicked')}
        />
      )
    })
  )
}

export const CollectionsTableColumns = [
  {
    key: 'collectionDate',
    render: 'COLLECTION DATE'
  },
  {
    key: 'timeCreated',
    render: 'TIME CREATED'
  },
  {
    key: 'name',
    render: "CUSTOMER'S NAME"
  },
  {
    key: 'amountCollected',
    render: 'AMOUNT COLLECTED'
  },
  {
    key: 'walletBalance',
    render: 'BALANCE'
  },
  {
    key: 'totalAmountSaved',
    render: 'TOTAL SAVED'
  },
  {
    key: 'action',
    render: ''
  }
]

export const WalletTopUpTableColumns = [
  {
    key: 'time',
    render: 'DATE'
  },
  {
    key: 'amount',
    render: 'AMOUNT'
  },
  {
    key: 'status',
    render: 'STATUS'
  }
]

export const CashoutTableColumns = [
  {
    key:'timeCreated',
    render:'DATE'
  },
  {
    key:'amount',
    render:'AMOUNT'
  },
  {
    key:'type',
    render:'TYPE'
  },
  {
    key:'status',
    render:'STATUS'
  },
  {
    key:'agentName',
    render:'AGENT'
  },
  {
    key:'action',
    render:''
  }
]
