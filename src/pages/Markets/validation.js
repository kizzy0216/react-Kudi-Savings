export const marketValidation = values => {
  let errors = {}
  if (!values.name) {
    errors.name = 'Market name is required'
  }
  if (!values.state) {
    errors.state = 'State is required'
  }
  if (!values.lga) {
    errors.lga = 'Lga is required'
  }
  if (!values.city) {
    errors.city = 'City is required'
  }
  if (!values.population) {
    errors.population = 'Market population is required'
  }

  return errors
}
