import cn from 'classnames'
import { type ChangeEvent, useState } from 'react'

import { iconComponents } from '~/types/IconType'
import type { InputProps } from '~/types/InputType'

export const Input = <T extends string | number>({
  styles,
  label,
  helperText,
  input,
  showSearchIcon,
  showPassIcon = false,
  error,
  type,
  isNumberInput,
}: InputProps<T>) => {
  //#region icons
  const SearchIcon = iconComponents['search']
  const ShowPassIcon = iconComponents['showPassword']
  const HidePassIcon = iconComponents['hidePassword']
  //#endregion

  const [showPass, setShowPass] = useState(false)
  const [valueToDisplay, setValueToDisplay] = useState(
    isNumberInput && input.value === 0 ? '' : input.value
  )

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValueToDisplay(newValue)

    input.onChange(e.target.value as T)
  }

  return (
    <div className={cn('flex gap-1 items-start self-stretch', styles)}>
      {/*#region label*/}
      {label.showLabel && (
        <label
          htmlFor={label.labelText}
          className={cn('text-preset-4 text-grey-500', label.labelStyles)}
        >
          {label.labelText}
        </label>
      )}
      {/*#endregion*/}

      <div
        className={cn(
          'flex items-center rounded-lg py-3 px-5 border border-beige-500 hover:border-grey-500 active:border-grey-900 w-full',
          isNumberInput ? 'gap-3' : 'gap-4'
        )}
      >
        {/*#region $ symbol*/}
        {isNumberInput && (
          <span className="text-preset-5 text-grey-500">$</span>
        )}
        {/*#endregion*/}

        <input
          type={type ? type : showPassIcon && !showPass ? 'password' : 'text'}
          id={label.labelText}
          className={cn(
            'bg-white text-preset-4 w-full outline-hidden cursor-custom',
            input.inputStyles,
            !type && 'flex'
          )}
          placeholder={input.placeholder}
          value={valueToDisplay}
          onChange={handleInputChange}
          onBlur={input.onBlur}
          maxLength={input.maxLength}
        />

        {showSearchIcon && <SearchIcon className="w-4 h-4" />}

        {/*#region passIcon*/}
        {showPassIcon &&
          (showPass ? (
            <HidePassIcon
              className="w-4 h-4"
              onClick={() => setShowPass(!showPass)}
            />
          ) : (
            <ShowPassIcon
              className="w-4 h-4"
              onClick={() => setShowPass(!showPass)}
            />
          ))}
        {/*#endregion */}
      </div>

      {/*#region helper text*/}
      {helperText.showHelper && !error && (
        <div className={cn('flex text-preset-5', helperText.helperStyles)}>
          <p className={cn(' text-grey-500')}>{helperText.helperText}</p>
        </div>
      )}
      {/*#endregion*/}

      {error && <p className="text-preset-5 text-red self-end">{error}</p>}
    </div>
  )
}
