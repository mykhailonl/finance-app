import { Button } from '~/components/Button'
import { PageTitle } from '~/components/PageTitle'
import { useModal } from '~/hooks/useModal'

export const BudgetsHeader = () => {
  const { openModal } = useModal()

  return (
    <div className="flex justify-between items-center">
      <PageTitle title="Budgets" />

      <Button
        variant="primary"
        onClick={() => openModal('budget-add')}
        styles="p-4"
      >
        Add New Budget
      </Button>
    </div>
  )
}
