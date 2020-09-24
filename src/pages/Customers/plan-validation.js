export const isValidUpdate = values => {
    let errors = {}
  
if (!values.plan) {
    errors.plan = 'Plan is required'
  }
  if (!values.walletNumber) {
    errors.plan = 'Wallet number is required'
  }
  if (!values.amount) {
    errors.plan = 'Amount is required'
  }
  if (!values.reason) {
    errors.reason = 'Reason for credit is required'
  }

  return errors
}
