export interface InputProps<T> {
  label: {
    showLabel?: boolean
    labelText?: string
    labelStyles?: string
  }
  input: {
    placeholder: string
    value: T
    onChange: (value: T) => void
    onBlur?: () => void // ?
    inputStyles?: string
  }
  helperText: {
    showHelper?: boolean
    helperText?: string
    helperStyles?: string
  }
  error?: string | null
  showSearchIcon?: boolean
  styles?: string
}

// todo Im not allowing to fill more than 30 chars, so there is no possible error can occur, should I delete this option?
export type InputErrorType = 'Insufficient funds' | 'Maximum 30 characters'
