import React from 'react'
import moment from 'moment'
import { Button, Badge } from '@kudi-inc/dip'
import { formatCurrency, formatText } from 'utils/function'
import { Eye } from 'assets/svg'
export const formatData = (data, history, url, page, limit) => {
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
        planTitle
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
      timeCreated: moment(timeCreated).format('l'),
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