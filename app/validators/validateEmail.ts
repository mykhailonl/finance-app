export const validateEmail = (email: string) => {
  const trimmed = email.trim()

  if (!trimmed) {
    return 'Please fill in the email'
  }

  if (!trimmed.includes('@')) {
    return 'Email should contain "@" symbol'
  }

  if (!trimmed.includes('.')) {
    return 'Email should contain "."'
  }

  return null
}
