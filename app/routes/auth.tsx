import { useState } from 'react'

import supabase from '~/utils/supabase'

// todo authService?
const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleSignUp = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }, // Передаем имя в метаданные
        },
      })

      if (error) {
        setMessage(`Ошибка: ${error.message}`)
      } else {
        setMessage('✅ Регистрация успешна! Проверьте email.')
        console.log('User created:', data.user)
      }
    } catch (err) {
      setMessage(`Системная ошибка: ${err}`)
    }
  }

  const handleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setMessage(`Ошибка входа: ${error.message}`)
      } else {
        setMessage('✅ Вход успешен!')
        console.log('User signed in:', data.user)
      }
    } catch (err) {
      setMessage(`Системная ошибка: ${err}`)
    }
  }

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      setMessage(`Текущий пользователь: ${user.email}`)

      // Проверяем профиль в нашей таблице
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      console.log('Profile:', profile)
    } else {
      setMessage('Пользователь не авторизован')
    }
  }

  return (
    <div style={{ padding: '20px' }} className="h-screen">
      <h2>Тест Authentication</h2>

      <div>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div
        style={{ marginTop: '10px' }}
        className="flex flex-col gap-2 items-start"
      >
        <button onClick={handleSignUp}>Регистрация</button>
        <button onClick={handleSignIn}>Вход</button>
        <button onClick={checkUser}>Проверить пользователя</button>
      </div>

      {message && (
        <div
          style={{
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#f0f0f0',
          }}
        >
          {message}
        </div>
      )}
    </div>
  )
}

export default Auth
