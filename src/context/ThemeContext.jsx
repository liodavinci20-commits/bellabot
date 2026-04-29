import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

/* ── CSS injecté dynamiquement : priorité absolue sur Tailwind ── */
const LIGHT_MODE_CSS = `
  body { background-color: #EDE9FA !important; color: #1E1B4B !important; }

  /* Backgrounds de page */
  .bg-app   { background-color: #EDE9FA !important; }
  .bg-panel { background-color: #F5F3FF !important; }
  .bg-code  { background-color: #EDEAFF !important; }

  /* Glass */
  .glass {
    background: rgba(255,255,255,0.85) !important;
    border-color: rgba(124,58,237,0.16) !important;
  }
  .glass-strong {
    background: rgba(255,255,255,0.93) !important;
    border-color: rgba(124,58,237,0.22) !important;
  }

  /* Mesh */
  .bg-mesh {
    background-image:
      radial-gradient(at 15% 25%, rgba(139,92,246,0.12) 0px, transparent 55%),
      radial-gradient(at 85% 75%, rgba(124,58,237,0.09) 0px, transparent 55%),
      radial-gradient(at 50% 10%, rgba(167,139,250,0.07) 0px, transparent 60%) !important;
  }

  /* Gradient texte violet → rose */
  .text-gradient {
    background: linear-gradient(135deg,#7C3AED,#A855F7,#EC4899) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-clip: text !important;
  }

  /* ── Textes blancs → indigo foncé ── */
  [class*="text-white"] { color: #1E1B4B !important; }

  /* ── Textes couleurs claires → variantes foncées lisibles ── */
  [class*="text-blue-1"],
  [class*="text-blue-2"],
  [class*="text-blue-3"]   { color: #1d4ed8 !important; }

  [class*="text-indigo-2"],
  [class*="text-indigo-3"] { color: #4338ca !important; }

  [class*="text-violet-2"],
  [class*="text-violet-3"] { color: #6d28d9 !important; }

  [class*="text-amber-2"],
  [class*="text-amber-3"]  { color: #92400e !important; }

  [class*="text-emerald-2"],
  [class*="text-emerald-3"] { color: #065f46 !important; }

  [class*="text-red-3"],
  [class*="text-red-4"]    { color: #b91c1c !important; }

  /* ── Borders blanches → violet subtil ── */
  [class*="border-white"] { border-color: rgba(124,58,237,0.16) !important; }

  /* ── Fonds blancs translucides → lavande légère ── */
  [class*="bg-white/"] { background-color: rgba(124,58,237,0.08) !important; }

  /* ── Placeholders ── */
  [class*="placeholder-white"]::placeholder { color: rgba(30,27,75,0.42) !important; }
`

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('acbot-theme')
    return saved ? saved === 'dark' : true
  })

  useEffect(() => {
    /* 1. Attribut HTML pour les overrides CSS statiques */
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    localStorage.setItem('acbot-theme', isDark ? 'dark' : 'light')

    /* 2. Style tag injecté — priorité absolue (apparaît après tous les stylesheets) */
    let el = document.getElementById('acbot-light-theme')
    if (!el) {
      el = document.createElement('style')
      el.id = 'acbot-light-theme'
      document.head.appendChild(el)
    }
    el.textContent = isDark ? '' : LIGHT_MODE_CSS
  }, [isDark])

  const toggleTheme = () => setIsDark((v) => !v)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
