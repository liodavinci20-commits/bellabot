import { useState, useRef } from 'react'
import {
  HiOutlineCode,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineLightBulb,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineRefresh,
  HiOutlineClipboardCopy,
  HiOutlineCheck,
  HiOutlineExclamation,
} from 'react-icons/hi'
import CodeBlock from './CodeBlock'

/* ─── Résultat d'une vérification individuelle ─── */
function CheckResult({ check, status }) {
  if (status === null) return null

  const ok = status === true
  return (
    <div className={`flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl text-sm
      ${ok
        ? 'bg-emerald-500/8 border border-emerald-500/20'
        : 'bg-red-500/8 border border-red-500/20'
      }`}
    >
      {ok
        ? <HiOutlineCheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
        : <HiOutlineXCircle    className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
      }
      <span className={ok ? 'text-emerald-300' : 'text-red-300'}>
        {ok ? check.success : check.error}
      </span>
    </div>
  )
}

/* ─── Panneau de diagnostic d'erreur ─── */
function DiagnosticPanel({ detectedError }) {
  if (!detectedError) return null
  const { pattern, isSecondOccurrence } = detectedError

  return (
    <div className="rounded-xl border border-amber-500/25 bg-amber-500/[0.06] overflow-hidden">
      {/* En-tête */}
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-amber-500/15">
        <HiOutlineExclamation className="w-4 h-4 text-amber-400 shrink-0" />
        <p className="text-sm font-semibold text-amber-400">{pattern.title}</p>
      </div>

      <div className="px-4 py-3.5 space-y-3">
        {/* Message ou analogie (selon le nb d'occurrences) */}
        <div className="flex items-start gap-2.5">
          <HiOutlineLightBulb className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
          <div>
            {isSecondOccurrence && pattern.analogy ? (
              <>
                <p className="text-[10px] font-semibold text-amber-400/60 uppercase tracking-wider mb-1">
                  Analogie
                </p>
                <p className="text-sm text-amber-200/80 leading-relaxed whitespace-pre-line">
                  {pattern.analogy}
                </p>
              </>
            ) : (
              <p className="text-sm text-amber-200/80 leading-relaxed whitespace-pre-line">
                {pattern.message}
              </p>
            )}
          </div>
        </div>

        {/* Exercice de suivi immédiat */}
        {pattern.followUp && (
          <div className="px-3.5 py-3 rounded-xl bg-blue-500/8 border border-blue-500/20">
            <p className="text-[10px] font-semibold text-blue-400/60 uppercase tracking-wider mb-1.5">
              Exercice immédiat
            </p>
            <p className="text-sm text-blue-300/90 leading-relaxed mb-2">
              {pattern.followUp.question}
            </p>
            <p className="text-xs text-blue-400/50 italic leading-relaxed">
              Indice : {pattern.followUp.hint}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Éditeur de pratique principal ─── */
export default function PracticeEditor({ exercise, onFirstPass, onErrorAdaptation }) {
  const [code, setCode]             = useState(exercise.starter ?? '')
  const [results, setResults]       = useState(null)   // null | check[]
  const [validated, setValidated]   = useState(false)
  const [allGood, setAllGood]       = useState(false)
  const [hintLevel, setHintLevel]   = useState(0)      // 0 = aucun, 1/2/3 = niveaux
  const [showSolution, setShowSolution] = useState(false)
  const [attempts, setAttempts]     = useState(0)
  const [copied, setCopied]         = useState(false)
  const [detectedError, setDetectedError]   = useState(null)   // { pattern, isSecondOccurrence }
  const [shownErrorIds, setShownErrorIds]   = useState(new Set())
  const textareaRef = useRef(null)

  const hints    = exercise.hints   ?? []
  const checks   = exercise.validation ?? []
  const isCode   = exercise.type === 'code'
  const hasHints = hints.length > 0

  /* ── Validation ── */
  const validate = () => {
    const errorPatterns = exercise.errorPatterns ?? []
    const newResults = checks.map((check) => ({
      ...check,
      passed: check.test(code),
    }))
    const allPassed = newResults.every((r) => r.passed)
    const passedNow = newResults.filter((r) => r.passed).length
    setResults(newResults)
    setValidated(true)
    setAllGood(allPassed)
    setAttempts((a) => a + 1)
    if (passedNow > 0) onFirstPass?.()

    // Détection d'erreur : uniquement si tout n'est pas validé
    if (!allPassed && errorPatterns.length > 0) {
      const matched = errorPatterns.find((p) => {
        try { return p.detect(code) } catch { return false }
      })
      if (matched) {
        const isSecondOccurrence = shownErrorIds.has(matched.id)
        setDetectedError({ pattern: matched, isSecondOccurrence })
        if (!isSecondOccurrence) {
          setShownErrorIds((prev) => new Set([...prev, matched.id]))
          if (matched.adaptedSteps || matched.adaptedContent) {
            onErrorAdaptation?.({
              errorId:        matched.id,
              errorTitle:     matched.title,
              errorProfile:   matched.errorProfile,
              adaptedSteps:   matched.adaptedSteps,
              adaptedContent: matched.adaptedContent,
            })
          }
        }
      } else {
        setDetectedError(null)
      }
    } else {
      setDetectedError(null)
    }
  }

  /* ── Indice progressif ── */
  const showNextHint = () => {
    if (hintLevel < hints.length) setHintLevel((l) => l + 1)
  }

  /* ── Réinitialiser ── */
  const reset = () => {
    setCode(exercise.starter ?? '')
    setResults(null)
    setValidated(false)
    setAllGood(false)
    setHintLevel(0)
    setShowSolution(false)
    setDetectedError(null)
    textareaRef.current?.focus()
  }

  /* ── Copier la solution ── */
  const copySolution = () => {
    navigator.clipboard.writeText(exercise.answer)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  /* ── Gestion tab dans le textarea ── */
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.target.selectionStart
      const end   = e.target.selectionEnd
      const newCode = code.substring(0, start) + '  ' + code.substring(end)
      setCode(newCode)
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2
      }, 0)
    }
  }

  /* ── Compteur de checks réussis ── */
  const passedCount = results ? results.filter((r) => r.passed).length : 0
  const totalChecks = checks.length

  return (
    <div className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.03] overflow-hidden">

      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-blue-500/15">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center shrink-0">
            <HiOutlineCode className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              {exercise.question}
            </p>
            {validated && passedCount > 0 && (
              <p className="text-[10px] text-white/35 mt-0.5">
                {passedCount}/{totalChecks} critère{totalChecks > 1 ? 's' : ''} validé{passedCount > 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        {/* Barre de progression */}
        {validated && totalChecks > 0 && (
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  allGood ? 'bg-emerald-400' : 'bg-blue-500'
                }`}
                style={{ width: `${(passedCount / totalChecks) * 100}%` }}
              />
            </div>
            <span className="text-xs text-white/30">{Math.round((passedCount / totalChecks) * 100)}%</span>
          </div>
        )}
      </div>

      <div className="p-5 space-y-4">

        {/* ── Énoncé ── */}
        <div className="px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/6">
          <p className="text-sm text-white/65 leading-relaxed whitespace-pre-line">{exercise.prompt}</p>
        </div>

        {/* ── Indices progressifs ── */}
        {hintLevel > 0 && (
          <div className="space-y-2">
            {hints.slice(0, hintLevel).map((hint, i) => (
              <div key={i} className="flex items-start gap-2.5 px-4 py-3 rounded-xl
                bg-amber-500/8 border border-amber-500/20">
                <HiOutlineLightBulb className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] font-semibold text-amber-400/60 uppercase tracking-wider mb-0.5">
                    Indice {i + 1}
                  </p>
                  <p className="text-xs text-amber-300 leading-relaxed whitespace-pre-line">{hint}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Éditeur de code ── */}
        {isCode && (
          <div className="rounded-xl overflow-hidden border border-white/8 bg-[#0d1525]">
            {/* Barre éditeur */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border-b border-white/6">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
              </div>
              <span className="text-xs text-white/25 font-mono ml-2">pseudocode</span>
              <span className="ml-auto text-[10px] text-white/20">Tab = 2 espaces</span>
            </div>

            {/* Éditeur avec numéros de ligne */}
            <div className="flex">
              {/* Numéros */}
              <div className="select-none px-3 py-4 text-right bg-white/[0.02] border-r border-white/6 min-w-[2.5rem]">
                {code.split('\n').map((_, i) => (
                  <div key={i} className="text-[11px] leading-6 text-white/15 font-mono">{i + 1}</div>
                ))}
              </div>
              {/* Textarea */}
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => { setCode(e.target.value); setValidated(false); setAllGood(false) }}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                className="flex-1 px-4 py-4 bg-transparent text-[13px] leading-6
                  font-mono text-white/80 outline-none resize-none
                  placeholder-white/15 min-h-[200px]"
                style={{ fontFamily: 'ui-monospace, Consolas, monospace' }}
              />
            </div>
          </div>
        )}

        {/* ── Zone texte libre (exercice de réflexion) ── */}
        {!isCode && (
          <textarea
            value={code}
            onChange={(e) => { setCode(e.target.value); setValidated(false) }}
            placeholder="Écris ta réponse ici..."
            className="w-full px-4 py-3.5 rounded-xl glass text-sm text-white/80
              placeholder-white/20 outline-none resize-none min-h-[100px]
              focus:border-blue-500/50 transition-all duration-200"
          />
        )}

        {/* ── Résultats des vérifications — uniquement les checks validés (vert) ── */}
        {validated && results && (
          <div className="space-y-2">
            {results.filter((r) => r.passed).map((r) => (
              <CheckResult key={r.id} check={r} status={true} />
            ))}
            {!allGood && passedCount === 0 && (
              <p className="text-xs text-white/25 text-center py-1">
                Pas encore de critère validé — continue à écrire !
              </p>
            )}
          </div>
        )}

        {/* ── Diagnostic d'erreur ── */}
        <DiagnosticPanel detectedError={detectedError} />

        {/* ── Message de succès total ── */}
        {allGood && (
          <div className="flex items-center gap-3 px-4 py-4 rounded-xl
            bg-emerald-500/10 border border-emerald-500/30">
            <HiOutlineCheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <p className="text-sm font-bold text-emerald-400">Excellent ! Tous les critères sont validés.</p>
              <p className="text-xs text-emerald-400/60 mt-0.5">
                {attempts === 1 ? 'Du premier coup !' : `Validé en ${attempts} essai${attempts > 1 ? 's' : ''}.`}
              </p>
            </div>
          </div>
        )}

        {/* ── Solution ── */}
        {showSolution && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-white/30 uppercase tracking-wider">Correction</p>
              <button onClick={copySolution} className="flex items-center gap-1 text-xs text-white/25 hover:text-white/50 transition-colors">
                {copied
                  ? <><HiOutlineCheck className="w-3 h-3 text-emerald-400" /><span className="text-emerald-400">Copié</span></>
                  : <><HiOutlineClipboardCopy className="w-3 h-3" />Copier</>
                }
              </button>
            </div>
            <CodeBlock label="Correction" code={exercise.answer} type="good" comment={null} />
          </div>
        )}

        {/* ── Actions ── */}
        <div className="flex flex-wrap gap-2 pt-1">
          {/* Valider */}
          <button
            onClick={validate}
            disabled={!code.trim()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
              bg-gradient-to-r from-blue-600 to-indigo-600 text-white
              hover:from-blue-500 hover:to-indigo-500 hover:scale-[1.01]
              shadow-lg shadow-blue-500/20 transition-all
              disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
          >
            <HiOutlineCheckCircle className="w-4 h-4" />
            Valider ma réponse
          </button>

          {/* Indice */}
          {hasHints && hintLevel < hints.length && (
            <button
              onClick={showNextHint}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm font-medium
                bg-amber-500/10 border border-amber-500/20 text-amber-400
                hover:bg-amber-500/15 transition-all"
            >
              <HiOutlineLightBulb className="w-4 h-4" />
              Indice {hintLevel + 1}/{hints.length}
            </button>
          )}

          {/* Solution */}
          <button
            onClick={() => setShowSolution((v) => !v)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm font-medium
              glass text-white/35 hover:text-white/60 hover:bg-white/8 transition-all"
          >
            {showSolution
              ? <><HiOutlineEyeOff className="w-4 h-4" />Masquer</>
              : <><HiOutlineEye className="w-4 h-4" />Voir la correction</>
            }
          </button>

          {/* Reset */}
          <button
            onClick={reset}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl
              glass text-white/25 hover:text-white/50 hover:bg-white/8
              text-xs transition-all"
            title="Recommencer"
          >
            <HiOutlineRefresh className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  )
}
