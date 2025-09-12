import { Button } from '~/components/Button'
import { ModalDescription } from '~/components/ModalDescription'
import { ModalTitle } from '~/components/ModalTitle'
import { SectionWrapper } from '~/components/SectionWrapper'
import { useModal } from '~/hooks/useModal'
import { authService } from '~/services/authService'

export const LogoutModal = () => {
  const { closeModal } = useModal()

  const handleLogout = async () => {
    try {
      console.log('clicked log out')

      await authService.logout()
      closeModal()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SectionWrapper styles="min-w-[335px] md:w-[560px]">
      <ModalTitle title="Confirm Log out" />

      <ModalDescription text="You'll be signed out of your account and need to sign in again to access your data." />

      <div className="flex gap-4">
        <Button
          variant="secondary"
          styles="grow p-4"
          onClick={() => closeModal()}
        >
          Cancel
        </Button>

        <Button variant="danger" styles="grow p-4" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </SectionWrapper>
  )
}
