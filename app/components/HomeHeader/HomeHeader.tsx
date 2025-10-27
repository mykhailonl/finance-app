import { Button } from '~/components/Button'
import { PageTitle } from '~/components/PageTitle'
import { useAuth } from '~/hooks/useAuth'
import { useModal } from '~/hooks/useModal'

export const HomeHeader = () => {
  const { openModal } = useModal()
  const { isDemoMode } = useAuth()

  return (
    <div className="flex justify-between items-center">
      <PageTitle title="Overview" />

      {!isDemoMode ? (
        <Button
          variant="secondary"
          onClick={() => openModal({ type: 'logout' })}
          styles="p-4 lg:hidden"
        >
          Logout
        </Button>
      ) : (
        <Button
          variant="secondary"
          styles="p-4"
          onClick={() => openModal({ type: 'demo' })}
        >
          DEMO
        </Button>
      )}
    </div>
  )
}
