import { createContext, useState, useCallback } from 'react'

export const AuthContext = createContext(null)

const MOCK_USERS = [
  { id: 1, email: 'admin@bellabot.ai', password: 'bella2024', name: 'Admin', role: 'teacher' },
  { id: 2, email: 'eleve@bellabot.ai', password: 'eleve123', name: 'Élève Test', role: 'student' },
]

const DEMO_USER = {
  id: 0,
  name: 'Utilisateur Demo',
  email: 'demo@bellabot.ai',
  role: 'student',
  isDemo: true,
}

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [profile, setProfile] = useState(null)   // profil d'apprentissage choisi
  const [error, setError]     = useState(null)
  const [loading, setLoading] = useState(false)

  const login = useCallback(async (email, password) => {
    setLoading(true)
    setError(null)
    await new Promise((r) => setTimeout(r, 800))

    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    )

    if (found) {
      const { password: _, ...safeUser } = found
      setUser({ ...safeUser, isDemo: false })
      setLoading(false)
      return true
    } else {
      setError('Email ou mot de passe incorrect.')
      setLoading(false)
      return false
    }
  }, [])

  const loginAsDemo = useCallback(async () => {
    setLoading(true)
    setError(null)
    await new Promise((r) => setTimeout(r, 600))
    setUser(DEMO_USER)
    setLoading(false)
  }, [])

  // L'élève choisit son profil → stocké dans le context
  const selectProfile = useCallback((profileData) => {
    setProfile(profileData)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setProfile(null)
    setError(null)
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return (
    <AuthContext.Provider value={{
      user, profile,
      error, loading,
      login, loginAsDemo,
      selectProfile,
      logout, clearError,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
