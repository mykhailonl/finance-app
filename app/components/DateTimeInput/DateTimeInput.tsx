import cn from 'classnames'

import type { DateTimeInputProps } from '~/types/InputType'

export const DateTimeInput = ({
  type,
  label,
  input,
  styles,
  error,
}: DateTimeInputProps) => {
  return (
    <div className={cn('flex gap-1 items-start self-stretch', styles)}>
      {label.showLabel && (
        <label
          htmlFor={label.labelText}
          className={cn('text-preset-5-bold text-grey-500', label.labelStyles)}
        >
          {label.labelText}
        </label>
      )}

      <div
        className={cn(
          'flex items-center gap-4 rounded-lg py-3 px-5 border border-beige-500 hover:border-grey-500 active:border-grey-900 w-full'
        )}
      >
        <input
          type={type}
          id={label.labelText}
          className={cn(
            'bg-white text-preset-4 w-full outline-hidden cursor-custom',
            input.inputStyles
          )}
          value={input.value}
          onChange={(e) => {
            input.onChange(e.target.value)
          }}
          onBlur={input.onBlur}
        />
      </div>

      {error && <p className="text-preset-5 text-red self-end">{error}</p>}
    </div>
  )
}
