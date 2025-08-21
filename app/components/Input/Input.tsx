import cn from 'classnames'

import { iconComponents } from '~/types/IconType'
import type { InputProps } from '~/types/InputType'

// helperText style based on input type, different preset

// todo fix case when input is a number, rn cant make 123.40, . is not going through regex within onChange
// todo should I

export const Input = <T extends string | number>({
  styles,
  label,
  helperText,
  input,
  showSearchIcon,
  error,
}: InputProps<T>) => {
  const SearchIcon = iconComponents['search']
  const isNumberInput = typeof input.value === 'number'

  //#region inputLimitations
  const numberPattern = /^\d*\.?\d{0,2}$/
  const maxLength = 30
  //#endregion

  const charsLeft = maxLength - String(input.value).length

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
          'flex items-center rounded-lg py-3 px-5 border border-beige-500 hover:border-grey-500 active:border-grey-900 w-full',
          isNumberInput ? 'gap-3' : 'gap-4',
          input.inputStyles
        )}
      >
        {isNumberInput && (
          <span className="text-preset-5 text-grey-500">$</span>
        )}

        <input
          type="text"
          id={label.labelText}
          className="bg-white flex text-preset-4 w-full rounded-lg outline-hidden cursor-custom"
          placeholder={input.placeholder}
          value={isNumberInput && input.value === 0 ? '' : input.value}
          onChange={(e) => {
            const rawValue = e.target.value

            if (isNumberInput) {
              if (rawValue === '') {
                input.onChange(0 as T)
                return
              }

              if (!numberPattern.test(rawValue)) {
                return
              }

              input.onChange(+rawValue as T)
            } else {
              if (rawValue === '') {
                input.onChange('' as T)
                return
              }

              if (rawValue.length > maxLength) {
                return
              }

              input.onChange(rawValue as T)
            }
          }}
          onBlur={input.onBlur}
        />

        {showSearchIcon && <SearchIcon className="w-4 h-4" />}
      </div>

      {helperText.showHelper && !error && (
        <div className={cn('flex text-preset-5', helperText.helperStyles)}>
          <p className={charsLeft ? 'text-grey-500' : 'text-red'}>
            {`${charsLeft}`}&nbsp;
          </p>
          <p className={cn(' text-grey-500')}>{helperText.helperText}</p>
        </div>
      )}

      {error && <p className="text-preset-5 text-red self-end">{error}</p>}
    </div>
  )
}
