import React from 'react'
import { Button, Badge } from '@kudi-inc/dip'
import { formatCurrency, formatText } from 'utils/function'
import { Eye } from 'assets/svg'
import moment from 'moment'
export const formatData = (data, history, url, page, limit) => {
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
    (
      { agentName, balance, timeCreated, collectionDate, totalAmountSaved },
      index
    ) => ({
      SN: (page - 1) * limit + (index + 1),
      agentName: `${agentName}`,
      collectionDate: collectionDate
        ? moment(collectionDate).format('Do MMM YY')
        : 'N/A',
      timeCreated: timeCreated
        ? moment(timeCreated).format('Do MMM, YYYY hh:mm a')
        : 'N/A',
      balance: formatCurrency(balance),
      totalAmountSaved: totalAmountSaved
        ? formatCurrency(totalAmountSaved)
        : 'N/A'
    })
  )
}

export const formatPlanRevenueLog = (data, history, page, limit) => {
  return data.map(
    (
      { expectedDeductionDate, actualDeductionDate, amount, planStatus },
      index
    ) => ({
      sN: (page - 1) * limit + (index + 1),
      expectedDeductionDate: expectedDeductionDate
        ? moment(expectedDeductionDate).format('Do MMM YY')
        : 'N/A',
      actualDeductionDate: actualDeductionDate
        ? moment(actualDeductionDate).format('Do MMM YY')
        : 'N/A',
      amount: formatCurrency(amount),
      planStatus: planStatus ? (
        <Badge variant={planStatus === 'ACTIVE' ? 'success' : 'danger'}>
          {planStatus}
        </Badge>
      ) : (
        'N/A'
      )
    })
  )
}

export const formatCashoutLog = (data, history, url, page, limit) => {
  return data.map(
    ({ timeCreated, amount, type, status, agentName }, index) => ({
      SN: (page - 1) * limit + (index + 1),
      timeCreated: moment(timeCreated).format('DD/MM/YY'),
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
      ),
      timeCreated: moment(timeCreated).format('DD/MM/YY')
    })
  )
}

export const formatWalletHistory = (data, page, limit) => {
  return data.map(
    (
      {
        time_updated,
        transaction_type,
        source,
        wallet_balance,
        amount,
        status
      },
      index
    ) => ({
      SN: (page - 1) * limit + (index + 1),
      time_updated: moment(time_updated).format('Do MMM, YYYY hh:mm a'),
      transaction_type: formatText(transaction_type),
      amount: formatCurrency(amount),
      source: formatText(source),
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
