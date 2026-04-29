import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
        isDark
          ? 'glass hover:bg-white/10 text-amber-400'
          : 'bg-violet-100 border border-violet-200 hover:bg-violet-200 text-violet-600'
      }`}
      aria-label={isDark ? 'Passer en mode jour' : 'Passer en mode nuit'}
      title={isDark ? 'Mode jour' : 'Mode nuit'}
    >
      {isDark
        ? <HiOutlineSun className="w-4 h-4" />
        : <HiOutlineMoon className="w-4 h-4" />
      }
    </button>
  )
}
