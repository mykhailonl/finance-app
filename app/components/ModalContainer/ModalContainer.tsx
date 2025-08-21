import { AnimatePresence, motion } from 'framer-motion'

import { BudgetModal } from '~/components/BudgetModal'
import { PotModal } from '~/components/PotModal'
import { useModal } from '~/hooks/useModal'
import { Overlays } from '~/overlays/Overlays'
import { getBudgetValues } from '~/utils/getBudgetValues'
import { getPotValues } from '~/utils/getPotValues'

export const ModalContainer = () => {
  const { modalType, closeModal, modalData } = useModal()

  const renderModal = () => {
    switch (modalType) {
      case 'budget-add':
        return (
          <BudgetModal
            type="add"
            title="Add New Budget"
            description="Choose a category to set a spending budget. These categories can help you monitor spending."
            buttons={{
              mainButtonText: 'Add Budget',
              mainButtonFn: () => console.log('Add Budget form clicked'),
            }}
          />
        )
      case 'budget-edit':
        return (
          <BudgetModal
            type="edit"
            title="Edit Budget"
            description="As your budgets change, feel free to update your spending limits."
            buttons={{
              mainButtonFn: () => console.log('Edit Budget form clicked'),
              mainButtonText: 'Save Changes',
            }}
            initialValues={getBudgetValues(modalData?.budget)}
          />
        )
      case 'budget-delete':
        return (
          <BudgetModal
            type="delete"
            title={`Delete '${modalData?.budget?.category}'?`}
            description="Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever."
            buttons={{
              mainButtonText: 'Yes, Confirm Deletion',
              mainButtonFn: () => console.log('Delete Budget form clicked'),
            }}
          />
        )
      case 'pot-add':
        return (
          <PotModal
            type="add"
            title="Add New Pot"
            description="Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
            buttons={{
              mainButtonText: 'Add Pot',
              mainButtonFn: () => console.log('Add Pot form clicked'),
            }}
          />
        )
      case 'pot-edit':
        return (
          <PotModal
            type="edit"
            title="Edit Pot"
            description="If your saving targets change, feel free to update your pots."
            buttons={{
              mainButtonText: 'Save Changes',
              mainButtonFn: () => console.log('Edit Pot form clicked'),
            }}
            initialValues={getPotValues(modalData?.pot)}
          />
        )
      case 'pot-delete':
        return (
          <PotModal
            type="delete"
            title={`Delete '${modalData?.pot?.name}'?`}
            description="Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever."
            buttons={{
              mainButtonText: 'Yes, Confirm Deletion',
              mainButtonFn: () => console.log('Delete Pot form clicked'),
            }}
          />
        )
      case 'pot-add-money':
        return (
          <PotModal
            type="add-money"
            title={`Add to '${modalData?.pot?.name}'`}
            description="Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance."
            buttons={{
              mainButtonText: 'Confirm Addition',
              mainButtonFn: () => console.log('Add money Pot form clicked'),
            }}
            initialValues={getPotValues(modalData?.pot)}
          />
        )
      // case 'pot-withdraw-money':
      //   return (<PotModal />)
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
