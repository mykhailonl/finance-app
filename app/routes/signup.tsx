import { AuthPageWrapper } from '~/components/AuthPageWrapper'
import { SignupModal } from '~/modals'

export default function SignUp() {
  return (
    <AuthPageWrapper>
      <SignupModal />
    </AuthPageWrapper>
  )
}
