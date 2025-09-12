import { Button } from '~/components/Button'
import { PageTitle } from '~/components/PageTitle'
import { useModal } from '~/hooks/useModal'

export const HomeHeader = () => {
  const { openModal } = useModal()

  return (
    <div className="flex justify-between items-center">
      <PageTitle title="Overview" />

      <Button
        variant="secondary"
        onClick={() => openModal({ type: 'logout' })}
        styles="p-4 lg:hidden"
      >
        Logout
      </Button>
    </div>
  )
}
