import { AuthPageWrapper } from '~/components/AuthPageWrapper'
import { LoginModal } from '~/modals'

export default function Login() {
  return (
    <AuthPageWrapper>
      <LoginModal />
    </AuthPageWrapper>
  )
}
