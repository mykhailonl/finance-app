import type {
  Transaction,
  TransactionInsert,
  TransactionUpdate,
} from '~/types/index'

export type TransactionModalTypes =
  | { type: 'transaction-add' }
  | { type: 'transaction-edit'; transaction: Transaction }
  | {
      type: 'transaction-delete'
      transaction: Pick<Transaction, 'id' | 'name'>
    }

export type AddTransactionModalProps = {
  onSubmit: (data: TransactionInsert) => void
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
  >
  onSubmit: (data: TransactionUpdate) => void
}

export type DeleteTransactionModalProps = {
  transactionName: string
  onDelete: () => void
  onClose: () => void
}
