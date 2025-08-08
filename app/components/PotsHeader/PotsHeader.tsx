import { Button } from '~/components/Button'
import { PageTitle } from '~/components/PageTitle'

export const PotsHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <PageTitle title="Pots" />

      <Button
        variant="primary"
        onClick={() => console.log('clicked add new pot')}
        styles="p-4"
      >
        Add New Pot
      </Button>
    </div>
  )
}
