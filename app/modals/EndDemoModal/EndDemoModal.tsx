import { useNavigate } from 'react-router'

import { Button } from '~/components/Button'
import { ModalDescription } from '~/components/ModalDescription'
import { ModalTitle } from '~/components/ModalTitle'
import { SectionWrapper } from '~/components/SectionWrapper'
import { useAuth } from '~/hooks/useAuth'
import { useModal } from '~/hooks/useModal'

export const EndDemoModal = () => {
  const { closeModal } = useModal()
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleEndDemo = async () => {
    await signOut()

    closeModal()

    navigate('/login')
  }

  return (
    <SectionWrapper styles="min-w-[335px] md:w-[560px]">
      <ModalTitle title="End Demo Mode?" />
      <ModalDescription text="Your demo data will be cleared. Create an account to save your financial information." />

      <div className="flex gap-4">
        <Button
          variant="secondary"
          styles="p-4 grow"
          onClick={() => closeModal()}
        >
          Continue Demo
        </Button>

        <Button variant="danger" styles="p-4 grow" onClick={handleEndDemo}>
          End Demo
        </Button>
      </div>
    </SectionWrapper>
  )
}
