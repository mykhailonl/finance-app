import { Button } from '~/components/Button'
import { PageTitle } from '~/components/PageTitle'
import { useDevice } from '~/hooks/useDevice'
import { useModal } from '~/hooks/useModal'

export const TransactionsHeader = ({
  showButton = false,
}: {
  showButton?: boolean
}) => {
  const { openModal } = useModal()
  const { isMobile } = useDevice()

  const buttonText = isMobile ? 'Add' : 'Add Transaction'

  return (
    <div className="flex items-center justify-between">
      <PageTitle title="Transactions" />

      {showButton && (
        <Button
          variant="primary"
          onClick={() =>
            openModal({
              type: 'transaction-add',
              options: { recurring: false },
            })
          }
          styles="p-4"
        >
          {buttonText}
        </Button>
      )}
    </div>
  )
}
