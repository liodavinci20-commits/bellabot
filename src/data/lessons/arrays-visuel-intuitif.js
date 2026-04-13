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
        test: (code) =>
          /int\s+\w+\s*\[7\]/.test(code) &&
          /\[3\]/.test(code) &&
          /\[6\]/.test(code) &&
          /printf/.test(code),
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
