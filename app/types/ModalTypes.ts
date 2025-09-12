import type { AuthModalTypes } from '~/types/AuthTypes'
import type { BudgetModalTypes } from '~/types/BudgetModalTypes'
import type { PotModalTypes } from '~/types/PotModalTypes'
import type { TransactionModalTypes } from '~/types/TransactionModalTypes'

export type ModalState =
  | BudgetModalTypes
  | PotModalTypes
  | TransactionModalTypes
  | AuthModalTypes
  | null
