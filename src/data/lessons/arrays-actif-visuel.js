import { AnimAV_BracketsPos, AnimAV_NoBrackets, AnimAV_SizeTooSmall, AnimAV_SizeTooLarge, AnimAV_OutOfBounds }
  from '../../components/learning/animations/ActifVisuelAnimations.jsx'

// ─────────────────────────────────────────────────────────────
// Leçon : Les tableaux en C
// Profil : Actif + Visuel
// Approche pédagogique :
//   - Le schéma AVANT toute ligne de code
//   - L'élève raisonne du visuel vers le code (pas l'inverse)
//   - Chaque concept est montré sous forme d'illustration animée
//   - Les exercices partent du schéma pour reconstruire le code
// ─────────────────────────────────────────────────────────────

export const LESSON_ARRAYS_ACTIF_VISUEL = {
  id: 'arrays-actif-visuel',
  subject: 'Les tableaux en C',
  profile: 'Actif · Visuel',

  steps: [

    /* ═══════════════════════════════════════════════════════
       ÉTAPE 1 — Voir la structure avant de coder
    ═══════════════════════════════════════════════════════ */
    {
      id: 'structure',
      badge: 'Étape 1 · Structure',
      title: 'Voir la structure du tableau',
      objective: `Observer le schéma d'un tableau en mémoire, comprendre ce que représente chaque case et chaque indice, puis écrire le code qui correspond.`,

      intro: {
        text: `Avant d'écrire une seule ligne de code, regarde le schéma ci-dessous. Un tableau, c'est exactement ça : une rangée de cases alignées côte à côte, chacune numérotée à partir de 0. La première case porte le numéro 0, la deuxième le numéro 1, et ainsi de suite. Ces numéros s'appellent les indices. Quand tu vois notes[2], ça signifie : "va chercher la valeur dans la case numéro 2". Regarde le schéma, repère la case 2, et vois ce qu'elle contient.`,
      },

      illustration: 'array-boxes',

      codeBlocks: [
        {
          id: 'schema-to-code',
          label: 'Ce schéma correspond à ce code',
          code: `int notes[5] = {12, 8, 15, 9, 14};
//  cases :        [0] [1] [2] [3] [4]
//
//  ┌────┬────┬────┬────┬────┐
//  │ 12 │  8 │ 15 │  9 │ 14 │   ← valeurs
//  └────┴────┴────┴────┴────┘
//    0    1    2    3    4        ← indices`,
          type: 'neutral',
          comment: `Lis le schéma de gauche à droite : case [0] = 12, case [1] = 8, case [2] = 15... Chaque case a son numéro (indice) et son contenu (valeur).`,
        },
        {
          id: 'syntax-visuelle',
          label: 'Anatomie de la déclaration',
          code: `int   notes  [5]  =  {12, 8, 15, 9, 14};
//↑     ↑      ↑           ↑
//│     │      │           └── Valeurs dans chaque case (dans l'ordre)
//│     │      └── Nombre de cases réservées
//│     └── Le nom du tableau
//└── Le type de chaque case (int = entier)`,
          type: 'good',
          comment: `Trois éléments obligatoires : le type (int), le nom (notes), la taille ([5]). Sans l'un des trois, le compilateur refuse.`,
        },
      ],

      keyPoint: `Un tableau C = des cases numérotées à partir de 0, alignées en mémoire. Quand tu écris notes[2], tu accèdes exactement à la 3ème case (celle avec l'indice 2). La taille est fixée une fois pour toutes à la déclaration — tu ne pourras pas l'agrandir ensuite.`,

      exercise: {
        type: 'code',
        question: 'Du schéma au code : déclare le tableau',
        prompt: `Voici le schéma du tableau que tu dois créer :\n\n  ┌────┬────┬────┬────┬────┐\n  │ 23 │ 17 │ 31 │  8 │ 25 │\n  └────┴────┴────┴────┴────┘\n    [0]  [1]  [2]  [3]  [4]\n\nD'après ce schéma :\n1. Déclare un tableau d'entiers nommé "points" qui correspond exactement à ce schéma\n2. Affiche la valeur de la case [2] (celle qui contient 31)\n3. Affiche la valeur de la case [4] (la dernière)`,
        starter: `#include <stdio.h>

int main() {
    // 1. Déclare le tableau selon le schéma
    //    Lis les valeurs de gauche à droite : 23, 17, 31, 8, 25

    // 2. Affiche la case [2]

    // 3. Affiche la case [4]

    return 0;
}`,
        hints: [
          `Le schéma a 5 cases : int points[5] = {23, 17, 31, 8, 25}; — les valeurs dans l'ordre du schéma, de gauche à droite.`,
          `La case [2] contient 31 : printf("%d", points[2]);`,
          `La case [4] est la dernière et contient 25 : printf("%d", points[4]);`,
        ],
        validation: [
          {
            id: 'decl-check',
            test: (c) => /int\s+points\s*\[\s*5\s*\]/i.test(c),
            success: 'Tableau "points" de 5 cases déclaré — correspond au schéma.',
            error: 'Déclare : int points[5] = {23, 17, 31, 8, 25}; — 5 cases comme dans le schéma.',
          },
          {
            id: 'init-check',
            test: (c) => /\{\s*23\s*,\s*17\s*,\s*31\s*,\s*8\s*,\s*25\s*\}/.test(c),
            success: 'Les valeurs correspondent exactement au schéma, dans le bon ordre.',
            error: 'Les valeurs doivent être dans l\'ordre du schéma : {23, 17, 31, 8, 25}',
          },
          {
            id: 'case2-check',
            test: (c) => /printf\s*\(.*points\s*\[\s*2\s*\]/i.test(c),
            success: 'Affichage de la case [2] (valeur 31) correct.',
            error: 'Pour la case [2] : printf("%d", points[2]);',
          },
        ],
        answer: `#include <stdio.h>

int main() {
    // 1. Déclare le tableau selon le schéma
    int points[5] = {23, 17, 31, 8, 25};

    // 2. Affiche la case [2] → 31
    printf("%d\\n", points[2]);

    // 3. Affiche la case [4] → 25
    printf("%d\\n", points[4]);

    return 0;
}`,
        errorPatterns: [

          /* ── E1 : "=" avant les crochets ─────────────────────── */
          {
            id: 'eq1-wrong-equals-syntax',
            errorProfile: 'syntaxe-declaration',
            detect: (c) => /int\s+points\s*=\s*\[/i.test(c),
            title: 'Syntaxe incorrecte — "=" avant les crochets',
            message: `Tu as écrit int points = [5] mais la taille se colle directement après le nom, sans "=" entre les deux. Le "=" sert uniquement à initialiser les valeurs, pas à définir la structure. Correction : int points[5]`,
            analogy: `En C on dit "tableau-à-5-cases" en collant [5] au nom — comme on écrit "boîte5" sans espace. Le = n'appartient pas à la structure, seulement aux valeurs.`,
            adaptedSteps: {
              acces: {
                reminder: { text: `Tu avais mis "=" avant les crochets — rappel sur la position des crochets dans la syntaxe.` },
                intro: `Tu avais écrit int points = [5]. L'erreur était sur la position du "=" : en C, les crochets de taille se collent directement au nom du tableau, pas après le signe égal. Cette règle est la même partout — que ce soit dans la déclaration ou dans l'accès. Quand tu écris points[2] pour accéder à la case, tu vois les crochets collés à "points". C'est exactement la même syntaxe que dans la déclaration int points[5].`,
                keyPoint: `En C, les crochets se collent TOUJOURS au nom. int points[5] pour la déclaration, points[2] pour l'accès. Le "=" n'est jamais entre le nom et les crochets.`,
                extraCodeBlocks: [
                  {
                    position: 'before',
                    id: 'anim-brackets-pos',
                    label: 'Visualisation — position des crochets',
                    type: 'animation',
                    component: AnimAV_BracketsPos,
                  },
                ],
              },
              modification: {
                reminder: { text: `Rappel : crochets collés au nom, que ce soit pour déclarer ou pour modifier.` },
                intro: `La règle des crochets collés au nom s'applique aussi aux modifications. Quand tu écris points[1] = 20, les crochets sont collés à "points" — exactement comme dans la déclaration. Le schéma avant/après montre bien ça : la flèche qui modifie une case utilise toujours la syntaxe nom[indice], jamais nom = [indice].`,
                keyPoint: `Déclaration, accès, modification : les crochets sont toujours collés au nom du tableau. C'est la règle unique à retenir.`,
              },
              boucle: {
                reminder: { text: `Rappel : dans la boucle, notes[i] — crochets collés au nom, i est l'indice.` },
                intro: `Dans la boucle for, la variable i prend la place de l'indice entre crochets : notes[i]. Les crochets sont toujours collés à "notes" — la règle ne change pas. Ce qui change, c'est que l'indice est maintenant une variable (i) au lieu d'un nombre fixe (2, 4...). La flèche se déplace automatiquement à chaque tour de boucle.`,
                keyPoint: `notes[i] dans la boucle = même syntaxe que notes[2] dans un accès direct. L'indice peut être un nombre ou une variable — les crochets restent collés au nom.`,
              },
              calculs: {
                reminder: { text: `Rappel : somme += notes[i] — les crochets de notes[i] suivent la même règle syntaxique partout.` },
                intro: `Dans les calculs, tu vas voir somme += notes[i]. Cette expression utilise notes[i] — crochets collés au nom, comme toujours. L'accumulateur lit la valeur de chaque case à tour de rôle. Visualise la flèche qui avance de case en case et verse son contenu dans "somme".`,
                keyPoint: `Trois règles : 1) somme commence à 0 ; 2) divise par 5.0 pour la moyenne ; 3) initialise min/max avec notes[0], pas avec 0.`,
              },
            },
          },

          /* ── E2 : Tableau sans crochets ──────────────────────── */
          {
            id: 'eq1-missing-brackets',
            errorProfile: 'tableau-variable-simple',
            detect: (c) => /int\s+points(?!\s*\[)/i.test(c),
            title: 'Déclaration incorrecte — il manque les crochets []',
            message: `Tu as déclaré "int points" comme une variable simple. Un tableau nécessite des crochets avec sa taille pour réserver plusieurs cases. Correction : int points[5] — les [5] signifient "réserve 5 cases en mémoire".`,
            analogy: `Imagine un vestiaire. "int tab" c'est un seul casier. "int tab[5]" c'est une rangée de 5 casiers numérotés [0] à [4]. Les crochets créent la rangée de cases.`,
            adaptedSteps: {
              acces: {
                reminder: { text: `Tu avais écrit int points sans crochets — voici pourquoi les crochets créent les cases que la flèche peut cibler.` },
                intro: `Tu avais écrit int points sans crochets — comme si tu voulais une seule case. Maintenant que tu sais que les crochets créent plusieurs cases, regarde comment la flèche d'accès fonctionne. Chaque case créée par int points[5] possède une adresse numérotée. La flèche points[i] pointe exactement sur la case numéro i. Sans les crochets à la déclaration, ces cases n'existent pas — la flèche n'a nulle part où pointer.`,
                keyPoint: `Sans [5] dans la déclaration, il n'y a pas de cases numérotées — la flèche d'accès points[i] n'a rien à cibler. Les crochets dans la déclaration créent les cases. Les crochets dans l'accès ciblent une case précise.`,
                extraCodeBlocks: [
                  {
                    position: 'before',
                    id: 'anim-no-brackets',
                    label: 'Visualisation — sans crochets vs avec crochets',
                    type: 'animation',
                    component: AnimAV_NoBrackets,
                  },
                ],
              },
              modification: {
                reminder: { text: `Rappel : c'est grâce aux crochets [5] que les 5 cases existent — chaque modification cible une case précise.` },
                intro: `Tu as compris que int points[5] crée 5 cases numérotées. Dans cette étape, tu vas voir qu'on peut modifier chaque case séparément — comme ouvrir un casier précis pour changer ce qu'il contient. Le schéma avant/après montre exactement ça : la flèche pointe sur une case, écrase la valeur, et les autres cases restent intactes.`,
                keyPoint: `Pour modifier une case : nom[indice] = nouvelle_valeur. La flèche cible une seule case, les autres ne bougent pas. Lis le schéma avant/après pour identifier quelle case a changé.`,
              },
              boucle: {
                reminder: { text: `Rappel : la boucle déplace la flèche automatiquement — une case à la fois parmi les 5 créées par [5].` },
                intro: `Maintenant que tu maîtrises la déclaration et l'accès, la boucle for va automatiser ce que tu faisais à la main — pointer sur chaque case une par une. La variable i joue le rôle de l'indice entre crochets : i = 0 → flèche sur [0], i = 1 → flèche sur [1], et ainsi de suite. Si tu n'avais pas mis [5] dans la déclaration, la boucle n'aurait aucune case sur laquelle se déplacer.`,
                keyPoint: `La boucle = flèche automatique. Elle part de [0] et avance jusqu'à [taille-1]. La condition i < 5 garantit que la flèche ne sort jamais des 5 cases créées par int points[5].`,
              },
              calculs: {
                reminder: { text: `Rappel : l'accumulateur visite chaque case grâce aux indices [0] à [4] — ces cases existent parce que tu as écrit [5].` },
                intro: `Tu connais maintenant la structure complète d'un tableau. Dans cette étape, on va parcourir toutes les cases une par une pour les additionner. Visualise l'accumulateur comme un compteur qui grossit à chaque case visitée — la flèche avance de [0] à [4] et verse le contenu de chaque case dans "somme".`,
                keyPoint: `L'accumulateur commence à 0 AVANT la boucle, pas dedans. Chaque tour de boucle ajoute une case au total. Visualise la flèche qui avance et verse.`,
              },
            },
          },

          /* ── E3a : Taille trop petite ─────────────────────────── */
          {
            id: 'eq1-size-too-small',
            errorProfile: 'taille-sous-estimee',
            detect: (c) => {
              const m = c.match(/int\s+points\s*\[\s*(\d+)\s*\]/i)
              return m !== null && parseInt(m[1]) < 5
            },
            title: 'Taille trop petite — le schéma a 5 cases',
            message: `Tu as déclaré une taille inférieure à 5 mais le schéma montre 5 cases. La taille doit correspondre exactement au nombre de cases dans le schéma. Avec une taille trop petite, la dernière valeur n'a nulle part où aller.`,
            analogy: `C'est comme commander une boîte de 4 cases pour un schéma qui en montre 5. La 5ème case du schéma n'existe pas en mémoire — et le C ne te prévient pas.`,
            adaptedSteps: {
              acces: {
                reminder: { text: `Tu avais déclaré moins de 5 cases — rappel sur la correspondance taille/schéma.` },
                intro: `Tu avais déclaré une taille inférieure à 5 alors que le schéma montre 5 cases. En C, la taille détermine exactement combien de cases existent en mémoire — et donc sur lesquelles la flèche peut pointer. Si tu déclares [4], la flèche ne peut pointer que sur [0] à [3]. La case [4] du schéma n'existe pas.`,
                keyPoint: `Taille déclarée = nombre exact de cases dans le schéma. Pour le schéma à 5 cases : int points[5]. La flèche d'accès ne peut cibler que des cases qui ont été déclarées.`,
                extraCodeBlocks: [
                  {
                    position: 'before',
                    id: 'anim-size-too-small',
                    label: 'Visualisation — taille trop petite',
                    type: 'animation',
                    component: AnimAV_SizeTooSmall,
                  },
                ],
              },
              modification: {
                reminder: { text: `Rappel : on ne peut modifier que les cases qui existent — la taille détermine lesquelles.` },
                intro: `Le schéma avant/après montre toujours 5 cases. Pour pouvoir modifier la case [4], elle doit exister — ce qui nécessite une déclaration de taille 5. Avec une taille trop petite, tenter de modifier points[4] pointe en dehors du tableau.`,
                keyPoint: `Avant de modifier une case, vérifie que son indice est dans les limites déclarées. Pour int points[5] : indices modifiables = [0] à [4].`,
              },
              boucle: {
                reminder: { text: `Rappel : la boucle tourne taille fois — si la taille est trop petite, certaines cases ne sont jamais visitées.` },
                intro: `La boucle for(int i = 0; i < taille; i++) fait autant de tours que la taille déclarée. Si tu déclares [4] mais que le tableau a 5 valeurs, la boucle ne verra jamais la 5ème. La flèche s'arrête à [3] et ne va pas jusqu'à [4].`,
                keyPoint: `La condition i < N de la boucle doit correspondre à la taille réelle déclarée. Taille trop petite = cases oubliées dans le parcours.`,
              },
              calculs: {
                reminder: { text: `Rappel : l'accumulateur ne compte que les cases déclarées — une taille trop petite fausse la somme.` },
                intro: `La somme est calculée en visitant chaque case de [0] à [taille-1]. Si la taille est trop petite, certaines valeurs du schéma ne sont jamais additionnées. Le résultat sera faux — et aucun message d'erreur ne te préviendra.`,
                keyPoint: `Taille correcte = somme correcte. Visualise chaque case du schéma : chacune doit être déclarée pour être comptée.`,
              },
            },
          },

          /* ── E3b : Taille trop grande ─────────────────────────── */
          {
            id: 'eq1-size-too-large',
            errorProfile: 'taille-surestimee',
            detect: (c) => {
              const m = c.match(/int\s+points\s*\[\s*(\d+)\s*\]/i)
              return m !== null && parseInt(m[1]) > 5
            },
            title: 'Taille trop grande — case fantôme hors schéma',
            message: `Tu as déclaré une taille supérieure à 5 alors que le schéma montre exactement 5 cases. Les cases supplémentaires existent en mémoire mais contiennent des valeurs imprévisibles — pas 0.`,
            analogy: `C'est comme réserver 6 cases dans le schéma alors qu'il n'en montre que 5. La 6ème case existe en mémoire, mais son contenu est ce que laissé là par le programme précédent.`,
            adaptedSteps: {
              acces: {
                reminder: { text: `Tu avais déclaré plus de 5 cases — les cases en trop contiennent des valeurs aléatoires, pas 0.` },
                intro: `Tu avais déclaré une taille supérieure à 5 alors que le schéma montre exactement 5 cases. Les cases supplémentaires existent bien en mémoire, mais leur contenu est imprévisible. La flèche peut les cibler — mais ce qu'elle y lit est une valeur aléatoire héritée de la mémoire, pas 0. Visualise une case fantôme au bout du schéma, remplie de données inconnues.`,
                keyPoint: `En C, les cases non initialisées ne valent pas 0. Leur valeur est imprévisible. La taille doit correspondre exactement au schéma — ni plus, ni moins.`,
                extraCodeBlocks: [
                  {
                    position: 'before',
                    id: 'anim-size-too-large',
                    label: 'Visualisation — case fantôme',
                    type: 'animation',
                    component: AnimAV_SizeTooLarge,
                  },
                ],
              },
              modification: {
                reminder: { text: `Rappel : modifier une case fantôme ([5] ou au-delà) donne un résultat imprévisible.` },
                intro: `Avec une taille trop grande, tu peux "modifier" une case fantôme — le C accepte l'instruction, mais tu modifies une zone mémoire qui ne t'appartient pas. Le schéma ne montre que 5 cases : déclare exactement 5.`,
                keyPoint: `Modifie uniquement les cases qui correspondent au schéma. Taille correcte = aucune case fantôme à modifier par erreur.`,
              },
              boucle: {
                reminder: { text: `Rappel : si la boucle va jusqu'à i < 6 pour un tableau de 5 valeurs réelles, elle visite une case fantôme.` },
                intro: `Si tu déclares [6] et que ta boucle va jusqu'à i < 6, elle visitera la case [5] — la case fantôme. La flèche sort du schéma et lit une valeur aléatoire. Pour éviter ça, la condition de boucle doit correspondre au nombre réel de valeurs : i < 5.`,
                keyPoint: `Condition de boucle = nombre de valeurs réelles dans le schéma. Pas la taille déclarée si elle est trop grande.`,
              },
              calculs: {
                reminder: { text: `Rappel : une case fantôme dans la somme fausse le résultat — l'accumulateur compterait une valeur inconnue.` },
                intro: `Si la boucle visite la case fantôme, elle additionne une valeur inconnue à la somme. Le total sera faux. Visualise l'accumulateur : il ne doit absorber que les cases du schéma, pas les cases fantômes au-delà.`,
                keyPoint: `Taille exacte = accumulateur fiable. Chaque case visitée doit correspondre à une valeur réelle du schéma.`,
              },
            },
          },

          /* ── E4 : Accès hors limites ──────────────────────────── */
          {
            id: 'eq1-out-of-bounds',
            errorProfile: 'fleche-hors-limites',
            detect: (c) => {
              const re = /points\s*\[\s*(\d+)\s*\]/gi
              let m
              while ((m = re.exec(c)) !== null) {
                if (parseInt(m[1]) >= 5) {
                  const before = c.substring(Math.max(0, m.index - 10), m.index)
                  if (/int\s*$/.test(before)) continue
                  return true
                }
              }
              return false
            },
            title: 'Flèche hors limites — case inexistante',
            message: `Tu accèdes à une case qui n'existe pas. Pour int points[5], les indices valides sont [0] à [4]. Un indice ≥ 5 sort du tableau — le C ne prévient pas et le résultat est imprévisible.`,
            analogy: `Visualise 5 cases alignées. La flèche peut pointer sur [0] à [4]. Si elle va sur [5], elle sort des cases et pointe dans une zone inconnue — potentiellement une autre variable de ton programme.`,
            adaptedSteps: {
              acces: {
                reminder: { text: `Tu avais envoyé la flèche sur une case inexistante — rappel sur les limites valides de la flèche.` },
                intro: `Tu avais accédé à une case hors limites — la flèche est sortie du tableau. Pour int points[5], les seules cases qui existent sont [0], [1], [2], [3] et [4]. Tout indice ≥ 5 envoie la flèche dans une zone mémoire inconnue. Le C ne te prévient pas — le programme continue et donne un résultat imprévisible.`,
                keyPoint: `La flèche ne peut pointer que sur des cases qui existent. Pour un tableau de taille N, les indices valides sont [0] à [N-1]. Pour points[5] : dernier indice valide = 4, jamais 5.`,
                extraCodeBlocks: [
                  {
                    position: 'before',
                    id: 'anim-out-of-bounds',
                    label: 'Visualisation — flèche hors limites',
                    type: 'animation',
                    component: AnimAV_OutOfBounds,
                  },
                ],
              },
              modification: {
                reminder: { text: `Rappel : flèche sur [5] pour un tableau de taille 5 = sortie des cases du schéma.` },
                intro: `Modifier une case hors limites — écrire dans points[5] — envoie la flèche hors du schéma. Le C exécute l'instruction et écrase une zone mémoire inconnue. Le schéma avant/après ne montre jamais une case [5] pour un tableau de taille 5 : cette case n'appartient pas à ton programme.`,
                keyPoint: `Indices modifiables = [0] à [taille-1]. Pour int points[5] : tu peux modifier [0] à [4]. Jamais [5].`,
              },
              boucle: {
                reminder: { text: `Rappel : la condition i < 5 maintient la flèche dans les limites — i <= 5 la ferait sortir.` },
                intro: `La boucle for(int i = 0; i < 5; i++) garantit que la flèche ne sort jamais du tableau. À i = 4 (dernière case valide), le tour suivant ferait i = 5 — mais la condition i < 5 l'arrête. Si tu écrivais i <= 5, la flèche irait sur [5] qui est hors limites.`,
                keyPoint: `i < N (strictement inférieur) = flèche reste dans les limites. i <= N = flèche sort sur la case [N] inexistante. Toujours < jamais <=.`,
              },
              calculs: {
                reminder: { text: `Rappel : l'accumulateur ne doit visiter que les cases [0] à [4] — jamais au-delà.` },
                intro: `Dans les calculs, la boucle doit rester dans les limites pour que la somme soit correcte. Si la flèche sort du tableau, l'accumulateur absorbe une valeur inconnue. Visualise la boucle : elle s'arrête exactement à i = 4 (la dernière case du schéma), puis la condition i < 5 l'empêche d'aller plus loin.`,
                keyPoint: `Somme correcte = flèche qui reste dans les limites. Condition i < 5 = la flèche s'arrête avant la case fantôme.`,
              },
            },
          },

        ],
      },
    },

    /* ═══════════════════════════════════════════════════════
       ÉTAPE 2 — La flèche d'accès : notes[i] cible une case
    ═══════════════════════════════════════════════════════ */
    {
      id: 'acces',
      badge: 'Étape 2 · Accès',
      title: 'La flèche d\'accès — notes[i] cible une case',
      objective: `Comprendre visuellement ce que fait notes[i] : une flèche qui pointe vers la case d'indice i. Savoir lire et modifier n'importe quelle case.`,

      intro: {
        text: `Regarde l'animation ci-dessous. La flèche rouge pointe exactement vers la case d'indice 2. C'est ce que fait ton code quand tu écris notes[2] : le programme envoie une flèche invisible vers cette case précise, lit sa valeur (15), et peut aussi la modifier. L'indice entre crochets, c'est la cible de la flèche. Change l'indice, la flèche pointe ailleurs. Écris notes[0], elle va à gauche. Écris notes[4], elle va tout à droite.`,
      },

      illustration: 'array-access-c',

      codeBlocks: [
        {
          id: 'lire',
          label: 'Lire la valeur d\'une case — la flèche lit',
          code: `int notes[5] = {12, 8, 15, 9, 14};

//  Flèche sur [0] → lit 12
printf("%d", notes[0]);   // affiche 12

//  Flèche sur [2] → lit 15
printf("%d", notes[2]);   // affiche 15

//  Flèche sur [4] → lit 14 (dernière case)
printf("%d", notes[4]);   // affiche 14`,
          type: 'neutral',
          comment: `Visualise une flèche qui se déplace selon l'indice. notes[0] = flèche à gauche. notes[4] = flèche tout à droite. Le nombre entre [ ] = la position de la flèche.`,
        },
        {
          id: 'modifier',
          label: 'Modifier une case — la flèche écrit',
          code: `notes[1] = 20;  // flèche sur [1] → écrase 8 par 20
notes[3] = 18;  // flèche sur [3] → écrase 9 par 18

// Schéma après modification :
// ┌────┬────┬────┬────┬────┐
// │ 12 │ 20 │ 15 │ 18 │ 14 │
// └────┴────┴────┴────┴────┘
//  [0]  [1]  [2]  [3]  [4]
//        ↑              ↑
//       modifiée      modifiée`,
          type: 'good',
          comment: `Les cases non ciblées restent intactes. La flèche ne touche qu'une case à la fois.`,
        },
        {
          id: 'erreur-visuelle',
          label: 'Flèche hors limites — case inexistante',
          code: `// Pour notes[5] de taille 5, les indices valides sont 0 à 4
// L'indice 5 pointe EN DEHORS du tableau

notes[5] = 99;  // ❌ La flèche sort du tableau !
                // Le C ne te prévient pas
                // Résultat : comportement imprévisible`,
          type: 'bad',
          comment: `Imagine la flèche qui sort des cases et va écraser autre chose en mémoire. C'est exactement ce qui se passe.`,
        },
      ],

      keyPoint: `Visualise toujours notes[i] comme "envoie une flèche sur la case i". Pour un tableau de taille 5, la flèche ne peut pointer que sur [0], [1], [2], [3] ou [4]. Jamais [5] — cette case n'existe pas.`,

      exercise: {
        type: 'code',
        question: 'D\'après le schéma, écris le code d\'accès',
        prompt: `Tu as ce tableau :\n  ┌────┬────┬────┬────┬────┐\n  │ 40 │ 55 │ 70 │ 30 │ 90 │\n  └────┴────┴────┴────┴────┘\n   [0]  [1]  [2]  [3]  [4]\n\nD'après ce schéma :\n1. Affiche la valeur de la case où la "flèche" pointe si l'indice est 0\n2. Affiche la valeur de la case [4] (tout à droite)\n3. Modifie la case [2] : remplace 70 par 85\n4. Affiche la case [2] pour confirmer la modification`,
        starter: `#include <stdio.h>

int main() {
    int scores[5] = {40, 55, 70, 30, 90};

    // 1. Flèche sur [0] → affiche la valeur

    // 2. Flèche sur [4] → affiche la valeur

    // 3. Flèche sur [2] → écrase avec 85

    // 4. Flèche sur [2] → affiche pour vérifier

    return 0;
}`,
        hints: [
          `Flèche sur [0] : printf("%d", scores[0]); — affiche 40.`,
          `Flèche sur [4] : printf("%d", scores[4]); — affiche 90.`,
          `Flèche sur [2] pour modifier : scores[2] = 85; puis printf("%d", scores[2]);`,
        ],
        validation: [
          {
            id: 'read-0',
            test: (c) => /printf\s*\(.*scores\s*\[\s*0\s*\]/i.test(c),
            success: 'Case [0] lue et affichée correctement.',
            error: 'Affiche la case [0] : printf("%d", scores[0]);',
          },
          {
            id: 'read-4',
            test: (c) => /printf\s*\(.*scores\s*\[\s*4\s*\]/i.test(c),
            success: 'Case [4] (dernière) lue et affichée correctement.',
            error: 'Affiche la case [4] : printf("%d", scores[4]);',
          },
          {
            id: 'modify-2',
            test: (c) => /scores\s*\[\s*2\s*\]\s*=\s*85\s*;/.test(c),
            success: 'Case [2] modifiée à 85 — schéma mis à jour.',
            error: 'Modifie avec : scores[2] = 85;',
          },
        ],
        answer: `#include <stdio.h>

int main() {
    int scores[5] = {40, 55, 70, 30, 90};

    // 1. Flèche sur [0]
    printf("%d\\n", scores[0]);   // 40

    // 2. Flèche sur [4]
    printf("%d\\n", scores[4]);   // 90

    // 3. Flèche sur [2] → écrase
    scores[2] = 85;

    // 4. Flèche sur [2] → lit la nouvelle valeur
    printf("%d\\n", scores[2]);   // 85

    return 0;
}`,
        errorPatterns: [
          {
            id: 'eq2-out-of-bounds',
            detect: (c) => {
              const re = /scores\s*\[\s*(\d+)\s*\]/gi
              let m
              while ((m = re.exec(c)) !== null) {
                if (parseInt(m[1]) >= 5) {
                  const before = c.substring(Math.max(0, m.index - 10), m.index)
                  if (/int\s*$/.test(before)) continue
                  return true
                }
              }
              return false
            },
            title: 'Accès hors limites — la flèche sort du tableau',
            message: `Tu utilises un indice trop grand. Le tableau scores a 5 cases : indices valides [0] à [4]. Un indice ≥ 5 sort du tableau — le C ne prévient pas, le résultat est imprévisible.`,
            followUp: {
              question: `Pour un tableau de 5 éléments, quel est le dernier indice valide ? Et pour un tableau de 10 éléments ?`,
              hint: `Dernier indice = taille - 1. Pour 5 cases : max = 4. Pour 10 cases : max = 9.`,
            },
            analogy: `Visualise la flèche d'accès. Le tableau de 5 cases = 5 boîtes alignées. La flèche peut pointer sur [0] à [4]. Si elle va sur [5], elle sort des boîtes et pointe dans une zone inconnue — potentiellement une autre variable de ton programme.`,
          },
          {
            id: 'eq2-printf-no-format',
            detect: (c) => /printf\s*\(\s*scores\s*\[/i.test(c),
            title: 'Syntaxe printf incorrecte — chaîne de format manquante',
            message: `printf attend une chaîne de format entre guillemets en premier argument.\n\nCorrection : printf("%d", scores[0])\n\nLe %d est le marqueur qui dit "insère ici un entier".`,
            followUp: {
              question: `Comment afficher la valeur de scores[3] avec printf ? Écris la ligne complète.`,
              hint: `printf("%d", scores[3]); — toujours : chaîne de format d'abord, variable ensuite.`,
            },
            analogy: `printf fonctionne comme un panneau à remplir. La chaîne "%d" c'est le panneau avec un trou en forme de nombre. Sans ce trou (%d), printf ne sait pas où insérer ton nombre — comme une affiche sans espace pour écrire le nom.`,
          },
        ],
      },
    },

    /* ═══════════════════════════════════════════════════════
       ÉTAPE 3 — Avant / Après : voir la modification
    ═══════════════════════════════════════════════════════ */
    {
      id: 'modification',
      badge: 'Étape 3 · Modification',
      title: 'Avant et après — visualise la modification',
      objective: `Lire un schéma "avant/après" et en déduire l'instruction C qui a produit le changement. Comprendre qu'une modification ne touche qu'une seule case.`,

      intro: {
        text: `Regarde le schéma ci-dessous : il montre deux états du même tableau. À gauche, l'état avant. À droite, l'état après. Une seule case a changé — tu la repères facilement car elle est en couleur différente. Ton travail dans cette étape : apprendre à lire ces schémas et à écrire l'instruction C qui a produit le changement visible. C'est exactement ce qu'un vrai développeur fait quand il débogue : il compare deux états et cherche quelle ligne de code a causé la différence.`,
      },

      illustration: 'array-before-after-c',

      codeBlocks: [
        {
          id: 'lire-avant-apres',
          label: 'Lire un schéma avant/après et reconstruire le code',
          code: `// AVANT :
// ┌────┬────┬────┬────┬────┐
// │ 12 │  8 │ 15 │  9 │ 14 │
// └────┴────┴────┴────┴────┘
//  [0]  [1]  [2]  [3]  [4]

// APRÈS :
// ┌────┬────┬────┬────┬────┐
// │ 12 │ 20 │ 15 │  9 │ 14 │
// └────┴────┴────┴────┴────┘
//  [0]  [1]  [2]  [3]  [4]
//        ↑
//    seul changement : [1] est passé de 8 à 20

// Instruction qui a produit ce changement :
notes[1] = 20;`,
          type: 'trace',
          comment: `Méthode : compare case par case. Quand tu trouves celle qui a changé (ici [1]), l'instruction est toujours de la forme : nom[indice] = nouvelle_valeur;`,
        },
        {
          id: 'plusieurs',
          label: 'Plusieurs modifications : plusieurs instructions',
          code: `// Chaque instruction modifie une case précise
int notes[5] = {12, 8, 15, 9, 14};

notes[0] = 19;  // [0] : 12 → 19
notes[3] = 11;  // [3] : 9  → 11

// ÉTAT FINAL :
// ┌────┬────┬────┬────┬────┐
// │ 19 │  8 │ 15 │ 11 │ 14 │
// └────┴────┴────┴────┴────┘`,
          type: 'good',
          comment: `Autant d'instructions que de cases modifiées. Chaque instruction est indépendante.`,
        },
      ],

      keyPoint: `Pour lire un schéma avant/après : repère la case qui a changé (différente couleur), note son indice et ses deux valeurs. L'instruction C correspondante est toujours : tableau[indice] = nouvelle_valeur;`,

      exercise: {
        type: 'code',
        question: 'Quel code a produit ce changement ?',
        prompt: `Voici deux états du tableau :\n\nAVANT :\n  ┌────┬────┬────┬────┬────┐\n  │ 10 │ 25 │ 38 │ 14 │ 50 │\n  └────┴────┴────┴────┴────┘\n   [0]  [1]  [2]  [3]  [4]\n\nAPRÈS :\n  ┌────┬────┬────┬────┬────┐\n  │ 10 │ 25 │ 99 │ 14 │  7 │\n  └────┴────┴────┴────┴────┘\n   [0]  [1]  [2]  [3]  [4]\n\nDeux cases ont changé. Écris le code complet qui :\n1. Déclare le tableau dans son état AVANT\n2. Applique les deux modifications pour obtenir l'état APRÈS\n3. Affiche toutes les cases pour vérifier avec une boucle for`,
        starter: `#include <stdio.h>

int main() {
    // 1. Déclare le tableau (état AVANT)

    // 2. Applique les modifications
    //    Compare AVANT et APRÈS pour trouver quelles cases ont changé

    // 3. Affiche toutes les cases avec une boucle for

    return 0;
}`,
        hints: [
          `Compare case par case : [0]=10✓, [1]=25✓, [2]=38→99 (changé !), [3]=14✓, [4]=50→7 (changé !).`,
          `Les deux instructions : tableau[2] = 99; et tableau[4] = 7;`,
          `Pour afficher tout : for(int i = 0; i < 5; i++) { printf("%d\\n", tableau[i]); }`,
        ],
        validation: [
          {
            id: 'modify-2',
            test: (c) => /\w+\s*\[\s*2\s*\]\s*=\s*99\s*;/.test(c),
            success: 'Case [2] modifiée à 99 — changement visible dans le schéma Après.',
            error: 'La case [2] passe de 38 à 99 : tableau[2] = 99;',
          },
          {
            id: 'modify-4',
            test: (c) => /\w+\s*\[\s*4\s*\]\s*=\s*7\s*;/.test(c),
            success: 'Case [4] modifiée à 7 — second changement identifié.',
            error: 'La case [4] passe de 50 à 7 : tableau[4] = 7;',
          },
          {
            id: 'boucle',
            test: (c) => /for\s*\(\s*(int\s+)?i\s*=\s*0\s*;\s*i\s*<\s*5\s*;/.test(c),
            success: 'Boucle for utilisée pour afficher toutes les cases.',
            error: 'Utilise une boucle for(int i = 0; i < 5; i++) pour tout afficher.',
          },
        ],
        answer: `#include <stdio.h>

int main() {
    // 1. Déclare le tableau (état AVANT)
    int tableau[5] = {10, 25, 38, 14, 50};

    // 2. Modifications pour passer à l'état APRÈS
    tableau[2] = 99;   // [2] : 38 → 99
    tableau[4] = 7;    // [4] : 50 → 7

    // 3. Affiche toutes les cases
    for(int i = 0; i < 5; i++) {
        printf("tableau[%d] = %d\\n", i, tableau[i]);
    }

    return 0;
}`,
      },
    },

    /* ═══════════════════════════════════════════════════════
       ÉTAPE 4 — La boucle comme flèche qui se déplace
    ═══════════════════════════════════════════════════════ */
    {
      id: 'boucle',
      badge: 'Étape 4 · Boucle',
      title: 'La boucle — une flèche qui avance automatiquement',
      objective: `Visualiser ce que fait une boucle for sur un tableau : une flèche qui se déplace automatiquement de la case [0] jusqu'à la dernière, en répétant la même action à chaque case.`,

      intro: {
        text: `Regarde l'animation ci-dessous et observe la flèche. Elle part de la case [0], exécute une action, puis avance vers [1], exécute la même action, avance vers [2]... et ainsi de suite jusqu'à la dernière case. Quand i atteint une valeur qui dépasse le tableau, la flèche s'arrête. C'est exactement ce que fait la boucle for en C. La variable i, c'est la position de la flèche. À chaque tour de boucle, i augmente de 1 et la flèche avance d'une case.`,
      },

      illustration: 'loop-trace-c',

      codeBlocks: [
        {
          id: 'boucle-base',
          label: 'Boucle for = flèche automatique case par case',
          code: `int notes[5] = {12, 8, 15, 9, 14};

for(int i = 0; i < 5; i++) {
//       ↑         ↑    ↑
//  flèche          │    └── avance la flèche d'une case
//  démarre ici     └── s'arrête quand i = 5 (hors limites)

    printf("notes[%d] = %d\\n", i, notes[i]);
//                              ↑       ↑
//                    numéro de case   valeur dans la case
}`,
          type: 'trace',
          comment: `La variable i joue deux rôles : c'est la position de la flèche (l'indice) ET le numéro affiché. C'est pour ça qu'elle est si utile dans les boucles sur tableaux.`,
        },
        {
          id: 'condition',
          label: 'Pourquoi i < 5 et non i <= 5',
          code: `// ✅ Correct : i va de 0 à 4 (5 cases)
for(int i = 0; i < 5; i++) {
    // i : 0, 1, 2, 3, 4 → flèche dans le tableau
}

// ❌ Dangereux : i atteint 5 (case inexistante !)
for(int i = 0; i <= 5; i++) {
    // i : 0, 1, 2, 3, 4, 5 → la flèche sort du tableau !
}`,
          type: 'bad',
          comment: `Avec i <= 5, la flèche sort du tableau à i=5. Le C ne prévient pas. Toujours utiliser i < taille (strictement inférieur).`,
        },
        {
          id: 'scanner',
          label: 'Remplir un tableau avec l\'utilisateur',
          code: `int notes[5];

for(int i = 0; i < 5; i++) {
    printf("Note %d : ", i + 1);
    scanf("%d", &notes[i]);
    //          ↑
    //  & = adresse de la case i
    //  scanf stocke la valeur tapée exactement là
}`,
          type: 'good',
          comment: `À chaque tour, la flèche avance d'une case et scanf y stocke la valeur saisie. Le & est obligatoire — il dit à scanf où écrire.`,
        },
      ],

      keyPoint: `La boucle for sur un tableau = une flèche (i) qui part de 0, avance case par case, et s'arrête quand i atteint la taille. La condition i < 5 (jamais i <= 5) garantit que la flèche reste dans les limites.`,

      exercise: {
        type: 'code',
        question: 'Complète la boucle d\'après le schéma',
        prompt: `L'animation ci-dessus montre une flèche qui parcourt 6 cases et affiche chaque valeur.\n\nTu as ce tableau :\nint scores[6] = {45, 78, 23, 91, 56, 67};\n\nD'après ce que tu viens de voir dans l'animation :\n1. Écris la boucle for qui affiche chaque case avec son indice\n   Format : "scores[i] = valeur"\n2. Ajoute une 2ème boucle qui n'affiche que les scores >= 60\n   Format : "Bon score : valeur"`,
        starter: `#include <stdio.h>

int main() {
    int scores[6] = {45, 78, 23, 91, 56, 67};

    // 1. Boucle : affiche toutes les cases
    //    La flèche parcourt de [0] à [5]

    // 2. Boucle : affiche seulement les scores >= 60

    return 0;
}`,
        hints: [
          `La flèche démarre à i=0, s'arrête quand i=6 : for(int i = 0; i < 6; i++)`,
          `Dans la boucle : printf("scores[%d] = %d\\n", i, scores[i]);`,
          `Pour la 2ème boucle, ajoute if(scores[i] >= 60) avant le printf.`,
        ],
        validation: [
          {
            id: 'boucle-complete',
            test: (c) => /for\s*\(\s*(int\s+)?i\s*=\s*0\s*;\s*i\s*<\s*6\s*;/.test(c),
            success: 'Boucle for correcte pour 6 cases (i de 0 à 5).',
            error: 'La boucle doit aller jusqu\'à 6 cases : for(int i = 0; i < 6; i++)',
          },
          {
            id: 'printf-boucle',
            test: (c) => /printf\s*\(.*scores\s*\[\s*i\s*\]/i.test(c),
            success: 'Affichage de scores[i] dans la boucle correct.',
            error: 'Dans la boucle : printf("scores[%d] = %d\\n", i, scores[i]);',
          },
          {
            id: 'filtre',
            test: (c) => /scores\s*\[\s*i\s*\]\s*>=\s*60/.test(c),
            success: 'Filtre des scores >= 60 implémenté dans la 2ème boucle.',
            error: 'Dans une 2ème boucle, ajoute : if(scores[i] >= 60)',
          },
        ],
        answer: `#include <stdio.h>

int main() {
    int scores[6] = {45, 78, 23, 91, 56, 67};

    // 1. Affiche toutes les cases
    for(int i = 0; i < 6; i++) {
        printf("scores[%d] = %d\\n", i, scores[i]);
    }

    // 2. Affiche seulement les scores >= 60
    printf("\\nBons scores :\\n");
    for(int i = 0; i < 6; i++) {
        if(scores[i] >= 60) {
            printf("  Bon score : %d\\n", scores[i]);
        }
    }

    return 0;
}`,
      },
    },

    /* ═══════════════════════════════════════════════════════
       ÉTAPE 5 — Calculer depuis le tableau
    ═══════════════════════════════════════════════════════ */
    {
      id: 'calculs',
      badge: 'Étape 5 · Calculs',
      title: 'Calculer : somme, moyenne et recherche',
      objective: `Utiliser la boucle for pour calculer la somme d'un tableau, en déduire la moyenne, et trouver les valeurs minimum et maximum.`,

      intro: {
        text: `Regarde le schéma ci-dessous. Il montre comment la variable "total" grossit à chaque tour de boucle : au tour 1 elle absorbe la case [0], au tour 2 elle absorbe [1], et ainsi de suite. C'est comme un compteur qui s'incrémente visuellement. À la fin, il contient la somme de toutes les cases. Une fois que tu as la somme, diviser par le nombre de cases donne la moyenne. Retiens juste une règle : divise par 5.0 et non par 5, sinon la partie décimale disparaît.`,
      },

      illustration: 'accumulator',

      codeBlocks: [
        {
          id: 'somme-visuelle',
          label: 'La somme — accumulateur visuel',
          code: `int notes[5] = {12, 8, 15, 9, 14};
int somme = 0;   // compteur qui démarre à 0

for(int i = 0; i < 5; i++) {
    somme += notes[i];
//  ↑
//  somme grossit à chaque tour
//  Tour 1 : 0  + 12 = 12
//  Tour 2 : 12 + 8  = 20
//  Tour 3 : 20 + 15 = 35
//  Tour 4 : 35 + 9  = 44
//  Tour 5 : 44 + 14 = 58
}

printf("Somme : %d\\n", somme);  // 58`,
          type: 'good',
          comment: `somme += notes[i] signifie "ajoute la valeur de cette case au compteur". C'est l'accumulateur — il absorbe chaque case une par une.`,
        },
        {
          id: 'moyenne',
          label: 'La moyenne — divise par 5.0 (pas 5)',
          code: `// Après avoir calculé somme = 58
float moyenne = somme / 5.0;
//                       ↑
//  5.0 et non 5 !
//  58 / 5   = 11    (entier → partie décimale perdue)
//  58 / 5.0 = 11.60 (décimal → résultat correct)

printf("Moyenne : %.2f\\n", moyenne);  // 11.60`,
          type: 'good',
          comment: `En C, int / int = int (division entière, pas de virgule). Pour garder la virgule, au moins un des deux doit être float. C'est pour ça qu'on écrit 5.0.`,
        },
        {
          id: 'minmax',
          label: 'Trouver min et max — comparer à chaque case',
          code: `int notes[5] = {12, 8, 15, 9, 14};

int min = notes[0];  // hypothèse : [0] est le plus petit
int max = notes[0];  // hypothèse : [0] est le plus grand

for(int i = 1; i < 5; i++) {
    if(notes[i] < min) min = notes[i];  // nouveau minimum ?
    if(notes[i] > max) max = notes[i];  // nouveau maximum ?
}

printf("Min : %d  Max : %d\\n", min, max);  // 8  15`,
          type: 'neutral',
          comment: `On peut chercher min et max dans la même boucle. On initialise avec notes[0] (jamais avec 0 — si toutes les notes sont négatives, ça fausserait le résultat).`,
        },
      ],

      keyPoint: `Trois règles à retenir : 1) somme commence à 0 avant la boucle ; 2) divise par 5.0 (float) pour la moyenne, jamais par 5 (int) ; 3) initialise min/max avec notes[0], pas avec 0.`,

      exercise: {
        type: 'code',
        question: 'Analyse complète du tableau',
        prompt: `Tu as les températures de 5 villes :\nint temp[5] = {28, 35, 22, 41, 19};\n\nD'après le schéma de l'accumulateur que tu viens de voir :\n1. Calcule la somme de toutes les températures avec une boucle\n2. Calcule et affiche la moyenne (float, 2 décimales)\n3. Trouve et affiche la température maximum\n4. Dans une boucle, affiche les villes dont la température dépasse 30`,
        starter: `#include <stdio.h>

int main() {
    int temp[5] = {28, 35, 22, 41, 19};
    int somme = 0;

    // 1. Somme avec boucle (accumulateur)

    // 2. Moyenne (float, divise par 5.0)

    // 3. Maximum

    // 4. Villes au-dessus de 30

    return 0;
}`,
        hints: [
          `Accumulateur : for(int i = 0; i < 5; i++) { somme += temp[i]; }`,
          `Moyenne : float moyenne = somme / 5.0; puis printf("%.2f", moyenne);`,
          `Max : int max = temp[0]; puis for(i = 1...) if(temp[i] > max) max = temp[i];`,
        ],
        validation: [
          {
            id: 'somme-ok',
            test: (c) => /somme\s*\+=\s*temp\s*\[i\]/.test(c) || /somme\s*=\s*somme\s*\+\s*temp\s*\[i\]/.test(c),
            success: 'Accumulateur correctement utilisé pour la somme.',
            error: 'Dans la boucle : somme += temp[i]; (comme dans le schéma)',
          },
          {
            id: 'moyenne-ok',
            test: (c) => /float\s+moyenne/.test(c) && /\/\s*5\.0/.test(c),
            success: 'Moyenne calculée en float avec division par 5.0.',
            error: 'float moyenne = somme / 5.0; — le .0 est obligatoire pour garder les décimales.',
          },
          {
            id: 'filtre-30',
            test: (c) => /temp\s*\[\s*i\s*\]\s*>\s*30/.test(c),
            success: 'Filtre > 30 correct pour les villes au-dessus de 30°.',
            error: 'Dans une boucle : if(temp[i] > 30) pour afficher les températures élevées.',
          },
        ],
        answer: `#include <stdio.h>

int main() {
    int temp[5] = {28, 35, 22, 41, 19};
    int somme = 0;

    // 1. Somme
    for(int i = 0; i < 5; i++) {
        somme += temp[i];
    }

    // 2. Moyenne
    float moyenne = somme / 5.0;
    printf("Somme   : %d\\n", somme);
    printf("Moyenne : %.2f\\n", moyenne);

    // 3. Maximum
    int max = temp[0];
    for(int i = 1; i < 5; i++) {
        if(temp[i] > max) max = temp[i];
    }
    printf("Max     : %d\\n", max);

    // 4. Villes > 30
    printf("Villes chaudes :\\n");
    for(int i = 0; i < 5; i++) {
        if(temp[i] > 30) {
            printf("  Ville [%d] : %d degres\\n", i, temp[i]);
        }
    }

    return 0;
}`,
      },
    },

  ],
}
