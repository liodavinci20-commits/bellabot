// ─────────────────────────────────────────────────────────────
// BASE DE CONNAISSANCES — Chatbot Bella
// Sujet : Les Tableaux en C
// Profil : Actif + Sensoriel (15 ans)
// ─────────────────────────────────────────────────────────────

export const CHATBOT_KB = [

  /* ══════════════════════════════════════
     BLOC 1 — Déclaration
  ══════════════════════════════════════ */
  {
    id: 'def-tableau',
    keywords: ['tableau', "c'est quoi", 'definition', 'qu est ce', 'keskon', 'array', 'c quoi', 'sert', 'utilite', 'pourquoi', 'interet', 'avantage', 'a quoi'],
    response: {
      text: "Un **tableau** en C, c'est une variable qui contient plusieurs valeurs du même type, rangées dans des cases numérotées. Au lieu de créer une variable par valeur, tu en crées une seule qui les contient toutes. C'est comme un casier scolaire avec des compartiments numérotés.",
      example: `// Sans tableau : 5 variables séparées → galère
int note1 = 12, note2 = 8, note3 = 15, note4 = 9, note5 = 14;

// Avec tableau : une seule ligne pour tout
int notes[5] = {12, 8, 15, 9, 14};
//              [0] [1] [2] [3] [4]  ← numéros des cases (indices)`,
      tip: "Dès que tu as plusieurs valeurs du même type à stocker, pense tableau. 30 notes = 1 tableau de 30 cases, pas 30 variables.",
    },
  },

  {
    id: 'type-tableau',
    keywords: ['int', 'float', 'difference', 'type', 'entier', 'decimal', 'virgule', 'reel', 'choisir type'],
    response: {
      text: "Le **type** du tableau définit quel genre de valeur chaque case peut contenir. `int` pour les nombres entiers (sans virgule), `float` pour les nombres décimaux (avec virgule). Tu dois choisir le bon type selon ce que tu veux stocker.",
      example: `int   notes[5];         // des entiers : 12, 8, 15...
float temperatures[4];  // des décimaux : 18.5, 23.0, 14.7...
// char  prenom[20];    // des caractères (on verra plus tard)

// ⚠️ Un tableau int ne peut pas stocker 18.5
// Le .5 serait perdu — il resterait juste 18`,
      tip: "Si tes valeurs peuvent avoir une partie décimale (notes sur 20 avec demi-points, températures...), utilise float. Sinon, int suffit.",
    },
  },

  {
    id: 'taille-fixe',
    keywords: ['changer taille', 'agrandir', 'reduire', 'modifier taille', 'ajouter case', 'taille fixe', 'dynamique', 'apres declaration'],
    response: {
      text: "Non, en C la taille d'un tableau est **fixée une fois pour toutes** à la déclaration. Tu ne peux pas ajouter ou supprimer des cases après coup. C'est une contrainte importante du C : quand tu déclares `int notes[5]`, le programme réserve exactement 5 cases en mémoire — ni plus, ni moins.",
      example: `int notes[5] = {12, 8, 15, 9, 14};

// ❌ Impossible en C :
// notes[5] = 20;  // cette case n'existe pas !

// ✅ Si tu as besoin de plus de place, tu dois redéclarer
// avec une taille plus grande DÈS LE DÉPART :
int notes_grand[10];  // 10 cases dès le début`,
      tip: "Prévois toujours assez grand. C'est mieux d'avoir quelques cases vides que de manquer de place.",
    },
  },

  {
    id: 'accolades',
    keywords: ['accolade', 'accolades', 'pourquoi', 'initialiser', 'valeurs', 'remplir', 'declarer valeurs'],
    response: {
      text: "Les **accolades { }** servent à donner les valeurs initiales du tableau au moment de la déclaration. Les valeurs sont séparées par des virgules et rangées dans les cases dans l'ordre : la première valeur va dans la case [0], la deuxième dans [1], etc.",
      example: `int notes[5] = {12, 8, 15, 9, 14};
//               ↑   ↑   ↑   ↑   ↑
//              [0] [1] [2] [3] [4]

// Si tu n'initialises pas, les cases contiennent
// des valeurs aléatoires (des déchets mémoire) :
int tableau_vide[5];  // cases avec valeurs imprévisibles !`,
      tip: "Le nombre de valeurs entre { } doit correspondre exactement à la taille déclarée. 5 cases = 5 valeurs.",
    },
  },

  {
    id: 'init-optionnelle',
    keywords: ['obligatoire', 'valeurs obligatoire', 'sans valeur', 'vide', 'declarer sans', 'juste declarer'],
    response: {
      text: "Non, tu n'es **pas obligé** de mettre des valeurs à la déclaration. Tu peux déclarer un tableau vide et le remplir plus tard — case par case ou avec scanf. Mais attention : si tu déclares sans initialiser, les cases contiennent des valeurs aléatoires (ce qui reste en mémoire du programme précédent).",
      example: `// Déclaration sans initialisation — tableau "vide"
int notes[5];   // cases existent mais contenu = valeurs aléatoires !

// Remplissage après coup :
notes[0] = 12;
notes[1] = 8;
// ... ou avec une boucle + scanf`,
      tip: "Si tu déclares sans initialiser, remplis toutes les cases avant de les utiliser. Lire une case non initialisée, c'est lire des données aléatoires.",
    },
  },

  /* ══════════════════════════════════════
     BLOC 2 — Indices
  ══════════════════════════════════════ */
  {
    id: 'indice-zero',
    keywords: ['zero', '0', 'commence', 'indice 0', 'pourquoi 0', 'pas 1', 'commence a 0', 'debut'],
    response: {
      text: "En C (et dans presque tous les langages), les indices commencent à **0** parce que c'est lié à la façon dont la mémoire fonctionne : l'indice représente le *décalage* par rapport au début du tableau. Le premier élément est à 0 décalage = indice 0. C'est une convention qu'il faut mémoriser une fois pour toutes.",
      example: `int notes[5] = {12, 8, 15, 9, 14};
//  Indice :        0   1   2   3   4

printf("%d", notes[0]);  // 12 ← PREMIER  (indice 0)
printf("%d", notes[1]);  // 8  ← DEUXIÈME (indice 1)
printf("%d", notes[4]);  // 14 ← DERNIER  (indice 4, pas 5)`,
      tip: "Mémo rapide : 3ème élément = indice 2. Toujours enlever 1 au numéro naturel pour avoir l'indice.",
    },
  },

  {
    id: 'dernier-element',
    keywords: ['dernier', 'fin', 'derniere case', 'dernier element', 'dernier indice', 'fin du tableau'],
    response: {
      text: "Le **dernier élément** d'un tableau de taille N est toujours à l'indice **N - 1**. Pour un tableau de 5 cases, le dernier est à l'indice 4. Pour un tableau de 30 cases, il sera à l'indice 29.",
      example: `int notes[5] = {12, 8, 15, 9, 14};
// Taille = 5  →  dernier indice = 5 - 1 = 4

printf("%d", notes[4]);   // ✅ 14 — dernière case
printf("%d", notes[5]);   // ❌ ERREUR — cette case n'existe pas !`,
      tip: "Formule à retenir : dernier indice = taille - 1. Toujours.",
    },
  },

  {
    id: 'hors-limites',
    keywords: ['hors limite', 'indice invalide', 'depasse', 'trop grand', 'inexistant', 'crash', 'plante', 'erreur indice', 'out of bounds'],
    response: {
      text: "Si tu utilises un indice qui n'existe pas (par exemple [5] sur un tableau de 5 cases), le C **ne te prévient pas** et n'affiche pas d'erreur. Il va lire ou écrire dans une zone mémoire qui ne lui appartient pas. Le programme peut alors afficher des valeurs bizarres, se comporter de façon imprévisible, ou planter — parfois plus tard, ce qui rend le bug très difficile à trouver.",
      example: `int notes[5] = {12, 8, 15, 9, 14};
// Indices valides : 0, 1, 2, 3, 4

notes[5] = 99;  // ❌ DANGEREUX : case 5 n'existe pas
                // C écrit sur la mémoire d'autre chose

// Python lancerait une erreur claire : IndexError
// C lui, se tait et continue — c'est un bug silencieux`,
      tip: "Toujours vérifier : indice valide = entre 0 et taille-1 inclus. C ne te protège pas, c'est à toi d'être vigilant.",
    },
  },

  {
    id: 'calcul-indice',
    keywords: ['5eme', '3eme', '2eme', 'ieme', 'nieme', 'calcul indice', 'quel indice', 'correspondance', 'numero case'],
    response: {
      text: "Pour trouver l'indice d'un élément, il suffit de **soustraire 1** à son numéro naturel. Le 1er élément → indice 0. Le 5ème élément → indice 4. Le Nème élément → indice N-1.",
      example: `int notes[6] = {12, 8, 15, 9, 14, 11};

// 1er élément  → indice 0 → notes[0] = 12
// 3ème élément → indice 2 → notes[2] = 15
// 5ème élément → indice 4 → notes[4] = 14
// 6ème élément → indice 5 → notes[5] = 11 (dernier)`,
      tip: "Numéro naturel - 1 = indice. 5ème élément = indice 4.",
    },
  },

  {
    id: 'taille-tableau',
    keywords: ['combien case', 'taille', 'longueur', 'nombre case', 'sizeof', 'savoir taille'],
    response: {
      text: "La taille d'un tableau est définie quand tu le déclares — c'est le nombre entre crochets. Tu dois toujours garder cette information quelque part (souvent dans une variable ou une constante) car C ne te donne pas de fonction directe pour la connaître à la volée.",
      example: `int notes[5] = {12, 8, 15, 9, 14};
// La taille, c'est le 5 dans notes[5]

// Astuce : déclarer la taille comme constante
#define TAILLE 5
int notes[TAILLE] = {12, 8, 15, 9, 14};

// Maintenant si tu changes TAILLE en 6, tout le code s'adapte`,
      tip: "Utilise #define TAILLE 5 pour éviter de répéter le chiffre 5 partout. Si tu dois changer la taille, tu n'as qu'un endroit à modifier.",
    },
  },

  /* ══════════════════════════════════════
     BLOC 3 — Lecture et modification
  ══════════════════════════════════════ */
  {
    id: 'afficher-case',
    keywords: ['afficher', 'affiche', 'printf', 'lire case', 'afficher une', 'voir valeur', 'recuperer valeur'],
    response: {
      text: "Pour afficher la valeur d'une case précise, utilise `printf` avec le nom du tableau et l'indice entre crochets. Le format `%d` est pour les entiers (int) et `%f` pour les décimaux (float).",
      example: `int notes[5] = {12, 8, 15, 9, 14};

printf("%d\\n", notes[0]);  // affiche 12 (1ère case)
printf("%d\\n", notes[2]);  // affiche 15 (3ème case)
printf("%d\\n", notes[4]);  // affiche 14 (dernière case)

// Pour un float :
float temp[3] = {18.5, 23.0, 14.7};
printf("%.1f\\n", temp[1]);  // affiche 23.0`,
      tip: "Le \\n à la fin de printf fait un saut de ligne. Sans lui, tous les nombres s'affichent sur la même ligne.",
    },
  },

  {
    id: 'modifier-case',
    keywords: ['modifier', 'changer valeur', 'mettre valeur', 'assignation', 'changer case', 'remplacer'],
    response: {
      text: "Modifier une case d'un tableau se fait exactement comme une assignation normale de variable : tu écris `tableau[indice] = nouvelle_valeur;`. La nouvelle valeur remplace l'ancienne dans cette case.",
      example: `int notes[5] = {12, 8, 15, 9, 14};
// Avant : notes = {12, 8, 15, 9, 14}

notes[1] = 20;   // la case [1] passe de 8 à 20
notes[3] = 18;   // la case [3] passe de 9 à 18

// Après : notes = {12, 20, 15, 18, 14}
//                  [0]  [1] [2]  [3] [4]
printf("%d", notes[1]);  // affiche 20`,
      tip: "Modifier une case n'affecte que cette case — les autres restent intactes.",
    },
  },

  {
    id: 'independance-cases',
    keywords: ['autres cases', 'touche pas', 'independant', 'modifie autres', 'reste intact', 'changer une seule'],
    response: {
      text: "Oui, les cases d'un tableau sont totalement **indépendantes**. Modifier une case ne change rien aux autres. C'est comme changer la note d'un seul élève sur une feuille de classe : les autres notes restent identiques.",
      example: `int notes[5] = {12, 8, 15, 9, 14};

notes[2] = 20;  // seule la case [2] change

// Résultat :
// notes[0] = 12  ← pas touché
// notes[1] = 8   ← pas touché
// notes[2] = 20  ← modifié
// notes[3] = 9   ← pas touché
// notes[4] = 14  ← pas touché`,
      tip: "Chaque case vit sa propre vie. Tu opères case par case, indice par indice.",
    },
  },

  {
    id: 'afficher-tout',
    keywords: ['afficher tout', 'toutes les cases', 'afficher tableau', 'voir tout', 'afficher tous', 'tout afficher'],
    response: {
      text: "Pour afficher toutes les cases d'un tableau, on utilise une **boucle for**. La variable `i` joue le rôle d'indice : elle part de 0 et avance jusqu'à la dernière case.",
      example: `int notes[5] = {12, 8, 15, 9, 14};

for(int i = 0; i < 5; i++) {
    printf("notes[%d] = %d\\n", i, notes[i]);
}

// Affiche :
// notes[0] = 12
// notes[1] = 8
// notes[2] = 15
// notes[3] = 9
// notes[4] = 14`,
      tip: "La condition i < 5 (et non i <= 5) est cruciale. Avec <=, i atteindrait 5 et tu sortirais des limites du tableau.",
    },
  },

  /* ══════════════════════════════════════
     BLOC 4 — scanf et le symbole &
  ══════════════════════════════════════ */
  {
    id: 'esperluette',
    keywords: ['&', 'esperluette', 'arobase', 'adresse', 'ampersand', 'pourquoi &', 'c est quoi &'],
    response: {
      text: "Le symbole **&** (esperluette) devant une variable signifie \"l'adresse de\". scanf a besoin de savoir **où exactement en mémoire** stocker la valeur que l'utilisateur tape. En lui donnant &notes[i], tu lui donnes l'adresse de la case i. Sans ça, scanf ne sait pas où écrire.",
      example: `int notes[5];

for(int i = 0; i < 5; i++) {
    printf("Entrez la note %d : ", i + 1);
    scanf("%d", &notes[i]);
    //          ↑
    //    & = "adresse de la case i"
    //    scanf va stocker la valeur tapée exactement là
}`,
      tip: "Retiens juste la règle : scanf et & vont TOUJOURS ensemble. C'est une règle absolue du C.",
    },
  },

  {
    id: 'oubli-esperluette',
    keywords: ['oublie &', 'sans &', 'oublier esperluette', 'plante', 'crash scanf', 'erreur scanf'],
    response: {
      text: "Si tu oublies le & dans scanf, le programme **plante ou donne des résultats complètement faux**. Sans &, tu donnes à scanf la valeur de la variable (ce qu'elle contient) au lieu de son adresse (où elle est en mémoire). scanf essaie alors d'aller écrire à une adresse aléatoire — comportement imprévisible et dangereux.",
      example: `int notes[5];

// ✅ Correct :
scanf("%d", &notes[0]);   // scanf écrit à l'adresse de notes[0]

// ❌ Incorrect — bug silencieux ou crash :
scanf("%d", notes[0]);    // scanf reçoit la valeur (aléatoire)
                          // et essaie d'écrire à cette adresse`,
      tip: "Si ton programme plante mystérieusement sur un scanf, la première chose à vérifier c'est le &.",
    },
  },

  {
    id: 'format-scanf',
    keywords: ['%d', '%f', 'format', 'difference format', 'quel format', 'entier scanf', 'float scanf'],
    response: {
      text: "Dans scanf (et printf), le **format** indique quel type de valeur tu lis ou affiches. `%d` est pour les entiers (int), `%f` pour les décimaux (float). Si tu utilises le mauvais format, les données seront mal interprétées.",
      example: `// Pour un tableau d'entiers (int) :
int notes[5];
scanf("%d", &notes[i]);    // %d pour int
printf("%d", notes[i]);    // %d pour int

// Pour un tableau de décimaux (float) :
float temperatures[4];
scanf("%f", &temperatures[i]);   // %f pour float
printf("%.2f", temperatures[i]); // %.2f = float avec 2 décimales`,
      tip: "%d = entier (int). %f = décimal (float). %.2f = décimal avec exactement 2 chiffres après la virgule.",
    },
  },

  {
    id: 'saisie-tableau',
    keywords: ['saisir', 'clavier', 'remplir clavier', 'entrer valeur', 'utilisateur', 'saisie', 'lire clavier'],
    response: {
      text: "Pour remplir un tableau avec des valeurs tapées au clavier, on combine une **boucle for** et **scanf**. La boucle passe sur chaque case, et scanf attend que l'utilisateur tape une valeur avant de continuer.",
      example: `int notes[5];

for(int i = 0; i < 5; i++) {
    printf("Entrez la note numero %d : ", i + 1);
    scanf("%d", &notes[i]);
}

// Puis on peut afficher pour vérifier :
for(int i = 0; i < 5; i++) {
    printf("Note %d : %d\\n", i + 1, notes[i]);
}`,
      tip: "Utilise i + 1 dans le message (\"note numero 1\") mais &notes[i] pour scanf (indice réel 0). L'affichage est pour l'humain, l'indice est pour la machine.",
    },
  },

  /* ══════════════════════════════════════
     BLOC 5 — Boucles
  ══════════════════════════════════════ */
  {
    id: 'boucle-for',
    keywords: ['boucle', 'for', 'parcourir', 'iterer', 'boucle for', 'comment boucle', 'structure for'],
    response: {
      text: "La **boucle for** est la structure idéale pour parcourir un tableau. Elle a 3 parties : initialisation (i = 0), condition (i < taille) et incrément (i++). À chaque tour, i augmente de 1 et tu accèdes à la case suivante du tableau.",
      example: `int notes[5] = {12, 8, 15, 9, 14};

for(int i = 0; i < 5; i++) {
// ↑ début     ↑ condition  ↑ avance
// i commence à 0     i < 5 = tant que i est valide    i++ = i = i + 1

    printf("notes[%d] = %d\\n", i, notes[i]);
}
// Tour 1 : i=0 → notes[0]=12
// Tour 2 : i=1 → notes[1]=8
// ...
// Tour 5 : i=4 → notes[4]=14
// i devient 5 → 5 < 5 est FAUX → la boucle s'arrête`,
      tip: "i joue le rôle de télécommande : il pointe vers la case courante. À chaque tour, il passe à la case suivante.",
    },
  },

  {
    id: 'condition-boucle',
    keywords: ['i < 5', 'i <= 5', 'condition', 'pourquoi <', 'pas <=', 'strictement', 'inferieur'],
    response: {
      text: "La condition doit être `i < 5` (strictement inférieur) et **non** `i <= 5` (inférieur ou égal). Avec `i <= 5`, la boucle continuerait jusqu'à i = 5 inclus, ce qui correspondrait à la case [5] — qui n'existe pas pour un tableau de 5 cases. Tu sortirais des limites.",
      example: `int notes[5] = {12, 8, 15, 9, 14};
// Taille = 5, indices valides = 0 à 4

// ✅ Correct :
for(int i = 0; i < 5; i++) {   // i : 0, 1, 2, 3, 4 → OK
    printf("%d", notes[i]);
}

// ❌ Dangereux :
for(int i = 0; i <= 5; i++) {  // i : 0, 1, 2, 3, 4, 5 → notes[5] n'existe pas !
    printf("%d", notes[i]);
}`,
      tip: "Règle simple : pour un tableau de taille N, la condition est toujours i < N. Jamais i <= N.",
    },
  },

  {
    id: 'increment-decrement',
    keywords: ['i++', 'i--', 'increment', 'decrement', 'difference', 'augmente', 'diminue', 'plus plus', 'moins moins'],
    response: {
      text: "`i++` signifie \"augmente i de 1\" — la boucle avance vers la droite (case 0, 1, 2, 3, 4). `i--` signifie \"diminue i de 1\" — utilisé pour parcourir le tableau à l'envers (case 4, 3, 2, 1, 0).",
      example: `int notes[5] = {12, 8, 15, 9, 14};

// i++ → du début vers la fin (sens normal)
for(int i = 0; i < 5; i++) {
    printf("%d ", notes[i]);  // affiche : 12 8 15 9 14
}

// i-- → de la fin vers le début (sens inverse)
for(int i = 4; i >= 0; i--) {
    printf("%d ", notes[i]);  // affiche : 14 9 15 8 12
}`,
      tip: "i++ est l'incrément standard pour parcourir dans l'ordre. i-- sert à lire le tableau à l'envers.",
    },
  },

  {
    id: 'sens-inverse',
    keywords: ['inverse', 'envers', 'a l envers', 'du dernier', 'sens inverse', 'retour', 'backwards', 'decrementer'],
    response: {
      text: "Pour parcourir un tableau de la **dernière case vers la première**, on fait démarrer i à la dernière case (taille - 1 = 4) et on utilise i-- avec la condition i >= 0.",
      example: `int notes[5] = {12, 8, 15, 9, 14};

for(int i = 4; i >= 0; i--) {
//         ↑          ↑   ↑
//   commence à 4  s'arrête à 0  diminue à chaque tour

    printf("notes[%d] = %d\\n", i, notes[i]);
}
// Affiche :
// notes[4] = 14
// notes[3] = 9
// notes[2] = 15
// notes[1] = 8
// notes[0] = 12`,
      tip: "Commence à taille-1, condition i >= 0, incrément i--. C'est le miroir exact de la boucle normale.",
    },
  },

  /* ══════════════════════════════════════
     BLOC 6 — Somme et moyenne
  ══════════════════════════════════════ */
  {
    id: 'somme',
    keywords: ['somme', 'total', 'additionner', 'calculer somme', 'ajouter tous', 'addition tableau', 'cumul'],
    response: {
      text: "Pour calculer la somme d'un tableau, on utilise une variable `somme` initialisée à 0, et on parcourt toutes les cases en ajoutant chaque valeur. La variable grossit à chaque tour — c'est ce qu'on appelle un accumulateur.",
      example: `int notes[5] = {12, 8, 15, 9, 14};
int somme = 0;  // IMPORTANT : part de 0 avant la boucle

for(int i = 0; i < 5; i++) {
    somme += notes[i];  // = somme = somme + notes[i]
}
// Tour 1 : somme = 0  + 12 = 12
// Tour 2 : somme = 12 + 8  = 20
// Tour 3 : somme = 20 + 15 = 35
// Tour 4 : somme = 35 + 9  = 44
// Tour 5 : somme = 44 + 14 = 58

printf("Somme : %d\\n", somme);  // affiche 58`,
      tip: "Initialise somme à 0 AVANT la boucle, jamais dedans. Si tu l'initialises à l'intérieur, elle sera remise à 0 à chaque tour.",
    },
  },

  {
    id: 'division-float',
    keywords: ['5.0', '6.0', 'point', 'pourquoi .0', 'virgule perdue', 'division entiere', 'decimal moyenne', 'partie decimale'],
    response: {
      text: "En C, quand tu divises deux entiers (int), le résultat est **toujours un entier** — la partie décimale est perdue sans arrondi. Pour forcer une division décimale, au moins l'un des deux nombres doit être un float. On écrit 5.0 au lieu de 5 pour ça.",
      example: `int somme = 58;

// ❌ Division entière : résultat tronqué
int moyenne_fausse = somme / 5;
printf("%d\\n", moyenne_fausse);   // affiche 11, pas 11.6 !

// ✅ Division décimale : résultat correct
float moyenne = somme / 5.0;      // 5.0 force la division float
printf("%.2f\\n", moyenne);        // affiche 11.60`,
      tip: "Règle simple : dès que tu veux un résultat avec des décimales, utilise float pour la variable ET 5.0 (pas 5) pour la division.",
    },
  },

  {
    id: 'operateur-plus-egal',
    keywords: ['+=', 'plus egal', 'raccourci', 'cumul', 'somme +=', 'c est quoi +=', 'signifie'],
    response: {
      text: "`somme += notes[i]` est exactement la même chose que `somme = somme + notes[i]`. C'est juste une **écriture raccourcie** pour cumuler. Les deux sont correctes et interchangeables — la version raccourcie est juste plus rapide à écrire.",
      example: `// Ces deux lignes font exactement la même chose :
somme = somme + notes[i];   // version longue
somme += notes[i];          // version courte (raccourci)

// Autres raccourcis similaires :
x -= 5;   // équivaut à : x = x - 5
x *= 2;   // équivaut à : x = x * 2
x /= 3;   // équivaut à : x = x / 3`,
      tip: "+= est le raccourci le plus utilisé avec les boucles et les tableaux. Prends l'habitude de l'écrire.",
    },
  },

  /* ══════════════════════════════════════
     BLOC 7 — Min et Max
  ══════════════════════════════════════ */
  {
    id: 'maximum',
    keywords: ['maximum', 'max', 'plus grand', 'valeur max', 'trouver max', 'plus grande valeur', 'meilleur'],
    response: {
      text: "Pour trouver le **maximum**, on suppose au départ que la première case est la plus grande. Puis on compare avec toutes les autres : si on en trouve une plus grande, elle devient le nouveau max. La boucle commence à l'indice 1 (pas 0) car l'indice 0 est déjà notre point de départ.",
      example: `int notes[5] = {12, 8, 15, 9, 14};
int max = notes[0];  // hypothèse de départ : le 1er est le plus grand

for(int i = 1; i < 5; i++) {   // commence à 1, pas 0 !
    if(notes[i] > max) {
        max = notes[i];  // on a trouvé plus grand → nouveau max
    }
}

printf("Maximum : %d\\n", max);  // affiche 15`,
      tip: "Boucle commence à i = 1 car l'indice 0 est déjà le candidat initial. Comparer max avec lui-même (à i=0) serait inutile.",
    },
  },

  {
    id: 'minimum',
    keywords: ['minimum', 'min', 'plus petit', 'valeur min', 'trouver min', 'plus petite valeur', 'moins bon'],
    response: {
      text: "Pour trouver le **minimum**, c'est la même logique que le maximum mais avec `<` au lieu de `>`. On part du premier élément comme candidat minimum, puis on cherche plus petit.",
      example: `int notes[5] = {12, 8, 15, 9, 14};
int min = notes[0];  // hypothèse : le 1er est le plus petit

for(int i = 1; i < 5; i++) {   // commence à 1 !
    if(notes[i] < min) {       // < pour le minimum (> pour le maximum)
        min = notes[i];
    }
}

printf("Minimum : %d\\n", min);  // affiche 8`,
      tip: "Maximum → condition >  |  Minimum → condition <. C'est la seule différence entre les deux algorithmes.",
    },
  },

  {
    id: 'init-min-max',
    keywords: ['initialiser min', 'pourquoi notes[0]', 'pas 0 pour min', 'valeur depart', 'commencer par', 'initialisation min max'],
    response: {
      text: "On initialise min et max avec `notes[0]` (la première case du tableau) et **jamais avec 0**. Pourquoi ? Si toutes les notes du tableau étaient négatives (ex: -5, -8, -3), un min initialisé à 0 serait faux — il dirait que le minimum est 0, alors qu'il n'est même pas dans le tableau.",
      example: `// ❌ Initialisation avec 0 — faux si toutes les valeurs sont positives
//    et encore plus faux avec des valeurs négatives
int min = 0;   // 0 n'est peut-être pas dans le tableau !

// ✅ Correct — on prend une valeur qui EST dans le tableau
int min = notes[0];   // la 1ère case est forcément dans le tableau

// Exemple problématique avec min = 0 :
int temperatures[3] = {-5, -8, -3};
// Si min = 0 → la boucle ne trouvera jamais rien < 0... FAUX
// Si min = temperatures[0] = -5 → correct, -8 sera trouvé`,
      tip: "Toujours initialiser min et max avec une valeur qui EST dans le tableau. La première case (indice 0) est le choix naturel.",
    },
  },

  {
    id: 'indice-max',
    keywords: ['indice max', 'position max', 'ou se trouve', 'quel indice maximum', 'localiser max', 'trouver position'],
    response: {
      text: "Pour retrouver **à quel indice** se trouve le maximum, on utilise une variable supplémentaire `indice_max` qu'on met à jour en même temps que max. Quand on trouve un nouveau maximum, on mémorise aussi sa position.",
      example: `int scores[6] = {45, 78, 23, 91, 56, 67};
int max = scores[0];
int indice_max = 0;   // on mémorise aussi l'indice !

for(int i = 1; i < 6; i++) {
    if(scores[i] > max) {
        max = scores[i];
        indice_max = i;   // mise à jour de l'indice en même temps
    }
}

printf("Max = %d à l'indice %d\\n", max, indice_max);
// affiche : Max = 91 à l'indice 3`,
      tip: "Chaque fois que tu mets à jour max, mets aussi à jour indice_max. Les deux vont toujours ensemble.",
    },
  },

  /* ══════════════════════════════════════
     BLOC 8 — Recherche
  ══════════════════════════════════════ */
  {
    id: 'recherche-valeur',
    keywords: ['rechercher', 'chercher', 'trouver valeur', 'existe', 'contient', 'est dans', 'search', 'presence'],
    response: {
      text: "Pour chercher si une valeur existe dans un tableau, on parcourt toutes les cases et on compare chacune avec la valeur cherchée. On utilise une variable `trouve` (initialisée à 0 = non trouvé) qu'on passe à 1 quand on trouve.",
      example: `int notes[5] = {12, 8, 15, 9, 14};
int valeur = 15;
int trouve = 0;   // 0 = "pas encore trouvé"

for(int i = 0; i < 5; i++) {
    if(notes[i] == valeur) {   // == pour comparer (≠ = pour assigner)
        trouve = 1;
        printf("Trouve a l'indice %d\\n", i);
    }
}

if(trouve == 0) {
    printf("Valeur non trouvee dans le tableau.\\n");
}`,
      tip: "⚠️ Ne confonds pas = (assigner) et == (comparer). `if(notes[i] = 15)` modifie la case, c'est un bug ! `if(notes[i] == 15)` compare, c'est ce qu'on veut.",
    },
  },

]

/* ══════════════════════════════════════
   RÉPONSE PAR DÉFAUT
══════════════════════════════════════ */
export const DEFAULT_RESPONSE = {
  text: "Je ne suis pas sûr de comprendre ta question. Reformule-la ou clique sur une des questions fréquentes ci-dessous — je ferai de mon mieux pour t'expliquer !",
  suggestions: [
    "C'est quoi un tableau en C ?",
    "Pourquoi les indices commencent à 0 ?",
    "Comment parcourir un tableau ?",
    "Pourquoi le & dans scanf ?",
    "Comment calculer la moyenne ?",
    "Comment trouver le maximum ?",
  ],
}

/* ══════════════════════════════════════
   QUESTIONS RAPIDES (boutons du chat)
══════════════════════════════════════ */
export const QUICK_QUESTIONS = [
  "C'est quoi un tableau ?",
  "Pourquoi l'indice commence à 0 ?",
  "Comment afficher toutes les cases ?",
  "Pourquoi le & dans scanf ?",
  "Comment calculer la somme ?",
  "Pourquoi diviser par 5.0 et pas 5 ?",
  "Comment trouver le maximum ?",
  "Comment trouver le minimum ?",
  "Que se passe-t-il si j'oublie le & ?",
  "C'est quoi i++ et i-- ?",
]
