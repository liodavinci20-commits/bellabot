import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  HiOutlineBeaker,
  HiOutlinePhotograph,
  HiOutlineLightBulb,
  HiOutlineViewList,
  HiOutlineCheckCircle,
  HiOutlineLightningBolt,
  HiArrowRight,
  HiArrowLeft,
} from 'react-icons/hi'
import { PROFILES } from '../data/profiles'
import { useAuth } from '../hooks/useAuth'
import ThemeToggle from '../components/ThemeToggle'

/* ─── Icône par profil ─── */
const ICONS = {
  pratique:          HiOutlineBeaker,
  visuel:            HiOutlinePhotograph,
  'visuel-intuitif': HiOutlineLightBulb,
  'visuel-sequentiel': HiOutlineViewList,
}

/* ─── Carte de profil ─── */
function ProfileCard({ profile, selected, onSelect }) {
  const Icon = ICONS[profile.id]
  const isSelected = selected?.id === profile.id

  return (
    <button
      onClick={() => onSelect(profile)}
      className={`
        relative w-full text-left rounded-2xl p-6
        border transition-all duration-250 group
        ${isSelected
          ? `bg-gradient-to-br ${profile.gradientBg} ${profile.borderSelected} border-2 shadow-xl ${profile.glow}`
          : `glass ${profile.border} ${profile.borderHover} hover:bg-white/[0.06]`
        }
      `}
    >
      {/* Badge sélectionné */}
      {isSelected && (
        <div className={`absolute top-4 right-4 ${profile.iconColor}`}>
          <HiOutlineCheckCircle className="w-5 h-5" />
        </div>
      )}

      {/* Icône */}
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${profile.iconBg} mb-4`}>
        <Icon className={`w-6 h-6 ${profile.iconColor}`} />
      </div>

      {/* Titre */}
      <div className="mb-1">
        <h3 className="text-base font-bold text-white leading-snug">{profile.name}</h3>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border mt-1 inline-block ${profile.badgeBg}`}>
          {profile.subtitle}
        </span>
      </div>

      {/* Tagline */}
      <p className={`text-sm font-medium mt-3 mb-2 ${profile.iconColor}`}>
        "{profile.tagline}"
      </p>

      {/* Description */}
      <p className="text-xs text-white/50 leading-relaxed mb-4">
        {profile.description}
      </p>

      {/* Traits */}
      <div className="space-y-1.5">
        {profile.traits.map((trait) => (
          <div key={trait} className="flex items-center gap-2">
            <div className={`w-1 h-1 rounded-full ${profile.iconColor} opacity-70`} />
            <span className="text-xs text-white/55">{trait}</span>
          </div>
        ))}
      </div>
    </button>
  )
}

/* ─── Page ─── */
export default function ProfileSelectPage() {
  const { user, selectProfile } = useAuth()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const [confirming, setConfirming] = useState(false)

  const handleConfirm = async () => {
    if (!selected) return
    setConfirming(true)
    await new Promise((r) => setTimeout(r, 500))
    selectProfile(selected)
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="min-h-screen bg-app bg-mesh">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/6 glass">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-8 h-8 rounded-lg glass
              hover:bg-white/10 text-white/40 hover:text-white/70 transition-all duration-150"
          >
            <HiArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg glass-strong">
              <HiOutlineLightningBolt className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <span className="font-semibold text-gradient text-sm">AdaptativeCBot</span>
          </div>
        </div>

        {/* Étapes */}
        <div className="flex items-center gap-2 text-xs text-white/35">
          <div className="w-5 h-5 rounded-full bg-blue-500/30 border border-blue-500/50 flex items-center justify-center text-blue-400 font-bold text-[10px]">1</div>
          <div className="w-8 h-px bg-white/15" />
          <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] transition-all duration-300
            ${selected ? 'bg-blue-500/30 border border-blue-500/50 text-blue-400' : 'bg-white/5 border border-white/15 text-white/30'}`}>
            2
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-white/35 hidden sm:block">{user?.name}</span>
          <ThemeToggle />
        </div>
      </nav>

      {/* Contenu */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
            Quel est ton style<br />
            <span className="text-gradient">d'apprentissage ?</span>
          </h1>
          <p className="text-white/45 text-base max-w-lg mx-auto">
            Choisis le profil qui te ressemble le plus. AdaptativeCBot adaptera ton parcours à ta façon d'apprendre.
          </p>
        </div>

        {/* Grille des 4 profils */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {PROFILES.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              selected={selected}
              onSelect={setSelected}
            />
          ))}
        </div>

        {/* Zone de confirmation */}
        <div className={`transition-all duration-300 ${selected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
          {selected && (
            <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl border bg-gradient-to-r ${selected.gradientBg} ${selected.borderSelected} border`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${selected.iconBg} flex items-center justify-center shrink-0`}>
                  {(() => { const Icon = ICONS[selected.id]; return <Icon className={`w-5 h-5 ${selected.iconColor}`} /> })()}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{selected.name}</p>
                  <p className="text-white/45 text-xs">{selected.tagline}</p>
                </div>
              </div>

              <button
                onClick={handleConfirm}
                disabled={confirming}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                  bg-gradient-to-r ${selected.gradient} text-white
                  hover:scale-[1.03] active:scale-[0.98]
                  shadow-lg ${selected.glow}
                  transition-all duration-200
                  disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100
                  whitespace-nowrap
                `}
              >
                {confirming ? (
                  <>
                    <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Chargement...
                  </>
                ) : (
                  <>
                    Confirmer mon profil
                    <HiArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Note bas de page */}
        <p className="text-center text-xs text-white/20 mt-6">
          Tu pourras changer de profil à tout moment depuis ton espace.
        </p>
      </main>
    </div>
  )
}
