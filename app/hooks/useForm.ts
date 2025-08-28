import { useState } from 'react'

interface UseFormOptions<T> {
  initialValues: T
  validators?: Partial<Record<keyof T, (value: any) => string | null>>
  onSubmit?: (values: T) => void | Promise<void>
}

interface UseFormReturn<T> {
  // Состояние
  values: T
  errors: Partial<Record<keyof T, string | null>>

  // Методы управления
  setFieldValue: (field: keyof T, value: any) => void
  setFieldError: (field: keyof T, error: string | null) => void
  clearFieldError: (field: keyof T) => void

  // Валидация
  validateField: (field: keyof T, value?: any) => string | null
  validateAll: () => boolean

  // Утилиты
  reset: () => void
  isValid: boolean
}

export const useForm = <T extends Record<string, any>>(
  options: UseFormOptions<T>
): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(options.initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string | null>>>(
    {}
  )

  const setFieldValue = (field: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }))

    // Автоматически очищаем ошибку при изменении значения
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  const setFieldError = (field: keyof T, error: string | null) => {
    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  const clearFieldError = (field: keyof T) => {
    setErrors((prev) => ({ ...prev, [field]: null }))
  }

  const validateField = (field: keyof T, value?: any) => {
    const validator = options.validators?.[field]
    if (!validator) {
      return null
    }

    // Используем переданное значение или текущее из состояния
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

    // Проходим по всем валидаторам
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

  const reset = () => {
    setValues(options.initialValues)
    setErrors({})
  }

  const isValid = Object.values(errors).every((error) => !error || false)

  return {
    values,
    errors,
    setFieldValue,
    setFieldError,
    clearFieldError,
    validateField,
    validateAll,
    reset,
    isValid,
  }
}
