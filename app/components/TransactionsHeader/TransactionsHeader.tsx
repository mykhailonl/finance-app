import { Button } from '~/components/Button'
import { PageTitle } from '~/components/PageTitle'
import { useDevice } from '~/hooks/useDevice'
import { useModal } from '~/hooks/useModal'

export const TransactionsHeader = () => {
  const { openModal } = useModal()
  const { isMobile } = useDevice()

  const buttonText = isMobile ? 'Add' : 'Add Transaction'

  return (
    <div className="flex items-center justify-between">
      <PageTitle title="Transactions" />

      <Button
        variant="primary"
        onClick={() => openModal({ type: 'transaction-add' })}
        styles="p-4"
      >
        {buttonText}
      </Button>
    </div>
  )
}
