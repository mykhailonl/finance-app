import type { Pot, PotInsert, PotUpdate } from '~/types/index'

export type PotModalTypes =
  | { type: 'pot-add' }
  | { type: 'pot-edit'; pot: Pot }
  | { type: 'pot-delete'; pot: Pot }
  | { type: 'pot-add-money'; pot: Pot }
  | { type: 'pot-withdraw-money'; pot: Pot }

export interface AddPotModalProps {
  onSubmit: (data: PotInsert) => void
}

export interface EditPotModalProps {
  initialValues: Pick<Pot, 'id' | 'name' | 'target' | 'theme'>
  onSubmit: (data: PotUpdate) => void
}

export interface DeletePotModalProps {
  potName: string
  onDelete: () => void
  onClose: () => void
}

export interface AddToPotModalProps {
  pot: Pick<Pot, 'id' | 'name' | 'target' | 'total' | 'theme'>
  onAddMoney: (amount: number) => void
}

export interface WithdrawFromPotModalProps {
  pot: Pick<Pot, 'id' | 'name' | 'target' | 'total' | 'theme'>
  onWithdrawMoney: (amount: number) => void
}
