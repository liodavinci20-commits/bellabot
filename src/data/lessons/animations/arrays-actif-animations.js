/* ─────────────────────────────────────────────────────────────
   Animations pédagogiques — Profil Actif · Sensoriel
   Leçon : Les tableaux en C (exercice basket points[5])
   Une animation par erreur détectée à l'Étape 1
──────────────────────────────────────────────────────────────── */

/* ── E1 : int points sans crochets ───────────────────────────── */
export const ANIM_NO_SIZE = `
<div id="a1-root" style="font-family:system-ui,sans-serif;color:#e2e8f0;padding:16px;">

  <div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap;">
    <button id="a1-bad" style="flex:1;min-width:160px;padding:8px 12px;border-radius:8px;border:1px solid rgba(239,68,68,0.4);background:rgba(239,68,68,0.1);color:#fca5a5;cursor:pointer;font-size:13px;">✗ int points (ton code)</button>
    <button id="a1-good" style="flex:1;min-width:160px;padding:8px 12px;border-radius:8px;border:1px solid rgba(16,185,129,0.4);background:rgba(16,185,129,0.1);color:#6ee7b7;cursor:pointer;font-size:13px;">✓ int points[5] (correct)</button>
    <button id="a1-reset" style="padding:8px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:#94a3b8;cursor:pointer;font-size:13px;">↺</button>
  </div>

  <div id="a1-code" style="background:#0d1117;border-radius:8px;padding:10px 14px;font-family:monospace;font-size:13px;margin-bottom:14px;color:#94a3b8;min-height:22px;">
    ← Choisis un scénario
  </div>

  <p style="font-size:12px;color:#64748b;margin:0 0 8px;">Cases réservées en mémoire :</p>
  <div id="a1-mem" style="display:flex;gap:8px;flex-wrap:wrap;min-height:78px;align-items:center;padding:4px 0;"></div>

  <div id="a1-msg" style="margin-top:12px;min-height:44px;display:flex;align-items:center;justify-content:center;">
    <span style="font-size:13px;color:#475569;">En attente...</span>
  </div>
</div>

<script>
(function() {
  var r = document.getElementById('a1-root');
  var mem = r.querySelector('#a1-mem');
  var code = r.querySelector('#a1-code');
  var msg = r.querySelector('#a1-msg');

  function setMsg(html, type) {
    var c = {
      danger:  ['rgba(239,68,68,0.1)',  'rgba(239,68,68,0.3)',  '#fca5a5'],
      success: ['rgba(16,185,129,0.1)', 'rgba(16,185,129,0.3)', '#6ee7b7'],
      info:    ['rgba(59,130,246,0.1)', 'rgba(59,130,246,0.3)', '#93c5fd'],
    }[type] || ['rgba(59,130,246,0.1)','rgba(59,130,246,0.3)','#93c5fd'];
    msg.innerHTML = '<div style="padding:10px 14px;border-radius:8px;background:'+c[0]+';border:1px solid '+c[1]+';color:'+c[2]+';font-size:13px;text-align:center;">'+html+'</div>';
  }

  function box(val, idx, ok) {
    var bg = ok ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.07)';
    var br = ok ? 'rgba(16,185,129,0.35)' : 'rgba(239,68,68,0.2)';
    var tc = ok ? '#6ee7b7' : '#94a3b8';
    return '<div style="display:flex;flex-direction:column;align-items:center;gap:3px;"><div style="width:52px;height:52px;border-radius:8px;border:1px solid '+br+';background:'+bg+';display:flex;align-items:center;justify-content:center;font-family:monospace;font-size:15px;font-weight:600;color:'+tc+';">'+val+'</div><div style="font-size:11px;font-family:monospace;color:#64748b;">['+idx+']</div></div>';
  }

  r.querySelector('#a1-bad').addEventListener('click', function() {
    code.innerHTML = '<span style="color:#f87171;font-weight:600;">int points</span> <span style="color:#64748b;">= {23, 17, 31, 8, 25};</span> <span style="font-size:11px;color:#ef4444;margin-left:8px;">← pas de taille !</span>';
    mem.innerHTML = '<div style="width:100%;padding:14px 16px;border-radius:8px;border:2px dashed rgba(239,68,68,0.35);color:#f87171;font-size:13px;text-align:center;line-height:1.6;">❓ <b>Le compilateur est perdu</b><br><span style="font-size:12px;color:#94a3b8;">Sans <code style="background:rgba(255,255,255,0.08);padding:1px 5px;border-radius:4px;">[5]</code>, il ne sait pas combien de cases réserver.<br>Résultat : <b>aucune mémoire allouée</b> — ton programme ne peut pas démarrer.</span></div>';
    setMsg('🚫 Comme commander "des billets de cinéma" sans dire combien — le guichetier ne peut rien faire. <b>La taille est obligatoire.</b>', 'danger');
  });

  r.querySelector('#a1-good').addEventListener('click', function() {
    code.innerHTML = '<span style="color:#f87171;">int</span> <span style="color:#e2e8f0;">points</span><span style="color:#34d399;font-weight:700;">[5]</span> <span style="color:#64748b;">= {23, 17, 31, 8, 25};</span>';
    mem.innerHTML = '';
    setMsg('⏳ Réservation des cases en cours...', 'info');
    var vals = [23, 17, 31, 8, 25];
    var i = 0;
    var iv = setInterval(function() {
      if (i >= 5) {
        clearInterval(iv);
        setMsg('✅ <b>5 cases réservées</b> — chaque valeur a son emplacement. Le [5] était le contrat indispensable avec le compilateur.', 'success');
        return;
      }
      mem.innerHTML += box(vals[i], i, true);
      i++;
    }, 280);
  });

  r.querySelector('#a1-reset').addEventListener('click', function() {
    code.innerHTML = '<span style="color:#64748b;">← Choisis un scénario</span>';
    mem.innerHTML = '';
    msg.innerHTML = '<span style="font-size:13px;color:#475569;">En attente...</span>';
  });
})();
</script>
`

/* ── E2 : Taille trop petite (points[4] pour 5 valeurs) ─────── */
export const ANIM_SIZE_TOO_SMALL = `
<div id="a2-root" style="font-family:system-ui,sans-serif;color:#e2e8f0;padding:16px;">

  <div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap;">
    <button id="a2-bad" style="flex:1;min-width:160px;padding:9px 14px;border-radius:8px;border:1px solid rgba(239,68,68,0.4);background:rgba(239,68,68,0.1);color:#fca5a5;cursor:pointer;font-size:13px;">✗ points[4] (trop petit)</button>
    <button id="a2-good" style="flex:1;min-width:160px;padding:9px 14px;border-radius:8px;border:1px solid rgba(16,185,129,0.4);background:rgba(16,185,129,0.1);color:#6ee7b7;cursor:pointer;font-size:13px;">✓ points[5] (exact)</button>
    <button id="a2-reset" style="padding:9px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:#94a3b8;cursor:pointer;font-size:13px;">↺</button>
  </div>

  <div id="a2-code" style="background:#0d1117;border-radius:8px;padding:10px 14px;font-family:monospace;font-size:13px;margin-bottom:14px;color:#94a3b8;min-height:22px;">
    ← Choisis un scénario
  </div>

  <p style="font-size:12px;color:#64748b;margin:0 0 8px;">Les 5 valeurs à stocker :</p>
  <div id="a2-vals" style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px;min-height:66px;align-items:center;"></div>

  <p style="font-size:12px;color:#64748b;margin:0 0 8px;">Cases du tableau :</p>
  <div id="a2-boxes" style="display:flex;gap:10px;flex-wrap:wrap;min-height:84px;align-items:flex-end;margin-bottom:4px;"></div>

  <div id="a2-msg" style="margin-top:14px;min-height:48px;display:flex;align-items:center;justify-content:center;">
    <span style="font-size:13px;color:#475569;">Choisis un scénario pour commencer</span>
  </div>

  <div style="display:flex;justify-content:center;margin-top:14px;">
    <button id="a2-step" style="padding:10px 28px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.04);color:#475569;cursor:default;font-size:14px;font-weight:500;pointer-events:none;">▶ Étape suivante</button>
  </div>
  <div id="a2-counter" style="text-align:center;font-size:12px;color:#64748b;margin-top:10px;min-height:18px;"></div>
</div>

<script>
(function() {
  var r = document.getElementById('a2-root');
  var valsEl = r.querySelector('#a2-vals');
  var boxesEl = r.querySelector('#a2-boxes');
  var msgEl = r.querySelector('#a2-msg');
  var codeEl = r.querySelector('#a2-code');
  var counterEl = r.querySelector('#a2-counter');
  var btnStep = r.querySelector('#a2-step');
  var VALS = [23, 17, 31, 8, 25];
  var scenario = null, stepIdx = 0, size = 0, locked = true;

  var STYLE_LOCKED  = 'padding:10px 28px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.04);color:#475569;cursor:default;font-size:14px;font-weight:500;pointer-events:none;';
  var STYLE_ACTIVE  = 'padding:10px 28px;border-radius:8px;border:1px solid rgba(59,130,246,0.5);background:rgba(59,130,246,0.15);color:#93c5fd;cursor:pointer;font-size:14px;font-weight:600;pointer-events:auto;';
  var STYLE_DONE    = 'padding:10px 28px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.04);color:#475569;cursor:default;font-size:14px;font-weight:500;pointer-events:none;';

  function setMsg(html, type) {
    var c = {
      danger:  ['rgba(239,68,68,0.1)',  'rgba(239,68,68,0.3)',  '#fca5a5'],
      success: ['rgba(16,185,129,0.1)', 'rgba(16,185,129,0.3)', '#6ee7b7'],
      info:    ['rgba(59,130,246,0.1)', 'rgba(59,130,246,0.3)', '#93c5fd'],
    }[type] || ['rgba(59,130,246,0.1)','rgba(59,130,246,0.3)','#93c5fd'];
    msgEl.innerHTML = '<div style="padding:10px 14px;border-radius:8px;background:'+c[0]+';border:1px solid '+c[1]+';color:'+c[2]+';font-size:13px;text-align:center;">'+html+'</div>';
  }

  function renderVals() {
    valsEl.innerHTML = '';
    VALS.forEach(function(v, i) {
      var el = document.createElement('div');
      el.id = 'a2-v-' + i;
      el.style.cssText = 'width:56px;height:56px;border-radius:8px;border:1px solid rgba(59,130,246,0.4);background:rgba(59,130,246,0.1);display:flex;align-items:center;justify-content:center;font-family:monospace;font-size:16px;font-weight:600;color:#93c5fd;transition:all 0.3s;';
      el.textContent = v;
      valsEl.appendChild(el);
    });
  }

  function renderBoxes(n) {
    boxesEl.innerHTML = '';
    for (var i = 0; i < n; i++) {
      var wrap = document.createElement('div');
      wrap.id = 'a2-b-' + i;
      wrap.style.cssText = 'width:56px;display:flex;flex-direction:column;align-items:center;gap:4px;';
      var slot = document.createElement('div');
      slot.className = 'a2s';
      slot.style.cssText = 'width:56px;height:56px;border-radius:8px;border:1px dashed rgba(255,255,255,0.12);background:rgba(255,255,255,0.03);display:flex;align-items:center;justify-content:center;font-family:monospace;font-size:16px;color:#475569;';
      slot.textContent = '?';
      var idx = document.createElement('div');
      idx.style.cssText = 'font-size:11px;font-family:monospace;color:#64748b;';
      idx.textContent = '[' + i + ']';
      wrap.appendChild(slot);
      wrap.appendChild(idx);
      boxesEl.appendChild(wrap);
    }
  }

  function unlock() {
    locked = false;
    btnStep.style.cssText = STYLE_ACTIVE;
  }
  function lock() {
    locked = true;
    btnStep.style.cssText = STYLE_DONE;
  }

  function start(kind) {
    scenario = kind;
    stepIdx = 0;
    size = kind === 'bad' ? 4 : 5;
    renderVals();
    renderBoxes(size);
    var tc = kind === 'bad' ? '#f87171' : '#34d399';
    codeEl.innerHTML = '<span style="color:#f87171;">int</span> points<span style="color:'+tc+';font-weight:700;">['+size+']</span> <span style="color:#64748b;">= {23, 17, 31, 8, 25};</span>';
    setMsg('Clique sur <b>▶ Étape suivante</b> pour ranger <b>' + VALS[0] + '</b> dans la case <b>[0]</b>', 'info');
    counterEl.textContent = '0 valeur rangée sur 5';
    unlock();
    btnStep.textContent = '▶ Ranger ' + VALS[0];
  }

  btnStep.addEventListener('click', function() {
    if (locked) return;
    if (stepIdx < size && stepIdx < 5) {
      var v = VALS[stepIdx];
      var wrap = r.querySelector('#a2-b-' + stepIdx);
      var card = r.querySelector('#a2-v-' + stepIdx);
      var slot = wrap.querySelector('.a2s');
      slot.style.cssText = 'width:56px;height:56px;border-radius:8px;border:1px solid rgba(16,185,129,0.4);background:rgba(16,185,129,0.1);display:flex;align-items:center;justify-content:center;font-family:monospace;font-size:16px;font-weight:600;color:#6ee7b7;';
      slot.textContent = v;
      card.style.opacity = '0.25';
      card.style.transform = 'scale(0.85)';
      stepIdx++;
      if (stepIdx < 5 && stepIdx < size) {
        setMsg('✔ <b>' + v + '</b> rangé dans [' + (stepIdx-1) + ']. Prochain : <b>' + VALS[stepIdx] + '</b> → case <b>[' + stepIdx + ']</b>', 'info');
        btnStep.textContent = '▶ Ranger ' + VALS[stepIdx];
        counterEl.textContent = stepIdx + ' valeur(s) rangée(s) sur 5';
      } else if (stepIdx >= size && stepIdx < 5) {
        setMsg('⚠️ Plus de cases ! La valeur <b>' + VALS[stepIdx] + '</b> n\'a nulle part où aller...', 'danger');
        btnStep.textContent = '▶ Essayer quand même';
        counterEl.textContent = stepIdx + ' rangée(s) · ' + (5 - stepIdx) + ' en trop 💥';
      } else {
        setMsg('✅ <b>5 valeurs</b> dans <b>5 cases</b> — correspondance parfaite. Chaque valeur a sa place.', 'success');
        lock();
        btnStep.textContent = '✓ Terminé';
        counterEl.textContent = 'Toutes les valeurs sont à leur place !';
      }
    } else if (scenario === 'bad' && stepIdx >= size) {
      var orphan = r.querySelector('#a2-v-' + stepIdx);
      orphan.style.background = 'rgba(239,68,68,0.2)';
      orphan.style.borderColor = 'rgba(239,68,68,0.6)';
      orphan.style.color = '#fca5a5';
      setMsg('💥 <b>Dépassement mémoire !</b> La valeur <b>' + VALS[stepIdx] + '</b> écrase la mémoire voisine — bug grave et silencieux. Comme un 5ème œuf qui tombe hors de la boîte.', 'danger');
      lock();
      btnStep.textContent = '✗ Erreur mémoire';
      counterEl.innerHTML = '<span style="color:#f87171;font-weight:600;">Leçon : 5 valeurs = exactement 5 cases</span>';
    }
  });

  r.querySelector('#a2-bad').addEventListener('click', function() { start('bad'); });
  r.querySelector('#a2-good').addEventListener('click', function() { start('good'); });
  r.querySelector('#a2-reset').addEventListener('click', function() {
    scenario = null; stepIdx = 0; size = 0;
    valsEl.innerHTML = ''; boxesEl.innerHTML = '';
    codeEl.innerHTML = '<span style="color:#64748b;">← Choisis un scénario</span>';
    msgEl.innerHTML = '<span style="font-size:13px;color:#475569;">Choisis un scénario pour commencer</span>';
    counterEl.textContent = '';
    lock();
    btnStep.textContent = '▶ Étape suivante';
  });
})();
</script>
`

/* ── E3 : Taille trop grande (points[6] pour 5 valeurs) ─────── */
export const ANIM_SIZE_TOO_LARGE = `
<div id="a3-root" style="font-family:system-ui,sans-serif;color:#e2e8f0;padding:16px;">

  <div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap;">
    <button id="a3-bad" style="flex:1;min-width:160px;padding:8px 12px;border-radius:8px;border:1px solid rgba(245,158,11,0.4);background:rgba(245,158,11,0.1);color:#fcd34d;cursor:pointer;font-size:13px;">⚠ points[6] (trop grand)</button>
    <button id="a3-good" style="flex:1;min-width:160px;padding:8px 12px;border-radius:8px;border:1px solid rgba(16,185,129,0.4);background:rgba(16,185,129,0.1);color:#6ee7b7;cursor:pointer;font-size:13px;">✓ points[5] (exact)</button>
    <button id="a3-reset" style="padding:8px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:#94a3b8;cursor:pointer;font-size:13px;">↺</button>
  </div>

  <div id="a3-code" style="background:#0d1117;border-radius:8px;padding:10px 14px;font-family:monospace;font-size:13px;margin-bottom:14px;color:#94a3b8;min-height:22px;">
    ← Choisis un scénario
  </div>

  <p style="font-size:12px;color:#64748b;margin:0 0 6px;">Cases du tableau en mémoire :</p>
  <div id="a3-boxes" style="display:flex;gap:8px;flex-wrap:wrap;min-height:80px;align-items:flex-end;margin-bottom:8px;"></div>

  <div id="a3-msg" style="margin-top:12px;min-height:44px;display:flex;align-items:center;justify-content:center;">
    <span style="font-size:13px;color:#475569;">En attente...</span>
  </div>

  <div id="a3-ghost-btn-wrap" style="display:flex;justify-content:center;margin-top:10px;display:none;">
    <button id="a3-ghost-btn" style="padding:8px 18px;border-radius:8px;border:1px solid rgba(245,158,11,0.4);background:rgba(245,158,11,0.08);color:#fcd34d;cursor:pointer;font-size:13px;">👻 Lire la case fantôme points[5]</button>
  </div>
</div>

<script>
(function() {
  var r = document.getElementById('a3-root');
  var boxesEl = r.querySelector('#a3-boxes');
  var msgEl = r.querySelector('#a3-msg');
  var codeEl = r.querySelector('#a3-code');
  var ghostWrap = r.querySelector('#a3-ghost-btn-wrap');
  var ghostBtn = r.querySelector('#a3-ghost-btn');
  var VALS = [23, 17, 31, 8, 25];

  function setMsg(html, type) {
    var c = {
      danger:  ['rgba(239,68,68,0.1)',  'rgba(239,68,68,0.3)',  '#fca5a5'],
      success: ['rgba(16,185,129,0.1)', 'rgba(16,185,129,0.3)', '#6ee7b7'],
      info:    ['rgba(59,130,246,0.1)', 'rgba(59,130,246,0.3)', '#93c5fd'],
      warning: ['rgba(245,158,11,0.1)', 'rgba(245,158,11,0.3)', '#fcd34d'],
    }[type] || ['rgba(59,130,246,0.1)','rgba(59,130,246,0.3)','#93c5fd'];
    msgEl.innerHTML = '<div style="padding:10px 14px;border-radius:8px;background:'+c[0]+';border:1px solid '+c[1]+';color:'+c[2]+';font-size:13px;text-align:center;">'+html+'</div>';
  }

  function showBad() {
    ghostWrap.style.display = 'none';
    codeEl.innerHTML = '<span style="color:#f87171;">int</span> points<span style="color:#fcd34d;font-weight:700;">[6]</span> <span style="color:#64748b;">= {23, 17, 31, 8, 25};</span> <span style="font-size:11px;color:#f59e0b;margin-left:6px;">← 6 cases pour 5 valeurs</span>';
    boxesEl.innerHTML = '';
    var i = 0;
    var iv = setInterval(function() {
      if (i >= 5) {
        clearInterval(iv);
        // ajouter la case fantôme
        var ghost = document.createElement('div');
        ghost.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:3px;';
        ghost.innerHTML = '<div id="a3-ghost-slot" style="width:52px;height:52px;border-radius:8px;border:2px dashed rgba(245,158,11,0.5);background:rgba(245,158,11,0.07);display:flex;align-items:center;justify-content:center;font-family:monospace;font-size:15px;color:#f59e0b;font-weight:600;cursor:default;">?</div><div style="font-size:11px;font-family:monospace;color:#f59e0b;">[5]</div><div style="font-size:9px;color:#f59e0b;text-align:center;">fantôme</div>';
        boxesEl.appendChild(ghost);
        setMsg('⚠️ La case <b>[5]</b> existe en mémoire mais n\'a pas été initialisée. Elle contient une valeur aléatoire héritée — comme un casier dont tu n\'as pas la clé.', 'warning');
        ghostWrap.style.display = 'flex';
        return;
      }
      var box = document.createElement('div');
      box.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:3px;';
      box.innerHTML = '<div style="width:52px;height:52px;border-radius:8px;border:1px solid rgba(16,185,129,0.4);background:rgba(16,185,129,0.1);display:flex;align-items:center;justify-content:center;font-family:monospace;font-size:15px;font-weight:600;color:#6ee7b7;">'+VALS[i]+'</div><div style="font-size:11px;font-family:monospace;color:#64748b;">['+i+']</div>';
      boxesEl.appendChild(box);
      i++;
    }, 300);
    setMsg('⏳ Placement des valeurs en cours...', 'info');
  }

  function showGood() {
    ghostWrap.style.display = 'none';
    codeEl.innerHTML = '<span style="color:#f87171;">int</span> points<span style="color:#34d399;font-weight:700;">[5]</span> <span style="color:#64748b;">= {23, 17, 31, 8, 25};</span>';
    boxesEl.innerHTML = '';
    var i = 0;
    var iv = setInterval(function() {
      if (i >= 5) {
        clearInterval(iv);
        setMsg('✅ <b>5 cases, 5 valeurs</b> — aucune case fantôme, aucune valeur aléatoire. Tout est propre et prévisible.', 'success');
        return;
      }
      var box = document.createElement('div');
      box.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:3px;';
      box.innerHTML = '<div style="width:52px;height:52px;border-radius:8px;border:1px solid rgba(16,185,129,0.4);background:rgba(16,185,129,0.1);display:flex;align-items:center;justify-content:center;font-family:monospace;font-size:15px;font-weight:600;color:#6ee7b7;">'+VALS[i]+'</div><div style="font-size:11px;font-family:monospace;color:#64748b;">['+i+']</div>';
      boxesEl.appendChild(box);
      i++;
    }, 300);
    setMsg('⏳ Placement des valeurs...', 'info');
  }

  ghostBtn.addEventListener('click', function() {
    var slot = r.querySelector('#a3-ghost-slot');
    var garbage = [-847362, 9473, 0, 32767, -1, 2049][Math.floor(Math.random()*6)];
    slot.textContent = garbage;
    slot.style.color = '#ef4444';
    slot.style.background = 'rgba(239,68,68,0.15)';
    slot.style.borderColor = 'rgba(239,68,68,0.5)';
    ghostBtn.disabled = true;
    ghostBtn.style.opacity = '0.5';
    setMsg('💥 La case [5] affiche <b>' + garbage + '</b> — une valeur qui traînait en mémoire avant ton programme. Imprévisible, non reproductible. <b>C\'est un bug silencieux.</b>', 'danger');
  });

  r.querySelector('#a3-bad').addEventListener('click', showBad);
  r.querySelector('#a3-good').addEventListener('click', showGood);
  r.querySelector('#a3-reset').addEventListener('click', function() {
    boxesEl.innerHTML = '';
    codeEl.innerHTML = '<span style="color:#64748b;">← Choisis un scénario</span>';
    msgEl.innerHTML = '<span style="font-size:13px;color:#475569;">En attente...</span>';
    ghostWrap.style.display = 'none';
    ghostBtn.disabled = false;
    ghostBtn.style.opacity = '1';
  });
})();
</script>
`

/* ── E4 : Mauvais indice (confusion base-1 / base-0) ────────── */
export const ANIM_WRONG_INDEX = `
<div id="a4-root" style="font-family:system-ui,sans-serif;color:#e2e8f0;padding:16px;">

  <p style="font-size:13px;color:#94a3b8;margin:0 0 12px;line-height:1.5;">
    Tu veux afficher le <b style="color:#e2e8f0;">3ème match</b>. Clique sur la case qui te semble correcte — puis découvre la réalité en C.
  </p>

  <!-- Tableau avec positions et indices -->
  <div style="margin-bottom:16px;">
    <p style="font-size:11px;color:#64748b;margin:0 0 4px;text-align:center;">Rang (comme dans la vie) :</p>
    <div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-bottom:4px;">
      <div style="width:56px;text-align:center;font-size:12px;color:#94a3b8;">1er</div>
      <div style="width:56px;text-align:center;font-size:12px;color:#94a3b8;">2ème</div>
      <div style="width:56px;text-align:center;font-size:12px;color:#e2e8f0;font-weight:600;">3ème ← ?</div>
      <div style="width:56px;text-align:center;font-size:12px;color:#94a3b8;">4ème</div>
      <div style="width:56px;text-align:center;font-size:12px;color:#94a3b8;">5ème</div>
    </div>

    <div id="a4-boxes" style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-bottom:6px;">
      <div id="a4-box-0" class="a4box" data-idx="0" data-val="23"  style="width:56px;height:56px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);display:flex;align-items:center;justify-content:center;font-family:monospace;font-size:16px;font-weight:600;color:#94a3b8;cursor:pointer;transition:all 0.2s;">23</div>
      <div id="a4-box-1" class="a4box" data-idx="1" data-val="17"  style="width:56px;height:56px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);display:flex;align-items:center;justify-content:center;font-family:monospace;font-size:16px;font-weight:600;color:#94a3b8;cursor:pointer;transition:all 0.2s;">17</div>
      <div id="a4-box-2" class="a4box" data-idx="2" data-val="31"  style="width:56px;height:56px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);display:flex;align-items:center;justify-content:center;font-family:monospace;font-size:16px;font-weight:600;color:#94a3b8;cursor:pointer;transition:all 0.2s;">31</div>
      <div id="a4-box-3" class="a4box" data-idx="3" data-val="8"   style="width:56px;height:56px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);display:flex;align-items:center;justify-content:center;font-family:monospace;font-size:16px;font-weight:600;color:#94a3b8;cursor:pointer;transition:all 0.2s;">8</div>
      <div id="a4-box-4" class="a4box" data-idx="4" data-val="25"  style="width:56px;height:56px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);display:flex;align-items:center;justify-content:center;font-family:monospace;font-size:16px;font-weight:600;color:#94a3b8;cursor:pointer;transition:all 0.2s;">25</div>
    </div>

    <div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;">
      <div style="width:56px;text-align:center;font-size:11px;font-family:monospace;color:#475569;">[0]</div>
      <div style="width:56px;text-align:center;font-size:11px;font-family:monospace;color:#475569;">[1]</div>
      <div style="width:56px;text-align:center;font-size:11px;font-family:monospace;color:#475569;">[2]</div>
      <div style="width:56px;text-align:center;font-size:11px;font-family:monospace;color:#475569;">[3]</div>
      <div style="width:56px;text-align:center;font-size:11px;font-family:monospace;color:#475569;">[4]</div>
    </div>
  </div>

  <div id="a4-code" style="background:#0d1117;border-radius:8px;padding:10px 14px;font-family:monospace;font-size:13px;margin-bottom:12px;color:#94a3b8;min-height:22px;">
    ← Clique sur une case pour voir le code généré
  </div>

  <div id="a4-msg" style="min-height:52px;display:flex;align-items:center;justify-content:center;">
    <span style="font-size:13px;color:#475569;">Clique sur la case qui correspond au 3ème match...</span>
  </div>

  <div id="a4-formula" style="display:none;margin-top:12px;padding:12px 16px;border-radius:8px;background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.3);text-align:center;">
    <p style="font-size:13px;color:#c4b5fd;margin:0;font-weight:600;">📐 Règle universelle en C</p>
    <p style="font-size:15px;color:#e2e8f0;margin:6px 0 0;font-family:monospace;"><b>indice = rang − 1</b></p>
    <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">3ème match → indice 2 &nbsp;|&nbsp; 1er match → indice 0 &nbsp;|&nbsp; 5ème match → indice 4</p>
  </div>

  <div style="display:flex;justify-content:center;margin-top:10px;">
    <button id="a4-reset" style="padding:7px 16px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:#94a3b8;cursor:pointer;font-size:12px;">↺ Réessayer</button>
  </div>
</div>

<script>
(function() {
  var r = document.getElementById('a4-root');
  var codeEl = r.querySelector('#a4-code');
  var msgEl = r.querySelector('#a4-msg');
  var formulaEl = r.querySelector('#a4-formula');
  var answered = false;

  function setMsg(html, type) {
    var c = {
      danger:  ['rgba(239,68,68,0.1)',  'rgba(239,68,68,0.3)',  '#fca5a5'],
      success: ['rgba(16,185,129,0.1)', 'rgba(16,185,129,0.3)', '#6ee7b7'],
      info:    ['rgba(59,130,246,0.1)', 'rgba(59,130,246,0.3)', '#93c5fd'],
    }[type] || ['rgba(59,130,246,0.1)','rgba(59,130,246,0.3)','#93c5fd'];
    msgEl.innerHTML = '<div style="padding:10px 14px;border-radius:8px;background:'+c[0]+';border:1px solid '+c[1]+';color:'+c[2]+';font-size:13px;text-align:center;line-height:1.6;">'+html+'</div>';
  }

  function resetBoxes() {
    r.querySelectorAll('.a4box').forEach(function(b) {
      b.style.border = '1px solid rgba(255,255,255,0.1)';
      b.style.background = 'rgba(255,255,255,0.04)';
      b.style.color = '#94a3b8';
      b.style.transform = 'scale(1)';
    });
  }

  r.querySelectorAll('.a4box').forEach(function(box) {
    box.addEventListener('click', function() {
      if (answered) return;
      var idx = parseInt(this.getAttribute('data-idx'));
      var val = parseInt(this.getAttribute('data-val'));
      resetBoxes();

      if (idx === 2) {
        // Bonne réponse
        this.style.border = '2px solid rgba(16,185,129,0.6)';
        this.style.background = 'rgba(16,185,129,0.15)';
        this.style.color = '#6ee7b7';
        this.style.transform = 'scale(1.1)';
        codeEl.innerHTML = 'printf(<span style="color:#fcd34d;">"%d"</span>, points<span style="color:#34d399;font-weight:700;">[2]</span>); <span style="color:#64748b;font-size:11px;margin-left:6px;">// affiche 31 ✓</span>';
        setMsg('✅ <b>Parfait !</b> Le 3ème match est à l\'indice <b>[2]</b> et vaut <b>31</b>.<br>Rang 3 → indice 2. En C, on commence à compter à 0.', 'success');
        formulaEl.style.display = 'block';
        answered = true;
      } else if (idx === 3) {
        // Erreur la plus courante : choisir [3] pour le 3ème
        this.style.border = '2px solid rgba(239,68,68,0.6)';
        this.style.background = 'rgba(239,68,68,0.12)';
        this.style.color = '#fca5a5';
        codeEl.innerHTML = 'printf(<span style="color:#fcd34d;">"%d"</span>, points<span style="color:#f87171;font-weight:700;">[3]</span>); <span style="color:#64748b;font-size:11px;margin-left:6px;">// affiche 8 — le 4ème match !</span>';
        setMsg('❌ <b>points[3]</b> existe mais c\'est le <b>4ème</b> match (valeur : 8), pas le 3ème !<br>C ne te prévient pas — il affiche 8 sans erreur. Le bug est silencieux.', 'danger');
        // Montrer la bonne case en doré
        setTimeout(function() {
          var correct = r.querySelector('#a4-box-2');
          correct.style.border = '2px dashed rgba(245,158,11,0.6)';
          correct.style.background = 'rgba(245,158,11,0.08)';
          correct.style.color = '#fcd34d';
          setMsg('❌ <b>points[3] = 8</b> → c\'est le 4ème match.<br>👉 La case en orange est le 3ème match : <b>points[2] = 31</b>. Rang 3 → indice <b>3−1 = 2</b>.', 'danger');
          formulaEl.style.display = 'block';
        }, 1200);
        answered = true;
      } else {
        // Autre mauvaise réponse
        this.style.border = '2px solid rgba(239,68,68,0.5)';
        this.style.background = 'rgba(239,68,68,0.08)';
        this.style.color = '#fca5a5';
        codeEl.innerHTML = 'printf(<span style="color:#fcd34d;">"%d"</span>, points<span style="color:#f87171;font-weight:700;">['+idx+']</span>); <span style="color:#64748b;font-size:11px;">// affiche '+val+' — le '+(idx+1)+'ème match</span>';
        setMsg('❌ Non — <b>points['+idx+']</b> est le <b>'+(idx+1)+'ème</b> match (valeur : '+val+').<br>Le 3ème match est à l\'indice <b>[2]</b>. Essaie encore !', 'danger');
        setTimeout(function() { answered = false; resetBoxes(); }, 1500);
      }
    });

    box.addEventListener('mouseenter', function() {
      if (!answered) this.style.transform = 'scale(1.08)';
    });
    box.addEventListener('mouseleave', function() {
      if (!answered) this.style.transform = 'scale(1)';
    });
  });

  r.querySelector('#a4-reset').addEventListener('click', function() {
    answered = false;
    resetBoxes();
    codeEl.innerHTML = '<span style="color:#64748b;">← Clique sur une case pour voir le code généré</span>';
    msgEl.innerHTML = '<span style="font-size:13px;color:#475569;">Clique sur la case qui correspond au 3ème match...</span>';
    formulaEl.style.display = 'none';
  });
})();
</script>
`
