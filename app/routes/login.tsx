import { AuthPageWrapper } from '~/components/AuthPageWrapper'
import { LoginModal } from '~/components/modals'

export default function Login() {
  return (
    <AuthPageWrapper>
      <LoginModal />
    </AuthPageWrapper>
  )
}
