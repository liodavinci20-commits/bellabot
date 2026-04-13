// ─────────────────────────────────────────────────────────────
// SÉANCE : Les Tableaux — Algorithmique & Pseudocode
// PROFIL  : Apprenant Pratique (Actif · Sensoriel)
// APPROCHE: Problème concret → Action → Explication → Exercice
// ─────────────────────────────────────────────────────────────

// Normalise le code saisi pour la validation
const norm = (s) => s.toUpperCase().replace(/\s+/g, ' ').trim()

export const LESSON_ARRAYS_PRATIQUE = {
  id: 'arrays-pratique',
  subject: 'Algorithmique — Les Tableaux',
  profile: 'pratique',
  totalSteps: 4,

  steps: [
    // ── ÉTAPE 1 ───────────────────────────────────────────────
    {
      id: 1,
      type: 'hook',
      badge: 'Mise en situation',
      title: 'Pourquoi les tableaux existent ?',
      objective: 'Comprendre quel problème concret le tableau résout.',
      intro: {
        text: 'Imagine que tu veux stocker les notes de 5 élèves dans ton algorithme. Sans tableau, tu serais obligé de faire ça :',
        tone: 'problem',
      },
      illustration: 'problem-vars',
      codeBlocks: [
        {
          id: 'bad',
          label: 'Sans tableau — le problème',
          language: 'algo',
          type: 'bad',
          code: `VARIABLES :
  note1, note2, note3, note4, note5 : ENTIER

DEBUT
  note1 ← 15
  note2 ← 12
  note3 ← 18
  note4 ← 10
  note5 ← 14

  AFFICHER(note1)
  AFFICHER(note2)
  AFFICHER(note3)
  AFFICHER(note4)
  AFFICHER(note5)
FIN`,
          comment: '5 variables, 10 lignes... Et si tu as 30 élèves ?',
        },
        {
          id: 'good',
          label: 'Avec un tableau — la solution',
          language: 'algo',
          type: 'good',
          code: `VARIABLES :
  notes : TABLEAU[5] D'ENTIERS
  i     : ENTIER

DEBUT
  notes ← [15, 12, 18, 10, 14]

  POUR i DE 0 À 4 FAIRE
    AFFICHER(notes[i])
  FIN POUR
FIN`,
          comment: 'Une seule variable. La boucle fait tout le travail.',
        },
      ],
      keyPoint: 'Un tableau stocke PLUSIEURS valeurs dans UNE seule variable. On y accède via un indice entre crochets.',
      exercise: {
        type: 'reflection',
        question: 'Réfléchis avant de continuer',
        prompt: 'Si tu avais 50 élèves, combien de variables faudrait-il sans tableau ?\nEt avec un tableau ?',
        starter: '',
        hints: [
          'Pense à ce que tu verrais dans la section VARIABLES pour chaque cas.',
          'Sans tableau : une variable par élève. Avec tableau : une seule variable, quelle que soit la taille.',
          'Sans tableau = 50 variables (note1...note50). Avec tableau = 1 seule variable de taille 50.',
        ],
        validation: [
          {
            id: 'reponse-sans',
            test: (c) => /50/.test(c),
            success: 'Tu as bien compté : 50 variables sans tableau.',
            error: 'Combien d\'élèves y a-t-il ? Combien de variables faudrait-il ?',
          },
          {
            id: 'reponse-avec',
            test: (c) => /1|un(e?)\s+seul/i.test(c),
            success: 'Correct : avec un tableau, une seule variable suffit !',
            error: 'Avec un tableau, combien de variables sont nécessaires, quelle que soit la taille ?',
          },
        ],
        answer: 'Sans tableau : 50 variables.\nAvec tableau : 1 seule variable contenant 50 valeurs.',
      },
    },

    // ── ÉTAPE 2 ───────────────────────────────────────────────
    {
      id: 2,
      type: 'learn',
      badge: 'Étape 1',
      title: 'Déclarer et initialiser un tableau',
      objective: 'Savoir écrire la déclaration d\'un tableau en pseudocode et y affecter des valeurs.',
      intro: {
        text: 'En algorithmique, un tableau se déclare dans la section VARIABLES avec son nom, sa taille et le type de ses éléments.',
        tone: 'neutral',
      },
      illustration: 'array-boxes',
      codeBlocks: [
        {
          id: 'syntax',
          label: 'Syntaxe de déclaration',
          language: 'algo',
          type: 'neutral',
          code: `// Forme générale :
// nom : TABLEAU[taille] DE type

VARIABLES :
  notes      : TABLEAU[5] D'ENTIERS
  prenoms    : TABLEAU[3] DE CHAINES
  actif      : TABLEAU[4] DE BOOLEENS`,
          comment: null,
        },
        {
          id: 'init',
          label: 'Initialisation et accès',
          language: 'algo',
          type: 'neutral',
          code: `VARIABLES :
  notes : TABLEAU[5] D'ENTIERS

DEBUT
  notes ← [15, 12, 18, 10, 14]

  notes[0] ← 15   // case 0 = premier élément
  notes[1] ← 12
  notes[4] ← 14   // case 4 = dernier

  AFFICHER(notes[0])   // → 15
  AFFICHER(notes[2])   // → 18
FIN`,
          comment: 'Attention : l\'indice commence à 0, pas à 1 !',
        },
      ],
      keyPoint: 'L\'indice (position) commence TOUJOURS à 0. Un tableau de taille N a des indices de 0 à N-1.',
      exercise: {
        type: 'code',
        question: 'À toi de jouer !',
        prompt: 'Écris un algorithme qui :\n1. Déclare un tableau de 3 températures (entières)\n2. Initialise-le avec : 22, 19, 25\n3. Affiche la 2ème température',
        starter: `VARIABLES :
  // écris ici ta déclaration

DEBUT
  // initialise et affiche
FIN`,
        hints: [
          'La déclaration suit ce modèle : nom : TABLEAU[taille] D\'ENTIERS',
          'Pour initialiser : temperatures ← [22, 19, 25]\nPour accéder au 2ème élément, utilise l\'indice 1.',
          'AFFICHER(temperatures[1]) affiche le 2ème élément (indice 1 car on commence à 0).',
        ],
        validation: [
          {
            id: 'declaration',
            test: (c) => /TABLEAU\s*\[\s*3\s*\]/.test(norm(c)),
            success: 'Bonne déclaration : TABLEAU[3] est correct !',
            error: 'Déclare un tableau de taille 3 : nom : TABLEAU[3] D\'ENTIERS',
          },
          {
            id: 'init',
            test: (c) => /\[22/.test(c) || /\[22,/.test(c) || norm(c).includes('[0] ← 22'),
            success: 'Initialisation correcte !',
            error: 'Initialise le tableau avec [22, 19, 25] ou case par case.',
          },
          {
            id: 'afficher',
            test: (c) => /AFFICHER\s*\(\s*\w+\s*\[\s*1\s*\]\s*\)/i.test(c),
            success: 'Parfait ! AFFICHER(temperatures[1]) affiche bien la 2ème valeur.',
            error: 'Pour afficher la 2ème température, utilise AFFICHER(nomTableau[1]).',
          },
        ],
        answer: `VARIABLES :
  temperatures : TABLEAU[3] D'ENTIERS

DEBUT
  temperatures ← [22, 19, 25]
  AFFICHER(temperatures[1])   // → 19
FIN`,
      },
    },

    // ── ÉTAPE 3 ───────────────────────────────────────────────
    {
      id: 3,
      type: 'learn',
      badge: 'Étape 2',
      title: 'Parcourir les éléments avec une boucle',
      objective: 'Savoir utiliser une boucle POUR pour visiter chaque case du tableau.',
      intro: {
        text: 'Parcourir un tableau = visiter chaque case une par une. La boucle POUR est l\'outil parfait : elle fait avancer l\'indice automatiquement.',
        tone: 'neutral',
      },
      illustration: 'loop-trace',
      codeBlocks: [
        {
          id: 'basic-loop',
          label: 'Boucle POUR — parcours simple',
          language: 'algo',
          type: 'neutral',
          code: `VARIABLES :
  notes : TABLEAU[5] D'ENTIERS
  i     : ENTIER

DEBUT
  notes ← [15, 12, 18, 10, 14]

  POUR i DE 0 À 4 FAIRE
    AFFICHER(notes[i])
  FIN POUR
FIN

// Résultat :
// 15  12  18  10  14`,
          comment: 'i prend les valeurs 0, 1, 2, 3, 4 successivement.',
        },
        {
          id: 'with-message',
          label: 'Parcours avec message formaté',
          language: 'algo',
          type: 'neutral',
          code: `POUR i DE 0 À 4 FAIRE
  AFFICHER("Élève ", i+1, " : ", notes[i], "/20")
FIN POUR

// Élève 1 : 15/20
// Élève 2 : 12/20 ...`,
          comment: 'On écrit i+1 pour que la numérotation commence à 1 dans l\'affichage.',
        },
        {
          id: 'trace',
          label: 'Trace d\'exécution',
          language: 'algo',
          type: 'trace',
          code: `// Tour 1 : i=0 → notes[0]=15 → AFFICHER(15)
// Tour 2 : i=1 → notes[1]=12 → AFFICHER(12)
// Tour 3 : i=2 → notes[2]=18 → AFFICHER(18)
// Tour 4 : i=3 → notes[3]=10 → AFFICHER(10)
// Tour 5 : i=4 → notes[4]=14 → AFFICHER(14)
// Stop   : i=5 > 4 → boucle terminée`,
          comment: null,
        },
      ],
      keyPoint: 'La boucle POUR i DE 0 À N-1 est le pattern standard pour parcourir un tableau de taille N.',
      exercise: {
        type: 'code',
        question: 'À toi de jouer !',
        prompt: 'Écris l\'algorithme qui parcourt scores ← [450, 320, 580, 210, 495]\net affiche "Partie X : Y points" pour chaque score.',
        starter: `VARIABLES :
  scores : TABLEAU[5] D'ENTIERS
  i      : ENTIER

DEBUT
  scores ← [450, 320, 580, 210, 495]

  // écris ta boucle ici

FIN`,
        hints: [
          'Utilise une boucle POUR i DE 0 À 4 FAIRE ... FIN POUR.',
          'Dans la boucle : AFFICHER("Partie ", i+1, " : ", scores[i], " points")',
          'i+1 donne le numéro de partie (1 à 5). scores[i] donne le score courant.',
        ],
        validation: [
          {
            id: 'pour',
            test: (c) => /POUR\s+\w+\s+DE\s+0\s+À\s+4/i.test(c),
            success: 'Structure POUR i DE 0 À 4 correcte !',
            error: 'La boucle doit commencer à 0 et aller jusqu\'à 4 : POUR i DE 0 À 4 FAIRE',
          },
          {
            id: 'fin-pour',
            test: (c) => /FIN\s+POUR/i.test(c),
            success: 'FIN POUR présent !',
            error: 'N\'oublie pas de fermer ta boucle avec FIN POUR.',
          },
          {
            id: 'afficher-boucle',
            test: (c) => /AFFICHER.*scores?\s*\[\s*i\s*\]/i.test(c),
            success: 'Tu affiches bien scores[i] dans la boucle !',
            error: 'Dans la boucle, affiche scores[i] pour accéder au score courant.',
          },
          {
            id: 'numero',
            test: (c) => /i\s*\+\s*1/i.test(c),
            success: 'Bien vu ! i+1 donne des numéros de 1 à 5.',
            error: 'Utilise i+1 pour afficher le numéro de partie (1, 2, 3... au lieu de 0, 1, 2...).',
          },
        ],
        answer: `VARIABLES :
  scores : TABLEAU[5] D'ENTIERS
  i      : ENTIER

DEBUT
  scores ← [450, 320, 580, 210, 495]

  POUR i DE 0 À 4 FAIRE
    AFFICHER("Partie ", i+1, " : ", scores[i], " points")
  FIN POUR
FIN`,
      },
    },

    // ── ÉTAPE 4 ───────────────────────────────────────────────
    {
      id: 4,
      type: 'learn',
      badge: 'Étape 3',
      title: 'Calculer la somme des éléments',
      objective: 'Utiliser une variable accumulateur pour additionner tous les éléments d\'un tableau.',
      intro: {
        text: 'Pour faire la somme, on utilise un accumulateur : une variable initialisée à 0 qui accumule les valeurs au fur et à mesure de la boucle.',
        tone: 'neutral',
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
  total ← 0

  POUR i DE 0 À 4 FAIRE
    total ← total + notes[i]
  FIN POUR

  AFFICHER("Somme : ", total)   // → 69
FIN`,
          comment: 'total doit être initialisé à 0 AVANT la boucle.',
        },
        {
          id: 'trace-sum',
          label: 'Trace de l\'accumulateur',
          language: 'algo',
          type: 'trace',
          code: `total ← 0
// Tour 1 : total = 0  + 15 = 15
// Tour 2 : total = 15 + 12 = 27
// Tour 3 : total = 27 + 18 = 45
// Tour 4 : total = 45 + 10 = 55
// Tour 5 : total = 55 + 14 = 69
AFFICHER(total)   // → 69`,
          comment: null,
        },
        {
          id: 'average',
          label: 'Extension — calculer la moyenne',
          language: 'algo',
          type: 'bonus',
          code: `moyenne ← total / 5
AFFICHER("Total   : ", total)     // → 69
AFFICHER("Moyenne : ", moyenne)   // → 13.8`,
          comment: 'La variable moyenne doit être de type REEL.',
        },
      ],
      keyPoint: 'Pattern accumulateur : (1) total ← 0 avant la boucle, (2) total ← total + tab[i] dans la boucle, (3) AFFICHER(total) après.',
      exercise: {
        type: 'code',
        question: 'Projet complet — combine tout !',
        prompt: 'Écris l\'algorithme COMPLET qui :\n1. Déclare scores ← [450, 320, 580, 210, 495]\n2. Affiche chaque score "Partie X : Y points"\n3. Calcule et affiche le total\n4. Calcule et affiche la moyenne',
        starter: `VARIABLES :
  scores   : TABLEAU[5] D'ENTIERS
  i, total : ENTIER
  moyenne  : REEL

DEBUT
  scores ← [450, 320, 580, 210, 495]

  // 1. Affichage de chaque score


  // 2. Calcul de la somme
  total ← 0


  // 3. Moyenne

FIN`,
        hints: [
          'Il te faut deux boucles POUR séparées : une pour l\'affichage, une pour la somme.',
          'Dans la première boucle : AFFICHER("Partie ", i+1, ..., scores[i], ...)\nDans la seconde : total ← total + scores[i]',
          'Après les boucles : moyenne ← total / 5, puis AFFICHER les deux résultats.',
        ],
        validation: [
          {
            id: 'declaration-ok',
            test: (c) => /TABLEAU\s*\[\s*5\s*\]/i.test(c),
            success: 'Déclaration TABLEAU[5] correcte.',
            error: 'Déclare le tableau avec TABLEAU[5] D\'ENTIERS.',
          },
          {
            id: 'affichage-boucle',
            test: (c) => /AFFICHER.*scores?\s*\[\s*i\s*\]/i.test(c),
            success: 'Affichage de scores[i] dans la boucle.',
            error: 'Première boucle : affiche scores[i] à chaque tour.',
          },
          {
            id: 'total-init',
            test: (c) => /total\s*←\s*0/i.test(c),
            success: 'Accumulateur initialisé à 0.',
            error: 'Initialise total ← 0 avant la boucle de calcul.',
          },
          {
            id: 'accumulation',
            test: (c) => /total\s*←\s*total\s*\+/i.test(c),
            success: 'Pattern accumulateur total ← total + scores[i] présent !',
            error: 'Dans la boucle de somme : total ← total + scores[i]',
          },
          {
            id: 'moyenne',
            test: (c) => /moyenne\s*←\s*total\s*\/\s*5/i.test(c),
            success: 'Calcul de la moyenne correct !',
            error: 'Calcule la moyenne : moyenne ← total / 5',
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
