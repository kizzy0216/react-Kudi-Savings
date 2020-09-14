import moment from 'moment'

export const tableColumns = [
  { key: 'repaymentDate', render: 'LOAN REPAYMENT DATE' },
  { key: 'timeCreated', render: 'TIME CREATED' },
  { key: 'amountPaid', render: 'AMOUNT PAID' },
  { key: 'modeOfPayment', render: 'MODE OF PAYMENT' },
  { key: 'balance', render: 'BALANCE' }
]

const tableData = [
  { repaymentDate: new Date(), timeCreated: new Date(), amountPaid: 1000, modeOfPayment: 'CASH', balance: 100000 },
  { repaymentDate: new Date(), timeCreated: new Date(), amountPaid: 1000, modeOfPayment: 'TRANSFER', balance: 100000 },
  { repaymentDate: new Date(), timeCreated: new Date(), amountPaid: 1000, modeOfPayment: 'CASH', balance: 100000 },
  { repaymentDate: new Date(), timeCreated: new Date(), amountPaid: 1000, modeOfPayment: 'TRANSFER', balance: 100000 },
  { repaymentDate: new Date(), timeCreated: new Date(), amountPaid: 1000, modeOfPayment: 'CASH', balance: 100000 },
  { repaymentDate: new Date(), timeCreated: new Date(), amountPaid: 1000, modeOfPayment: 'TRANSFER', balance: 100000 }
]

export const formatTableData = (data, history, url, page, limit) => {
  return data.map(
    ({ repaymentDate, timeCreated, amountPaid, modeOfPayment, balance }, index) => ({
      sN: (page - 1) * limit + (index + 1),
      repaymentDate: moment(repaymentDate).format('DD/MM/YY'),
      timeCreated: moment(timeCreated).format('DD/MM/YY'),
      amountPaid,
      modeOfPayment,
      balance
    })
  )
}
