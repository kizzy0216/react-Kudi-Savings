export const planValidation = values => {
  let errors = {}
  if (!values.dailyAmount) {
    errors.dailyAmount = 'Daily amount is required'
  }
  if (!values.duration) {
    errors.duration = 'Duration is required'
  }
  if (!values.planId) {
    errors.planId = 'Lga is required'
  }
  if (!values.title) {
    errors.title = 'Title is required'
  }

  return errors
}

export const editValidation = values => {
  let errors = {}
  if (!values.title) {
    errors.title = 'Title is required'
  }
  if (!values.low) {
    errors.low = 'Low is required'
  }
  if (!values.high) {
    errors.high = 'High is required'
  }

  return errors
}
