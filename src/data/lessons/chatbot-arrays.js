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
    section: 'declaration',
    keywords: ['tableau', "c'est quoi", 'definition', 'qu est ce', 'keskon', 'array', 'c quoi', 'sert', 'utilite', 'pourquoi', 'interet', 'avantage', 'a quoi', 'plusieurs variables', 'en meme temps', 'exactement', 'comme plusieurs'],
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
    section: 'declaration',
    keywords: ['int', 'float', 'difference', 'type', 'entier', 'decimal', 'virgule', 'reel', 'choisir type', 'lettres', 'chiffres', 'tableau lettres', 'que des chiffres', 'char'],
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
    section: 'declaration',
    keywords: ['changer taille', 'agrandir', 'reduire', 'modifier taille', 'ajouter case', 'taille fixe', 'dynamique', 'apres declaration', 'a l avance', 'nombre cases avance', 'ecrire avance', 'peut pas changer', 'changer apres'],
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
    section: 'declaration',
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
    section: 'declaration',
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

  {
    id: 'decl-vs-var',
    section: 'declaration',
    keywords: ['int points 5', 'pas juste', 'points egal 5', 'points = 5', 'comme variable', 'difference variable', 'pourquoi pas juste', 'pas int points', 'variable normale'],
    response: {
      text: "Écrire `int points = 5` crée une **variable simple** qui contient la valeur 5 — un seul emplacement mémoire. Écrire `int points[5]` crée un **tableau** avec 5 cases vides numérotées 0, 1, 2, 3, 4. Le `[5]` entre crochets dit au programme \"réserve 5 espaces\", pas \"stocke la valeur 5\".",
      example: `int note = 15;       // variable simple : 1 seul emplacement
//  note = 15

int notes[5];        // tableau : 5 emplacements séparés
//  [0][1][2][3][4]  ← 5 cases vides, pas la valeur 5 !

notes[0] = 12;       // on remplit case par case
notes[1] = 15;`,
      tip: "Si tu confonds les deux, retiens : variable = une boîte. Tableau = un rangement de plusieurs boîtes.",
    },
  },

  {
    id: 'crochets-syntaxe',
    section: 'declaration',
    keywords: ['crochets', 'sert les crochets', 'pourquoi crochets', 'pas des parentheses', 'parentheses', 'a quoi servent', 'role crochets', 'signifie crochets'],
    response: {
      text: "En C, les **crochets `[ ]`** sont réservés aux tableaux — ils signifient \"case numéro\". Les **parenthèses `( )`** sont pour les fonctions (`printf(...)`, `scanf(...)`). C'est une convention du langage : dès que tu vois `[ ]`, tu sais qu'on parle d'un tableau ou d'un indice.",
      example: `int notes[5];          // [ ] = "tableau de 5 cases"
notes[2] = 15;         // [ ] = "case numéro 2"

printf("Valeur");      // ( ) = appel de fonction
scanf("%d", &notes[0]); // les deux : ( ) pour scanf, [ ] pour indice`,
      tip: "Crochets `[ ]` = tableaux et indices. Parenthèses `( )` = fonctions. Ces deux symboles ne s'échangent jamais.",
    },
  },

  {
    id: 'nb-cases',
    section: 'declaration',
    keywords: ['combien de cases', 'combien cases', 'int points 5 cases', 'nombre de cases', 'en vrai combien', 'cases en vrai', 'exactement combien'],
    response: {
      text: "Si tu déclares `int points[5]`, il y a exactement **5 cases** — ni plus, ni moins. Elles sont numérotées de **0 à 4**. Le chiffre entre crochets représente toujours le **nombre total** de cases, jamais le dernier indice.",
      example: `int points[5];
// Case 0 : points[0]  ← PREMIÈRE case
// Case 1 : points[1]
// Case 2 : points[2]
// Case 3 : points[3]
// Case 4 : points[4]  ← DERNIÈRE case (pas points[5] !)
// Total  : 5 cases, indices de 0 à 4`,
      tip: "Mémo : taille = 5 → cases de [0] à [4]. Taille = N → cases de [0] à [N-1].",
    },
  },

  {
    id: 'decl-vs-init',
    section: 'declaration',
    keywords: ['difference declarer initialiser', 'declarer initialiser', 'declaration initialisation', 'c est quoi initialiser', 'c est quoi declarer', 'declarer vs initialiser'],
    response: {
      text: "**Déclarer** = créer le tableau, réserver les cases en mémoire. **Initialiser** = mettre des valeurs dans ces cases. On peut faire les deux en même temps ou séparément. La déclaration est obligatoire. L'initialisation peut venir après.",
      example: `// ── Déclaration seule (cases vides = valeurs aléatoires)
int notes[5];

// ── Initialisation après coup, case par case
notes[0] = 12;
notes[1] = 8;

// ── Déclaration + initialisation en une seule ligne
int scores[3] = {10, 20, 30};`,
      tip: "Pense à déclarer comme \"réserver une table au restaurant\" et initialiser comme \"s'asseoir et commander\".",
    },
  },

  {
    id: 'init-partielle',
    section: 'declaration',
    keywords: ['1 2 3', 'deux dernieres', 'derniere case vaut', 'moins de valeurs', 'pas assez valeurs', 'valent quoi', 'cases restantes', 'init partielle', 'points 5 1 2 3'],
    response: {
      text: "En C, si tu initialises avec **moins de valeurs** que la taille du tableau, les cases restantes sont automatiquement mises à **0**. C'est garanti par le langage — pas de valeurs aléatoires dans ce cas précis.",
      example: `int points[5] = {1, 2, 3};
// points[0] = 1   ← valeur fournie
// points[1] = 2   ← valeur fournie
// points[2] = 3   ← valeur fournie
// points[3] = 0   ← automatiquement 0
// points[4] = 0   ← automatiquement 0

// Astuce : int tab[100] = {0}; → met TOUT à 0`,
      tip: "Astuce utile : `int tab[100] = {0};` initialise toutes les cases à 0 en une seule ligne.",
    },
  },

  {
    id: 'pourquoi-type',
    section: 'declaration',
    keywords: ['pourquoi int avant', 'mettre int', 'a quoi sert int', 'obligatoire int', 'tableau de nombres', 'evident', 'pourquoi preciser', 'type avant'],
    response: {
      text: "Le **type** (`int`, `float`, `char`) est obligatoire car il dit au programme combien de mémoire allouer par case. Un `int` occupe 4 octets, un `float` aussi mais stocke des décimaux, un `char` n'occupe qu'1 octet. Sans ce type, l'ordinateur ne saurait pas combien d'espace réserver pour chaque case.",
      example: `int   notes[5];        // 5 cases × 4 octets = 20 octets réservés
float temps[4];        // 4 cases × 4 octets = 16 octets (décimaux)
char  prenom[20];      // 20 cases × 1 octet  = 20 octets (lettres)

// Chaque type a une "taille" physique différente en mémoire`,
      tip: "int = entiers sans virgule. float = décimaux avec virgule. char = lettres et caractères.",
    },
  },

  {
    id: 'taille-trop-petite',
    section: 'declaration',
    keywords: ['taille trop petite', 'trop petite', 'trop petit', 'pas assez grand', 'depasse taille', 'overflow', 'concrètement', 'concretement', 'fait quoi taille petite'],
    response: {
      text: "Si tu déclares `int notes[3]` mais que tu essaies d'écrire 5 valeurs, les 2 dernières valeurs vont **écraser de la mémoire qui appartient à autre chose**. C ne te prévient pas. Résultats possibles : valeurs d'autres variables corrompues, programme qui plante sans raison apparente, résultats complètement faux. C'est ce qu'on appelle un **buffer overflow** — l'un des bugs les plus dangereux en C.",
      example: `int notes[3];          // on réserve 3 cases seulement

notes[0] = 12;         // ✅ OK
notes[1] = 8;          // ✅ OK
notes[2] = 15;         // ✅ OK
notes[3] = 9;          // ❌ DANGEREUX — écrit en dehors du tableau !
notes[4] = 14;         // ❌ DANGEREUX — écrase d'autres données`,
      tip: "Toujours prévoir assez grand dès le départ. Quelques cases vides ne coûtent presque rien, un buffer overflow peut tout faire planter.",
    },
  },

  {
    id: 'nom-tableau',
    section: 'declaration',
    keywords: ['nom tableau', 'n importe quoi', 'choisir nom', 'nommer tableau', 'nom valide', 'nom variable', 'regles nom', 'appeler tableau'],
    response: {
      text: "Oui, les mêmes règles que pour une variable : lettres, chiffres, underscore `_`. Il faut **commencer par une lettre ou `_`**, jamais par un chiffre. Pas d'espace, pas d'accents, pas de mots-clés réservés (`int`, `for`, `if`...). Choisis un nom qui décrit ce que le tableau contient.",
      example: `// ✅ Noms valides
int notes[5];
int temperatures[12];
float scores_equipe[10];
int tab1[3];

// ❌ Noms invalides
int 1tableau[5];     // commence par un chiffre
int mon tableau[5];  // espace interdit
int int[5];          // mot-clé réservé`,
      tip: "Un bon nom de tableau est au pluriel et décrit son contenu : `notes`, `scores`, `temperatures`. Évite `tab`, `t`, `x` — trop vague.",
    },
  },

  {
    id: 'portee-tableau',
    section: 'declaration',
    keywords: ['fonction', 'dans une fonction', 'existe ailleurs', 'reste du programme', 'portee', 'scope', 'accessible', 'disponible partout', 'autre fonction'],
    response: {
      text: "Non. Un tableau déclaré **dans une fonction** n'existe que dans cette fonction — c'est sa **portée** (scope en anglais). Quand la fonction termine, le tableau disparaît de la mémoire. Pour qu'un tableau soit accessible partout, il faut le déclarer **en dehors de toutes les fonctions** (variable globale) ou le **passer en paramètre** à chaque fonction qui en a besoin.",
      example: `// Variable GLOBALE — accessible partout
int scores[5];

void afficher() {
    printf("%d", scores[0]);  // ✅ accessible ici
}

void calculer() {
    // Variable LOCALE — n'existe que dans calculer()
    int temp[3] = {1, 2, 3};
    printf("%d", temp[0]);    // ✅ ici oui
}
// temp n'existe plus une fois calculer() terminée`,
      tip: "Pour partager un tableau entre fonctions, déclare-le global (avant main) ou passe son nom en paramètre.",
    },
  },

  {
    id: 'memoire-tableau',
    section: 'declaration',
    keywords: ['memoire', 'reserver memoire', 'c est quoi memoire', 'ram', 'prof dit memoire', 'allouer', 'espace memoire', 'reserve'],
    response: {
      text: "Quand tu déclares `int points[5]`, le programme demande à l'ordinateur de **bloquer un espace physique** dans sa mémoire vive (RAM) pour stocker 5 entiers. Imagine la RAM comme une longue rue avec des millions de maisons numérotées — le programme réserve 5 maisons consécutives pour ton tableau. Personne d'autre ne peut les utiliser pendant que ton programme tourne.",
      example: `int points[5];
// Le programme réserve 20 octets en RAM (5 cases × 4 octets chacune)
// Ces 20 octets sont "bloqués" pour points[0] à points[4]
// Adresses mémoire imaginaires :
//  points[0] → adresse 1000
//  points[1] → adresse 1004
//  points[2] → adresse 1008
//  points[3] → adresse 1012
//  points[4] → adresse 1016`,
      tip: "\"Réserver de la mémoire\" = demander à l'OS de te garantir un espace. C'est pour ça que la taille doit être connue à l'avance en C.",
    },
  },

  {
    id: 'taille-implicite',
    section: 'declaration',
    keywords: ['taille implicite', 'crochets vides', 'points vide', 'sans taille', 'int points vide', 'difference points 5', 'automatique taille', 'compter valeurs'],
    response: {
      text: "Ces deux écritures sont **équivalentes** ! Quand tu omets la taille mais que tu fournis des valeurs initiales, le compilateur **compte automatiquement** les valeurs et fixe la taille. `int points[] = {1,2,3,4,5}` → le compilateur voit 5 valeurs → taille = 5 automatiquement. C'est pratique quand tu as beaucoup de valeurs et ne veux pas compter.",
      example: `// Ces deux déclarations sont identiques :
int points[5] = {1, 2, 3, 4, 5};   // taille explicite = 5
int points[]  = {1, 2, 3, 4, 5};   // taille déduite  = 5 (même chose)

// Utile quand la liste est longue :
int jours[] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
// Le compilateur compte : 12 valeurs → taille = 12 automatique`,
      tip: "La syntaxe `[]` sans chiffre ne fonctionne QU'avec une initialisation. Tu ne peux pas écrire `int notes[];` sans valeurs — le compilateur ne saurait pas quelle taille réserver.",
    },
  },

  /* ══════════════════════════════════════
     BLOC 2 — Indices
  ══════════════════════════════════════ */
  {
    id: 'indice-zero',
    section: 'declaration',
    keywords: ['zero', '0', 'commence', 'indice 0', 'pourquoi 0', 'pas 1', 'commence a 0', 'debut', 'comme dans la vie', 'vie normale', 'pas comme', 'indices'],
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
    section: 'acces',
    keywords: ['dernier', 'fin', 'derniere case', 'dernier element', 'dernier indice', 'fin du tableau', 'points 4', 'points 5', 'pourquoi pas points 5', 'tableau fait 5', 'derniere case tableau 5'],
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
    section: 'acces',
    keywords: ['hors limite', 'indice invalide', 'depasse', 'trop grand', 'inexistant', 'crash', 'plante', 'erreur indice', 'out of bounds', 'points 10', 'plante si', 'ne marche pas', 'marche pas tableau', 'previent pas', 'c ne previent', 'pourquoi plante'],
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
    section: 'acces',
    keywords: ['5eme', '3eme', '2eme', 'ieme', 'nieme', 'calcul indice', 'quel indice', 'correspondance', 'numero case', '3eme valeur', 'troisieme valeur', 'points 3 ou points 2', 'je veux la 3', 'points 2 ou points 3'],
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

  {
    id: 'lire-vs-modifier',
    section: 'acces',
    keywords: ['difference lire modifier', 'lire modifier', 'lire vs modifier', 'c est quoi lire', 'c est quoi modifier', 'difference entre lire', 'consulter changer'],
    response: {
      text: "**Lire** une case = consulter sa valeur sans la changer. Tu peux l'afficher avec `printf` ou l'utiliser dans un calcul. **Modifier** une case = écraser l'ancienne valeur par une nouvelle avec `=`. La case change définitivement.",
      example: `int notes[5] = {12, 8, 15, 9, 14};

// LIRE — on consulte notes[2], elle reste à 15
printf("%d", notes[2]);        // affiche 15, notes[2] vaut toujours 15
int x = notes[2] + 5;         // calcul, notes[2] reste à 15

// MODIFIER — on écrase la valeur de notes[2]
notes[2] = 20;                 // maintenant notes[2] vaut 20
printf("%d", notes[2]);        // affiche 20`,
      tip: "Lire = regarder. Modifier = écrire par-dessus. La différence : avec `=` à gauche, tu modifies. Sans `=`, tu lis.",
    },
  },

  {
    id: 'indice-variable-debug',
    section: 'acces',
    keywords: ['variable comme indice', 'quelle case je modifie', 'je sais pas quelle case', 'connaitre case', 'savoir quelle case', 'indice variable debug', 'points i quelle case'],
    response: {
      text: "Quand tu utilises `points[i]`, c'est **la valeur de `i` au moment de l'exécution** qui détermine quelle case est accédée. Pour savoir sur quelle case tu opères, tu peux afficher `i` juste avant ou après l'opération. Dans une boucle, `i` change à chaque tour — c'est ce qui te permet de parcourir le tableau.",
      example: `int notes[5] = {12, 8, 15, 9, 14};
int i = 2;

// Pour savoir quelle case : affiche i
printf("Je modifie la case %d\\n", i);   // affiche : Je modifie la case 2
notes[i] = 99;
printf("notes[%d] vaut maintenant %d\\n", i, notes[i]);
// affiche : notes[2] vaut maintenant 99

// Dans une boucle, i change à chaque tour :
for(int i = 0; i < 5; i++) {
    printf("Tour %d : notes[%d] = %d\\n", i, i, notes[i]);
}`,
      tip: "En cas de doute, ajoute un `printf(\"i = %d\\n\", i);` avant l'opération. C'est la technique de débogage de base.",
    },
  },

  {
    id: 'copier-case',
    section: 'acces',
    keywords: ['copier case', 'copier valeur', 'variable normale', 'mettre dans variable', 'stocker case', 'recuperer dans variable', 'copier tableau variable'],
    response: {
      text: "Oui, absolument. Copier une case dans une variable normale se fait exactement comme une assignation classique : `int x = notes[2];`. La variable `x` reçoit la valeur de la case. Modifier `x` ensuite ne change pas `notes[2]` — c'est une copie indépendante.",
      example: `int notes[5] = {12, 8, 15, 9, 14};

// Copier la case [2] dans une variable normale
int meilleure = notes[2];   // meilleure = 15

printf("%d\\n", meilleure);  // affiche 15

// Modifier meilleure ne touche PAS au tableau
meilleure = 99;
printf("%d\\n", notes[2]);   // affiche toujours 15 — le tableau est intact`,
      tip: "Copier une case crée une valeur indépendante. Si tu veux que les modifications se répercutent dans le tableau, il faut écrire directement dans `notes[i]`.",
    },
  },

  {
    id: 'indice-type',
    section: 'acces',
    keywords: ['indice entier', 'obligatoire entier', 'float indice', 'nombre entier indice', 'c est quoi indice', 'type indice', 'indice doit etre', 'indice pas entier'],
    response: {
      text: "Un **indice** est le numéro qui identifie une case dans le tableau. Il doit toujours être un **nombre entier** (int). Un indice avec virgule (float) est interdit — le compilateur le rejette ou le convertit de façon imprévisible. Logiquement, il n'existe pas de \"case 2.7\".",
      example: `int notes[5] = {12, 8, 15, 9, 14};

// ✅ Indices valides — entiers
printf("%d", notes[0]);    // indice 0 : OK
printf("%d", notes[4]);    // indice 4 : OK
int i = 2;
printf("%d", notes[i]);    // indice variable entière : OK

// ❌ Indice float — erreur ou comportement imprévisible
float f = 2.7;
// printf("%d", notes[f]); // Le compilateur refuse ou tronque à 2`,
      tip: "Indice = numéro entier de la case. Toujours >= 0 et < taille. Jamais de virgule, jamais négatif.",
    },
  },

  {
    id: 'indice-variable',
    section: 'acces',
    keywords: ['variable indice', 'points i', 'notes i', 'utiliser variable indice', 'genre points i', 'indice avec variable', 'peut on variable indice'],
    response: {
      text: "Oui ! Utiliser une variable comme indice est non seulement possible, c'est la façon **la plus courante** d'utiliser un tableau. C'est ce qui permet les boucles : `i` change à chaque tour, ce qui accède à chaque case l'une après l'autre.",
      example: `int notes[5] = {12, 8, 15, 9, 14};

// Accès direct avec une variable
int i = 3;
printf("%d", notes[i]);   // équivaut à notes[3] = 9

// Exemple classique : boucle avec i comme indice
for(int i = 0; i < 5; i++) {
    printf("notes[%d] = %d\\n", i, notes[i]);
    //               ↑             ↑
    //        valeur de i      accès à la case i
}`,
      tip: "C'est la combinaison tableau + boucle + variable d'indice qui rend les tableaux vraiment puissants. Sans ça, tu devrais taper notes[0], notes[1]... à la main.",
    },
  },

  {
    id: 'case-non-initialisee',
    section: 'acces',
    keywords: ['avant mis valeur', 'pas initialise', 'case vide', 'sans valeur mise', 'affiche quoi vide', 'valeur par defaut', 'dechet memoire', 'aleatoire', 'non initialise'],
    response: {
      text: "Si tu lis une case **non initialisée**, tu obtiens une **valeur aléatoire** — ce qui restait à cet emplacement mémoire du programme précédent. En C, déclarer un tableau ne met pas les cases à zéro automatiquement (sauf initialisation explicite). Tu peux obtenir n'importe quoi : 0, -1847362, 2147483647...",
      example: `int notes[5];   // déclaré sans valeurs initiales

// ❌ Lire avant d'avoir rempli = valeur imprévisible
printf("%d\\n", notes[0]);   // peut afficher : 0, -1234567, n'importe quoi !

// ✅ Initialiser d'abord, puis lire
notes[0] = 12;
printf("%d\\n", notes[0]);   // affiche 12 — valeur connue et fiable`,
      tip: "Toujours initialiser une case avant de la lire. Lire une case non initialisée est un bug silencieux — le programme tourne mais les données sont fausses.",
    },
  },

  /* ══════════════════════════════════════
     BLOC 3 — Lecture et modification
  ══════════════════════════════════════ */
  {
    id: 'afficher-case',
    section: 'acces',
    keywords: ['afficher', 'affiche', 'printf', 'lire case', 'afficher une', 'voir valeur', 'recuperer valeur', 'lire juste', 'lire une case', 'pas tout le tableau', 'printf points', 'ne marche pas printf', 'comment lire'],
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
    section: 'acces',
    keywords: ['modifier', 'changer valeur', 'mettre valeur', 'assignation', 'changer case', 'remplacer', 'efface', 'ce qu il y avait', 's ajoute', 'points 2 egal 10', 'points 2 = 10'],
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
    section: 'acces',
    keywords: ['autres cases', 'touche pas', 'independant', 'modifie autres', 'reste intact', 'changer une seule', 'les autres cases changent', 'autres changent aussi', 'cas changent'],
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
    section: 'parcours',
    keywords: ['afficher tout', 'toutes les cases', 'afficher tableau', 'voir tout', 'afficher tous', 'tout afficher', 'difference afficher calculer', 'afficher vs calculer'],
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

  {
    id: 'scanf-definition',
    section: 'remplir',
    keywords: ['c est quoi scanf', 'scanf definition', 'comme printf', 'printf a l envers', 'scanf a l envers', 'scanf quoi', 'difference scanf printf', 'scanf sert'],
    response: {
      text: "Oui, c'est exactement la bonne image ! `printf` envoie des données **du programme vers l'écran**. `scanf` fait l'inverse : il reçoit des données **du clavier vers le programme**. Les deux utilisent un format (`%d`, `%f`...) pour savoir quel type de valeur traiter.",
      example: `// printf → programme VERS l'écran
printf("La note est : %d\\n", notes[0]);   // affiche une valeur

// scanf → clavier VERS le programme
scanf("%d", &notes[0]);                    // lit une valeur tapée au clavier

// Même format %d, sens opposé :
// printf %d → transforme le nombre en texte pour l'afficher
// scanf  %d → transforme le texte tapé en nombre pour le stocker`,
      tip: "`printf` parle à l'utilisateur. `scanf` écoute l'utilisateur. Ce sont les deux seules portes d'entrée/sortie de base en C.",
    },
  },

  {
    id: 'pourquoi-boucle-remplir',
    section: 'remplir',
    keywords: ['pourquoi boucle remplir', 'boucle pour remplir', 'pas tout mettre', 'tout d un coup', 'sans boucle remplir', 'pourquoi boucle tableau', 'utilise boucle remplir'],
    response: {
      text: "Techniquement, tu **peux** remplir sans boucle en écrivant un `scanf` par case. Mais imagine 100 valeurs : il faudrait 100 lignes identiques. La boucle **automatise la répétition** : au lieu d'écrire 100 fois la même chose, tu l'écris une fois et tu dis \"répète 100 fois\". Plus le tableau est grand, plus la boucle est indispensable.",
      example: `// Sans boucle — faisable pour 3 cases, impraticable pour 100
scanf("%d", &notes[0]);
scanf("%d", &notes[1]);
scanf("%d", &notes[2]);

// Avec boucle — même résultat, 100 fois moins de code
for(int i = 0; i < 3; i++) {
    scanf("%d", &notes[i]);
}
// Changer 3 en 100 → remplie 100 cases sans toucher au reste`,
      tip: "La boucle est le vrai pouvoir des tableaux. Sans boucle, un tableau de 1000 éléments demanderait 1000 lignes de code.",
    },
  },

  {
    id: 'scanf-trop-valeurs',
    section: 'remplir',
    keywords: ['trop de valeurs', 'plus de valeurs', 'depasse tableau scanf', 'utilisateur tape trop', 'valeurs en trop', 'scanf trop', 'trop valeurs tableau'],
    response: {
      text: "La boucle s'arrête dès que sa condition devient fausse (ex: `i < 5`). Les valeurs supplémentaires tapées par l'utilisateur restent dans le **buffer clavier** — elles ne sont pas perdues, elles attendent. Le prochain `scanf` du programme les lira automatiquement. Cela peut causer des comportements étranges si tu n'y fais pas attention.",
      example: `int notes[3];
for(int i = 0; i < 3; i++) {
    scanf("%d", &notes[i]);
}
// Si l'utilisateur tape : 12 8 15 99 47
// notes[0]=12, notes[1]=8, notes[2]=15
// 99 et 47 restent dans le buffer — le prochain scanf les lira !

// La boucle ne peut pas lire au-delà de i < 3
// Elle n'a aucun moyen d'accéder à notes[3] ou notes[4]`,
      tip: "C ne protège pas contre les saisies excédentaires. Pour un programme robuste, il faut vider le buffer après la boucle de saisie.",
    },
  },

  {
    id: 'i-zero-boucle',
    section: 'remplir',
    keywords: ['i commence 0 boucle', 'pourquoi 0 boucle', 'boucle commence 0', 'pas 1 boucle', 'i = 0 boucle', 'debut 0 boucle'],
    response: {
      text: "Parce que les **indices de tableau commencent à 0**. Si `i` commençait à 1, la case `notes[0]` ne serait jamais remplie — on sauterait la première case. La boucle doit couvrir exactement les indices 0, 1, 2, 3, 4 pour un tableau de 5 cases.",
      example: `int notes[5];

// ✅ Correct : i commence à 0
for(int i = 0; i < 5; i++) {
    scanf("%d", &notes[i]);
}
// Remplit : notes[0], notes[1], notes[2], notes[3], notes[4] ✓

// ❌ Si i commençait à 1 :
for(int i = 1; i < 5; i++) {
    scanf("%d", &notes[i]);
}
// Remplit : notes[1], notes[2], notes[3], notes[4]
// notes[0] est oublié — valeur aléatoire !`,
      tip: "Règle fixe : boucle sur un tableau → `i = 0`, condition `i < taille`. Ce n'est jamais `i = 1`.",
    },
  },

  {
    id: 'remplir-sans-boucle',
    section: 'remplir',
    keywords: ['sans boucle 3 valeurs', 'remplir 3 valeurs', 'seulement 3', 'pas besoin boucle', 'peut remplir sans', 'juste 3 valeurs', 'sans boucle valeurs'],
    response: {
      text: "Oui, tu as deux options sans boucle. **Option 1** : écrire les `scanf` un par un — faisable si tu as 2 ou 3 valeurs. **Option 2** : initialiser directement à la déclaration si les valeurs sont connues à l'avance. La boucle devient vraiment utile à partir de 5-6 valeurs.",
      example: `// Option 1 : scanf individuels (sans boucle)
int notes[3];
printf("Note 1 : "); scanf("%d", &notes[0]);
printf("Note 2 : "); scanf("%d", &notes[1]);
printf("Note 3 : "); scanf("%d", &notes[2]);

// Option 2 : valeurs connues d'avance → initialisation directe
int notes[3] = {12, 8, 15};
// Pas de scanf du tout — valeurs codées dans le programme`,
      tip: "Valeurs fixes connues à l'avance → initialisation directe. Valeurs saisies par l'utilisateur → boucle + scanf.",
    },
  },

  {
    id: 'boucle-infinie-increment',
    section: 'remplir',
    keywords: ['boucle infinie', 'i au lieu de i++', 'oublie increment', 'sans increment', 'boucle infini', 'tourne en boucle', 'bloque', 'i++ manquant', 'pas de i++'],
    response: {
      text: "Oui, c'est une **boucle infinie**. Sans `i++`, la variable `i` reste à 0 pour toujours. La condition `i < 5` est toujours vraie (0 < 5), donc la boucle ne s'arrête jamais. En plus, `notes[0]` est réécrite à chaque tour indéfiniment.",
      example: `int notes[5];

// ❌ Boucle infinie — i ne change jamais
for(int i = 0; i < 5; ) {         // i++ oublié !
    scanf("%d", &notes[i]);        // écrase notes[0] en boucle
}
// Le programme se bloque, il faut forcer l'arrêt (Ctrl+C)

// ✅ Correct — i++ avance vers la condition de sortie
for(int i = 0; i < 5; i++) {
    scanf("%d", &notes[i]);
}`,
      tip: "Si ton programme se bloque et ne répond plus, c'est souvent une boucle infinie. Vérifie que ton incrément (`i++`) est bien présent.",
    },
  },

  {
    id: 'scanf-verification',
    section: 'remplir',
    keywords: ['valeurs correctes apres scanf', 'scanf fonctionne', 'afficher apres scanf', 'pourquoi valeurs ok', 'scanf bien stocke', 'scanf marche'],
    response: {
      text: "Les valeurs sont correctes parce que `scanf` écrit **directement dans la mémoire** de chaque case via l'adresse `&notes[i]`. Dès qu'un `scanf` termine, la valeur est immédiatement en place dans le tableau. Il n'y a pas de délai ni de copie intermédiaire — c'est instantané.",
      example: `int notes[5];

for(int i = 0; i < 5; i++) {
    scanf("%d", &notes[i]);
    // À ce moment précis, notes[i] contient la valeur tapée
    // Tu peux déjà la relire juste après :
    printf("Confirmé : notes[%d] = %d\\n", i, notes[i]);
}`,
      tip: "scanf est fiable tant que le format correspond au type et que le & est présent. Les valeurs sont disponibles immédiatement après chaque appel.",
    },
  },

  {
    id: 'remplir-partiel',
    section: 'remplir',
    keywords: ['quelques cases', 'remplir certaines', 'pas toutes les cases', 'laisser vides', 'remplir partiellement', 'seulement quelques', 'cases vides reste'],
    response: {
      text: "Oui. Tu peux boucler sur seulement une partie des cases. Les cases non remplies conserveront leurs valeurs — aléatoires si le tableau n'a pas été initialisé, ou 0 si tu l'as initialisé à `{0}` au départ.",
      example: `int notes[5] = {0};    // toutes les cases à 0 au départ

// Remplir seulement les 3 premières avec scanf
for(int i = 0; i < 3; i++) {
    scanf("%d", &notes[i]);
}
// notes[0], notes[1], notes[2] → valeurs saisies
// notes[3], notes[4]          → restent à 0

// Ou choisir des cases spécifiques :
notes[0] = 10;
notes[4] = 50;
// notes[1], notes[2], notes[3] → restent à 0`,
      tip: "Initialise le tableau à `{0}` si tu veux que les cases non remplies aient une valeur prévisible (0) plutôt qu'aléatoire.",
    },
  },

  {
    id: 'decl-vs-scanf',
    section: 'remplir',
    keywords: ['difference declaration scanf', 'initialiser declaration', 'initialiser vs scanf', 'declaration vs scanf', 'quand utiliser scanf', 'quand initialiser', 'valeur avance ou scanf'],
    response: {
      text: "La différence fondamentale : **initialisation à la déclaration** = valeurs connues à l'avance, écrites dans le code. **scanf** = valeurs inconnues à l'avance, saisies par l'utilisateur pendant l'exécution. Le choix dépend de si les données changent à chaque exécution.",
      example: `// Initialisation à la déclaration
// → valeurs FIXES, toujours les mêmes, connues du programmeur
int jours_mois[12] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

// scanf
// → valeurs VARIABLES, différentes à chaque exécution, fournies par l'utilisateur
int notes[5];
for(int i = 0; i < 5; i++) {
    scanf("%d", &notes[i]);  // l'utilisateur entre SES notes
}`,
      tip: "Données qui ne changent jamais → initialisation. Données qui varient selon l'utilisateur → scanf.",
    },
  },

  {
    id: 'scanf-mauvais-type',
    section: 'remplir',
    keywords: ['lettre au lieu chiffre', 'tape lettre', 'mauvais type scanf', 'caractere scanf', 'lettre dans scanf', 'saisie incorrecte', 'utilisateur tape lettre', 'erreur saisie scanf'],
    response: {
      text: "Si l'utilisateur tape une lettre alors que `scanf(\"%d\", ...)` attend un entier, **scanf échoue silencieusement** : il ne lit rien, laisse la lettre dans le buffer, et la case garde sa valeur précédente (souvent aléatoire). Le programme continue sans prévenir. C'est un comportement dangereux — `scanf` ne valide pas les entrées.",
      example: `int notes[5];
for(int i = 0; i < 5; i++) {
    scanf("%d", &notes[i]);
}
// Si l'utilisateur tape : 12  abc  15  8  14
// notes[0] = 12    ✅
// notes[1] = ???   ❌ scanf(%d) ne peut pas lire "abc"
//                     "abc" reste dans le buffer
// notes[2] = ???   ❌ scanf lit "abc" encore (toujours là)
// ...la boucle lit "abc" indéfiniment !`,
      tip: "scanf est basique et sans protection. Pour des programmes robustes, on utilise `fgets` + `sscanf` pour valider. Pour l'instant, partez du principe que l'utilisateur tape toujours les bons types.",
    },
  },

  /* ══════════════════════════════════════
     BLOC 4 — scanf et le symbole &
  ══════════════════════════════════════ */
  {
    id: 'esperluette',
    section: 'remplir',
    keywords: ['esperluette', 'arobase', 'adresse', 'ampersand', 'pourquoi esperluette', 'c est quoi esperluette', 'symbole devant', 'signe devant variable', 'et commercial', 'pourquoi ecrire esperluette', 'obligatoire esperluette', 'points i esperluette'],
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
    section: 'remplir',
    keywords: ['oublier esperluette', 'plante', 'crash scanf', 'erreur scanf', 'sans esperluette', 'oublie esperluette'],
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
    section: 'remplir',
    keywords: ['format', 'difference format', 'quel format', 'entier scanf', 'float scanf', 'pourcentage d', 'pourcentage f', 'specifier format', 'c est quoi d dans scanf', 'veut dire quoi d', 'signifie d scanf', 'pourquoi d scanf'],
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
    section: 'remplir',
    keywords: ['saisir', 'clavier', 'remplir clavier', 'entrer valeur', 'utilisateur', 'saisie', 'lire clavier', 'message a chaque fois', 'valeur une par une', 'message utilisateur', 'demander valeur'],
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
    section: 'remplir',
    keywords: ['i < 5', 'i <= 5', 'condition', 'pourquoi <', 'pas <=', 'strictement', 'inferieur', 'condition boucle', 's arreter', 'quand s arreter', 'boucle sait quand', 'arret boucle', 'i inferieur 5'],
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
    section: 'parcours',
    keywords: ['inverse', 'envers', 'a l envers', 'du dernier', 'sens inverse', 'retour', 'backwards', 'decrementer', 'ordre inverse', 'sans retourner', 'afficher inverse', 'sans le retourner'],
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

  {
    id: 'pourquoi-somme-zero',
    section: 'parcours',
    keywords: ['somme 0', 'initialiser 0', 'pourquoi 0 somme', 'pas tab 0 somme', 'somme commence 0', 'depart 0 somme', 'somme = 0'],
    response: {
      text: "On initialise `somme` à **0** et non à `tab[0]` parce que la somme démarre de zéro avant d'ajouter quoi que ce soit. Si on initialisait à `tab[0]`, on ajouterait la première case deux fois (une fois au départ, une fois dans la boucle). Le 0 est l'élément neutre de l'addition : 0 + x = x, sans altérer le résultat.",
      example: `int notes[5] = {12, 8, 15, 9, 14};

// ✅ Correct — somme part de 0
int somme = 0;
for(int i = 0; i < 5; i++) somme += notes[i];
// 0 + 12 + 8 + 15 + 9 + 14 = 58 ✓

// ❌ Incorrect — somme part de tab[0] et boucle commence à 0
int somme2 = notes[0];
for(int i = 0; i < 5; i++) somme2 += notes[i];
// 12 + 12 + 8 + 15 + 9 + 14 = 70 ✗ (12 compté deux fois !)`,
      tip: "0 est le neutre de l'addition. Pour la multiplication, on initialiserait à 1 (neutre du produit). Même logique.",
    },
  },

  {
    id: 'calcul-moyenne',
    section: 'parcours',
    keywords: ['calculer moyenne', 'comment moyenne', 'moyenne somme', 'juste une division', 'moyenne tableau', 'formule moyenne', 'calcul moyenne'],
    response: {
      text: "Oui, une fois la somme calculée, la moyenne c'est **somme ÷ nombre d'éléments**. Attention : en C, la division de deux entiers donne un entier (les décimales sont perdues). Pour une moyenne correcte, il faut forcer la division en nombre décimal.",
      example: `int notes[5] = {12, 8, 15, 9, 14};
int somme = 0;
for(int i = 0; i < 5; i++) somme += notes[i];
// somme = 58

// ❌ Division entière — perd les décimales
int moyenne_fausse = somme / 5;
printf("%d\\n", moyenne_fausse);    // affiche 11 (au lieu de 11.6)

// ✅ Division décimale — résultat correct
float moyenne = somme / 5.0;       // 5.0 force la division float
printf("%.1f\\n", moyenne);         // affiche 11.6`,
      tip: "Formule : `float moyenne = somme / (float)taille;` ou `somme / 5.0`. Ne jamais diviser deux int si tu veux un résultat décimal.",
    },
  },

  {
    id: 'filtre-definition',
    section: 'parcours',
    keywords: ['filtre', 'c est quoi filtre', 'filtrer tableau', 'valeurs positives', 'afficher que', 'afficher seulement', 'definition filtre', 'filtrage tableau'],
    response: {
      text: "Un **filtre** sur un tableau consiste à parcourir toutes les cases et n'agir que sur celles qui vérifient une condition. Au lieu de traiter chaque case systématiquement, on ajoute un `if` dans la boucle. Les cases qui ne satisfont pas la condition sont simplement ignorées.",
      example: `int notes[5] = {12, 8, 15, 9, 14};

// Filtre : afficher seulement les notes > 10
for(int i = 0; i < 5; i++) {
    if(notes[i] > 10) {           // condition du filtre
        printf("%d ", notes[i]);  // action sur les cas valides
    }
    // les notes <= 10 sont ignorées
}
// Affiche : 12 15 14

// Filtre : afficher seulement les valeurs positives
for(int i = 0; i < 5; i++) {
    if(notes[i] > 0) printf("%d ", notes[i]);
}`,
      tip: "Structure de tout filtre : for → if(condition) → action. La condition fait la sélection, l'action traite les sélectionnés.",
    },
  },

  {
    id: 'compteur-condition',
    section: 'parcours',
    keywords: ['compter elements', 'combien elements', 'nombre elements condition', 'compteur condition', 'compter condition', 'combien verifient', 'compteur separe', 'il faut compteur'],
    response: {
      text: "Oui, il faut un **compteur séparé** initialisé à 0 avant la boucle. À chaque case qui respecte la condition, on incrémente le compteur de 1. À la fin de la boucle, le compteur contient exactement le nombre d'éléments qui satisfont la condition.",
      example: `int notes[5] = {12, 8, 15, 9, 14};
int compteur = 0;   // compteur séparé, commence à 0

for(int i = 0; i < 5; i++) {
    if(notes[i] >= 10) {   // condition : note >= 10
        compteur++;         // on incrémente quand la condition est vraie
    }
}
printf("%d notes >= 10\\n", compteur);  // affiche : 3 notes >= 10
// (12, 15, 14 vérifient la condition)`,
      tip: "Compteur = 0 avant la boucle. compteur++ à chaque fois que la condition est vraie. Lire compteur après la boucle.",
    },
  },

  {
    id: 'filtre-pairs',
    section: 'parcours',
    keywords: ['nombres pairs', 'afficher pairs', 'valeurs paires', 'condition pairs', 'comment pairs', 'modulo 2', 'paire impaire', 'filtre paires'],
    response: {
      text: "Pour tester si un nombre est pair, on utilise l'opérateur **modulo `%`** : `n % 2 == 0` est vrai si n est divisible par 2 (= nombre pair). `n % 2 != 0` ou `n % 2 == 1` pour les impairs. Le modulo donne le reste de la division entière.",
      example: `int notes[5] = {12, 8, 15, 9, 14};

// Afficher seulement les nombres pairs
for(int i = 0; i < 5; i++) {
    if(notes[i] % 2 == 0) {        // reste de la division par 2 = 0 → pair
        printf("%d ", notes[i]);
    }
}
// Affiche : 12 8 14

// Afficher seulement les impairs
for(int i = 0; i < 5; i++) {
    if(notes[i] % 2 != 0) printf("%d ", notes[i]);
}
// Affiche : 15 9`,
      tip: "`n % 2 == 0` → pair. `n % 2 != 0` → impair. Le `%` en C est le modulo (reste de la division), pas un pourcentage.",
    },
  },

  {
    id: 'modifier-pendant-parcours',
    section: 'parcours',
    keywords: ['modifier pendant parcours', 'changer pendant boucle', 'modifier valeurs boucle', 'peut on modifier parcours', 'modifier en parcourant', 'modifier boucle for'],
    response: {
      text: "Oui, tu peux modifier les valeurs d'un tableau **pendant que tu le parcours**. C'est même très courant : multiplier toutes les notes par 2, mettre les négatifs à 0, arrondir les décimaux... Il suffit d'assigner une nouvelle valeur à `tab[i]` dans le corps de la boucle.",
      example: `int notes[5] = {12, 8, 15, 9, 14};

// Modifier pendant le parcours : ajouter 2 à chaque note
for(int i = 0; i < 5; i++) {
    notes[i] = notes[i] + 2;   // modifie la case en place
    // ou : notes[i] += 2;     // écriture raccourcie
}
// notes est maintenant : {14, 10, 17, 11, 16}

// Mettre les valeurs négatives à 0
for(int i = 0; i < 5; i++) {
    if(notes[i] < 0) notes[i] = 0;
}`,
      tip: "Modifier un tableau pendant son parcours est sûr en C si tu n'changes que les valeurs (pas la taille, qui est fixe). La boucle continue normalement.",
    },
  },

  {
    id: 'tableau-zero-somme',
    section: 'parcours',
    keywords: ['tableau vide', 'toutes cases 0', 'somme 0', 'moyenne 0', 'tableau zero', 'cases a 0 somme', 'toutes valeurs 0'],
    response: {
      text: "Oui. Si toutes les cases valent 0, la somme est 0 (0+0+0+0+0 = 0) et la moyenne est aussi 0 (0 ÷ 5 = 0). L'algorithme fonctionne parfaitement — ce n'est pas un cas spécial. Attention juste à ne pas confondre \"tableau vide\" (toutes les cases à 0) et \"tableau non initialisé\" (cases avec valeurs aléatoires).",
      example: `int notes[5] = {0, 0, 0, 0, 0};   // toutes les cases à 0

int somme = 0;
for(int i = 0; i < 5; i++) somme += notes[i];
printf("Somme : %d\\n", somme);      // Somme : 0

float moyenne = somme / 5.0;
printf("Moyenne : %.1f\\n", moyenne); // Moyenne : 0.0

// ✅ Tout fonctionne — ce n'est pas un cas particulier à gérer`,
      tip: "En revanche, si le tableau a 0 éléments (taille = 0), diviser par 0 pour la moyenne causerait une erreur. En pratique, on vérifie toujours que la taille est > 0 avant de diviser.",
    },
  },

  {
    id: 'deux-boucles-tableau',
    section: 'parcours',
    keywords: ['deux boucles', 'deux boucles meme tableau', 'boucles en meme temps', 'boucle simultanee', 'deux for tableau', 'boucles paralleles'],
    response: {
      text: "Non, deux boucles ne peuvent pas s'exécuter **en même temps** — un programme C est séquentiel. Tu peux avoir deux boucles l'une après l'autre (séquentielles) ou une boucle dans une autre (imbriquées). Les boucles imbriquées permettent de comparer chaque case avec toutes les autres, utile pour le tri par exemple.",
      example: `int notes[5] = {12, 8, 15, 9, 14};

// Deux boucles SÉQUENTIELLES — l'une après l'autre
for(int i = 0; i < 5; i++) printf("%d ", notes[i]);  // boucle 1
printf("\\n");
for(int i = 0; i < 5; i++) printf("%d ", notes[i]);  // boucle 2

// Deux boucles IMBRIQUÉES — l'une dans l'autre
for(int i = 0; i < 5; i++) {
    for(int j = 0; j < 5; j++) {
        // compare notes[i] avec notes[j]
    }
}`,
      tip: "Séquentiel = l'une puis l'autre (pour deux passes distinctes). Imbriqué = l'une dans l'autre (pour comparer chaque élément avec tous les autres).",
    },
  },

  {
    id: 'affectation-obligatoire',
    section: 'parcours',
    keywords: ['somme somme tab', 'pas juste somme tab', 'pourquoi assigner', 'somme = somme + tab', 'pas seulement calculer', 'sans assigner', 'oublier assigner'],
    response: {
      text: "En C, `somme + tab[i]` **calcule** le résultat mais ne le stocke nulle part — il est immédiatement perdu. Pour garder le résultat, il faut **assigner** avec `=` : `somme = somme + tab[i]`. Sans l'assignation, `somme` ne change jamais et reste à 0 à la fin.",
      example: `int notes[5] = {12, 8, 15, 9, 14};
int somme = 0;

// ❌ Calcule mais n'assigne pas — somme reste à 0 !
for(int i = 0; i < 5; i++) {
    somme + notes[i];   // résultat calculé puis oublié
}
printf("%d\\n", somme);   // affiche 0 — rien n'a changé

// ✅ Calcule ET assigne — somme s'accumule
for(int i = 0; i < 5; i++) {
    somme = somme + notes[i];   // résultat stocké dans somme
    // ou : somme += notes[i];  // version courte
}
printf("%d\\n", somme);   // affiche 58`,
      tip: "En C, une expression sans `=` ne change rien. Toute modification doit être **affectée** à une variable. C'est une règle fondamentale.",
    },
  },

  {
    id: 'copier-filtre',
    section: 'parcours',
    keywords: ['copier filtre', 'nouveau tableau', 'copier valeurs filtrees', 'tableau filtré', 'tableau resultat', 'copier dans nouveau', 'extraire valeurs'],
    response: {
      text: "Pour copier les valeurs filtrées dans un nouveau tableau, il faut un **indice séparé** pour ce nouveau tableau. L'indice du tableau source (`i`) avance à chaque tour, mais l'indice du tableau de destination (`j`) n'avance que quand on copie une valeur.",
      example: `int notes[5] = {12, 8, 15, 9, 14};
int bonnes_notes[5];   // tableau destination (taille max = 5)
int j = 0;             // indice du tableau destination, commence à 0

for(int i = 0; i < 5; i++) {
    if(notes[i] >= 10) {           // filtre : >= 10
        bonnes_notes[j] = notes[i]; // copie dans le nouveau tableau
        j++;                        // avance l'indice destination
    }
}
// j contient maintenant le nombre d'éléments copiés
printf("%d bonnes notes\\n", j);   // 3
for(int i = 0; i < j; i++) printf("%d ", bonnes_notes[i]); // 12 15 14`,
      tip: "Deux indices : `i` parcourt la source, `j` remplit la destination. `j` n'avance que quand tu copies. `j` final = nombre d'éléments filtrés.",
    },
  },

  /* ══════════════════════════════════════
     BLOC 6 — Somme et moyenne
  ══════════════════════════════════════ */
  {
    id: 'somme',
    section: 'parcours',
    keywords: ['somme', 'total', 'additionner', 'calculer somme', 'ajouter tous', 'addition tableau', 'cumul', 'comment calculer somme', 'somme toutes valeurs', 'somme tableau'],
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
    section: 'parcours',
    keywords: ['5.0', '6.0', 'point', 'pourquoi .0', 'virgule perdue', 'division entiere', 'decimal moyenne', 'partie decimale', 'float division', 'decimales moyenne', 'diviser 5.0', 'cast float', 'float moyenne'],
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
    section: 'parcours',
    keywords: ['plus egal', 'raccourci', 'cumul', 'somme +=', 'c est quoi +=', 'signifie', 'somme somme tab', 'pas juste somme tab', 'pourquoi assigner somme', 'somme = somme', 'pas seulement somme'],
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

  {
    id: 'max-negatifs',
    section: 'recherche',
    keywords: ['nombres negatifs', 'valeurs negatives', 'tous negatifs', 'negatif max', 'max negatif', 'tableau negatif', 'algorithme marche negatifs', 'marche encore negatifs'],
    response: {
      text: "Oui, l'algorithme **marche parfaitement** avec des nombres négatifs. C'est justement pour ça qu'on initialise `max` avec `tab[0]` et non avec 0. Si toutes les valeurs sont négatives (ex: -8, -3, -12), initialiser `max = 0` donnerait un résultat faux (0 n'est pas dans le tableau). Avec `max = tab[0] = -8`, l'algorithme trouvera correctement -3 comme maximum.",
      example: `int temperatures[4] = {-8, -3, -12, -5};
int max = temperatures[0];   // max = -8 au départ

for(int i = 1; i < 4; i++) {
    if(temperatures[i] > max) {
        max = temperatures[i];
    }
}
// Tour 1 : -3 > -8 → max = -3
// Tour 2 : -12 > -3 ? NON
// Tour 3 : -5 > -3 ? NON
printf("Max : %d\\n", max);  // affiche -3 ✅

// Avec max = 0 : aucune valeur > 0, max resterait 0 ❌`,
      tip: "Initialiser avec `tab[0]` garantit que `max` est toujours une valeur du tableau, qu'elle soit positive, négative, ou zéro.",
    },
  },

  {
    id: 'valeur-vs-indice',
    section: 'recherche',
    keywords: ['chercher valeur chercher indice', 'difference valeur indice', 'valeur ou indice', 'trouver valeur vs position', 'chercher vs localiser', 'valeur et indice different'],
    response: {
      text: "**Chercher une valeur** = trouver CE QU'IL Y A dans le tableau (ex: \"le max vaut 15\"). **Chercher l'indice** = trouver OÙ elle se trouve (ex: \"le max est à la position 2\"). Pour la valeur seule, une variable suffit. Pour l'indice, il faut une deuxième variable qui mémorise la position.",
      example: `int notes[5] = {12, 8, 15, 9, 14};

// Chercher la VALEUR du maximum
int max = notes[0];
for(int i = 1; i < 5; i++) {
    if(notes[i] > max) max = notes[i];
}
printf("Max = %d\\n", max);            // Max = 15

// Chercher l'INDICE du maximum (position)
int max2 = notes[0], pos = 0;
for(int i = 1; i < 5; i++) {
    if(notes[i] > max2) { max2 = notes[i]; pos = i; }
}
printf("Max = %d à l'indice %d\\n", max2, pos); // Max = 15 à l'indice 2`,
      tip: "Valeur = quel nombre. Indice = à quelle position. Si tu veux les deux, mémorise les deux variables en même temps.",
    },
  },

  {
    id: 'pourquoi-boucle-chercher',
    section: 'recherche',
    keywords: ['pourquoi boucle chercher', 'pas regarder directement', 'pourquoi pas regarder', 'regarder tableau directement', 'boucle chercher pourquoi', 'peut pas voir directement'],
    response: {
      text: "En C, tu ne peux pas \"voir\" le tableau en entier d'un seul coup — tu accèdes une case à la fois. Pour trouver le maximum, tu dois comparer **chaque case avec le candidat actuel**, une par une. La boucle automatise ce processus. C'est comme chercher le plus grand élève dans une file en les mesurant un par un — tu ne peux pas tous les voir simultanément.",
      example: `int notes[5] = {12, 8, 15, 9, 14};
// Le programme ne "voit" pas [12, 8, 15, 9, 14] en bloc
// Il accède case par case : notes[0], puis notes[1], etc.

int max = notes[0];          // candidat initial
for(int i = 1; i < 5; i++) {
    // À chaque tour, on examine UNE case
    if(notes[i] > max) max = notes[i];
}
// La boucle a examiné toutes les cases → max est fiable`,
      tip: "Un tableau = cases individuelles. Pour une décision globale (max, somme, recherche), il faut les parcourir toutes. C'est toujours une boucle.",
    },
  },

  {
    id: 'max-doublons',
    section: 'recherche',
    keywords: ['maximum deux fois', 'max apparait deux fois', 'doublons max', 'valeur repetee max', 'deux fois meme valeur', 'max plusieurs fois', 'lequel retourne'],
    response: {
      text: "Si le maximum apparaît plusieurs fois, l'algorithme standard retourne **l'indice de la première occurrence** — celle rencontrée en premier dans la boucle. Pourquoi ? Parce que la condition `> max` (strictement supérieur) n'est jamais vraie pour une valeur égale à `max`. Le premier max trouvé reste le vainqueur.",
      example: `int notes[5] = {12, 15, 8, 15, 9};
//                        ↑       ↑
//                  indice 1   indice 3  (deux fois 15)

int max = notes[0];
int pos = 0;
for(int i = 1; i < 5; i++) {
    if(notes[i] > max) {       // > strict : égalité ne déclenche pas
        max = notes[i];
        pos = i;
    }
}
printf("Max = %d à l'indice %d\\n", max, pos);
// Max = 15 à l'indice 1 (première occurrence)

// Pour la DERNIÈRE occurrence, changer > en >= :
if(notes[i] >= max) { max = notes[i]; pos = i; }`,
      tip: "Condition `>` → première occurrence. Condition `>=` → dernière occurrence. C'est le seul changement.",
    },
  },

  {
    id: 'parcourir-definition',
    section: 'recherche',
    keywords: ['parcourir tableau', 'c est quoi parcourir', 'pas juste lire', 'signifie parcourir', 'parcours tableau', 'definition parcourir', 'parcourir veut dire'],
    response: {
      text: "\"Parcourir\" un tableau signifie **visiter chaque case dans l'ordre**, de la première à la dernière, pour y faire quelque chose. \"Lire\" est une action passagère. \"Parcourir\" implique une boucle et une action répétée sur chaque case : afficher, comparer, modifier, calculer... C'est le terme général pour \"boucle sur un tableau\".",
      example: `int notes[5] = {12, 8, 15, 9, 14};

// Parcourir pour AFFICHER
for(int i = 0; i < 5; i++) printf("%d ", notes[i]);

// Parcourir pour CHERCHER le max
int max = notes[0];
for(int i = 1; i < 5; i++) if(notes[i] > max) max = notes[i];

// Parcourir pour CALCULER la somme
int somme = 0;
for(int i = 0; i < 5; i++) somme += notes[i];

// Dans les 3 cas : même structure for, action différente dans le corps`,
      tip: "Parcourir = for + action sur notes[i]. La structure est toujours la même, seule l'action dans la boucle change.",
    },
  },

  {
    id: 'compare-max-precedent',
    section: 'recherche',
    keywords: ['compare tab i avec max', 'pas tab i moins 1', 'pourquoi pas precedent', 'comparer precedent', 'tab i tab i-1', 'comparer avec precedent', 'pourquoi max pas tab i-1'],
    response: {
      text: "On compare `tab[i]` avec `max` (le **plus grand vu jusqu'ici**) et non avec `tab[i-1]` (juste le précédent). Si on comparait avec le précédent, on détecter seulement si une valeur est plus grande que sa voisine directe — pas si elle est la plus grande de tout le tableau. `max` accumule le meilleur résultat au fur et à mesure.",
      example: `int notes[5] = {12, 8, 15, 9, 14};

// ❌ Comparer avec le précédent — ne trouve pas le vrai max
for(int i = 1; i < 5; i++) {
    if(notes[i] > notes[i-1]) ...
    // Voit 15 > 8 ✓, mais oublie que 12 existait avant
}

// ✅ Comparer avec max — mémorise le meilleur depuis le début
int max = notes[0];     // max = mémoire du meilleur vu jusqu'ici
for(int i = 1; i < 5; i++) {
    if(notes[i] > max) max = notes[i];
}
// max garde trace du champion toute la course, pas juste le dernier duel`,
      tip: "`max` est une mémoire qui garde le meilleur depuis le début. Sans elle, on perdrait les comparaisons précédentes.",
    },
  },

  {
    id: 'min-max-une-boucle',
    section: 'recherche',
    keywords: ['min et max', 'a la fois min max', 'deux boucles ou une', 'une seule boucle min max', 'trouver min max ensemble', 'min max meme boucle'],
    response: {
      text: "Tu peux faire les deux en **une seule boucle** ! Il suffit d'avoir deux variables (`min` et `max`) et de faire les deux comparaisons à chaque tour. C'est plus efficace que deux boucles séparées (on parcourt le tableau une seule fois au lieu de deux).",
      example: `int notes[5] = {12, 8, 15, 9, 14};
int max = notes[0];
int min = notes[0];   // les deux partent de la même case

for(int i = 1; i < 5; i++) {
    if(notes[i] > max) max = notes[i];   // mise à jour max
    if(notes[i] < min) min = notes[i];   // mise à jour min
    // Les deux comparaisons dans le même tour de boucle
}

printf("Max = %d, Min = %d\\n", max, min);  // Max = 15, Min = 8`,
      tip: "Une boucle + deux variables = min ET max en une seule passe. Toujours préférable à deux boucles séparées.",
    },
  },

  {
    id: 'break-recherche',
    section: 'recherche',
    keywords: ['boucle savoir trouvee', 's arreter quand trouve', 'break', 'arreter boucle valeur', 'quitter boucle trouve', 'boucle arrete trouve', 'comment savoir trouve'],
    response: {
      text: "En C, on utilise `break` pour quitter une boucle immédiatement dès qu'une condition est remplie. Pour une recherche, dès qu'on trouve la valeur cherchée, `break` stoppe la boucle sans attendre la fin. C'est plus efficace : pas besoin de continuer si on a déjà trouvé.",
      example: `int notes[5] = {12, 8, 15, 9, 14};
int cible = 15;
int trouve = 0, position = -1;

for(int i = 0; i < 5; i++) {
    if(notes[i] == cible) {
        trouve = 1;
        position = i;
        break;      // on sort de la boucle immédiatement
    }
}

if(trouve) printf("Trouvé à l'indice %d\\n", position);
else       printf("Non trouvé\\n");`,
      tip: "`break` = sortie immédiate de la boucle. Utile en recherche pour ne pas continuer inutilement après avoir trouvé.",
    },
  },

  {
    id: 'flag-sentinel',
    section: 'recherche',
    keywords: ['flag', 'sentinel', 'sentinelle', 'drapeau', 'variable flag', 'c est quoi flag', 'prof dit flag', 'indicateur'],
    response: {
      text: "Un **flag** (drapeau en anglais) est une variable booléenne simple (0 ou 1) qui signale si quelque chose s'est produit. En recherche, on utilise `int trouve = 0;` comme flag : il passe à 1 quand la valeur est trouvée. Un **sentinel** (sentinelle) est une valeur spéciale (souvent -1) qui signifie \"non trouvé\" pour un indice.",
      example: `int notes[5] = {12, 8, 15, 9, 14};

// FLAG : variable qui indique si on a trouvé
int trouve = 0;   // 0 = non, 1 = oui
for(int i = 0; i < 5; i++) {
    if(notes[i] == 15) { trouve = 1; break; }
}
if(trouve) printf("Trouvé !\\n");

// SENTINEL : valeur spéciale pour "non trouvé"
int position = -1;   // -1 = sentinelle = "pas encore trouvé"
for(int i = 0; i < 5; i++) {
    if(notes[i] == 15) { position = i; break; }
}
if(position != -1) printf("À l'indice %d\\n", position);`,
      tip: "Flag = 0/1 pour \"trouvé ou pas\". Sentinel = valeur impossible (-1) pour signaler \"non trouvé\". Les deux sont des conventions très courantes en C.",
    },
  },

  {
    id: 'variable-max-separee',
    section: 'recherche',
    keywords: ['variable max separee', 'pourquoi variable max', 'pas tab 0 directement', 'pas utiliser tab 0', 'variable separee max', 'pourquoi pas tab directement', 'variable max utile'],
    response: {
      text: "Si on utilisait `tab[0]` directement comme référence dans toute la boucle, on comparerait toujours avec la **première case** — pas avec le meilleur trouvé jusqu'ici. `max` est une variable **indépendante** qui se met à jour : elle commence à `tab[0]` mais change au fil de la boucle quand on trouve mieux.",
      example: `int notes[5] = {12, 8, 15, 9, 14};

// ❌ Sans variable max — on compare toujours avec notes[0]
for(int i = 1; i < 5; i++) {
    if(notes[i] > notes[0]) ...  // compare avec 12, toujours
    // On détecte 15 > 12, mais on "oublie" 15 au tour suivant
}

// ✅ Avec variable max — elle suit le meilleur en temps réel
int max = notes[0];    // commence à 12
for(int i = 1; i < 5; i++) {
    if(notes[i] > max) max = notes[i];  // max passe de 12 à 15
    // Tour suivant : on compare 9 avec 15 (pas avec 12)
}`,
      tip: "`max` est une mémoire mobile : elle démarre à `tab[0]` mais suit le champion courant. Sans elle, on perd la trace des comparaisons précédentes.",
    },
  },

  /* ══════════════════════════════════════
     BLOC 7 — Min et Max
  ══════════════════════════════════════ */
  {
    id: 'maximum',
    section: 'recherche',
    keywords: ['maximum', 'max', 'plus grand', 'valeur max', 'trouver max', 'plus grande valeur', 'meilleur', 'comment trouver max', 'on compare comment', 'trouver plus grande', 'comment max'],
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
    section: 'recherche',
    keywords: ['minimum', 'min', 'plus petit', 'valeur min', 'trouver min', 'plus petite valeur', 'moins bon', 'algorithme min', 'pareil max', 'a l envers max', 'comme max mais'],
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
    section: 'recherche',
    keywords: ['initialiser min', 'pourquoi notes 0', 'pas 0 pour min', 'valeur depart', 'commencer par', 'initialisation min max', 'pourquoi tab 0', 'pas avec 0', 'initialise max tab', 'pourquoi pas 0'],
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
    section: 'recherche',
    keywords: ['indice max', 'position max', 'ou se trouve', 'quel indice maximum', 'localiser max', 'trouver position', 'a quelle position', 'position maximum', 'savoir position max', 'une fois trouve'],
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
    section: 'recherche',
    keywords: ['rechercher', 'chercher', 'trouver valeur', 'existe', 'contient', 'est dans', 'search', 'presence', 'valeur precise existe', 'chercher valeur precise', 'si valeur dans', 'comment chercher valeur'],
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
