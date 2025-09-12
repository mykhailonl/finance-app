export const validatePassword = (
  password: string,
  validateLength?: boolean
) => {
  const trimmed = password.trim()

  if (!trimmed) {
    return 'Please fill in password'
  }

  if (validateLength) {
    if (trimmed.length < 8) {
      return 'Passwords must be at least 8 characters'
    }
  }

  return null
}
