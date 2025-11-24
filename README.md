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
| 1h25-2h10 | 45 min | Découverte pratique + Exercices interrogation |
| 2h10-3h10 | 60 min | CRUD complet guidé |
| 3h10-3h20 | 10 min | **Pause** |
| 3h20-4h00 | 40 min | Mini-projet et validation |

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

---

### 3.4 Exercices d'interrogation de données (20 min)

Maintenant que vous avez vu les différentes syntaxes, testez votre compréhension avec ces exercices pratiques sur la collection `employes`.

#### Exercice 1 : Requête simple avec égalité
**Objectif :** Trouver tous les employés du service "Marketing"

**Ce que vous devez pratiquer :** Requête simple avec un critère d'égalité

<details>
<summary>💡 Solution</summary>

```javascript
db.employes.find({service: "Marketing"})
```

**Explications :**
- Syntaxe de base : `find({champ: valeur})`
- Retourne tous les documents où `service` vaut exactement "Marketing"
</details>

---

#### Exercice 2 : Requête avec opérateur de comparaison
**Objectif :** Trouver tous les employés de moins de 30 ans

**Ce que vous devez pratiquer :** Utilisation de l'opérateur `$lt` (less than)

<details>
<summary>💡 Solution</summary>

```javascript
db.employes.find({age: {$lt: 30}})
```

**Explications :**
- `$lt: 30` signifie "strictement inférieur à 30"
- Autres opérateurs utiles :
  - `$gt` : greater than (>)
  - `$lte` : less than or equal (≤)
  - `$gte` : greater than or equal (≥)
  - `$ne` : not equal (≠)
</details>

---

#### Exercice 3 : Requête avec plusieurs critères (AND)
**Objectif :** Trouver les employés du service "IT" qui gagnent plus de 3500€

**Ce que vous devez pratiquer :** Combiner plusieurs critères (AND implicite)

<details>
<summary>💡 Solution</summary>

```javascript
db.employes.find({
    service: "IT",
    salaire: {$gt: 3500}
})
```

**Explications :**
- Virgule entre les critères = AND logique
- Équivalent SQL : `WHERE service = 'IT' AND salaire > 3500`
</details>

---

#### Exercice 4 : Projection de champs
**Objectif :** Afficher uniquement le nom, prénom et salaire de tous les employés (sans l'_id)

**Ce que vous devez pratiquer :** Sélection de champs spécifiques (projection)

<details>
<summary>💡 Solution</summary>

```javascript
db.employes.find(
    {},                                    // Critères vides = tous les documents
    {nom: 1, prenom: 1, salaire: 1, _id: 0}  // Projection
)
```

**Explications :**
- `1` = inclure le champ
- `0` = exclure le champ
- Par défaut, `_id` est toujours inclus, il faut le mettre explicitement à 0 pour l'exclure
- Équivalent SQL : `SELECT nom, prenom, salaire FROM employes`
</details>

---

#### Exercice 5 : Tri des résultats
**Objectif :** Afficher tous les employés triés par âge croissant

**Ce que vous devez pratiquer :** Utilisation de `.sort()`

<details>
<summary>💡 Solution</summary>

```javascript
db.employes.find().sort({age: 1})
```

**Explications :**
- `sort({champ: 1})` = tri croissant (ascendant)
- `sort({champ: -1})` = tri décroissant (descendant)
- Équivalent SQL : `ORDER BY age ASC`
</details>

---

#### Exercice 6 : Limitation du nombre de résultats
**Objectif :** Afficher les 3 employés les mieux payés

**Ce que vous devez pratiquer :** Combinaison de `.sort()` et `.limit()`

<details>
<summary>💡 Solution</summary>

```javascript
db.employes.find()
    .sort({salaire: -1})  // Tri décroissant
    .limit(3)              // Garder les 3 premiers
```

**Explications :**
- Ordre important : trier d'abord, limiter ensuite
- Équivalent SQL : `ORDER BY salaire DESC LIMIT 3`
</details>

---

#### Exercice 7 : Compter des documents
**Objectif :** Combien d'employés travaillent au service "RH" ?

**Ce que vous devez pratiquer :** Utilisation de `countDocuments()`

<details>
<summary>💡 Solution</summary>

```javascript
db.employes.countDocuments({service: "RH"})
```

**Explications :**
- `countDocuments()` retourne un nombre, pas des documents
- Équivalent SQL : `SELECT COUNT(*) FROM employes WHERE service = 'RH'`
</details>

---

#### Exercice 8 : Valeurs distinctes
**Objectif :** Lister tous les services existants (sans doublon)

**Ce que vous devez pratiquer :** Utilisation de `distinct()`

<details>
<summary>💡 Solution</summary>

```javascript
db.employes.distinct("service")
```

**Explications :**
- `distinct("champ")` retourne un tableau de valeurs uniques
- Équivalent SQL : `SELECT DISTINCT service FROM employes`
</details>

---

#### Exercice 9 : Requête sur champ optionnel
**Objectif :** Trouver tous les managers (employés qui ont le champ `manager` défini)

**Ce que vous devez pratiquer :** Utilisation de `$exists`

<details>
<summary>💡 Solution</summary>

```javascript
db.employes.find({manager: {$exists: true}})

// Ou plus strict (champ existe ET vaut true) :
db.employes.find({manager: true})
```

**Explications :**
- `$exists: true` vérifie que le champ existe dans le document
- `$exists: false` vérifie que le champ n'existe PAS
- Utile car MongoDB a un schéma flexible : tous les documents n'ont pas les mêmes champs
</details>

---

#### Exercice 10 : Requête sur un tableau
**Objectif :** Trouver tous les employés qui ont la compétence "MongoDB"

**Ce que vous devez pratiquer :** Requête dans un tableau

<details>
<summary>💡 Solution</summary>

```javascript
db.employes.find({competences: "MongoDB"})
```

**Explications :**
- MongoDB cherche automatiquement dans les tableaux
- Cette requête trouve tous les documents où le tableau `competences` contient "MongoDB"
- ⚠️ Attention : certains employés n'ont pas de champ `competences` du tout, ils ne seront pas retournés
</details>

---

#### 🎯 Exercice bonus : Requête complexe combinée
**Objectif :** Trouver les 2 employés les plus jeunes du service "IT", en affichant uniquement leur nom complet et leur âge

**Ce que vous devez pratiquer :** Combiner plusieurs concepts

<details>
<summary>💡 Solution</summary>

```javascript
db.employes.find(
    {service: "IT"},
    {nom: 1, prenom: 1, age: 1, _id: 0}
)
.sort({age: 1})
.limit(2)
```

**Explications :**
- Critères : `service: "IT"`
- Projection : nom, prenom, age (sans _id)
- Tri croissant par âge : les plus jeunes d'abord
- Limite : 2 résultats
</details>

---

#### ✅ Auto-évaluation

Avant de passer à la suite, vérifiez que vous maîtrisez :
- [ ] Les opérateurs de comparaison (`$lt`, `$gt`, `$lte`, `$gte`, `$ne`)
- [ ] La combinaison de critères (AND implicite)
- [ ] Les projections pour sélectionner des champs
- [ ] Le tri avec `.sort()`
- [ ] La limitation avec `.limit()`
- [ ] Le comptage avec `countDocuments()`
- [ ] Les valeurs distinctes avec `distinct()`
- [ ] La vérification d'existence avec `$exists`
- [ ] Les requêtes dans les tableaux

---

### 3.5 Exercices de modification de données (20 min)

Maintenant que vous savez interroger les données, apprenons à les modifier ! Utilisez toujours la collection `employes` pour ces exercices.

#### Exercice 11 : Mise à jour simple avec $set
**Objectif :** Ajouter l'email "alice.martin@company.com" à l'employée Alice Martin

**Ce que vous devez pratiquer :** Utilisation de `updateOne()` avec l'opérateur `$set`

<details>
<summary>💡 Solution</summary>

```javascript
db.employes.updateOne(
    {nom: "Martin", prenom: "Alice"},        // Critère : qui modifier ?
    {$set: {email: "alice.martin@company.com"}}  // Action : quoi modifier ?
)

// Vérifier le résultat
db.employes.findOne({nom: "Martin", prenom: "Alice"})
```

**Explications :**
- `updateOne()` modifie **un seul document** (le premier qui correspond)
- `$set` ajoute un champ s'il n'existe pas, ou le modifie s'il existe déjà
- Le champ `email` n'existait pas avant, MongoDB l'ajoute automatiquement
- Équivalent SQL : `UPDATE employes SET email = '...' WHERE nom = 'Martin' AND prenom = 'Alice'`
</details>

---

#### Exercice 12 : Incrémenter une valeur numérique
**Objectif :** Augmenter le salaire de Diana Petit de 200€

**Ce que vous devez pratiquer :** Utilisation de l'opérateur `$inc` pour incrémenter

<details>
<summary>💡 Solution</summary>

```javascript
db.employes.updateOne(
    {nom: "Petit"},
    {$inc: {salaire: 200}}  // Ajoute 200 au salaire actuel
)

// Vérifier
db.employes.findOne({nom: "Petit"}, {nom: 1, prenom: 1, salaire: 1})
```

**Explications :**
- `$inc` incrémente (ajoute à) une valeur numérique
- Pour décrémenter, utiliser une valeur négative : `{$inc: {salaire: -100}}`
- Plus efficace que lire la valeur, calculer, puis réécrire
- ⚠️ Ne fonctionne qu'avec des nombres !
</details>

---

#### Exercice 13 : Ajouter un élément dans un tableau
**Objectif :** Ajouter la compétence "Docker" à Eve Robert

**Ce que vous devez pratiquer :** Utilisation de `$push` pour ajouter dans un tableau

<details>
<summary>💡 Solution</summary>

```javascript
db.employes.updateOne(
    {nom: "Robert", prenom: "Eve"},
    {$push: {competences: "Docker"}}
)

// Vérifier
db.employes.findOne({nom: "Robert"}, {nom: 1, competences: 1})
```

**Explications :**
- `$push` ajoute un élément à la fin d'un tableau
- Si le champ n'existe pas, MongoDB crée un tableau avec cet élément
- Si le champ existe mais n'est pas un tableau, une erreur est levée
- Pour ajouter plusieurs éléments d'un coup : `{$push: {competences: {$each: ["Docker", "Kubernetes"]}}}`
</details>

---

#### Exercice 14 : Retirer un élément d'un tableau
**Objectif :** Retirer la compétence "Python" de Eve Robert (elle préfère JavaScript maintenant !)

**Ce que vous devez pratiquer :** Utilisation de `$pull` pour retirer d'un tableau

<details>
<summary>💡 Solution</summary>

```javascript
db.employes.updateOne(
    {nom: "Robert", prenom: "Eve"},
    {$pull: {competences: "Python"}}
)

// Vérifier
db.employes.findOne({nom: "Robert"}, {nom: 1, competences: 1})
```

**Explications :**
- `$pull` retire **toutes les occurrences** d'une valeur dans un tableau
- Si la valeur n'existe pas dans le tableau, rien ne se passe (pas d'erreur)
- Différence avec `$pop` : `$pop` retire le premier ou dernier élément, `$pull` retire une valeur spécifique
</details>

---

#### Exercice 15 : Mise à jour multiple (plusieurs documents)
**Objectif :** Ajouter un budget de formation de 1000€ à tous les employés du service "IT"

**Ce que vous devez pratiquer :** Utilisation de `updateMany()` pour modifier plusieurs documents

<details>
<summary>💡 Solution</summary>

```javascript
db.employes.updateMany(
    {service: "IT"},                     // Critère : tous les IT
    {$set: {budget_formation: 1000}}     // Action : ajouter le champ
)

// Vérifier combien ont été modifiés
db.employes.countDocuments({budget_formation: {$exists: true}})

// Voir les résultats
db.employes.find({service: "IT"}, {nom: 1, service: 1, budget_formation: 1})
```

**Explications :**
- `updateMany()` modifie **tous les documents** qui correspondent aux critères
- La réponse indique `matchedCount` (trouvés) et `modifiedCount` (modifiés)
- ⚠️ Attention : sans critères `{}`, cela modifie TOUTE la collection !
- Équivalent SQL : `UPDATE employes SET budget_formation = 1000 WHERE service = 'IT'`
</details>

---

#### Exercice 16 : Upsert (update ou insert)
**Objectif :** Créer un nouvel employé Kevin Nouveau (IT, 30 ans, 3300€) s'il n'existe pas déjà

**Ce que vous devez pratiquer :** Utilisation de l'option `upsert` (update + insert)

<details>
<summary>💡 Solution</summary>

```javascript
db.employes.updateOne(
    {nom: "Nouveau", prenom: "Kevin"},   // Critère de recherche
    {$set: {
        age: 30,
        service: "IT",
        salaire: 3300
    }},
    {upsert: true}  // IMPORTANT : créer si n'existe pas
)

// Vérifier
db.employes.findOne({nom: "Nouveau"})
```

**Explications :**
- `upsert: true` = "update or insert"
- Si le document existe → mise à jour
- Si le document n'existe pas → création
- Très utile pour éviter les doublons et simplifier le code
- Sans `upsert`, si Kevin n'existe pas, rien ne se passe
</details>

---

#### Exercice 17 : Supprimer un champ
**Objectif :** Retirer le champ `stage` de tous les employés (nettoyage des données temporaires)

**Ce que vous devez pratiquer :** Utilisation de `$unset` pour supprimer un champ

<details>
<summary>💡 Solution</summary>

```javascript
db.employes.updateMany(
    {},                      // Critères vides = tous les documents
    {$unset: {stage: ""}}   // La valeur n'a pas d'importance, seul le nom du champ compte
)

// Vérifier qu'aucun employé n'a le champ "stage"
db.employes.find({stage: {$exists: true}})
```

**Explications :**
- `$unset` supprime complètement un champ d'un document
- La valeur après le nom du champ (ici `""`) n'a aucune importance
- Si le champ n'existe pas, rien ne se passe
- Utile pour nettoyer des champs obsolètes ou temporaires
</details>

---

#### Exercice 18 : Modifier plusieurs champs simultanément
**Objectif :** Pour l'employé Charlie Durand, augmenter le salaire de 500€ ET ajouter le champ `derniere_promotion: new Date()`

**Ce que vous devez pratiquer :** Combiner plusieurs opérateurs de modification

<details>
<summary>💡 Solution</summary>

```javascript
db.employes.updateOne(
    {nom: "Durand", prenom: "Charlie"},
    {
        $inc: {salaire: 500},
        $set: {derniere_promotion: new Date()}
    }
)

// Vérifier
db.employes.findOne(
    {nom: "Durand"},
    {nom: 1, prenom: 1, salaire: 1, derniere_promotion: 1}
)
```

**Explications :**
- On peut combiner plusieurs opérateurs (`$inc`, `$set`, `$push`, etc.) dans une seule mise à jour
- MongoDB applique toutes les modifications de manière atomique (tout ou rien)
- Plus efficace qu'exécuter plusieurs `updateOne()` successifs
</details>

---

#### 🎯 Exercice bonus : Mise à jour conditionnelle complexe
**Objectif :** Augmenter de 10% le salaire de tous les employés IT qui gagnent moins de 4000€

**Ce que vous devez pratiquer :** Combiner critères complexes et opérateurs mathématiques

<details>
<summary>💡 Solution</summary>

```javascript
// Méthode 1 : Augmentation en plusieurs étapes (simple mais limité)
db.employes.updateMany(
    {
        service: "IT",
        salaire: {$lt: 4000}
    },
    {$mul: {salaire: 1.1}}  // Multiplier par 1.1 = +10%
)

// Vérifier
db.employes.find(
    {service: "IT"},
    {nom: 1, service: 1, salaire: 1}
).sort({salaire: 1})
```

**Explications :**
- `$mul` multiplie une valeur par un nombre
- `$mul: {salaire: 1.1}` = augmentation de 10%
- Combiné avec des critères précis : service IT ET salaire < 4000
- ⚠️ Le résultat peut avoir des décimales : 3500 × 1.1 = 3850.0

**Alternative avec arrondi (plus avancé) :**
```javascript
// Utiliser l'aggregation pipeline dans update (MongoDB 4.2+)
db.employes.updateMany(
    {
        service: "IT",
        salaire: {$lt: 4000}
    },
    [
        {$set: {
            salaire: {$round: [{$multiply: ["$salaire", 1.1]}, 2]}
        }}
    ]
)
```
</details>

---

#### ✅ Auto-évaluation

Avant de passer à la suite, vérifiez que vous maîtrisez :
- [ ] Modifier un champ avec `$set`
- [ ] Incrémenter/décrémenter avec `$inc` et `$mul`
- [ ] Ajouter à un tableau avec `$push`
- [ ] Retirer d'un tableau avec `$pull`
- [ ] Supprimer un champ avec `$unset`
- [ ] Utiliser `updateMany()` pour modifier plusieurs documents
- [ ] Comprendre et utiliser l'option `upsert`
- [ ] Combiner plusieurs opérateurs dans une seule mise à jour

⚠️ **Rappel de sécurité :** `updateMany({}, ...)` sans critères modifie TOUTE la collection !

---

### 3.6 Exercices de suppression de données (15 min)

Dernière opération CRUD : la suppression ! Attention, ces opérations sont **irréversibles** en production.

⚠️ **IMPORTANT** : Pour ces exercices, vous allez supprimer des données. Si vous voulez recommencer, relancez le `insertMany()` de la section 3.3.

#### Exercice 19 : Supprimer un document unique
**Objectif :** Supprimer l'employé Henri Martin (stagiaire qui a terminé son stage)

**Ce que vous devez pratiquer :** Utilisation de `deleteOne()` pour supprimer un document

<details>
<summary>💡 Solution</summary>

```javascript
db.employes.deleteOne({nom: "Martin", prenom: "Henri"})

// Vérifier la suppression
db.employes.find({nom: "Martin", prenom: "Henri"})
// Résultat : aucun document

// Compter combien de Martin restent
db.employes.countDocuments({nom: "Martin"})
```

**Explications :**
- `deleteOne()` supprime **un seul document** (le premier qui correspond)
- La méthode retourne `{acknowledged: true, deletedCount: 1}` si un document a été supprimé
- Si aucun document ne correspond, `deletedCount` vaut 0 (pas d'erreur)
- ⚠️ Suppression définitive, aucun moyen de récupérer les données !
- Équivalent SQL : `DELETE FROM employes WHERE nom = 'Martin' AND prenom = 'Henri' LIMIT 1`
</details>

---

#### Exercice 20 : Supprimer plusieurs documents
**Objectif :** Supprimer tous les employés du service "Marketing"

**Ce que vous devez pratiquer :** Utilisation de `deleteMany()` pour supprimer plusieurs documents

<details>
<summary>💡 Solution</summary>

```javascript
// Vérifier combien seront supprimés AVANT de supprimer
db.employes.countDocuments({service: "Marketing"})

// Supprimer
db.employes.deleteMany({service: "Marketing"})

// Vérifier que le service n'existe plus
db.employes.distinct("service")
```

**Explications :**
- `deleteMany()` supprime **tous les documents** qui correspondent aux critères
- Toujours vérifier avec `countDocuments()` AVANT de supprimer
- Le résultat indique `deletedCount` : nombre de documents supprimés
- Équivalent SQL : `DELETE FROM employes WHERE service = 'Marketing'`
- ⚠️ Sans critères `deleteMany({})`, TOUTE la collection est supprimée !
</details>

---

#### Exercice 21 : Suppression conditionnelle
**Objectif :** Supprimer tous les employés qui gagnent moins de 2700€ (restructuration)

**Ce que vous devez pratiquer :** Suppression avec critère de comparaison

<details>
<summary>💡 Solution</summary>

```javascript
// Voir qui sera affecté
db.employes.find(
    {salaire: {$lt: 2700}},
    {nom: 1, prenom: 1, salaire: 1}
)

// Supprimer
db.employes.deleteMany({salaire: {$lt: 2700}})

// Vérifier le salaire minimum restant
db.employes.find().sort({salaire: 1}).limit(1)
```

**Explications :**
- On peut utiliser tous les opérateurs de comparaison dans `deleteMany()`
- Bonne pratique : toujours faire un `find()` avec les mêmes critères AVANT de supprimer
- Permet de vérifier qu'on va supprimer les bons documents
</details>

---

#### Exercice 22 : Supprimer avec critère sur tableau
**Objectif :** Supprimer tous les employés qui n'ont PAS de compétences enregistrées

**Ce que vous devez pratiquer :** Suppression avec `$exists` sur un champ optionnel

<details>
<summary>💡 Solution</summary>

```javascript
// Voir combien d'employés n'ont pas de compétences
db.employes.countDocuments({competences: {$exists: false}})

// Les afficher
db.employes.find(
    {competences: {$exists: false}},
    {nom: 1, prenom: 1, service: 1}
)

// Supprimer
db.employes.deleteMany({competences: {$exists: false}})
```

**Explications :**
- `{$exists: false}` cible les documents où le champ n'existe pas du tout
- Différent de `{competences: []}` qui cible un tableau vide
- Utile pour nettoyer les documents incomplets
</details>

---

#### Exercice 23 : Supprimer toute une collection
**Objectif :** Supprimer complètement la collection `employes` pour repartir de zéro

**Ce que vous devez pratiquer :** Utilisation de `drop()` pour supprimer une collection

<details>
<summary>💡 Solution</summary>

```javascript
// Méthode 1 : Supprimer tous les documents (la collection reste)
db.employes.deleteMany({})

// Vérifier : la collection existe toujours mais est vide
db.employes.countDocuments()  // 0

// Méthode 2 : Supprimer la collection entière (recommandé)
db.employes.drop()

// Vérifier : la collection n'existe plus
show collections  // employes n'apparaît plus
```

**Explications :**
- `deleteMany({})` supprime tous les documents mais garde la structure (indexes, etc.)
- `drop()` supprime la collection complètement (documents + indexes + métadonnées)
- `drop()` est plus rapide et plus propre pour repartir de zéro
- ⚠️ `drop()` supprime aussi tous les index créés !
- Équivalent SQL : `DROP TABLE employes`

**Recréer les données pour la suite :**
```javascript
// Relancer l'insertion de la section 3.3
db.employes.insertMany([
    {nom: "Martin", prenom: "Alice", age: 28, service: "IT", salaire: 3500},
    {nom: "Dubois", prenom: "Bob", age: 35, service: "RH", salaire: 3200},
    // ... etc
])
```
</details>

---

#### 🎯 Exercice bonus : Suppression "intelligente" (soft delete)
**Objectif :** Au lieu de supprimer définitivement un employé, le marquer comme "inactif" (approche professionnelle)

**Ce que vous devez pratiquer :** Alternative à la suppression : mise à jour plutôt que delete

<details>
<summary>💡 Solution</summary>

```javascript
// ❌ Mauvaise pratique : supprimer définitivement
// db.employes.deleteOne({nom: "Dubois", prenom: "Bob"})

// ✅ Bonne pratique : "soft delete" (suppression douce)
db.employes.updateOne(
    {nom: "Dubois", prenom: "Bob"},
    {
        $set: {
            actif: false,
            date_desactivation: new Date(),
            raison: "Démission"
        }
    }
)

// Requêtes normales : exclure les inactifs
db.employes.find({actif: {$ne: false}})
// Ou plus explicite :
db.employes.find({$or: [{actif: true}, {actif: {$exists: false}}]})

// Voir les employés désactivés (pour audit/historique)
db.employes.find({actif: false})
```

**Explications :**
- En production, on évite souvent de supprimer définitivement
- Raisons : audit, historique, contraintes légales (RGPD), possibilité d'annuler
- Le "soft delete" marque les données comme inactives au lieu de les supprimer
- Permet de garder l'historique complet de l'entreprise
- Nécessite d'ajouter `{actif: true}` ou `{actif: {$ne: false}}` dans toutes les requêtes

**Avantages du soft delete :**
- Traçabilité complète
- Possibilité de restaurer
- Conservation pour audits et statistiques
- Respect des obligations légales

**Inconvénients :**
- Base de données plus volumineuse
- Requêtes légèrement plus complexes
- Nécessite une gestion de l'archivage
</details>

---

#### ✅ Auto-évaluation

Avant de passer à la suite, vérifiez que vous maîtrisez :
- [ ] Supprimer un document avec `deleteOne()`
- [ ] Supprimer plusieurs documents avec `deleteMany()`
- [ ] Utiliser des critères de comparaison dans les suppressions
- [ ] Vérifier AVANT de supprimer avec `find()` ou `countDocuments()`
- [ ] Supprimer une collection entière avec `drop()`
- [ ] Comprendre la différence entre `deleteMany({})` et `drop()`
- [ ] Connaître l'approche "soft delete" pour la production

⚠️ **DANGER ABSOLU** :
- `db.employes.deleteMany({})` supprime TOUS les documents
- `db.dropDatabase()` supprime TOUTE la base de données
- **Aucun retour en arrière possible !**

💡 **Bonne pratique professionnelle :**
1. Toujours faire un `find()` avec les mêmes critères AVANT `delete()`
2. Vérifier le `countDocuments()` pour savoir combien seront supprimés
3. En production, préférer le "soft delete" (marqueur `actif: false`)
4. Faire des backups avant toute suppression massive

---

## 🎯 Phase 4 : CRUD complet sur cas concret (60 min)

Cette phase vous permet de mettre en pratique **tous les concepts vus précédemment** sur un cas réel : une médiathèque. Vous allez découvrir comment modéliser des données complexes avec des **documents imbriqués** et des **tableaux**, puis réaliser des opérations avancées.

---

### 4.1 Contexte et modélisation guidée (15 min)

#### 📖 Le contexte métier

Vous devez créer un système de gestion pour la médiathèque de l'IUT. Le système doit gérer :
- **Livres** : avec plusieurs exemplaires physiques de chaque titre
- **Membres** : étudiants qui empruntent des livres
- **Emprunts** : historique et emprunts en cours

#### 🤔 Réflexion : SQL vs MongoDB

En SQL, vous auriez créé **3 tables séparées** avec des clés étrangères :

```sql
-- Approche SQL relationnelle
CREATE TABLE livres (
    isbn VARCHAR(20) PRIMARY KEY,
    titre VARCHAR(255),
    auteur_nom VARCHAR(100),
    auteur_prenom VARCHAR(100)
);

CREATE TABLE exemplaires (
    code VARCHAR(20) PRIMARY KEY,
    isbn VARCHAR(20) REFERENCES livres(isbn),
    etat VARCHAR(20),
    disponible BOOLEAN
);

CREATE TABLE emprunts (
    id SERIAL PRIMARY KEY,
    exemplaire_code VARCHAR(20) REFERENCES exemplaires(code),
    membre_id VARCHAR(10) REFERENCES membres(id),
    date_emprunt DATE,
    date_retour_prevue DATE
);
```

**Problème** : Pour afficher un livre avec ses exemplaires et leurs emprunts, il faut faire **plusieurs JOIN** coûteux !

#### ✅ Approche MongoDB : Embedding (embarquement)

En MongoDB, on **embarque les données liées** directement dans le document parent :

```javascript
// Un seul document contient TOUT
{
    isbn: "978-2-07-036822-8",
    titre: "Le Petit Prince",
    auteur: {
        nom: "Saint-Exupéry",
        prenom: "Antoine de"
    },
    exemplaires: [
        {
            code: "LPP-001",
            etat: "Bon",
            disponible: true,
            emprunt_actuel: {
                membre_id: "M001",
                date_emprunt: new Date("2024-01-10"),
                date_retour_prevue: new Date("2024-01-24")
            }
        }
    ]
}
```

**Avantages** :
- ✅ Lecture ultra-rapide : **un seul `find()`** pour tout récupérer
- ✅ Structure intuitive : tout est regroupé logiquement
- ✅ Pas de JOIN nécessaire

**Inconvénient** :
- ❌ Difficile de faire des statistiques globales sur les emprunts (mais l'agrégation résout ce problème)

#### 📝 Règle de décision : Quand embarquer ?

| Cas | Solution |
|-----|----------|
| **1 à N** et N est petit (< 100) | ✅ **Embedding** (ex: 1 livre → 10 exemplaires) |
| **1 à N** et N est grand (> 1000) | ❌ Références séparées |
| Données souvent lues ensemble | ✅ **Embedding** |
| Données modifiées indépendamment | ❌ Références séparées |

#### 🚀 Création de la base de données

```javascript
// 1. Se connecter et créer la base
use mediatheque_but3

// 2. Si vous refaites l'exercice, repartir de zéro
db.dropDatabase()
use mediatheque_but3

// 3. La base est créée automatiquement dès la première insertion !
// Pas besoin de CREATE DATABASE comme en SQL
```

#### 📚 Insertion des livres avec documents imbriqués

Observez bien la structure avant d'exécuter le code :

```javascript
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


