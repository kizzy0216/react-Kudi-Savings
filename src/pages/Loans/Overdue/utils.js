import { formatCurrency, formatText } from '../../../utils/function'
import moment from 'moment'
import { Badge, Button } from '@kudi-inc/dip'
import { Eye } from '../../../assets/svg'
import React from 'react'

export const initialMarkets = [
  { text: 'All Markets', value: '' },
  { text: 'Alimosho', value: 'alimosho-id' }
]

export const tableColumns = [
  { key: 'id', render: 'LOAN ID' },
  { key: 'name', render: 'CUSTOMER NAME' },
  { key: 'amount', render: 'AMOUNT' },
  { key: 'tenure', render: 'TENURE' },
  { key: 'repayment', render: 'REPAYMENT' },
  { key: 'timeCreated', render: 'LOAN DATE' },
  { key: 'overdueBy', render: 'OVERDUE BY' },
  { key: 'action', render: '' }
]

export const tableData = [
  {
    id: 1,
    name: 'Favour',
    amount: 5000,
    tenure: 1,
    repayment: 150000,
    timeCreated: new Date(),
    overdueBy: 10
  },
  {
    id: 2,
    name: 'Favour',
    amount: 5000,
    tenure: 1,
    repayment: 150000,
    timeCreated: new Date(),
    overdueBy: 10
  },
  {
    id: 3,
    name: 'Favour',
    amount: 5000,
    tenure: 1,
    repayment: 150000,
    timeCreated: new Date(),
    overdueBy: 10
  }, {
    id: 4,
    name: 'Favour',
    amount: 5000,
    tenure: 1,
    repayment: 150000,
    timeCreated: new Date(),
    overdueBy: 10
  }, {
    id: 5,
    name: 'Favour',
    amount: 5000,
    tenure: 1,
    repayment: 150000,
    timeCreated: new Date(),
    overdueBy: 10
  }
]

export const formatTableData = (data, history, url, page, limit) => {
  return data.map(
    ({ id, name, amount, tenure, repayment, timeCreated, overdueBy }, index) => ({
      sN: (page - 1) * limit + (index + 1),
      id,
      name: formatText(name),
      amount: formatCurrency(amount),
      tenure,
      repayment: formatCurrency(repayment),
      timeCreated: moment(timeCreated).format('DD/MM/YY'),
      overdueBy: `${overdueBy} Days`,
      action: (
        <Button
          icon={<Eye/>}
          variant="flat"
          onClick={() => history.push(`${url}/${id}`)}
        >
          View
        </Button>
      )
    })
  )
}
