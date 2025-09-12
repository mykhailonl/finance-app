export const validateTransactionName = (name: string) => {
  const trimmed = name.trim()

  if (!trimmed) {
    return 'Transaction name is required'
  }

  return null
}
