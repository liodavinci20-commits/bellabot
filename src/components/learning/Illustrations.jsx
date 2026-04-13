// ─────────────────────────────────────────────────────────────
// Illustrations SVG pédagogiques pour la séance sur les tableaux
// ─────────────────────────────────────────────────────────────

/* ── Tableau en mémoire : cases numérotées ────────────────── */
export function ArrayBoxes({ values = [15, 12, 18, 10, 14], highlightIndex = null }) {
  const W = 64, H = 52, GAP = 4
  const total = values.length * (W + GAP) - GAP

  return (
    <div className="flex flex-col items-center gap-2 py-2">
      <svg width={total} height={H + 28} viewBox={`0 0 ${total} ${H + 28}`} className="overflow-visible max-w-full">
        {values.map((val, i) => {
          const x = i * (W + GAP)
          const isHL = highlightIndex === i
          return (
            <g key={i}>
              {/* Case */}
              <rect
                x={x} y={0} width={W} height={H}
                rx={8}
                fill={isHL ? 'rgba(59,130,246,0.25)' : 'rgba(255,255,255,0.05)'}
                stroke={isHL ? '#3b82f6' : 'rgba(255,255,255,0.12)'}
                strokeWidth={isHL ? 2 : 1}
              />
              {/* Valeur */}
              <text
                x={x + W / 2} y={H / 2 + 6}
                textAnchor="middle"
                fill={isHL ? '#60a5fa' : '#f0f4ff'}
                fontSize={20}
                fontFamily="Inter, monospace"
                fontWeight="600"
              >
                {val}
              </text>
              {/* Indice */}
              <text
                x={x + W / 2} y={H + 20}
                textAnchor="middle"
                fill="rgba(255,255,255,0.3)"
                fontSize={12}
                fontFamily="Inter, monospace"
              >
                [{i}]
              </text>
            </g>
          )
        })}
      </svg>
      <p className="text-xs text-white/30 text-center">
        {values.length} cases — indices de [0] à [{values.length - 1}]
      </p>
    </div>
  )
}

/* ── Problème : plusieurs variables vs un tableau ─────────── */
export function ProblemVars() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Mauvais côté */}
      <div className="rounded-xl border border-red-500/25 bg-red-500/5 p-4">
        <p className="text-xs font-semibold text-red-400 mb-3 uppercase tracking-wide">Sans tableau</p>
        <div className="flex flex-col gap-1.5">
          {['note1 ← 15', 'note2 ← 12', 'note3 ← 18', 'note4 ← 10', 'note5 ← 14'].map((line) => (
            <div key={line} className="px-3 py-1.5 rounded-lg bg-red-500/8 border border-red-500/15">
              <code className="text-xs text-red-300 font-mono">{line}</code>
            </div>
          ))}
          <p className="text-[10px] text-red-400/60 mt-1 text-center">5 variables séparées</p>
        </div>
      </div>
      {/* Bon côté */}
      <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4">
        <p className="text-xs font-semibold text-emerald-400 mb-3 uppercase tracking-wide">Avec tableau</p>
        <div className="flex flex-col gap-1.5">
          <div className="px-3 py-1.5 rounded-lg bg-emerald-500/8 border border-emerald-500/15">
            <code className="text-xs text-emerald-300 font-mono">notes : TABLEAU[5]</code>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-emerald-500/8 border border-emerald-500/15">
            <code className="text-xs text-emerald-300 font-mono">notes ← [15,12,18,10,14]</code>
          </div>
          <div className="mt-2">
            <ArrayBoxes values={[15, 12, 18, 10, 14]} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Déclaration : anatomie annotée ──────────────────────── */
export function DeclarationSchema() {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
      <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-5 text-center">
        Anatomie d'une déclaration de tableau
      </p>

      {/* Code annoté */}
      <div className="flex items-center justify-center mb-6">
        <code className="text-lg font-mono text-white/80 tracking-wide">
          <span className="text-blue-400">notes</span>
          {' '}:{' '}
          <span className="text-white/50">TABLEAU</span>
          {'['}
          <span className="text-emerald-400">5</span>
          {'] D\''}
          <span className="text-violet-400">ENTIERS</span>
        </code>
      </div>

      {/* Légende */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { color: 'blue',    label: 'Nom',    desc: 'Identifiant du tableau' },
          { color: 'emerald', label: 'Taille', desc: 'Nombre de cases' },
          { color: 'violet',  label: 'Type',   desc: 'Nature des valeurs' },
        ].map(({ color, label, desc }) => (
          <div key={label} className={`rounded-xl p-3 bg-${color}-500/8 border border-${color}-500/20 text-center`}>
            <div className={`w-6 h-6 rounded-full bg-${color}-500/20 flex items-center justify-center mx-auto mb-2`}>
              <div className={`w-2.5 h-2.5 rounded-full bg-${color}-400`} />
            </div>
            <p className={`text-xs font-bold text-${color}-400 mb-0.5`}>{label}</p>
            <p className="text-[10px] text-white/35">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Boucle : trace visuelle ──────────────────────────────── */
export function LoopTrace({ values = [15, 12, 18, 10, 14] }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
      <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4 text-center">
        Trace d'exécution — la boucle POUR avance case par case
      </p>

      <div className="flex flex-col gap-2">
        {values.map((val, i) => (
          <div key={i} className="flex items-center gap-3">
            {/* Tour */}
            <div className="w-14 shrink-0 text-right">
              <span className="text-xs text-white/25 font-mono">Tour {i + 1}</span>
            </div>
            {/* i = */}
            <div className="px-2.5 py-1 rounded-lg bg-blue-500/15 border border-blue-500/25 shrink-0">
              <code className="text-xs text-blue-400 font-mono">i = {i}</code>
            </div>
            {/* Flèche */}
            <div className="text-white/20 text-xs">→</div>
            {/* Case */}
            <div className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 shrink-0">
              <code className="text-xs text-white/60 font-mono">notes[{i}]</code>
            </div>
            {/* Flèche */}
            <div className="text-white/20 text-xs">→</div>
            {/* Valeur */}
            <div className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/25 shrink-0">
              <code className="text-xs text-emerald-400 font-mono">{val}</code>
            </div>
            {/* Action */}
            <div className="text-[11px] text-white/30 font-mono">AFFICHER({val})</div>
          </div>
        ))}

        {/* Fin */}
        <div className="flex items-center gap-3 mt-1 pt-2 border-t border-white/6">
          <div className="w-14 shrink-0 text-right">
            <span className="text-xs text-white/20 font-mono">Stop</span>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 shrink-0">
            <code className="text-xs text-red-400 font-mono">i = {values.length}</code>
          </div>
          <div className="text-white/20 text-xs">→</div>
          <div className="text-[11px] text-white/30">{values.length} &gt; {values.length - 1} → boucle terminée</div>
        </div>
      </div>
    </div>
  )
}

/* ── Accumulateur : remplissage visuel ───────────────────── */
export function AccumulatorDiagram({ values = [15, 12, 18, 10, 14] }) {
  let running = 0
  const steps = values.map((v, i) => {
    running += v
    return { i, val: v, total: running }
  })

  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
      <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4 text-center">
        Accumulateur — total grossit à chaque tour
      </p>

      <div className="flex flex-col gap-2">
        {/* Initialisation */}
        <div className="flex items-center gap-3">
          <div className="w-20 shrink-0 text-right">
            <span className="text-xs text-white/25 font-mono">Avant</span>
          </div>
          <code className="text-xs font-mono text-white/50">total ← 0</code>
          <div className="ml-auto px-3 py-1 rounded-lg bg-white/5 border border-white/10">
            <code className="text-xs text-white/40 font-mono">total = 0</code>
          </div>
        </div>

        {/* Chaque tour */}
        {steps.map(({ i, val, total }) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-20 shrink-0 text-right">
              <span className="text-xs text-white/25 font-mono">Tour {i + 1}</span>
            </div>
            <code className="text-xs font-mono text-white/50">
              total ← total + {val}
            </code>
            <div
              className="ml-auto px-3 py-1 rounded-lg border transition-all"
              style={{
                background: `rgba(59,130,246,${0.05 + (total / steps[steps.length-1].total) * 0.2})`,
                borderColor: `rgba(59,130,246,${0.1 + (total / steps[steps.length-1].total) * 0.3})`,
              }}
            >
              <code className="text-xs text-blue-300 font-mono font-bold">total = {total}</code>
            </div>
          </div>
        ))}

        {/* Résultat */}
        <div className="mt-2 pt-2 border-t border-white/6 text-center">
          <code className="text-sm font-mono font-bold text-blue-400">
            AFFICHER(total) → {steps[steps.length - 1].total}
          </code>
        </div>
      </div>
    </div>
  )
}

/* ── Problème C : variables séparées vs tableau ───────────── */
export function ProblemVarsC() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Sans tableau */}
      <div className="rounded-xl border border-red-500/25 bg-red-500/5 p-4">
        <p className="text-xs font-semibold text-red-400 mb-3 uppercase tracking-wide">Sans tableau</p>
        <div className="flex flex-col gap-1.5">
          {['int note1 = 12;', 'int note2 = 8;', 'int note3 = 15;', 'int note4 = 9;', 'int note5 = 14;'].map((line) => (
            <div key={line} className="px-3 py-1.5 rounded-lg bg-red-500/8 border border-red-500/15">
              <code className="text-xs text-red-300 font-mono">{line}</code>
            </div>
          ))}
          <p className="text-[10px] text-red-400/60 mt-1 text-center">5 variables — et si c'est 30 élèves ?</p>
        </div>
      </div>
      {/* Avec tableau */}
      <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4">
        <p className="text-xs font-semibold text-emerald-400 mb-3 uppercase tracking-wide">Avec tableau</p>
        <div className="flex flex-col gap-1.5">
          <div className="px-3 py-1.5 rounded-lg bg-emerald-500/8 border border-emerald-500/15">
            <code className="text-xs text-emerald-300 font-mono">int notes[5] =</code>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-emerald-500/8 border border-emerald-500/15">
            <code className="text-xs text-emerald-300 font-mono">{'  {12, 8, 15, 9, 14};'}</code>
          </div>
          <div className="mt-2">
            <ArrayBoxes values={[12, 8, 15, 9, 14]} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Flèche animée sur une case précise (profil Visuel) ───── */
export function ArrayAccessC({ values = [12, 8, 15, 9, 14], targetIndex = 2 }) {
  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <p className="text-xs font-semibold text-white/30 uppercase tracking-wider">
        Accès à la case [{targetIndex}]
      </p>

      {/* Cases + flèche animée */}
      <div className="flex gap-2">
        {values.map((val, i) => {
          const isTarget = i === targetIndex
          return (
            <div key={i} className="flex flex-col items-center">
              {/* Flèche et label animés */}
              <div className="h-9 flex flex-col items-center justify-end mb-1">
                {isTarget ? (
                  <div className="flex flex-col items-center animate-arrow-bounce">
                    <code className="text-[10px] text-red-400 font-mono font-bold whitespace-nowrap">
                      notes[{i}]
                    </code>
                    <span className="text-red-400 text-sm leading-none">↓</span>
                  </div>
                ) : null}
              </div>

              {/* Case */}
              <div
                className={`flex items-center justify-center rounded-xl text-base font-bold font-mono transition-all ${
                  isTarget
                    ? 'bg-red-500/20 border-2 border-red-400 text-red-200 animate-cell-pulse shadow-lg shadow-red-500/25'
                    : 'bg-white/[0.04] border border-white/10 text-white/50'
                }`}
                style={{ width: 52, height: 48 }}
              >
                {val}
              </div>

              {/* Indice */}
              <div className="text-[10px] text-white/25 font-mono mt-1.5">[{i}]</div>
            </div>
          )
        })}
      </div>

      {/* Résultat */}
      <div className="px-4 py-2.5 rounded-xl bg-red-500/8 border border-red-500/20
        flex items-center gap-2 animate-scale-in" style={{ animationDelay: '0.3s' }}>
        <code className="text-sm font-mono">
          <span className="text-white/40">printf(</span>
          <span className="text-emerald-400">"%d"</span>
          <span className="text-white/40">, </span>
          <span className="text-red-400 font-bold">notes[{targetIndex}]</span>
          <span className="text-white/40">);</span>
        </code>
        <span className="text-white/25 mx-1">→</span>
        <span className="text-red-300 font-bold text-lg font-mono">{values[targetIndex]}</span>
      </div>
    </div>
  )
}

/* ── Avant / Après une modification (profil Visuel) ─────── */
export function ArrayBeforeAfterC({
  before      = [12, 8, 15, 9, 14],
  after       = [12, 20, 15, 9, 14],
  changedIndex = 1,
  instruction  = 'notes[1] = 20;',
}) {
  const MiniBox = ({ val, index, highlight, color }) => (
    <div className="flex flex-col items-center">
      <div
        className={`flex items-center justify-center rounded-lg text-sm font-bold font-mono transition-all ${
          highlight
            ? color === 'red'
              ? 'bg-amber-500/15 border-2 border-amber-400/70 text-amber-300'
              : 'bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 animate-cell-pulse shadow-md shadow-emerald-500/20'
            : 'bg-white/[0.04] border border-white/10 text-white/50'
        }`}
        style={{ width: 44, height: 40 }}
      >
        {val}
      </div>
      <div className="text-[10px] text-white/20 font-mono mt-1">[{index}]</div>
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Avant */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-white/30 uppercase tracking-wider text-center">Avant</p>
          <div className="flex gap-1 justify-center">
            {before.map((val, i) => (
              <MiniBox key={i} val={val} index={i} highlight={i === changedIndex} color="red" />
            ))}
          </div>
        </div>
        {/* Après */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-emerald-400/60 uppercase tracking-wider text-center">Après</p>
          <div className="flex gap-1 justify-center">
            {after.map((val, i) => (
              <MiniBox key={i} val={val} index={i} highlight={i === changedIndex} color="green" />
            ))}
          </div>
        </div>
      </div>

      {/* Instruction responsable */}
      <div className="flex items-center justify-center gap-2">
        <div className="h-px flex-1 bg-white/8 max-w-14" />
        <div className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10">
          <code className="text-xs text-emerald-300 font-mono font-bold">{instruction}</code>
        </div>
        <div className="h-px flex-1 bg-white/8 max-w-14" />
      </div>
      <p className="text-[10px] text-white/22 text-center">
        Seule la case [{changedIndex}] a changé — les autres restent intactes.
      </p>
    </div>
  )
}

/* ── Trace de boucle for animée en C (profil Visuel) ─────── */
export function LoopTraceC({ values = [12, 8, 15, 9, 14] }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
      <p className="text-xs font-semibold text-white/35 uppercase tracking-wider mb-4 text-center">
        La boucle for — la flèche avance case par case
      </p>

      <div className="flex flex-col gap-2">
        {values.map((val, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 animate-fade-row"
            style={{ animationDelay: `${i * 200}ms` }}
          >
            <div className="w-14 shrink-0 text-right">
              <span className="text-xs text-white/25 font-mono">Tour {i + 1}</span>
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-blue-500/15 border border-blue-500/25 shrink-0">
              <code className="text-xs text-blue-400 font-mono">i = {i}</code>
            </div>
            <span className="text-white/20 text-xs">→</span>
            <div className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 shrink-0">
              <code className="text-xs text-white/55 font-mono">notes[{i}]</code>
            </div>
            <span className="text-white/20 text-xs">→</span>
            <div className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/25 shrink-0">
              <code className="text-xs text-emerald-400 font-mono">{val}</code>
            </div>
            <span className="text-[11px] text-white/25 font-mono hidden sm:block">printf({val})</span>
          </div>
        ))}

        {/* Stop */}
        <div
          className="flex items-center gap-2.5 mt-1 pt-2 border-t border-white/6 animate-fade-row"
          style={{ animationDelay: `${values.length * 200}ms` }}
        >
          <div className="w-14 shrink-0 text-right">
            <span className="text-xs text-white/20 font-mono">Stop</span>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 shrink-0">
            <code className="text-xs text-red-400 font-mono">i = {values.length}</code>
          </div>
          <span className="text-white/20 text-xs">→</span>
          <span className="text-[11px] text-white/25">
            {values.length} &lt; {values.length} est <strong className="text-red-400">FAUX</strong> → boucle terminée
          </span>
        </div>
      </div>
    </div>
  )
}

/* ── Déclaration annotée — cases vides + anatomie du code (Visuel+Séquentiel) */
export function AnnotatedDeclarationC() {
  return (
    <div className="space-y-4">

      {/* Cases vides — l'espace réservé */}
      <div className="flex flex-col items-center gap-1.5">
        <p className="text-[10px] text-white/25 uppercase tracking-wider">
          int notes[5]; → 5 cases vides réservées en mémoire
        </p>
        <div className="flex gap-[4px]">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-14 h-12 rounded-lg border border-white/15 bg-white/[0.03]
                flex items-center justify-center">
                <span className="text-white/12 text-xl font-mono">?</span>
              </div>
              <span className="text-[10px] text-white/20 font-mono mt-1">[{i}]</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-blue-400/50 font-mono">notes</p>
      </div>

      {/* Anatomie du code */}
      <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
        <p className="text-[10px] text-white/30 uppercase tracking-wider mb-3 text-center">
          Voici la syntaxe — chaque mot a un rôle précis
        </p>

        {/* Code coloré */}
        <div className="flex items-center justify-center gap-0 font-mono text-sm mb-4 flex-wrap">
          <span className="px-2 py-1 rounded-l-lg bg-blue-500/15 text-blue-300 border border-blue-500/25 border-r-0">int</span>
          <span className="px-2 py-1 bg-emerald-500/15 text-emerald-300 border-y border-emerald-500/25">notes</span>
          <span className="px-2 py-1 bg-amber-500/15 text-amber-300 border border-amber-500/25 border-l-0 rounded-r-lg">[5]</span>
          <span className="text-white/30 ml-1 font-mono">;</span>
        </div>

        {/* Légende */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2.5 rounded-lg bg-blue-500/8 border border-blue-500/20">
            <code className="text-xs font-bold text-blue-400">int</code>
            <p className="text-[10px] text-white/40 mt-1 leading-snug">Type des valeurs</p>
            <p className="text-[9px] text-white/20 mt-0.5">entier = integer</p>
          </div>
          <div className="text-center p-2.5 rounded-lg bg-emerald-500/8 border border-emerald-500/20">
            <code className="text-xs font-bold text-emerald-400">notes</code>
            <p className="text-[10px] text-white/40 mt-1 leading-snug">Nom du tableau</p>
            <p className="text-[9px] text-white/20 mt-0.5">choisi par toi</p>
          </div>
          <div className="text-center p-2.5 rounded-lg bg-amber-500/8 border border-amber-500/20">
            <code className="text-xs font-bold text-amber-400">[5]</code>
            <p className="text-[10px] text-white/40 mt-1 leading-snug">Nombre de cases</p>
            <p className="text-[9px] text-white/20 mt-0.5">fixé pour toujours</p>
          </div>
        </div>
      </div>

      {/* Cases remplies */}
      <div className="flex flex-col items-center gap-1.5">
        <p className="text-[10px] text-white/25 uppercase tracking-wider">
          Après initialisation → les cases ont des valeurs
        </p>
        <div className="flex gap-[4px]">
          {[12, 8, 15, 9, 14].map((val, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-14 h-12 rounded-lg border border-emerald-500/30
                bg-emerald-500/8 flex items-center justify-center
                animate-fade-row" style={{ animationDelay: `${i * 120}ms` }}>
                <span className="text-emerald-300 text-base font-bold font-mono">{val}</span>
              </div>
              <span className="text-[10px] text-white/20 font-mono mt-1">[{i}]</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-emerald-400/50 font-mono">notes</p>
      </div>
    </div>
  )
}

/* ── Min / Max mis en évidence (Visuel+Séquentiel) ────────── */
export function MinMaxHighlightC({ values = [12, 8, 15, 9, 14] }) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const minIdx = values.indexOf(min)
  const maxIdx = values.indexOf(max)

  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold text-white/30 uppercase tracking-wider text-center">
        Schéma — repérer le minimum et le maximum
      </p>

      <div className="flex justify-center gap-2">
        {values.map((val, i) => {
          const isMax = i === maxIdx
          const isMin = i === minIdx
          return (
            <div key={i} className="flex flex-col items-center">
              {/* Label au-dessus */}
              <div className="h-6 flex items-end justify-center mb-1">
                {isMax && <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wide">MAX</span>}
                {isMin && <span className="text-[9px] font-bold text-red-400 uppercase tracking-wide">MIN</span>}
              </div>

              {/* Case */}
              <div
                className={`flex items-center justify-center rounded-xl text-sm font-bold font-mono ${
                  isMax
                    ? 'bg-emerald-500/20 border-2 border-emerald-400 text-emerald-200 animate-cell-pulse shadow-md shadow-emerald-500/20'
                    : isMin
                    ? 'bg-red-500/15 border-2 border-red-400/70 text-red-300'
                    : 'bg-white/[0.04] border border-white/10 text-white/45'
                }`}
                style={{ width: 50, height: 46 }}
              >
                {val}
              </div>

              <div className="text-[10px] text-white/20 font-mono mt-1">[{i}]</div>
            </div>
          )
        })}
      </div>

      {/* Résumé min/max */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl bg-red-500/8 border border-red-500/20 text-center">
          <p className="text-[10px] text-red-400/60 uppercase tracking-wide mb-1">Minimum</p>
          <code className="text-base font-mono text-red-300 font-bold">{min}</code>
          <p className="text-[10px] text-white/25 mt-0.5">indice [{minIdx}]</p>
        </div>
        <div className="p-3 rounded-xl bg-emerald-500/8 border border-emerald-500/20 text-center">
          <p className="text-[10px] text-emerald-400/60 uppercase tracking-wide mb-1">Maximum</p>
          <code className="text-base font-mono text-emerald-300 font-bold">{max}</code>
          <p className="text-[10px] text-white/25 mt-0.5">indice [{maxIdx}]</p>
        </div>
      </div>

      <p className="text-[10px] text-white/20 text-center leading-relaxed">
        L'algorithme parcourt chaque case et compare — il ne "voit" qu'une case à la fois.
      </p>
    </div>
  )
}

/* ── Carte mentale des tableaux (Visuel + Intuitif) ─────── */
export function MindMapTableaux() {
  const cx = 260, cy = 172, cr = 45

  const nodes = [
    { label: 'Déclaration', code: 'int tab[5]',        nx: 88,  ny: 60,  stroke: '#60a5fa', bg: 'rgba(96,165,250,0.13)',  tc: '#93c5fd' },
    { label: 'Accès',       code: 'tab[i]',             nx: 432, ny: 60,  stroke: '#34d399', bg: 'rgba(52,211,153,0.13)',  tc: '#6ee7b7' },
    { label: 'Modification',code: 'tab[i] = val',       nx: 448, ny: 228, stroke: '#fbbf24', bg: 'rgba(251,191,36,0.13)',  tc: '#fcd34d' },
    { label: 'Parcours',    code: 'for(i=0; i<5; i++)',  nx: 260, ny: 318, stroke: '#a78bfa', bg: 'rgba(167,139,250,0.13)', tc: '#c4b5fd' },
    { label: 'Recherche',   code: 'min / max',          nx: 72,  ny: 228, stroke: '#f87171', bg: 'rgba(248,113,113,0.13)', tc: '#fca5a5' },
  ]

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-1">
        Carte mentale — toutes les opérations sur les tableaux
      </p>
      <svg width="520" height="368" viewBox="0 0 520 368"
        style={{ width: '100%', maxWidth: 520, height: 'auto' }}>

        {/* Lignes d'abord (derrière les nœuds) */}
        {nodes.map((n, i) => (
          <line key={i}
            x1={cx} y1={cy} x2={n.nx} y2={n.ny}
            stroke={n.stroke} strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="5 4"
          />
        ))}

        {/* Nœud central */}
        <circle cx={cx} cy={cy} r={cr}
          fill="rgba(59,130,246,0.14)" stroke="#3b82f6" strokeWidth="1.5" />
        <text x={cx} y={cy - 7} textAnchor="middle"
          fill="#60a5fa" fontSize="14" fontWeight="700" fontFamily="Inter,system-ui,sans-serif">Tableau</text>
        <text x={cx} y={cy + 11} textAnchor="middle"
          fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="monospace">int notes[5]</text>

        {/* Nœuds branches */}
        {nodes.map((n, i) => (
          <g key={`n${i}`}>
            <rect x={n.nx - 64} y={n.ny - 26} width={128} height={52} rx="10"
              fill={n.bg} stroke={n.stroke} strokeWidth="1" strokeOpacity="0.55" />
            <text x={n.nx} y={n.ny - 8} textAnchor="middle"
              fill={n.tc} fontSize="11" fontWeight="700" fontFamily="Inter,system-ui,sans-serif">{n.label}</text>
            <text x={n.nx} y={n.ny + 10} textAnchor="middle"
              fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="monospace">{n.code}</text>
          </g>
        ))}
      </svg>
      <p className="text-[10px] text-white/20 text-center mt-1">
        Clique sur n'importe quelle étape dans la sidebar pour explorer dans l'ordre qui te convient.
      </p>
    </div>
  )
}

/* ── Hiérarchie des structures de données C (Visuel+Intuitif) */
export function DataHierarchyC() {
  return (
    <div className="space-y-3 py-1">
      <p className="text-xs font-semibold text-white/30 uppercase tracking-wider text-center">
        La place des tableaux dans l'écosystème C
      </p>

      {/* Niveau 3 — avancé */}
      <div className="flex justify-center">
        <div className="px-5 py-2.5 rounded-xl border border-violet-500/25 bg-violet-500/8 text-center">
          <p className="text-xs font-semibold text-violet-300">Structures avancées</p>
          <p className="text-[10px] text-white/25 mt-0.5">listes chaînées · arbres · graphes</p>
          <span className="text-[9px] text-violet-400/50 border border-violet-400/20 rounded-full px-2 py-px mt-1 inline-block">
            à venir plus tard
          </span>
        </div>
      </div>

      {/* Connecteur */}
      <div className="flex flex-col items-center">
        <div className="w-px h-3 bg-white/15" />
        <span className="text-[9px] text-white/20 leading-none py-0.5">bâties sur</span>
        <div className="w-px h-3 bg-white/15" />
      </div>

      {/* Niveau 2 — structures dérivées */}
      <div className="flex gap-2 justify-center flex-wrap">
        <div className="px-3 py-2 rounded-xl border border-blue-500/25 bg-blue-500/8 text-center min-w-[100px]">
          <p className="text-xs font-semibold text-blue-300">Matrices</p>
          <code className="text-[9px] text-white/35 font-mono block">int m[3][4]</code>
          <p className="text-[9px] text-white/20 mt-0.5">tableau de tableaux</p>
          <span className="text-[9px] text-blue-400/40 border border-blue-400/15 rounded-full px-1.5 py-px mt-1 inline-block">bientôt</span>
        </div>
        <div className="px-3 py-2 rounded-xl border border-emerald-500/25 bg-emerald-500/8 text-center min-w-[100px]">
          <p className="text-xs font-semibold text-emerald-300">Chaînes</p>
          <code className="text-[9px] text-white/35 font-mono block">char s[50]</code>
          <p className="text-[9px] text-white/20 mt-0.5">tableau de caractères</p>
          <span className="text-[9px] text-emerald-400/40 border border-emerald-400/15 rounded-full px-1.5 py-px mt-1 inline-block">bientôt</span>
        </div>
        <div className="px-3 py-2 rounded-xl border border-amber-500/25 bg-amber-500/8 text-center min-w-[100px]">
          <p className="text-xs font-semibold text-amber-300">Buffers</p>
          <code className="text-[9px] text-white/35 font-mono block">char b[256]</code>
          <p className="text-[9px] text-white/20 mt-0.5">bloc mémoire brut</p>
          <span className="text-[9px] text-amber-400/40 border border-amber-400/15 rounded-full px-1.5 py-px mt-1 inline-block">bientôt</span>
        </div>
      </div>

      {/* Connecteur */}
      <div className="flex flex-col items-center">
        <div className="w-px h-3 bg-white/15" />
        <span className="text-[9px] text-white/20 leading-none py-0.5">basées sur</span>
        <div className="w-px h-3 bg-white/15" />
      </div>

      {/* Niveau 1 — fondation */}
      <div className="flex justify-center">
        <div className="px-6 py-3 rounded-xl border-2 border-blue-400/40 bg-blue-500/12 text-center max-w-xs w-full">
          <p className="text-sm font-bold text-blue-300 mb-1">Tableaux — tu es ici</p>
          <code className="text-sm font-mono text-blue-400">int notes[5]</code>
          <p className="text-[10px] text-white/25 mt-1.5 leading-relaxed">
            La fondation de toutes les structures de données séquentielles en C
          </p>
        </div>
      </div>

      {/* Pointeurs — lien futur */}
      <div className="flex gap-1.5 flex-wrap justify-center mt-1">
        {['Pointeurs (prochaine leçon)', 'Récursivité', 'Allocations dynamiques'].map(tag => (
          <span key={tag} className="text-[9px] text-white/18 border border-white/8 rounded-full px-2 py-px">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Vue d'ensemble syntaxe 4 lignes (Visuel+Intuitif) ────── */
export function SyntaxOverviewC() {
  const lines = [
    {
      num: 1, label: 'Déclaration + initialisation',
      code: 'int notes[5] = {12, 8, 15, 9, 14};',
      comment: 'Crée 5 cases et les remplit dans l\'ordre',
      delay: '0ms',
      numCls: 'text-blue-400 bg-blue-500/15 border-blue-500/25',
      lblCls: 'text-blue-400',
      rowCls: 'border-blue-500/18 bg-blue-500/5',
    },
    {
      num: 2, label: 'Accès — lire une case',
      code: 'printf("%d", notes[2]);  // → affiche 15',
      comment: 'L\'indice 2 désigne la 3ème case (on part de 0)',
      delay: '140ms',
      numCls: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/25',
      lblCls: 'text-emerald-400',
      rowCls: 'border-emerald-500/18 bg-emerald-500/5',
    },
    {
      num: 3, label: 'Modification — écrire dans une case',
      code: 'notes[1] = 20;  // case 1 passe de 8 à 20',
      comment: 'Seule cette case change, les autres restent intactes',
      delay: '280ms',
      numCls: 'text-amber-400 bg-amber-500/15 border-amber-500/25',
      lblCls: 'text-amber-400',
      rowCls: 'border-amber-500/18 bg-amber-500/5',
    },
    {
      num: 4, label: 'Parcours — visiter toutes les cases',
      code: 'for(int i = 0; i < 5; i++) { printf("%d", notes[i]); }',
      comment: 'i joue le rôle d\'un curseur qui avance de [0] à [4]',
      delay: '420ms',
      numCls: 'text-violet-400 bg-violet-500/15 border-violet-500/25',
      lblCls: 'text-violet-400',
      rowCls: 'border-violet-500/18 bg-violet-500/5',
    },
  ]

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-white/30 uppercase tracking-wider text-center mb-3">
        Voici la syntaxe — 4 lignes résument tout
      </p>
      {lines.map((line) => (
        <div
          key={line.num}
          className={`flex gap-3 items-start p-3 rounded-xl border animate-fade-row ${line.rowCls}`}
          style={{ animationDelay: line.delay }}
        >
          <div className={`shrink-0 w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${line.numCls}`}>
            {line.num}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-[10px] font-semibold uppercase tracking-wide mb-0.5 ${line.lblCls}`}>{line.label}</p>
            <code className="text-xs text-white/65 font-mono block leading-relaxed">{line.code}</code>
            <p className="text-[10px] text-white/30 mt-0.5 leading-relaxed">{line.comment}</p>
          </div>
        </div>
      ))}
      <p className="text-[10px] text-white/18 text-center mt-2 italic">
        Tu peux déjà déduire la logique de chacune — la suite confirme tes intuitions.
      </p>
    </div>
  )
}

/* ── Sélecteur d'illustration par type ───────────────────── */
export function Illustration({ type, profile }) {
  switch (type) {
    case 'problem-vars':         return <ProblemVars />
    case 'problem-vars-c':       return <ProblemVarsC />
    case 'array-access-c':       return <ArrayAccessC values={[12, 8, 15, 9, 14]} targetIndex={2} />
    case 'array-access-last':    return <ArrayAccessC values={[12, 8, 15, 9, 14]} targetIndex={4} />
    case 'array-before-after-c': return <ArrayBeforeAfterC />
    case 'loop-trace-c':         return <LoopTraceC values={[12, 8, 15, 9, 14]} />
    case 'array-boxes':          return <ArrayBoxes values={[15, 12, 18, 10, 14]} />
    case 'array-intro':          return <ArrayBoxes values={[15, 12, 18, 10, 14]} />
    case 'declaration-schema':   return <DeclarationSchema />
    case 'loop-trace':           return <LoopTrace values={[15, 12, 18, 10, 14]} />
    case 'accumulator':          return <AccumulatorDiagram values={[15, 12, 18, 10, 14]} />
    case 'mind-map-tableaux':       return <MindMapTableaux />
    case 'data-hierarchy-c':        return <DataHierarchyC />
    case 'syntax-overview-c':       return <SyntaxOverviewC />
    case 'annotated-declaration-c': return <AnnotatedDeclarationC />
    case 'min-max-c':               return <MinMaxHighlightC values={[12, 8, 15, 9, 14]} />
    default:                        return null
  }
}
