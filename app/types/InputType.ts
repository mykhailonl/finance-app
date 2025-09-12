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
    onBlur?: () => void
    inputStyles?: string
  }
  helperText: {
    showHelper?: boolean
    helperText?: string
    helperStyles?: string
  }
  error?: string | null
  showSearchIcon?: boolean
  showPassIcon?: boolean
  styles?: string
  type?: string
}

export interface DateTimeInputProps {
  label: {
    showLabel?: boolean
    labelText?: string
    labelStyles?: string
  }
  input: {
    value: string
    onChange: (value: string) => void
    onBlur?: () => void
    inputStyles?: string
  }
  styles?: string
  error?: string | null
  type: 'date' | 'time' | 'datetime-local'
}
