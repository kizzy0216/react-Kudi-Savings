import { formatCurrency, formatText } from '../../utils/function'
import moment from 'moment'
import { Badge, Button } from '@kudi-inc/dip'
import { Eye } from '../../assets/svg'
import React from 'react'
import { Link } from 'react-router-dom'

export const initialMarkets = [{ text: 'All Markets', value: '' }]

export const loanStatuses = [
  { text: 'Filter By', value: '' },
  { text: 'Pending Approval', value: 'PENDING_APPROVAL' },
  { text: 'Approved Pending Disbursement', value: 'PENDING_DISBURSEMENT' },
  { text: 'Loans In Progress', value: 'ACTIVE' },
  { text: 'Declined', value: 'DECLINED' },
  { text: 'Completed', value: 'PAID' },
]

export const tableColumns = [
  { key: 'id', render: 'LOAN ID' },
  { key: 'name', render: 'CUSTOMER NAME' },
  { key: 'amount', render: 'AMOUNT' },
  { key: 'tenure', render: 'TENURE' },
  { key: 'interest', render: 'INTEREST RATE' },
  { key: 'repayment', render: 'REPAYMENT' },
  { key: 'timeCreated', render: 'LOAN DATE' },
  { key: 'status', render: 'STATUS' },
  { key: 'action', render: '' }
]

const sampleTableData = [
  {
    id: 1,
    name: 'Favour',
    amount: 5000,
    tenure: 1,
    interest: 0.05,
    repayment: 150000,
    timeCreated: new Date(),
    status: 'PENDING_APPROVAL'
  },
  {
    id: 2,
    name: 'Favour',
    amount: 5000,
    tenure: 1,
    interest: 0.05,
    repayment: 150000,
    timeCreated: new Date(),
    status: 'PAID'
  },
  {
    id: 3,
    name: 'Favour',
    amount: 5000,
    tenure: 1,
    interest: 0.05,
    repayment: 150000,
    timeCreated: new Date(),
    status: 'DECLINED'
  },
  {
    id: 4,
    name: 'Favour',
    amount: 5000,
    tenure: 1,
    interest: 0.05,
    repayment: 150000,
    timeCreated: new Date(),
    status: 'ACTIVE'
  },
  {
    id: 5,
    name: 'Favour',
    amount: 5000,
    tenure: 1,
    interest: 0.05,
    repayment: 150000,
    timeCreated: new Date(),
    status: 'PAID'
  },
  {
    id: 6,
    name: 'Favour',
    amount: 5000,
    tenure: 1,
    interest: 0.05,
    repayment: 150000,
    timeCreated: new Date(),
    status: 'PAID'
  }
]

export const formatStatus = status => {
  switch (status) {
    case 'ACTIVE':
      return 'In progress'
    case 'DECLINED':
      return 'Declined'
    case 'PENDING_DISBURSEMENT':
      return 'Pending Disbursement'
    case 'PENDING_APPROVAL':
      return 'Pending'
    case 'PAID':
      return 'Completed'
  }
}

export const formatTableData = (data, history, url, page, limit) => {
  return data.map(
    (
      { id, name, amount, tenure, interest, repayment, timeCreated, status },
      index
    ) => ({
      sN: (page - 1) * limit + (index + 1),
      id,
      name: formatText(name),
      amount: formatCurrency(amount),
      tenure,
      interest: (interest * 100) + '%',
      repayment: formatCurrency(repayment),
      timeCreated: moment(timeCreated).format('DD/MM/YY'),
      status: status ? (
        <Badge
          variant={
            status === 'PAID'
              ? 'success'
              : status === 'ACTIVE'
              ? 'primary'
              : status === 'PENDING_APPROVAL'
              ? 'warning'
              : status === 'PENDING_DISBURSEMENT'
              ? 'warning'
              : status === 'DECLINED'
              ? 'danger'
              : 'warning'
          }
        >
          {formatStatus(status)}
        </Badge>
      ) : (
        'N/A'
      ),
      action: (
        <Link to={`/loans/details/${id}`}>
          <Button icon={<Eye />} variant="flat">
            View
          </Button>
        </Link>
      )
    })
  )
}

export const amountWithCommas = amount => {
  if (typeof amount !== 'number') {
    amount = parseInt(amount)
  }
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
