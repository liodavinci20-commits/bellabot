import { HiOutlineInformationCircle, HiOutlineX } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function DemoBanner() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user?.isDemo) return null

  const handleExit = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3
      px-5 py-3 rounded-2xl
      bg-gradient-to-r from-blue-950/90 to-indigo-950/90
      border border-blue-500/30 backdrop-blur-xl
      shadow-lg shadow-blue-500/15 text-sm text-white/80"
    >
      <HiOutlineInformationCircle className="w-4 h-4 text-blue-400 shrink-0" />
      <span className="flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
        <span className="font-medium text-blue-300">Mode Démo actif</span>
        <span className="text-white/35 hidden sm:inline">— données fictives, aucune sauvegarde</span>
      </span>
      <button
        onClick={handleExit}
        className="ml-2 p-1 rounded-lg hover:bg-white/10 text-white/35 hover:text-white/70 transition-all duration-150"
        aria-label="Quitter le mode démo"
      >
        <HiOutlineX className="w-4 h-4" />
      </button>
    </div>
  )
}
