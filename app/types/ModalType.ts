import type { BudgetType } from '~/types/BudgetType'
import type { PotType } from '~/types/PotType'

export interface ModalContextType {
  modalType: ModalType | null
  modalData: ModalData | null
  openModal: (type: ModalType, data?: ModalData) => void
  closeModal: () => void
}

export interface ModalData {
  budget?: BudgetType
  pot?: PotType
}

type BudgetModals = 'budget-add' | 'budget-edit' | 'budget-delete'

type PotModals =
  | 'pot-add'
  | 'pot-edit'
  | 'pot-delete'
  | 'pot-add-money'
  | 'pot-withdraw-money'

export type ModalType = BudgetModals | PotModals

export interface BaseModalProps {
  type: 'add' | 'edit' | 'delete'
  title: string
  description: string

  buttons: {
    mainButtonText: string
    mainButtonFn: () => void
  }
}

export interface BudgetModalProps extends BaseModalProps {
  initialValues?: BudgetType
}

export interface PotModalProps extends Omit<BaseModalProps, 'type'> {
  type: 'add' | 'edit' | 'delete' | 'add-money' | 'withdraw-money'
  initialValues?: PotType
}
