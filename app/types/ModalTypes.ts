import type { Budget, BudgetUpdate, Pot, PotInsert, PotUpdate } from '~/types'

export interface ModalContextType {
  modalType: ModalTypes | null
  modalData: ModalData | null
  openModal: (type: ModalTypes, data?: ModalData) => void
  closeModal: () => void
}

export interface ModalData {
  budget?: Budget
  pot?: Pot
}

type BudgetModals = 'budget-add' | 'budget-edit' | 'budget-delete'

type PotModals =
  | 'pot-add'
  | 'pot-edit'
  | 'pot-delete'
  | 'pot-add-money'
  | 'pot-withdraw-money'

export type ModalTypes = BudgetModals | PotModals

export interface EditBudgetModalProps {
  initialValues: Pick<Budget, 'id' | 'category' | 'maximum' | 'theme'>
  onSubmit: (data: BudgetUpdate) => void
}

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
