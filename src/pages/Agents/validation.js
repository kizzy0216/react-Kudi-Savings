export const isInfo = values => {
  let errors = {}
  if (!values.firstName) {
    errors.firstName = 'First name is required'
  }
  if (!values.lastName) {
    errors.lastName = 'Last name is required'
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = 'Phone number is required'
  }
  if (values.phoneNumber && values.phoneNumber.length < 11) {
    errors.phoneNumber = 'Enter valid phone number'
  }
  if (!values.bvn) {
    errors.bvn = 'BVN is required'
  }
  if (values.bvn && values.bvn.length < 11) {
    errors.bvn = 'Enter valid BVN'
  }
  if (!values.email) {
    errors.email = 'Email address is required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email address is invalid'
  }
  if (!values.gender) {
    errors.gender = 'Gender is required'
  }
  if (!values.state) {
    errors.state = 'State is required'
  }
  if (!values.lga) {
    errors.lga = 'Lga is required'
  }
  if (!values.dob) {
    errors.dob = 'Date of Birth is required'
  }
  if (!values.marketId) {
    errors.marketId = 'Select a market'
  }
  if (!values.imageId) {
    errors.imageId = 'Profile picture is required'
  }
  if (!values.address) {
    errors.address = 'Address is required'
  }
  return errors
}

export const isBusinessValidation = values => {
  let errors = {}
  if (!values.businessName) {
    errors.businessName = 'Business name is required'
  }
  if (!values.businessAddress) {
    errors.businessAddress = 'Business Address is required'
  }
  if (!values.state) {
    errors.state = 'State is required'
  }
  if (!values.lga) {
    errors.lga = 'LGA is required'
  }

  return errors
}

export const isValidUpdate = values => {
  let errors = {}
  if (!values.firstName) {
    errors.firstName = 'First name is required'
  }
  if (!values.lastName) {
    errors.lastName = 'Last name is required'
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = 'Phone number is required'
  }
  if (values.phoneNumber && values.phoneNumber.length < 11) {
    errors.phoneNumber = 'Enter valid phone number'
  }
  if (!values.bvn) {
    errors.bvn = 'BVN is required'
  }
  if (values.bvn && values.bvn.length < 11) {
    errors.bvn = 'Enter valid BVN'
  }
  if (!values.email) {
    errors.email = 'Email address is required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email address is invalid'
  }
  if (!values.gender) {
    errors.gender = 'Gender is required'
  }
  if (!values.state) {
    errors.state = 'State is required'
  }
  if (!values.lga) {
    errors.lga = 'Lga is required'
  }
  if (!values.dob) {
    errors.dob = 'Date of Birth is required'
  }
  if (!values.assignedMarket.id) {
    errors.marketId = 'Select a market'
  }
  if (!values.imageId) {
    errors.imageId = 'Profile picture is required'
  }
  if (!values.identificationImageId) {
    errors.identificationImageId = 'ID Card is required'
  }
  if (!values.address) {
    errors.address = 'Address is required'
  }
  if (!values.guarantor.firstName) {
    errors.guarantorFirstName = `Guarantor's firstname is required`
  }
  if (!values.guarantor.lastName) {
    errors.guarantorLastName = `Guarantor's lastname is required`
  }
  if (!values.guarantor.phoneNumber) {
    errors.guarantorPhoneNumber = `Guarantor's mobile is required`
  }
  if (!values.guarantor.address) {
    errors.guarantorAddress = `Guarantor's address is required`
  }
  if (!values.guarantor.gender) {
    errors.guarantorGender = 'Gender is required'
  }
  return errors
}
