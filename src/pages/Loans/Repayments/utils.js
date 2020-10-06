import moment from 'moment'
import { formatCurrency } from 'utils/function'

export const tableColumns = [
  { key: 'timeOfPayment', render: 'TIME OF PAYMENT' },
  { key: 'amountPaid', render: 'AMOUNT PAID' },
  { key: 'repaymentType', render: 'MODE OF PAYMENT' },
  { key: 'totalAmountPaid', render: 'BALANCE' }
]

const tableData = [
  {
    repaymentDate: new Date(),
    timeCreated: new Date(),
    amountPaid: 1000,
    modeOfPayment: 'CASH',
    balance: 100000
  },
  {
    repaymentDate: new Date(),
    timeCreated: new Date(),
    amountPaid: 1000,
    modeOfPayment: 'TRANSFER',
    balance: 100000
  },
  {
    repaymentDate: new Date(),
    timeCreated: new Date(),
    amountPaid: 1000,
    modeOfPayment: 'CASH',
    balance: 100000
  },
  {
    repaymentDate: new Date(),
    timeCreated: new Date(),
    amountPaid: 1000,
    modeOfPayment: 'TRANSFER',
    balance: 100000
  },
  {
    repaymentDate: new Date(),
    timeCreated: new Date(),
    amountPaid: 1000,
    modeOfPayment: 'CASH',
    balance: 100000
  },
  {
    repaymentDate: new Date(),
    timeCreated: new Date(),
    amountPaid: 1000,
    modeOfPayment: 'TRANSFER',
    balance: 100000
  }
]

export const formatTableData = (data, history, url, page, limit) => {
  return data.map(
    ({ timeCreated, amountPaid, repaymentType, totalAmountPaid }, index) => ({
      sN: (page - 1) * limit + (index + 1),
      timeOfPayment: timeCreated && moment(timeCreated).format('DD/MM/YY'),
      amountPaid: formatCurrency(amountPaid),
      repaymentType,
      totalAmountPaid: formatCurrency(totalAmountPaid)
    })
  )
}
