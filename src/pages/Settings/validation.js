export const passwordValidation = values => {
  let errors = {}
  if (!values.currentPassword) {
    errors.currentPassword = 'Current Password is required'
  }
  if (!values.newPassword) {
    errors.newPassword = 'Current Password is required'
  }

  if (values.currentPassword === values.newPassword) {
    errors.newPassword = 'New password must be different from current password'
  }
  return errors
}
