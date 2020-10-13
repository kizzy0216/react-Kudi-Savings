import React from 'react'
import moment from 'moment'
import { Button, Badge } from '@kudi-inc/dip'
import { formatCurrency, formatText } from 'utils/function'
import { Eye } from 'assets/svg'
export const formatData = (data, history, url, page, limit) => {
  return data.map(
    (
      {
        marketName,
        managerName,
        name,
        agentName,
        cashBalance,
        status,
        phoneNumber,
        amount,
        id,
        timeCreated,
        planTitle,
        type
      },
      index
    ) => ({
      sN: (page - 1) * limit + (index + 1),
      name: `${name}`,
      phoneNumber: formatText(phoneNumber),
      cashBalance: formatCurrency(cashBalance),
      marketName: <div id="marketName">{formatText(marketName)}</div>,
      agentName: formatText(agentName),
      managerName: formatText(managerName),
      amount: formatCurrency(amount),
      type: type,
      planTitle: formatText(planTitle),
      status: status ? (
        <Badge
          variant={
            status === 'APPROVED'
              ? 'primary'
              : status === 'PENDING_DISBURSEMENT'
              ? 'warning'
              : status === 'CASH_DELIVERED'
              ? 'success'
              : status === 'DECLINED'
              ? 'danger'
              : status === 'PENDING'
              ? 'warning'
              : status === 'PENDING_IMAGE_VALIDATION'
              ? 'warning'
              : status === 'PENDING_VALIDATION'
              ? 'warning'
              : status === 'VOUCHER_REDEEMED'
              ? 'primary'
              : 'warning'
          }
        >
          {status}
        </Badge>
      ) : (
        '-'
      ),
      timeCreated: moment(timeCreated).format('DD/MM/YY'),
      action: (
        <Button
          icon={<Eye />}
          variant="flat"
          onClick={() => history.push({ pathname: `${url}/${id}`, type })}
        >
          View
        </Button>
      )
    })
  )
}

export const statusOptions = [
  { text: 'Select Status', value: '' },
  { text: 'Approved', value: 'APPROVED' },
  { text: 'Approved Pending Disbursement', value: 'PENDING_TRANSFER_DISBURSEMENT' },
  { text: 'Pending', value: 'PENDING' },
  { text: 'Pending Validation', value: 'PENDING_VALIDATION' },
  { text: 'Pending Image Validation', value: 'PENDING_IMAGE_VALIDATION' },
  { text: 'Voucher Redeemed', value: 'VOUCHER_REDEEMED' },
  {text: 'Redeemed', value: 'REDEEMED'},
  { text: 'Cash Delivered', value: 'CASH_DELIVERED' },
  { text: 'Declined', value: 'DECLINED' },
]

export const TableColumns = [
  {
    key: 'name',
    render: 'Name'
  },
  {
    key: 'type',
    render: 'TYPE'
  },
  {
    key: 'marketName',
    render: 'Market'
  },
  {
    key: 'agentName',
    render: 'Agent Name'
  },
  {
    key: 'managerName',
    render: "Manager's Name"
  },
  { key: 'amount', render: 'Amount' },

  {
    key: 'status',
    render: 'Status'
  },
  {
    key: 'timeCreated',
    render: 'Time Requested'
  },
  {
    key: 'action',
    render: ''
  }
]
