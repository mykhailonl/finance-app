import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { toast } from 'sonner'

import { useBudgetMutations } from '~/hooks/useBudgetMutations'
import { useModal } from '~/hooks/useModal'
import { usePotMutations } from '~/hooks/usePotMutations'
import { useTransactionMutations } from '~/hooks/useTransactionMutations'
import { useTransactions } from '~/hooks/useTransactions'
import { useUndoableDelete } from '~/hooks/useUndoableDelete'
import {
  AddBudgetModal,
  AddPotModal,
  AddToPotModal,
  AddTransactionModal,
  DeleteBudgetModal,
  DeletePotModal,
  DeleteTransactionModal,
  EditBudgetModal,
  EditPotModal,
  EditTransactionModal,
  LogoutModal,
  RestrictionTransactionModal,
  WithdrawFromPotModal,
} from '~/modals'
import { Overlays } from '~/overlays/Overlays'
import type {
  BudgetInsert,
  BudgetUpdate,
  PotInsert,
  PotUpdate,
  TransactionInsert,
  TransactionUpdate,
} from '~/types'

export const ModalContainer = () => {
  const { modalState, closeModal } = useModal()
  const { deleteWithUndo } = useUndoableDelete()
  const { data: allTransactions } = useTransactions()

  const budgetMutations = useBudgetMutations()
  const potMutations = usePotMutations()
  const transactionMutations = useTransactionMutations()

  //#region budget handlers
  const handleAddBudget = (data: BudgetInsert) => {
    budgetMutations.createBudget.mutate(data, {
      onSuccess: () => {
        closeModal()

        toast.success(`${data.category} budget created`)
      },
      onError: () => toast.error('Failed to create budget.'),
    })
  }

  const handleEditBudget = (data: BudgetUpdate) => {
    if (modalState?.type === 'budget-edit') {
      budgetMutations.updateBudget.mutate(
        { id: modalState.budget.id, updates: data },
        {
          onSuccess: () => {
            closeModal()

            toast.success(`${data.category} budget updated.`)
          },
          onError: () => toast.error('Failed to update budget.'),
        }
      )
    }
  }

  const handleDeleteBudget = () => {
    if (modalState?.type === 'budget-delete') {
      closeModal()

      deleteWithUndo({
        queryKey: ['budgets', allTransactions?.length],
        idToDelete: modalState.budget.id,
        actualDelete: () =>
          budgetMutations.deleteBudget.mutateAsync(modalState.budget.id),
        message: `${modalState.budget.category} deleted.`,
        errorMessage: 'Failed to delete budget.',
      })
    }
  }
  //#endregion

  //#region pot handlers
  const handleAddPot = (data: PotInsert) => {
    potMutations.createPot.mutate(data, {
      onSuccess: () => {
        closeModal()

        toast.success(`Pot ${data.name} created.`)
      },
      onError: () => toast.error('Failed to create pot.'),
    })
  }

  const handleEditPot = (data: PotUpdate) => {
    if (modalState?.type === 'pot-edit') {
      potMutations.updatePot.mutate(
        { id: modalState.pot.id, updates: data },
        {
          onSuccess: () => {
            closeModal()

            toast.success(`Pot ${data.name} updated.`)
          },
          onError: () => toast.error('Failed to update pot.'),
        }
      )
    }
  }

  const handleDeletePot = () => {
    if (modalState?.type === 'pot-delete') {
      closeModal()

      deleteWithUndo({
        queryKey: ['pots'],
        idToDelete: modalState.pot.id,
        actualDelete: () =>
          potMutations.deletePot.mutateAsync(modalState.pot.id),
        message: `Pot ${modalState.pot.name} deleted.`,
        errorMessage: 'Failed to delete pot.',
      })
    }
  }

  const handleAddMoneyToPot = (amount: number) => {
    if (modalState?.type === 'pot-add-money') {
      potMutations.addMoneyToPot.mutate(
        {
          id: modalState.pot.id,
          amount,
          currentTotal: modalState.pot.total,
          potName: modalState.pot.name,
        },
        {
          onSuccess: () => {
            closeModal()

            toast.success(`Money added to ${modalState.pot.name}.`)
          },
          onError: () => toast.error('Failed to add money to pot.'),
        }
      )
    }
  }

  const handleWithdrawMoneyFromPot = (amount: number) => {
    if (modalState?.type === 'pot-withdraw-money') {
      potMutations.withdrawMoneyFromPot.mutate(
        {
          id: modalState.pot.id,
          amount,
          currentTotal: modalState.pot.total,
          potName: modalState.pot.name,
        },
        {
          onSuccess: () => {
            closeModal()

            toast.success(`Money withdrawn from ${modalState.pot.name}.`)
          },
          onError: () => toast.error('Failed to withdraw money from pot.'),
        }
      )
    }
  }
  //#endregion

  //#region transaction handlers
  const handleAddTransaction = (transaction: TransactionInsert) => {
    transactionMutations.createTransaction.mutate(transaction, {
      onSuccess: () => {
        closeModal()

        toast.success('Transaction created.')
      },
      onError: () => toast.error('Failed to create transaction.'),
    })
  }

  const handleUpdateTransaction = (data: TransactionUpdate) => {
    if (modalState?.type === 'transaction-edit') {
      transactionMutations.updateTransaction.mutate(
        {
          id: modalState.transaction.id,
          updates: data,
        },
        {
          onSuccess: () => {
            closeModal()

            toast.success('Transaction updated.')
          },
          onError: () => toast.error('Failed to update transaction.'),
        }
      )
    }
  }

  const handleDeleteTransaction = () => {
    if (modalState?.type === 'transaction-delete') {
      closeModal()

      deleteWithUndo({
        queryKey: ['transactions'],
        idToDelete: modalState.transaction.id,
        actualDelete: () =>
          transactionMutations.deleteTransaction.mutateAsync(
            modalState.transaction.id
          ),
        message: 'Transaction deleted.',
        errorMessage: 'Failed to delete transaction.',
      })
    }
  }
  //#endregion

  const renderModal = (): ReactNode => {
    if (!modalState) {
      return null
    }

    switch (modalState.type) {
      //#region budget modals
      case 'budget-add':
        return <AddBudgetModal onSubmit={handleAddBudget} />

      case 'budget-edit':
        return (
          <EditBudgetModal
            initialValues={{
              id: modalState.budget.id,
              category: modalState.budget.category,
              maximum: modalState.budget.maximum,
              theme: modalState.budget.theme,
            }}
            onSubmit={handleEditBudget}
          />
        )

      case 'budget-delete':
        return (
          <DeleteBudgetModal
            budgetCategory={modalState.budget.category}
            onDelete={handleDeleteBudget}
            onClose={closeModal}
          />
        )
      //#endregion

      //#region pot modals
      case 'pot-add':
        return <AddPotModal onSubmit={handleAddPot} />

      case 'pot-edit':
        return (
          <EditPotModal
            initialValues={{
              id: modalState.pot.id,
              name: modalState.pot.name,
              target: modalState.pot.target,
              theme: modalState.pot.theme,
            }}
            onSubmit={handleEditPot}
          />
        )

      case 'pot-delete':
        return (
          <DeletePotModal
            potName={modalState.pot.name}
            onDelete={handleDeletePot}
            onClose={closeModal}
          />
        )

      case 'pot-add-money':
        return (
          <AddToPotModal
            pot={{
              id: modalState.pot.id,
              name: modalState.pot.name,
              target: modalState.pot.target,
              total: modalState.pot.total,
              theme: modalState.pot.theme,
            }}
            onAddMoney={handleAddMoneyToPot}
          />
        )

      case 'pot-withdraw-money':
        return (
          <WithdrawFromPotModal
            pot={{
              id: modalState.pot.id,
              name: modalState.pot.name,
              target: modalState.pot.target,
              total: modalState.pot.total,
              theme: modalState.pot.theme,
            }}
            onWithdrawMoney={handleWithdrawMoneyFromPot}
          />
        )
      //#endregion

      //#region transaction modals
      case 'transaction-add':
        return <AddTransactionModal onSubmit={handleAddTransaction} />

      case 'transaction-edit':
        return (
          <EditTransactionModal
            initialValues={{
              id: modalState.transaction.id,
              name: modalState.transaction.name,
              category: modalState.transaction.category,
              transaction_date: modalState.transaction.transaction_date,
              transaction_type: modalState.transaction.transaction_type,
              amount: modalState.transaction.amount,
              recurring: modalState.transaction.recurring,
            }}
            onSubmit={handleUpdateTransaction}
          />
        )

      case 'transaction-delete':
        return (
          <DeleteTransactionModal
            transactionName={modalState.transaction.name}
            onDelete={handleDeleteTransaction}
            onClose={closeModal}
          />
        )

      case 'transaction-restriction':
        return <RestrictionTransactionModal onClose={closeModal} />
      //#endregion

      //#region auth modals
      case 'logout':
        return <LogoutModal />
      //#endregion

      default:
        return null
    }
  }

  return (
    <Overlays>
      <AnimatePresence>
        {modalState && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
          >
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              onClick={(e) => e.stopPropagation()}
            >
              {renderModal()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Overlays>
  )
}
