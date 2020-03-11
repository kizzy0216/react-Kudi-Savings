// import React from 'react'
import moment from 'moment'
// import { Button, Badge } from '@kudi-inc/dip'
import { formatCurrency, formatText } from 'utils/function'
// import { Eye } from 'assets/svg'

export const formatData = (data, history, url, page, limit) => {
  return data.map(
    (
      {
        marketName,
        plan,
        totalAmountSaved,
        agentName,
        id,
        amount,
        collectionDate
      },
      index
    ) => ({
      sN: (page - 1) * limit + (index + 1),
      marketName: formatText(marketName),
      plan: formatText(plan),
      agentName: formatText(agentName),
      totalAmountSaved: formatCurrency(totalAmountSaved),
      amount: formatCurrency(amount),
      collectionDate: moment(collectionDate).format("ddd, MMM Do YYYY, h:mm:ss a")
      //   action: (
      //     <Button
      //       icon={<Eye />}
      //       variant="flat"
      //       onClick={() => history.push(`${url}/${id}`)}
      //     >
      //       View
      //     </Button>
      //   )
    })
  )
}