export const FundLoanValidation = values => {
    let errors = {}
    if (!values.amount) {
      errors.amount = 'Amount is required'
    }
    
    return errors
  }
  