import cn from 'classnames'
import type { FormEvent } from 'react'
import { NavLink } from 'react-router'

import { Button } from '~/components/Button'
import { Input } from '~/components/Input'
import { useForm } from '~/hooks/useForm'
import { authService } from '~/services/authService'
import { authValidators } from '~/validators'

// todo redirect to another page?

export const SignupModal = () => {
  const { values, setFieldValue, validateField, errors, validateAll } = useForm(
    {
      initialValues: {
        name: '',
        email: '',
        password: '',
      },
      validators: {
        name: (name: string) => authValidators.validateUsername(name),
        email: (email: string) => authValidators.validateEmail(email),
        password: (password: string) =>
          authValidators.validatePassword(password, true),
      },
    }
  )

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault()

    const allFieldsValid = validateAll()

    if (allFieldsValid) {
      await authService.signup(values.email, values.password, values.name)
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
      <h1 className="text-preset-1 text-grey-900">Sign Up</h1>

      <form
        className="flex flex-col gap-4"
        onSubmit={handleSignUp}
        id="signup-form"
      >
        <Input
          label={{ showLabel: true, labelText: 'Name' }}
          input={{
            placeholder: '',
            value: values.name,
            onChange: (value) => setFieldValue('name', value),
            onBlur: () => validateField('name'),
          }}
          helperText={{
            showHelper: false,
          }}
          error={errors.name}
          styles="flex-col"
        />

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
          label={{ showLabel: true, labelText: 'Create Password' }}
          input={{
            placeholder: '',
            value: values.password,
            onChange: (value) => setFieldValue('password', value),
            onBlur: () => validateField('password'),
          }}
          helperText={{
            showHelper: true,
            helperText: 'Password must be at least 8 characters',
            helperStyles: 'self-end',
          }}
          error={errors.password}
          styles="flex-col"
          showPassIcon
        />
      </form>

      <Button variant="primary" styles="p-4" type="submit" form="signup-form">
        Create Account
      </Button>

      <div className="flex items-center justify-center gap-2">
        <p className="text-preset-4 text-grey-500">Already have an account? </p>

        <NavLink
          to="/login"
          className="text-preset-4-bold text-grey-900 underline"
        >
          Login
        </NavLink>
      </div>
    </div>
  )
}
