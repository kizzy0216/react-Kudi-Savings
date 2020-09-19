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
    : `N/A`

export const fecthImage = async ({ id }) =>
  await MediaService.get(`/images/${id}`)

export const formatText = text => (text ? text : `N/A`)

export const formatWalletData = (data, page, limit) => {
  return data.map(
    (
      { amount, meta, status, time_updated, wallet_balance, transaction_type },
      index
    ) => ({
      sN: (page - 1) * limit + (index + 1),
      transaction_type: formatText(transaction_type),
      sender: meta && meta.sender ? formatText(meta.sender) : 'N/A',
      status: status ? (
        <Badge variant={status === 'SUCCESS' ? 'success' : 'danger'}>
          {status}
        </Badge>
      ) : (
        'N/A'
      ),
      amount: formatCurrency(amount),
      wallet_balance: formatCurrency(wallet_balance),
      time: moment(time_updated).format('llll'),
      source: formatText(meta.source)
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
        : 'N/A',
      timeCreated: timeCreated
        ? moment(timeCreated).format('Do MMM, YYYY hh:mm a')
        : 'N/A',
      walletBalance:
        walletBalance === '-'
          ? walletBalance
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
  return data.map(
    ({ timeUpdated, amount, agentName, dsaPhone, status }, index) => ({
      SN: (page - 1) * limit + (index + 1),
      timeUpdated: timeUpdated
        ? moment(timeUpdated).format('Do MMM, YYYY hh:mm a')
        : 'N/A',
      amount: formatCurrency(amount),
      agentName: formatCurrency(agentName),
      amountCollected: amount ? formatCurrency(amount) : 'N/A',
      dsaPhone: dsaPhone ? dsaPhone : 'N?A',
      status: status ? (
        <Badge variant={status === 'SUCCESS' ? 'success' : 'danger'}>
          {status}
        </Badge>
      ) : (
        'N/A'
      )
    })
  )
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
    key: 'dsaphone',
    render: 'PHONE NUMBER'
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
      market: market ? market.name : 'N/A',
      phoneNumber: phoneNumber ? phoneNumber : 'N/A',
      totalSaved: formatCurrency(totalSaved),
      totalWithdrawn: formatCurrency(totalWithdrawn),
      status: status ? (
        <Badge variant={status === 'ACTIVE' ? 'success' : 'danger'}>
          {status}
        </Badge>
      ) : (
        'N/A'
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
        'N/A'
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
    ({ agentName, balance, timeCreated, collectionDate, amount }, index) => ({
      SN: (page - 1) * limit + (index + 1),
      agentName: `${agentName}`,
      collectionDate: collectionDate
        ? moment(collectionDate).format('Do MMM YY')
        : 'N/A',
      timeCreated: timeCreated
        ? moment(timeCreated).format('Do MMM, YYYY hh:mm a')
        : 'N/A',
      balance: formatCurrency(balance),
      amount: amount ? formatCurrency(amount) : '-'
    })
  )
}

export const formatPlanRevenueLog = (data, page, limit) => {
  return data.map(
    (
      { expectedDeductionDate, deductionDate, revenue, isRevenueDeducted },
      index
    ) => ({
      sN: (page - 1) * limit + (index + 1),
      expectedDeductionDate: expectedDeductionDate
        ? moment(expectedDeductionDate).format('Do MMM YY')
        : 'N/A',
      actualDeductionDate: deductionDate
        ? moment(deductionDate).format('Do MMM YY')
        : 'N/A',
      amount: formatCurrency(revenue),
      planStatus: isRevenueDeducted ? (
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
      )
    })
  )
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
      source: formatText(meta.source),
      wallet_balance: formatCurrency(wallet_balance),
      status: status ? (
        <Badge variant={status === 'SUCCESS' ? 'success' : 'danger'}>
          {status}
        </Badge>
      ) : (
        'N/A'
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
    key: 'balance',
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
    render: 'SOURCE'
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
        'N/A'
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
  { text: 'Voucher Redeemed', value: 'VOUCHER_REDEEMED' }
]
