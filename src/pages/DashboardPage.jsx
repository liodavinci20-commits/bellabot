import { useNavigate } from 'react-router-dom'
import {
  HiOutlineLightningBolt,
  HiOutlineChatAlt2,
  HiOutlineChartBar,
  HiOutlineAcademicCap,
  HiOutlineLogout,
  HiArrowLeft,
  HiOutlinePencil,
  HiOutlineBeaker,
  HiOutlinePhotograph,
  HiOutlineLightBulb,
  HiOutlineViewList,
} from 'react-icons/hi'
import { useAuth } from '../hooks/useAuth'
import DemoBanner from '../components/auth/DemoBanner'

const PROFILE_ICONS = {
  pratique:            HiOutlineBeaker,
  visuel:              HiOutlinePhotograph,
  'visuel-intuitif':   HiOutlineLightBulb,
  'visuel-sequentiel': HiOutlineViewList,
}

export default function DashboardPage() {
  const { user, profile, logout } = useAuth()
  const navigate = useNavigate()

  const ProfileIcon = profile ? PROFILE_ICONS[profile.id] : HiOutlineAcademicCap

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#060d1f] bg-mesh">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/6 glass">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-8 h-8 rounded-lg glass
              hover:bg-white/10 text-white/40 hover:text-white/70 transition-all duration-150"
            aria-label="Retour"
          >
            <HiArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg glass-strong">
              <HiOutlineLightningBolt className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <span className="font-semibold text-gradient text-sm">Bella Bot</span>
          </div>
          {user?.isDemo && (
            <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-medium">
              DEMO
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-white/35 hidden sm:block">{user?.name}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass
              hover:bg-white/10 text-white/45 hover:text-white/75
              text-xs font-medium transition-all duration-150"
          >
            <HiOutlineLogout className="w-3.5 h-3.5" />
            Déconnexion
          </button>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        {/* Carte profil actif */}
        {profile && (
          <div className={`
            relative flex items-center justify-between gap-4 p-5 rounded-2xl mb-8
            border bg-gradient-to-r ${profile.gradientBg} ${profile.borderSelected} border
          `}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${profile.iconBg} flex items-center justify-center shrink-0`}>
                <ProfileIcon className={`w-6 h-6 ${profile.iconColor}`} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-white font-bold text-sm">{profile.name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${profile.badgeBg}`}>
                    {profile.subtitle}
                  </span>
                </div>
                <p className={`text-xs ${profile.iconColor} font-medium`}>"{profile.tagline}"</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/profile-select')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg glass
                hover:bg-white/10 text-white/40 hover:text-white/70
                text-xs transition-all duration-150 shrink-0"
            >
              <HiOutlinePencil className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Changer</span>
            </button>
          </div>
        )}

        {/* Bienvenue */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">
            Bonjour, {user?.name} !
          </h1>
          <p className="text-white/40 text-sm">
            Ton espace est prêt. Que veux-tu faire aujourd'hui ?
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          {/* CTA principal */}
          <button
            onClick={() => navigate('/learn')}
            className={`flex items-center gap-4 px-5 py-4 rounded-xl text-sm font-semibold
              transition-all duration-200 text-left group
              ${profile
                ? `bg-gradient-to-r ${profile.gradient} text-white shadow-lg ${profile.glow} hover:scale-[1.01] hover:shadow-xl`
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:scale-[1.01]'
              }`}
          >
            <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
              <HiOutlineChatAlt2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold">Démarrer mon apprentissage</p>
              <p className="text-xs opacity-70 font-normal mt-0.5">
                {profile
                  ? `Session adaptée à ton profil ${profile.name}`
                  : 'Lancer une session avec Bella Bot'}
              </p>
            </div>
            <HiArrowLeft className="w-4 h-4 ml-auto rotate-180 opacity-60 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Actions secondaires */}
          {[
            {
              icon: HiOutlineChartBar,
              label: 'Voir mes statistiques',
              desc: 'Progression et résultats',
              soon: true,
            },
            {
              icon: HiOutlineAcademicCap,
              label: 'Mes séances recommandées',
              desc: 'Contenu adapté à ton profil',
              soon: true,
            },
          ].map(({ icon: Icon, label, desc, soon }) => (
            <button
              key={label}
              disabled={soon}
              className="flex items-center gap-4 px-5 py-4 rounded-xl text-sm
                transition-all duration-200 text-left glass
                disabled:cursor-not-allowed disabled:text-white/25
                hover:bg-white/[0.07] text-white/60 hover:text-white/80"
            >
              <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium">{label}</p>
                <p className="text-xs opacity-60 mt-0.5">{desc}</p>
              </div>
              {soon && (
                <span className="ml-auto text-xs text-white/20 font-normal">Bientôt</span>
              )}
            </button>
          ))}
        </div>

        {/* Besoins pédagogiques du profil */}
        {profile && (
          <div className="mt-8 p-5 glass rounded-2xl">
            <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
              Adapté à ton profil
            </p>
            <div className="flex flex-wrap gap-2">
              {profile.needs.map((need) => (
                <span
                  key={need}
                  className={`text-xs px-3 py-1.5 rounded-full border ${profile.badgeBg}`}
                >
                  {need}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>

      <DemoBanner />
    </div>
  )
}
