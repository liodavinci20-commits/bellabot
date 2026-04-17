import { useState, useEffect } from 'react'

const VALS = [23, 17, 31, 8, 25]
const GARBAGE = [-847362, 9473, 32767, -1, 2049]

/* ─── Sous-composants partagés ─── */

function MsgBox({ children, type = 'info' }) {
  const s = {
    info:    'bg-blue-500/10 border-blue-500/30 text-blue-300',
    success: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
    danger:  'bg-red-500/10 border-red-500/30 text-red-300',
    warning: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
  }
  return (
    <div className={`px-3 py-2.5 rounded-lg border text-sm text-center leading-relaxed ${s[type]}`}>
      {children}
    </div>
  )
}

/* Boîte mémoire avec indice en dessous */
function Box({ value, index, state = 'empty', arrow = false, ghost = false, onClick, clickable = false }) {
  const slotStyle = {
    filled:  'border-blue-500/50 bg-blue-500/10 text-blue-200',
    empty:   'border-white/15 bg-white/[0.03] text-slate-600 border-dashed',
    ghost:   'border-amber-500/50 bg-amber-500/10 text-amber-300 border-dashed',
    danger:  'border-red-500/50 bg-red-500/15 text-red-300',
    success: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300',
  }[state] || 'border-white/15 bg-white/[0.03] text-slate-600 border-dashed'

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Flèche au-dessus */}
      <div className={`text-base transition-all duration-300 ${arrow ? 'text-blue-400 opacity-100' : 'opacity-0'}`}>
        ↓
      </div>
      <div
        onClick={clickable ? onClick : undefined}
        className={`w-14 h-14 rounded-lg border-2 flex items-center justify-center font-mono text-base font-semibold transition-all duration-200
          ${slotStyle}
          ${clickable ? 'cursor-pointer hover:border-blue-400/60 hover:scale-105' : ''}`}
      >
        {ghost && value === null ? '?' : value ?? '?'}
      </div>
      <span className={`text-[11px] font-mono ${arrow ? 'text-blue-400 font-bold' : 'text-slate-500'}`}>
        [{index}]
      </span>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   ANIMATION 1 — int points = [5] — crochets mal placés
══════════════════════════════════════════════════════════ */
export function AnimAV_BracketsPos() {
  const [view, setView] = useState('bad') // 'bad' | 'good'

  return (
    <div className="p-4 space-y-4">
      {/* Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setView('bad')}
          className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all
            ${view === 'bad'
              ? 'border-red-500/60 bg-red-500/15 text-red-300'
              : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'}`}
        >
          ✗ int points = [5]
        </button>
        <button
          onClick={() => setView('good')}
          className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all
            ${view === 'good'
              ? 'border-emerald-500/60 bg-emerald-500/15 text-emerald-300'
              : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'}`}
        >
          ✓ int points[5]
        </button>
      </div>

      {/* Schéma de la déclaration */}
      <div className="bg-[#0d1117] rounded-xl p-4">
        {view === 'bad' ? (
          <div className="space-y-3">
            <p className="text-xs text-slate-500 text-center">Déclaration invalide</p>
            <div className="flex items-center justify-center gap-1 font-mono text-sm flex-wrap">
              <span className="text-slate-400">int</span>
              <span className="text-white px-1.5 py-0.5 rounded bg-blue-500/15 border border-blue-500/30">points</span>
              <span className="text-red-400 font-bold px-1.5 py-0.5 rounded bg-red-500/15 border border-red-500/40">=</span>
              <span className="text-red-400 font-bold">[5]</span>
              <span className="text-slate-400">=</span>
              <span className="text-amber-300">{'{'} 23, 17… {'}'}</span>
              <span className="text-slate-400">;</span>
            </div>
            <div className="flex justify-center">
              <div className="text-center">
                <div className="text-red-400 text-lg">↑</div>
                <p className="text-red-400 text-xs">Le <code className="bg-red-500/10 px-1 rounded">=</code> ne précède pas les crochets de taille</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-slate-500 text-center">Déclaration correcte</p>
            <div className="flex items-center justify-center gap-1 font-mono text-sm flex-wrap">
              <span className="text-slate-400">int</span>
              <span className="text-white px-1.5 py-0.5 rounded bg-blue-500/15 border border-blue-500/30">points</span>
              <span className="text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30">[5]</span>
              <span className="text-slate-400">=</span>
              <span className="text-amber-300">{'{'} 23, 17… {'}'}</span>
              <span className="text-slate-400">;</span>
            </div>
            <div className="flex justify-center gap-8 text-xs mt-1">
              <div className="text-center">
                <div className="text-blue-400">↑</div>
                <span className="text-blue-400">nom</span>
              </div>
              <div className="text-center">
                <div className="text-emerald-400">↑</div>
                <span className="text-emerald-400">taille collée au nom</span>
              </div>
              <div className="text-center">
                <div className="text-amber-400">↑</div>
                <span className="text-amber-400">valeurs</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Règle mnémotechnique */}
      <div className="px-4 py-3 rounded-lg bg-white/[0.03] border border-white/8 flex items-center gap-3">
        <span className="text-2xl">🔗</span>
        <div>
          <p className="text-xs text-slate-400">Règle visuelle à retenir :</p>
          <p className="text-sm text-white font-mono mt-0.5">
            <span className="text-blue-300">points</span>
            <span className="text-emerald-400 font-bold">[5]</span>
            <span className="text-slate-500"> — crochets collés, toujours</span>
          </p>
          <p className="text-xs text-slate-500 mt-1">Dans la déclaration ET dans l'accès : <code className="text-slate-300">points[2]</code></p>
        </div>
      </div>

      {view === 'bad'
        ? <MsgBox type="danger">❌ Le compilateur refuse — les crochets doivent être <strong>collés au nom</strong>, pas après un <code>=</code></MsgBox>
        : <MsgBox type="success">✅ Les crochets sont collés à <strong>points</strong> — taille et nom forment un bloc inséparable</MsgBox>
      }
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   ANIMATION 2 — int points sans crochets
══════════════════════════════════════════════════════════ */
export function AnimAV_NoBrackets() {
  const [scenario, setScenario] = useState(null)
  const [arrow, setArrow] = useState(null)

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-2">
        <button onClick={() => { setScenario('bad'); setArrow(null) }}
          className={`flex-1 py-2 rounded-lg border text-sm transition-all ${scenario === 'bad' ? 'border-red-500/60 bg-red-500/15 text-red-300' : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'}`}>
          ✗ int points (sans crochets)
        </button>
        <button onClick={() => { setScenario('good'); setArrow(null) }}
          className={`flex-1 py-2 rounded-lg border text-sm transition-all ${scenario === 'good' ? 'border-emerald-500/60 bg-emerald-500/15 text-emerald-300' : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'}`}>
          ✓ int points[5]
        </button>
      </div>

      {/* Code */}
      {scenario && (
        <div className="bg-[#0d1117] rounded-lg px-3 py-2.5 font-mono text-sm flex items-center gap-1 flex-wrap">
          <span className="text-slate-400">int</span>
          <span className="text-white"> points</span>
          {scenario === 'good' && <span className="text-emerald-400 font-bold">[5]</span>}
          <span className="text-slate-500"> = {'{'} 23, 17, 31, 8, 25 {'}'};</span>
        </div>
      )}

      {/* Schéma mémoire */}
      {scenario === 'bad' && (
        <div className="space-y-2">
          <p className="text-xs text-slate-500">Schéma mémoire :</p>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-1">
              <div className="w-32 h-14 rounded-lg border-2 border-white/20 bg-white/[0.03] flex items-center justify-center font-mono text-sm text-slate-400">
                points
              </div>
              <span className="text-xs text-slate-500">1 seule case — pas d'indice</span>
            </div>
            <div className="text-slate-600 text-xs leading-relaxed">
              ← Pas de [0], [1], [2]…<br />La flèche n'a nulle part où pointer
            </div>
          </div>
        </div>
      )}

      {scenario === 'good' && (
        <div className="space-y-2">
          <p className="text-xs text-slate-500">
            {arrow === null ? 'Clique sur une case pour voir la flèche :' : `Flèche sur points[${arrow}] → valeur : ${VALS[arrow]}`}
          </p>
          <div className="flex gap-2 flex-wrap justify-center">
            {VALS.map((v, i) => (
              <Box
                key={i}
                value={v}
                index={i}
                state="filled"
                arrow={arrow === i}
                onClick={() => setArrow(i)}
                clickable
              />
            ))}
          </div>
          {arrow !== null && (
            <div className="bg-[#0d1117] rounded-lg px-3 py-2 font-mono text-sm text-center">
              <span className="text-slate-400">printf(</span>
              <span className="text-amber-300">"%d"</span>
              <span className="text-slate-400">, points</span>
              <span className="text-emerald-400 font-bold">[{arrow}]</span>
              <span className="text-slate-400">);</span>
              <span className="text-emerald-400 text-xs ml-2">→ {VALS[arrow]}</span>
            </div>
          )}
        </div>
      )}

      {!scenario && <MsgBox>Choisis un scénario pour voir le schéma mémoire</MsgBox>}
      {scenario === 'bad' && (
        <MsgBox type="danger">
          ❌ <strong>int points</strong> = une seule case sans indice.<br />
          <span className="text-xs">La flèche d'accès <code>points[i]</code> n'a aucune case numérotée à cibler.</span>
        </MsgBox>
      )}
      {scenario === 'good' && arrow === null && (
        <MsgBox type="info">👆 Clique sur une case pour voir la flèche d'accès en action</MsgBox>
      )}
      {scenario === 'good' && arrow !== null && (
        <MsgBox type="success">
          ✅ <strong>int points[5]</strong> crée 5 cases numérotées [0]→[4].<br />
          <span className="text-xs">La flèche peut cibler n'importe laquelle.</span>
        </MsgBox>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   ANIMATION 3 — Taille trop petite
══════════════════════════════════════════════════════════ */
export function AnimAV_SizeTooSmall() {
  const [scenario, setScenario] = useState(null)
  const [placed, setPlaced]     = useState([])
  const [overflowTried, setOverflowTried] = useState(false)

  const size = scenario === 'bad' ? 4 : 5
  const stepIdx = placed.length
  const allDone = scenario === 'good' && stepIdx === 5
  const overflowReady = scenario === 'bad' && stepIdx === 4
  const done = allDone || (scenario === 'bad' && overflowTried)

  function start(kind) {
    setScenario(kind)
    setPlaced([])
    setOverflowTried(false)
  }

  function handleStep() {
    if (done) return
    if (overflowReady && !overflowTried) { setOverflowTried(true); return }
    if (stepIdx < size) setPlaced(p => [...p, VALS[p.length]])
  }

  const btnLabel = done ? '✓ Terminé'
    : overflowReady ? '▶ Essayer de placer la 5ème valeur'
    : stepIdx < size ? `▶ Placer ${VALS[stepIdx]} dans [${stepIdx}]`
    : '▶ Étape suivante'

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-2">
        <button onClick={() => start('bad')}
          className={`flex-1 py-2 rounded-lg border text-sm transition-all ${scenario === 'bad' ? 'border-red-500/60 bg-red-500/15 text-red-300' : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'}`}>
          ✗ points[4] — schéma 4 cases
        </button>
        <button onClick={() => start('good')}
          className={`flex-1 py-2 rounded-lg border text-sm transition-all ${scenario === 'good' ? 'border-emerald-500/60 bg-emerald-500/15 text-emerald-300' : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'}`}>
          ✓ points[5] — schéma 5 cases
        </button>
      </div>

      {scenario && (
        <>
          {/* Code */}
          <div className="bg-[#0d1117] rounded-lg px-3 py-2.5 font-mono text-sm flex items-center gap-1 flex-wrap">
            <span className="text-slate-400">int</span>
            <span className="text-white"> points</span>
            <span className={`font-bold ${scenario === 'bad' ? 'text-red-400' : 'text-emerald-400'}`}>[{size}]</span>
            <span className="text-slate-500"> = {'{'} 23, 17, 31, 8, 25 {'}'};</span>
          </div>

          {/* Schéma — valeurs à placer */}
          <div>
            <p className="text-xs text-slate-500 mb-2">Valeurs à placer dans le schéma :</p>
            <div className="flex gap-2 flex-wrap">
              {VALS.map((v, i) => (
                <div key={i} className={`w-12 h-12 rounded-lg border flex items-center justify-center font-mono text-sm font-semibold transition-all
                  ${i < stepIdx && !(scenario === 'bad' && i >= size) ? 'border-white/10 bg-white/5 text-white/20 scale-90' :
                    scenario === 'bad' && i >= size && overflowTried ? 'border-red-500/60 bg-red-500/20 text-red-300 animate-pulse' :
                    'border-blue-500/40 bg-blue-500/10 text-blue-300'}`}>
                  {v}
                </div>
              ))}
            </div>
          </div>

          {/* Schéma — cases mémoire */}
          <div>
            <p className="text-xs text-slate-500 mb-2">Cases en mémoire :</p>
            <div className="flex gap-2 flex-wrap items-end">
              {Array.from({ length: size }, (_, i) => (
                <Box key={i} value={placed[i] ?? null} index={i}
                  state={placed[i] !== undefined ? 'success' : 'empty'} />
              ))}
              {/* Case manquante si trop petit */}
              {scenario === 'bad' && (
                <div className="flex flex-col items-center gap-1 opacity-40">
                  <div className="w-14 h-14 rounded-lg border-2 border-dashed border-red-500/40 flex items-center justify-center text-red-400 text-xs text-center leading-tight px-1">
                    case<br />manquante
                  </div>
                  <span className="text-[11px] font-mono text-red-500">[4]</span>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Message */}
      {!scenario && <MsgBox>Choisis un scénario pour voir le schéma</MsgBox>}
      {scenario === 'bad' && overflowTried && (
        <MsgBox type="danger">
          💥 La valeur <strong>25</strong> déborde — elle sort du schéma et écrase la mémoire voisine.<br />
          <span className="text-xs">Le C ne prévient pas. Bug silencieux.</span>
        </MsgBox>
      )}
      {scenario === 'bad' && overflowReady && !overflowTried && (
        <MsgBox type="danger">⚠️ Plus de cases dans le schéma — la valeur <strong>25</strong> n'a nulle part où aller.</MsgBox>
      )}
      {scenario === 'good' && allDone && (
        <MsgBox type="success">✅ Schéma exact — 5 cases pour 5 valeurs. La flèche peut pointer sur chacune.</MsgBox>
      )}
      {scenario && !done && !overflowReady && (
        <MsgBox type="info">Étape {stepIdx}/5 — {stepIdx < size ? `place ${VALS[stepIdx]} dans [${stepIdx}]` : 'schéma rempli'}</MsgBox>
      )}

      {scenario && (
        <div className="flex justify-center">
          <button
            onClick={handleStep}
            disabled={done}
            className={`px-6 py-2.5 rounded-lg border text-sm font-semibold transition-all
              ${done ? 'border-white/8 bg-white/5 text-slate-500 cursor-default'
                : 'border-blue-500/50 bg-blue-500/15 text-blue-300 hover:bg-blue-500/25 cursor-pointer'}`}
          >
            {btnLabel}
          </button>
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   ANIMATION 4 — Taille trop grande — case fantôme
══════════════════════════════════════════════════════════ */
export function AnimAV_SizeTooLarge() {
  const [scenario, setScenario]         = useState(null)
  const [shownBoxes, setShownBoxes]     = useState(0)
  const [ghostClicked, setGhostClicked] = useState(false)
  const [garbage, setGarbage]           = useState(null)
  const [arrowIdx, setArrowIdx]         = useState(null)

  useEffect(() => {
    if (!scenario) return
    if (shownBoxes >= 5) return
    const t = setTimeout(() => setShownBoxes(n => n + 1), 280)
    return () => clearTimeout(t)
  }, [scenario, shownBoxes])

  function start(kind) {
    setScenario(kind)
    setShownBoxes(0)
    setGhostClicked(false)
    setGarbage(null)
    setArrowIdx(null)
  }

  function revealGhost() {
    setGarbage(GARBAGE[Math.floor(Math.random() * GARBAGE.length)])
    setGhostClicked(true)
    setArrowIdx(5)
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-2">
        <button onClick={() => start('bad')}
          className={`flex-1 py-2 rounded-lg border text-sm transition-all ${scenario === 'bad' ? 'border-amber-500/60 bg-amber-500/15 text-amber-300' : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'}`}>
          ⚠ points[6] — case fantôme
        </button>
        <button onClick={() => start('good')}
          className={`flex-1 py-2 rounded-lg border text-sm transition-all ${scenario === 'good' ? 'border-emerald-500/60 bg-emerald-500/15 text-emerald-300' : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'}`}>
          ✓ points[5] — schéma exact
        </button>
      </div>

      {scenario && (
        <div className="bg-[#0d1117] rounded-lg px-3 py-2.5 font-mono text-sm flex items-center gap-1 flex-wrap">
          <span className="text-slate-400">int</span>
          <span className="text-white"> points</span>
          <span className={`font-bold ${scenario === 'bad' ? 'text-amber-400' : 'text-emerald-400'}`}>
            [{scenario === 'bad' ? 6 : 5}]
          </span>
          <span className="text-slate-500"> = {'{'} 23, 17, 31, 8, 25 {'}'};</span>
        </div>
      )}

      {scenario && (
        <div>
          <p className="text-xs text-slate-500 mb-2">Schéma mémoire — clique sur les cases :</p>
          <div className="flex gap-2 flex-wrap items-end">
            {Array.from({ length: 5 }, (_, i) => (
              <Box key={i}
                value={i < shownBoxes ? VALS[i] : null}
                index={i}
                state={i < shownBoxes ? 'filled' : 'empty'}
                arrow={arrowIdx === i}
                onClick={() => setArrowIdx(i)}
                clickable
              />
            ))}

            {scenario === 'bad' && shownBoxes >= 5 && (
              <div className="flex flex-col items-center gap-1">
                <div className={`text-base transition-all duration-300 ${arrowIdx === 5 ? 'text-red-400 opacity-100' : 'opacity-0'}`}>↓</div>
                <button
                  onClick={revealGhost}
                  className={`w-14 h-14 rounded-lg border-2 border-dashed flex items-center justify-center font-mono text-sm font-semibold transition-all
                    ${ghostClicked
                      ? 'border-red-500/60 bg-red-500/15 text-red-300 cursor-default'
                      : 'border-amber-500/50 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 cursor-pointer'}`}
                >
                  {ghostClicked ? garbage : '?'}
                </button>
                <span className={`text-[11px] font-mono ${arrowIdx === 5 ? 'text-red-400 font-bold' : 'text-amber-500'}`}>[5]</span>
                {!ghostClicked && <span className="text-[9px] text-amber-600">fantôme</span>}
              </div>
            )}
          </div>
        </div>
      )}

      {arrowIdx !== null && arrowIdx < 5 && (
        <div className="bg-[#0d1117] rounded-lg px-3 py-2 font-mono text-sm text-center">
          <span className="text-slate-400">points</span>
          <span className="text-emerald-400 font-bold">[{arrowIdx}]</span>
          <span className="text-emerald-400 ml-2">→ {VALS[arrowIdx]}</span>
          <span className="text-slate-500 text-xs ml-2">✓ case valide</span>
        </div>
      )}
      {arrowIdx === 5 && ghostClicked && (
        <div className="bg-[#0d1117] rounded-lg px-3 py-2 font-mono text-sm text-center">
          <span className="text-slate-400">points</span>
          <span className="text-red-400 font-bold">[5]</span>
          <span className="text-red-400 ml-2">→ {garbage}</span>
          <span className="text-red-400 text-xs ml-2">❌ valeur inconnue !</span>
        </div>
      )}

      {!scenario && <MsgBox>Choisis un scénario pour voir le schéma</MsgBox>}
      {scenario === 'bad' && !ghostClicked && shownBoxes >= 5 && (
        <MsgBox type="warning">⚠️ La case fantôme <strong>[5]</strong> existe en mémoire mais n'est pas dans le schéma.<br /><span className="text-xs">👆 Clique dessus pour voir ce qu'elle contient</span></MsgBox>
      )}
      {scenario === 'bad' && ghostClicked && (
        <MsgBox type="danger">💥 <strong>points[5] = {garbage}</strong> — valeur aléatoire héritée de la mémoire. Pas 0. Imprévisible.</MsgBox>
      )}
      {scenario === 'good' && shownBoxes >= 5 && (
        <MsgBox type="success">✅ Schéma exact — 5 cases, aucune case fantôme. Clique pour voir la flèche.</MsgBox>
      )}
      {scenario && shownBoxes < 5 && <MsgBox type="info">⏳ Chargement du schéma...</MsgBox>}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   ANIMATION 5 — Flèche hors limites (indice ≥ 5)
══════════════════════════════════════════════════════════ */
export function AnimAV_OutOfBounds() {
  const [selectedIdx, setSelectedIdx] = useState(null)

  const isValid = selectedIdx !== null && selectedIdx >= 0 && selectedIdx <= 4
  const isOutside = selectedIdx !== null && selectedIdx >= 5

  return (
    <div className="p-4 space-y-4">
      <p className="text-sm text-slate-400">
        Pour <code className="bg-white/8 px-1.5 py-0.5 rounded text-slate-300">int points[5]</code> — clique sur une case pour envoyer la flèche :
      </p>

      {/* Schéma mémoire + zone inconnue */}
      <div className="flex gap-2 flex-wrap items-end">
        {/* Cases valides [0]-[4] */}
        {VALS.map((v, i) => (
          <Box key={i} value={v} index={i}
            state={selectedIdx === i ? 'success' : 'filled'}
            arrow={selectedIdx === i}
            onClick={() => setSelectedIdx(i)}
            clickable
          />
        ))}

        {/* Séparateur */}
        <div className="flex flex-col items-center gap-1 self-end pb-5">
          <div className="w-px h-14 bg-red-500/40 border-l-2 border-dashed border-red-500/40" />
        </div>

        {/* Zone inconnue [5] */}
        <div className="flex flex-col items-center gap-1">
          <div className={`text-base transition-all duration-300 ${isOutside ? 'text-red-400 opacity-100' : 'opacity-0'}`}>↓</div>
          <button
            onClick={() => setSelectedIdx(5)}
            className={`w-16 h-14 rounded-lg border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer
              ${isOutside
                ? 'border-red-500/60 bg-red-500/15 text-red-300'
                : 'border-red-500/20 bg-red-500/5 text-red-500/50 hover:border-red-500/40'}`}
          >
            <span className="font-mono text-xs">???</span>
          </button>
          <span className={`text-[11px] font-mono ${isOutside ? 'text-red-400 font-bold' : 'text-red-500/40'}`}>[5]</span>
          <span className="text-[9px] text-red-500/40">hors limites</span>
        </div>
      </div>

      {/* Code généré */}
      {selectedIdx !== null && (
        <div className="bg-[#0d1117] rounded-lg px-3 py-2.5 font-mono text-sm flex items-center gap-1 flex-wrap">
          <span className="text-slate-400">printf(</span>
          <span className="text-amber-300">"%d"</span>
          <span className="text-slate-400">, points</span>
          <span className={`font-bold ${isValid ? 'text-emerald-400' : 'text-red-400'}`}>[{selectedIdx}]</span>
          <span className="text-slate-400">);</span>
          {isValid
            ? <span className="text-emerald-400 text-xs ml-2">→ {VALS[selectedIdx]} ✓</span>
            : <span className="text-red-400 text-xs ml-2">→ ??? valeur imprévisible ❌</span>
          }
        </div>
      )}

      {/* Messages */}
      {selectedIdx === null && (
        <MsgBox>👆 Clique sur une case pour voir où pointe la flèche</MsgBox>
      )}
      {isValid && (
        <MsgBox type="success">
          ✅ <strong>points[{selectedIdx}]</strong> = {VALS[selectedIdx]} — flèche dans les limites.<br />
          <span className="text-xs">Indices valides pour points[5] : [0] à [4]</span>
        </MsgBox>
      )}
      {isOutside && (
        <MsgBox type="danger">
          ❌ <strong>points[5]</strong> — la flèche sort du tableau !<br />
          <span className="text-xs">Dernier indice valide = taille − 1 = <strong>4</strong>. Jamais [5].</span>
        </MsgBox>
      )}

      <div className="flex justify-center">
        <button onClick={() => setSelectedIdx(null)}
          className="px-4 py-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-400 text-xs hover:bg-white/10 transition-colors">
          ↺ Reset
        </button>
      </div>
    </div>
  )
}
