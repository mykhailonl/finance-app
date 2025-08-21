import cn from 'classnames'
import { useNavigate } from 'react-router'

import { Button } from '~/components/Button'

type Props = {
  title: string
  linkText: string
  link: string
  small?: boolean
}

export const SectionTitleBlock = ({ title, linkText, link, small }: Props) => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-between items-center">
      <h2
        className={cn(
          'text-grey-900',
          small ? 'text-preset-3' : 'text-preset-2'
        )}
      >
        {title}
      </h2>

      <Button variant="tertiary" onClick={() => navigate(link)} showCaret>
        {linkText}
      </Button>
    </div>
  )
}
