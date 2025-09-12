import cn from 'classnames'
import { type FormEvent } from 'react'
import { NavLink } from 'react-router'

import { Button } from '~/components/Button'
import { Input } from '~/components/Input'
import { useForm } from '~/hooks/useForm'
import { authService } from '~/services/authService'
import { validateEmail, validatePassword } from '~/validators'

export const LoginModal = () => {
  const {
    values,
    setFieldValue,
    generalError,
    setGeneralError,
    errors,
    validateField,
    validateAll,
  } = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validators: {
      email: (value) => validateEmail(value),
      password: (value) => validatePassword(value),
    },
  })

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    const allFieldsValid = validateAll()

    if (!allFieldsValid) {
      return
    }

    try {
      await authService.login(values.email, values.password)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Login failed'

      setGeneralError(errorMessage)
    }
  }

  return (
    <div
      className={cn(
        'flex flex-col grow w-full',
        'bg-white',
        'px-5 py-6 gap-8 md:p-8',
        'rounded-xl',
        'max-w-[560px]'
      )}
    >
      <h1 className="text-preset-1 text-grey-900">Login</h1>

      <form
        className="flex flex-col gap-4"
        onSubmit={handleLogin}
        id="login-form"
      >
        <Input
          label={{ showLabel: true, labelText: 'Email' }}
          input={{
            placeholder: '',
            value: values.email,
            onChange: (value) => setFieldValue('email', value),
            onBlur: () => validateField('email'),
          }}
          helperText={{
            showHelper: false,
          }}
          error={errors.email}
          styles="flex-col"
        />

        <Input
          label={{ showLabel: true, labelText: 'Password' }}
          input={{
            placeholder: '',
            value: values.password,
            onChange: (value) => setFieldValue('password', value),
            onBlur: () => validateField('password'),
          }}
          helperText={{
            showHelper: false,
          }}
          error={errors.password}
          styles="flex-col"
          showPassIcon
        />
      </form>

      <Button variant="primary" styles="p-4" type="submit" form="login-form">
        Login
      </Button>

      {generalError && (
        <p className="text-red-500 text-preset-4">{generalError}</p>
      )}

      <div className="flex items-center justify-center gap-2">
        <p className="text-preset-4 text-grey-500">
          Need to create an account?
        </p>

        <NavLink
          to="/signup"
          className="text-preset-4-bold text-grey-900 underline"
        >
          Sign Up
        </NavLink>
      </div>
    </div>
  )
}
