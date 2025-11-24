# <img src="https://raw.githubusercontent.com/IUTInfoAix-R510/Syllabus/main/assets/logo.png" alt="class logo" class="logo"/> R5.Real.10 - Nouveaux paradigmes de base de données

### IUT d’Aix-Marseille – Département Informatique Aix-en-Provence

* **Ressource:** [R5.Real.10](https://cache.media.enseignementsup-recherche.gouv.fr/file/SPE4-MESRI-17-6-2021/35/5/Annexe_17_INFO_BUT_annee_1_1411355.pdf)
* **Responsables:**
  * [Sébastien Nedjar](mailto:sebastien.nedjar@univ-amu.fr)
* **Besoin d'aide ?**
  * Consulter et/ou créer des [issues](https://github.com/IUTInfoAix-R510/Cours/issues).
  * [Email](mailto:sebastien.nedjar@univ-amu.fr) pour une question d'ordre privée, ou pour convenir d'un rendez-vous physique.

## Travaux pratiques R5.Real.10 - Introduction au NoSQL et découverte de MongoDB (4h)

## 🎯 Objectifs de la séance

### Objectifs pédagogiques
À l'issue de cette séance, vous serez capable de :
- **Comprendre** pourquoi et quand utiliser MongoDB plutôt qu'une base relationnelle
- **Installer** et configurer un environnement MongoDB Atlas professionnel
- **Manipuler** des documents JSON : insertion, lecture, modification, suppression
- **Modéliser** des données en mode document (embedding vs références)
- **Réaliser** un cas pratique complet de gestion de médiathèque

### Lien avec le projet SteamCity
Cette séance pose les fondations pour votre projet fil rouge **SteamCity.io**, une plateforme IoT de monitoring urbain. Les concepts d'aujourd'hui (documents flexibles, tableaux embarqués, timestamps) seront essentiels pour stocker les données de capteurs que vous manipulerez dans les prochaines séances.

### Prérequis
- Maîtrise du SQL (SELECT, JOIN, normalisation)
- Bases de JavaScript ou Python
- Compte email universitaire valide

---

## ⏰ Planning de la séance

| Horaire | Durée | Activité |
|---------|-------|----------|
| 0h00-0h30 | 30 min | Cours : Du relationnel au NoSQL |
| 0h30-1h15 | 45 min | Installation et configuration Atlas |
| 1h15-1h25 | 10 min | **Pause** |
| 1h25-2h20 | 55 min | Découverte pratique MongoDB |
| 2h20-3h20 | 60 min | CRUD complet guidé |
| 3h20-3h30 | 10 min | **Pause** |
| 3h30-4h00 | 30 min | Mini-projet et validation |

---

## 📚 Phase 1 : Cours théorique - Du relationnel au NoSQL (30 min)

### 1.1 Les limites du modèle relationnel

#### 💡 Parallèle SQL → MongoDB : Vocabulaire
Pour vous repérer, voici la correspondance avec vos connaissances SQL :

| SQL | MongoDB | Exemple |
|-----|---------|---------|
| Base de données | Database | `USE mediatheque` → `use mediatheque` |
| Table | Collection | `CREATE TABLE livres` → `db.createCollection("livres")` |
| Ligne/Enregistrement | Document | `INSERT INTO...` → `db.livres.insertOne({...})` |
| Colonne | Champ (Field) | `SELECT titre` → `{titre: 1}` |
| PRIMARY KEY | _id | Automatique et unique |
| JOIN | Embedding ou $lookup | Données imbriquées ou agrégation |
| INDEX | Index | Même concept, syntaxe différente |
| WHERE | find({critères}) | `WHERE age > 25` → `{age: {$gt: 25}}` |

**Différence majeure :** En SQL, le schéma est défini **avant** l'insertion des données. En MongoDB, le schéma est **flexible** et peut évoluer document par document.

#### Rappel des forces du relationnel
- **ACID** : Atomicité, Cohérence, Isolation, Durabilité
- **Normalisation** : Élimination de la redondance
- **SQL** : Langage standardisé et puissant
- **Intégrité référentielle** : Contraintes garanties

#### Les nouveaux défis
Exemples concrets à présenter :

1. Volume (Big Data)
   - X/Twitter : 500 millions de tweets/jour
   - Facebook : 4 PB de nouvelles données/jour
   → Problème : Tables de milliards de lignes

2. Vélocité (Temps réel)
   - Trading haute fréquence : microseconde de latence
   - Gaming online : 60 updates/seconde
   → Problème : Locks et transactions lourdes

3. Variété (Données non structurées)
   - Logs serveurs : format variable
   - Posts réseaux sociaux : texte, images, vidéos
   → Problème : Schéma rigide des tables

4. Distribution (Scalabilité)
   - Netflix : présent dans 190 pays
   - Uber : millions de requêtes concurrentes
   → Problème : JOIN impossible entre serveurs

#### Démonstration : Modéliser un tweet en relationnel
Combien de tables pour un simple tweet ?

```sql
CREATE TABLE users (...);
CREATE TABLE tweets (...);
CREATE TABLE hashtags (...);
CREATE TABLE tweet_hashtags (...);
CREATE TABLE mentions (...);
CREATE TABLE retweets (...);
CREATE TABLE likes (...);
CREATE TABLE media (...);
```

Une simple consultation implique jusqu'à 8 JOINs sur des tables gigantesques !

### 1.2 Le théorème CAP et ses implications 

#### Présentation du théorème
```
            Consistency
                /\
               /  \
              /    \
             /      \
            /________\
Availability          Partition Tolerance
```
[Théorème CAP (Brewer, 2000)](https://fr.wikipedia.org/wiki/Th%C3%A9or%C3%A8me_CAP) : Un système distribué ne peut garantir au plus que 2 propriétés sur 3.

#### Positionnement des solutions
- **CA** : Bases relationnelles classiques (pas distribuées)
- **CP** : MongoDB, HBase (cohérence > disponibilité)
- **AP** : Cassandra, DynamoDB (disponibilité > cohérence)

### 1.3 L'écosystème NoSQL

#### Les 4 grandes familles

**1. Clé-Valeur (Redis, Memcached)**
```javascript
SET user:1001 "{'name': 'Alice', 'age': 25}"
GET user:1001
```
- ✅ Ultra-rapide, simple
- ❌ Pas de requêtes complexes

**2. Document (MongoDB, CouchDB)**
```javascript
{
  "_id": 1001,
  "name": "Alice",
  "orders": [
    {"product": "Laptop", "price": 1200}
  ]
}
```
- ✅ Flexible, requêtes riches
- ❌ Pas de transactions complexes (avant v4.0)

**3. Colonnes (Cassandra, HBase)**
```
RowKey: user1001
  => name: "Alice"
  => email: "alice@example.com"
  => login:2024-01-15: true
```
- ✅ Excellent pour les time-series
- ❌ Modèle complexe à appréhender

**4. Graphe (Neo4j, ArangoDB)**
```cypher
(Alice)-[:FRIENDS_WITH]->(Bob)
(Alice)-[:WORKS_AT]->(Company)
```
- ✅ Relations complexes
- ❌ Cas d'usage spécifiques

### 1.4 Focus MongoDB

#### Historique et adoption
- **2007** : Création par 10gen
- **2009** : Open Source
- **2013** : MongoDB Inc.
- **Aujourd'hui** : #1 des bases NoSQL, utilisé par EA, eBay, Forbes, Toyota...

#### Caractéristiques principales
```javascript
// Document = Objet JSON enrichi (BSON)
{
  "_id": ObjectId("..."),           // Identifiant unique
  "string": "text",                  // Types basiques
  "number": 42,
  "boolean": true,
  "array": [1, 2, 3],               // Tableaux
  "nested": {                        // Objets imbriqués
    "field": "value"
  },
  "date": ISODate("2024-01-15"),    // Types riches
  "binary": BinData(...),
  "null": null
}
```

#### Architecture
```
Application
    ↓
MongoDB Driver (Node.js, Python, Java...)
    ↓
mongos (Router)
    ↓
Replica Set (Primary + Secondaries)
    ↓
Sharded Cluster (Horizontal scaling)
```

---

## 💻 Phase 2 : Installation et configuration

### 2.1 Création du compte MongoDB Atlas

#### Étapes détaillées
1. Navigateur → https://www.mongodb.com/atlas/database
2. "Try Free" → Sign Up
3. Formulaire :
   - Email : utiliser email universitaire
   - Password : min 8 caractères
   - Prénom, Nom
   - Company : "Aix-Marseille Université"
   - Accepter les conditions
4. Vérifier email et confirmer
5. Questionnaire rapide :
   - Goal : "Learn MongoDB"
   - Experience : "Student"
   - Language : "JavaScript"

### 2.2 Déploiement du cluster gratuit

#### Configuration du cluster
1. "Build a Database" → "FREE Shared"
2. Configuration :
   Provider : AWS (recommandé)
   Region : Paris (eu-west-3) - IMPORTANT pour la latence
   Cluster Tier : M0 Sandbox (FREE)
   Cluster Name : BUT3-[VotreNom]
   
3. Security Quickstart :
   Username : etudiant
   Password : [Générer] → NOTER LE MOT DE PASSE !
   
4. Network Access :
   "Add My Current IP Address"
   Puis "Add IP Address" → 0.0.0.0/0 (pour accès universel)
   
5. "Finish and Close"

#### ⚠️ Problèmes fréquents lors du déploiement

**Problème 1 : "Region not available"**
- **Cause :** La région Paris peut être saturée
- **Solution :** Choisir Frankfurt (eu-central-1) ou Ireland (eu-west-1)

**Problème 2 : "Password doesn't meet requirements"**
- **Cause :** Le mot de passe doit contenir au moins 8 caractères avec majuscules, minuscules et chiffres
- **Solution :** Utiliser le générateur automatique et BIEN NOTER le mot de passe dans un fichier texte

**Problème 3 : "IP Address not whitelisted"**
- **Cause :** Votre IP n'est pas autorisée à se connecter
- **Solution :** Dans "Network Access", vérifier que 0.0.0.0/0 est bien ajouté (autorisation universelle)
- **Note :** En production, on ne mettrait JAMAIS 0.0.0.0/0, mais pour l'apprentissage c'est acceptable

**Problème 4 : Le cluster met plus de 5 minutes à démarrer**
- **Cause :** Serveurs Atlas surchargés
- **Solution :** Patienter jusqu'à 10 minutes. Si toujours bloqué, supprimer et recréer le cluster

### 2.3 Installation des outils

#### MongoDB Compass (GUI)
1. Télécharger depuis : https://www.mongodb.com/products/compass
2. Installer (version stable, pas beta)
3. Lancer Compass
4. Dans Atlas : "Connect" → "Connect with MongoDB Compass"
5. Copier la connection string
6. Dans Compass : coller et remplacer <password>
7. "Connect" → Vous devez voir 3 bases système

#### Shell MongoDB (CLI)

```bash
# Windows (PowerShell en admin)
winget install MongoDB.Shell

# macOS
brew install mongosh

# Linux
sudo apt-get install mongodb-mongosh

# Vérification
mongosh --version
```

#### Extension VS Code
```
1. Ouvrir VS Code
2. Extensions → Rechercher "MongoDB"
3. Installer "MongoDB for VS Code" (officiel)
4. View → Command Palette → "MongoDB: Connect"
5. Coller la connection string
```

#### ⚠️ Problèmes fréquents de connexion

**Problème 5 : "Authentication failed" dans Compass**
- **Cause :** Mot de passe incorrect ou caractères spéciaux non échappés
- **Solution :**
  - Vérifier que vous avez bien remplacé `<password>` par votre mot de passe réel
  - Si le mot de passe contient des caractères spéciaux (@, %, &, etc.), les encoder en URL
  - Exemple : `p@ssw0rd` devient `p%40ssw0rd`

**Problème 6 : "Connection timeout" ou "Network error"**
- **Cause :** IP non autorisée ou firewall de l'IUT
- **Solution :**
  - Vérifier dans Atlas → Network Access que 0.0.0.0/0 est bien présent
  - Si à l'IUT : demander à l'enseignant de vérifier le firewall
  - En dernier recours : utiliser un partage de connexion 4G temporaire

**Problème 7 : mongosh n'est pas reconnu (Windows)**
- **Cause :** Le PATH Windows n'est pas à jour
- **Solution :**
  - Fermer et rouvrir le terminal
  - Ou utiliser le shell intégré dans Compass (en bas de l'interface)

**Problème 8 : "No databases visible" après connexion**
- **Cause :** C'est NORMAL ! MongoDB est vide au départ
- **Solution :** Passer à la Phase 3 pour créer votre première base

### ✅ Point de validation #1

**Checklist :**
- [ ] Cluster Atlas visible et "Running"
- [ ] Connexion réussie via Compass
- [ ] Au moins les bases de données `admin`, `config` et `local` visibles
- [ ] `mongosh` fonctionne
- [ ] VS Code connecté

---

## 🔨 Phase 3 : Premières manipulations MongoDB

### 3.1 Concepts fondamentaux

#### Hiérarchie des objets
```javascript
// Dans Compass, créer via l'interface graphique :

MongoDB Instance (Cluster)
    ↓
Database: "premiere_base"         // = Schema en SQL
    ↓
Collection: "personnes"           // = Table en SQL
    ↓
Document: {                       // = Row en SQL
    "_id": ObjectId("..."),       // = Primary Key
    "nom": "Martin",              // = Column
    "age": 25                     // = Column
}
```

#### Création dans Compass
```
1. Cliquer sur "CREATE DATABASE"
2. Database Name : premiere_base
3. Collection Name : personnes
4. "Create Database"
```

#### Passage au shell intégré
```javascript
// Où sommes-nous ?
db

// Changer de base
use premiere_base

// Lister les collections
show collections

// Stats de la base
db.stats()
```

### 3.2 Insertion progressive de documents

```javascript
// 1. Document minimal
db.personnes.insertOne({
    nom: "Alice"
})

// Observer le résultat
db.personnes.find()

// 2. Document plus riche
db.personnes.insertOne({
    nom: "Bob",
    age: 22,
    email: "bob@example.com"
})

// 3. Document avec structure complexe
db.personnes.insertOne({
    nom: "Charlie",
    age: 25,
    contact: {
        email: "charlie@example.com",
        telephone: "0612345678"
    },
    competences: ["JavaScript", "MongoDB", "React"],
    actif: true
})

// Observer la flexibilité du schéma
db.personnes.find()
// Note : .pretty() n'est plus nécessaire dans mongosh v1+, l'affichage est automatiquement formaté

// 4. Types de données utiles
db.personnes.insertOne({
    nom: "Diana",
    age: 24,
    date_naissance: new Date("1999-05-15"),          // Date
    salaire: 2500.50,                                 // Number
    en_formation: true,                               // Boolean
    competences: ["Python", "SQL"],                   // Array
    adresse: {                                        // Objet imbriqué
        ville: "Aix-en-Provence",
        code_postal: "13100"
    },
    mentor_id: null                                   // Null (pas encore assigné)
})

// 💡 Comprendre ObjectId (l'identifiant unique)
let doc = db.personnes.findOne({nom: "Alice"})
print("Document complet :")
printjson(doc)

print("\nL'ObjectId :")
print(doc._id)                           // ObjectId("...")

print("\nDate de création extraite de l'ObjectId :")
print(doc._id.getTimestamp())           // Date de création automatique !

// ⚠️ Point important : l'_id est AUTOMATIQUEMENT généré si vous ne le fournissez pas
```

**📝 Exercice rapide de validation :**
Avant de continuer, testez votre compréhension en insérant un nouveau document avec :
- Votre prénom
- Votre âge
- Un tableau de 3 compétences informatiques
- Un objet "contact" avec email et téléphone

<details>
<summary>💡 Solution</summary>

```javascript
db.personnes.insertOne({
    nom: "VotreNom",
    age: 21,
    competences: ["Java", "JavaScript", "PostgreSQL"],
    contact: {
        email: "votre.nom@etu.univ-amu.fr",
        telephone: "0612345678"
    }
})
```
</details>

### 3.3 Requêtes basiques

```javascript
// Base de travail plus riche
db.employes.drop()  // Nettoyer si existe

db.employes.insertMany([
    {nom: "Martin", prenom: "Alice", age: 28, service: "IT", salaire: 3500},
    {nom: "Dubois", prenom: "Bob", age: 35, service: "RH", salaire: 3200},
    {nom: "Durand", prenom: "Charlie", age: 42, service: "IT", salaire: 4500, manager: true},
    {nom: "Petit", prenom: "Diana", age: 26, service: "Marketing", salaire: 2800},
    {nom: "Robert", prenom: "Eve", age: 31, service: "IT", salaire: 3800, competences: ["Python", "MongoDB"]},
    {nom: "Richard", prenom: "Frank", age: 29, service: "RH", salaire: 3000},
    {nom: "Dubois", prenom: "Grace", age: 45, service: "Direction", salaire: 6500, manager: true},
    {nom: "Martin", prenom: "Henri", age: 24, service: "Marketing", salaire: 2600, stage: true},
    {nom: "Bernard", prenom: "Iris", age: 33, service: "IT", salaire: 4000, competences: ["Java", "Spring", "MongoDB"]},
    {nom: "Thomas", prenom: "Jack", age: 27, service: "Marketing", salaire: 2900}
])

// 1. Requête simple
db.employes.find({service: "IT"})

// 2. Requête avec plusieurs critères (AND implicite)
db.employes.find({
    service: "IT",
    age: {$gte: 30}
})

// 3. Projection (sélection de champs)
db.employes.find(
    {service: "IT"},
    {nom: 1, prenom: 1, salaire: 1, _id: 0}
)

// 4. Tri et limite
db.employes.find()
    .sort({salaire: -1})    // Décroissant
    .limit(3)               // Top 3

// 5. Compter
db.employes.countDocuments({service: "IT"})

// 6. Distinct
db.employes.distinct("service")

// 7. Requête sur champ optionnel
db.employes.find({manager: {$exists: true}})

// 8. Requête sur tableau
db.employes.find({competences: "MongoDB"})
```

### 3.4 Modifications de documents (15 min)

```javascript
// 1. Mise à jour simple
db.employes.updateOne(
    {nom: "Martin", prenom: "Alice"},
    {$set: {email: "alice.martin@company.com"}}
)

// Vérifier
db.employes.findOne({nom: "Martin", prenom: "Alice"})

// 2. Incrémenter une valeur
db.employes.updateOne(
    {nom: "Petit"},
    {$inc: {salaire: 200}}  // Augmentation
)

// 3. Ajouter dans un tableau
db.employes.updateOne(
    {nom: "Robert"},
    {$push: {competences: "Docker"}}
)

// 4. Retirer d'un tableau
db.employes.updateOne(
    {nom: "Robert"},
    {$pull: {competences: "Python"}}
)

// 5. Mise à jour multiple
db.employes.updateMany(
    {service: "IT"},
    {$set: {budget_formation: 1000}}
)

// 6. Upsert (update ou insert)
db.employes.updateOne(
    {nom: "Nouveau", prenom: "Kevin"},
    {$set: {
        age: 30,
        service: "IT",
        salaire: 3300
    }},
    {upsert: true}  // Créé si n'existe pas
)

// 7. Replace (remplacement complet)
db.employes.replaceOne(
    {nom: "Thomas"},
    {
        nom: "Thomas",
        prenom: "Jack",
        nouveau_poste: "Chef de projet",
        salaire: 3500
    }
)

// 8. Suppression de champ
db.employes.updateMany(
    {},
    {$unset: {stage: ""}}
)
```

---

## 🎯 Phase 4 : CRUD complet sur cas concret

### 4.1 Contexte : Gestion d'une médiathèque

```javascript
// Mission : Créer un système de gestion de médiathèque
// Entités : Livres, Membres, Emprunts

use mediatheque_but3
db.dropDatabase()  // Repartir de zéro
use mediatheque_but3
```

### 4.2 Modélisation et création (20 min)

```javascript
// APPROCHE 1 : Trop relationnelle (à éviter)
// ❌ Créer 3 collections séparées comme en SQL

// APPROCHE 2 : Orientée document (recommandée)
// ✅ Embarquer les données liées

// Collection livres
db.livres.insertMany([
    {
        isbn: "978-2-07-036822-8",
        titre: "Le Petit Prince",
        auteur: {
            nom: "Saint-Exupéry",
            prenom: "Antoine de",
            nationalite: "Française"
        },
        publication: {
            editeur: "Gallimard",
            annee: 1943,
            langue: "Français"
        },
        exemplaires: [
            {
                code: "LPP-001",
                etat: "Bon",
                disponible: true,
                emplacement: "Rayon A3"
            },
            {
                code: "LPP-002",
                etat: "Usé",
                disponible: false,
                emprunt_actuel: {
                    membre_id: "M001",
                    date_emprunt: new Date("2024-01-10"),
                    date_retour_prevue: new Date("2024-01-24")
                },
                emplacement: "Emprunté"
            },
            {
                code: "LPP-003",
                etat: "Neuf",
                disponible: true,
                emplacement: "Rayon A3"
            }
        ],
        categories: ["Fiction", "Jeunesse", "Philosophique"],
        mots_cles: ["aviateur", "desert", "rose", "planète"],
        note_moyenne: 4.8,
        nombre_emprunts_total: 127
    },
    {
        isbn: "978-2-253-00334-0",
        titre: "1984",
        auteur: {
            nom: "Orwell",
            prenom: "George",
            nationalite: "Britannique"
        },
        publication: {
            editeur: "Livre de Poche",
            annee: 1949,
            langue: "Français"
        },
        exemplaires: [
            {
                code: "1984-001",
                etat: "Bon",
                disponible: true,
                emplacement: "Rayon B5"
            },
            {
                code: "1984-002",
                etat: "Bon",
                disponible: true,
                emplacement: "Rayon B5"
            }
        ],
        categories: ["Science-Fiction", "Dystopie", "Politique"],
        mots_cles: ["totalitarisme", "surveillance", "Big Brother"],
        note_moyenne: 4.6,
        nombre_emprunts_total: 89
    },
    {
        isbn: "978-2-07-041999-0",
        titre: "Harry Potter à l'école des sorciers",
        auteur: {
            nom: "Rowling",
            prenom: "J.K.",
            nationalite: "Britannique"
        },
        publication: {
            editeur: "Gallimard Jeunesse",
            annee: 1997,
            langue: "Français"
        },
        exemplaires: [
            {
                code: "HP1-001",
                etat: "Usé",
                disponible: false,
                emprunt_actuel: {
                    membre_id: "M002",
                    date_emprunt: new Date("2024-01-12"),
                    date_retour_prevue: new Date("2024-01-26")
                }
            },
            {
                code: "HP1-002",
                etat: "Bon",
                disponible: false,
                emprunt_actuel: {
                    membre_id: "M003",
                    date_emprunt: new Date("2024-01-08"),
                    date_retour_prevue: new Date("2024-01-22")
                }
            },
            {
                code: "HP1-003",
                etat: "Neuf",
                disponible: true,
                emplacement: "Rayon C1"
            },
            {
                code: "HP1-004",
                etat: "Bon",
                disponible: true,
                emplacement: "Rayon C1"
            }
        ],
        serie: {
            nom: "Harry Potter",
            numero: 1,
            total: 7
        },
        categories: ["Fantasy", "Jeunesse", "Magie"],
        mots_cles: ["sorcier", "Poudlard", "magie", "école"],
        note_moyenne: 4.9,
        nombre_emprunts_total: 234
    }
])

// Collection membres
db.membres.insertMany([
    {
        _id: "M001",
        nom: "Dupont",
        prenom: "Marie",
        date_naissance: new Date("1995-03-15"),
        inscription: {
            date: new Date("2023-09-01"),
            type: "Etudiant",
            valide_jusqu: new Date("2024-08-31")
        },
        contact: {
            email: "marie.dupont@etu.univ-amu.fr",
            telephone: "0612345678",
            adresse: "10 rue de la République, 13100 Aix"
        },
        emprunts_en_cours: [
            {
                livre_isbn: "978-2-07-036822-8",
                exemplaire_code: "LPP-002",
                date_emprunt: new Date("2024-01-10"),
                date_retour_prevue: new Date("2024-01-24")
            }
        ],
        historique_emprunts: 23,
        penalites: 0,
        preferences: ["Fiction", "Science-Fiction"]
    },
    {
        _id: "M002",
        nom: "Martin",
        prenom: "Lucas",
        date_naissance: new Date("2001-07-22"),
        inscription: {
            date: new Date("2023-10-15"),
            type: "Etudiant",
            valide_jusqu: new Date("2024-08-31")
        },
        contact: {
            email: "lucas.martin@etu.univ-amu.fr",
            telephone: "0623456789"
        },
        emprunts_en_cours: [
            {
                livre_isbn: "978-2-07-041999-0",
                exemplaire_code: "HP1-001",
                date_emprunt: new Date("2024-01-12"),
                date_retour_prevue: new Date("2024-01-26")
            }
        ],
        historique_emprunts: 45,
        penalites: 0,
        preferences: ["Fantasy", "Jeunesse"]
    }
])
```

### 4.3 Requêtes métier essentielles

```javascript
// 1. Livres disponibles
db.livres.find(
    {"exemplaires.disponible": true},
    {titre: 1, "exemplaires.$": 1}
)

// 2. Livres d'une catégorie
db.livres.find(
    {categories: "Science-Fiction"},
    {titre: 1, auteur: 1, note_moyenne: 1}
).sort({note_moyenne: -1})

// 3. Recherche textuelle (sur mots-clés)
db.livres.createIndex({mots_cles: 1})
db.livres.find({mots_cles: {$in: ["magie", "sorcier"]}})

// 4. Exemplaires empruntés avec retard
let aujourd_hui = new Date()
db.livres.find({
    "exemplaires.emprunt_actuel.date_retour_prevue": {$lt: aujourd_hui}
})

// 5. Top 5 des livres les plus empruntés
db.livres.find(
    {},
    {titre: 1, nombre_emprunts_total: 1}  // Projection : sélection des champs
)
    .sort({nombre_emprunts_total: -1})
    .limit(5)

// 6. Membres avec emprunts en cours
db.membres.find({
    "emprunts_en_cours": {$exists: true, $ne: []}
})

// 7. Statistiques par catégorie (agrégation simple)
db.livres.aggregate([
    {$unwind: "$categories"},
    {$group: {
        _id: "$categories",
        nombre_livres: {$sum: 1},
        note_moyenne: {$avg: "$note_moyenne"}
    }},
    {$sort: {nombre_livres: -1}}
])

// 8. Disponibilité par titre
db.livres.aggregate([
    {$project: {
        titre: 1,
        total_exemplaires: {$size: "$exemplaires"},
        disponibles: {
            $size: {
                $filter: {
                    input: "$exemplaires",
                    cond: {$eq: ["$$this.disponible", true]}
                }
            }
        }
    }}
])
```

#### 💡 Points clés à retenir sur ces requêtes

**Notation pointée pour les documents imbriqués :**
```javascript
// Pour accéder à un champ dans un tableau ou objet imbriqué, utiliser la notation pointée
"exemplaires.disponible"          // Champ dans un tableau d'objets
"auteur.nom"                       // Champ dans un objet imbriqué
"contact.email"                    // Idem
```

**Opérateur $ pour les tableaux :**
```javascript
// $ dans la projection retourne SEULEMENT le premier élément qui match
{titre: 1, "exemplaires.$": 1}

// Pour obtenir tous les éléments, ne pas utiliser $
{titre: 1, exemplaires: 1}
```

**⚠️ Erreur courante : Oublier les guillemets**
```javascript
// ❌ FAUX - provoque une erreur de syntaxe
db.livres.find({exemplaires.disponible: true})

// ✅ CORRECT - guillemets obligatoires pour la notation pointée
db.livres.find({"exemplaires.disponible": true})
```

#### ✅ Point de validation #2

Avant de passer aux opérations transactionnelles, vérifiez que vous savez :
- [ ] Créer des requêtes avec notation pointée sur objets imbriqués
- [ ] Utiliser les opérateurs de comparaison ($lt, $gt, $gte, $lte)
- [ ] Faire des projections pour sélectionner les champs
- [ ] Trier et limiter les résultats
- [ ] Requêter dans des tableaux avec $in

**📝 Mini-exercice :** Écrivez une requête qui trouve tous les livres de la catégorie "Fantasy" publiés après 1990, triés par note décroissante, en affichant seulement le titre et la note.

<details>
<summary>💡 Solution</summary>

```javascript
db.livres.find(
    {
        categories: "Fantasy",
        "publication.annee": {$gt: 1990}
    },
    {
        titre: 1,
        note_moyenne: 1,
        _id: 0
    }
).sort({note_moyenne: -1})
```
</details>

### 4.4 Opérations transactionnelles

```javascript
// Fonction pour emprunter un livre
function emprunterLivre(membre_id, isbn, exemplaire_code) {
    // 1. Vérifier la disponibilité
    let livre = db.livres.findOne({
        isbn: isbn,
        "exemplaires.code": exemplaire_code,
        "exemplaires.disponible": true
    });
    
    if (!livre) {
        print("Livre non disponible");
        return false;
    }
    
    // 2. Marquer comme emprunté
    let date_emprunt = new Date();
    let date_retour = new Date();
    date_retour.setDate(date_retour.getDate() + 14); // 2 semaines
    
    db.livres.updateOne(
        {
            isbn: isbn,
            "exemplaires.code": exemplaire_code
        },
        {
            $set: {
                "exemplaires.$.disponible": false,
                "exemplaires.$.emprunt_actuel": {
                    membre_id: membre_id,
                    date_emprunt: date_emprunt,
                    date_retour_prevue: date_retour
                }
            },
            $inc: {nombre_emprunts_total: 1}
        }
    );
    
    // 3. Ajouter à l'emprunteur
    db.membres.updateOne(
        {_id: membre_id},
        {
            $push: {
                emprunts_en_cours: {
                    livre_isbn: isbn,
                    exemplaire_code: exemplaire_code,
                    date_emprunt: date_emprunt,
                    date_retour_prevue: date_retour
                }
            },
            $inc: {historique_emprunts: 1}
        }
    );
    
    print("Emprunt effectué avec succès");
    return true;
}

// Test de la fonction
emprunterLivre("M003", "978-2-07-036822-8", "LPP-001")

// Fonction pour retourner un livre
function retournerLivre(membre_id, isbn, exemplaire_code) {
    // 1. Retirer de l'emprunteur
    db.membres.updateOne(
        {_id: membre_id},
        {$pull: {
            emprunts_en_cours: {
                livre_isbn: isbn,
                exemplaire_code: exemplaire_code
            }
        }}
    );
    
    // 2. Rendre disponible
    db.livres.updateOne(
        {
            isbn: isbn,
            "exemplaires.code": exemplaire_code
        },
        {
            $set: {
                "exemplaires.$.disponible": true,
                "exemplaires.$.emplacement": "À ranger"
            },
            $unset: {
                "exemplaires.$.emprunt_actuel": ""
            }
        }
    );
    
    print("Livre retourné");
}

// Test
retournerLivre("M001", "978-2-07-036822-8", "LPP-002")
```

---

## 🚀 Phase 5 : Mini-projet et validation 

### 5.1 Mini-projet : Système de notation et recommandations (15 min)

```javascript
// Mission : Ajouter un système de notation et recommandations

// 1. Ajouter des avis
db.livres.updateOne(
    {isbn: "978-2-07-036822-8"},
    {$push: {
        avis: {
            membre_id: "M001",
            note: 5,
            commentaire: "Un classique intemporel !",
            date: new Date(),
            utile: 12  // Nombre de "j'aime"
        }
    }}
)

// 2. Recalculer la note moyenne
db.livres.aggregate([
    {$match: {isbn: "978-2-07-036822-8"}},
    {$unwind: "$avis"},
    {$group: {
        _id: "$isbn",
        nouvelle_moyenne: {$avg: "$avis.note"},
        nombre_avis: {$sum: 1}
    }}
])

// 3. Recommandations basées sur les préférences
function recommander(membre_id) {
    // Récupérer les préférences du membre
    let membre = db.membres.findOne({_id: membre_id});
    
    if (!membre || !membre.preferences) {
        return [];
    }
    
    // Trouver les livres correspondants
    return db.livres.find({
        categories: {$in: membre.preferences},
        note_moyenne: {$gte: 4.0}
    })
    .sort({note_moyenne: -1, nombre_emprunts_total: -1})
    .limit(5)
    .toArray();
}

// Test
let recommendations = recommander("M001");
recommendations.forEach(livre => {
    print(`Recommandé : ${livre.titre} (${livre.note_moyenne}/5)`);
});

// 4. Dashboard statistiques
db.livres.aggregate([
    // Statistiques globales
    {$facet: {
        total_livres: [{$count: "count"}],
        
        total_exemplaires: [
            {$unwind: "$exemplaires"},
            {$count: "count"}
        ],
        
        exemplaires_disponibles: [
            {$unwind: "$exemplaires"},
            {$match: {"exemplaires.disponible": true}},
            {$count: "count"}
        ],
        
        categories_populaires: [
            {$unwind: "$categories"},
            {$group: {
                _id: "$categories",
                count: {$sum: 1}
            }},
            {$sort: {count: -1}},
            {$limit: 5}
        ],
        
        livres_populaires: [
            {$sort: {nombre_emprunts_total: -1}},
            {$limit: 3},
            {$project: {titre: 1, nombre_emprunts_total: 1}}
        ]
    }}
])
```

### 5.2 Exercices de validation

```javascript
// EXERCICE 1 : Créer une collection "evenements" pour la médiathèque
// Modéliser : conférences, ateliers lecture, expositions
// Inclure : date, intervenant, participants (max 30), inscriptions

// Votre solution :


// EXERCICE 2 : Requête complexe
// Trouver tous les livres Fantasy disponibles,
// publiés après 1990, avec une note > 4
// Trier par nombre d'emprunts décroissant

// Votre requête :


// EXERCICE 3 : Fonction d'analyse
// Créer une fonction qui calcule le taux d'occupation
// de la médiathèque (% de livres empruntés)

// Votre fonction :


// EXERCICE 4 : Optimisation
// Identifier les index nécessaires pour optimiser :
// - Recherche par ISBN
// - Recherche par catégorie
// - Recherche par disponibilité

// Vos commandes :

```

---

### 📝 Corrigés des exercices

<details>
<summary>💡 Corrigé Exercice 1 : Collection "evenements"</summary>

```javascript
db.evenements.insertMany([
    {
        type: "conference",
        titre: "La littérature française au XXIe siècle",
        date: new Date("2024-02-15T18:00:00"),
        duree_minutes: 90,
        lieu: "Salle polyvalente",
        intervenant: {
            nom: "Dupont",
            prenom: "Marie",
            bio: "Professeure de littérature à l'université",
            contact: "marie.dupont@univ.fr"
        },
        capacite_max: 30,
        inscriptions: [
            {
                membre_id: "M001",
                date_inscription: new Date("2024-01-20")
            },
            {
                membre_id: "M002",
                date_inscription: new Date("2024-01-22")
            }
        ],
        nombre_inscrits: 2,
        statut: "ouvert",  // ouvert, complet, annulé, terminé
        theme: ["littérature", "culture"]
    },
    {
        type: "atelier",
        titre: "Initiation à l'écriture créative",
        date: new Date("2024-02-20T14:00:00"),
        duree_minutes: 120,
        lieu: "Salle 3",
        intervenant: {
            nom: "Martin",
            prenom: "Lucas",
            bio: "Écrivain et formateur"
        },
        capacite_max: 15,
        inscriptions: [],
        nombre_inscrits: 0,
        statut: "ouvert",
        materiel_requis: ["Cahier", "Stylo"],
        theme: ["écriture", "créativité"]
    },
    {
        type: "exposition",
        titre: "Illustrations de contes classiques",
        date_debut: new Date("2024-03-01"),
        date_fin: new Date("2024-03-31"),
        lieu: "Hall principal",
        artiste: {
            nom: "Bernard",
            prenom: "Sophie",
            site_web: "www.sophie-illustre.fr"
        },
        acces_libre: true,
        theme: ["art", "jeunesse", "illustration"]
    }
])

// Vérification
db.evenements.find()
```

**Points clés de la modélisation :**
- Différents types d'événements dans la même collection (flexibilité)
- Objets imbriqués pour les informations de l'intervenant
- Tableau d'inscriptions embarqué (jusqu'à 30 max)
- Champs optionnels selon le type (materiel_requis, date_fin, etc.)
</details>

<details>
<summary>💡 Corrigé Exercice 2 : Requête complexe</summary>

```javascript
db.livres.find(
    {
        categories: "Fantasy",
        "publication.annee": {$gt: 1990},
        note_moyenne: {$gt: 4},
        "exemplaires.disponible": true
    },
    {
        titre: 1,
        "auteur.nom": 1,
        "auteur.prenom": 1,
        note_moyenne: 1,
        nombre_emprunts_total: 1
    }
).sort({nombre_emprunts_total: -1})

// ⚠️ Note : Cette requête vérifie qu'AU MOINS UN exemplaire est disponible
// Si vous voulez afficher SEULEMENT les exemplaires disponibles,
// il faudrait utiliser l'agrégation avec $filter
```

**Explication :**
- `categories: "Fantasy"` : MongoDB cherche "Fantasy" dans le tableau
- `{$gt: 1990}` : Strictement supérieur (après 1990)
- `{$gt: 4}` : Note strictement supérieure à 4
- `sort({...: -1})` : -1 = décroissant, 1 = croissant
</details>

<details>
<summary>💡 Corrigé Exercice 3 : Fonction taux d'occupation</summary>

```javascript
function calculerTauxOccupation() {
    // Méthode 1 : Avec agrégation (recommandée)
    let stats = db.livres.aggregate([
        {$unwind: "$exemplaires"},
        {$group: {
            _id: null,
            total: {$sum: 1},
            empruntes: {
                $sum: {
                    $cond: [{$eq: ["$exemplaires.disponible", false]}, 1, 0]
                }
            }
        }},
        {$project: {
            total: 1,
            empruntes: 1,
            taux_occupation: {
                $multiply: [
                    {$divide: ["$empruntes", "$total"]},
                    100
                ]
            }
        }}
    ]).toArray()[0];

    print(`=== Statistiques de la médiathèque ===`);
    print(`Total exemplaires : ${stats.total}`);
    print(`Exemplaires empruntés : ${stats.empruntes}`);
    print(`Taux d'occupation : ${stats.taux_occupation.toFixed(2)}%`);

    return stats;
}

// Test de la fonction
calculerTauxOccupation();

// Méthode 2 : Plus simple mais moins performante
function calculerTauxOccupationSimple() {
    let total = 0;
    let empruntes = 0;

    db.livres.find().forEach(livre => {
        livre.exemplaires.forEach(ex => {
            total++;
            if (!ex.disponible) empruntes++;
        });
    });

    let taux = (empruntes / total) * 100;
    print(`Taux d'occupation : ${taux.toFixed(2)}%`);
    return taux;
}
```

**Points clés :**
- `$unwind` : "Déroule" le tableau exemplaires (1 doc = 1 exemplaire)
- `$cond` : Condition if/else dans l'agrégation
- La méthode 1 (agrégation) est plus performante pour de gros volumes
</details>

<details>
<summary>💡 Corrigé Exercice 4 : Index d'optimisation</summary>

```javascript
// 1. Index sur ISBN (recherche exacte très fréquente)
db.livres.createIndex({isbn: 1})
// Justification : L'ISBN est unique et souvent utilisé pour identifier un livre

// 2. Index sur les catégories (recherches fréquentes)
db.livres.createIndex({categories: 1})
// Justification : Recherches par genre (Fantasy, Science-Fiction, etc.)

// 3. Index sur la disponibilité des exemplaires
db.livres.createIndex({"exemplaires.disponible": 1})
// Justification : Requête fréquente pour trouver les livres disponibles

// 4. Index composé pour les recherches combinées
db.livres.createIndex({categories: 1, note_moyenne: -1})
// Justification : Rechercher dans une catégorie et trier par note

// 5. Index sur les membres pour les emprunts
db.membres.createIndex({_id: 1})  // Existe déjà par défaut
db.membres.createIndex({"emprunts_en_cours.livre_isbn": 1})
// Justification : Trouver rapidement les emprunts d'un membre

// Vérifier les index créés
db.livres.getIndexes()
db.membres.getIndexes()

// Analyser les performances d'une requête avec explain()
db.livres.find({categories: "Fantasy"}).explain("executionStats")
```

**Principes d'indexation :**
- Indexer les champs utilisés dans `find()` et `sort()`
- Index composés pour les requêtes combinées fréquentes
- Attention : trop d'index ralentit les écritures (INSERT/UPDATE)
- `explain()` permet de vérifier qu'un index est bien utilisé
</details>

```

---

## ✅ Checklist de fin de séance

### Compétences acquises
- [ ] Je sais me connecter à MongoDB Atlas
- [ ] Je comprends la différence SQL vs NoSQL
- [ ] Je maîtrise insertOne et insertMany
- [ ] Je sais faire des find avec critères
- [ ] Je peux modifier des documents (set, inc, push)
- [ ] Je comprends l'embedding de documents
- [ ] Je sais créer des fonctions métier
- [ ] Je peux faire des agrégations simples

### Points clés à retenir
1. **Flexibilité du schéma** : Les documents peuvent avoir des structures différentes
2. **Embedding vs Référence** : Privilégier l'embedding pour les données lues ensemble
3. **ObjectId** : Contient la date de création
4. **Pas de JOIN** : Toute l'info dans le document ou via agrégation
5. **Types BSON** : Plus riches que JSON (Date, ObjectId, Decimal128...)

### Auto-évaluation rapide
```javascript
// Testez-vous : Écrivez ces requêtes sans aide

// 1. Insérer un nouveau membre

// 2. Trouver les livres de George Orwell

// 3. Augmenter la note d'un livre

// 4. Compter les livres par catégorie

// 5. Lister les emprunts en retard
```

---

## 📚 Pour préparer la séance 2

### Ressources complémentaires
- MongoDB University : M001 MongoDB Basics (gratuit)
- Documentation : https://docs.mongodb.com/manual/crud/
- Playground : https://mongoplayground.net/

### Défis optionnels
1. Modéliser votre collection de films/séries préférés
2. Créer un système de gestion de notes BUT
3. Implémenter un mini réseau social (users, posts, likes)


