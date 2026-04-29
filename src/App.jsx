import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { useAuth } from './hooks/useAuth'
import LoginPage from './pages/LoginPage'
import ProfileSelectPage from './pages/ProfileSelectPage'
import DashboardPage from './pages/DashboardPage'
import LearningPage from './pages/LearningPage'

/* ─── Protège les routes : non connecté → /login ─── */
function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

/* ─── Protège /dashboard : si profil pas encore choisi → /profile-select ─── */
function ProfileRoute({ children }) {
  const { user, profile } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (!profile) return <Navigate to="/profile-select" replace />
  return children
}

/* ─── Redirige les utilisateurs déjà connectés ─── */
function PublicRoute({ children }) {
  const { user, profile } = useAuth()
  if (!user) return children
  return <Navigate to={profile ? '/dashboard' : '/profile-select'} replace />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Connexion */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      {/* Sélection du profil */}
      <Route
        path="/profile-select"
        element={
          <PrivateRoute>
            <ProfileSelectPage />
          </PrivateRoute>
        }
      />

      {/* Dashboard — nécessite profil choisi */}
      <Route
        path="/dashboard"
        element={
          <ProfileRoute>
            <DashboardPage />
          </ProfileRoute>
        }
      />

      {/* Séance d'apprentissage — nécessite profil choisi */}
      <Route
        path="/learn"
        element={
          <ProfileRoute>
            <LearningPage />
          </ProfileRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
