import supabase from '~/utils/supabase'

// todo clean logs

export const authService = {
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      if (error.code === 'email_not_confirmed') {
        throw new Error('Please confirm your email first')
      }

      if (error.code === 'invalid_credentials') {
        throw new Error('Invalid email or password')
      }

      throw new Error(error.message || 'Authentication failed')
    }

    console.log('Logged in successfully')
    return data
  },

  async signup(email: string, password: string, name: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    })

    if (error) {
      throw error
    }

    console.log('Registration successful, check email')
    console.log('User', data.user)
  },

  async logout() {
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw error
    }

    console.log('Successfully logged out')
  },
}
