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
        planTitle
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
      planTitle: formatText(planTitle),
      status: status ? (
        <Badge
          variant={
            status === 'APPROVED'
              ? 'success'
              : status === 'DECLINED'
              ? 'danger'
              : 'warning'
          }
        >
          {status}
        </Badge>
      ) : (
        'N/A'
      ),
      timeCreated: moment(timeCreated).format('DD/MM/YY'),
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

export const DefaultParams = {
  page: 1,
  startDate: '',
  endDate: '',
  from: '',
  to: '',
  phoneNumber: '',
  number: '',
  showReset: false,
  focusedInput: null,
  status: ''
}

export const ParamsReducer = (params, { type, payload }) => {
  console.log(payload, 'chiiiiiiiiiiiii')
  switch (type) {
    case 'UPDATE_PAGE':
      return {
        ...params,
        page: payload
      }
    case 'UPDATE_STATUS':
      return {
        ...params,
        ...payload
      }
    case 'UPDATE_PHONENUMBER':
      return {
        ...params,
        phoneNumber: payload
      }
    case 'UPDATE_NUMBER':
      return {
        ...params,
        number: payload
      }

    case 'UPDATE_DATE':
      return {
        ...params,
        ...payload
      }
    case 'UPDATE_FOCUSEDINPUT':
      return {
        ...params,
        focusedInput: payload
      }
    case 'RESET':
      return DefaultParams
    default:
      return params
  }
}

export const statusOptions = [
  { text: 'Select Status', value: '' },
  { text: 'Approved', value: 'APPROVED' },
  { text: 'Cash Delivered', value: 'CASH_DELIVERED' },
  { text: 'Declined', value: 'DECLINED' },
  { text: 'Pending', value: 'PENDING' },
  { text: 'Pending Validation', value: 'PENDING_VALIDATION' },
  { text: 'Voucher Redeemed', value: 'VOUCHER_REDEEMED' }
]
export const TableColumns = [
  {
    key: 'name',
    render: 'Name'
  },
  {
    key: 'planTitle',
    render: 'Plan'
  },
  {
    key: 'marketName',
    render: 'Market Name'
  },
  {
    key: 'agentName',
    render: 'Agent Name'
  },
  {
    key: 'managerName',
    render: 'Manager Name'
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
