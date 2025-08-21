import type { PotType } from '~/types/PotType'

export const getPotValues = (pot?: PotType) => {
  if (!pot) {
    return undefined
  }

  return {
    name: pot.name,
    target: pot.target,
    total: pot.total,
    theme: pot.theme,
  }
}
