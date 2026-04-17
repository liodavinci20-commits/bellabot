// ─────────────────────────────────────────────────────────────
// Leçon : Les tableaux en C
// Profil : Visuel + Intuitif  (le "penseur global")
// Approche pédagogique :
//   - La vue d'ensemble AVANT les détails (carte mentale)
//   - L'élève déduit avant qu'on lui explique
//   - Les exercices demandent de raisonner EN FRANÇAIS puis de coder
//   - Connexions explicites avec les concepts futurs (pointeurs, matrices)
//   - Questions ouvertes pour stimuler la réflexion
// ─────────────────────────────────────────────────────────────

export const LESSON_ARRAYS_VISUEL_INTUITIF = {
  id: 'arrays-visuel-intuitif',
  subject: 'Les tableaux en C',
  profile: 'Visuel · Intuitif',

  steps: [

    /* ═══════════════════════════════════════════════════════
       ÉTAPE 1 — La carte du territoire
    ═══════════════════════════════════════════════════════ */
    {
      id: 'carte',
      badge: 'Étape 1 · Vue d\'ensemble',
      title: 'La carte du territoire',
      objective: `Voir toutes les opérations d'un tableau en un coup d'œil, comprendre le concept global avant d'entrer dans les détails, puis écrire les premières lignes de code par déduction.`,

      intro: {
        text: `Avant d'écrire une seule ligne de code, voici la carte du territoire. En programmation, on a souvent besoin de stocker non pas une valeur isolée, mais une collection de valeurs liées — des notes d'élèves, des températures journalières, des scores. Un tableau est la réponse directe à ce besoin : une rangée de cases numérotées, accessibles à tout moment par leur numéro (l'indice). Regarde la carte mentale ci-dessous : elle montre les cinq opérations que tu vas maîtriser dans cette leçon. Tu peux déjà en deviner le sens à partir des mots-clés. C'est ta carte du territoire — garde-la en tête pendant toute la séance.`,
      },

      illustration: 'mind-map-tableaux',

      codeBlocks: [
        {
          id: 'vue-ensemble',
          label: 'Voici la syntaxe — 4 lignes résument tout',
          code: `int notes[5] = {12, 8, 15, 9, 14}; // déclaration + initialisation
notes[2];                            // accès       → lit la valeur 15
notes[1] = 20;                       // modification → écrase 8 par 20
for(int i = 0; i < 5; i++) { ... }  // parcours     → visite [0] à [4]`,
          type: 'good',
          comment: `Ces 4 lignes résument l'essentiel. Tu peux déjà déduire la logique de chacune. La suite de la leçon confirme tes intuitions et complète les détails.`,
        },
        {
          id: 'indice-logique',
          label: 'Pourquoi les indices commencent à 0 ?',
          code: `int notes[5] = {12, 8, 15, 9, 14};
//                  ↑   ↑   ↑   ↑   ↑
//              [0] [1] [2] [3] [4]   ← indices
//
// notes[0] = 12  (1ère case)
// notes[1] = 8   (2ème case)
// notes[2] = 15  (3ème case)   ← l'indice = décalage depuis le début`,
          type: 'neutral',
          comment: `L'indice n'est pas un numéro de rang, c'est un décalage. notes[0] signifie "décale de 0 cases depuis le début", notes[2] signifie "décale de 2". C'est pourquoi ça commence à 0 — et non à 1.`,
        },
      ],

      keyPoint: `Un tableau = une carte d'adresses. Chaque case a une adresse (l'indice) et un contenu (la valeur). Toutes les opérations que tu vas voir — lire, modifier, parcourir, chercher — utilisent ce même système d'adressage. Comprends ce principe une fois, et tout le reste s'en déduit.`,

      exercise: {
        type: 'code',
        question: 'Déduire, puis coder',
        prompt: `D'après la carte mentale et les 4 lignes que tu viens de voir, essaie de répondre mentalement :
→ Que fait notes[2] ?
→ Que signifie notes[4] = 99 ?

Maintenant, applique cette logique :
1. Déclare un tableau de 7 températures : {28, 31, 25, 33, 30, 27, 29}
2. Affiche la température du 4ème jour (indice 3)
3. Affiche la température du dernier jour (indice 6)`,
        starter: `#include <stdio.h>

int main() {
    // 1. Déclare le tableau des 7 températures
    //    Rappel : int nomDuTableau[taille] = {valeurs...};


    // 2. Affiche la température du 4ème jour (indice 3)
    //    Rappel : printf("%d", tableau[indice]);


    // 3. Affiche la température du dernier jour (indice 6)


    return 0;
}`,
        hints: [
          `int temps[7] = {28, 31, 25, 33, 30, 27, 29}; — 7 valeurs entre accolades, dans l'ordre.`,
          `Pour le 4ème jour : printf("%d\\n", temps[3]); — le 4ème jour est à l'indice 3 (car on part de 0).`,
          `Pour le dernier jour : printf("%d\\n", temps[6]); — 7 cases, donc indices de [0] à [6].`,
        ],
        validation: [
          {
            id: 'array-7',
            test: (c) => /int\s+\w+\s*\[\s*7\s*\]/.test(c),
            success: 'Tableau de 7 cases déclaré ✓',
            error: 'Déclare un tableau de 7 cases : int nomTableau[7] = {valeurs…}',
          },
          {
            id: 'index-3',
            test: (c) => /\[\s*3\s*\]/.test(c),
            success: 'Indice 3 utilisé pour le 4ème jour ✓',
            error: 'Le 4ème jour est à l\'indice 3 — les indices commencent à 0, donc rang 4 → indice 3',
          },
          {
            id: 'index-6',
            test: (c) => /\[\s*6\s*\]/.test(c),
            success: 'Indice 6 utilisé pour le dernier jour ✓',
            error: 'Le dernier jour est à l\'indice 6 — un tableau de 7 va de [0] à [6]',
          },
        ],

        errorPatterns: [

          /* ── Pattern 1 : pas de crochets ─────────────────────── */
          {
            id: 'eq1-no-brackets',
            errorProfile: 'syntaxe-tableau',
            title: 'Tableau sans crochets — la syntaxe int tableau[n] est absente',
            detect: (c) => !/int\s+\w+\s*\[\s*\d+\s*\]/.test(c),
            message: `Tu n'as pas encore utilisé la syntaxe int tableau[n]. Les crochets [] sont la clé de tout : c'est eux qui signalent au compilateur de réserver un bloc de mémoire contigu, adressable par indice.`,
            adaptedSteps: {
              fondation: {
                reminder: {
                  text: `Rappel Étape 1 : tu n'avais pas encore utilisé int tableau[n]. Ce bloc t'explique pourquoi les crochets [] sont fondamentaux — pas juste une syntaxe à mémoriser, mais le reflet direct d'un choix d'architecture mémoire.`,
                },
                intro: `Voici la question conceptuelle derrière les crochets : comment un programme accède-t-il à n'importe quelle case en temps constant ? La réponse est dans la syntaxe elle-même. int temps[7] = {…} dit au compilateur : "Réserve 7 × 4 = 28 octets consécutifs. La case [i] se trouve à l'adresse de départ + i × 4." Sans crochets, pas de bloc réservé — juste une variable isolée. Déduis-en : pourquoi un tableau est-il plus efficace que 7 variables séparées pour une boucle ?`,
                keyPoint: `int tableau[n] = réservation d'un bloc mémoire contigu de n × 4 octets. Ce n'est pas une liste abstraite — c'est une adresse de départ avec un système d'indexation mathématique. Ce principe réapparaîtra directement avec les pointeurs : un pointeur, c'est exactement cette adresse de départ.`,
                extraCodeBlocks: [
                  {
                    position: 'before',
                    id: 'brackets-memory-schema',
                    label: 'Pourquoi les crochets existent — vue mémoire',
                    code: `// ❌ 7 variables séparées — non adressables par indice
int j1 = 28, j2 = 31, j3 = 25, j4 = 33, j5 = 30, j6 = 27, j7 = 29;
// → impossible d'écrire une boucle : printf(j[i]) ne fonctionne pas

// ✅ Tableau — un bloc contigu, adressable par calcul
int temps[7] = {28, 31, 25, 33, 30, 27, 29};
// → adresse de temps[i] = adresse_base + i × 4 octets
// → une boucle parcourt tout avec printf("%d", temps[i])`,
                    type: 'neutral',
                    comment: `Les crochets créent un espace adressable. C'est la différence entre 7 boîtes séparées et une rangée numérotée.`,
                  },
                ],
              },
              'acces-modif': {
                reminder: {
                  text: `Rappel Étape 1 : syntaxe int tableau[n] à consolider. Ici, tu vas voir comment les crochets permettent d'accéder à n'importe quelle case — lire ou écrire, même mécanique de calcul d'adresse.`,
                },
                intro: `La syntaxe temps[i] fonctionne parce que le compilateur connaît l'adresse de chaque case à l'avance : base + i × 4. Que tu lises (printf) ou que tu écrives (temps[i] = valeur), tu utilises ce même calcul. C'est une opération O(1) — indépendante de la taille du tableau. Déduis : est-ce que temps[0] est plus rapide à accéder que temps[999] dans un tableau de 1000 cases ?`,
                keyPoint: `temps[i] pour lire, temps[i] = x pour écrire. Les deux utilisent le même calcul d'adresse. Ni l'un ni l'autre ne "cherche" la case — il calcule directement où elle est. C'est pourquoi l'accès est instantané, peu importe la taille.`,
              },
              boucle: {
                reminder: {
                  text: `Rappel Étape 1 : déclaration avec int tableau[n] à maîtriser. La boucle for prend tout son sens dans ce contexte : i joue exactement le rôle d'un indice qui parcourt les adresses consécutives du bloc réservé.`,
                },
                intro: `La boucle for et le tableau sont faits l'un pour l'autre. La boucle fait varier i de 0 à n-1 — exactement la plage des indices valides. À chaque tour, temps[i] accède à la case à l'adresse base + i × 4. Connexion globale à retenir : tableau = structure spatiale (cases en mémoire), boucle = structure temporelle (passage dans le temps). Ensemble, ils transforment n opérations identiques en 3 lignes.`,
                keyPoint: `for(int i = 0; i < 7; i++) { temps[i] } — i est à la fois compteur de boucle ET indice de case. Ce n'est pas une coïncidence : c'est le cœur du paradigme impératif. Tu retrouveras cette même structure en Python, JavaScript, C++ — c'est la norme universelle.`,
              },
              defi: {
                reminder: {
                  text: `Rappel Étape 1 : syntaxe int tableau[n] à consolider. Ce défi final combine tout — déclare bien int temp[7] = {…} avant de démarrer les algorithmes.`,
                },
                intro: `Tu arrives au défi avec la compréhension globale : un tableau est un bloc mémoire contigu, adressable par calcul. Les algorithmes max et moyenne utilisent ce système à chaque itération. Avant de coder, décris en français : comment reconnais-tu le maximum en parcourant une liste ? Quel invariant dois-tu maintenir à chaque étape ? Cette réflexion préalable distingue un programmeur qui comprend d'un programmeur qui copie.`,
                keyPoint: `max = tableau[0] (hypothèse initiale) + comparaison à chaque case — c'est un algorithme de type "maintien d'invariant". somme / 7.0 — la division flottante est une règle de conversion de type C. Ces deux patterns réapparaissent dans presque tout le code numérique que tu écriras.`,
              },
            },
          },

          /* ── Pattern 2 : taille incorrecte ───────────────────── */
          {
            id: 'eq1-size-not-7',
            errorProfile: 'taille-tableau',
            title: 'Taille du tableau incorrecte — pas 7 cases',
            detect: (c) => {
              const m = c.match(/int\s+\w+\s*\[\s*(\d+)\s*\]/)
              return m != null && parseInt(m[1]) !== 7
            },
            message: `Tu as déclaré un tableau avec une taille différente de 7. La taille n'est pas un détail stylistique — elle définit exactement le nombre d'octets réservés en mémoire.`,
            adaptedSteps: {
              fondation: {
                reminder: {
                  text: `Rappel Étape 1 : tu avais déclaré un tableau avec une taille incorrecte. Ce bloc t'explique pourquoi la taille est une décision d'architecture, pas un chiffre quelconque — elle détermine directement la mémoire allouée.`,
                },
                intro: `La taille dans int tableau[n] n'est pas un label — c'est une instruction directe au compilateur : "réserve n × 4 octets consécutifs". Si tu mets 5 au lieu de 7, seuls 5 × 4 = 20 octets sont réservés ; les données 6 et 7 n'ont pas de case. Si tu mets 10, tu gaspilles 12 octets et les cases [7], [8], [9] contiennent des valeurs résiduelles en mémoire. Déduis : que se passe-t-il si tu accèdes à temps[8] dans un tableau déclaré int temps[7] ?`,
                keyPoint: `La taille = exactement le nombre de valeurs à stocker. Ni plus (gaspillage + cases non initialisées), ni moins (accès hors-limites = comportement indéfini). Cette précision est ce que les langages modernes abstraient pour toi — en C, tu contrôles directement la mémoire.`,
                extraCodeBlocks: [
                  {
                    position: 'before',
                    id: 'size-impact-schema',
                    label: 'Impact de la taille — vue mémoire',
                    code: `// ✅ Taille exacte = 7
int temps[7] = {28, 31, 25, 33, 30, 27, 29};
// ┌────┬────┬────┬────┬────┬────┬────┐
// │ 28 │ 31 │ 25 │ 33 │ 30 │ 27 │ 29 │
// └────┴────┴────┴────┴────┴────┴────┘
//  [0]  [1]  [2]  [3]  [4]  [5]  [6]

// ❌ Taille trop petite (5) — données manquantes
int temps[5] = {28, 31, 25, 33, 30};
// ┌────┬────┬────┬────┬────┐
// │ 28 │ 31 │ 25 │ 33 │ 30 │   [5] et [6] n'existent pas !
// └────┴────┴────┴────┴────┘`,
                    type: 'neutral',
                    comment: `La taille détermine l'espace réservé. Trop petit → données perdues. Trop grand → cases inutilisées avec valeurs aléatoires.`,
                  },
                ],
              },
              'acces-modif': {
                reminder: {
                  text: `Rappel Étape 1 : taille incorrecte déclarée. La taille est directement liée aux indices valides : pour int tableau[n], les indices valides vont de [0] à [n-1].`,
                },
                intro: `Si tu déclares int temps[5] mais essaies d'accéder à temps[6], tu lis une case qui ne t'appartient pas — valeur aléatoire ou erreur de segmentation. C ne vérifie pas les bornes à l'exécution : c'est à toi de le faire. Règle invariante : dernier indice valide = taille - 1. Pour 7 cases : indices [0] à [6]. Pour 5 cases : indices [0] à [4].`,
                keyPoint: `Indices valides de int tableau[n] : [0] à [n-1]. Cette règle découle du calcul d'adresse : adresse[n-1] = base + (n-1) × 4 est la dernière adresse réservée. Elle est universelle en C.`,
              },
              boucle: {
                reminder: {
                  text: `Rappel Étape 1 : taille du tableau à vérifier. Dans la boucle for, la condition i < n doit correspondre EXACTEMENT à la taille déclarée — ni plus, ni moins.`,
                },
                intro: `La connexion entre taille du tableau et condition de boucle est directe : for(int i = 0; i < 7; i++) est correct si et seulement si le tableau a exactement 7 cases. Si tu déclares temps[5] mais fais i < 7, tu accèdes à temps[5] et temps[6] qui n'existent pas. Bonne pratique : ne jamais écrire la taille en dur deux fois — tu verras plus tard #define N 7 pour l'unifier.`,
                keyPoint: `for(int i = 0; i < TAILLE; i++) — la TAILLE dans la condition doit être identique à celle dans la déclaration. Si tu changes l'une sans l'autre, le programme accède à de la mémoire non réservée. C'est une source classique de bugs.`,
              },
              defi: {
                reminder: {
                  text: `Rappel Étape 1 : assure-toi de déclarer int temp[7] avec exactement 7 cases. Les algorithmes max et moyenne parcourent exactement les 7 cases — les trois "7" du programme (déclaration, boucles, division) sont liés.`,
                },
                intro: `Pour le défi, la taille est le fil conducteur : 7 dans la déclaration, i < 7 dans les boucles, 7.0 dans le calcul de moyenne. Si tu changes le nombre de données, ces trois endroits changent ensemble. Bonne pratique : définir la taille une seule fois (#define N 7) et l'utiliser partout. Retiens simplement que tous ces "7" sont la même valeur, exprimée à différents endroits.`,
                keyPoint: `La taille du tableau est l'invariant central de tout programme sur les tableaux. Déclare-la une fois, utilise-la partout. C'est le premier pas vers l'abstraction : quand tu verras les fonctions qui prennent la taille en paramètre, tu comprendras pourquoi.`,
              },
            },
          },

          /* ── Pattern 3 : indice 4 au lieu de 3 (base-0) ─────── */
          {
            id: 'eq1-index-4-not-3',
            errorProfile: 'confusion-base-0',
            title: 'Indice [4] au lieu de [3] — confusion rang / offset',
            detect: (c) => /printf[^;]*\[\s*4\s*\]/.test(c) && !/\[\s*3\s*\]/.test(c),
            message: `Tu as utilisé l'indice [4] pour le 4ème jour au lieu de [3]. C'est la confusion rang/offset — un classique base-0. L'indice n'est pas un rang : c'est un décalage depuis le début du tableau.`,
            adaptedSteps: {
              fondation: {
                reminder: {
                  text: `Rappel Étape 1 : tu avais utilisé [4] pour le 4ème jour (devrait être [3]). Ce bloc t'explique pourquoi la base-0 existe et comment en faire un réflexe par la logique, pas par la mémorisation.`,
                },
                intro: `Voici la question conceptuelle : pourquoi les indices commencent-ils à 0 et non à 1 ? La réponse est dans le calcul d'adresse : adresse de notes[i] = base + i × 4. Si on part de 0, la 1ère case est à base + 0 × 4 = base. Élégant. Si on partait de 1, la 1ère case serait à base + 1 × 4 — il faudrait soustraire 1 à chaque calcul. La base-0 n'est pas un caprice : c'est le reflet direct de l'arithmétique des adresses. Déduis la formule : pour convertir un rang en indice, que fais-tu ?`,
                keyPoint: `Indice = rang - 1. La 1ère case est [0], la 4ème est [3], la nème est [n-1]. Cette convention vient de l'arithmétique des adresses mémoire. Tu la retrouveras en Python, Java, JavaScript — c'est la norme universelle du monde impératif.`,
                extraCodeBlocks: [
                  {
                    position: 'before',
                    id: 'rank-vs-offset',
                    label: 'Rang vs indice — deux systèmes de numérotation',
                    code: `int temps[7] = {28, 31, 25, 33, 30, 27, 29};
//
//  Rang  :  1    2    3    4    5    6    7
//         ┌────┬────┬────┬────┬────┬────┬────┐
//         │ 28 │ 31 │ 25 │ 33 │ 30 │ 27 │ 29 │
//         └────┴────┴────┴────┴────┴────┴────┘
//  Indice:  0    1    2    3    4    5    6
//
// 4ème jour → rang 4 → indice 3 → temps[3] = 33
// Formule : indice = rang - 1`,
                    type: 'neutral',
                    comment: `Les langages humains numérotent à partir de 1 (1er, 2ème...). L'informatique numérote à partir de 0 (décalages). Comprendre cette différence évite 90% des bugs d'indices.`,
                  },
                ],
              },
              'acces-modif': {
                reminder: {
                  text: `Rappel Étape 1 : confusion rang/indice ([4] au lieu de [3]). Pour accéder à la nème case, utilise toujours l'indice n-1.`,
                },
                intro: `À chaque accès, tu fais un calcul d'adresse. notes[3] ne demande pas "quelle est la 4ème case" — il dit "va à base + 3 × 4". Le résultat est la 4ème valeur, mais la mécanique est un décalage. Ancre le réflexe : quand tu vois "4ème jour", traduis mentalement en "décalage de 3 depuis le début". Formule universelle : rang N → indice N-1.`,
                keyPoint: `notes[i] accède à la case à l'adresse base + i × 4. i = 0 → 1ère case, i = 1 → 2ème, i = 3 → 4ème. Règle invariante : pour accéder à la nème case, utilise l'indice n-1. Toujours.`,
              },
              boucle: {
                reminder: {
                  text: `Rappel Étape 1 : rang vs indice (rang N → indice N-1). Dans la boucle, i varie de 0 à n-1 précisément parce que les indices valides sont 0, 1, 2 … n-1. La condition i < n encode directement cette règle.`,
                },
                intro: `La boucle for(int i = 0; i < 7; i++) est la traduction de "visite tous les indices de [0] à [6]". La condition i < 7 s'arrête quand i atteint 7 — qui n'est pas un indice valide (le dernier est [6]). Si on écrivait i <= 7, on accèderait à temps[7] : hors-limites. Connexion conceptuelle : la boucle incarne exactement la plage des indices valides.`,
                keyPoint: `for(int i = 0; i < TAILLE; i++) — la condition i < TAILLE encode "dernier indice valide = TAILLE - 1". C'est pourquoi on écrit < et non <=. Pas arbitraire : cohérent avec l'indexation base-0.`,
              },
              defi: {
                reminder: {
                  text: `Rappel Étape 1 : rang N → indice N-1. Dans le défi, max = temp[0] accède au 1er élément (rang 1, indice 0). La boucle démarre à i=1 pour ne pas recomparer la 1ère valeur avec elle-même.`,
                },
                intro: `Dans l'algorithme du maximum : max = temp[0] puis for(i = 1; i < 7; i++). Remarques-tu la cohérence ? La 1ère case (rang 1) est l'indice 0. La boucle commence à l'indice 1 (rang 2) pour ne pas reconsidérer l'hypothèse de départ. Chaque indice dans ce code est un "décalage" précis. Entraîne-toi à penser en indices (0-based), pas en rangs — c'est le langage du C.`,
                keyPoint: `Dans tout algorithme C : rang N → indice N-1. max = temp[0] (1er), boucle de i=1 (2ème) à i=6 (7ème). Cette cohérence avec la base-0 rend le code C prévisible et calculable.`,
              },
            },
          },

          /* ── Pattern 4 : indice [7] hors limites ─────────────── */
          {
            id: 'eq1-index-7-out-of-bounds',
            errorProfile: 'indice-hors-limites',
            title: 'Indice [7] hors limites — le dernier indice est [6]',
            detect: (c) => /printf[^;]*\[\s*7\s*\]/.test(c),
            message: `Tu as utilisé l'indice [7] pour le dernier jour. Mais un tableau de 7 cases a ses indices de [0] à [6] — il n'y a pas de case [7]. Accéder à temps[7] lit une zone mémoire non réservée.`,
            adaptedSteps: {
              fondation: {
                reminder: {
                  text: `Rappel Étape 1 : accès à temps[7] qui n'existe pas dans un tableau de 7 cases. Ce bloc t'explique pourquoi la borne supérieure est toujours taille-1, et ce qui se passe réellement quand on la dépasse.`,
                },
                intro: `Voici la règle structurelle : int tableau[n] réserve exactement n cases, aux indices [0] à [n-1]. Il n'y a pas de garde-fou — si tu accèdes à tableau[n], C calcule quand même une adresse (base + n × 4) et lit ce qui s'y trouve, qu'il t'appartienne ou non. En C, cela s'appelle "undefined behavior" : le programme peut afficher n'importe quoi, crasher, ou sembler fonctionner par hasard. C'est l'une des sources les plus connues de vulnérabilités de sécurité (buffer overflow). Déduis : pourquoi la règle "indice max = taille - 1" est-elle non négociable ?`,
                keyPoint: `Indices valides de int tableau[n] : [0] à [n-1]. C ne vérifie pas les bornes — c'est à toi de le faire. Accéder à tableau[n] est un comportement indéfini. Cette règle absolue te prépare maintenant à éviter les buffer overflows — une classe entière de vulnérabilités de sécurité.`,
                extraCodeBlocks: [
                  {
                    position: 'before',
                    id: 'out-of-bounds-schema',
                    label: 'Visualisation — accès hors limites',
                    code: `int temps[7] = {28, 31, 25, 33, 30, 27, 29};
// Indices valides :
// ┌────┬────┬────┬────┬────┬────┬────┐
// │ 28 │ 31 │ 25 │ 33 │ 30 │ 27 │ 29 │
// └────┴────┴────┴────┴────┴────┴────┘
//  [0]  [1]  [2]  [3]  [4]  [5]  [6]    [7] ← hors tableau !
//
// temps[7] → C calcule base + 7×4 → zone non réservée
// → valeur aléatoire, crash possible, ou "ça fonctionne par chance"

// ✅ Dernier jour → temps[6]  (taille 7 → dernier indice = 7-1 = 6)`,
                    type: 'bad',
                    comment: `temps[7] dans un tableau de 7 est l'erreur classique. La mémoire continue après le tableau — C lit ce qui s'y trouve sans avertissement.`,
                  },
                ],
              },
              'acces-modif': {
                reminder: {
                  text: `Rappel Étape 1 : accès hors-limites à temps[7]. Règle absolue : le dernier indice valide est toujours taille-1. Pour int temps[7], c'est temps[6].`,
                },
                intro: `Lire ou modifier une case hors des bornes est un bug silencieux — C ne prévient pas. notes[7] dans un tableau de 7 cases accède à une case "fantôme" : une adresse mémoire qui peut appartenir à une autre variable, à la pile d'exécution, ou à n'importe quoi d'autre. Comment calculer le dernier indice : taille - 1. Pour 7 cases : 7 - 1 = 6. Pour 30 cases : 30 - 1 = 29. La formule est toujours identique.`,
                keyPoint: `Dernier indice valide = n - 1 (pour int tableau[n]). Ce n'est pas une règle à mémoriser bêtement : c'est la conséquence directe de l'indexation base-0. Si les indices vont de 0 à n-1, il y en a exactement n — ce qui correspond à la taille déclarée.`,
              },
              boucle: {
                reminder: {
                  text: `Rappel Étape 1 : indice [7] hors-limites pour un tableau de 7. Dans la boucle for, la condition i < 7 garantit que i ne dépasse jamais 6 — le dernier indice valide.`,
                },
                intro: `La condition i < TAILLE dans la boucle for est le garde-fou contre l'accès hors-limites. for(i = 0; i < 7; i++) — quand i atteint 7, la condition est fausse, la boucle s'arrête avant d'accéder à temps[7]. Si on écrivait i <= 7, le dernier tour ferait temps[7] : hors-limites. Connexion : la condition i < n encode exactement la contrainte "indice max = n-1". C'est pour ça qu'on écrit < et non <=.`,
                keyPoint: `for(int i = 0; i < TAILLE; i++) — la condition i < TAILLE (et non i <= TAILLE) garantit que le dernier accès est tableau[TAILLE-1], jamais tableau[TAILLE]. Une ligne qui prévient l'accès hors-limites à chaque itération.`,
              },
              defi: {
                reminder: {
                  text: `Rappel Étape 1 : indice [7] hors-limites pour taille 7. Dans le défi, toutes les boucles utilisent i < 7 — vérifie que tu n'accèdes jamais à temp[7] ni directement ni via la boucle.`,
                },
                intro: `Dans l'algorithme du maximum, la boucle parcourt de i=1 à i < 7 — soit i=1 jusqu'à i=6. La case temp[6] est le 7ème jour (dernier), pas temp[7]. Visualise la carte : 7 cases = indices [0] à [6]. Tout accès doit rester dans cette plage. Attention : le programme peut sembler fonctionner même avec temp[7] — le comportement indéfini est parfois le pire cas : pas de crash visible, mais une valeur corrompue dans un résultat apparemment correct.`,
                keyPoint: `Dans tout programme C : pour un tableau de n cases, n'accède jamais à l'indice n. Le dernier accès valide est toujours [n-1]. Cette règle s'applique dans la déclaration, dans les accès directs, et dans les conditions de boucle.`,
              },
            },
          },

        ],
      },
    },

    /* ═══════════════════════════════════════════════════════
       ÉTAPE 2 — Pourquoi les tableaux existent
    ═══════════════════════════════════════════════════════ */
    {
      id: 'fondation',
      badge: 'Étape 2 · Le concept',
      title: 'Pourquoi les tableaux existent',
      objective: `Comprendre le problème que les tableaux résolvent, leur place dans la hiérarchie des structures de données C, et pourquoi la taille est fixée à l'avance.`,

      intro: {
        text: `Avant les tableaux, stocker 30 notes nécessitait 30 variables séparées : note1, note2, note3… jusqu'à note30. C'est ingérable — et impossible à manipuler avec une boucle. Le tableau résout ce problème en une ligne. Mais il y a plus : un tableau en C est la forme la plus élémentaire de structure de données séquentielle. Comprendre les tableaux maintenant, c'est poser les fondations de tout ce que tu verras ensuite — matrices, chaînes de caractères, buffers, et même les pointeurs. Regarde le schéma ci-dessous : les tableaux sont au bas de la pyramide, et tout le reste s'appuie dessus. À toi de déduire : pourquoi la taille doit-elle être fixée à l'avance, avant d'exécuter le programme ?`,
      },

      illustration: 'data-hierarchy-c',

      codeBlocks: [
        {
          id: 'probleme-solution',
          label: 'Exemple — le problème que le tableau résout',
          code: `// ❌ Sans tableau — ingérable dès 5 valeurs
int note1 = 12, note2 = 8, note3 = 15, note4 = 9, note5 = 14;
// ... et si on a 30 élèves ? 30 lignes. Et si on veut la moyenne ?

// ✅ Avec tableau — une ligne, peu importe la taille
int notes[5] = {12, 8, 15, 9, 14};
// Pour 30 élèves : int notes[30]; — rien d'autre ne change`,
          type: 'good',
          comment: `La puissance du tableau ne se voit pas avec 5 valeurs. Elle se voit quand on passe à 30, 1000, ou 1 000 000. La logique du code reste identique — seul le chiffre dans les crochets change.`,
        },
        {
          id: 'taille-fixe',
          label: 'Voici pourquoi la taille est fixée',
          code: `// Le compilateur doit réserver l'espace mémoire AVANT d'exécuter
int notes[5];  // → réserve exactement 5 × 4 octets = 20 octets
               //   en mémoire, de façon contiguë (cases côte à côte)

// Conséquences :
// ✓ Accès ultra-rapide : notes[i] = adresse_début + i × taille_type
// ✓ Pas de calcul nécessaire — on sait TOUJOURS où est chaque case
// ✗ Taille fixe : tu ne peux pas en ajouter une case après coup`,
          type: 'neutral',
          comment: `Ce n'est pas une limitation arbitraire — c'est un choix de performance. En échange de la taille fixe, l'accès à n'importe quelle case est instantané, quelle que soit la taille du tableau.`,
        },
      ],

      keyPoint: `La taille fixe est la contrepartie de la performance. C connaît l'adresse exacte de chaque case en mémoire dès la déclaration — c'est ce qui rend les tableaux si rapides. Plus tard, tu verras l'allocation dynamique (malloc) qui permet des tailles variables, mais au prix d'une complexité plus grande.`,

      exercise: {
        type: 'code',
        question: 'Réfléchis, puis code',
        prompt: `Avant de coder, pose-toi cette question (tu peux répondre dans les commentaires du code) :
→ Si un tableau de 5 int occupe 5 × 4 = 20 octets, combien d'octets occupe un tableau de 30 int ?

Ensuite, code la solution :
1. Déclare un tableau de 30 entiers nommé "classe" pour stocker les notes de 30 élèves
2. Donne la note 14 au 1er élève (indice 0), 17 au 2ème (indice 1), 11 au 3ème (indice 2)
3. Affiche la note du 2ème élève`,
        starter: `#include <stdio.h>

int main() {
    // Réponse à la question : un tableau de 30 int occupe ... octets


    // 1. Déclare le tableau de 30 notes (on ne connaît pas encore les valeurs)
    //    Syntaxe sans initialisation : int nomTableau[taille];


    // 2. Assigne les 3 premières notes
    //    Syntaxe : tableau[indice] = valeur;


    // 3. Affiche la note du 2ème élève (indice 1)


    return 0;
}`,
        hints: [
          `Pour déclarer sans initialiser : int classe[30]; — les cases ont des valeurs aléatoires, on les écrase ensuite.`,
          `Assigner les valeurs : classe[0] = 14; puis classe[1] = 17; puis classe[2] = 11;`,
          `printf("%d\\n", classe[1]); — affiche 17, la note du 2ème élève.`,
        ],
        test: (code) =>
          /int\s+\w+\s*\[30\]/.test(code) &&
          /\[0\]\s*=\s*14/.test(code) &&
          /\[1\]\s*=\s*17/.test(code) &&
          /\[2\]\s*=\s*11/.test(code) &&
          /printf/.test(code),
      },
    },

    /* ═══════════════════════════════════════════════════════
       ÉTAPE 3 — Lire et modifier : confirme tes intuitions
    ═══════════════════════════════════════════════════════ */
    {
      id: 'acces-modif',
      badge: 'Étape 3 · Lire & écrire',
      title: 'Confirme tes intuitions',
      objective: `Maîtriser la lecture et la modification de cases, comprendre pourquoi les indices commencent à 0, et prédire le comportement du code avant de l'exécuter.`,

      intro: {
        text: `Tu as déjà vu les lignes notes[2] et notes[1] = 20. Avant que j'explique quoi que ce soit, essaie de déduire : que retourne notes[2] dans le tableau {12, 8, 15, 9, 14} ? Que se passe-t-il en mémoire quand tu écris notes[1] = 20 ? L'idée clé à retenir est celle-ci : notes[i] est une adresse — comme une boîte aux lettres numérotée. Lire la boîte, c'est notes[i]. Déposer quelque chose dedans, c'est notes[i] = valeur. Ces deux opérations sont le cœur de tout programme qui manipule des tableaux. Voici la syntaxe complète, avec les cas courants et les pièges à éviter.`,
      },

      illustration: 'syntax-overview-c',

      codeBlocks: [
        {
          id: 'lecture-exemples',
          label: 'Exemple — lire dans un tableau',
          code: `int notes[5] = {12, 8, 15, 9, 14};

// Lire une case → on l'affiche avec printf
printf("%d\\n", notes[0]);  // affiche 12  (1ère case)
printf("%d\\n", notes[2]);  // affiche 15  (3ème case)
printf("%d\\n", notes[4]);  // affiche 14  (dernière case)

// On peut aussi stocker la valeur dans une variable
int meilleure = notes[2];   // meilleure vaut maintenant 15

// ⚠️ Piège classique : dépasser la taille du tableau
printf("%d\\n", notes[5]);  // ERREUR — il n'y a pas de case [5] !
//                              le tableau va de [0] à [4] seulement`,
          type: 'neutral',
          comment: `Accéder à notes[5] dans un tableau de 5 cases est une erreur. C ne le détecte pas automatiquement — tu pourrais lire n'importe quelle valeur en mémoire. C'est un bug classique que même les développeurs expérimentés font parfois.`,
        },
        {
          id: 'ecriture-exemples',
          label: 'Exemple — modifier une case',
          code: `int notes[5] = {12, 8, 15, 9, 14};
//              [0] [1] [2] [3] [4]

// Modifier une case → les autres ne bougent pas
notes[1] = 20;
// Résultat : {12, 20, 15, 9, 14}
//                 ↑ seulement cette case a changé

notes[4] = 0;
// Résultat : {12, 20, 15, 9, 0}
//                          ↑ et maintenant celle-là aussi

// On peut aussi modifier depuis une variable
int nouvelle_note = 18;
notes[0] = nouvelle_note;  // case [0] prend la valeur de la variable`,
          type: 'good',
          comment: `Chaque modification est chirurgicale : une case à la fois. C'est ce qui rend les tableaux puissants — tu peux mettre à jour n'importe quelle valeur sans toucher aux autres.`,
        },
      ],

      keyPoint: `notes[i] pour lire, notes[i] = valeur pour écrire. C'est tout. Ce système d'adressage est universel — on le retrouve dans tous les langages, sous des formes légèrement différentes. La seule règle absolue : l'indice doit rester entre 0 et taille-1.`,

      exercise: {
        type: 'code',
        question: 'Prédit, puis vérifie',
        prompt: `Avant de coder, prédit mentalement :
→ Que va afficher printf("%d", notes[2]) avec le tableau {5, 10, 15, 20, 25} ?
→ Que contient notes[0] après notes[0] = 99 ?

Maintenant, code la solution :
1. Déclare le tableau int scores[5] = {5, 10, 15, 20, 25}
2. Affiche la valeur de la case [2]
3. Affiche la valeur de la dernière case (indice 4)
4. Modifie la case [0] pour y mettre 99
5. Affiche la case [0] après la modification`,
        starter: `#include <stdio.h>

int main() {
    // 1. Déclaration du tableau
    int scores[5] = {5, 10, 15, 20, 25};

    // 2. Affiche la case [2]
    //    Réponse attendue : 15


    // 3. Affiche la dernière case (indice 4)
    //    Réponse attendue : 25


    // 4. Modifie la case [0]
    //    scores[0] = ...


    // 5. Affiche la case [0] après modification
    //    Réponse attendue : 99


    return 0;
}`,
        hints: [
          `printf("%d\\n", scores[2]); — affiche 15, la 3ème case.`,
          `printf("%d\\n", scores[4]); — affiche 25, la 5ème et dernière case.`,
          `scores[0] = 99; puis printf("%d\\n", scores[0]); — affiche 99 après la modification.`,
        ],
        test: (code) =>
          /printf.*\[2\]/.test(code) &&
          /printf.*\[4\]/.test(code) &&
          /\[0\]\s*=\s*99/.test(code) &&
          /printf.*\[0\]/.test(code.split(/\[0\]\s*=\s*99/)[1] || ''),
      },
    },

    /* ═══════════════════════════════════════════════════════
       ÉTAPE 4 — La boucle for : la machine à parcourir
    ═══════════════════════════════════════════════════════ */
    {
      id: 'boucle',
      badge: 'Étape 4 · La boucle for',
      title: 'La machine à parcourir',
      objective: `Comprendre la boucle for comme un outil systématique pour traiter chaque case d'un tableau, écrire un parcours complet, et calculer une somme.`,

      intro: {
        text: `Voici la connexion qui donne toute leur puissance aux tableaux : la boucle for. Sans elle, accéder à chaque case d'un tableau de 100 éléments demanderait 100 lignes de code identiques. Avec elle, tu en écris 3. La logique est simple : i commence à 0, avance de 1 à chaque tour, et s'arrête quand il atteint la taille du tableau. À chaque tour, i est exactement l'indice de la case à traiter. Regarde la trace d'exécution ci-dessous — c'est la même chose que d'avancer case par case avec le doigt sur un tableau papier. À toi de déduire : si le tableau a 100 éléments, comment écriras-tu la condition de la boucle ?`,
      },

      illustration: 'loop-trace-c',

      codeBlocks: [
        {
          id: 'boucle-anatomie',
          label: 'Voici la syntaxe — anatomie de la boucle for',
          code: `int notes[5] = {12, 8, 15, 9, 14};

for(int i = 0; i < 5; i++) {
//      ↑          ↑    ↑
//      │          │    └── i++ : i grandit de 1 à chaque tour
//      │          └── i < 5 : continue TANT QUE i est inférieur à 5
//      └── int i = 0 : le compteur commence à 0

    printf("%d\\n", notes[i]);  // i varie de 0 à 4 → visite chaque case
}
// Affiche : 12, 8, 15, 9, 14 (une valeur par ligne)`,
          type: 'good',
          comment: `La condition i < 5 (et non i <= 5) est intentionnelle : le dernier indice valide est 4. Si on écrivait i <= 5, la boucle essaierait d'accéder à notes[5] — qui n'existe pas.`,
        },
        {
          id: 'boucle-somme',
          label: 'Exemple — calculer la somme avec une boucle',
          code: `int notes[5] = {12, 8, 15, 9, 14};
int somme = 0;   // accumulateur — commence à 0

for(int i = 0; i < 5; i++) {
    somme = somme + notes[i];  // ajoute la case courante au total
}
// Tour 1 : somme = 0  + 12 = 12
// Tour 2 : somme = 12 + 8  = 20
// Tour 3 : somme = 20 + 15 = 35
// Tour 4 : somme = 35 + 9  = 44
// Tour 5 : somme = 44 + 14 = 58

float moyenne = somme / 5.0;  // 5.0 et non 5 → résultat décimal
printf("Somme : %d\\n", somme);      // 58
printf("Moyenne : %.1f\\n", moyenne); // 11.6`,
          type: 'good',
          comment: `L'accumulateur est un pattern classique : une variable initialisée à 0, mise à jour à chaque tour de boucle. Tu le retrouveras dans presque tous les algorithmes de traitement de tableaux.`,
        },
      ],

      keyPoint: `La boucle for est la réponse universelle à "je veux faire quelque chose pour chaque case". Retiens la structure : for(int i = 0; i < TAILLE; i++). La taille dans la condition est le seul endroit qui change d'un tableau à l'autre. Le reste est identique.`,

      exercise: {
        type: 'code',
        question: 'Écris la machine à parcourir',
        prompt: `Avant de coder, réponds mentalement :
→ Si le tableau a 7 éléments, quelle sera la condition dans le for ?
→ Quelle valeur aura i au dernier tour ?

Ensuite, code :
1. Déclare int temps[7] = {28, 31, 25, 33, 30, 27, 29}
2. Écris une boucle for qui affiche chaque température
3. Calcule et affiche la somme de toutes les températures
4. Calcule et affiche la moyenne (utilise 7.0 pour avoir un résultat décimal)`,
        starter: `#include <stdio.h>

int main() {
    // 1. Tableau des températures
    int temps[7] = {28, 31, 25, 33, 30, 27, 29};

    // 2. Boucle pour afficher chaque température
    //    Rappel : for(int i = 0; i < TAILLE; i++) { ... }
    printf("Temperatures :\\n");
    for(/* à compléter */) {

    }

    // 3. Calcule la somme
    int somme = 0;
    for(/* à compléter */) {
        // somme = somme + ...
    }

    // 4. Calcule et affiche la moyenne
    // float moy = somme / 7.0;

    return 0;
}`,
        hints: [
          `for(int i = 0; i < 7; i++) { printf("%d\\n", temps[i]); } — 7 éléments, donc condition i < 7.`,
          `for(int i = 0; i < 7; i++) { somme = somme + temps[i]; } — même structure pour calculer la somme.`,
          `float moy = somme / 7.0; puis printf("Moyenne : %.1f\\n", moy); — divise par 7.0 (et non 7) pour avoir un résultat décimal.`,
        ],
        test: (code) =>
          /for\s*\(/.test(code) &&
          /somme|total|sum/.test(code) &&
          /7\.0|7\./.test(code) &&
          /printf/.test(code),
      },
    },

    /* ═══════════════════════════════════════════════════════
       ÉTAPE 5 — Synthèse : le défi des températures
    ═══════════════════════════════════════════════════════ */
    {
      id: 'defi',
      badge: 'Étape 5 · Défi final',
      title: 'Le défi des températures',
      objective: `Combiner déclaration, boucle, accumulateur et recherche de maximum pour résoudre un problème complet en C.`,

      intro: {
        text: `Tu as maintenant toutes les pièces du puzzle. Ce défi final te demande de les assembler. La méthode des bons programmeurs est toujours la même : d'abord décrire l'algorithme en français (ou en pseudo-code), puis le traduire en C. C'est ce que tu vas faire ici. On te donne un tableau de 7 températures : {28, 31, 25, 33, 30, 27, 29}. Ton objectif : trouver le jour le plus chaud ET calculer la température moyenne de la semaine. Avant d'écrire une seule ligne de C, lis l'objectif, et réponds mentalement : comment parcourir une liste pour en trouver le maximum ? Quelle valeur donner à la variable "max" au départ ? Pourquoi ?`,
      },

      illustration: 'accumulator',

      codeBlocks: [
        {
          id: 'algo-max',
          label: 'Voici la logique — trouver le maximum',
          code: `// Algorithme : chercher le maximum dans un tableau
//
// Idée : on suppose que le premier élément est le max.
// Ensuite, on vérifie chaque case. Si elle est plus grande → c'est le nouveau max.

int temps[7] = {28, 31, 25, 33, 30, 27, 29};
int max = temps[0];  // on suppose que la 1ère valeur est la plus grande

for(int i = 1; i < 7; i++) {  // on part de 1, car [0] est déjà pris en compte
    if(temps[i] > max) {
        max = temps[i];  // on met à jour si on trouve une valeur plus grande
    }
}
printf("Jour le plus chaud : %d degres\\n", max);  // 33`,
          type: 'good',
          comment: `Pourquoi initialiser max avec temps[0] et non avec 0 ? Si toutes les températures sont positives, ça fonctionnerait. Mais si elles étaient négatives (températures hivernales), démarrer à 0 donnerait un résultat faux. Partir de temps[0] est toujours correct, quelle que soit la plage de valeurs.`,
        },
        {
          id: 'algo-moyenne',
          label: 'Voici la logique — calculer la moyenne',
          code: `int temp[7] = {28, 31, 25, 33, 30, 27, 29};
int somme = 0;

for(int i = 0; i < 7; i++) {
    somme = somme + temp[i];
}
// somme = 28+31+25+33+30+27+29 = 203

float moyenne = somme / 7.0;  // ← 7.0 et non 7
// Si on divise un int par un int → résultat int (la décimale est perdue !)
// 203 / 7 = 28  (int)       ← FAUX
// 203 / 7.0 = 29.0  (float) ← CORRECT

printf("Moyenne : %.1f degres\\n", moyenne);  // 29.0`,
          type: 'neutral',
          comment: `La division entière est un piège classique en C. 203 / 7 donne 28, pas 28.97. En divisant par 7.0 (un flottant), C convertit automatiquement la somme en flottant avant de diviser. Résultat : 29.0.`,
        },
      ],

      keyPoint: `Deux patterns à retenir : (1) max = premier_élément, puis vérifier chaque case. (2) somme = 0, accumuler dans une boucle, diviser par taille en flottant. Ces deux patterns se retrouvent dans la quasi-totalité des algorithmes sur les tableaux — en C, Python, Java, ou n'importe quel autre langage.`,

      exercise: {
        type: 'code',
        question: 'Le défi complet',
        prompt: `Le défi final — combine tout ce que tu as appris.

Contexte : une station météo a relevé les températures sur 7 jours : {28, 31, 25, 33, 30, 27, 29}

Avant de coder, décris en français les étapes de ton programme (dans les commentaires du code).

Ensuite, écris un programme qui :
1. Déclare le tableau des températures
2. Parcourt le tableau pour trouver la température maximale
3. Parcourt le tableau pour calculer la moyenne
4. Affiche : "Jour le plus chaud : X degres" et "Moyenne semaine : X.X degres"

Rappel : divise la somme par 7.0 (pas 7) pour avoir un résultat décimal.`,
        starter: `#include <stdio.h>

int main() {
    // 1. Déclare le tableau
    int temp[7] = {28, 31, 25, 33, 30, 27, 29};

    // 2. Trouve le maximum
    // Étape logique : initialiser max avec la 1ère valeur, puis comparer
    int max = /* ... */;

    for(int i = 1; i < 7; i++) {
        if(/* condition */) {
            max = temp[i];
        }
    }

    // 3. Calcule la somme et la moyenne
    int somme = 0;

    for(int i = 0; i < 7; i++) {
        // somme = somme + ...
    }

    float moy = somme / /* 7.0 ? */;

    // 4. Affiche les résultats
    printf("Jour le plus chaud : %d degres\\n", max);
    printf("Moyenne semaine : %.1f degres\\n", moy);

    return 0;
}`,
        hints: [
          `int max = temp[0]; — initialise max avec la première valeur du tableau.`,
          `if(temp[i] > max) { max = temp[i]; } — met à jour max si on trouve une valeur plus grande.`,
          `float moy = somme / 7.0; — le 7.0 force la division en flottant. Avec juste 7, le résultat serait tronqué.`,
        ],
        test: (code) =>
          /for\s*\(/.test(code) &&
          /max/.test(code) &&
          /(somme|total|sum)/.test(code) &&
          /7\.0/.test(code) &&
          /printf.*max/.test(code) &&
          /printf.*moy/.test(code),
      },
    },

  ],
}
