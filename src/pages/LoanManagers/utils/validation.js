export const LoanManagerValidation = values => {
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
    if (!values.password) {
      errors.marketIds = 'Password is required'
    }
    if (!values.password && values.password.length < 8) {
        errors.marketIds = 'Password should contain at least 8 characters'
      }
      if (!values.imageId) {
         errors.imageId = 'Profile picture is required'
         }
  
    return errors
  }
  