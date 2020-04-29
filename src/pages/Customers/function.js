import React from 'react'
import { Button, Badge } from '@kudi-inc/dip'
import { formatCurrency, formatText } from 'utils/function'
import { Eye } from 'assets/svg'
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
          onClick={() => history.push(`${url}/plan/${id}`)}
        >
          View
        </Button>
      )
    })
  )
}
