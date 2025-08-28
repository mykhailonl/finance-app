import { AnimatePresence, motion } from 'framer-motion'

import {
  AddBudgetModal,
  AddPotModal,
  AddToPotModal,
  DeleteBudgetModal,
  DeletePotModal,
  EditBudgetModal,
  EditPotModal,
  WithdrawFromPotModal,
} from '~/components/modals'
import { useBudgetMutations } from '~/hooks/useBudgetMutations'
import { useModal } from '~/hooks/useModal'
import { usePotMutations } from '~/hooks/usePotMutations'
import { Overlays } from '~/overlays/Overlays'
import type { BudgetInsert, BudgetUpdate, PotInsert, PotUpdate } from '~/types'

export const ModalContainer = () => {
  const { modalType, closeModal, modalData } = useModal()

  const budgetMutations = useBudgetMutations()
  const potMutations = usePotMutations()

  const handleAddBudget = (data: BudgetInsert) => {
    budgetMutations.createBudget.mutate(data, {
      onSuccess: () => closeModal(),
    })
  }

  const handleEditBudget = (data: BudgetUpdate) => {
    if (modalData?.budget?.id) {
      budgetMutations.updateBudget.mutate(
        { id: modalData.budget.id, updates: data },
        { onSuccess: () => closeModal() }
      )
    }
  }

  const handleDeleteBudget = () => {
    if (modalData?.budget?.id) {
      budgetMutations.deleteBudget.mutate(modalData.budget.id, {
        onSuccess: () => closeModal(),
      })
    }
  }

  const handleAddPot = (data: PotInsert) => {
    potMutations.createPot.mutate(data, {
      onSuccess: () => closeModal(),
    })
  }

  const handleEditPot = (data: PotUpdate) => {
    if (modalData?.pot?.id) {
      potMutations.updatePot.mutate(
        { id: modalData.pot.id, updates: data },
        { onSuccess: () => closeModal() }
      )
    }
  }

  const handleDeletePot = () => {
    if (modalData?.pot?.id) {
      potMutations.deletePot.mutate(modalData.pot.id, {
        onSuccess: () => closeModal(),
      })
    }
  }

  const handleAddMoneyToPot = (amount: number) => {
    if (modalData?.pot?.id) {
      potMutations.addMoneyToPot.mutate(
        {
          id: modalData.pot.id,
          amount,
          currentTotal: modalData.pot.total,
        },
        { onSuccess: () => closeModal() }
      )
    }
  }

  const handleWithdrawMoneyFromPot = (amount: number) => {
    if (modalData?.pot?.id) {
      potMutations.withdrawMoneyFromPot.mutate(
        {
          id: modalData.pot.id,
          amount,
          currentTotal: modalData.pot.total,
        },
        { onSuccess: () => closeModal() }
      )
    }
  }

  const renderModal = () => {
    switch (modalType) {
      case 'budget-add':
        return <AddBudgetModal onSubmit={handleAddBudget} />
      case 'budget-edit':
        return (
          <EditBudgetModal
            initialValues={{
              id: modalData?.budget?.id || 0,
              category: modalData?.budget?.category || 'Entertainment',
              maximum: modalData?.budget?.maximum || 0,
              theme: modalData?.budget?.theme || 'green',
            }}
            onSubmit={handleEditBudget}
          />
        )
      case 'budget-delete':
        return (
          <DeleteBudgetModal
            budgetCategory={modalData?.budget?.category || ''}
            onDelete={handleDeleteBudget}
            onClose={closeModal}
          />
        )
      case 'pot-add':
        return <AddPotModal onSubmit={handleAddPot} />
      case 'pot-edit':
        return (
          <EditPotModal
            initialValues={{
              id: modalData?.pot?.id || 0,
              name: modalData?.pot?.name || '',
              target: modalData?.pot?.target || 0,
              theme: modalData?.pot?.theme || 'green',
            }}
            onSubmit={handleEditPot}
          />
        )
      case 'pot-delete':
        return (
          <DeletePotModal
            potName={modalData?.pot?.name || ''}
            onDelete={handleDeletePot}
            onClose={closeModal}
          />
        )
      case 'pot-add-money':
        return (
          <AddToPotModal
            pot={{
              id: modalData?.pot?.id || 0,
              name: modalData?.pot?.name || '',
              target: modalData?.pot?.target || 0,
              total: modalData?.pot?.total || 0,
              theme: modalData?.pot?.theme || 'green',
            }}
            onAddMoney={handleAddMoneyToPot}
          />
        )
      case 'pot-withdraw-money':
        return (
          <WithdrawFromPotModal
            pot={{
              id: modalData?.pot?.id || 0,
              name: modalData?.pot?.name || '',
              target: modalData?.pot?.target || 0,
              total: modalData?.pot?.total || 0,
              theme: modalData?.pot?.theme || 'green',
            }}
            onWithdrawMoney={handleWithdrawMoneyFromPot}
          />
        )
      default:
        return null
    }
  }

  return (
    <Overlays>
      <AnimatePresence>
        {modalType && (
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
