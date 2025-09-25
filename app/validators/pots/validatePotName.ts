import { MAX_LENGTH } from '~/constants'

export const validatePotName = (potName: string) => {
  const trimmed = potName.trim()

  if (!trimmed) {
    return 'Pot name is required'
  }

  if (trimmed.length >= MAX_LENGTH) {
    return `Maximum length is ${MAX_LENGTH} symbols`
  }

  return null
}
