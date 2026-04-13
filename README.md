# Bella Bot - Prototype Chatbot Éducatif

## Contexte du projet
Ce projet est un prototype de **Chatbot Éducatif** basé sur le modèle des styles d'apprentissage de **Felder-Silverman**. Il permet d'interroger un élève et de lui recommander une méthode d'apprentissage personnalisée.

## Architecture & Méthodes de Travail (Phase 1)
Pour le moment (Prototype), nous travaillons avec l'architecture suivante :
- **Frontend** : React JS (initialisé avec Vite) pour avoir un résultat rapide, léger et interactif.
- **Logique Métier** : Temporairement implémentée en **JavaScript côté client**. Les algorithmes de calcul du profil (Actif/Réflexif, Sensitif/Intuitif, Visuel/Verbal, Séquentiel/Global) se trouvent dans le code React.

## Évolution future (Phase 2)
Dans un futur proche, la logique métier et l'intelligence globale du chatbot seront basculées sur un **Backend Python**. 
Le workflow de travail sera le suivant : 
1. Le Frontend React enverra les réponses de l'élève à une API Python.
2. Le moteur Python exécutera le profilage (et potentiellement des appels à l'Intelligence Artificielle).
3. Python retournera la recommandation à React, qui l'affichera à l'utilisateur.

## Installation
Assurez-vous d'avoir Node.js installé, puis installez les dépendances :
```bash
npm install
```

## Lancement
Pour démarrer l'application en mode développement :
```bash
npm run dev
```
