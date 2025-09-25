export const validateUsername = (name: string) => {
  const trimmed = name.trim()

  if (!trimmed) {
    return 'Please fill in name'
  }

  if (trimmed.length < 5) {
    return 'Username should consist of at least 5 characters'
  }

  return null
}
