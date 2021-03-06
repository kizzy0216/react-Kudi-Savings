import React from 'react'
import moment from 'moment'
import { Button } from '@kudi-inc/dip'
import { formatCurrency, formatText } from 'utils/function'
import { Eye } from 'assets/svg'

export const formatData = (data, history, url, page, limit) => {
  return data.map(
    (
      {
        marketName,
        plan,
        totalAmountSaved,
        agentName,
        id,
        amount,
        collectionDate,
        timeCreated
      },
      index
    ) => ({
      sN: (page - 1) * limit + (index + 1),
      marketName: <div id="marketName">{formatText(marketName)}</div>,
      plan: formatText(plan),
      agentName: formatText(agentName),
      totalAmountSaved: formatCurrency(totalAmountSaved),
      amount: formatCurrency(amount),
      collectionDate: moment(collectionDate).format('L'),
      timeCreated: moment(timeCreated).format('L'),
      action: (
        <Button
          icon={<Eye />}
          variant="flat"
          onClick={() => history.push(`${url}/${id}`)}
        >
          View
        </Button>
      )
    })
  )
}

export const TableColumns = [
  { key: 'sN', render: 'S/N' },
  {
    key: 'marketName',
    render: 'Market'
  },
  { key: 'agentName', render: 'DSA' },
  {
    key: 'plan',
    render: 'Plan'
  },
  {
    key: 'amount',
    render: 'Amount'
  },
  {
    key: 'totalAmountSaved',
    render: 'Total Saved'
  },
  { key: 'timeCreated', render: 'Date Created' },
  { key: 'collectionDate', render: 'Collection Date' },
  { key: 'action', render: 'action' }
]
