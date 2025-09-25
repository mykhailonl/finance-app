import { useState } from 'react'

interface UseFormOptions<T> {
  initialValues: T
  validators?: Partial<Record<keyof T, (value: any) => string | null>>
  onSubmit?: (values: T) => void | Promise<void>
}

interface UseFormReturn<T> {
  // State
  values: T
  errors: Partial<Record<keyof T, string | null>>
  generalError: string | null

  // Handlers
  setFieldValue: (field: keyof T, value: any) => void
  setFieldError: (field: keyof T, error: string | null) => void
  setGeneralError: (error: string | null) => void
  clearFieldError: (field: keyof T) => void

  // Validation
  validateField: (field: keyof T, value?: any) => string | null
  validateAll: () => boolean

  // Utils
  reset: () => void
  isValid: boolean
  isTouched: boolean
}

export const useForm = <T extends Record<string, any>>(
  options: UseFormOptions<T>
): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(options.initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string | null>>>(
    {}
  )
  const [genError, setGenError] = useState<string | null>(null)

  const setFieldValue = (field: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }))

    // Reset error on field value change
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }

    // reset on any field change
    if (genError) {
      setGeneralError(null)
    }
  }

  const setFieldError = (field: keyof T, error: string | null) => {
    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  const setGeneralError = (error: string | null) => {
    setGenError(error)
  }

  const clearFieldError = (field: keyof T) => {
    setErrors((prev) => ({ ...prev, [field]: null }))
  }

  const validateField = (field: keyof T, value?: any) => {
    const validator = options.validators?.[field]

    if (!validator) {
      return null
    }

    // Using passed or current value from state
    const valueToValidate = value !== undefined ? value : values[field]
    const error = validator(valueToValidate)

    setErrors((prev) => ({ ...prev, [field]: error }))
    return error
  }

  const validateAll = (): boolean => {
    if (!options.validators) {
      return true
    }

    let isFormValid = true
    const newErrors: Partial<Record<keyof T, string | null>> = {}

    // Mapping all validators
    Object.keys(options.validators).forEach((fieldKey) => {
      const field = fieldKey as keyof T
      const validator = options.validators![field]

      if (validator) {
        const error = validator(values[field])
        newErrors[field] = error

        if (error) {
          isFormValid = false
        }
      }
    })

    setErrors(newErrors)
    return isFormValid
  }

  const compareValues = <T>(currentValue: T, initialValue: T): boolean => {
    if (typeof currentValue === 'string' && typeof initialValue === 'string') {
      return currentValue.trim() !== initialValue.trim()
    }

    if (typeof currentValue === 'string' && typeof initialValue === 'number') {
      return Number(currentValue) !== initialValue
    }

    return currentValue !== initialValue
  }

  // Check if any field changed to prevent extra DB calls
  const isTouched = Object.entries(values).some(([key, value]) =>
    compareValues(value, options.initialValues[key])
  )

  const reset = () => {
    setValues(options.initialValues)
    setErrors({})
  }

  const isValid = Object.values(errors).every((error) => !error || false)

  return {
    values,
    errors,
    generalError: genError,
    setFieldValue,
    setFieldError,
    setGeneralError,
    clearFieldError,
    validateField,
    validateAll,
    reset,
    isValid,
    isTouched,
  }
}
