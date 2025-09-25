import { validateAmountToAdd } from './validateAmountToAdd'
import { validateAmountToWithdraw } from './validateAmountToWithdraw'
import { validatePotName } from './validatePotName'
import { validatePotTarget } from './validatePotTarget'

export const potValidators = {
  validatePotName,
  validatePotTarget,
  validateAmountToAdd,
  validateAmountToWithdraw,
}
