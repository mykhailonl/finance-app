import cn from 'classnames'
import { motion } from 'motion/react'

type SwitchProps = {
  label: string
  value: boolean
  onClick: () => void
  styles?: string
}

export const Switch = ({ label, value, onClick, styles }: SwitchProps) => {
  return (
    <div className={cn('flex justify-between items-center', styles)}>
      <div>
        <label className="text-preset-3 text-grey-900">{label}</label>

        <p className="text-preset-4 text-grey-500">
          Mark as repeating transaction
        </p>
      </div>

      <div
        className={cn(
          !value ? 'bg-grey-100' : 'bg-green-400',
          'relative',
          'w-12 h-7',
          'rounded-2xl',
          'cursor-custom'
        )}
        onClick={onClick}
      >
        <motion.div
          className={cn(
            'absolute top-1 bottom-1',
            !value ? 'right-1' : 'left-1',
            'bg-white rounded-full',
            'h-5 w-5'
          )}
          layout
          transition={{
            type: 'spring',
            visualDuration: 0.3,
            bounce: 0.3,
          }}
        />
      </div>
    </div>
  )
}
