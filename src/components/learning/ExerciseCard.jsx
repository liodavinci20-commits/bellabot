import { useState } from 'react'
import { HiOutlineLightBulb, HiOutlineEye, HiOutlineEyeOff, HiOutlineCheckCircle } from 'react-icons/hi'
import CodeBlock from './CodeBlock'

export default function ExerciseCard({ exercise }) {
  const [showHint, setShowHint]     = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [done, setDone]             = useState(false)

  return (
    <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-emerald-500/15">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0">
          <HiOutlineCheckCircle className="w-4 h-4 text-emerald-400" />
        </div>
        <div>
          <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">{exercise.question}</p>
        </div>
      </div>

      {/* Énoncé */}
      <div className="px-5 py-4">
        <p className="text-sm text-white/70 leading-relaxed whitespace-pre-line">{exercise.prompt}</p>
      </div>

      {/* Actions */}
      <div className="px-5 pb-4 flex flex-wrap gap-2">
        {/* Indice */}
        {exercise.hint && (
          <button
            onClick={() => setShowHint((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
              bg-amber-500/10 border border-amber-500/20 text-amber-400
              hover:bg-amber-500/15 text-xs font-medium transition-all duration-150"
          >
            <HiOutlineLightBulb className="w-3.5 h-3.5" />
            {showHint ? 'Masquer l\'indice' : 'Voir un indice'}
          </button>
        )}

        {/* Réponse */}
        {exercise.answer && (
          <button
            onClick={() => setShowAnswer((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
              bg-white/5 border border-white/10 text-white/40
              hover:bg-white/8 hover:text-white/60 text-xs font-medium transition-all duration-150"
          >
            {showAnswer ? <HiOutlineEyeOff className="w-3.5 h-3.5" /> : <HiOutlineEye className="w-3.5 h-3.5" />}
            {showAnswer ? 'Masquer la réponse' : 'Voir la réponse'}
          </button>
        )}

        {/* Marquer comme fait */}
        <button
          onClick={() => setDone((v) => !v)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150
            ${done
              ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
              : 'bg-white/5 border border-white/10 text-white/35 hover:bg-white/8'
            }`}
        >
          <HiOutlineCheckCircle className="w-3.5 h-3.5" />
          {done ? 'Exercice complété !' : 'Marquer comme fait'}
        </button>
      </div>

      {/* Indice affiché */}
      {showHint && exercise.hint && (
        <div className="mx-5 mb-4 px-4 py-3 rounded-xl bg-amber-500/8 border border-amber-500/20">
          <p className="text-xs text-amber-300 leading-relaxed">
            <span className="font-semibold">Indice : </span>{exercise.hint}
          </p>
        </div>
      )}

      {/* Réponse affichée */}
      {showAnswer && exercise.answer && (
        <div className="px-5 pb-5">
          <CodeBlock
            label="Correction"
            code={exercise.answer}
            type="good"
            comment={null}
          />
        </div>
      )}
    </div>
  )
}
