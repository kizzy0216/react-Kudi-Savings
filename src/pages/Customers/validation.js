export const isValidUpdate = values => {
  let errors = {}
  if (!values.firstName) {
    errors.firstName = 'First name is required'
  }
  if (!values.lastName) {
    errors.lastName = 'Last name is required'
  }
  // if (!values.businessName) {
  //   errors.businessName = 'Business name is required'
  // }
  if (!values.gender) {
    errors.gender = 'Gender is required'
  }
  if (!values.state) {
    errors.state = 'State is required'
  }
  if (!values.lga) {
    errors.lga = 'Lga is required'
  }
  // if (!values.pictureId) {
  //   errors.pictureId = 'Profile picture is required'
  // }
  // if (!values.identificationCardImageId) {
  //   errors.identificationCardImageId = 'ID Card is required'
  // }
  if (!values.address) {
    errors.address = 'Address is required'
  }
  // if (!values.marketName) {
  //   errors.marketName = 'Market name is required'
  // }
  /************customer's plan********************/
  
  return errors
}
