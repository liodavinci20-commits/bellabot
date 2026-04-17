// ─────────────────────────────────────────────────────────────
// Leçon : Les tableaux en C
// Profil : Visuel + Séquentiel  (le "constructeur méthodique")
// Approche pédagogique :
//   - Progression annoncée dès le départ : 5 étapes numérotées
//   - Schéma visuel AVANT chaque ligne de code
//   - Chaque étape s'appuie explicitement sur la précédente
//   - Exercices de complétion : l'élève remplit des parties manquantes
//   - Validation confirmée avant de passer à l'étape suivante
// ─────────────────────────────────────────────────────────────

export const LESSON_ARRAYS_VISUEL_SEQUENTIEL = {
  id: 'arrays-visuel-sequentiel',
  subject: 'Les tableaux en C',
  profile: 'Visuel · Séquentiel',

  steps: [

    /* ═══════════════════════════════════════════════════════
       ÉTAPE 1 — Déclarer un tableau
    ═══════════════════════════════════════════════════════ */
    {
      id: 'declaration',
      badge: 'Étape 1 sur 5 · Déclaration',
      title: 'Déclarer un tableau',
      objective: `Comprendre ce que signifie "réserver de la mémoire", lire l'anatomie exacte d'une déclaration de tableau, et écrire la première ligne de code correctement.`,

      intro: {
        text: `Cette leçon sur les tableaux en C est organisée en 5 étapes dans un ordre précis : 1. Déclaration → 2. Accès → 3. Modification → 4. Recherche → 5. Parcours. Chaque étape s'appuie sur la précédente — tu ne passeras à la suivante qu'une fois celle-ci bien comprise. Commençons par l'étape 1. Déclarer un tableau, c'est demander à l'ordinateur : "Réserve-moi X cases en mémoire pour des nombres entiers, et appelle cet espace par ce nom." Regarde le schéma ci-dessous : tu verras d'abord les cases vides (l'espace réservé), puis l'anatomie de la ligne de code qui les crée, et enfin les cases une fois remplies.`,
      },

      illustration: 'annotated-declaration-c',

      codeBlocks: [
        {
          id: 'declaration-vide',
          label: 'Voici la syntaxe — déclarer sans valeurs',
          code: `// Syntaxe : type  nom  [taille] ;
int notes[5];
//  ↑     ↑    ↑
//  │     │    └── 5 cases réservées (taille fixée une fois pour toutes)
//  │     └── le nom du tableau (tu le choisis)
//  └── le type de chaque case (int = nombre entier)

// À ce stade, les 5 cases existent en mémoire mais sont vides (valeurs inconnues)`,
          type: 'neutral',
          comment: `Une seule ligne crée 5 cases d'un coup. Sans tableau, il faudrait écrire : int note1; int note2; int note3; int note4; int note5; — 5 lignes pour 5 valeurs, ingérable dès que le nombre grandit.`,
        },
        {
          id: 'initialisation',
          label: 'Exemple — déclarer ET remplir en une ligne',
          code: `// Syntaxe : type  nom  [taille]  =  { valeur0, valeur1, ... } ;
int notes[5] = {12, 8, 15, 9, 14};
//               ↑   ↑   ↑  ↑  ↑
//              [0] [1] [2] [3] [4]  ← les indices des cases (commencent à 0)

// Résultat en mémoire :
// ┌────┬────┬────┬────┬────┐
// │ 12 │  8 │ 15 │  9 │ 14 │
// └────┴────┴────┴────┴────┘
//  [0]  [1]  [2]  [3]  [4]`,
          type: 'good',
          comment: `Les valeurs entre accolades sont placées dans les cases dans l'ordre : la première valeur (12) va en case [0], la deuxième (8) en case [1], etc. L'indice 0 correspond toujours à la première case.`,
        },
        {
          id: 'piege-taille',
          label: 'Ce qu\'il faut retenir — la taille est fixée',
          code: `int notes[5] = {12, 8, 15, 9, 14};  // ✅ 5 valeurs pour 5 cases

// ❌ Erreur : trop de valeurs
int notes[3] = {12, 8, 15, 9, 14};  // ERREUR — 5 valeurs mais seulement 3 cases

// ❌ Erreur : taille variable
int n = 5;
int notes[n];  // INTERDIT en C standard (sauf VLA, à éviter)`,
          type: 'neutral',
          comment: `La taille du tableau DOIT être un nombre entier connu à la compilation. C'est une règle stricte du langage C. Cette contrainte garantit en échange un accès ultra-rapide à chaque case.`,
        },
      ],

      keyPoint: `Pour déclarer un tableau en C : int nom[taille]; pour réserver les cases, ou int nom[taille] = {val0, val1, ...}; pour les remplir immédiatement. Le nombre entre crochets est la taille — il est fixé définitivement. Les indices vont de [0] à [taille-1].`,

      exercise: {
        type: 'code',
        question: 'Étape 1 — À toi de déclarer',
        prompt: `Applique exactement ce que tu viens de voir :

1. Déclare un tableau de 6 entiers nommé "scores" et initialise-le avec les valeurs : 45, 32, 67, 28, 55, 41
2. Déclare un tableau vide de 10 entiers nommé "resultats" (sans initialisation)
3. Affiche le nombre de cases du tableau "scores" avec : printf("Taille : %d\\n", 6);

Rappel de la syntaxe :
  int nomTableau[taille] = {val0, val1, val2, ...};`,
        starter: `#include <stdio.h>

int main() {
    // 1. Déclare et initialise le tableau "scores" de 6 entiers
    //    Syntaxe : int nom[taille] = {valeurs...};


    // 2. Déclare le tableau vide "resultats" de 10 entiers
    //    Syntaxe : int nom[taille];


    // 3. Affiche la taille du tableau "scores"
    printf("Taille : %d\\n", 6);

    return 0;
}`,
        hints: [
          `int scores[6] = {45, 32, 67, 28, 55, 41}; — 6 valeurs entre accolades, séparées par des virgules.`,
          `int resultats[10]; — sans accolades, les cases existent mais leurs valeurs sont indéterminées.`,
          `Le printf est déjà écrit dans le starter — tu n'as qu'à déclarer les deux tableaux au-dessus.`,
        ],
        validation: [
          {
            id: 'scores-decl',
            test: (c) => /int\s+scores\s*\[\s*6\s*\]/i.test(c),
            success: 'Étape 1a ✓ — tableau "scores" déclaré avec la bonne taille [6].',
            error: 'Déclare : int scores[6] = {45, 32, 67, 28, 55, 41}; — exactement 6 cases pour 6 valeurs.',
          },
          {
            id: 'scores-init',
            test: (c) => /\{\s*45\s*,\s*32\s*,\s*67\s*,\s*28\s*,\s*55\s*,\s*41\s*\}/.test(c),
            success: 'Étape 1b ✓ — les 6 valeurs sont dans le bon ordre.',
            error: 'Les valeurs doivent être dans cet ordre exact : {45, 32, 67, 28, 55, 41}',
          },
          {
            id: 'resultats-decl',
            test: (c) => /int\s+resultats\s*\[\s*10\s*\]/i.test(c),
            success: 'Étape 1c ✓ — tableau "resultats" de 10 cases vides déclaré.',
            error: 'Déclare : int resultats[10]; — 10 cases vides, sans valeurs initiales.',
          },
        ],

        errorPatterns: [

          /* ── E1 : scores sans crochets ────────────────────────── */
          {
            id: 'eq1-scores-no-brackets',
            errorProfile: 'tableau-variable-simple',
            title: 'Étape 1 — "scores" déclaré sans crochets de taille',
            detect: (c) => /int\s+scores\b/.test(c) && !/int\s+scores\s*\[/.test(c),
            message: `Tu as écrit "int scores" comme une variable simple, sans taille entre crochets. La syntaxe correcte est : int scores[6] = {...}. Les crochets [6] disent au programme "réserve 6 cases". Sans eux, aucune case n'est créée.`,
            analogy: `Un tableau sans crochets, c'est comme demander un classeur sans préciser le nombre d'intercalaires. Le classeur n'a aucune section numérotée.`,
            adaptedSteps: {
              acces: {
                reminder: { text: `Étape 1 → Étape 2 : tu avais écrit scores sans crochets. Les crochets [6] créent les 6 cases que l'on va accéder ici.` },
                intro: `À l'étape 1 tu avais déclaré scores sans crochets. Pour pouvoir écrire scores[0], scores[2]... à cette étape, les cases doivent exister — et elles n'existent que grâce à int scores[6]. Les crochets de la déclaration créent les cases. Les crochets de l'accès les ciblent. C'est le même symbole, deux rôles différents, dans un ordre précis.`,
                keyPoint: `Progression Étape 1 → 2 : int scores[6] (déclaration) crée les cases [0] à [5]. scores[0], scores[2]... (accès) les ciblent. Sans [6] à l'étape 1, l'étape 2 est impossible.`,
                extraCodeBlocks: [
                  {
                    position: 'before',
                    id: 'seq-no-brackets',
                    label: 'Étape 1 sans crochets → Étape 2 impossible',
                    code: `// ✗ Étape 1 incorrecte — sans crochets
int scores;                    // 0 case créée
// → Étape 2 impossible : scores[0] n'existe pas !

// ✓ Étape 1 correcte — avec crochets
int scores[6] = {45, 32, 67, 28, 55, 41};
// → Étape 2 possible :
//   scores[0] = 45  scores[1] = 32  scores[2] = 67
//   scores[3] = 28  scores[4] = 55  scores[5] = 41`,
                    type: 'bad',
                    comment: `La déclaration avec [6] est le prérequis de toutes les étapes suivantes. Sans elle, les étapes 2 à 5 n'ont aucune case à traiter.`,
                  },
                ],
              },
              modification: {
                reminder: { text: `Étape 1 → Étape 3 : int scores[6] crée les 6 cases que l'on va modifier ici.` },
                intro: `À l'étape 1 tu avais déclaré scores sans crochets. Pour modifier une case (scores[0] = 99), elle doit d'abord exister — ce qui nécessite int scores[6] à l'étape 1. La modification est l'étape 3 : elle s'appuie directement sur les 6 cases créées à l'étape 1. Chaque modification cible une case par son indice. Sans les 6 cases, aucun indice n'est valide.`,
                keyPoint: `Étape 1 → 3 : les cases créées à l'étape 1 (int scores[6]) sont exactement celles que tu modifies à l'étape 3 (scores[i] = valeur). La taille [6] détermine lesquelles existent.`,
              },
              recherche: {
                reminder: { text: `Étape 1 → Étape 4 : la recherche du max parcourt les 6 cases créées par int scores[6].` },
                intro: `La recherche du maximum à l'étape 4 parcourt toutes les cases de scores[0] à scores[5]. Ces 6 cases existent parce que tu as déclaré int scores[6] à l'étape 1. Sans cette déclaration correcte, la boucle de recherche n'aurait aucune case à comparer.`,
                keyPoint: `Progression Étape 1 → 4 : la déclaration [6] détermine que la boucle fait exactement 6 tours (i de 0 à 5). Taille déclarée = nombre de tours de boucle.`,
              },
              parcours: {
                reminder: { text: `Étape 1 → Étape 5 : for(int i = 0; i < 6; i++) fait 6 tours — un par case déclarée à l'étape 1.` },
                intro: `Le parcours complet à l'étape 5 utilise for(int i = 0; i < 6; i++). Ce 6 dans la condition vient directement de la taille déclarée à l'étape 1. Sans int scores[6] correct à l'étape 1, la boucle de parcours n'a pas de base correcte. Les 5 étapes sont liées : chaque étape s'appuie sur la précédente.`,
                keyPoint: `Synthèse des 5 étapes : int scores[6] (étape 1) → scores[i] accès (étape 2) → scores[i] = val modification (étape 3) → boucle i<6 recherche (étape 4) → boucle i<6 parcours (étape 5). La taille [6] est le fil conducteur.`,
              },
            },
          },

          /* ── E2 : scores taille trop petite ───────────────────── */
          {
            id: 'eq1-scores-too-small',
            errorProfile: 'taille-sous-estimee',
            title: 'Étape 1 — taille de "scores" trop petite',
            detect: (c) => {
              const m = c.match(/int\s+scores\s*\[\s*(\d+)\s*\]/i)
              return m !== null && parseInt(m[1]) < 6
            },
            message: `Tu as déclaré scores avec une taille inférieure à 6 pour stocker 6 valeurs. La taille doit correspondre exactement au nombre de valeurs. Compte les valeurs : 45, 32, 67, 28, 55, 41 → 6 valeurs → int scores[6].`,
            analogy: `C'est comme réserver 5 pages dans un cahier pour 6 leçons. La 6ème leçon n'a nulle part où aller.`,
            adaptedSteps: {
              acces: {
                reminder: { text: `Étape 1 → Étape 2 : tu avais déclaré moins de 6 cases — rappel sur la correspondance taille/valeurs.` },
                intro: `À l'étape 1 tu avais déclaré une taille inférieure à 6. En C, la taille détermine exactement quelles cases existent et lesquelles sont accessibles. Si tu déclares scores[5], la case [5] n'existe pas — scores[5] est hors limites. Regarde le tableau de correspondance ci-dessous pour voir l'impact.`,
                keyPoint: `Règle Étape 1 → 2 : taille déclarée = dernier indice valide + 1. Pour accéder à la case [5] (6ème valeur), il faut int scores[6]. Avec scores[5], le dernier indice valide est [4].`,
                extraCodeBlocks: [
                  {
                    position: 'before',
                    id: 'seq-too-small',
                    label: 'Taille trop petite — table de correspondance',
                    code: `// ✗ Taille trop petite : 5 cases pour 6 valeurs
// int scores[5] = {45, 32, 67, 28, 55, 41};
//                                       ↑ la valeur 41 n'a pas de case !
//  Cases créées :  [0]  [1]  [2]  [3]  [4]
//  Valeur 41 → cases inexistante → comportement imprévisible

// ✓ Taille exacte : 6 cases pour 6 valeurs
// int scores[6] = {45, 32, 67, 28, 55, 41};
//  [0]=45  [1]=32  [2]=67  [3]=28  [4]=55  [5]=41
//  6 valeurs → 6 cases → correspondance exacte`,
                    type: 'bad',
                    comment: `Méthode : compte les valeurs entre accolades, puis écris ce nombre entre crochets. Ici : 45, 32, 67, 28, 55, 41 → 6 valeurs → scores[6].`,
                  },
                ],
              },
              modification: {
                reminder: { text: `Étape 1 → Étape 3 : avec une taille trop petite, certaines cases n'existent pas et ne peuvent pas être modifiées.` },
                intro: `À l'étape 1 tu avais déclaré une taille trop petite. À l'étape 3, toute tentative de modifier une case inexistante (par exemple scores[5] avec une taille de 5) écrase une zone mémoire inconnue. La règle est stricte : on ne peut modifier que les cases qui ont été déclarées à l'étape 1.`,
                keyPoint: `Indices modifiables = [0] à [taille déclarée - 1]. Avec int scores[6] : indices modifiables = [0] à [5].`,
              },
              recherche: {
                reminder: { text: `Étape 1 → Étape 4 : avec une taille trop petite, la boucle de recherche oublie des valeurs.` },
                intro: `À l'étape 4, la boucle de recherche parcourt exactement taille cases. Si tu avais déclaré scores[5] pour 6 valeurs, la valeur 41 (case [5]) n'aurait jamais été comparée. Le maximum trouvé pourrait être faux — et aucun message d'erreur ne t'aurait prévenu.`,
                keyPoint: `Taille incorrecte → résultats incorrects. Taille exacte → la boucle couvre toutes les valeurs, aucune oubliée.`,
              },
              parcours: {
                reminder: { text: `Étape 1 → Étape 5 : la somme ne serait correcte que si toutes les cases sont incluses dans la boucle.` },
                intro: `À l'étape 5, la somme se calcule en ajoutant chaque case à un accumulateur. Si la taille déclarée est trop petite, certaines valeurs ne sont jamais additionnées. La somme sera incorrecte. La condition de boucle i < 6 doit correspondre à la taille réelle déclarée à l'étape 1.`,
                keyPoint: `Synthèse : la taille déclarée à l'étape 1 est le même nombre qui apparaît dans i < N aux étapes 4 et 5. Un seul nombre, trois endroits.`,
              },
            },
          },

          /* ── E3 : scores taille trop grande ───────────────────── */
          {
            id: 'eq1-scores-too-large',
            errorProfile: 'taille-surestimee',
            title: 'Étape 1 — taille de "scores" trop grande',
            detect: (c) => {
              const m = c.match(/int\s+scores\s*\[\s*(\d+)\s*\]/i)
              return m !== null && parseInt(m[1]) > 6
            },
            message: `Tu as déclaré scores avec une taille supérieure à 6 pour stocker 6 valeurs. En C, les cases non initialisées ne contiennent pas 0 — elles contiennent une valeur imprévisible. La taille doit être exactement 6.`,
            analogy: `C'est comme réserver 7 pages dans un cahier pour 6 leçons. La 7ème page existe, mais son contenu est imprévisible — elle n'est pas vide.`,
            adaptedSteps: {
              acces: {
                reminder: { text: `Étape 1 → Étape 2 : tu avais déclaré plus de 6 cases. Les cases supplémentaires ont des valeurs imprévisibles.` },
                intro: `À l'étape 1 tu avais déclaré une taille supérieure à 6. Les cases supplémentaires existent bien en mémoire, mais elles ne contiennent pas 0 — elles contiennent ce qui traînait dans cette zone mémoire avant ton programme. Accéder à scores[6] ou scores[7] à l'étape 2 donnera une valeur imprévisible.`,
                keyPoint: `Règle Étape 1 → 2 : ne jamais accéder à une case au-delà des valeurs réellement initialisées. La taille exacte garantit qu'aucune case fantôme n'est accessible.`,
                extraCodeBlocks: [
                  {
                    position: 'before',
                    id: 'seq-too-large',
                    label: 'Taille trop grande — table des cases réelles vs fantômes',
                    code: `// ✗ Taille trop grande : 7 cases pour 6 valeurs
// int scores[7] = {45, 32, 67, 28, 55, 41};
//  [0]=45  [1]=32  [2]=67  [3]=28  [4]=55  [5]=41  [6]=???
//                                                      ↑
//                                           valeur imprévisible

// ✓ Taille exacte : 6 cases pour 6 valeurs
// int scores[6] = {45, 32, 67, 28, 55, 41};
//  [0]=45  [1]=32  [2]=67  [3]=28  [4]=55  [5]=41
//  toutes les cases ont une valeur définie`,
                    type: 'bad',
                    comment: `Taille exacte = aucune case fantôme. Chaque case a une valeur connue et définie.`,
                  },
                ],
              },
              modification: {
                reminder: { text: `Étape 1 → Étape 3 : les cases fantômes (au-delà de [5]) ne doivent pas être modifiées.` },
                intro: `Avec une taille trop grande, il existe des cases fantômes au-delà des 6 valeurs réelles. Modifier une case fantôme à l'étape 3 écrase une zone mémoire inconnue. La règle est de ne modifier que les cases initialisées à l'étape 1, c'est-à-dire [0] à [5].`,
                keyPoint: `Cases sûres à modifier = [0] à [nombre de valeurs - 1] = [0] à [5] pour 6 valeurs.`,
              },
              recherche: {
                reminder: { text: `Étape 1 → Étape 4 : la boucle de recherche doit s'arrêter à i < 6, pas à i < taille déclarée si elle est trop grande.` },
                intro: `Si la boucle de recherche fait i < 7 pour un tableau de 6 valeurs réelles, elle comparera la case [6] — la case fantôme. Sa valeur imprévisible pourrait devenir le "maximum" ou le "minimum" du tableau. Le résultat serait faux. La condition de boucle doit correspondre au nombre réel de valeurs.`,
                keyPoint: `Condition de boucle = nombre de valeurs réelles, pas taille déclarée si elle est trop grande. Pour 6 valeurs : i < 6.`,
              },
              parcours: {
                reminder: { text: `Étape 1 → Étape 5 : la somme ne doit additionner que les 6 valeurs réelles, pas les cases fantômes.` },
                intro: `À l'étape 5, si la boucle fait i < 7, elle additionne la case fantôme [6] dont la valeur est imprévisible. La somme et la moyenne seront fausses. La condition i < 6 (nombre de valeurs réelles) est la seule correcte.`,
                keyPoint: `Somme correcte = boucle sur les valeurs réelles uniquement. La taille exacte à l'étape 1 garantit que toutes les conditions de boucle aux étapes 4 et 5 sont correctes.`,
              },
            },
          },

          /* ── E4 : resultats mauvaise taille ───────────────────── */
          {
            id: 'eq1-resultats-wrong-size',
            errorProfile: 'confusion-taille-tableau',
            title: 'Étape 1 — taille de "resultats" incorrecte',
            detect: (c) => {
              const m = c.match(/int\s+resultats\s*\[\s*(\d+)\s*\]/i)
              return m !== null && parseInt(m[1]) !== 10
            },
            message: `Tu as déclaré resultats avec une taille différente de 10. L'énoncé demande exactement 10 cases. Vérifie la consigne : "un tableau vide de 10 entiers nommé resultats" → int resultats[10];`,
            analogy: `C'est comme commander un cahier de la mauvaise taille. La taille doit correspondre exactement au besoin prévu.`,
            adaptedSteps: {
              acces: {
                reminder: { text: `Étape 1 → Étape 2 : la taille d'un tableau doit correspondre exactement au besoin — ni estimée, ni approximée.` },
                intro: `Tu avais déclaré resultats avec une taille incorrecte. Cela illustre une règle fondamentale de l'étape 1 : la taille d'un tableau est un contrat exact. Elle doit correspondre précisément au nombre de cases dont le programme a besoin — pas une approximation, pas "prévoir large". Pour scores tu avais 6 valeurs → [6]. Pour resultats tu as besoin de 10 cases → [10].`,
                keyPoint: `Étape 1 — règle de la taille : taille = besoin exact. Lis l'énoncé, identifie le nombre précis de cases, écris ce nombre entre crochets.`,
                extraCodeBlocks: [
                  {
                    position: 'before',
                    id: 'seq-two-arrays',
                    label: 'Deux tableaux, deux tailles différentes',
                    code: `// Étape 1 — deux déclarations avec deux tailles différentes

// Tableau 1 : 6 valeurs connues → taille exacte = 6
int scores[6] = {45, 32, 67, 28, 55, 41};
//          ↑ taille = nombre de valeurs

// Tableau 2 : 10 cases vides prévues → taille exacte = 10
int resultats[10];
//            ↑ taille = nombre de cases prévues par l'énoncé

// Règle : lire l'énoncé → identifier la taille → écrire ce nombre`,
                    type: 'good',
                    comment: `Chaque tableau a sa propre taille. scores[6] et resultats[10] sont deux déclarations indépendantes — ne pas les confondre.`,
                  },
                ],
              },
              modification: {
                reminder: { text: `Étape 1 → Étape 3 : chaque tableau a sa propre taille — modification dans les limites de la taille déclarée.` },
                intro: `À l'étape 3, pour modifier une case de resultats, il faut que cette case existe — ce qui dépend de la taille déclarée à l'étape 1. Avec int resultats[10], les cases valides sont [0] à [9]. Avec une taille incorrecte, certaines cases seraient inaccessibles ou fantômes.`,
                keyPoint: `Modification valide = indice dans [0, taille-1]. Pour resultats[10] : indices valides = [0] à [9].`,
              },
              recherche: {
                reminder: { text: `Étape 1 → Étape 4 : la boucle de recherche sur resultats devra faire i < 10 — correspondant à la taille déclarée.` },
                intro: `Quand tu chercheras le max ou le min dans resultats à l'étape 4, ta boucle devra faire i < 10. Ce 10 vient directement de la taille déclarée à l'étape 1. Si la taille était incorrecte, la boucle chercherait dans trop peu ou trop de cases.`,
                keyPoint: `Taille à l'étape 1 = condition de boucle aux étapes 4 et 5. Taille exacte = résultats corrects.`,
              },
              parcours: {
                reminder: { text: `Étape 1 → Étape 5 : la somme de resultats s'effectuera avec for(i = 0; i < 10; i++) — correspondant à la taille déclarée.` },
                intro: `Le parcours de resultats à l'étape 5 utilisera la condition i < 10 — exactement la taille que tu as déclarée à l'étape 1. Les 5 étapes sont un enchaînement : la taille de l'étape 1 se répercute dans les conditions de boucle des étapes 4 et 5. Déclarer la bonne taille au départ garantit que tout le reste est cohérent.`,
                keyPoint: `Les 5 étapes forment une chaîne : la taille déclarée à l'étape 1 est le fondement de tout ce qui suit. Une taille incorrecte au départ compromet toutes les étapes suivantes.`,
              },
            },
          },

        ],
      },
    },

    /* ═══════════════════════════════════════════════════════
       ÉTAPE 2 — Accéder à une case
    ═══════════════════════════════════════════════════════ */
    {
      id: 'acces',
      badge: 'Étape 2 sur 5 · Accès',
      title: 'Lire la valeur d\'une case',
      objective: `Savoir accéder à une case précise par son indice, comprendre pourquoi les indices commencent à 0, et utiliser printf pour afficher la valeur d'une case.`,

      intro: {
        text: `Étape 1 validée : tu sais déclarer un tableau et le remplir. Passons à l'étape 2. Maintenant que les cases existent et contiennent des valeurs, comment lire ce qu'il y a dans une case précise ? La réponse est simple et toujours la même : on écrit le nom du tableau suivi de l'indice entre crochets. Regarde le schéma ci-dessous — une flèche pointe vers la case [2] et montre sa valeur. Ensuite, la ligne de code qui produit ce résultat. Point crucial à retenir : les indices commencent à 0, pas à 1. La première case est [0], la deuxième est [1], la troisième est [2].`,
      },

      illustration: 'array-access-c',

      codeBlocks: [
        {
          id: 'acces-syntaxe',
          label: 'Voici la syntaxe — lire une case',
          code: `int notes[5] = {12, 8, 15, 9, 14};
//               [0] [1] [2] [3] [4]

// Syntaxe pour lire : printf("%d", nomTableau[indice]);
printf("%d\\n", notes[0]);  // affiche 12  ← 1ère case
printf("%d\\n", notes[1]);  // affiche 8   ← 2ème case
printf("%d\\n", notes[2]);  // affiche 15  ← 3ème case
printf("%d\\n", notes[4]);  // affiche 14  ← 5ème et dernière case`,
          type: 'good',
          comment: `Mémorise ce lien : "3ème case" = indice [2]. Le décalage de 1 entre "rang" et "indice" est déroutant au début, mais devient automatique avec la pratique. La règle est : indice = rang - 1.`,
        },
        {
          id: 'acces-variable',
          label: 'Exemple — stocker la valeur dans une variable',
          code: `int notes[5] = {12, 8, 15, 9, 14};

// On peut aussi stocker la valeur dans une variable
int meilleure_note = notes[2];    // meilleure_note vaut 15
int premiere_note  = notes[0];    // premiere_note vaut 12

printf("Meilleure note : %d\\n", meilleure_note);  // affiche 15
printf("Première note  : %d\\n", premiere_note);   // affiche 12`,
          type: 'neutral',
          comment: `notes[2] est une expression comme n'importe quelle autre — tu peux l'utiliser partout où tu utiliserais un entier : dans un printf, dans une affectation, dans un calcul, dans une condition.`,
        },
        {
          id: 'acces-piege',
          label: 'Ce qu\'il faut retenir — ne pas dépasser la taille',
          code: `int notes[5] = {12, 8, 15, 9, 14};
// Indices valides : [0], [1], [2], [3], [4]

printf("%d", notes[4]);  // ✅ dernier indice valide = taille - 1 = 4
printf("%d", notes[5]);  // ❌ ERREUR — case [5] n'existe pas !
printf("%d", notes[-1]); // ❌ ERREUR — les indices négatifs n'existent pas`,
          type: 'neutral',
          comment: `C ne détecte pas automatiquement ce dépassement — le programme peut afficher n'importe quoi ou planter. C'est l'un des bugs les plus fréquents avec les tableaux. Toujours vérifier que l'indice est entre 0 et taille-1.`,
        },
      ],

      keyPoint: `Pour lire la valeur d'une case : printf("%d", nomTableau[indice]); — c'est tout. Les indices vont de [0] (première case) à [taille-1] (dernière case). Pour un tableau de 5 cases, les indices valides sont 0, 1, 2, 3, 4.`,

      exercise: {
        type: 'code',
        question: 'Étape 2 — À toi d\'accéder aux cases',
        prompt: `Applique ce que tu viens de voir sur l'accès aux cases.

Avec le tableau int temps[7] = {28, 31, 25, 33, 30, 27, 29} :

1. Affiche la température du 1er jour (indice 0)
2. Affiche la température du 3ème jour (indice 2)
3. Affiche la température du dernier jour (indice 6)
4. Stocke la valeur de la case [3] dans une variable "jour4" et affiche-la

Rappel : les indices commencent à 0 — le 3ème jour est à l'indice 2.`,
        starter: `#include <stdio.h>

int main() {
    int temp[7] = {28, 31, 25, 33, 30, 27, 29};
    //             [0] [1] [2] [3] [4] [5] [6]

    // 1. Affiche le 1er jour (indice 0) → attendu : 28
    printf("Jour 1 : %d\\n", temp[___]);

    // 2. Affiche le 3ème jour (indice 2) → attendu : 25
    printf("Jour 3 : %d\\n", temp[___]);

    // 3. Affiche le dernier jour (indice 6) → attendu : 29
    printf("Dernier : %d\\n", temp[___]);

    // 4. Stocke temp[3] dans une variable "jour4" et affiche-la
    int jour4 = temp[___];
    printf("Jour 4 : %d\\n", jour4);

    return 0;
}`,
        hints: [
          `1er jour → indice 0 : printf("Jour 1 : %d\\n", temp[0]); — attendu : 28`,
          `3ème jour → indice 2 : printf("Jour 3 : %d\\n", temp[2]); — attendu : 25`,
          `Dernier jour → indice 6 (taille 7, donc dernier = 7-1 = 6) : temp[6] — attendu : 29`,
          `int jour4 = temp[3]; — la case [3] contient 33.`,
        ],
        test: (code) =>
          /temp\[0\]/.test(code) &&
          /temp\[2\]/.test(code) &&
          /temp\[6\]/.test(code) &&
          /jour4\s*=\s*temp\[3\]/.test(code) &&
          /printf.*jour4/.test(code),
      },
    },

    /* ═══════════════════════════════════════════════════════
       ÉTAPE 3 — Modifier une case
    ═══════════════════════════════════════════════════════ */
    {
      id: 'modification',
      badge: 'Étape 3 sur 5 · Modification',
      title: 'Modifier la valeur d\'une case',
      objective: `Savoir écrire une nouvelle valeur dans une case précise, visualiser l'effet d'une modification (avant/après), et comprendre que seule la case ciblée change.`,

      intro: {
        text: `Étape 2 validée : tu sais lire n'importe quelle case par son indice. Passons à l'étape 3. Lire une case, c'est notes[2]. Modifier une case, c'est presque identique — on ajoute juste "= nouvelle_valeur" à droite. Regarde le schéma ci-dessous : il montre l'état du tableau avant et après une modification. Une seule case change, les autres restent intactes. C'est la règle : chaque modification est ciblée, chirurgicale. Il n'y a aucun risque de toucher aux autres cases par accident.`,
      },

      illustration: 'array-before-after-c',

      codeBlocks: [
        {
          id: 'modif-syntaxe',
          label: 'Voici la syntaxe — modifier une case',
          code: `int notes[5] = {12, 8, 15, 9, 14};
//               [0] [1] [2] [3] [4]

// Syntaxe pour modifier : nomTableau[indice] = nouvelle_valeur;
notes[1] = 20;
// Résultat : {12, 20, 15, 9, 14}
//                 ↑ seulement la case [1] a changé

notes[3] = 0;
// Résultat : {12, 20, 15, 0, 14}
//                         ↑ seulement la case [3] a changé`,
          type: 'good',
          comment: `La syntaxe est identique à l'accès (notes[1]), on ajoute juste "= valeur" à la fin. C'est comme pour une variable ordinaire : si x = 5 devient x = 10, ici notes[1] = 8 devient notes[1] = 20.`,
        },
        {
          id: 'modif-depuis-var',
          label: 'Exemple — modifier depuis une variable ou une expression',
          code: `int notes[5] = {12, 8, 15, 9, 14};

// On peut affecter une variable
int nouvelle = 18;
notes[0] = nouvelle;       // case [0] prend la valeur de la variable → 18

// On peut affecter un calcul
notes[2] = notes[2] + 5;   // case [2] = 15 + 5 = 20
notes[4] = notes[4] * 2;   // case [4] = 14 × 2 = 28

// Tableau final : {18, 8, 20, 9, 28}`,
          type: 'neutral',
          comment: `notes[2] = notes[2] + 5 se lit de droite à gauche : "lis la valeur de notes[2] (15), ajoute 5, puis remets le résultat (20) dans notes[2]". L'ancienne valeur est définitivement écrasée.`,
        },
      ],

      keyPoint: `Pour modifier une case : nomTableau[indice] = nouvelle_valeur; — la syntaxe est identique à l'accès, avec "= valeur" en plus. Seule la case ciblée change. Les autres restent intactes. L'ancienne valeur est définitivement perdue.`,

      exercise: {
        type: 'code',
        question: 'Étape 3 — À toi de modifier des cases',
        prompt: `Applique ce que tu viens de voir sur la modification.

Avec le tableau int scores[5] = {10, 20, 30, 40, 50} :

1. Remplace la valeur de la case [0] par 99
2. Remplace la valeur de la case [4] (dernière) par 1
3. Double la valeur de la case [2] (scores[2] = scores[2] * 2)
4. Affiche toutes les cases après les modifications avec 5 printf séparés

Résultat attendu : 99, 20, 60, 40, 1`,
        starter: `#include <stdio.h>

int main() {
    int scores[5] = {10, 20, 30, 40, 50};

    // 1. Remplace la case [0] par 99
    scores[___] = ___;

    // 2. Remplace la case [4] par 1
    scores[___] = ___;

    // 3. Double la case [2]
    scores[2] = scores[2] ___ ___;

    // 4. Affiche les 5 cases — résultat attendu : 99, 20, 60, 40, 1
    printf("%d\\n", scores[0]);
    printf("%d\\n", scores[1]);
    printf("%d\\n", scores[2]);
    printf("%d\\n", scores[3]);
    printf("%d\\n", scores[4]);

    return 0;
}`,
        hints: [
          `scores[0] = 99; — remplace la première case par 99.`,
          `scores[4] = 1; — remplace la dernière case par 1.`,
          `scores[2] = scores[2] * 2; — 30 × 2 = 60, la case [2] passe de 30 à 60.`,
          `Les 5 printf sont déjà écrits dans le starter — tu n'as qu'à faire les 3 modifications au-dessus.`,
        ],
        test: (code) =>
          /scores\[0\]\s*=\s*99/.test(code) &&
          /scores\[4\]\s*=\s*1/.test(code) &&
          /scores\[2\]\s*=\s*scores\[2\]\s*\*\s*2/.test(code) &&
          /printf/.test(code),
      },
    },

    /* ═══════════════════════════════════════════════════════
       ÉTAPE 4 — Rechercher le min et le max
    ═══════════════════════════════════════════════════════ */
    {
      id: 'recherche',
      badge: 'Étape 4 sur 5 · Recherche',
      title: 'Trouver le minimum et le maximum',
      objective: `Comprendre l'algorithme de recherche du max (et du min) dans un tableau, l'écrire en C avec une boucle et une condition, et l'appliquer sur un tableau de données.`,

      intro: {
        text: `Étape 3 validée : tu sais lire et modifier n'importe quelle case. Passons à l'étape 4. Chercher le maximum dans un tableau, c'est faire ce que tu ferais avec le doigt sur une liste de nombres : tu pars du premier, tu retiens le plus grand vu jusqu'ici, et tu avances case par case en remettant à jour si tu trouves quelque chose de plus grand. L'algorithme est toujours le même. Regarde d'abord le schéma ci-dessous — il montre le minimum et le maximum mis en évidence dans le tableau. Ensuite, tu verras le code qui automatise cette recherche.`,
      },

      illustration: 'min-max-c',

      codeBlocks: [
        {
          id: 'algo-max',
          label: 'Voici la syntaxe — trouver le maximum',
          code: `int notes[5] = {12, 8, 15, 9, 14};
int max = notes[0];  // Étape 1 : suppose que le 1er élément est le plus grand

// Étape 2 : compare chaque case au max actuel
for(int i = 1; i < 5; i++) {   // on part de i=1, car [0] est déjà pris
    if(notes[i] > max) {        // si cette case est plus grande...
        max = notes[i];         // ...elle devient le nouveau max
    }
}
// Tour 1 (i=1) : notes[1]=8  < max=12  → max reste 12
// Tour 2 (i=2) : notes[2]=15 > max=12  → max devient 15
// Tour 3 (i=3) : notes[3]=9  < max=15  → max reste 15
// Tour 4 (i=4) : notes[4]=14 < max=15  → max reste 15

printf("Maximum : %d\\n", max);  // affiche 15`,
          type: 'good',
          comment: `Pourquoi initialiser max avec notes[0] et non avec 0 ? Si toutes les notes étaient négatives, max=0 donnerait un résultat faux. Partir de notes[0] est toujours correct, quelle que soit la plage de valeurs.`,
        },
        {
          id: 'algo-min',
          label: 'Exemple — trouver le minimum (même logique, signe inversé)',
          code: `int notes[5] = {12, 8, 15, 9, 14};
int min = notes[0];  // suppose que le 1er élément est le plus petit

for(int i = 1; i < 5; i++) {
    if(notes[i] < min) {   // ← seulement le signe change : < au lieu de >
        min = notes[i];
    }
}

printf("Minimum : %d\\n", min);  // affiche 8`,
          type: 'good',
          comment: `La structure est identique à la recherche du max — seul le signe de comparaison change. > pour le max, < pour le min. Retiens cette symétrie : tu n'as qu'une logique à apprendre, et elle couvre les deux cas.`,
        },
        {
          id: 'max-indice',
          label: 'Aller plus loin — retrouver aussi l\'indice du maximum',
          code: `int notes[5] = {12, 8, 15, 9, 14};
int max = notes[0];
int indice_max = 0;  // on mémorise aussi l'indice du maximum

for(int i = 1; i < 5; i++) {
    if(notes[i] > max) {
        max       = notes[i];  // met à jour la valeur max
        indice_max = i;         // met à jour l'indice correspondant
    }
}

printf("Max : %d (case [%d])\\n", max, indice_max);  // Max : 15 (case [2])`,
          type: 'neutral',
          comment: `Mémoriser l'indice du maximum est souvent aussi utile que la valeur elle-même — par exemple pour savoir quel élève a la meilleure note, pas seulement quelle est cette note.`,
        },
      ],

      keyPoint: `Algorithme de recherche : initialise max (ou min) avec le premier élément, puis parcours les cases avec une boucle en mettant à jour si tu trouves mieux. Seul le signe change : > pour le max, < pour le min. La structure est identique dans les deux cas.`,

      exercise: {
        type: 'code',
        question: 'Étape 4 — À toi de chercher',
        prompt: `Applique l'algorithme de recherche.

Avec le tableau int temps[7] = {28, 31, 25, 33, 30, 27, 29} :

1. Trouve et affiche la température la plus haute (maximum)
2. Trouve et affiche la température la plus basse (minimum)

Structure à suivre :
  - Initialise max et min avec temps[0]
  - Parcours les cases de i=1 à i<7
  - Compare et mets à jour avec if(...)
  - Affiche les résultats

Résultats attendus : Maximum = 33, Minimum = 25`,
        starter: `#include <stdio.h>

int main() {
    int temps[7] = {28, 31, 25, 33, 30, 27, 29};

    // Initialisation
    int max = temps[0];
    int min = temps[0];

    // Parcours de i=1 à i<7
    for(int i = 1; i < 7; i++) {
        // Mise à jour du max
        if(temps[i] ___ max) {
            max = temps[i];
        }
        // Mise à jour du min
        if(temps[i] ___ min) {
            min = temps[i];
        }
    }

    printf("Maximum : %d\\n", max);  // attendu : 33
    printf("Minimum : %d\\n", min);  // attendu : 25

    return 0;
}`,
        hints: [
          `Pour le max : if(temps[i] > max) — le signe > signifie "plus grand que".`,
          `Pour le min : if(temps[i] < min) — le signe < signifie "plus petit que".`,
          `max = temps[0]; et min = temps[0]; — on initialise les deux avec la première valeur du tableau.`,
        ],
        test: (code) =>
          /max\s*=\s*temps\[0\]/.test(code) &&
          /min\s*=\s*temps\[0\]/.test(code) &&
          /temps\[i\]\s*>\s*max/.test(code) &&
          /temps\[i\]\s*<\s*min/.test(code) &&
          /for\s*\(/.test(code) &&
          /printf.*max/.test(code) &&
          /printf.*min/.test(code),
      },
    },

    /* ═══════════════════════════════════════════════════════
       ÉTAPE 5 — Parcourir avec une boucle
    ═══════════════════════════════════════════════════════ */
    {
      id: 'parcours',
      badge: 'Étape 5 sur 5 · Parcours',
      title: 'Parcourir le tableau entier',
      objective: `Écrire une boucle for pour visiter chaque case du tableau, calculer une somme et une moyenne, et résoudre un exercice de complétion qui couvre les 5 étapes.`,

      intro: {
        text: `Étape 4 validée : tu sais chercher le min et le max. Voici la dernière étape. En fait, tu utilises déjà la boucle for depuis l'étape 4 — la recherche du max en avait besoin. Maintenant on va l'utiliser de façon complète pour parcourir toutes les cases et effectuer des calculs sur l'ensemble du tableau. La boucle for est l'outil universel de parcours : le compteur i part de 0, avance de 1 à chaque tour, et s'arrête quand il atteint la taille du tableau. À chaque tour, i est exactement l'indice de la case à traiter. Regarde la trace d'exécution ci-dessous.`,
      },

      illustration: 'loop-trace-c',

      codeBlocks: [
        {
          id: 'boucle-syntaxe',
          label: 'Voici la syntaxe — la boucle for complète',
          code: `int notes[5] = {12, 8, 15, 9, 14};

//          ┌─ initialisation ─┐  ┌─ condition ──┐  ┌─ incrément ─┐
for(         int i = 0         ;    i < 5         ;    i++          ) {
    printf("%d\\n", notes[i]);  // i vaut 0, 1, 2, 3, 4 tour à tour
}
// Tour 1 : i=0 → notes[0] = 12 → printf(12)
// Tour 2 : i=1 → notes[1] = 8  → printf(8)
// Tour 3 : i=2 → notes[2] = 15 → printf(15)
// Tour 4 : i=3 → notes[3] = 9  → printf(9)
// Tour 5 : i=4 → notes[4] = 14 → printf(14)
// i=5 : 5 < 5 est FAUX → la boucle s'arrête`,
          type: 'good',
          comment: `La condition i < 5 (et non i <= 5) est intentionnelle. Le dernier indice valide est 4. Avec i <= 5, la boucle essaierait d'accéder à notes[5] — qui n'existe pas. Toujours : condition = i < TAILLE.`,
        },
        {
          id: 'boucle-somme',
          label: 'Exemple — calculer la somme et la moyenne',
          code: `int notes[5] = {12, 8, 15, 9, 14};
int somme = 0;  // accumulateur — commence obligatoirement à 0

for(int i = 0; i < 5; i++) {
    somme = somme + notes[i];  // ajoute la case courante au total
}
// Tour 1 : somme = 0  + 12 = 12
// Tour 2 : somme = 12 + 8  = 20
// Tour 3 : somme = 20 + 15 = 35
// Tour 4 : somme = 35 + 9  = 44
// Tour 5 : somme = 44 + 14 = 58

float moyenne = somme / 5.0;  // 5.0 et non 5 → résultat décimal
//  58 / 5.0 = 11.6 ✅       (si on écrit 58 / 5 → résultat = 11 ❌)

printf("Somme   : %d\\n",   somme);    // 58
printf("Moyenne : %.1f\\n", moyenne);  // 11.6`,
          type: 'good',
          comment: `Division par 5.0 (flottant) et non par 5 (entier). En C, diviser deux entiers donne un entier — la décimale est tronquée. 58 / 5 = 11 (et non 11.6). En divisant par 5.0, C convertit la somme en flottant avant de diviser.`,
        },
        {
          id: 'exercice-final-code',
          label: 'Ce qu\'il faut retenir — les 5 opérations ensemble',
          code: `int notes[5] = {12, 8, 15, 9, 14};  // 1. Déclaration

printf("%d", notes[2]);              // 2. Accès → lit 15
notes[0] = 20;                       // 3. Modification → écrase 12 par 20

int max = notes[0];                  // 4. Recherche du max
for(int i = 1; i < 5; i++) {
    if(notes[i] > max) max = notes[i];
}

int somme = 0;                       // 5. Parcours + somme
for(int i = 0; i < 5; i++) {
    somme += notes[i];               // somme += notes[i] ≡ somme = somme + notes[i]
}
printf("Max : %d | Somme : %d\\n", max, somme);`,
          type: 'neutral',
          comment: `Tu viens de voir les 5 opérations fondamentales sur les tableaux C. Elles couvrent 90% des besoins courants. La boucle for est le fil conducteur des étapes 4 et 5 — une fois maîtrisée, les deux sont naturelles.`,
        },
      ],

      keyPoint: `La boucle for : for(int i = 0; i < TAILLE; i++) — i part de 0, avance de 1, s'arrête avant TAILLE. Pour la somme : initialise une variable à 0 avant la boucle, ajoute notes[i] à chaque tour. Pour la moyenne : divise par TAILLE.0 (avec le point décimal) pour obtenir un résultat flottant.`,

      exercise: {
        type: 'code',
        question: 'Étape 5 — Exercice de synthèse : complète le programme',
        prompt: `Cet exercice final couvre les 5 étapes dans l'ordre. Complète chaque partie marquée ___ en t'appuyant sur ce que tu as appris étape par étape.

Le programme travaille sur 6 notes d'élève.`,
        starter: `#include <stdio.h>

int main() {
    // ÉTAPE 1 — Déclaration + initialisation
    // Déclare un tableau de 6 entiers nommé "notes"
    // avec les valeurs : 14, 11, 18, 7, 15, 9
    ___ notes[___] = {___, ___, ___, ___, ___, ___};

    // ÉTAPE 2 — Accès
    // Affiche la 4ème note (indice 3)
    printf("4eme note : %d\\n", notes[___]);

    // ÉTAPE 3 — Modification
    // Remplace la 2ème note (indice 1) par 20
    notes[___] = ___;

    // ÉTAPE 4 — Recherche du max
    int max = notes[0];
    for(int i = 1; i < ___; i++) {
        if(notes[i] ___ max) {
            max = notes[i];
        }
    }
    printf("Maximum : %d\\n", max);

    // ÉTAPE 5 — Parcours : somme et moyenne
    int somme = 0;
    for(int i = 0; i < ___; i++) {
        somme = somme + notes[___];
    }
    float moy = somme / ___;
    printf("Somme : %d\\n", somme);
    printf("Moyenne : %.1f\\n", moy);

    return 0;
}`,
        hints: [
          `Étape 1 : int notes[6] = {14, 11, 18, 7, 15, 9}; — type int, taille 6, 6 valeurs.`,
          `Étape 2 : notes[3] — la 4ème note est à l'indice 3 (indices commencent à 0).`,
          `Étape 3 : notes[1] = 20; — la 2ème note est à l'indice 1.`,
          `Étape 4 : i < 6 (taille du tableau) et if(notes[i] > max).`,
          `Étape 5 : i < 6, notes[i] dans la boucle, et somme / 6.0 pour la moyenne décimale.`,
        ],
        test: (code) =>
          /int\s+notes\s*\[6\]/.test(code) &&
          /14.*11.*18.*7.*15.*9/.test(code.replace(/\s/g, '')) &&
          /notes\[3\]/.test(code) &&
          /notes\[1\]\s*=\s*20/.test(code) &&
          /for\s*\(/.test(code) &&
          /notes\[i\]\s*>\s*max/.test(code) &&
          /6\.0/.test(code) &&
          /printf.*moy/.test(code),
      },
    },

  ],
}
