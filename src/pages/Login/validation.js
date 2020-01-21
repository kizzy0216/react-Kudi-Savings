export default function validate(values) {
    let errors = {}
    let { username, password } = values
    username.trim()
    password.trim()
    if (!username) {
        errors.username = 'Mobile number is required'
    } else if (!/^[0]+[0-9]{10}$/i.test(username)) {
        errors.username = 'Mobile number is invalid'
    }
    if (password.length < 4) {
        errors.password = 'Minimum length must be greater than 6'
    }

    return errors
}
