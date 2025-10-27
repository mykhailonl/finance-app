import { useNavigate } from 'react-router'

import { Button } from '~/components/Button'
import { ModalDescription } from '~/components/ModalDescription'
import { ModalTitle } from '~/components/ModalTitle'
import { SectionWrapper } from '~/components/SectionWrapper'
import { useAuth } from '~/hooks/useAuth'
import { useModal } from '~/hooks/useModal'

export const DemoModal = () => {
  const { closeModal } = useModal()
  const navigate = useNavigate()
  const { clearDemoData, signOut } = useAuth()

  const handleCreateAccount = async () => {
    clearDemoData()

    await signOut()

    closeModal()
    navigate('/signup')
  }

  return (
    <SectionWrapper styles="min-w-[335px] md:w-[560px]">
      <ModalTitle title="Demo mode" />

      <ModalDescription text="You're currently exploring Finance in demo mode with sample data. All your changes—budgets, pots, transactions—are saved locally in your browser and will be lost when you log out. For a full experience, create a free account to securely save your real financial data, sync across devices, and keep your finances organized long-term." />

      <div className="flex flex-col gap-4">
        <Button
          variant="secondary"
          styles="grow p-4"
          onClick={() => closeModal()}
        >
          Continue Exploring
        </Button>

        <Button
          variant="primary"
          styles="grow p-4"
          onClick={handleCreateAccount}
        >
          Create Free Account
        </Button>
      </div>
    </SectionWrapper>
  )
}
