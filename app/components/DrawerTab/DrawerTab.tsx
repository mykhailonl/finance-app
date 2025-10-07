import cn from 'classnames'
import { motion } from 'motion/react'

type DrawerTabProps = {
  isSelected: boolean
  tabName: string
  onClick: () => void
}

export const DrawerTab = ({ isSelected, tabName, onClick }: DrawerTabProps) => {
  return (
    <button
      type="button"
      className={cn(
        'relative flex-1 items-center justify-center flex',
        'p-2',
        'rounded-xl',
        'z-10'
      )}
      onClick={onClick}
    >
      {isSelected && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-white rounded-xl"
          transition={{
            type: 'spring',
            duration: 0.5,
            bounce: 0.2,
          }}
        />
      )}

      <p className="relative z-10">{tabName}</p>
    </button>
  )
}
