# 🤖 Système de Notation Automatique MongoDB TP

Ce dossier contient un système de notation automatique hybride pour le TP MongoDB.

## 📋 Architecture

```
.github/
├── workflows/
│   └── grade-assignment.yml    # GitHub Actions workflow
└── scripts/
    ├── package.json             # Dependencies
    ├── grade.js                 # Main grading script
    ├── analyze-structure.js     # Structure analysis (10 pts)
    ├── analyze-static.js        # Static code analysis (40 pts)
    ├── run-tests.js             # Automated tests (50 pts)
    ├── test-data.js             # Test data for MongoDB
    └── README.md                # This file
```

## 🎯 Barème de Notation (100 points)

### 1. Structure (10 points)

**Vérifie la forme du fichier :**
- Informations personnelles remplies (2 pts)
- Nom de base de données personnalisé (2 pts)
- Exercices avec du contenu (6 pts)

### 2. Analyse Statique (40 points)

**Analyse le code sans l'exécuter :**
- Complétude : 20 points
  - 1 point par exercice complété (minimum 49 exercices)
  - Détecte les exercices vides ou avec seulement des commentaires

- Exactitude : 20 points
  - Présence des méthodes MongoDB attendues (`find`, `updateOne`, etc.)
  - Présence des mots-clés importants (`$gt`, `$set`, etc.)
  - Vérification de la logique générale

### 3. Tests Automatiques (50 points)

**Exécute réellement 15 exercices clés sur MongoDB :**

| Exercice | Points | Type |
|----------|--------|------|
| Ex 1 | 3 | find avec égalité |
| Ex 3 | 3 | find avec $gt |
| Ex 6 | 4 | find avec $in |
| Ex 7 | 4 | find avec conditions multiples |
| Ex 11 | 3 | updateOne avec $set |
| Ex 12 | 3 | updateOne avec $inc |
| Ex 15 | 4 | updateMany avec $mul |
| Ex 19 | 3 | deleteOne |
| Ex 24 | 3 | find sur document imbriqué |
| Ex 27 | 4 | find avec $elemMatch |
| Ex 35 | 5 | update tableau imbriqué |
| Ex 36 | 5 | $push vers tableau |
| Ex 44 | 4 | aggregate $group |
| Ex 46 | 4 | aggregate avec $match/$unwind |
| Ex 48 | 4 | aggregate avec $count |

## 🚀 Utilisation

### En local (test manuel)

```bash
cd .github/scripts
npm install
node grade.js ../../playground-tp1.mongodb.js
```

### Sur GitHub (automatique)

Le workflow se déclenche automatiquement :
- À chaque push sur `main`/`master`
- À chaque Pull Request
- Manuellement via l'onglet Actions

## 📊 Rapport de Notation

Le système génère un fichier `grade-report.json` avec :

```json
{
  "timestamp": "2024-11-25T10:30:00.000Z",
  "file": "playground-tp1.mongodb.js",
  "structure": {
    "score": 8,
    "maxScore": 10,
    "details": [...]
  },
  "static": {
    "score": 35,
    "maxScore": 40,
    "completedExercises": 47,
    "correctKeywords": 85,
    "details": [...]
  },
  "tests": {
    "score": 42,
    "maxScore": 50,
    "results": [...]
  },
  "totalScore": 85,
  "feedback": [
    "🎉 Excellent travail ! Vous maîtrisez bien MongoDB."
  ]
}
```

## 🔧 Configuration

### Ajouter un nouveau test

Éditez `run-tests.js` :

```javascript
const KEY_EXERCISES = [
    // ...
    { number: 50, points: 5 }  // Ajouter ici
];

const TESTS = {
    // ...
    50: async (db) => {
        // Votre test ici
        const result = await db.collection('test').find({...}).toArray();
        return {
            expected: 5,
            actual: result.length,
            passed: result.length === 5
        };
    }
};
```

### Modifier les patterns attendus

Éditez `analyze-static.js` :

```javascript
const EXPECTED_PATTERNS = {
    50: {
        keywords: ['aggregate', '$lookup', '$unwind'],
        methods: ['aggregate']
    }
};
```

## ⚠️ Limites et Considérations

### Limites actuelles
1. **Tests limités** : Seulement 15 exercices testés (vs 49 total)
2. **Pas de vérification de style** : N'évalue pas la qualité du code
3. **Tests basiques** : Vérifie surtout le résultat final, pas la méthode

### Recommandations
- ✅ Utiliser comme **note indicative**
- ✅ **Réviser manuellement** les cas limites
- ✅ Donner du **feedback personnalisé** aux étudiants
- ❌ Ne pas se baser **uniquement** sur cette note

## 🛠️ Maintenance

### Mettre à jour les dépendances

```bash
cd .github/scripts
npm update
```

### Déboguer un test qui échoue

```bash
# Activer le mode debug
DEBUG=true node grade.js ../../playground-tp1.mongodb.js
```

### Tester avec différentes données

Éditez `test-data.js` pour ajuster les données de test.

## 📝 Notes pour l'enseignant

### Points forts du système
- ✅ **Gain de temps** : notation automatique en 1-2 minutes
- ✅ **Cohérence** : mêmes critères pour tous les étudiants
- ✅ **Feedback immédiat** : les étudiants voient leur note avant la deadline
- ✅ **Transparence** : code open-source, critères clairs

### Points à surveiller
- ⚠️ **Faux positifs** : un étudiant peut contourner les tests
- ⚠️ **Faux négatifs** : une bonne réponse peut être rejetée si syntaxe différente
- ⚠️ **Créativité** : le système favorise les solutions "standards"

### Bonnes pratiques
1. **Communiquer** : expliquez aux étudiants comment fonctionne la notation
2. **Être flexible** : accordez des points manuellement si justifié
3. **Itérer** : améliorez les tests en fonction des retours
4. **Superviser** : vérifiez les notes extrêmes (< 30 ou > 95)

## 🤝 Contribution

Pour améliorer le système :
1. Testez avec des fichiers étudiants réels
2. Identifiez les patterns manquants
3. Ajoutez des tests pour les cas complexes
4. Documentez les changements

## 📄 Licence

Ce système est conçu pour un usage éducatif à l'IUT d'Aix-Marseille.
