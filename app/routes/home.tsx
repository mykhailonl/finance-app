import { HomeContent } from '~/components/HomeContent'
import { HomeHeader } from '~/components/HomeHeader'
import { PageWrapper } from '~/components/PageWrapper'
import { Summary } from '~/components/Summary'

export default function Index() {
  return (
    <PageWrapper>
      <HomeHeader />

      <Summary />

      <HomeContent />
    </PageWrapper>
  )
}
