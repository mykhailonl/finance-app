import { AuthPageWrapper } from '~/components/AuthPageWrapper'
import { SignupModal } from '~/components/modals'

export default function SignUp() {
  return (
    <AuthPageWrapper>
      <SignupModal />
    </AuthPageWrapper>
  )
}
