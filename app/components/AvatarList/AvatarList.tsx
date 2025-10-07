import Tooltip from '@mui/material/Tooltip'
import cn from 'classnames'

import { Avatar } from '~/components/Avatar'
import type { AvatarListProps } from '~/types/FormTypes'
import { iconComponents } from '~/types/IconType'

export const AvatarList = ({ selectedPerson, options }: AvatarListProps) => {
  const XIcon = iconComponents['xcircle']

  return (
    <div className="flex flex-col gap-5">
      <label className="text-preset-3 text-grey-900">People</label>

      <div className="grid grid-cols-4 gap-y-3 justify-items-center ">
        {options.map((opt) => (
          <Tooltip key={opt.name} title={opt.name} placement="top">
            <div
              onClick={() => selectedPerson.onChange(opt.name)}
              className={cn(
                'p-1 border rounded-full ease-in-out duration-300',
                selectedPerson.value === opt.name
                  ? 'border-red'
                  : 'border-transparent hover:scale-110'
              )}
            >
              <Avatar
                src={opt.src}
                alt={`${opt.name}-avatar`}
                styles={cn('w-12 h-12 md:w-16 md:h-16')}
              />
            </div>
          </Tooltip>
        ))}

        <Tooltip title="None" placement="top">
          <div
            className={cn(
              'border rounded-full ease-in-out duration-300',
              selectedPerson.value === null
                ? 'border-grey-300'
                : 'border-transparent hover:scale-110'
            )}
            onClick={() => selectedPerson.onChange(null)}
          >
            <XIcon className={cn('h-14 w-14 text-grey-300 md:w-18 md:h-18')} />
          </div>
        </Tooltip>
      </div>
    </div>
  )
}
