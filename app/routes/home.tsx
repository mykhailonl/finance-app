import { HomeContent } from '~/components/HomeContent'
import { PageTitle } from '~/components/PageTitle'
import { PageWrapper } from '~/components/PageWrapper'
import { Summary } from '~/components/Summary'

export default function Index() {
  return (
    <PageWrapper>
      <PageTitle title="Overview" />

      <Summary />

      <HomeContent />
    </PageWrapper>
  )
}
