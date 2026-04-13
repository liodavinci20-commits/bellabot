// ─────────────────────────────────────────────────────────────
// SÉANCE : Les Tableaux — Algorithmique & Pseudocode
// PROFIL  : Apprenant Visuel (Visuel · Séquentiel)
// APPROCHE: Schéma d'abord → Explication pas à pas → Exercice
// ─────────────────────────────────────────────────────────────

const norm = (s) => s.toUpperCase().replace(/\s+/g, ' ').trim()

export const LESSON_ARRAYS_VISUEL = {
  id: 'arrays-visuel',
  subject: 'Algorithmique — Les Tableaux',
  profile: 'visuel',
  totalSteps: 4,

  steps: [
    // ── ÉTAPE 1 ───────────────────────────────────────────────
    {
      id: 1,
      type: 'hook',
      badge: 'Vue d\'ensemble',
      title: 'Un tableau, c\'est quoi ?',
      objective: 'Visualiser ce qu\'est un tableau avant même de coder.',
      intro: {
        text: 'Avant d\'écrire le moindre algorithme, regarde ce schéma. Un tableau, c\'est simplement une rangée de cases numérotées, chacune contenant une valeur.',
        tone: 'visual',
      },
      illustration: 'array-intro',
      visual: {
        type: 'schema',
        caption: 'Un tableau = une suite de cases numérotées (les indices commencent à 0)',
      },
      codeBlocks: [
        {
          id: 'declaration',
          label: 'Ce que ça donne en pseudocode',
          language: 'algo',
          type: 'neutral',
          code: `//  ┌────┬────┬────┬────┬────┐
//  │ 15 │ 12 │ 18 │ 10 │ 14 │   ← valeurs
//  └────┴────┴────┴────┴────┘
//     0    1    2    3    4      ← indices

VARIABLES :
  notes : TABLEAU[5] D'ENTIERS

DEBUT
  notes ← [15, 12, 18, 10, 14]
FIN`,
          comment: 'notes[2] → case d\'indice 2 → valeur 18.',
        },
      ],
      keyPoint: 'Un tableau = une variable qui contient PLUSIEURS valeurs dans des cases numérotées. La numérotation commence à 0.',
      exercise: {
        type: 'reflection',
        question: 'Observe le schéma et réponds',
        prompt: 'Dans le tableau notes = [15, 12, 18, 10, 14] :\n• Quelle est la valeur à l\'indice 3 ?\n• Quel est l\'indice de la valeur 18 ?\n• Combien de cases ce tableau a-t-il ?',
        starter: '',
        hints: [
          'Compte les cases en partant de l\'indice 0 à gauche.',
          'Indice 3 = 4ème case. La valeur 18 est à la 3ème position (indice 2).',
          'notes[3] = 10 | 18 est à l\'indice 2 | Le tableau a 5 cases (indices 0 à 4).',
        ],
        validation: [
          {
            id: 'indice-3',
            test: (c) => /10/.test(c),
            success: 'Correct ! notes[3] = 10.',
            error: 'Compte depuis 0 : 0→15, 1→12, 2→18, 3→?',
          },
          {
            id: 'indice-18',
            test: (c) => /indice\s*2|position\s*2|\[2\]|2ème|2e\s+case/i.test(c),
            success: 'Exact ! 18 est bien à l\'indice 2.',
            error: 'Cherche la position de 18 : 0→15, 1→12, 2→?',
          },
          {
            id: 'taille',
            test: (c) => /5/.test(c),
            success: 'Parfait ! 5 cases, indices de 0 à 4.',
            error: 'Compte toutes les cases du tableau.',
          },
        ],
        answer: '• notes[3] = 10\n• 18 est à l\'indice 2\n• Le tableau a 5 cases (indices 0 à 4)',
      },
    },

    // ── ÉTAPE 2 ───────────────────────────────────────────────
    {
      id: 2,
      type: 'learn',
      badge: 'Étape 1',
      title: 'Déclarer et remplir un tableau',
      objective: 'Écrire la déclaration et l\'initialisation d\'un tableau, en suivant la structure pas à pas.',
      intro: {
        text: 'La déclaration d\'un tableau se fait en 3 parties bien distinctes. Repère-les sur le schéma, puis retrouve-les dans le code.',
        tone: 'visual',
      },
      illustration: 'declaration-schema',
      codeBlocks: [
        {
          id: 'anatomy',
          label: 'Anatomie d\'une déclaration',
          language: 'algo',
          type: 'neutral',
          code: `//   [NOM]    [TAILLE]  [TYPE]
//     ↓         ↓        ↓
  notes : TABLEAU[5] D'ENTIERS`,
          comment: null,
        },
        {
          id: 'examples',
          label: 'Exemples et accès',
          language: 'algo',
          type: 'neutral',
          code: `VARIABLES :
  notes   : TABLEAU[5] D'ENTIERS
  prenoms : TABLEAU[3] DE CHAINES

DEBUT
  notes ← [15, 12, 18, 10, 14]    // initialisation en bloc
  notes[0] ← 15                    // ou case par case

  AFFICHER(notes[0])   // → 15
  AFFICHER(notes[2])   // → 18
FIN`,
          comment: null,
        },
      ],
      keyPoint: 'Déclaration = NOM : TABLEAU[TAILLE] DE TYPE.\nAccès = nom[indice].',
      exercise: {
        type: 'code',
        question: 'À toi de jouer !',
        prompt: 'Écris la déclaration et l\'initialisation d\'un tableau "temperatures" de 4 entiers : 22, 19, 25, 17.\nPuis affiche la 3ème température.',
        starter: `VARIABLES :
  // ta déclaration ici

DEBUT
  // initialisation et affichage
FIN`,
        hints: [
          'Schéma : temperatures : TABLEAU[4] D\'ENTIERS',
          'Pour initialiser : temperatures ← [22, 19, 25, 17]\nLa 3ème température = indice 2.',
          'AFFICHER(temperatures[2]) affiche 25 (3ème valeur, indice 2).',
        ],
        validation: [
          {
            id: 'declaration',
            test: (c) => /TABLEAU\s*\[\s*4\s*\]/i.test(c),
            success: 'Déclaration TABLEAU[4] correcte.',
            error: 'Déclare un tableau de taille 4 : nom : TABLEAU[4] D\'ENTIERS',
          },
          {
            id: 'init',
            test: (c) => /\[22/.test(c) || /\[0\]\s*←\s*22/i.test(c),
            success: 'Initialisation avec les bonnes valeurs.',
            error: 'Initialise : temperatures ← [22, 19, 25, 17]',
          },
          {
            id: 'afficher',
            test: (c) => /AFFICHER\s*\(\s*\w+\s*\[\s*2\s*\]\s*\)/i.test(c),
            success: 'AFFICHER(temperatures[2]) → affiche bien 25.',
            error: 'La 3ème valeur est à l\'indice 2 : AFFICHER(temperatures[2])',
          },
        ],
        answer: `VARIABLES :
  temperatures : TABLEAU[4] D'ENTIERS

DEBUT
  temperatures ← [22, 19, 25, 17]
  AFFICHER(temperatures[2])   // → 25
FIN`,
      },
    },

    // ── ÉTAPE 3 ───────────────────────────────────────────────
    {
      id: 3,
      type: 'learn',
      badge: 'Étape 2',
      title: 'Parcourir les cases avec une boucle',
      objective: 'Comprendre visuellement comment une boucle POUR se déplace dans un tableau.',
      intro: {
        text: 'Parcourir un tableau = passer par chaque case dans l\'ordre. Regarde le schéma : la variable i est comme un pointeur qui avance de case en case à chaque tour.',
        tone: 'visual',
      },
      illustration: 'loop-trace',
      codeBlocks: [
        {
          id: 'basic-loop',
          label: 'Structure annotée de la boucle POUR',
          language: 'algo',
          type: 'neutral',
          code: `//         ┌── 1ère case (indice 0)
//         │         ┌── dernière case (indice 4)
//         ↓         ↓
  POUR i DE 0 À 4 FAIRE
    AFFICHER(notes[i])   // i = pointeur
  FIN POUR`,
          comment: 'Règle : tableau de N cases → POUR i DE 0 À N-1.',
        },
        {
          id: 'full-example',
          label: 'Exemple complet avec affichage formaté',
          language: 'algo',
          type: 'neutral',
          code: `VARIABLES :
  notes : TABLEAU[5] D'ENTIERS
  i     : ENTIER

DEBUT
  notes ← [15, 12, 18, 10, 14]

  POUR i DE 0 À 4 FAIRE
    AFFICHER("Élève ", i+1, " — Note : ", notes[i], "/20")
  FIN POUR
FIN`,
          comment: 'i+1 permet d\'afficher 1, 2, 3... plutôt que 0, 1, 2...',
        },
        {
          id: 'trace',
          label: 'Tableau de trace — chaque tour',
          language: 'algo',
          type: 'trace',
          code: `// ┌──────┬─────┬──────────┬──────────────────┐
// │ Tour │  i  │ notes[i] │    Résultat      │
// ├──────┼─────┼──────────┼──────────────────┤
// │  1   │  0  │    15    │ Élève 1 — 15/20  │
// │  2   │  1  │    12    │ Élève 2 — 12/20  │
// │  3   │  2  │    18    │ Élève 3 — 18/20  │
// │  4   │  3  │    10    │ Élève 4 — 10/20  │
// │  5   │  4  │    14    │ Élève 5 — 14/20  │
// │  -   │  5  │  stop    │ 5>4 → fin boucle │
// └──────┴─────┴──────────┴──────────────────┘`,
          comment: null,
        },
      ],
      keyPoint: 'POUR i DE 0 À N-1 FAIRE ... FIN POUR. i joue le rôle de pointeur qui parcourt les cases de gauche à droite.',
      exercise: {
        type: 'code',
        question: 'À toi de jouer !',
        prompt: 'Écris l\'algorithme qui parcourt temperatures ← [22, 19, 25, 17, 30]\net affiche "Jour X : Y°C" pour chaque valeur.',
        starter: `VARIABLES :
  temperatures : TABLEAU[5] D'ENTIERS
  i            : ENTIER

DEBUT
  temperatures ← [22, 19, 25, 17, 30]

  // ta boucle ici

FIN`,
        hints: [
          'Regarde le tableau de trace ci-dessus : i va de 0 à 4 (5 éléments → 0 à 4).',
          'Structure : POUR i DE 0 À 4 FAIRE / AFFICHER(...) / FIN POUR',
          'AFFICHER("Jour ", i+1, " : ", temperatures[i], "°C")',
        ],
        validation: [
          {
            id: 'pour-structure',
            test: (c) => /POUR\s+\w+\s+DE\s+0\s+À\s+4/i.test(c),
            success: 'POUR i DE 0 À 4 — structure correcte.',
            error: '5 éléments → boucle de 0 à 4 : POUR i DE 0 À 4 FAIRE',
          },
          {
            id: 'fin-pour',
            test: (c) => /FIN\s+POUR/i.test(c),
            success: 'FIN POUR bien présent.',
            error: 'Ferme ta boucle avec FIN POUR.',
          },
          {
            id: 'acces',
            test: (c) => /temperatures?\s*\[\s*i\s*\]/i.test(c),
            success: 'temperatures[i] correctement utilisé.',
            error: 'Utilise temperatures[i] pour accéder à chaque valeur dans la boucle.',
          },
          {
            id: 'numero',
            test: (c) => /i\s*\+\s*1/i.test(c),
            success: 'i+1 pour numéroter les jours à partir de 1.',
            error: 'Utilise i+1 pour afficher Jour 1, Jour 2... (et non Jour 0, Jour 1...)',
          },
        ],
        answer: `VARIABLES :
  temperatures : TABLEAU[5] D'ENTIERS
  i            : ENTIER

DEBUT
  temperatures ← [22, 19, 25, 17, 30]

  POUR i DE 0 À 4 FAIRE
    AFFICHER("Jour ", i+1, " : ", temperatures[i], "°C")
  FIN POUR
FIN`,
      },
    },

    // ── ÉTAPE 4 ───────────────────────────────────────────────
    {
      id: 4,
      type: 'learn',
      badge: 'Étape 3',
      title: 'Calculer la somme',
      objective: 'Comprendre le schéma accumulateur et l\'appliquer pour sommer les éléments.',
      intro: {
        text: 'Regarde le schéma de l\'accumulateur ci-dessous. La variable "total" commence vide (0) et se remplit à chaque tour, comme un verre qu\'on remplit goutte à goutte.',
        tone: 'visual',
      },
      illustration: 'accumulator',
      codeBlocks: [
        {
          id: 'sum',
          label: 'Algorithme de la somme',
          language: 'algo',
          type: 'neutral',
          code: `VARIABLES :
  notes  : TABLEAU[5] D'ENTIERS
  i, total : ENTIER

DEBUT
  notes ← [15, 12, 18, 10, 14]
  total ← 0             // vide au départ

  POUR i DE 0 À 4 FAIRE
    total ← total + notes[i]
  FIN POUR

  AFFICHER("Somme : ", total)   // → 69
FIN`,
          comment: 'total ← 0 AVANT la boucle, pas dedans !',
        },
        {
          id: 'trace-sum',
          label: 'Schéma de remplissage — tour par tour',
          language: 'algo',
          type: 'trace',
          code: `// ┌──────┬──────────────────────────┬───────┐
// │ Tour │       Opération          │ total │
// ├──────┼──────────────────────────┼───────┤
// │  0   │  total ← 0               │   0   │
// │  1   │  total ← 0  + notes[0]   │  15   │
// │  2   │  total ← 15 + notes[1]   │  27   │
// │  3   │  total ← 27 + notes[2]   │  45   │
// │  4   │  total ← 45 + notes[3]   │  55   │
// │  5   │  total ← 55 + notes[4]   │  69   │
// └──────┴──────────────────────────┴───────┘`,
          comment: null,
        },
        {
          id: 'average',
          label: 'Extension — moyenne',
          language: 'algo',
          type: 'bonus',
          code: `moyenne ← total / 5
AFFICHER("Total   : ", total)     // → 69
AFFICHER("Moyenne : ", moyenne)   // → 13.8`,
          comment: 'moyenne doit être déclarée en REEL.',
        },
      ],
      keyPoint: 'Schéma en 3 temps : (1) total ← 0 AVANT, (2) total ← total + tab[i] DANS la boucle, (3) AFFICHER(total) APRÈS.',
      exercise: {
        type: 'code',
        question: 'Projet final — applique le schéma !',
        prompt: 'Écris l\'algorithme COMPLET qui :\n1. Déclare scores ← [450, 320, 580, 210, 495]\n2. Affiche chaque score "Partie X : Y points"\n3. Affiche le score total\n4. Affiche le score moyen',
        starter: `VARIABLES :
  scores   : TABLEAU[5] D'ENTIERS
  i, total : ENTIER
  moyenne  : REEL

DEBUT
  scores ← [450, 320, 580, 210, 495]

  // Étape 1 : affichage (boucle)


  // Étape 2 : somme (schéma accumulateur)
  total ← 0


  // Étape 3 : moyenne et affichage résultats

FIN`,
        hints: [
          'Regarde le schéma des 3 temps : initialiser → accumuler → afficher.',
          'Boucle 1 (affichage) : AFFICHER("Partie ", i+1, ...) \nBoucle 2 (somme) : total ← total + scores[i]',
          'Après les boucles : moyenne ← total / 5, puis deux AFFICHER.',
        ],
        validation: [
          {
            id: 'tableau',
            test: (c) => /TABLEAU\s*\[\s*5\s*\]/i.test(c),
            success: 'Déclaration TABLEAU[5] correcte.',
            error: 'Déclare scores : TABLEAU[5] D\'ENTIERS.',
          },
          {
            id: 'boucle-affichage',
            test: (c) => /AFFICHER.*scores?\s*\[\s*i\s*\]/i.test(c),
            success: 'Affichage de scores[i] dans la boucle.',
            error: 'Première boucle : AFFICHER("Partie ", i+1, " : ", scores[i], " points")',
          },
          {
            id: 'total-zero',
            test: (c) => /total\s*←\s*0/i.test(c),
            success: 'Accumulateur initialisé à 0.',
            error: 'N\'oublie pas : total ← 0 avant la boucle de calcul.',
          },
          {
            id: 'accumulation',
            test: (c) => /total\s*←\s*total\s*\+/i.test(c),
            success: 'Schéma accumulateur appliqué : total ← total + scores[i].',
            error: 'Dans la boucle : total ← total + scores[i]',
          },
          {
            id: 'moyenne',
            test: (c) => /moyenne\s*←\s*total\s*\/\s*5/i.test(c),
            success: 'Calcul de la moyenne correct.',
            error: 'Après la boucle : moyenne ← total / 5',
          },
        ],
        answer: `VARIABLES :
  scores   : TABLEAU[5] D'ENTIERS
  i, total : ENTIER
  moyenne  : REEL

DEBUT
  scores ← [450, 320, 580, 210, 495]

  POUR i DE 0 À 4 FAIRE
    AFFICHER("Partie ", i+1, " : ", scores[i], " points")
  FIN POUR

  total ← 0
  POUR i DE 0 À 4 FAIRE
    total ← total + scores[i]
  FIN POUR

  moyenne ← total / 5
  AFFICHER("Score total : ", total)
  AFFICHER("Score moyen : ", moyenne)
FIN`,
      },
    },
  ],
}
