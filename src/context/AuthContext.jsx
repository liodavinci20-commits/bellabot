import { createContext, useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export const AuthContext = createContext(null)

const DEMO_USER = {
  id: 'demo',
  name: 'Utilisateur Demo',
  email: 'demo@bellabot.ai',
  role: 'student',
  isDemo: true,
}

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [profile, setProfile] = useState(null)
  const [error, setError]     = useState(null)
  const [loading, setLoading] = useState(false)
  const [authReady, setAuthReady] = useState(false)

  // Construire l'objet user à partir de la session Supabase
  function buildUser(session) {
    if (!session?.user) return null
    const meta = session.user.user_metadata ?? {}
    return {
      id:    session.user.id,
      email: session.user.email,
      name:  meta.name ?? session.user.email.split('@')[0],
      role:  meta.role ?? 'student',
      isDemo: false,
    }
  }

  // Restaurer la session au chargement
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(buildUser(session))
      setAuthReady(true)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(buildUser(session))
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = useCallback(async (email, password) => {
    setLoading(true)
    setError(null)
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password })
    if (err) {
      setError('Email ou mot de passe incorrect.')
      setLoading(false)
      return false
    }
    setUser(buildUser(data.session))
    setLoading(false)
    return true
  }, [])

  const register = useCallback(async (name, email, password) => {
    setLoading(true)
    setError(null)
    const { data, error: err } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, role: 'student' } },
    })
    if (err) {
      setError(err.message === 'User already registered'
        ? 'Cet email est déjà utilisé.'
        : err.message)
      setLoading(false)
      return false
    }
    setUser(buildUser(data.session))
    setLoading(false)
    return true
  }, [])

  const loginAsDemo = useCallback(async () => {
    setLoading(true)
    setError(null)
    await new Promise((r) => setTimeout(r, 600))
    setUser(DEMO_USER)
    setLoading(false)
  }, [])

  const selectProfile = useCallback((profileData) => {
    setProfile(profileData)
  }, [])

  const logout = useCallback(async () => {
    if (!user?.isDemo) await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    setError(null)
  }, [user])

  const clearError = useCallback(() => setError(null), [])

  // Ne rend les enfants que quand la session est restaurée
  if (!authReady) return null

  return (
    <AuthContext.Provider value={{
      user, profile,
      error, loading,
      login, register, loginAsDemo,
      selectProfile,
      logout, clearError,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
