import cn from 'classnames'

import { DrawerTab } from '~/components/DrawerTab'

type DrawerTabsProps = {
  isBasic: boolean
  setBasicTab: () => void
  setAdvancedTab: () => void
}

export const DrawerTabs = ({
  isBasic,
  setBasicTab,
  setAdvancedTab,
}: DrawerTabsProps) => {
  return (
    <div
      className={cn(
        'flex justify-between items-center',
        'bg-grey-100',
        'p-1 gap-1',
        'rounded-xl'
      )}
    >
      <DrawerTab isSelected={isBasic} tabName="Basic" onClick={setBasicTab} />

      <DrawerTab
        isSelected={!isBasic}
        tabName="Advanced"
        onClick={setAdvancedTab}
      />
    </div>
  )
}
