import { useState } from 'react'
import { HiOutlineClipboardCopy, HiOutlineCheck } from 'react-icons/hi'

const TYPE_STYLES = {
  bad:     { bar: 'bg-red-500',    label: 'text-red-400',    labelText: 'Problème' },
  good:    { bar: 'bg-emerald-500', label: 'text-emerald-400', labelText: 'Solution' },
  trace:   { bar: 'bg-amber-500',  label: 'text-amber-400',  labelText: 'Trace' },
  bonus:   { bar: 'bg-violet-500', label: 'text-violet-400', labelText: 'Bonus' },
  neutral: { bar: 'bg-blue-500',   label: 'text-blue-400',   labelText: null },
}

export default function CodeBlock({ label, code, type = 'neutral', comment }) {
  const [copied, setCopied] = useState(false)
  const style = TYPE_STYLES[type] || TYPE_STYLES.neutral

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Coloration syntaxique Python minimale
  const highlight = (line) => {
    // Commentaires
    if (line.trim().startsWith('#')) {
      return <span className="text-white/35 italic">{line}</span>
    }
    // Mots-clés
    const keywords = /\b(for|in|if|else|elif|while|def|return|import|from|True|False|None|and|or|not|print|len|sum|enumerate|append|range)\b/g
    // Strings
    const strings = /(["'].*?["'])/g
    // Numéros
    const numbers = /\b(\d+\.?\d*)\b/g

    let result = line
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    result = result
      .replace(/(#.*$)/gm, '<span class="text-white/35 italic">$1</span>')
      .replace(/(["'].*?["'])/g, '<span class="text-amber-300">$1</span>')
      .replace(/\b(for|in|if|else|elif|while|def|return|import|from|True|False|None|and|or|not|print|len|sum|enumerate|append|range)\b/g,
        '<span class="text-blue-400 font-medium">$1</span>')
      .replace(/(?<!-)\b(\d+\.?\d*)\b/g, '<span class="text-emerald-400">$1</span>')

    return <span dangerouslySetInnerHTML={{ __html: result }} />
  }

  return (
    <div className="rounded-xl overflow-hidden border border-white/8 bg-[#0d1525]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/6">
        <div className="flex items-center gap-2.5">
          <div className={`w-2 h-2 rounded-full ${style.bar}`} />
          <span className="text-xs text-white/50 font-medium">{label}</span>
          {style.labelText && (
            <span className={`text-[10px] px-1.5 py-0.5 rounded ${style.label} bg-white/5`}>
              {style.labelText}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-white/30 hover:text-white/60 transition-colors"
        >
          {copied
            ? <><HiOutlineCheck className="w-3.5 h-3.5 text-emerald-400" /> <span className="text-emerald-400">Copié</span></>
            : <><HiOutlineClipboardCopy className="w-3.5 h-3.5" /> Copier</>
          }
        </button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-[13px] leading-6 font-mono text-white/80">
          {code.split('\n').map((line, i) => (
            <div key={i} className="flex gap-4">
              <span className="select-none text-white/15 text-right w-5 shrink-0">{i + 1}</span>
              <span className="flex-1">{highlight(line)}</span>
            </div>
          ))}
        </pre>
      </div>

      {/* Commentaire pédagogique */}
      {comment && (
        <div className="px-4 py-2.5 bg-white/[0.02] border-t border-white/6">
          <p className={`text-xs ${style.label} leading-relaxed`}>
            <span className="font-semibold">Note : </span>{comment}
          </p>
        </div>
      )}
    </div>
  )
}
