import { useNavigate } from 'react-router'

import { Button } from '~/components/Button'

type Props = {
  title: string
  linkText: string
  link: string
}

export const SectionTitleBlock = ({ title, linkText, link }: Props) => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-preset-2 text-grey-900">{title}</h2>

      <Button variant="tertiary" onClick={() => navigate(link)}>
        {linkText}
      </Button>
    </div>
  )
}
