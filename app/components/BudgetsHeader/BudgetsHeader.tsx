import { Button } from '~/components/Button'
import { PageTitle } from '~/components/PageTitle'

export const BudgetsHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <PageTitle title="Budgets" />

      <Button
        variant="primary"
        onClick={() => console.log('clicked add new budget')}
        styles="p-4"
      >
        Add New Budget
      </Button>
    </div>
  )
}
