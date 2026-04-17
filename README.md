# Bella Bot — Plateforme d'apprentissage adaptatif du C

Bella Bot est une application web pédagogique qui enseigne la programmation en C à des élèves de 15–20 ans. Elle adapte dynamiquement le contenu des leçons selon le **profil d'apprentissage Felder-Silverman** de l'étudiant et ses **erreurs détectées en temps réel** lors des exercices pratiques.

---

## Stack technique

| Outil | Rôle |
|---|---|
| React 19 | UI & composants |
| Vite 8 | Bundler / dev server |
| Tailwind CSS 4 | Styles utilitaires (dark theme) |
| React Router v7 | Navigation SPA |
| react-icons (Heroicons v1 `hi`) | Icônes |

> **Aucun backend.** Toute la logique est côté client. L'authentification est simulée en mémoire. Il n'y a pas de base de données, pas d'API, pas de persistence entre sessions.

---

## Lancer le projet

```bash
npm install
npm run dev
```

Accès : `http://localhost:5173`

**Comptes de démo :**
| Email | Mot de passe | Rôle |
|---|---|---|
| `admin@bellabot.ai` | `bella2024` | Enseignant |
| `eleve@bellabot.ai` | `eleve123` | Élève |
| Bouton "Accès démo" | — | Élève anonyme |

---

## Architecture des fichiers

```
src/
├── App.jsx                          # Router principal + guards de routes
├── context/
│   └── AuthContext.jsx              # État global : user + profil d'apprentissage
├── hooks/
│   ├── useAuth.js                   # Consommateur du AuthContext
│   └── useChatBot.js                # Logique du chatbot Bella (matching KB)
├── pages/
│   ├── LoginPage.jsx                # Connexion / accès démo
│   ├── ProfileSelectPage.jsx        # Choix du profil Felder-Silverman
│   ├── DashboardPage.jsx            # Tableau de bord de l'élève
│   └── LearningPage.jsx             # Séance d'apprentissage (page principale)
├── components/
│   └── learning/
│       ├── CodeBlock.jsx            # Bloc de code avec coloration syntaxique C
│       ├── AnimationBlock.jsx       # Wrapper pour les animations React interactives
│       ├── PracticeEditor.jsx       # Éditeur de code + validation d'exercice
│       ├── ChatPanel.jsx            # Panneau du chatbot Bella
│       ├── ExerciseCard.jsx         # Carte d'exercice
│       ├── Illustrations.jsx        # Visuels SVG animés (ex: array-boxes)
│       └── animations/
│           └── ActifAnimations.jsx  # 4 animations React — profil Actif·Sensoriel
└── data/
    ├── profiles.js                  # Définition des 4 profils d'apprentissage
    └── lessons/
        ├── index.js                 # Mapping profil → leçon
        ├── arrays-actif.js          # Leçon tableaux C — profil Actif·Sensoriel
        ├── arrays-actif-visuel.js   # Leçon tableaux C — profil Actif·Visuel
        ├── arrays-visuel-intuitif.js# Leçon tableaux C — profil Visuel·Réflexif
        ├── arrays-visuel-sequentiel.js # Leçon tableaux C — profil Visuel·Séquentiel
        └── chatbot-arrays.js        # Base de connaissances du chatbot Bella
```

---

## Système de navigation (routes)

```
/              → redirige vers /login
/login         → LoginPage (public uniquement — redirige si déjà connecté)
/profile-select → ProfileSelectPage (nécessite d'être connecté)
/dashboard     → DashboardPage (nécessite user + profil choisi)
/learn         → LearningPage (nécessite user + profil choisi)
*              → redirige vers /login
```

**Guards :**
- `PrivateRoute` — bloque si non connecté
- `ProfileRoute` — bloque si connecté mais profil non encore choisi
- `PublicRoute` — redirige vers `/dashboard` si déjà connecté

---

## Profils d'apprentissage (Felder-Silverman simplifié)

Les 4 profils sont définis dans `src/data/profiles.js`. Chaque profil est une combinaison de 2 dimensions du modèle Felder-Silverman :

| `id` | Nom affiché | Dimensions | Couleur |
|---|---|---|---|
| `pratique` | L'Apprenant Pratique | Actif · Sensoriel | Emerald |
| `visuel` | Actif + Visuel | Actif · Visuel | Blue |
| `visuel-intuitif` | Visuel + Réflexif | Visuel · Réflexif | Violet |
| `visuel-sequentiel` | Visuel + Séquentiel | Visuel · Séquentiel | Amber |

Le profil choisi est stocké dans `AuthContext` et persiste en mémoire pendant la session. Il détermine quelle leçon est chargée via `getLessonByProfile(profileId)`.

---

## Structure d'une leçon (data model)

Chaque fichier de leçon exporte un objet de cette forme :

```js
{
  id: 'arrays-actif-visuel',
  subject: 'Les tableaux en C',
  profile: 'Actif · Visuel',
  steps: [
    {
      id: 'structure',           // identifiant de l'étape — utilisé pour l'adaptation
      badge: 'Étape 1 · Structure',
      title: '...',
      objective: '...',
      intro: { text: '...' },    // intro textuelle — peut être remplacée par adaptedContent
      illustration: 'array-boxes', // nom du composant visuel (Illustrations.jsx)
      codeBlocks: [              // blocs de code affichés dans la leçon
        {
          id: '...',
          label: '...',
          code: '...',
          type: 'neutral' | 'good' | 'bad' | 'trace' | 'bonus',
          comment: '...',
        }
      ],
      keyPoint: '...',           // encadré récapitulatif
      exercise: {                // exercice pratique de l'étape
        type: 'code',
        question: '...',
        prompt: '...',
        starter: '...',          // code pré-rempli dans l'éditeur
        hints: ['...'],
        validation: [            // règles de validation (regex + tests fonctionnels)
          {
            id: '...',
            test: (code) => Boolean,
            success: '...',
            error: '...',
          }
        ],
        errorPatterns: [         // erreurs courantes à détecter
          {
            id: 'eq1-missing-brackets',
            title: '...',
            test: (code) => Boolean,
            feedback: '...',     // message affiché dans le DiagnosticPanel
            adaptedContent: {    // OPTIONNEL — contenu adapté si cette erreur est détectée
              'step-id': '...',  // clé = id d'une étape, valeur = texte de remplacement de l'intro
            }
          }
        ]
      }
    }
  ]
}
```

---

## Système d'adaptation pédagogique (v2 — adaptedSteps)

C'est le cœur de la valeur pédagogique de Bella Bot. Voici le flux complet :

### 1. Détection d'erreur — `PracticeEditor.jsx`

Quand l'élève clique "Valider" dans l'éditeur :
1. Les règles `validation[]` sont évaluées (succès/échec global de l'exercice)
2. Si échoué, les `errorPatterns[]` sont parcourus via `detect(code)` pour identifier l'erreur précise
3. Si c'est la **première fois** que cette erreur apparaît (suivi via `shownErrorIds` Set), la callback `onErrorAdaptation` est appelée avec `{ errorId, adaptedSteps, errorTitle, errorProfile }`
4. Le `DiagnosticPanel` (panneau amber) s'affiche dans le bottom sheet de l'éditeur

> **Règle clé : l'adaptation ne se déclenche qu'à la PREMIÈRE occurrence d'une erreur.**

### 2. Propagation — `LearningPage.jsx`

`handleErrorAdaptation` reçoit l'info et :
- Ne se déclenche qu'une seule fois (`if (!adaptation)` — garde contre les erreurs suivantes)
- Stocke `adaptation = { errorId, adaptedSteps, adaptedContent, errorTitle, errorProfile }` dans le state React
- Active l'affichage de l'`AdaptationBanner` (bandeau violet)

### 3. Contenu adapté par étape — `StepContent`

Pour chaque étape, `LearningPage` passe un `adaptedStep` calculé ainsi :

```js
const adaptedStep = adaptation?.adaptedSteps?.[step.id]
```

`StepContent` utilise ensuite :
```jsx
const introText    = adaptedStep?.intro    ?? step.intro?.text
const keyPointText = adaptedStep?.keyPoint ?? step.keyPoint
```

Et affiche en plus :
- **Rappel amber** (`adaptedStep.reminder.text`) en bandeau en haut de l'étape
- **Blocs supplémentaires** (`adaptedStep.extraCodeBlocks`) avant/après les blocs originaux — peuvent être `CodeBlock` ou `AnimationBlock`

### 4. Structure `adaptedSteps` dans les fichiers de leçon

Chaque `errorPattern` dans un fichier de leçon contient maintenant `adaptedSteps` — un objet dont les clés sont des `step.id` :

```js
errorPatterns: [
  {
    id: 'eq1-no-size',
    errorProfile: 'tableau-variable-simple',
    title: 'Tableau déclaré sans taille',
    detect: (code) => /int\s+points\b/.test(code) && !/int\s+points\s*\[/.test(code),
    message: `...`,
    adaptedSteps: {
      acces: {
        reminder: { text: `Rappel : tu avais écrit int points sans crochets...` },
        intro: `Texte d'intro adapté à cette erreur pour l'étape "accès"...`,
        keyPoint: `Point clé reformulé selon l'erreur commise...`,
        extraCodeBlocks: [
          {
            position: 'before',  // ou 'after'
            id: 'anim-no-size',
            label: 'Visualisation — réservation mémoire',
            type: 'animation',
            component: AnimNoSize,  // composant React
          }
        ],
      },
      remplir: { reminder: {...}, intro: '...', keyPoint: '...' },
      recherche: { reminder: {...}, intro: '...', keyPoint: '...' },
      parcours:  { reminder: {...}, intro: '...', keyPoint: '...' },
    }
  }
]
```

### 5. Validation — format `validation[]`

L'exercice utilise un **tableau de règles** (plus de `test:` unique) :

```js
validation: [
  {
    id: 'array-decl',
    test: (code) => /int\s+points\s*\[\s*5\s*\]/i.test(code),
    success: 'Tableau "points[5]" déclaré correctement ✓',
    error: 'Déclare le tableau avec : int points[5] = {...};',
  },
  {
    id: 'init-values',
    test: (code) => /\{\s*23\s*,\s*17\s*,\s*31\s*,\s*8\s*,\s*25\s*\}/.test(code),
    success: 'Les 5 valeurs sont dans le bon ordre ✓',
    error: 'Initialise avec exactement : {23, 17, 31, 8, 25}',
  },
]
```

Chaque règle s'évalue indépendamment et affiche son propre message dans le `DiagnosticPanel`.

---

## Profils avec système adaptatif complet

Les 4 profils ont chacun leur fichier de leçon avec `validation[]` + `errorPatterns[]` + `adaptedSteps` complets :

| Fichier | Profil | Exercice Étape 1 | Erreurs détectées |
|---|---|---|---|
| `arrays-actif.js` | Actif · Sensoriel | `int points[5]` basket | `eq1-no-size`, `eq1-size-too-small`, `eq1-size-too-large`, `eq1-wrong-index` |
| `arrays-actif-visuel.js` | Actif · Visuel | `int points[5]` basket | `eq1-no-brackets`, `eq1-size-too-small`, `eq1-size-too-large`, `eq1-wrong-index` |
| `arrays-visuel-sequentiel.js` | Visuel · Séquentiel | `int scores[6]` + `int resultats[10]` | `eq1-no-brackets`, `eq1-size-wrong`, `eq1-index-off`, `eq1-both-wrong` |
| `arrays-visuel-intuitif.js` | Visuel · Réflexif | `int temps[7]` météo | `eq1-no-brackets`, `eq1-size-not-7`, `eq1-index-4-not-3`, `eq1-index-7-out-of-bounds` |

### Ton pédagogique par profil

| Profil | Approche |
|---|---|
| Actif · Sensoriel | Analogies concrètes du quotidien (cinéma, boîte d'œufs, ascenseur) |
| Actif · Visuel | Schémas visuels, ASCII art, métaphore "flèche d'accès" |
| Visuel · Séquentiel | Progression numérotée "Étape 1 → Étape 2", chaîne séquentielle |
| Visuel · Réflexif | Vision globale d'abord, questions déductives, liens pointeurs/mémoire |

---

## Animations interactives — `AnimationBlock`

Pour le profil **Actif · Sensoriel**, les `extraCodeBlocks` statiques (blocs de code commenté) ont été remplacés par des **animations React interactives**.

### Composant `AnimationBlock.jsx`

```jsx
<AnimationBlock label="Visualisation — réservation mémoire" Component={AnimNoSize} />
```

Rend simplement `<Component />` dans un conteneur stylisé avec un header "Animation".

### Composants dans `ActifAnimations.jsx`

| Composant | Erreur couverte | Interaction |
|---|---|---|
| `AnimNoSize` | `int points` sans `[5]` | Boutons scénario → cases apparaissent une par une |
| `AnimSizeTooSmall` | `points[4]` pour 5 valeurs | Bouton "Étape suivante" — place valeurs, la 5ème déborde en rouge |
| `AnimSizeTooLarge` | `points[6]` pour 5 valeurs | Case fantôme cliquable → révèle valeur garbage aléatoire |
| `AnimWrongIndex` | `points[3]` au lieu de `points[2]` | Clic sur boîtes → feedback immédiat + formule `indice = rang − 1` |

Pour utiliser une animation dans un `extraCodeBlock` :

```js
// Dans le fichier de leçon
import { AnimNoSize } from '../../components/learning/animations/ActifAnimations.jsx'

extraCodeBlocks: [{
  position: 'before',
  id: 'anim-no-size',
  label: 'Visualisation — réservation mémoire',
  type: 'animation',
  component: AnimNoSize,   // ← référence au composant React
}]
```

Dans `LearningPage.jsx`, le rendu vérifie `block.type === 'animation'` :
```jsx
block.type === 'animation'
  ? <AnimationBlock key={block.id} label={block.label} Component={block.component} />
  : <CodeBlock ... />
```

### Rétro-compatibilité

L'ancien format `adaptedContent` (map `step.id → string`) fonctionne toujours via un fallback dans `LearningPage`. Les nouveaux profils utilisent `adaptedSteps`.

---

## Composant CodeBlock — Coloration syntaxique C

`src/components/learning/CodeBlock.jsx` applique une coloration syntaxique par regex inline (pas de lib externe) :

| Pattern | Couleur Tailwind |
|---|---|
| Mots-clés C (`for`, `if`, `int`, `printf`…) | `text-blue-400` |
| Strings (`"..."` / `'...'`) | `text-amber-300` |
| Nombres (`\d+`) | `text-emerald-400` |
| Commentaires (`// ...`) | `text-white/35 italic` |

> **Piège important :** La regex nombres utilise un lookbehind négatif `(?<!-)` pour éviter de matcher les chiffres dans les classes CSS Tailwind injectées via `dangerouslySetInnerHTML` (ex: `text-blue-400` → sans le lookbehind, "400" serait enveloppé dans un `<span>` et "font-medium" s'afficherait en texte brut).

Types de blocs disponibles : `neutral` (bleu), `good` (emerald), `bad` (rouge), `trace` (amber), `bonus` (violet).

---

## Chatbot Bella — `useChatBot.js`

Bella est un chatbot à base de règles (pas d'IA générative) :
- Base de connaissances : `src/data/lessons/chatbot-arrays.js` — tableau `CHATBOT_KB`
- Chaque entrée : `{ keywords: [...], response: { ... } }`
- Algorithme de matching par score : correspondance de phrase exacte (×3) ou mot individuel (×1)
- Seuil : score ≥ 1 pour répondre, sinon `DEFAULT_RESPONSE` générique
- Simulation d'un délai de frappe (700–1100 ms) pour un rendu naturel

---

## LearningPage — Vue d'ensemble de la UI

La page `/learn` est la page centrale de l'application :

| Zone | Description |
|---|---|
| Barre de progression latérale | Liste des étapes, badges "Pratiqué", verrous visuels |
| Zone principale `StepContent` | Intro (adaptive), illustration SVG, blocs de code, keyPoint |
| `AdaptationBanner` | Bandeau violet — affiché après la première erreur, dismissable |
| Bottom sheet (overlay fixe) | `PracticeEditor` — s'ouvre via le bouton "Pratiquer" |
| Panneau chat (slide-in droit) | `ChatPanel` avec Bella + questions rapides |

**State principal de LearningPage :**
```js
currentStep      // index de l'étape active
practicedSteps   // Set<string> des étapes avec exercice réussi
chatOpen         // boolean — panneau Bella ouvert ou non
practiceOpen     // boolean — bottom sheet éditeur ouvert ou non
adaptation       // { errorId, adaptedContent, errorTitle } | null
showAdaptBanner  // boolean
```

---

## Décisions d'architecture importantes

1. **Pas de backend** — Choix délibéré pour la phase prototype. Aucune persistance entre sessions.
2. **Profils pré-définis** — Les 4 profils sont fixes. Il n'y a pas de quiz Felder-Silverman complet intégré dans l'app ; le profil est choisi manuellement par l'élève.
3. **Contenu adapté pré-écrit** — L'adaptation n'est pas générée par IA. Les textes sont rédigés par un pédagogue directement dans les fichiers de leçon.
4. **Adaptation unique** — Seule la première erreur adapte la leçon. Les erreurs suivantes déclenchent le DiagnosticPanel mais ne modifient plus le contenu.
5. **Leçon actuelle : tableaux C** — C'est la seule leçon implémentée. L'architecture `getLessonByProfile` supporte l'ajout de nouvelles leçons par profil.

---

## Ajouter une nouvelle leçon

1. Créer `src/data/lessons/[sujet]-[profil].js` avec la structure décrite ci-dessus
2. L'importer dans `src/data/lessons/index.js`
3. L'ajouter dans `LESSONS_BY_PROFILE` avec la clé `profile.id` correspondante

## Ajouter un contenu adaptatif à une erreur existante

Dans le fichier de leçon, sur l'objet `errorPattern` ciblé, ajouter `adaptedSteps` :

```js
{
  id: 'eq1-mon-erreur',
  errorProfile: 'nom-du-type-erreur',
  title: 'Description courte',
  detect: (code) => /* regex ou logique */ false,
  message: `Message affiché dans le DiagnosticPanel`,
  adaptedSteps: {
    'id-etape-1': {
      reminder: { text: `Rappel visible en amber sur cette étape` },
      intro: `Texte d'intro adapté à cette erreur...`,
      keyPoint: `Point clé reformulé...`,
      extraCodeBlocks: [
        // Optionnel — CodeBlock ou AnimationBlock avant/après les blocs originaux
        { position: 'before', id: '...', label: '...', type: 'bad', code: `...`, comment: '...' }
      ],
    },
    'id-etape-2': {
      reminder: { text: `...` },
      intro: `...`,
      keyPoint: `...`,
    },
  }
}
```

`adaptedSteps` sera automatiquement appliqué dans `StepContent` si cette erreur est la première commise.

## Ajouter une animation interactive

1. Créer le composant React dans `src/components/learning/animations/`
2. L'importer dans le fichier de leçon
3. L'utiliser dans `extraCodeBlocks` avec `type: 'animation'` et `component: MonComposant`

```js
import { MonAnimation } from '../../components/learning/animations/MesAnimations.jsx'

// Dans extraCodeBlocks d'un adaptedStep :
{ position: 'before', id: 'mon-anim', label: '...', type: 'animation', component: MonAnimation }
```
