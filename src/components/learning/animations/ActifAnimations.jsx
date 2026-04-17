import { useState, useEffect } from 'react'

const VALS = [23, 17, 31, 8, 25]
const GARBAGE = [-847362, 9473, 32767, -1, 2049, 4128]

/* ─── Sous-composants partagés ─── */

function ScenarioBtns({ onBad, onGood, onReset, badLabel, goodLabel }) {
  return (
    <div className="flex gap-2 flex-wrap mb-4">
      <button
        onClick={onBad}
        className="flex-1 min-w-[150px] px-3 py-2 rounded-lg border border-red-500/40 bg-red-500/10 text-red-300 text-sm hover:bg-red-500/20 transition-colors"
      >
        {badLabel}
      </button>
      <button
        onClick={onGood}
        className="flex-1 min-w-[150px] px-3 py-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-sm hover:bg-emerald-500/20 transition-colors"
      >
        {goodLabel}
      </button>
      <button
        onClick={onReset}
        className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-slate-400 text-sm hover:bg-white/10 transition-colors"
      >
        ↺
      </button>
    </div>
  )
}

function MsgBox({ children, type = 'info' }) {
  const styles = {
    info:    'bg-blue-500/10 border-blue-500/30 text-blue-300',
    success: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
    danger:  'bg-red-500/10 border-red-500/30 text-red-300',
    warning: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
  }
  return (
    <div className={`px-3 py-2.5 rounded-lg border text-sm text-center leading-relaxed ${styles[type]}`}>
      {children}
    </div>
  )
}

function MemBox({ value, index, state = 'empty', ghost = false }) {
  const slotStyle = {
    filled: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
    empty:  'border-white/12 bg-white/[0.03] text-slate-600 border-dashed',
    ghost:  'border-amber-500/50 bg-amber-500/10 text-amber-400 border-dashed',
    error:  'border-red-500/50 bg-red-500/15 text-red-300',
  }[state]

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-14 h-14 rounded-lg border flex items-center justify-center font-mono text-base font-semibold transition-all ${slotStyle}`}>
        {value}
      </div>
      <span className="text-[11px] font-mono text-slate-500">[{index}]</span>
    </div>
  )
}

function ValCard({ value, faded = false, overflow = false }) {
  return (
    <div className={`w-14 h-14 rounded-lg border flex items-center justify-center font-mono text-base font-semibold transition-all
      ${overflow ? 'border-red-500/60 bg-red-500/20 text-red-300 animate-pulse' :
        faded   ? 'border-white/10 bg-white/5 text-white/20 scale-90' :
                  'border-blue-500/40 bg-blue-500/10 text-blue-300'}`}>
      {value}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   ANIMATION 1 — int points sans crochets (eq1-no-size)
══════════════════════════════════════════════════════════ */
export function AnimNoSize() {
  const [scenario, setScenario] = useState(null)
  const [shownBoxes, setShownBoxes] = useState(0)

  useEffect(() => {
    if (scenario !== 'good') return
    if (shownBoxes >= 5) return
    const t = setTimeout(() => setShownBoxes(n => n + 1), 300)
    return () => clearTimeout(t)
  }, [scenario, shownBoxes])

  const reset = () => { setScenario(null); setShownBoxes(0) }

  return (
    <div className="p-4 space-y-4">
      <ScenarioBtns
        onBad={() => { setScenario('bad'); setShownBoxes(0) }}
        onGood={() => { setScenario('good'); setShownBoxes(0) }}
        onReset={reset}
        badLabel="✗ int points (erreur)"
        goodLabel="✓ int points[5] (correct)"
      />

      {/* Code display */}
      <div className="bg-[#0d1117] rounded-lg px-3 py-2.5 font-mono text-sm text-slate-400 min-h-[38px] flex items-center gap-1 flex-wrap">
        {!scenario && <span>← Choisis un scénario</span>}
        {scenario === 'bad' && (
          <>
            <span className="text-red-400 font-semibold">int points</span>
            <span className="text-slate-500">= {'{'}23, 17, 31, 8, 25{'}'};</span>
            <span className="text-red-400 text-xs ml-2">← pas de taille !</span>
          </>
        )}
        {scenario === 'good' && (
          <>
            <span className="text-red-400">int</span>
            <span className="text-white"> points</span>
            <span className="text-emerald-400 font-bold">[5]</span>
            <span className="text-slate-500">= {'{'}23, 17, 31, 8, 25{'}'};</span>
          </>
        )}
      </div>

      {/* Mémoire */}
      <div>
        <p className="text-xs text-slate-500 mb-2">Cases réservées en mémoire :</p>

        {scenario === 'bad' && (
          <div className="w-full px-4 py-3 rounded-lg border-2 border-dashed border-red-500/35 text-center">
            <p className="text-red-400 text-sm font-semibold mb-1">❓ Compilateur perdu</p>
            <p className="text-slate-400 text-xs">
              Sans <code className="bg-white/8 px-1 rounded">[5]</code>, il ne sait pas combien de cases réserver.
              <br />Résultat : <span className="text-red-400 font-medium">aucune mémoire allouée</span>
            </p>
          </div>
        )}

        {scenario === 'good' && (
          <div className="flex gap-2 flex-wrap min-h-[68px] items-end">
            {Array.from({ length: shownBoxes }, (_, i) => (
              <MemBox key={i} value={VALS[i]} index={i} state="filled" />
            ))}
            {shownBoxes < 5 && shownBoxes > 0 && (
              <div className="text-slate-500 text-sm self-center">...</div>
            )}
          </div>
        )}

        {!scenario && (
          <div className="min-h-[68px] flex items-center justify-center text-slate-600 text-sm">
            —
          </div>
        )}
      </div>

      {/* Message */}
      {scenario === 'bad' && (
        <MsgBox type="danger">
          🚫 Comme commander <strong>des billets de cinéma</strong> sans dire combien — le guichetier ne peut rien faire.
          La taille est obligatoire.
        </MsgBox>
      )}
      {scenario === 'good' && shownBoxes === 5 && (
        <MsgBox type="success">
          ✅ <strong>5 cases réservées</strong> — chaque valeur a son emplacement. Le [5] était le contrat avec le compilateur.
        </MsgBox>
      )}
      {scenario === 'good' && shownBoxes < 5 && (
        <MsgBox type="info">⏳ Réservation des cases en cours...</MsgBox>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   ANIMATION 2 — points[4] trop petit (eq1-size-too-small)
══════════════════════════════════════════════════════════ */
export function AnimSizeTooSmall() {
  const [scenario, setScenario] = useState(null)
  const [placed, setPlaced]     = useState([])   // valeurs placées
  const [overflowTried, setOverflowTried] = useState(false)

  const size = scenario === 'bad' ? 4 : 5
  const stepIdx = placed.length
  const allPlaced = scenario === 'good' && stepIdx === 5
  const overflowReady = scenario === 'bad' && stepIdx === 4 && !overflowTried
  const done = allPlaced || (scenario === 'bad' && overflowTried)

  function start(kind) {
    setScenario(kind)
    setPlaced([])
    setOverflowTried(false)
  }

  function handleStep() {
    if (done) return
    if (overflowReady) {
      setOverflowTried(true)
      return
    }
    if (stepIdx < size) {
      setPlaced(p => [...p, VALS[p.length]])
    }
  }

  // Message
  let msg = null, msgType = 'info'
  if (!scenario) {
    msg = 'Choisis un scénario pour commencer'
  } else if (allPlaced) {
    msg = '✅ 5 valeurs dans 5 cases — correspondance parfaite. Chaque valeur a sa place.'
    msgType = 'success'
  } else if (overflowTried) {
    msgType = 'danger'
    msg = `💥 Dépassement mémoire ! La valeur ${VALS[4]} écrase la mémoire voisine — bug grave et silencieux. Comme un 5ème œuf qui tombe hors de la boîte.`
  } else if (overflowReady) {
    msgType = 'danger'
    msg = `⚠️ Plus de cases ! La valeur ${VALS[4]} n'a nulle part où aller…`
  } else if (stepIdx === 0) {
    msg = `Clique sur ▶ Ranger ${VALS[0]} pour commencer`
  } else {
    msg = `✔ ${VALS[stepIdx - 1]} rangé dans [${stepIdx - 1}].${stepIdx < size ? ` Prochain : ${VALS[stepIdx]} → case [${stepIdx}]` : ''}`
  }

  const btnLabel = done ? '✓ Terminé'
    : overflowReady ? '▶ Essayer quand même'
    : stepIdx < size ? `▶ Ranger ${VALS[stepIdx]}`
    : '▶ Étape suivante'

  return (
    <div className="p-4 space-y-4">
      <ScenarioBtns
        onBad={() => start('bad')}
        onGood={() => start('good')}
        onReset={() => start(null) || setScenario(null)}
        badLabel="✗ points[4] (trop petit)"
        goodLabel="✓ points[5] (exact)"
      />

      {/* Code display */}
      <div className="bg-[#0d1117] rounded-lg px-3 py-2.5 font-mono text-sm text-slate-400 min-h-[38px] flex items-center gap-1 flex-wrap">
        {!scenario && <span>← Choisis un scénario</span>}
        {scenario && (
          <>
            <span className="text-red-400">int</span>
            <span className="text-white"> points</span>
            <span className={`font-bold ${scenario === 'bad' ? 'text-red-400' : 'text-emerald-400'}`}>
              [{size}]
            </span>
            <span className="text-slate-500"> = {'{'}23, 17, 31, 8, 25{'}'};</span>
          </>
        )}
      </div>

      {/* Valeurs */}
      {scenario && (
        <div>
          <p className="text-xs text-slate-500 mb-2">Les 5 valeurs à stocker :</p>
          <div className="flex gap-2 flex-wrap">
            {VALS.map((v, i) => (
              <ValCard
                key={i}
                value={v}
                faded={i < stepIdx && !(scenario === 'bad' && i >= size)}
                overflow={scenario === 'bad' && i >= size && overflowTried}
              />
            ))}
          </div>
        </div>
      )}

      {/* Cases */}
      {scenario && (
        <div>
          <p className="text-xs text-slate-500 mb-2">Cases du tableau :</p>
          <div className="flex gap-2 flex-wrap min-h-[68px] items-end">
            {Array.from({ length: size }, (_, i) => (
              <MemBox
                key={i}
                value={placed[i] ?? '?'}
                index={i}
                state={placed[i] !== undefined ? 'filled' : 'empty'}
              />
            ))}
          </div>
        </div>
      )}

      {/* Message */}
      {scenario && <MsgBox type={msgType}>{msg}</MsgBox>}

      {/* Bouton étape */}
      {scenario && (
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={handleStep}
            disabled={done}
            className={`px-7 py-2.5 rounded-lg border text-sm font-semibold transition-all
              ${done
                ? 'border-white/8 bg-white/5 text-slate-500 cursor-default'
                : 'border-blue-500/50 bg-blue-500/15 text-blue-300 hover:bg-blue-500/25 cursor-pointer'
              }`}
          >
            {btnLabel}
          </button>
          {scenario && (
            <span className="text-xs text-slate-500">
              {done && scenario === 'good' ? 'Toutes les valeurs sont à leur place !'
                : done ? 'Leçon : 5 valeurs = exactement 5 cases'
                : `${stepIdx} valeur(s) rangée(s) sur 5`}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   ANIMATION 3 — points[6] trop grand (eq1-size-too-large)
══════════════════════════════════════════════════════════ */
export function AnimSizeTooLarge() {
  const [scenario, setScenario]         = useState(null)
  const [shownBoxes, setShownBoxes]     = useState(0)
  const [ghostClicked, setGhostClicked] = useState(false)
  const [garbage, setGarbage]           = useState(null)

  const size = scenario === 'bad' ? 6 : 5
  const animDone = shownBoxes >= 5

  useEffect(() => {
    if (!scenario) return
    if (shownBoxes >= 5) return
    const t = setTimeout(() => setShownBoxes(n => n + 1), 300)
    return () => clearTimeout(t)
  }, [scenario, shownBoxes])

  function start(kind) {
    setScenario(kind)
    setShownBoxes(0)
    setGhostClicked(false)
    setGarbage(null)
  }

  function revealGhost() {
    const g = GARBAGE[Math.floor(Math.random() * GARBAGE.length)]
    setGarbage(g)
    setGhostClicked(true)
  }

  return (
    <div className="p-4 space-y-4">
      <ScenarioBtns
        onBad={() => start('bad')}
        onGood={() => start('good')}
        onReset={() => start(null) || setScenario(null)}
        badLabel="⚠ points[6] (trop grand)"
        goodLabel="✓ points[5] (exact)"
      />

      {/* Code display */}
      <div className="bg-[#0d1117] rounded-lg px-3 py-2.5 font-mono text-sm text-slate-400 min-h-[38px] flex items-center gap-1 flex-wrap">
        {!scenario && <span>← Choisis un scénario</span>}
        {scenario && (
          <>
            <span className="text-red-400">int</span>
            <span className="text-white"> points</span>
            <span className={`font-bold ${scenario === 'bad' ? 'text-amber-400' : 'text-emerald-400'}`}>
              [{size}]
            </span>
            <span className="text-slate-500"> = {'{'}23, 17, 31, 8, 25{'}'};</span>
            {scenario === 'bad' && <span className="text-amber-400 text-xs ml-2">← 6 cases pour 5 valeurs</span>}
          </>
        )}
      </div>

      {/* Cases */}
      {scenario && (
        <div>
          <p className="text-xs text-slate-500 mb-2">Cases du tableau en mémoire :</p>
          <div className="flex gap-2 flex-wrap min-h-[80px] items-end">
            {Array.from({ length: 5 }, (_, i) => (
              <MemBox
                key={i}
                value={i < shownBoxes ? VALS[i] : '?'}
                index={i}
                state={i < shownBoxes ? 'filled' : 'empty'}
              />
            ))}

            {/* Case fantôme — scénario bad uniquement */}
            {scenario === 'bad' && animDone && (
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={!ghostClicked ? revealGhost : undefined}
                  className={`w-14 h-14 rounded-lg border-2 border-dashed flex items-center justify-center font-mono text-base font-semibold transition-all
                    ${ghostClicked
                      ? 'border-red-500/50 bg-red-500/15 text-red-300 cursor-default'
                      : 'border-amber-500/50 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 cursor-pointer'
                    }`}
                  title={ghostClicked ? '' : 'Clique pour lire la case fantôme'}
                >
                  {ghostClicked ? garbage : '?'}
                </button>
                <span className="text-[11px] font-mono text-amber-500">[5]</span>
                <span className="text-[9px] text-amber-600">fantôme</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Messages */}
      {scenario === 'bad' && animDone && !ghostClicked && (
        <MsgBox type="warning">
          ⚠️ La case <strong>[5]</strong> existe en mémoire mais n'a pas été initialisée.
          <br />
          <span className="text-amber-200/70 text-xs">👆 Clique sur la case orange pour voir ce qu'elle contient</span>
        </MsgBox>
      )}
      {scenario === 'bad' && ghostClicked && (
        <MsgBox type="danger">
          💥 La case [5] contient <strong>{garbage}</strong> — une valeur qui traînait en mémoire avant ton programme.
          Imprévisible, non reproductible. C'est un <strong>bug silencieux</strong>.
        </MsgBox>
      )}
      {scenario === 'good' && animDone && (
        <MsgBox type="success">
          ✅ <strong>5 cases, 5 valeurs</strong> — aucune case fantôme, aucune valeur aléatoire. Tout est propre.
        </MsgBox>
      )}
      {scenario && !animDone && (
        <MsgBox type="info">⏳ Placement des valeurs...</MsgBox>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   ANIMATION 4 — mauvais indice (eq1-wrong-index)
══════════════════════════════════════════════════════════ */
export function AnimWrongIndex() {
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)

  function pick(idx) {
    if (answered && idx !== 3) return
    setSelected(idx)
    if (idx === 2) setAnswered(true)
    else if (idx === 3) setAnswered(true)
    else setTimeout(() => setSelected(null), 1200)
  }

  function reset() {
    setSelected(null)
    setAnswered(false)
  }

  const boxStyle = (idx) => {
    if (selected === idx) {
      if (idx === 2) return 'border-emerald-500/70 bg-emerald-500/20 text-emerald-300 scale-110'
      if (idx === 3) return 'border-red-500/60 bg-red-500/15 text-red-300'
      return 'border-red-500/50 bg-red-500/10 text-red-300'
    }
    if (answered && idx === 2 && selected === 3) return 'border-amber-500/60 bg-amber-500/10 text-amber-300'
    return 'border-white/10 bg-white/5 text-slate-300 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-300'
  }

  return (
    <div className="p-4 space-y-4">
      <p className="text-sm text-slate-400 leading-relaxed">
        Tu veux afficher le <strong className="text-white">3ème match</strong>.
        Clique sur la case qui te semble correcte :
      </p>

      {/* Rangs */}
      <div className="space-y-1">
        <div className="flex gap-2 justify-center flex-wrap mb-1">
          {['1er', '2ème', '3ème ← ?', '4ème', '5ème'].map((r, i) => (
            <div key={i} className={`w-14 text-center text-xs ${i === 2 ? 'text-white font-semibold' : 'text-slate-500'}`}>
              {r}
            </div>
          ))}
        </div>

        {/* Boîtes cliquables */}
        <div className="flex gap-2 justify-center flex-wrap">
          {VALS.map((v, i) => (
            <button
              key={i}
              onClick={() => pick(i)}
              className={`w-14 h-14 rounded-lg border flex items-center justify-center font-mono text-base font-semibold transition-all cursor-pointer ${boxStyle(i)}`}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Indices */}
        <div className="flex gap-2 justify-center flex-wrap mt-1">
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className="w-14 text-center text-[11px] font-mono text-slate-600">
              [{i}]
            </div>
          ))}
        </div>
      </div>

      {/* Code généré */}
      {selected !== null && (
        <div className="bg-[#0d1117] rounded-lg px-3 py-2.5 font-mono text-sm text-slate-400 flex items-center gap-1 flex-wrap">
          <span className="text-slate-500">printf(</span>
          <span className="text-amber-300">"%d"</span>
          <span className="text-slate-500">,</span>
          <span className="text-white"> points</span>
          <span className={`font-bold ${selected === 2 ? 'text-emerald-400' : 'text-red-400'}`}>
            [{selected}]
          </span>
          <span className="text-slate-500">);</span>
          <span className={`text-xs ml-2 ${selected === 2 ? 'text-emerald-400' : 'text-red-400'}`}>
            {selected === 2
              ? '// affiche 31 ✓ — le 3ème match'
              : `// affiche ${VALS[selected]} — le ${selected + 1}ème match !`}
          </span>
        </div>
      )}

      {/* Messages */}
      {selected === 2 && (
        <MsgBox type="success">
          ✅ <strong>points[2] = 31</strong> — c'est bien le 3ème match !<br />
          <span className="text-emerald-200/70 text-xs">Rang 3 → indice 3 − 1 = <strong>2</strong></span>
        </MsgBox>
      )}
      {selected === 3 && answered && (
        <MsgBox type="danger">
          ❌ <strong>points[3] = 8</strong> — c'est le <strong>4ème</strong> match, pas le 3ème !<br />
          <span className="text-red-200/70 text-xs">C ne te prévient pas. La case en orange est la bonne : points[2] = 31</span>
        </MsgBox>
      )}
      {selected !== null && selected !== 2 && selected !== 3 && (
        <MsgBox type="danger">
          ❌ points[{selected}] = {VALS[selected]} — c'est le {selected + 1}ème match. Essaie encore !
        </MsgBox>
      )}
      {selected === null && (
        <MsgBox type="info">Clique sur la case qui correspond au 3ème match...</MsgBox>
      )}

      {/* Formule — apparaît après bonne réponse */}
      {answered && (
        <div className="px-4 py-3 rounded-lg bg-violet-500/10 border border-violet-500/30 text-center">
          <p className="text-violet-300 text-sm font-semibold mb-1">📐 Règle universelle en C</p>
          <p className="text-white font-mono text-base font-bold">indice = rang − 1</p>
          <p className="text-violet-200/60 text-xs mt-1">
            3ème match → indice 2 &nbsp;|&nbsp; 1er match → indice 0 &nbsp;|&nbsp; 5ème match → indice 4
          </p>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={reset}
          className="px-4 py-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-400 text-xs hover:bg-white/10 transition-colors"
        >
          ↺ Réessayer
        </button>
      </div>
    </div>
  )
}
