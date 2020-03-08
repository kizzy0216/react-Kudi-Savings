import React from 'react'
import { Button, Badge } from '@kudi-inc/dip'
import { formatCurrency } from 'utils/function'
import { Eye } from 'assets/svg'
export const formatData = (data, history, url) => {
  return data.map(
    ({
      firstName,
      market,
      lastName,
      cashBalance,
      status,
      phoneNumber,
      totalSaved,
      totalWithdrawn,
      id
    }) => ({
      fullName: `${firstName} ${lastName}`,
      cashBalance: formatCurrency(cashBalance),
      market: market ? market.name : 'N/A',
      phoneNumber: phoneNumber ? phoneNumber : 'N/A',
      totalSaved: formatCurrency(totalSaved),
      totalWithdrawn: formatCurrency(totalWithdrawn),
      status: status ? (
        <Badge variant={status === 'ACTIVE' ? 'success' : 'pending'}>
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