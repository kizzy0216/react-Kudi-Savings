import { formatCurrency, formatText } from '../../utils/function'
import moment from 'moment'
import { Badge, Button } from '@kudi-inc/dip'
import { Eye } from '../../assets/svg'
import React from 'react'
import { Link } from 'react-router-dom'

export const initialMarkets = [
  { text: 'All Markets', value: '' }
]

export const loanStatuses = [
  { text: 'Filter By', value: '' },
  { text: 'Pending Approval', value: 'PENDING_APPROVAL' },
  { text: 'Declined', value: 'DECLINED' },
  { text: 'Completed', value: 'PAID' },
  { text: 'Loans In Progress', value: 'ACTIVE' }
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

export const formatTableData = (data, history, url, page, limit) => {
  return data.map(
    ({ id, name, amount, tenure, interest, repayment, timeCreated, status }, index) => ({
      sN: (page - 1) * limit + (index + 1),
      id,
      name: formatText(name),
      amount: formatCurrency(amount),
      tenure,
      interest,
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
                : 'danger'
          }
        >
          {status}
        </Badge>
      ) : (
        'N/A'
      ),
      action: (
        <Link to={`/loans/details/${id}`}>
          <Button
            icon={<Eye/>}
            variant="flat"
          >
            View
          </Button>
        </Link>
      )
    })
  )
}
