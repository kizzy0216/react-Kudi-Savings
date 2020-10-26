import React from 'react'
import { Button, Badge } from '@kudi-inc/dip'
import moment from 'moment'
import { Eye } from 'assets/svg'
import { MediaService } from 'utils/axios'

export const convertObjToArray = obj => {
  const newArray = Object.keys(obj).map(item => obj[item])
  return newArray
}

export const formatCurrency = num =>
  typeof num === 'number'
    ? `₦${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
    : `-`

export const fecthImage = async ({ id }) =>
  await MediaService.get(`/images/${id}`)

export const formatText = text => (text ? text : `-`)

export const formatWalletData = (data, page, limit) => {
  return data.map(
    (
      { amount, meta, status, time_updated, wallet_balance, transaction_type },
      index
    ) => ({
      sN: (page - 1) * limit + (index + 1),
      transaction_type: formatText(transaction_type),
      sender: meta && meta.sender ? formatText(meta.sender) : '-',
      status: status ? (
        <Badge variant={status === 'SUCCESS' ? 'success' : 'danger'}>
          {status}
        </Badge>
      ) : (
        '-'
      ),
      amount: formatCurrency(amount),
      wallet_balance: formatCurrency(wallet_balance),
      time: moment(time_updated).format('llll'),
      source: formatSource(meta)
    })
  )
}

export const sourceOptions = [
  { text: 'Filter By', value: '' },
  { text: 'Loans', value: 'LOANS' },
  { text: 'Collections', value: 'COLLECTIONS' },
  { text: 'P2P', value: 'P2P' },
  { text: 'Wallet Top-Up', value: 'WALLET_TOP_UP' },
  { text: 'Contribution', value: 'CONTRIBUTION' }
]

export const stashSourceOptions = [
  { text: 'All Sources', value: '' },
  { text: 'STASH-TOP UP', value: 'STASH_TOPUP' },
  { text: 'PLAN-TOP UP', value: 'PLAN_TOPUP' },
  { text: 'PLAN COLLECTION', value: 'PLAN_COLLECTION' },
  { text: 'CASHOUT', value: 'CASHOUT' },
  { text: 'CHARGES', value: 'CHARGES' },
  { text: 'REFERRALS', value: 'REFERRALS' },
  { text: 'LOAN REPAYMENT', value: 'LOAN_REPAYMENT' }
]
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
  status: '',
  source: '',
  transactionType: 'CREDIT'
}

export const ParamsReducer = (params, { type, payload }) => {
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
    case 'FILTER_SOURCE':
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

    case 'TRANSACTION_TYPE':
      return {
        ...params,
        transactionType: payload
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
export const formatData = (history, url, page, limit, data) => {
  return data.map(
    (
      {
        customerName,
        walletBalance,
        totalAmountSaved,
        timeCreated,
        collectionDate,
        amount,
        userPlanId
      },
      index
    ) => ({
      SN: (page - 1) * limit + (index + 1),
      name: `${customerName}`,
      collectionDate: collectionDate
        ? moment(collectionDate).format('DD/MM/YY')
        : '-',
      timeCreated: timeCreated
        ? moment(timeCreated).format('Do MMM, YYYY hh:mm a')
        : '-',
      walletBalance:
        walletBalance === '-'
          ? '-'
          : walletBalance === '--'
          ? '--'
          : formatCurrency(parseFloat(walletBalance)),
      totalAmountSaved: formatCurrency(totalAmountSaved),
      amountCollected: formatCurrency(amount),
      action: (
        <Button
          icon={<Eye />}
          variant="flat"
          onClick={() =>
            history.push({
              pathname: `${url}/customer-plan`,
              state: userPlanId
            })
          }
        >
          View
        </Button>
      )
    })
  )
}

export const formatP2P = (page, limit, data) => {
  return data.map(({ timeUpdated, amount, meta, status }, index) => ({
    SN: (page - 1) * limit + (index + 1),
    timeUpdated: timeUpdated
      ? moment(timeUpdated).format('Do MMM, YYYY hh:mm a')
      : '-',
    amount: formatCurrency(amount),
    agentName: meta?.sender_name || '-',
    amountCollected: amount ? formatCurrency(amount) : '-',
    status: status ? (
      <Badge variant={status === 'SUCCESS' ? 'success' : 'danger'}>
        {status}
      </Badge>
    ) : (
      '-'
    )
  }))
}


export const P2PTableColumns = [
  {
    key: 'timeUpdated',
    render: 'DATE'
  },
  {
    key: 'amount',
    render: 'AMOUNT'
  },
  {
    key: 'agentName',
    render: 'KUDI AGENT'
  },
  {
    key: 'status',
    render: 'STATUS'
  }
]

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
    key: 'timeCreated',
    render: 'DATE'
  },
  {
    key: 'amount',
    render: 'AMOUNT'
  },
  {
    key: 'type',
    render: 'TYPE'
  },
  {
    key: 'status',
    render: 'STATUS'
  },
  {
    key: 'agentName',
    render: 'AGENT'
  },
  {
    key: 'action',
    render: ''
  }
]

export const WalletHistoryTableColumns = [
  {
    key: 'sN',
    render: 'SN'
  },
  { key: 'time', render: 'Date' },
  { key: 'transaction_type', render: 'Type' },
  {
    key: 'source',
    render: 'Source'
  },
  {
    key: 'amount',
    render: 'Amount'
  },
  {
    key: 'wallet_balance',
    render: 'Balance'
  },
  {
    key: 'status',
    render: 'Status'
  }
]

export const CashoutLogTableColumn = [
  {
    key: `timeCreated`,
    render: 'DATE'
  },
  {
    key: 'amount',
    render: 'AMOUNT'
  },
  {
    key: 'type',
    render: 'TYPE'
  },
  {
    key: 'status',
    render: 'STATUS'
  },
  {
    key: 'agentName',
    render: 'AGENT'
  }
]

export const formatCustomerData = (data, history, url, page, limit) => {
  return data.map(
    (
      {
        firstName,
        market,
        lastName,
        cashBalance,
        status,
        phoneNumber,
        totalSaved,
        totalWithdrawn,
        id
      },
      index
    ) => ({
      sN: (page - 1) * limit + (index + 1),
      fullName: `${firstName} ${lastName}`,
      cashBalance: formatCurrency(cashBalance),
      market: market ? market.name : '-',
      phoneNumber: phoneNumber ? phoneNumber : '-',
      totalSaved: formatCurrency(totalSaved),
      totalWithdrawn: formatCurrency(totalWithdrawn),
      status: status ? (
        <Badge variant={status === 'ACTIVE' ? 'success' : 'danger'}>
          {status}
        </Badge>
      ) : (
        '-'
      ),
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

export const formatPlan = (data, history, url, page, limit) => {
  return data.map(
    (
      {
        collectionCount,
        duration,
        dailyAmount,
        amountSaved,
        planStatus,
        plan,
        id,
        title
      },
      index
    ) => ({
      sN: (page - 1) * limit + (index + 1),
      plan: `${title}(${plan.title})`,
      collectionCount: formatText(collectionCount),
      duration: `${formatText(duration)} days`,
      amountSaved: formatCurrency(amountSaved),
      dailyAmount: formatCurrency(dailyAmount),
      planStatus: planStatus ? (
        <Badge variant={planStatus === 'ACTIVE' ? 'success' : 'danger'}>
          {planStatus}
        </Badge>
      ) : (
        '-'
      ),
      action: (
        <Button
          icon={<Eye />}
          variant="flat"
          onClick={() =>
            history.push({
              pathname: `${url}/plan/${id}`,
              state: id
            })
          }
        >
          View
        </Button>
      )
    })
  )
}

export const formatCollections = (history, url, page, limit, data) => {
  return data.map(
    (
      { agentName, walletBalance, timeCreated, collectionDate, amount },
      index
    ) => ({
      SN: (page - 1) * limit + (index + 1),
      agentName: `${agentName}`,
      collectionDate: collectionDate
        ? moment(collectionDate).format('Do MMM YY')
        : '-',
      timeCreated: timeCreated
        ? moment(timeCreated).format('Do MMM, YYYY hh:mm a')
        : '-',
      walletBalance:
        walletBalance === '-'
          ? '-'
          : walletBalance === '--'
          ? '-'
          : formatCurrency(parseFloat(walletBalance)),
      amount: amount ? formatCurrency(amount) : '-'
    })
  )
}

export const formatPlanRevenueLog = (data, page, limit) => {
  return data.map(
    (
      { expectedDeductionDate, deductionDate, revenue, revenueDeducted },
      index
    ) => ({
      sN: (page - 1) * limit + (index + 1),
      expectedDeductionDate: expectedDeductionDate
        ? moment(expectedDeductionDate).format('Do MMM YY')
        : '-',
      actualDeductionDate: deductionDate
        ? moment(deductionDate).format('Do MMM YY')
        : '-',
      amount: formatCurrency(revenue),
      planStatus: revenueDeducted ? (
        <Badge variant={'success'}>Success</Badge>
      ) : (
        <Badge variant={'warning'}>Pending</Badge>
      )
    })
  )
}

export const formatCashoutLog = (data, history, url, page, limit) => {
  return data.map(
    ({ timeCreated, amount, type, status, agentName }, index) => ({
      SN: (page - 1) * limit + (index + 1),
      timeCreated: moment(timeCreated).format('Do MMM YY'),
      amount: formatCurrency(amount),
      type: formatText(type),
      agentName: formatText(agentName),
      status: status ? (
        <Badge
          variant={
            status === 'CASH_DELIVERED'
              ? 'success'
              : status === 'DECLINED'
              ? 'danger'
              : 'warning'
          }
        >
          {status}
        </Badge>
      ) : (
        '-'
      )
    })
  )
}

const formatReason = meta => {
  if (meta.source && meta.withdrawal_id && meta.source === 'withdrawal') {
    if (!meta.withdrawal_id.includes('MARKET_MANUAL_DEBIT'))
      return formatText('cashout')

    if (meta.withdrawal_id.includes('MARKET_MANUAL_DEBIT'))
      return formatText('reversal')
  } else if (meta.source && meta.source === 'commission') {
    return formatText('revenue')
  } else if (
    meta.transaction_id &&
    meta.transaction_id.includes('MARKET_MANUAL_CREDIT')
  ) {
    return formatText('refund')
  } else if (meta.deposit_id) {
    return formatText('collection')
  } else {
    return formatText('-')
  }
}

export const formatSource = meta => {
  if (meta.source && meta.withdrawal_id) {
    if (
      meta.source === 'loan_payment' &&
      meta.withdrawal_id.includes('LOAN_DEBIT')
    )
      return formatText('Loan')

    if (
      meta.source === 'contribution' &&
      !meta.withdrawal_id.includes('LOAN_DEBIT')
    )
      return formatText('Collections')
  } else if (meta.deposit_id) {
    return formatText('wallet topup')
  } else {
    return formatText('-')
  }
}

export const formatWalletHistory = (data, page, limit) => {
  return data.map(
    (
      { time_updated, transaction_type, meta, wallet_balance, amount, status },
      index
    ) => ({
      SN: (page - 1) * limit + (index + 1),
      time_updated: moment(time_updated).format('Do MMM, YYYY hh:mm a'),
      transaction_type: formatText(transaction_type),
      amount: formatCurrency(amount),
      source: formatReason(meta),
      // source: formatText(
      //   meta.source === 'withdrawal'
      //     ? 'cashout'
      //     : meta.source === 'commission'
      //     ? 'revenue'
      //     : meta.source === 'collections'
      //     ? 'collection'
      //     : meta.source
      //),
      wallet_balance: formatCurrency(wallet_balance),
      status: status ? (
        <Badge variant={status === 'SUCCESS' ? 'success' : 'danger'}>
          {status}
        </Badge>
      ) : (
        '-'
      )
    })
  )
}

export const FormatStashData = (data, setStashDetails, setShowStashDetails) => {
  return data.map(
    ({
      id,
      timeCreated,
      amount,
      reference,
      transactionType,
      type,
      balance,
      sourceAccountName,
      sourceAccountNumber,
      sourceBankName
    }) => ({
      id: id,
      date: timeCreated && moment(timeCreated).format('Do MMM, YYYY hh:mm a'),
      amount: formatCurrency(amount),
      reference:
        reference.length > 16 ? `${reference.slice(0, 15)}...` : reference,
      type: transactionType ? transactionType : '-',
      source: formatText(type),
      balance: balance ? formatCurrency(balance) : '-',
      action: (
        <Button
          icon={<Eye />}
          variant="flat"
          onClick={() => {
            setStashDetails({
              sourceAccountName,
              sourceAccountNumber,
              sourceBankName,
              amount,
              reference,
              type,
              timeCreated,
              transactionType
            })
            setShowStashDetails(true)
          }}
        >
          View
        </Button>
      )
    })
  )
}

export const CustomerTableColumn = [
  { key: 'sN', render: 'S/N' },
  {
    key: 'fullName',
    render: 'Full name'
  },
  {
    key: 'phoneNumber',
    render: 'Phone Number'
  },

  { key: 'totalSaved', render: 'Amount Saved' },

  {
    key: 'totalWithdrawn',
    render: 'Amount Withdrawn'
  },

  {
    key: 'action',
    render: 'ACTION'
  }
]

export const PlanCollectionTableColumn = [
  {
    key: `collectionDate`,
    render: 'COLLECTION DATE'
  },
  {
    key: 'timeCreated',
    render: 'TIME CREATED'
  },
  {
    key: 'amount',
    render: 'AMOUNT COLLECTED'
  },
  {
    key: 'walletBalance',
    render: 'BALANCE'
  },

  {
    key: 'agentName',
    render: 'AGENT'
  }
]

export const PlanRevenueLogTableColumn = [
  {
    key: `expectedDeductionDate`,
    render: 'EXPECTED DEDUCTION DATE'
  },
  {
    key: 'actualDeductionDate',
    render: 'ACTUAL DEDUCTION DATE'
  },
  {
    key: 'amount',
    render: 'AMOUNT'
  },
  {
    key: 'planStatus',
    render: 'STATUS'
  }
]

export const UserPlanTableColumn = [
  {
    key: `plan`,
    render: 'Plan'
  },
  {
    key: 'collectionCount',
    render: 'Collection Count'
  },
  {
    key: 'duration',
    render: 'Duration'
  },
  { key: 'dailyAmount', render: 'Daily Amount' },

  { key: 'amountSaved', render: 'Amount Saved' },

  {
    key: 'planStatus',
    render: 'Plan Status'
  },

  {
    key: 'action',
    render: 'VIEW HISTORY'
  }
]

export const PlanWalletHistoryTableColumn = [
  {
    key: `SN`,
    render: 'S/N'
  },
  {
    key: `time_updated`,
    render: 'DATE'
  },
  {
    key: 'transaction_type',
    render: 'TYPE'
  },
  {
    key: 'amount',
    render: 'AMOUNT'
  },
  {
    key: 'source',
    render: 'REASON'
  },
  {
    key: 'wallet_balance',
    render: 'BALANCE'
  },
  {
    key: 'status',
    render: 'STATUS'
  }
]
export const StashTableColumn = [
  {
    key: `date`,
    render: `DATE`
  },
  {
    key: `amount`,
    render: `AMOUNT`
  },
  {
    key: `reference`,
    render: `REFERENCE`
  },
  {
    key: `type`,
    render: `TYPE`
  },
  {
    key: `source`,
    render: `SOURCE`
  },
  {
    key: `balance`,
    render: `BALANCE`
  },
  {
    key: `action`,
    render: ``
  }
]
export const formatCashoutData = (data, history, url, page, limit) => {
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
      type: formatText(type),
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
        '-'
      ),
      timeCreated: moment(timeCreated).format('DD/MM/YY'),
      action: (
        <Button
          icon={<Eye />}
          variant="flat"
          onClick={() =>
            history.push({
              pathname: `${url}/cashout-details`,
              state: id
            })
          }
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
  { text: 'Cash Delivered', value: 'CASH_DELIVERED' },
  { text: 'Declined', value: 'DECLINED' },
  { text: 'Pending', value: 'PENDING' },
  { text: 'Pending Validation', value: 'PENDING_VALIDATION' },
  { text: 'Pending Image Validation', value: 'PENDING_IMAGE_VALIDATION' },
  { text: 'Voucher Redeemed', value: 'VOUCHER_REDEEMED' }
]

export const formatLoanManager = (data, setViewLoanManager, setManagerId) => {
  return data.map(({firstName, lastName, phoneNumber, email, timeCreated, status, id})  => ({
      fullName: `${firstName} ${lastName}`,
      phoneNumber: phoneNumber ? phoneNumber : '-',
      email: email,
      timeCreated:timeCreated && moment(timeCreated).format('Do MMMM YYYY'),
      status: status ? (
        <Badge variant={status === 'ACTIVE' ? 'success' : status === 'PENDING' ? 'warning' : status === 'SUSPENDED' ? 'danger' : 'warning'}>
          {status}
        </Badge>
      ) : '-',
      action: (
        <Button
          icon={<Eye />}
          variant="flat"
          onClick={()=> {setViewLoanManager(true)
            setManagerId(id)}}
        >
          View
        </Button>
      )
    })
  )
}

export const LoanManagerTable=[
  {
    key: `fullName`,
    render: `FULL NAME`
  },
  {
    key: `phoneNumber`,
    render: `PHONE NUMBER`
  },
  {
    key: `email`,
    render: `EMAIL`
  },
  {
    key: `timeCreated`,
    render: `DATE CREATED`
  },
  {
    key: `status`,
    render: `STATUS`
  },
  {
    key: `action`,
    render: `ACTION`
  }
]