import cn from 'classnames'

import { iconComponents } from '~/types/IconType'

export const IllustrationBlock = () => {
  const Logo = iconComponents['logoLarge']

  return (
    <div className="hidden lg:flex p-5 max-w-[600px] grow">
      <div
        className={cn(
          'bg-[url(/app/assets/images/illustration-authentication.svg)] bg-cover',
          'flex flex-col justify-between grow',
          'p-10',
          'rounded-xl'
        )}
      >
        <Logo />

        <div className="flex flex-col gap-6 text-white">
          <h1 className="text-preset-1">
            Keep track of your money and save for your future
          </h1>

          <p className="text-preset-4">
            Personal finance app puts you in control of your spending. Track
            transactions, set budgets, and add to savings pots easily.
          </p>
        </div>
      </div>
    </div>
  )
}
