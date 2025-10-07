import type {
  Transaction,
  TransactionInsert,
  TransactionUpdate,
} from '~/types/index'

export type DrawerTabType = 'basic' | 'advanced'

export type TransactionModalTypes =
  | {
      type: 'transaction-add'
      options: {
        recurring: boolean
      }
    }
  | { type: 'transaction-edit'; transaction: Transaction }
  | {
      type: 'transaction-delete'
      transaction: Pick<Transaction, 'id' | 'name'>
    }
  | {
      type: 'transaction-restriction'
    }

export type AddTransactionModalProps = {
  onSubmit: (data: TransactionInsert) => void
  options: {
    recurring: boolean
  }
}

export type EditTransactionModalProps = {
  initialValues: Pick<
    Transaction,
    | 'id'
    | 'transaction_date'
    | 'transaction_type'
    | 'amount'
    | 'category'
    | 'recurring'
    | 'name'
    | 'avatar_person'
  >
  onSubmit: (data: TransactionUpdate) => void
}

export type DeleteTransactionModalProps = {
  transactionName: string
  onDelete: () => void
  onClose: () => void
}

export type RestrictionTransactionModalProps = {
  onClose: () => void
}
