import {
  AnimNoSize,
  AnimSizeTooSmall,
  AnimSizeTooLarge,
  AnimWrongIndex,
} from '../../components/learning/animations/ActifAnimations.jsx'

// ─────────────────────────────────────────────────────────────
// Leçon : Les tableaux en C
// Profil : Actif + Sensoriel (Pratique)
// Approche pédagogique :
//   - On part toujours d'une situation concrète, jamais d'une définition
//   - On montre le problème avant la solution
//   - On explique le "pourquoi" de chaque règle avec une analogie du quotidien
//   - Chaque étape se termine par un exercice immédiat
// ─────────────────────────────────────────────────────────────

export const LESSON_ARRAYS_ACTIF = {
  id: 'arrays-actif',
  subject: 'Les tableaux en C',
  profile: 'Actif · Sensoriel',

  steps: [

    /* ═══════════════════════════════════════════════════════
       ÉTAPE 1 — Pourquoi et comment déclarer un tableau
    ═══════════════════════════════════════════════════════ */
    {
      id: 'declaration',
      badge: 'Étape 1 · Déclaration',
      title: 'Pourquoi et comment déclarer un tableau',
      objective: `Comprendre dans quelle situation un tableau est utile, et savoir en déclarer un avec des valeurs.`,

      intro: {
        text: `Imagine que tu es chargé de gérer les notes de 5 élèves dans ton programme C. Tu pourrais créer une variable par élève : note1, note2, note3... Ça passe encore pour 5 élèves. Mais que se passe-t-il si tu as 30 élèves ? Tu vas écrire 30 variables à la main ? Et si tu en as 100 ? Le code devient illisible et impossible à maintenir. Le tableau est précisément là pour résoudre ce problème : au lieu de créer 30 variables séparées, tu crées une seule structure qui contient toutes les valeurs sous un seul nom. C'est comme passer d'une pile de feuilles volantes à un classeur bien organisé.`,
      },

      illustration: 'problem-vars-c',

      codeBlocks: [
        {
          id: 'syntax',
          label: 'La syntaxe de déclaration — décortiquée',
          code: `type  nom_tableau[taille];
//  ↑        ↑           ↑
//  │        │           └── Nombre de cases réservées
//  │        └── Le nom que tu donnes à ton tableau
//  └── Le type de valeur dans chaque case (int, float...)

// Exemples concrets :
int   notes[5];           // 5 cases pour des notes entières
float temperatures[7];    // 7 cases pour des températures décimales
int   scores[30];         // 30 cases pour des scores de joueurs`,
          type: 'neutral',
          comment: `Trois éléments sont toujours obligatoires dans une déclaration : le type (int, float…), le nom que tu choisis librement, et la taille entre crochets. Si tu oublies l'un des trois, le compilateur refuse.`,
        },
        {
          id: 'init',
          label: 'Déclarer et remplir le tableau en même temps',
          code: `int notes[5] = {12, 8, 15, 9, 14};
//  ↑     ↑    ↑
//  int = type  notes = nom  [5] = 5 cases
//
//  Les valeurs entre accolades remplissent les cases dans l'ordre :
//  Case [0] = 12  →  Case [1] = 8  →  Case [2] = 15  →  etc.`,
          type: 'good',
          comment: `C'est la façon la plus directe : on déclare et on remplit en une seule ligne. Les valeurs sont séparées par des virgules et entourées d'accolades { }. Le nombre de valeurs doit correspondre exactement à la taille déclarée.`,
        },
      ],

      keyPoint: `Un tableau, c'est un groupe de cases en mémoire, toutes du même type, accessibles via un seul nom. La taille est définie une fois pour toutes à la déclaration — le programme réserve cet espace en mémoire et ne peut pas l'agrandir ensuite. C'est différent de Python ou JavaScript : en C, la taille est gravée dans le marbre.`,

      exercise: {
        type: 'code',
        question: 'Crée ton premier tableau et affiche une case',
        prompt: `Un joueur de basket a marqué ces points sur 5 matchs consécutifs : 23, 17, 31, 8, 25.\n\nTon programme doit :\n1. Déclarer un tableau d'entiers nommé "points" avec exactement 5 cases\n2. L'initialiser directement avec les 5 valeurs : 23, 17, 31, 8, 25\n3. Afficher la valeur du 3ème match avec printf\n\nAttention : le 3ème match correspond à l'indice 2, pas 3. En C, on commence à compter à partir de 0.`,
        starter: `#include <stdio.h>

int main() {
    // 1. Déclare et initialise le tableau "points"
    //    Syntaxe : int nom[taille] = {val1, val2, ...};

    // 2. Affiche la valeur du 3ème match
    //    Rappel : 3ème match = indice 2 (on commence à 0)

    return 0;
}`,
        hints: [
          `Pour déclarer et initialiser en même temps : int points[5] = {23, 17, 31, 8, 25};`,
          `La 3ème case a l'indice 2 car en C on commence à compter à partir de 0 : case 1 → indice 0, case 2 → indice 1, case 3 → indice 2.`,
          `Pour afficher un entier avec printf : printf("%d", points[2]); — le %d sera remplacé par la valeur de la case numéro 2.`,
        ],
        validation: [
          {
            id: 'decl-check',
            test: (c) => /int\s+points\s*\[\s*5\s*\]/i.test(c),
            success: 'Tableau "points" déclaré avec le bon type (int) et la bonne taille (5).',
            error: 'Déclare le tableau avec : int points[5] = {...}; — vérifie le nom "points" et la taille [5].',
          },
          {
            id: 'init-check',
            test: (c) => /\{\s*23\s*,\s*17\s*,\s*31\s*,\s*8\s*,\s*25\s*\}/.test(c),
            success: 'Les 5 valeurs sont dans le bon ordre : 23, 17, 31, 8, 25.',
            error: 'Initialise avec exactement ces valeurs dans cet ordre : {23, 17, 31, 8, 25}',
          },
          {
            id: 'printf-check',
            test: (c) => /printf\s*\(.*points\s*\[\s*2\s*\]/i.test(c),
            success: 'Affichage de la 3ème case (indice 2) correct — tu affiches bien points[2].',
            error: 'Pour afficher le 3ème match : printf("%d", points[2]); — l\'indice du 3ème élément est 2.',
          },
        ],

        errorPatterns: [

          /* ── E1 : Tableau sans crochets ──────────────────────── */
          {
            id: 'eq1-no-size',
            errorProfile: 'tableau-variable-simple',
            title: 'Tableau déclaré sans taille',
            detect: (c) => /int\s+points\b/.test(c) && !/int\s+points\s*\[/.test(c),
            message: `Tu as écrit "int points" sans crochets. En C, un tableau DOIT avoir une taille entre crochets : int points[5]. Sans ça, le programme ne sait pas combien de cases réserver en mémoire.`,
            analogy: `C'est comme commander "des billets de cinéma" sans dire combien. Le guichetier ne peut rien faire. Avec int points[5], tu dis exactement : "réserve-moi 5 cases en mémoire".`,
            adaptedSteps: {
              acces: {
                reminder: { text: `Tu avais écrit int points sans crochets — voici pourquoi la taille est indispensable.` },
                intro: `Tu avais écrit int points sans crochets. Le problème : sans la taille, le programme ne sait pas combien de cases préparer en mémoire. C'est comme demander à quelqu'un de te garder "des" places au cinéma sans préciser combien — il ne peut rien faire. int points[5] dit exactement : "prépare-moi 5 cases". Ces 5 cases existent maintenant en mémoire, côte à côte, chacune numérotée de 0 à 4. Pour lire ou modifier l'une d'elles, tu donnes son numéro — son indice.`,
                keyPoint: `Chaque case existe parce que tu l'as déclarée avec une taille. Si tu avais oublié le [5], il n'y aurait rien à lire, rien à modifier — juste du vide en mémoire. La taille dans les crochets, c'est le contrat que tu passes avec le programme.`,
                extraCodeBlocks: [
                  {
                    position: 'before',
                    id: 'anim-no-size',
                    label: 'Visualisation — réservation mémoire',
                    type: 'animation',
                    component: AnimNoSize,
                  },
                ],
              },
              remplir: {
                reminder: { text: `Rappel : sans int points[5], il n'y a nulle part où stocker les valeurs saisies.` },
                intro: `Quand tu utilises scanf pour remplir un tableau, chaque case doit déjà exister en mémoire — réservée par la déclaration. C'est pour ça que int points[5] est la première ligne indispensable : sans cette déclaration avec sa taille, scanf ne saurait pas où stocker les valeurs. Il écrirait dans une zone mémoire inconnue et le programme planterait.`,
                keyPoint: `scanf écrit à une adresse précise en mémoire. Cette adresse n'existe que si tu as déclaré le tableau avec sa taille. Déclarer d'abord, remplir ensuite — toujours dans cet ordre.`,
              },
              recherche: {
                reminder: { text: `Rappel : les cases 0 à 4 existent parce que tu as déclaré int points[5].` },
                intro: `Pour trouver le minimum ou le maximum, on regarde les cases une par une. Ces cases existent parce que tu as écrit int points[5] — 5 cases, indices 0 à 4. Si tu avais oublié la taille, il n'y aurait aucune case à examiner. La recherche commence toujours par min = points[0] — la première case réservée — puis on compare avec les suivantes.`,
                keyPoint: `On initialise min avec points[0] et non avec 0. Pourquoi ? Parce que si toutes les valeurs étaient négatives (-5, -8...) et qu'on partait de 0, le résultat serait faux. La seule valeur de départ fiable, c'est une valeur qui vient du tableau lui-même.`,
              },
              parcours: {
                reminder: { text: `Rappel : la boucle tourne exactement 5 fois — une fois par case déclarée dans points[5].` },
                intro: `La boucle for(int i = 0; i < 5; i++) tourne exactement 5 fois — une fois par case réservée. Ce 5 dans la condition n'est pas un hasard : il correspond exactement au [5] de ta déclaration. C'est le lien direct entre "combien de cases j'ai réservées" et "combien de fois je dois parcourir".`,
                keyPoint: `La condition de boucle i < N doit toujours correspondre à la taille déclarée. C'est la même valeur, aux deux endroits. Si tu changes la taille du tableau, tu dois changer la condition de la boucle en même temps.`,
              },
            },
          },

          /* ── E2a : Taille trop petite ─────────────────────────── */
          {
            id: 'eq1-size-too-small',
            errorProfile: 'taille-sous-estimee',
            title: 'Taille déclarée trop petite',
            detect: (c) => {
              const m = c.match(/int\s+points\s*\[\s*(\d+)\s*\]/)
              return m != null && parseInt(m[1]) < 5
            },
            message: `Tu as déclaré points avec une taille inférieure à 5 pour stocker 5 valeurs. En C, la taille doit correspondre exactement au nombre de valeurs. Les cases manquantes n'ont nulle part où aller — elles écrasent la mémoire voisine.`,
            analogy: `C'est comme commander une boîte de 4 œufs pour en mettre 5. Le 5ème tombe hors de la boîte — et en C, ça ne plante pas toujours : il écrase silencieusement une autre donnée.`,
            adaptedSteps: {
              acces: {
                reminder: { text: `Tu avais déclaré une taille trop petite — rappel sur pourquoi la taille doit être exacte.` },
                intro: `Tu avais déclaré points avec une taille inférieure à 5 pour stocker 5 valeurs. En C, quand tu déclares points[4], le programme réserve exactement 4 cases — les indices 0, 1, 2 et 3. La 5ème valeur n'avait nulle part où aller. Elle aurait été écrite dans une zone mémoire qui ne t'appartient pas : un dépassement mémoire. Dangereux car le programme ne plante pas toujours — il continue parfois avec des données corrompues.`,
                keyPoint: `La taille déclarée doit être exactement égale au nombre de valeurs que tu veux stocker. Compte tes valeurs, puis écris ce nombre entre les crochets. Ni un de moins, ni un de plus.`,
                extraCodeBlocks: [
                  {
                    position: 'before',
                    id: 'anim-size-too-small',
                    label: 'Visualisation — boîte trop petite',
                    type: 'animation',
                    component: AnimSizeTooSmall,
                  },
                ],
              },
              remplir: {
                reminder: { text: `Rappel : taille déclarée = nombre de saisies attendues. Ni plus, ni moins.` },
                intro: `Quand tu remplis avec une boucle, elle tourne autant de fois que la taille déclarée. Si tu déclares [4] mais que tu as 5 valeurs à saisir, la 5ème saisie va être stockée hors du tableau. La règle : taille déclarée = nombre d'itérations de la boucle = nombre de valeurs attendues. Ces trois chiffres doivent toujours être identiques.`,
                keyPoint: `Quand tu conçois un tableau, commence par compter combien de valeurs tu vas stocker. Ce nombre devient ta taille, le nombre de tours de boucle, et le nombre de saisies. Un seul nombre, trois endroits où il apparaît.`,
              },
              recherche: {
                reminder: { text: `Rappel : un tableau trop petit fait manquer des valeurs dans la recherche de min/max.` },
                intro: `La recherche du min et du max parcourt toutes les cases déclarées. Si tu avais points[4] au lieu de [5], la boucle ne verrait que 4 valeurs — elle n'aurait jamais accès à la 5ème. Le max ou le min pourrait être dans cette case manquante, et ton résultat serait faux sans que tu t'en rendes compte.`,
                keyPoint: `Un tableau trop petit ne cause pas toujours une erreur visible — il donne parfois des résultats silencieusement faux. C'est le pire type de bug : le programme tourne, mais les calculs sont incorrects.`,
              },
              parcours: {
                reminder: { text: `Rappel : la condition i < N doit correspondre à la taille réelle du tableau.` },
                intro: `La condition i < 5 dans ta boucle doit correspondre à la taille réelle de ton tableau. Si tu déclares [4] mais boucles jusqu'à i < 5, tu lis une case qui n'existe pas. Si tu déclares [5] mais boucles jusqu'à i < 4, tu n'analyses que 4 cases sur 5 et ta somme sera incomplète.`,
                keyPoint: `Un seul nombre à retenir et à écrire partout : la taille du tableau. Dans les crochets de la déclaration ET dans la condition de la boucle.`,
              },
            },
          },

          /* ── E2b : Taille trop grande ─────────────────────────── */
          {
            id: 'eq1-size-too-large',
            errorProfile: 'taille-surestimee',
            title: 'Taille déclarée trop grande',
            detect: (c) => {
              const m = c.match(/int\s+points\s*\[\s*(\d+)\s*\]/)
              return m != null && parseInt(m[1]) > 5
            },
            message: `Tu as déclaré une taille supérieure à 5 pour stocker 5 valeurs. En C, les cases non initialisées ne valent pas 0 — elles contiennent une valeur aléatoire héritée de la mémoire. "Prévoir grand" n'est pas une sécurité.`,
            analogy: `C'est comme réserver 6 casiers pour 5 affaires. Le 6ème casier n'est pas vide — il contient ce que laissé le locataire précédent. Si tu l'ouvres par erreur, tu trouves n'importe quoi.`,
            adaptedSteps: {
              acces: {
                reminder: { text: `Tu avais déclaré une taille trop grande — les cases vides contiennent des valeurs imprévisibles.` },
                intro: `Tu avais déclaré points avec une taille supérieure à 5 pour stocker 5 valeurs. Le programme a réservé plus de cases que nécessaire. Les cases supplémentaires existent bien en mémoire, mais leur contenu est imprévisible : c'est ce qui traînait dans cette zone avant que ton programme démarre. Accéder à ces cases donnera un résultat faux — et le compilateur ne te préviendra pas.`,
                keyPoint: `En C, une case non initialisée ne vaut pas 0 — elle contient une valeur aléatoire héritée de la mémoire. "Prévoir grand" n'est pas une sécurité, c'est une source de bugs silencieux.`,
                extraCodeBlocks: [
                  {
                    position: 'before',
                    id: 'anim-size-too-large',
                    label: 'Visualisation — la case fantôme',
                    type: 'animation',
                    component: AnimSizeTooLarge,
                  },
                ],
              },
              remplir: {
                reminder: { text: `Rappel : la taille déclarée est un contrat exact — pas un maximum.` },
                intro: `Quand tu remplis avec scanf dans une boucle, si la boucle tourne moins de fois que la taille déclarée, les cases restantes garderont des valeurs aléatoires. La taille déclarée doit correspondre exactement au nombre de saisies attendues. Ce n'est pas un maximum à ne pas dépasser — c'est une valeur exacte.`,
                keyPoint: `La taille déclarée n'est pas un maximum — c'est un contrat exact. Tu déclares ce dont tu as besoin, pas plus.`,
              },
              recherche: {
                reminder: { text: `Rappel : parcourir au-delà de tes données réelles inclut des valeurs aléatoires dans tes calculs.` },
                intro: `Si tu cherches le minimum dans un tableau de taille 6 où seules 5 cases sont remplies, et que ta boucle va jusqu'à i < 6, elle lira la case [5] qui contient une valeur aléatoire. Si cette valeur est très petite, elle deviendra le "minimum" de ton tableau — un résultat complètement faux.`,
                keyPoint: `Une case non initialisée dans un calcul de min ou de moyenne peut fausser l'intégralité du résultat. La précision de la taille est une question de fiabilité des calculs.`,
              },
              parcours: {
                reminder: { text: `Rappel : ne jamais boucler au-delà du nombre de valeurs réelles dans le tableau.` },
                intro: `La condition i < N délimite exactement quelles cases tu analyses. Si N est supérieur au nombre de valeurs réelles, tu inclus des cases fantômes dans ta somme et ta moyenne. Avec points[6] et 5 valeurs réelles, si tu boucles jusqu'à i < 6, tu additionnes 5 vraies valeurs + 1 valeur aléatoire. Résultat garanti faux.`,
                keyPoint: `La taille du tableau et la condition de boucle doivent être identiques. Aucune case fantôme, aucune case oubliée.`,
              },
            },
          },

          /* ── E3 : Mauvais indice (confusion base-1) ──────────── */
          {
            id: 'eq1-wrong-index',
            errorProfile: 'confusion-base-1',
            title: 'Mauvais indice — 3ème case ≠ indice 3',
            detect: (c) => {
              const m = c.match(/printf\s*\([^)]*points\s*\[\s*(\d+)\s*\]/)
              return m != null && parseInt(m[1]) !== 2
            },
            message: `Tu as accédé à la mauvaise case. En C, le 3ème élément est à l'indice 2, pas 3. Le comptage commence toujours à 0 : 1er = [0], 2ème = [1], 3ème = [2]. La règle : indice = position - 1.`,
            analogy: `Pense à l'ascenseur : le rez-de-chaussée est le niveau 0. Quand tu veux le "3ème étage", tu appuies sur le bouton 2. Avec les tableaux C, c'est exactement pareil.`,
            adaptedSteps: {
              acces: {
                reminder: { text: `Tu avais utilisé un indice décalé de 1 — rappel sur le comptage à partir de 0 en C.` },
                intro: `Tu avais écrit points[3] pour afficher le 3ème match. C'est l'erreur la plus naturelle du monde — dans la vie quotidienne, le 3ème objet a le numéro 3. Mais en C, le comptage commence à 0. Pense à l'ascenseur : le rez-de-chaussée est le niveau 0, le 1er étage le niveau 1, le 2ème étage le niveau 2. Quand tu veux le "3ème étage", tu appuies sur le bouton 2. Avec les tableaux C, c'est exactement pareil : la 3ème case porte le numéro 2.`,
                keyPoint: `Formule à retenir une fois pour toutes — indice = position - 1. La 1ère case = indice 0. La 3ème case = indice 2. La 5ème case = indice 4. Chaque fois que tu te demandes "quel indice ?", prends ta position et soustrais 1.`,
                extraCodeBlocks: [
                  {
                    position: 'before',
                    id: 'anim-wrong-index',
                    label: 'Visualisation — quel indice pour le 3ème match ?',
                    type: 'animation',
                    component: AnimWrongIndex,
                  },
                ],
              },
              remplir: {
                reminder: { text: `Rappel : dans la boucle, i commence à 0. La 3ème saisie va dans points[2], pas points[3].` },
                intro: `Dans la boucle de saisie, i commence à 0. La 1ère valeur tapée va dans points[0], la 2ème dans points[1], la 3ème dans points[2]. Pour afficher "Entrez la valeur numéro 1", tu écris i + 1 dans le printf — parce que l'indice i et le numéro affiché à l'utilisateur ne sont pas la même chose. L'utilisateur voit 1, 2, 3... Le tableau stocke à 0, 1, 2...`,
                keyPoint: `Dans tes boucles, i est l'indice du tableau (commence à 0). Si tu veux afficher un numéro humain (1, 2, 3...), tu affiches i + 1. Les deux coexistent, ne les confonds pas.`,
              },
              recherche: {
                reminder: { text: `Rappel : "commencer à la 2ème case" = i = 1. Chaque position traduit en indice = position - 1.` },
                intro: `La boucle de recherche commence à i = 1 — pas i = 0. Pourquoi ? Parce que points[0] est déjà utilisé comme valeur de départ pour min. On compare depuis la 2ème case, qui est l'indice 1. Si tu avais écrit i = 2 par réflexe, tu aurais sauté la 2ème case — et le minimum pourrait s'y trouver.`,
                keyPoint: `"Commencer à la 2ème case" = i = 1. Chaque fois que tu lis "commence à la Nème case", traduis : indice = N - 1. La boucle commence à i = 1 car l'indice 0 est déjà utilisé comme référence.`,
              },
              parcours: {
                reminder: { text: `Rappel : dernière case d'un tableau de taille 5 = indice 4, jamais 5.` },
                intro: `La condition i < 5 fait tourner la boucle 5 fois : i vaut 0, 1, 2, 3, puis 4. Ces 5 valeurs correspondent exactement aux 5 cases. La dernière case, la 5ème, est à l'indice 4 — pas 5. Si tu écrivais i <= 5 par réflexe, tu tenterais d'accéder à points[5] qui n'existe pas.`,
                keyPoint: `Pour un tableau de taille 5, les indices valides sont 0, 1, 2, 3, 4. Jamais 5. La condition i < 5 s'arrête exactement au bon moment — i atteint 4 et la boucle s'arrête avant d'aller à 5.`,
              },
            },
          },

        ],

        answer: `#include <stdio.h>

int main() {
    // 1. Déclare et initialise le tableau "points"
    int points[5] = {23, 17, 31, 8, 25};

    // 2. Affiche la valeur du 3ème match (indice 2)
    printf("%d\\n", points[2]);  // affiche 31

    return 0;
}`,
      },
    },

    /* ═══════════════════════════════════════════════════════
       ÉTAPE 2 — Lire et modifier une case précise
    ═══════════════════════════════════════════════════════ */
    {
      id: 'acces',
      badge: 'Étape 2 · Accès',
      title: 'Lire et modifier une case précise',
      objective: `Comprendre la notion d'indice et savoir lire ou modifier n'importe quelle case d'un tableau.`,

      intro: {
        text: `Pour accéder à une case d'un tableau, tu dois connaître son numéro — qu'on appelle l'indice. Imagine un bus scolaire avec des sièges numérotés. Le premier siège s'appelle le siège 0, le deuxième le siège 1, et ainsi de suite. En C, c'est exactement pareil : la première case d'un tableau a toujours l'indice 0, jamais 1. Beaucoup de débutants oublient ça et essaient d'accéder à la case numéro 1 pour avoir la première valeur — c'est l'une des erreurs les plus courantes. Retiens cette règle une bonne fois pour toutes : premier élément = indice 0.`,
      },

      illustration: 'array-boxes',

      codeBlocks: [
        {
          id: 'read',
          label: 'Lire la valeur d\'une case',
          code: `int notes[5] = {12, 8, 15, 9, 14};
//  Cases :        [0] [1] [2] [3] [4]
//  Valeurs :       12   8  15   9  14

// Pour lire une case, tu écris : nom[indice]
printf("%d", notes[0]);  // affiche 12  ← c'est la 1ère case
printf("%d", notes[2]);  // affiche 15  ← c'est la 3ème case
printf("%d", notes[4]);  // affiche 14  ← c'est la DERNIÈRE case`,
          type: 'neutral',
          comment: `Pour un tableau de 5 cases, les indices valides sont 0, 1, 2, 3, et 4. La dernière case valide a toujours l'indice "taille - 1", donc ici 5 - 1 = 4.`,
        },
        {
          id: 'modify',
          label: 'Modifier la valeur d\'une case',
          code: `// Pour modifier une case, on lui assigne simplement une nouvelle valeur
notes[1] = 20;  // la case d'indice 1 passe de 8 à 20
notes[3] = 18;  // la case d'indice 3 passe de 9 à 18

// Résultat après modification :
// notes = {12, 20, 15, 18, 14}
//          [0]  [1] [2]  [3] [4]
// Les cases [0], [2] et [4] n'ont pas bougé`,
          type: 'good',
          comment: `Modifier une case ne touche pas aux autres. C'est comme changer la note d'un seul élève sur une feuille de classe — les autres restent intactes.`,
        },
        {
          id: 'out-of-bounds',
          label: 'L\'erreur classique : sortir des limites',
          code: `int notes[5] = {12, 8, 15, 9, 14};
// Ce tableau a 5 cases : indices 0 à 4

notes[5] = 19;  // ERREUR ! L'indice 5 n'existe pas dans ce tableau
                // Le seul indice valide pour la dernière case est 4

// Ce que C fait dans ce cas : il écrit dans une zone mémoire
// qui ne lui appartient pas. Le programme peut se crasher,
// donner des résultats bizarres, ou sembler fonctionner
// par chance — c'est le pire cas car l'erreur se voit pas.`,
          type: 'bad',
          comment: `C ne vérifie jamais si tu dépasses les limites d'un tableau — c'est au programmeur de faire attention. D'autres langages comme Python lancent une erreur claire, pas C. Sois vigilant.`,
        },
      ],

      keyPoint: `Règle d'or : pour un tableau de taille n, les indices valides vont de 0 à n-1. Jamais n lui-même. Pour notes[5], les indices valides sont 0, 1, 2, 3, 4 — pas 5. Accéder à notes[5] ne provoque pas forcément un message d'erreur visible, ce qui rend ce bug très difficile à détecter.`,

      exercise: {
        type: 'code',
        question: 'Lis, modifie et vérifie',
        prompt: `Tu as ce tableau de scores de jeu vidéo :\nint scores[5] = {40, 55, 70, 30, 90};\n\nTon programme doit faire 4 choses dans l'ordre :\n1. Afficher la première valeur du tableau (la case à l'indice 0)\n2. Afficher la dernière valeur du tableau (la case à l'indice 4)\n3. Modifier la case d'indice 2 : lui donner la valeur 85\n4. Afficher cette case modifiée pour vérifier que ça a bien changé`,
        starter: `#include <stdio.h>

int main() {
    int scores[5] = {40, 55, 70, 30, 90};

    // 1. Affiche la première valeur (indice 0)

    // 2. Affiche la dernière valeur (indice 4)

    // 3. Modifie la case d'indice 2 : mets-y la valeur 85

    // 4. Affiche la case modifiée pour vérifier

    return 0;
}`,
        hints: [
          `Pour lire la 1ère case : printf("%d", scores[0]);  |  Pour lire la dernière : printf("%d", scores[4]);`,
          `Pour modifier une case, c'est comme une assignation normale : scores[2] = 85;`,
          `Pour afficher après modification : printf("%d", scores[2]); — tu dois voir 85 s'afficher, pas 70.`,
        ],
        validation: [
          {
            id: 'read-first',
            test: (c) => /printf\s*\(.*scores\s*\[\s*0\s*\]/i.test(c),
            success: 'Affichage de la première case (indice 0) correct.',
            error: 'Pour afficher la 1ère case : printf("%d", scores[0]);',
          },
          {
            id: 'read-last',
            test: (c) => /printf\s*\(.*scores\s*\[\s*4\s*\]/i.test(c),
            success: 'Affichage de la dernière case (indice 4) correct.',
            error: 'Pour afficher la dernière case : printf("%d", scores[4]); — un tableau de 5 cases a pour dernière case l\'indice 4.',
          },
          {
            id: 'modify',
            test: (c) => /scores\s*\[\s*2\s*\]\s*=\s*85\s*;/.test(c),
            success: 'Modification de scores[2] à 85 correcte.',
            error: 'Pour modifier : scores[2] = 85; — écris ça exactement comme une assignation de variable.',
          },
        ],
        answer: `#include <stdio.h>

int main() {
    int scores[5] = {40, 55, 70, 30, 90};

    // 1. Affiche la première valeur
    printf("%d\\n", scores[0]);  // affiche 40

    // 2. Affiche la dernière valeur
    printf("%d\\n", scores[4]);  // affiche 90

    // 3. Modifie la case d'indice 2
    scores[2] = 85;

    // 4. Affiche la valeur modifiée
    printf("%d\\n", scores[2]);  // affiche 85 (et non plus 70)

    return 0;
}`,
      },
    },

    /* ═══════════════════════════════════════════════════════
       ÉTAPE 3 — Remplir un tableau avec scanf
    ═══════════════════════════════════════════════════════ */
    {
      id: 'remplir',
      badge: 'Étape 3 · Remplissage',
      title: 'Remplir un tableau avec scanf',
      objective: `Apprendre à demander des valeurs à l'utilisateur et à les stocker dans un tableau case par case avec une boucle.`,

      intro: {
        text: `Dans les étapes précédentes, les valeurs du tableau étaient écrites directement dans le code. En réalité, la plupart du temps tu veux que ce soit l'utilisateur qui entre les données — comme dans un vrai programme. Pour ça, on utilise scanf qui lit ce que l'utilisateur tape au clavier. La difficulté, c'est que scanf a besoin de savoir exactement où en mémoire il doit stocker la valeur saisie. Pour lui indiquer ça, on utilise le symbole & devant le nom de la case. Ce & signifie "l'adresse de" — c'est une notion propre au C. Ne te prends pas trop la tête là-dessus pour l'instant : retiens juste que scanf et & vont toujours ensemble, sinon le programme plante.`,
      },

      codeBlocks: [
        {
          id: 'manual',
          label: 'Sans boucle — fastidieux et limité',
          code: `int notes[5];   // tableau déclaré mais vide pour l'instant

// On remplit case par case manuellement
notes[0] = 12;
notes[1] = 8;
notes[2] = 15;
notes[3] = 9;
notes[4] = 14;

// Résultat : ça fonctionne, mais c'est du code en dur.
// L'utilisateur ne peut rien changer.
// Et avec 30 élèves, tu écrirais 30 lignes...`,
          type: 'bad',
          comment: `Cette méthode fonctionne pour tester rapidement, mais elle ne permet pas à l'utilisateur de saisir ses propres données. Ce n'est pas un vrai programme interactif.`,
        },
        {
          id: 'loop-scanf',
          label: 'Avec une boucle et scanf — la vraie façon',
          code: `int notes[5];

// La boucle tourne 5 fois : i vaut 0, puis 1, 2, 3, 4
for(int i = 0; i < 5; i++) {
    printf("Entrez la note numero %d : ", i + 1);
    //                                    ↑
    //                    i + 1 pour afficher 1, 2, 3... au lieu de 0, 1, 2...
    scanf("%d", &notes[i]);
    //     ↑      ↑
    //     │      └── &notes[i] = l'adresse de la case i en mémoire
    //     └── %d = on attend un nombre entier
}`,
          type: 'good',
          comment: `Le & devant notes[i] est ce qu'on appelle l'opérateur d'adresse. Il dit à scanf : "va stocker la valeur saisie exactement à cet endroit en mémoire". Sans le &, scanf ne sait pas où écrire et le programme plante ou donne des résultats faux.`,
        },
        {
          id: 'display-after',
          label: 'Afficher les valeurs saisies avec une 2ème boucle',
          code: `// Après la saisie, on peut afficher tout le tableau
// avec une deuxième boucle identique
for(int i = 0; i < 5; i++) {
    printf("note[%d] = %d\\n", i, notes[i]);
}
// Affiche :
// note[0] = 12
// note[1] = 8
// note[2] = 15  etc.`,
          type: 'neutral',
          comment: `On utilise une boucle séparée pour l'affichage, car on veut d'abord collecter toutes les valeurs, puis les afficher toutes. Mélanger saisie et affichage dans la même boucle fonctionnerait aussi, mais c'est moins lisible.`,
        },
      ],

      keyPoint: `scanf("%d", &notes[i]) — les deux éléments importants : le format (%d pour entier, %f pour décimal) et le & devant la variable. Le & dit à scanf où stocker la valeur. C'est une règle absolue en C : sans &, le programme ne fonctionne pas correctement. Apprentis-la par cœur.`,

      exercise: {
        type: 'code',
        question: 'Enregistre les températures de 4 saisons',
        prompt: `Tu veux créer un programme qui demande à l'utilisateur les températures moyennes des 4 saisons de l'année (en degrés Celsius, avec des décimales possibles).\n\nTon programme doit :\n1. Déclarer un tableau nommé "temperatures" pouvant stocker 4 nombres décimaux (float)\n2. Utiliser une boucle for avec scanf pour demander la température de chaque saison\n3. Afficher le message "Entrez la temperature de la saison X :" pour chaque saisie\n4. Après toutes les saisies, afficher chaque température avec une 2ème boucle\n\nNote : pour les float, le format scanf est %f, et pour printf c'est %.1f (1 décimale).`,
        starter: `#include <stdio.h>

int main() {
    // 1. Déclare le tableau de 4 flottants
    //    Syntaxe : float nom[taille];

    // 2 & 3. Boucle de saisie avec scanf
    //    N'oublie pas le & devant temperatures[i] dans scanf !

    // 4. Boucle d'affichage de toutes les valeurs

    return 0;
}`,
        hints: [
          `Pour déclarer un tableau de nombres décimaux : float temperatures[4]; — on utilise float et non int pour avoir les décimales.`,
          `Dans la boucle for, utilise scanf("%f", &temperatures[i]); — note le %f pour float et le & obligatoire.`,
          `Pour afficher un float avec 1 décimale : printf("Saison %d : %.1f C\\n", i + 1, temperatures[i]);`,
        ],
        validation: [
          {
            id: 'float-array',
            test: (c) => /float\s+temperatures\s*\[\s*4\s*\]/i.test(c),
            success: 'Tableau "temperatures" de 4 flottants déclaré correctement.',
            error: 'Déclare : float temperatures[4]; — utilise float (et non int) pour les nombres décimaux.',
          },
          {
            id: 'for-loop',
            test: (c) => /for\s*\(\s*(int\s+)?i\s*=\s*0\s*;\s*i\s*<\s*4\s*;/.test(c),
            success: 'Boucle for configurée correctement pour 4 itérations (i de 0 à 3).',
            error: 'Utilise : for(int i = 0; i < 4; i++) — la condition est i < 4, pas i <= 4.',
          },
          {
            id: 'scanf-use',
            test: (c) => /scanf\s*\(\s*["\']%f["\']\s*,\s*&temperatures\s*\[/i.test(c),
            success: 'scanf utilisé correctement avec %f et &temperatures[i].',
            error: 'Dans la boucle : scanf("%f", &temperatures[i]); — vérifie %f (pas %d) et le & avant temperatures.',
          },
        ],
        answer: `#include <stdio.h>

int main() {
    // 1. Déclare le tableau de 4 flottants
    float temperatures[4];

    // 2 & 3. Boucle de saisie
    for(int i = 0; i < 4; i++) {
        printf("Entrez la temperature de la saison %d : ", i + 1);
        scanf("%f", &temperatures[i]);
    }

    // 4. Boucle d'affichage
    for(int i = 0; i < 4; i++) {
        printf("Saison %d : %.1f C\\n", i + 1, temperatures[i]);
    }

    return 0;
}`,
      },
    },

    /* ═══════════════════════════════════════════════════════
       ÉTAPE 4 — Chercher une valeur, le min et le max
    ═══════════════════════════════════════════════════════ */
    {
      id: 'recherche',
      badge: 'Étape 4 · Recherche',
      title: 'Chercher une valeur, le min et le max',
      objective: `Apprendre à parcourir un tableau pour trouver une valeur précise, la plus petite et la plus grande.`,

      intro: {
        text: `Contrairement à d'autres langages, le C ne te donne aucune fonction toute faite pour chercher dans un tableau. Il n'y a pas de "trouveMin()" ou "chercheValeur()" — tu dois tout écrire toi-même. Le principe est simple : on regarde chaque case une par une, on compare, et on mémorise ce qu'on cherche. C'est exactement ce que tu ferais dans la vraie vie si quelqu'un te donnait une liste de nombres sur papier et te demandait de trouver le plus petit : tu regarderais le premier, tu le gardes en tête comme "candidat minimum", puis tu regardes le suivant — s'il est plus petit, il devient le nouveau candidat. Et ainsi de suite jusqu'au bout de la liste.`,
      },

      codeBlocks: [
        {
          id: 'min',
          label: 'Trouver le minimum — étape par étape',
          code: `int notes[5] = {12, 8, 15, 9, 14};

// Étape 1 : on suppose que le 1er élément est le plus petit
int min = notes[0];   // min vaut 12 au départ
//           ↑
//   On part de notes[0] et NON de 0 !
//   Si toutes les notes étaient négatives (-5, -8...) et qu'on
//   partait de 0, le résultat serait faux.

// Étape 2 : on compare avec tous les autres (à partir de l'indice 1)
for(int i = 1; i < 5; i++) {   // on commence à 1, pas 0 !
    if(notes[i] < min) {
        min = notes[i];   // on a trouvé plus petit → on met à jour
    }
}

printf("Note minimale : %d\\n", min);   // affiche 8`,
          type: 'good',
          comment: `La boucle commence à i = 1 car l'indice 0 est déjà utilisé comme valeur de départ pour min. Inutile de comparer min avec lui-même.`,
        },
        {
          id: 'max',
          label: 'Trouver le maximum — même logique, opérateur inversé',
          code: `int notes[5] = {12, 8, 15, 9, 14};
int max = notes[0];   // on suppose que le 1er est le plus grand

for(int i = 1; i < 5; i++) {
    if(notes[i] > max) {   // > au lieu de < : c'est la seule différence
        max = notes[i];
    }
}

printf("Note maximale : %d\\n", max);   // affiche 15`,
          type: 'good',
          comment: `Le code est identique à celui du minimum, sauf qu'on cherche une valeur plus GRANDE (>) plutôt que plus petite (<). La structure de raisonnement est exactement la même.`,
        },
        {
          id: 'search',
          label: 'Rechercher si une valeur existe dans le tableau',
          code: `int notes[5] = {12, 8, 15, 9, 14};
int valeur_cherchee = 15;
int trouve = 0;   // on utilise 0 pour "non trouvé" et 1 pour "trouvé"
//            ↑ en C, on n'a pas de type "booléen" (vrai/faux),
//              alors on simule avec 0 et 1

for(int i = 0; i < 5; i++) {
    if(notes[i] == valeur_cherchee) {   // == pour comparer, pas =
        trouve = 1;                      // = serait une assignation !
        printf("Valeur %d trouvee a l'indice %d\\n", valeur_cherchee, i);
    }
}

if(trouve == 0) {
    printf("Cette valeur n'est pas dans le tableau.\\n");
}`,
          type: 'neutral',
          comment: `Attention à ne pas confondre = (assignation : "mets cette valeur") et == (comparaison : "est-ce que ces deux valeurs sont égales ?"). C'est une erreur très courante chez les débutants.`,
        },
      ],

      keyPoint: `Deux règles à ne jamais oublier pour min et max : 1) toujours initialiser avec notes[0] et non avec 0 ou une valeur arbitraire ; 2) la boucle commence à l'indice 1 car l'indice 0 est déjà la valeur de référence. Et pour comparer deux valeurs, utilise toujours == (deux signes égal) et non = (un seul).`,

      exercise: {
        type: 'code',
        question: 'Trouve le meilleur et le pire joueur du tournoi',
        prompt: `Tu organises un tournoi avec 6 joueurs. Voici leurs scores :\nint scores[6] = {45, 78, 23, 91, 56, 67};\n\nTon programme doit :\n1. Trouver et afficher le score le plus élevé (le champion du tournoi)\n2. Trouver et afficher le score le plus faible\n3. Afficher aussi à quel indice se trouve le score maximum\n\nLe code de départ est déjà partiellement écrit, tu dois compléter les boucles.`,
        starter: `#include <stdio.h>

int main() {
    int scores[6] = {45, 78, 23, 91, 56, 67};

    // 1 & 3. Trouver le maximum et l'indice où il se trouve
    int max = scores[0];
    int indice_max = 0;
    // Écris la boucle for ici (commence à i = 1)
    // Si scores[i] > max : mets à jour max ET indice_max


    // 2. Trouver le minimum
    int min = scores[0];
    // Écris la boucle for ici (commence à i = 1)
    // Si scores[i] < min : mets à jour min


    // Affichage des résultats
    printf("Meilleur score : %d (c'est le joueur a l'indice %d)\\n", max, indice_max);
    printf("Score le plus faible : %d\\n", min);

    return 0;
}`,
        hints: [
          `Pour le maximum : for(int i = 1; i < 6; i++) { if(scores[i] > max) { max = scores[i]; indice_max = i; } } — quand tu trouves un nouveau max, tu mémorises aussi son indice.`,
          `Pour le minimum : même structure, mais remplace > par < et tu n'as pas besoin de mémoriser l'indice.`,
          `La boucle commence à i = 1 dans les deux cas car scores[0] est déjà utilisé comme valeur de départ pour max et min.`,
        ],
        validation: [
          {
            id: 'max-logic',
            test: (c) => /scores\s*\[i\]\s*>\s*max/.test(c),
            success: 'Logique de recherche du maximum correcte — tu compares bien avec >.',
            error: 'Pour trouver le max, la condition doit être : if(scores[i] > max)',
          },
          {
            id: 'min-logic',
            test: (c) => /scores\s*\[i\]\s*<\s*min/.test(c),
            success: 'Logique de recherche du minimum correcte — tu compares bien avec <.',
            error: 'Pour trouver le min, la condition doit être : if(scores[i] < min)',
          },
          {
            id: 'indice-track',
            test: (c) => /indice_max\s*=\s*i/.test(c),
            success: `Tu mémorises bien l'indice du maximum — c'est important pour savoir quel joueur est le champion.`,
            error: `Quand tu trouves un nouveau max, mémorise aussi son indice : indice_max = i;`,
          },
        ],
        answer: `#include <stdio.h>

int main() {
    int scores[6] = {45, 78, 23, 91, 56, 67};

    // 1 & 3. Trouver le maximum et son indice
    int max = scores[0];
    int indice_max = 0;
    for(int i = 1; i < 6; i++) {
        if(scores[i] > max) {
            max = scores[i];
            indice_max = i;   // on mémorise aussi où il se trouve
        }
    }

    // 2. Trouver le minimum
    int min = scores[0];
    for(int i = 1; i < 6; i++) {
        if(scores[i] < min) {
            min = scores[i];
        }
    }

    // Affichage des résultats
    printf("Meilleur score : %d (c'est le joueur a l'indice %d)\\n", max, indice_max);
    printf("Score le plus faible : %d\\n", min);

    return 0;
}`,
      },
    },

    /* ═══════════════════════════════════════════════════════
       ÉTAPE 5 — Parcourir, sommer, calculer une moyenne
    ═══════════════════════════════════════════════════════ */
    {
      id: 'parcours',
      badge: 'Étape 5 · Parcours complet',
      title: 'Somme, moyenne et filtres sur un tableau',
      objective: `Savoir parcourir intégralement un tableau pour afficher, additionner, calculer une moyenne et filtrer les éléments selon une condition.`,

      intro: {
        text: `Parcourir un tableau signifie passer par chaque case, dans l'ordre, du début jusqu'à la fin. C'est de loin l'opération la plus fréquente quand on travaille avec des tableaux. La boucle for est l'outil naturel pour ça : à chaque tour, i augmente de 1 et tu accèdes à la case suivante. Tu peux faire absolument tout ce que tu veux dans cette boucle — afficher les valeurs, les additionner, les comparer, les filtrer. C'est là que les tableaux deviennent vraiment puissants : imaginer calculer la moyenne de 100 notes sans boucle, ce serait 100 lignes de code. Avec une boucle, c'est 3 lignes.`,
      },

      illustration: 'loop-trace',

      codeBlocks: [
        {
          id: 'display-all',
          label: 'Afficher toutes les cases — la boucle de base',
          code: `int notes[5] = {12, 8, 15, 9, 14};

for(int i = 0; i < 5; i++) {
    printf("notes[%d] = %d\\n", i, notes[i]);
    //            ↑          ↑
    //            i = numéro de la case  |  notes[i] = valeur de la case
}

// Ce que ça affiche :
// notes[0] = 12
// notes[1] = 8
// notes[2] = 15
// notes[3] = 9
// notes[4] = 14`,
          type: 'trace',
          comment: `La variable i joue deux rôles en même temps : elle sert d'indice pour accéder à la case (notes[i]) et peut être affichée pour montrer le numéro de la case. C'est pour ça que i est si utile dans les boucles de tableau.`,
        },
        {
          id: 'sum-avg',
          label: 'Calculer la somme et la moyenne',
          code: `int notes[5] = {12, 8, 15, 9, 14};
int somme = 0;   // on part de zéro avant de commencer à additionner

for(int i = 0; i < 5; i++) {
    somme += notes[i];
    //  ↑
    //  += est un raccourci pour : somme = somme + notes[i]
    //  À chaque tour, on ajoute la valeur de la case à somme
}

// À la fin de la boucle, somme = 12+8+15+9+14 = 58

float moyenne = somme / 5.0;
//                       ↑
//    ATTENTION : 5.0 et non 5 !
//    Si on écrit "somme / 5", C fait une division entière et
//    perd la partie décimale. 58 / 5 = 11 (et non 11.6 !)
//    Avec 5.0, C fait une division décimale : 58 / 5.0 = 11.60

printf("Somme   : %d\\n",   somme);     // affiche 58
printf("Moyenne : %.2f\\n", moyenne);   // affiche 11.60`,
          type: 'good',
          comment: `La règle du 5.0 vs 5 est subtile mais importante. En C, quand tu divises un int par un int, le résultat est toujours un int (la partie décimale est perdue sans arrondi). Pour forcer une division décimale, au moins un des deux nombres doit être un float — c'est pourquoi on écrit 5.0 et non 5.`,
        },
        {
          id: 'filter',
          label: 'Afficher uniquement les valeurs qui vérifient une condition',
          code: `// On peut combiner boucle et condition pour ne traiter
// que certaines cases selon un critère

for(int i = 0; i < 5; i++) {
    if(notes[i] >= 10) {   // on ne traite que les notes suffisantes
        printf("Admis : notes[%d] = %d\\n", i, notes[i]);
    }
}

// Affiche seulement :
// Admis : notes[0] = 12
// Admis : notes[2] = 15
// Admis : notes[4] = 14
// Les cases [1]=8 et [3]=9 sont ignorées car < 10`,
          type: 'neutral',
          comment: `Cette technique — boucle + condition — te permet de filtrer, de compter, de transformer : n'afficher que les notes au-dessus de la moyenne, compter les élèves en dessous de 10, additionner uniquement les valeurs positives... Les possibilités sont infinies.`,
        },
      ],

      keyPoint: `somme += notes[i] signifie "ajoute notes[i] à somme" — c'est un raccourci pour somme = somme + notes[i]. Pour la moyenne, divise toujours par 5.0 (avec le point) et non par 5. La condition de boucle est i < 5 et jamais i <= 5 : avec <=, tu irais lire la case d'indice 5 qui n'existe pas.`,

      exercise: {
        type: 'code',
        question: 'Analyse complète des notes de la classe',
        prompt: `Tu as les notes de 6 élèves à la fin du trimestre :\nint notes[6] = {14, 8, 17, 12, 9, 15};\n\nTon programme doit faire une analyse complète :\n1. Calculer la somme de toutes les notes avec une boucle for\n2. Calculer la moyenne et la stocker dans une variable float\n3. Afficher la somme et la moyenne (avec 2 décimales)\n4. Dans une 2ème boucle, afficher uniquement les élèves en dessous de 10 avec le message "Eleve [i] en difficulte : note = X"`,
        starter: `#include <stdio.h>

int main() {
    int notes[6] = {14, 8, 17, 12, 9, 15};
    int somme = 0;

    // 1. Calcule la somme avec une boucle for
    //    Dans la boucle : somme += notes[i];

    // 2. Calcule la moyenne (n'oublie pas : divise par 6.0 et non 6 !)
    //    float moyenne = ...

    // 3. Affiche somme et moyenne

    // 4. 2ème boucle : affiche les élèves en dessous de 10

    return 0;
}`,
        hints: [
          `Pour la somme : for(int i = 0; i < 6; i++) { somme += notes[i]; } — démarre somme à 0 avant la boucle.`,
          `Pour la moyenne : float moyenne = somme / 6.0; — obligatoirement 6.0 avec le point, sinon tu perds les décimales.`,
          `Pour le filtre dans la 2ème boucle : if(notes[i] < 10) { printf("Eleve [%d] en difficulte : note = %d\\n", i, notes[i]); }`,
        ],
        validation: [
          {
            id: 'sum-loop',
            test: (c) => /somme\s*\+=\s*notes\s*\[i\]/.test(c) || /somme\s*=\s*somme\s*\+\s*notes\s*\[i\]/.test(c),
            success: 'Calcul de la somme correct — tu accumules bien notes[i] dans somme à chaque tour.',
            error: 'Dans la boucle for, accumule avec : somme += notes[i]; (ou somme = somme + notes[i];)',
          },
          {
            id: 'avg-float',
            test: (c) => /float\s+moyenne/.test(c) && /\/\s*6\.0/.test(c),
            success: 'Moyenne calculée en float avec division par 6.0 — parfait, tu gardes les décimales.',
            error: 'Déclare : float moyenne = somme / 6.0; — le 6.0 avec le point est obligatoire pour ne pas perdre les décimales.',
          },
          {
            id: 'filter-below10',
            test: (c) => /notes\s*\[i\]\s*<\s*10/.test(c),
            success: 'Filtre des élèves en dessous de 10 implémenté correctement.',
            error: 'Dans une 2ème boucle for, ajoute : if(notes[i] < 10) pour ne traiter que les notes insuffisantes.',
          },
        ],
        answer: `#include <stdio.h>

int main() {
    int notes[6] = {14, 8, 17, 12, 9, 15};
    int somme = 0;

    // 1. Calcule la somme
    for(int i = 0; i < 6; i++) {
        somme += notes[i];
    }

    // 2. Calcule la moyenne
    float moyenne = somme / 6.0;

    // 3. Affiche somme et moyenne
    printf("Somme   : %d\\n", somme);
    printf("Moyenne : %.2f\\n", moyenne);

    // 4. Élèves en dessous de 10
    printf("Eleves en difficulte :\\n");
    for(int i = 0; i < 6; i++) {
        if(notes[i] < 10) {
            printf("  Eleve [%d] en difficulte : note = %d\\n", i, notes[i]);
        }
    }

    return 0;
}`,
      },
    },

  ],
}
