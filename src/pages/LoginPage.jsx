import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineLightningBolt,
  HiOutlineSparkles,
  HiOutlineBookOpen,
  HiOutlineChatAlt2,
  HiOutlineAdjustments,
} from 'react-icons/hi'
import { useAuth } from '../hooks/useAuth'
import ThemeToggle from '../components/ThemeToggle'

/* ─── Brand Panel ─── */
function BrandPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center p-12 overflow-hidden">
      {/* Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-blue-500/20 blur-[90px] animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full bg-indigo-500/20 blur-[70px] animate-pulse" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-2/3 left-1/3 w-40 h-40 rounded-full bg-violet-500/15 blur-[50px] animate-pulse" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 text-center max-w-sm">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl glass-strong glow-blue-sm mb-8">
          <HiOutlineLightningBolt className="w-9 h-9 text-blue-400" />
        </div>

        <h1 className="text-4xl font-bold text-gradient mb-4 leading-tight">
          AdaptativeCBot
        </h1>
        <p className="text-lg text-white/55 leading-relaxed mb-10">
          Ton assistant d'orientation pédagogique intelligent, adapté à ton profil d'apprentissage.
        </p>

        <div className="flex flex-col gap-3">
          {[
            { icon: HiOutlineAdjustments, label: "Profil d'apprentissage personnalisé" },
            { icon: HiOutlineChatAlt2,    label: 'Chatbot conversationnel intelligent' },
            { icon: HiOutlineBookOpen,    label: 'Séances adaptées à ton niveau' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 glass rounded-xl px-4 py-3 text-left">
              <Icon className="w-5 h-5 text-blue-400 shrink-0" />
              <span className="text-sm text-white/65">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Login Form ─── */
function LoginForm() {
  const { login, loginAsDemo, loading, error, clearError } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail]               = useState('')
  const [password, setPassword]         = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ok = await login(email, password)
    if (ok) navigate('/profile-select', { replace: true })
  }

  const handleDemo = async () => {
    await loginAsDemo()
    navigate('/profile-select', { replace: true })
  }

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">

        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-3 mb-10">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl glass-strong">
            <HiOutlineLightningBolt className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-xl font-semibold text-gradient">AdaptativeCBot</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Bienvenue</h2>
          <p className="text-white/45 text-sm">Connecte-toi pour accéder à ton espace d'apprentissage.</p>
        </div>

        {/* Demo button */}
        <button
          onClick={handleDemo}
          disabled={loading}
          className="w-full mb-6 flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl
            bg-gradient-to-r from-blue-600/25 to-indigo-600/25
            border border-blue-500/35 text-blue-300
            hover:from-blue-600/35 hover:to-indigo-600/35 hover:border-blue-400/55
            hover:text-blue-200
            transition-all duration-200 text-sm font-medium
            disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <HiOutlineSparkles className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform duration-200" />
          {loading ? 'Chargement...' : 'Accéder en mode démo — sans inscription'}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-white/30 font-medium">ou se connecter</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm">
              <span className="flex-1">{error}</span>
              <button type="button" onClick={clearError} className="text-red-400/60 hover:text-red-400 leading-none">
                ✕
              </button>
            </div>
          )}

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-white/45 uppercase tracking-wider">
              Adresse email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ton@email.com"
              required
              className="w-full px-4 py-3.5 rounded-xl glass text-white placeholder-white/20
                text-sm outline-none
                focus:border-blue-500/60 focus:bg-white/[0.08]
                transition-all duration-200"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-white/45 uppercase tracking-wider">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3.5 pr-12 rounded-xl glass text-white placeholder-white/20
                  text-sm outline-none
                  focus:border-blue-500/60 focus:bg-white/[0.08]
                  transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPassword
                  ? <HiOutlineEyeOff className="w-5 h-5" />
                  : <HiOutlineEye    className="w-5 h-5" />
                }
              </button>
            </div>
          </div>

          {/* Forgot */}
          <div className="flex justify-end">
            <button type="button" className="text-xs text-blue-400/70 hover:text-blue-300 transition-colors">
              Mot de passe oublié ?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 rounded-xl font-semibold text-sm
              bg-gradient-to-r from-blue-600 to-indigo-600
              hover:from-blue-500 hover:to-indigo-500
              text-white shadow-lg shadow-blue-500/30
              hover:shadow-blue-500/45 hover:scale-[1.01] active:scale-[0.99]
              transition-all duration-200
              disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Connexion...
              </span>
            ) : 'Se connecter →'}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-white/25">
          Pas encore de compte ?{' '}
          <button className="text-blue-400/70 hover:text-blue-300 transition-colors">
            Contacter l'administrateur
          </button>
        </p>

        {/* Demo credentials */}
        <div className="mt-4 p-3 rounded-lg bg-white/[0.03] border border-white/6 text-center">
          <p className="text-xs text-white/25 mb-1">Identifiants de test</p>
          <p className="text-xs text-white/40 font-mono">eleve@bellabot.ai / eleve123</p>
        </div>
      </div>
    </div>
  )
}

/* ─── Page ─── */
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-app bg-mesh flex relative">
      {/* Toggle mode ── coin supérieur droit */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <BrandPanel />
      <LoginForm />
    </div>
  )
}
