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

### Lien avec le projet final
Cette séance pose les fondations pour votre projet fil rouge, une plateforme IoT de monitoring urbain. Les concepts d'aujourd'hui (documents flexibles, tableaux embarqués, timestamps) seront essentiels pour stocker les données de capteurs que vous manipulerez dans les prochaines séances.

### Prérequis
- Maîtrise du SQL (SELECT, JOIN, normalisation)
- Bases de JavaScript ou Python
- Compte email universitaire valide

---

## Création de votre fork du TP

La première chose que vous allez faire est de créer un fork personnel du présent dépôt. Pour ce faire, rendez-vous sur le lien suivant :

<https://classroom.github.com/a/>

GitHub va vous créer un dépôt contenant un fork du dépôt 'IUTInfoAix-R510/Tp1' et s'appelant 'IUTInfoAix-R510/Tp1-votreUsername'. Vous apparaîtrez automatiquement comme contributeur de ce projet pour y pousser votre travail.

## Ouverture de GitHub Codespace

Une fois votre fork créé, vous pouvez ouvrir le projet directement dans GitHub Codespace :

1. Rendez-vous sur votre dépôt GitHub (`IUTInfoAix-R510/Tp1-votreUsername`)
2. Cliquez sur le bouton vert **Code**
3. Sélectionnez l'onglet **Codespaces**
4. Cliquez sur **Create codespace on main**

GitHub va créer un environnement de développement complet dans le cloud. Après quelques instants, vous aurez accès à VS Code directement dans votre navigateur avec :
- Node.js et toutes les dépendances déjà installées
- L'extension MongoDB fonctionnelle
- Accès à mongosh

Pour ouvrir le playgroung de ce TP :
- Dans l'explorateur de fichiers (à gauche), cliquez sur le fichier `playground-tp1.mongodb.js`
- Le notebook s'ouvrira et vous pourrez exécuter vos requêtes

**Note** : GitHub offre 60 heures gratuites de Codespace par mois pour les comptes personnels.

---

## 📝 Rendu du travail

### Utilisation du fichier playground

Pour faciliter le rendu de votre travail, un fichier `playground-tp1.mongodb.js` est mis à votre disposition. Ce fichier contient tous les exercices du TP organisés par phase et par section.

#### 🚀 Comment utiliser le playground

1. **Personnalisation initiale**
   - Ouvrez le fichier `playground-tp1.mongodb.js`
   - Remplissez vos informations en haut du fichier (nom, prénom, date, groupe)
   - Remplacez `tp_mongodb_prenom_nom` par votre nom personnalisé (ex: `tp_mongodb_alice_martin`)

2. **Pendant le TP**
   - Naviguez vers la section correspondant à l'exercice en cours
   - Chaque exercice a son emplacement dédié avec l'objectif rappelé
   - Écrivez votre code sous le commentaire `// Votre réponse :`
   - Testez vos requêtes directement dans VS Code avec l'extension MongoDB

3. **Avant de rendre**
   - Vérifiez la checklist finale à la fin du fichier
   - Assurez-vous que toutes vos requêtes fonctionnent
   - Ajoutez des commentaires pour expliquer les requêtes complexes
   - Vérifiez qu'il n'y a pas d'erreurs de syntaxe

4. **Méthode de rendu**
   - Committez et poussez votre fichier `playground-tp1.mongodb.js` complété
   - Le rendu se fait sur le repo GitHub créé en acceptant le devoir (voir section "Création de votre fork du TP")
   - Date limite : voir la date indiquée sur GitHub Classroom

#### 💡 Conseils
- Sauvegardez régulièrement votre travail et pensez à versionner après chaque exercice
- N'oubliez pas de copier-coller les données d'insertion fournies dans le README (sections 3.3 et 4.1)
- Utilisez la zone "Notes et remarques" pour noter vos questions ou difficultés
- Les exercices 1 à 49 sont tous à faire.

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

## 💻 Phase 2 : Installation et configuration (45 min)

**Objectif :** Créer un environnement MongoDB professionnel et gratuit dans le cloud. À la fin de cette phase, vous aurez :
- Un cluster MongoDB hébergé gratuitement (512 Mo)
- Les outils nécessaires pour interagir avec MongoDB
- Une connexion fonctionnelle testée

---

### 2.1 Création du compte MongoDB Atlas (10 min)

#### 🤔 Qu'est-ce que MongoDB Atlas ?

**MongoDB Atlas** est le service cloud officiel de MongoDB. C'est une **Database-as-a-Service (DBaaS)** qui vous permet d'avoir une base de données MongoDB sans installer de logiciel sur votre machine.

**Avantages :**
- ✅ Gratuit jusqu'à 512 Mo (largement suffisant pour apprendre)
- ✅ Accessible depuis n'importe où (IUT, maison, mobile)
- ✅ Sauvegardes automatiques
- ✅ Monitoring intégré
- ✅ Pas de configuration serveur nécessaire

**Architecture simplifiée :**
```
Votre ordinateur (client)
    ↓ Internet
MongoDB Atlas (cloud AWS/Google/Azure)
    ↓
Replica Set (3 serveurs pour haute disponibilité)
    ↓
Vos données (documents JSON)
```

---

#### 📝 Étape 1.1 : Inscription

1. **Ouvrir votre navigateur** et aller sur : https://www.mongodb.com/atlas/database

2. **Cliquer sur "Try Free"** (en haut à droite)

3. **Remplir le formulaire d'inscription :**
   ```
   ┌─────────────────────────────────────┐
   │ Email : votre.nom@etu.univ-amu.fr   │
   │ Password : ********** (min 8 car.)  │
   │ First Name : Votre prénom           │
   │ Last Name : Votre nom               │
   │ Company : Aix-Marseille Université  │
   │ ☑ I agree to the Terms of Service   │
   │                                     │
   │        [Create your account]        │
   └─────────────────────────────────────┘
   ```

   ⚠️ **Conseils pour le mot de passe :**
   - Au moins 8 caractères
   - Mélange de majuscules, minuscules et chiffres
   - Notez-le immédiatement dans un fichier texte sécurisé
   - Exemple valide : `MongoTP2024!`

4. **Vérifier votre email**
   - Ouvrir votre boîte mail universitaire
   - Chercher l'email de MongoDB (vérifier les spams si besoin)
   - Cliquer sur "Verify Email"

5. **Questionnaire de bienvenue** (optionnel mais rapide)
   ```
   What is your goal? → "Learn MongoDB"
   What's your experience level? → "Student"
   What language will you use? → "JavaScript"
   ```

✅ **Checkpoint :** Vous devez maintenant voir le tableau de bord Atlas avec le bouton "Build a Database"

---

### 2.2 Déploiement du cluster gratuit (15 min)

#### 🤔 Qu'est-ce qu'un cluster ?

Un **cluster** est un groupe de serveurs MongoDB qui travaillent ensemble. Même dans l'offre gratuite, Atlas vous donne un **Replica Set** de 3 serveurs :
- 1 serveur **Primary** (lecture + écriture)
- 2 serveurs **Secondary** (copies automatiques pour sécurité)

Si le Primary tombe en panne → un Secondary devient automatiquement Primary. Vos données sont donc **toujours disponibles** !

---

#### 📝 Étape 2.1 : Créer le cluster

1. **Cliquer sur "Build a Database"** (gros bouton vert au centre)

2. **Choisir le plan gratuit :**
   ```
   ┌──────────────────────────────────────────┐
   │ Shared Clusters                          │
   │ ┌────────────────────────────────────┐   │
   │ │ M0 Sandbox (SHARED)         FREE   │ ← Choisir celui-ci
   │ │ 512 MB Storage                     │
   │ │ Shared RAM                         │
   │ │ No backup                          │
   │ │        [Create cluster]            │
   │ └────────────────────────────────────┘   │
   └──────────────────────────────────────────┘
   ```

3. **Configuration du cluster :**

   **a) Cloud Provider & Region**
   ```
   Provider : AWS (recommandé pour l'Europe)
   ┌─────────────────────────────────────────┐
   │ Region : Paris (eu-west-3)       5ms    │ ← IMPORTANT
   │ Region : Frankfurt (eu-central-1) 15ms  │
   │ Region : Ireland (eu-west-1)     25ms   │
   └─────────────────────────────────────────┘
   ```

   💡 **Pourquoi Paris ?** La latence (temps de réponse) sera meilleure depuis Aix-en-Provence. Mais si Paris est indisponible, Frankfurt ou Ireland fonctionnent très bien aussi.

   **b) Cluster Tier**
   ```
   M0 Sandbox (FREE forever) ← Déjà sélectionné
   512 MB Storage
   Shared RAM
   ```

   **c) Cluster Name**
   ```
   Cluster Name : BUT3-VotreNom
   Exemple : BUT3-Nedjar ou BUT3-Maria
   ```

   💡 Ce nom vous aidera à identifier votre cluster si vous en créez plusieurs.

4. **Cliquer sur "Create Cluster"** (en bas à droite)

⏱️ **Patience !** Le cluster prend 1 à 3 minutes à démarrer. Vous verrez :
```
┌──────────────────────────────────────┐
│ BUT3-VotreNom                        │
│ Status : Creating...  [||||    ]     │
│ Region : Paris (eu-west-3)           │
└──────────────────────────────────────┘
```

Puis :
```
┌──────────────────────────────────────┐
│ BUT3-VotreNom              ✓ Active  │
│ Connection String : mongodb+srv://.. │
│ [Connect] [Browse Collections]       │
└──────────────────────────────────────┘
```

✅ **Checkpoint :** Votre cluster affiche "Active" avec une pastille verte

---

#### 📝 Étape 2.2 : Configuration de la sécurité

MongoDB Atlas a 2 niveaux de sécurité obligatoires :
1. **Authentification** : username + password
2. **Autorisation réseau** : liste des IP autorisées

**a) Créer un utilisateur de base de données**

Un message apparaît : "Security Quickstart"
```
┌────────────────────────────────────────────┐
│ How would you like to authenticate?        │
│ ○ Username and Password (recommended)      │ ← Sélectionner
│ ○ Certificate                              │
│                                            │
│ Username : etudiant                        │
│ Password : [Generate]  [Copy]  □ Show      │
│                                            │
│ ⚠️ IMPORTANT: Save this password!          │
│ You won't be able to see it again.         │
│                                            │
│        [Create User]                       │
└────────────────────────────────────────────┘
```

⚠️ **TRÈS IMPORTANT :**
1. Cliquer sur **"Generate"** pour générer un mot de passe sécurisé
2. Cliquer sur **"Copy"** pour copier le mot de passe
3. **COLLER le mot de passe dans un fichier texte** (NotePad, VS Code, etc.)
4. Nommer ce fichier `mongo-credentials.txt` et le sauvegarder

Exemple de mot de passe généré : `Xy7$mK9pQ2nL`

💡 Si vous perdez ce mot de passe, il faudra en créer un nouveau dans Atlas → Database Access

**b) Autoriser l'accès réseau**

Atlas affiche ensuite :
```
┌────────────────────────────────────────────┐
│ Where would you like to connect from?      │
│                                            │
│ ☑ My Local Environment                     │
│                                            │
│ Add entries to your IP Access List:        │
│                                            │
│ [Add My Current IP Address]                │ ← Cliquer ici d'abord
│                                            │
│ IP Address : 92.154.78.142 ✓ Added         │
│                                            │
│ Then, for learning purposes only:          │
│ [Add IP Address]                           │ ← Puis cliquer ici
│   IP : 0.0.0.0/0                           │ ← Taper ceci
│   Description : Accès universel            │
│   [Add Entry]                              │
└────────────────────────────────────────────┘
```

**Pourquoi 0.0.0.0/0 ?**
- Cela signifie "autoriser toutes les IP"
- ⚠️ **DANGER en production** mais **OK pour apprendre**
- Permet de se connecter depuis l'IUT, la maison, un café, etc.
- Vos données restent protégées par le username/password

5. **Cliquer sur "Finish and Close"**

✅ **Checkpoint :** Vous voyez votre cluster avec le bouton "Connect" actif

---

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

### 2.3 Installation des outils (20 min)

Pour interagir avec MongoDB, nous allons installer 3 outils complémentaires :

| Outil | Type | Usage | Quand l'utiliser |
|-------|------|-------|------------------|
| **MongoDB Compass** | Interface graphique (GUI) | Explorer visuellement les données | Découvrir, visualiser, déboguer |
| **mongosh** | Ligne de commande (CLI) | Exécuter des requêtes MongoDB | Scripts, automatisation, TP |
| **VS Code Extension** | Intégré à l'éditeur | Coder et tester rapidement | Développement d'applications |

💡 **Conseil :** Installez les 3 ! Vous utiliserez Compass au début, puis de plus en plus mongosh.

---

#### 📝 Étape 3.1 : Installer MongoDB Compass

**MongoDB Compass** est l'interface graphique officielle de MongoDB. C'est comme phpMyAdmin pour MySQL mais en beaucoup plus moderne !

**1. Téléchargement**
- Aller sur : https://www.mongodb.com/products/compass
- Cliquer sur "Download Compass"
- Choisir votre système d'exploitation (détecté automatiquement)
- **Important :** Télécharger la version **Compass** (pas Compass Readonly)

**2. Installation**

**Windows :**
```
1. Double-cliquer sur le fichier .exe téléchargé
2. Accepter les permissions administrateur
3. Laisser les options par défaut
4. Attendre l'installation (2-3 minutes)
5. Cocher "Launch MongoDB Compass"
```

**macOS :**
```
1. Ouvrir le fichier .dmg
2. Glisser MongoDB Compass dans Applications
3. Ouvrir Applications → MongoDB Compass
4. Autoriser l'ouverture (Sécurité système)
```

**Linux :**
```bash
# Ubuntu/Debian
wget https://downloads.mongodb.com/compass/mongodb-compass_1.42.0_amd64.deb
sudo dpkg -i mongodb-compass_1.42.0_amd64.deb

# Fedora/Red Hat
sudo rpm -i mongodb-compass-1.42.0.x86_64.rpm
```

**3. Première connexion à votre cluster**

a) **Dans MongoDB Atlas :**
   ```
   1. Cliquer sur le bouton "Connect" de votre cluster
   2. Choisir "Connect with MongoDB Compass"
   3. Copier la connection string :

   mongodb+srv://etudiant:<password>@but3-votrenom.xxxxx.mongodb.net/
   ```

b) **Dans MongoDB Compass :**
   ```
   ┌────────────────────────────────────────────────┐
   │ New Connection                                 │
   │                                                │
   │ URI : mongodb+srv://etudiant:Xy7$mK9pQ2nL@...  │
   │                                                │
   │ ⚠️ IMPORTANT : Remplacer <password> par        │
   │    votre vrai mot de passe !                   │
   │                                                │
   │ [Save & Connect]                               │
   └────────────────────────────────────────────────┘
   ```

c) **Vérification :**
   Après connexion, vous devez voir dans la barre latérale gauche :
   ```
   📁 Databases
    ├─ admin (0.00 GB)
    ├─ config (0.00 GB)
    └─ local (0.00 GB)
   ```

   💡 Ces 3 bases sont des bases système MongoDB. C'est normal de les voir vides !

✅ **Checkpoint :** Compass affiche 3 bases de données (admin, config, local)

---

#### 📝 Étape 3.2 : Installer mongosh (MongoDB Shell)

**mongosh** est le shell en ligne de commande pour MongoDB. C'est l'outil principal pour les TP !

**Pourquoi utiliser le shell ?**
- ✅ Plus rapide que Compass pour les requêtes simples
- ✅ Permet de créer des scripts
- ✅ Nécessaire pour les fonctions avancées
- ✅ Utilisé en production par tous les DevOps

**Installation selon votre système :**

**Windows :**
```powershell
# Méthode 1 : Avec winget (recommandé, Windows 10+)
winget install MongoDB.Shell

# Méthode 2 : Manuelle
# 1. Télécharger depuis : https://www.mongodb.com/try/download/shell
# 2. Extraire le ZIP
# 3. Ajouter le dossier bin\ au PATH Windows
```

**macOS :**
```bash
# Avec Homebrew (recommandé)
brew tap mongodb/brew
brew install mongosh

# Ou téléchargement manuel depuis mongodb.com
```

**Linux :**
```bash
# Ubuntu/Debian
wget -qO- https://www.mongodb.org/static/pgp/server-7.0.asc | sudo tee /etc/apt/trusted.gpg.d/server-7.0.asc
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-mongosh

# Fedora
sudo dnf install mongodb-mongosh
```

**Vérification de l'installation :**
```bash
mongosh --version
```

**Résultat attendu :**
```
2.1.1
```

✅ **Checkpoint :** La commande `mongosh --version` affiche un numéro de version

---

#### 📝 Étape 3.3 : Première connexion avec mongosh

**1. Récupérer votre connection string**

Dans Atlas :
```
1. Cluster → Connect
2. Choisir "Connect with MongoDB Shell"
3. Copier la commande :

mongosh "mongodb+srv://but3-votrenom.xxxxx.mongodb.net/" --apiVersion 1 --username etudiant
```

**2. Se connecter**

```bash
# Coller la commande dans votre terminal
mongosh "mongodb+srv://but3-votrenom.xxxxx.mongodb.net/" --apiVersion 1 --username etudiant

# Il vous demande le mot de passe :
Enter password: ************
```

**3. Vérification**

Si la connexion réussit, vous voyez :

```
Current Mongosh Log ID:	6925728bf10e4a985d9dc29c
Connecting to:		mongodb+srv://<credentials>@cluster0.ltkb5jb.mongodb.net/?appName=mongosh+2.5.9
Using MongoDB:		8.0.16 (API Version 1)
Using Mongosh:		2.5.9

For mongosh info see: https://www.mongodb.com/docs/mongodb-shell/

Atlas atlas-prqm4y-shard-0 [primary] test> 
```

💡 Le prompt `test>` signifie que vous êtes connecté à la base "test" par défaut.

**4. Tester quelques commandes**

```javascript
// Afficher la version de MongoDB
db.version()
// → 8.0.16

// Lister les bases de données
show dbs
// → sample_mflix  113.63 MiB
// → sample_sales   72.00 KiB
// → admin         360.00 KiB
// → local           6.45 GiB

// Afficher la base actuelle
db
// → test

// Quitter mongosh
exit
```

✅ **Checkpoint :** Vous pouvez exécuter `show dbs` et voir les 3 bases système

---

#### 📝 Étape 3.4 : Installer l'extension VS Code (optionnel mais recommandé)

**Pourquoi cette extension ?**
- ✅ Exécuter des requêtes MongoDB directement depuis VS Code
- ✅ Autocomplétion intelligente
- ✅ Visualiser les résultats dans l'éditeur
- ✅ Créer des playgrounds (fichiers .mongodb)

**Installation :**

1. **Ouvrir VS Code**

2. **Aller dans les Extensions**
   - Raccourci : `Ctrl+Shift+X` (Windows/Linux) ou `Cmd+Shift+X` (Mac)
   - Ou cliquer sur l'icône Extensions dans la barre latérale

3. **Rechercher "MongoDB"**
   ```
   Rechercher : MongoDB

   Résultat :
   ┌─────────────────────────────────────────┐
   │ MongoDB for VS Code                     │
   │ by MongoDB                              │
   │ 5M+ downloads                           │
   │ [Install]                               │
   └─────────────────────────────────────────┘
   ```

4. **Installer l'extension officielle**
   - Chercher celle publiée par "MongoDB" (pas les autres !)
   - Cliquer sur "Install"

5. **Se connecter à Atlas**

   a) Ouvrir la palette de commandes :
   - `Ctrl+Shift+P` (Windows/Linux) ou `Cmd+Shift+P` (Mac)

   b) Taper : `MongoDB: Connect`

   c) Choisir "Connect with Connection String"

   d) Coller votre connection string :
   ```
   mongodb+srv://etudiant:VotreMotDePasse@but3-votrenom.xxxxx.mongodb.net/
   ```

6. **Vérification**

   Dans la barre latérale gauche, vous voyez maintenant une icône MongoDB (feuille verte).
   Cliquer dessus affiche vos connexions :
   ```
   CONNECTIONS
   └─ 📁 but3-votrenom
       ├─ admin
       ├─ config
       └─ local
   ```

7. **Créer un playground (optionnel)**

   ```
   1. Command Palette → "MongoDB: Create MongoDB Playground"
   2. Un fichier playground-1.mongodb s'ouvre
   3. Essayer cette commande :

   use('test')
   db.getCollectionNames()

   4. Cliquer sur le bouton ▶ "Run" en haut
   5. Les résultats s'affichent en dessous
   ```

✅ **Checkpoint :** L'extension MongoDB affiche votre cluster dans la barre latérale

---

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

### ✅ Point de validation final #1

**Avant de passer à la Phase 3, vérifiez que vous avez :**

**Compte et Cluster**
- [ ] Compte MongoDB Atlas créé et vérifié
- [ ] Cluster M0 déployé et actif (pastille verte)
- [ ] Utilisateur "etudiant" créé avec mot de passe sauvegardé
- [ ] IP 0.0.0.0/0 ajoutée dans Network Access

**Outils installés**
- [ ] MongoDB Compass installé et connecté
- [ ] Les 3 bases système visibles dans Compass (`admin`, `config`, `local`)
- [ ] `mongosh --version` fonctionne dans le terminal
- [ ] `mongosh` peut se connecter à Atlas
- [ ] Extension VS Code installée (optionnel)

**Tests de connexion**

Essayez ces commandes dans mongosh pour vérifier que tout fonctionne :

```javascript
// 1. Afficher la version
db.version()
// ✅ Doit afficher : 7.0.x

// 2. Lister les bases
show dbs
// ✅ Doit afficher : admin, config, local

// 3. Créer une base de test
use test_connexion
// ✅ Doit afficher : switched to db test_connexion

// 4. Insérer un document test
db.test.insertOne({message: "Ça marche !", date: new Date()})
// ✅ Doit afficher : acknowledged: true, insertedId: ObjectId('...')

// 5. Lire le document
db.test.find()
// ✅ Doit afficher votre document avec le message

// 6. Nettoyer
db.test.drop()
use test_connexion
db.dropDatabase()
// ✅ Base de test supprimée
```

**Si tous les tests passent** → Vous êtes prêt pour la Phase 3 ! 🎉

**Si un test échoue** → Relire la section troubleshooting ci-dessus ou demander de l'aide à l'enseignant.

---

### 📊 Récapitulatif de la Phase 2

**Ce que vous avez appris :**
1. MongoDB Atlas = base de données MongoDB dans le cloud (gratuite jusqu'à 512 Mo)
2. Replica Set = 3 serveurs pour haute disponibilité
3. Connection String = URL pour se connecter à MongoDB
4. Compass = interface graphique (comme phpMyAdmin)
5. mongosh = shell en ligne de commande (outil principal pour les TP)
6. Sécurité à 2 niveaux : username/password + liste IP

**Temps passé :** ~45 minutes

**Outils installés :** Compass, mongosh, VS Code extension

**Prochaine étape :** Phase 3 - Premières manipulations MongoDB

---

## 🔨 Phase 3 : Premières manipulations MongoDB (45 min)

### 3.1 Concepts fondamentaux (5 min)

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

### 3.2 Insertion progressive de documents (10 min)

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

### 3.3 Requêtes basiques (5 min)

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

### 3.4 Exercices d'interrogation de données (10 min)

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

### 3.5 Exercices de modification de données (10 min)

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

### 3.6 Exercices de suppression de données (5 min)

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

### ✅ Point de validation #2

**Avant de passer à la Phase 4, vérifiez que vous maîtrisez :**

**Opérations CRUD de base**
- [ ] Créer une base et une collection (`use`, `insertOne`, `insertMany`)
- [ ] Insérer des documents avec différentes structures
- [ ] Interroger des documents avec `find()`, `findOne()`
- [ ] Utiliser les opérateurs de comparaison (`$gt`, `$lt`, `$in`, etc.)
- [ ] Utiliser les opérateurs logiques (`$and`, `$or`, `$not`)
- [ ] Modifier des documents avec `updateOne()`, `updateMany()`
- [ ] Utiliser les opérateurs de mise à jour (`$set`, `$inc`, `$push`, etc.)
- [ ] Supprimer des documents avec `deleteOne()`, `deleteMany()`

**Tests de validation**

Essayez ces commandes pour vérifier votre compréhension :

```javascript
// 1. Créer une collection test
use validation_test
db.test_validation.drop()

// 2. Insérer des documents variés
db.test_validation.insertMany([
    {nom: "Produit A", prix: 100, stock: 50, categorie: "Électronique"},
    {nom: "Produit B", prix: 200, stock: 30, categorie: "Informatique"},
    {nom: "Produit C", prix: 150, stock: 0, categorie: "Électronique"}
])

// 3. Requête avec opérateur
db.test_validation.find({prix: {$gte: 150}})
// ✅ Doit retourner Produit B et C

// 4. Mise à jour
db.test_validation.updateOne(
    {nom: "Produit C"},
    {$inc: {stock: 10}}
)
// ✅ Doit incrémenter le stock de 10

// 5. Vérification
db.test_validation.findOne({nom: "Produit C"})
// ✅ stock doit être 10

// 6. Suppression conditionnelle
db.test_validation.deleteMany({categorie: "Informatique"})
// ✅ Doit supprimer Produit B

// 7. Comptage final
db.test_validation.countDocuments()
// ✅ Doit afficher 2

// 8. Nettoyage
db.test_validation.drop()
```

**Si tous les tests passent** → Vous êtes prêt pour la Phase 4 ! 🎉

**Si un test échoue** → Relire les sections 3.4, 3.5, 3.6 ou refaire les exercices

---

### 📊 Récapitulatif de la Phase 3

**Ce que vous avez appris :**
1. Les 4 opérations CRUD : Create (insert), Read (find), Update (update), Delete (delete)
2. Structure hiérarchique : Serveur → Base → Collection → Document
3. Documents MongoDB = objets JSON avec `_id` automatique
4. Opérateurs de requête pour filtrer les données (`$gt`, `$lt`, `$in`, `$regex`)
5. Opérateurs de modification pour transformer les données (`$set`, `$inc`, `$push`, `$pull`)
6. Différence entre opérations "One" (un seul document) et "Many" (plusieurs)
7. Importance de tester avec `find()` avant `update()` ou `delete()`

**Temps passé :** ~45 minutes
**Exercices réalisés :** 23 exercices progressifs sur la collection `employes`
**Prochaine étape :** Phase 4 - Modélisation avancée et documents imbriqués

---

## 🎯 Phase 4 : CRUD complet sur cas concret (60 min)

Cette phase vous permet de mettre en pratique **tous les concepts vus précédemment** sur un cas réel : une médiathèque. Vous allez découvrir comment modéliser des données complexes avec des **documents imbriqués** et des **tableaux**, puis réaliser des opérations avancées.

---

### 4.1 Contexte et modélisation guidée (10 min)

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
```

#### 💡 Analyse de la structure des livres

Prenons le temps d'analyser ce que nous venons d'insérer :

**1. Objets imbriqués (nested objects)**
```javascript
auteur: {
    nom: "Saint-Exupéry",
    prenom: "Antoine de",
    nationalite: "Française"
}
// ✅ Un seul auteur par livre → objet simple
```

**2. Tableaux d'objets (arrays of objects)**
```javascript
exemplaires: [
    {code: "LPP-001", etat: "Bon", disponible: true},
    {code: "LPP-002", etat: "Usé", disponible: false},
    {code: "LPP-003", etat: "Neuf", disponible: true}
]
// ✅ Plusieurs exemplaires par livre → tableau
```

**3. Imbrication à 3 niveaux**
```javascript
exemplaires: [
    {
        code: "LPP-002",
        emprunt_actuel: {           // ← Niveau 3 !
            membre_id: "M001",
            date_emprunt: new Date("2024-01-10")
        }
    }
]
// ✅ Un emprunt est imbriqué dans un exemplaire, lui-même dans un livre
```

**4. Schéma flexible**
```javascript
// Certains exemplaires ont "emplacement", d'autres "emprunt_actuel"
{disponible: true, emplacement: "Rayon A3"}           // Disponible
{disponible: false, emprunt_actuel: {...}}            // Emprunté
// ✅ Pas de schéma fixe : on ajoute les champs selon le contexte
```

#### 👥 Insertion des membres

```javascript
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

#### ✅ Point de validation #3

Vérifiez votre compréhension avant de continuer :

**Quiz rapide :**
1. Quelle est la différence entre un objet imbriqué et un tableau d'objets ?
2. Pourquoi embarque-t-on les exemplaires dans les livres plutôt que de créer une collection séparée ?
3. Comment MongoDB sait-il qu'un document appartient à la collection "livres" ?

<details>
<summary>💡 Réponses</summary>

1. **Objet imbriqué** = 1 seule valeur (ex: `auteur`). **Tableau d'objets** = plusieurs valeurs (ex: `exemplaires`)
2. Parce qu'on lit souvent un livre avec tous ses exemplaires → une seule requête au lieu de JOIN
3. Par le nom de la collection : `db.livres.insertMany()` insère dans "livres", `db.membres.insertMany()` dans "membres"
</details>

**Checklist :**
- [ ] J'ai compris la différence entre embedding et références
- [ ] Je sais identifier un objet imbriqué dans un document
- [ ] Je comprends la structure à 3 niveaux (livre → exemplaire → emprunt)
- [ ] J'ai inséré les données et vérifié avec `db.livres.countDocuments()`

---

### 4.2 Exercices d'interrogation sur documents imbriqués (15 min)

Maintenant que vous avez des données complexes, apprenons à les interroger efficacement ! Ces exercices vous apprennent la **notation pointée**, essentielle pour travailler avec des documents imbriqués.

#### Exercice 24 : Requête sur un champ imbriqué (objet simple)
**Objectif :** Trouver tous les livres écrits par un auteur de nationalité "Britannique"

**Ce que vous devez pratiquer :** Notation pointée pour accéder à un champ dans un objet imbriqué

<details>
<summary>💡 Solution</summary>

```javascript
db.livres.find({"auteur.nationalite": "Britannique"})
```

**Explications :**
- **Notation pointée** : `"auteur.nationalite"` pour accéder à un champ dans un objet
- ⚠️ **Les guillemets sont OBLIGATOIRES** autour de `"auteur.nationalite"`
- Équivalent SQL : `SELECT * FROM livres WHERE auteur_nationalite = 'Britannique'`

**Pour vérifier :**
```javascript
// Afficher seulement le titre et l'auteur
db.livres.find(
    {"auteur.nationalite": "Britannique"},
    {titre: 1, auteur: 1, _id: 0}
)
```
</details>

---

#### Exercice 25 : Requête sur un tableau d'objets
**Objectif :** Trouver tous les livres qui ont **au moins un exemplaire disponible**

**Ce que vous devez pratiquer :** Requête dans un tableau d'objets

<details>
<summary>💡 Solution</summary>

```javascript
db.livres.find({"exemplaires.disponible": true})
```

**Explications :**
- MongoDB cherche automatiquement dans **tous les éléments du tableau** `exemplaires`
- La requête retourne le livre si **au moins un** exemplaire a `disponible: true`
- Cette requête trouve "Le Petit Prince" même s'il a 2 exemplaires disponibles et 1 emprunté

**Pour afficher uniquement les titres :**
```javascript
db.livres.find(
    {"exemplaires.disponible": true},
    {titre: 1, _id: 0}
)
```
</details>

---

#### Exercice 26 : Projection avec l'opérateur positionnel $
**Objectif :** Trouver les livres disponibles, mais afficher SEULEMENT le premier exemplaire disponible (pas tous)

**Ce que vous devez pratiquer :** Utilisation de l'opérateur `$` dans les projections

<details>
<summary>💡 Solution</summary>

```javascript
db.livres.find(
    {"exemplaires.disponible": true},
    {titre: 1, "exemplaires.$": 1}
)
```

**Explications :**
- `"exemplaires.$"` = retourne SEULEMENT le **premier élément du tableau qui match** le critère
- Utile pour éviter de récupérer tous les exemplaires quand on n'en veut qu'un
- ⚠️ Limitation : on ne peut pas obtenir plusieurs éléments qui matchent, seulement le premier

**Différence :**
```javascript
// Sans $ : retourne TOUS les exemplaires
{titre: 1, exemplaires: 1}

// Avec $ : retourne SEULEMENT le premier qui match
{titre: 1, "exemplaires.$": 1}
```
</details>

---

#### Exercice 27 : Requête sur imbrication à 3 niveaux
**Objectif :** Trouver tous les livres qui ont un exemplaire emprunté par le membre "M001"

**Ce que vous devez pratiquer :** Notation pointée à 3 niveaux (livre → exemplaire → emprunt)

<details>
<summary>💡 Solution</summary>

```javascript
db.livres.find({"exemplaires.emprunt_actuel.membre_id": "M001"})
```

**Explications :**
- Notation pointée à **3 niveaux** : `exemplaires.emprunt_actuel.membre_id`
- MongoDB parcourt le tableau `exemplaires`, puis cherche dans chaque objet `emprunt_actuel`
- Retourne les livres où **au moins un exemplaire** est emprunté par M001

**Afficher plus d'informations :**
```javascript
db.livres.find(
    {"exemplaires.emprunt_actuel.membre_id": "M001"},
    {
        titre: 1,
        "exemplaires.$": 1  // Afficher l'exemplaire concerné
    }
)
```
</details>

---

#### Exercice 28 : Requête avec $in sur un tableau simple
**Objectif :** Trouver tous les livres de la catégorie "Jeunesse" OU "Fantasy"

**Ce que vous devez pratiquer :** Recherche avec plusieurs valeurs dans un tableau

<details>
<summary>💡 Solution</summary>

```javascript
db.livres.find({categories: {$in: ["Jeunesse", "Fantasy"]}})
```

**Explications :**
- `$in` : vérifie si **au moins une** valeur du tableau `categories` est dans la liste fournie
- Équivalent SQL : `WHERE categories IN ('Jeunesse', 'Fantasy')`
- ⚠️ Attention : cela retourne les livres qui ont "Jeunesse" **OU** "Fantasy", pas forcément les deux

**Pour trouver les livres qui ont les DEUX catégories :**
```javascript
db.livres.find({
    categories: {$all: ["Jeunesse", "Fantasy"]}
})
```
</details>

---

#### Exercice 29 : Compter les exemplaires d'un livre
**Objectif :** Combien d'exemplaires possède le livre "Harry Potter à l'école des sorciers" ?

**Ce que vous devez pratiquer :** Projection + manipulation de tableau dans le shell

<details>
<summary>💡 Solution</summary>

```javascript
// Méthode 1 : Récupérer et compter manuellement
let livre = db.livres.findOne({titre: "Harry Potter à l'école des sorciers"})
print(`Nombre d'exemplaires : ${livre.exemplaires.length}`)

// Méthode 2 : Avec agrégation (plus avancé)
db.livres.aggregate([
    {$match: {titre: "Harry Potter à l'école des sorciers"}},
    {$project: {
        titre: 1,
        nombre_exemplaires: {$size: "$exemplaires"}
    }}
])
```

**Explications :**
- `livre.exemplaires.length` : JavaScript standard pour compter les éléments d'un tableau
- `$size` dans l'agrégation : compte les éléments d'un tableau côté serveur
- L'agrégation est plus performante pour de gros volumes
</details>

---

#### Exercice 30 : Requête avec date (retards)
**Objectif :** Trouver tous les livres avec des exemplaires dont la date de retour prévue est dépassée (en retard)

**Ce que vous devez pratiquer :** Comparaison de dates avec `$lt`

<details>
<summary>💡 Solution</summary>

```javascript
let aujourd_hui = new Date()

db.livres.find({
    "exemplaires.emprunt_actuel.date_retour_prevue": {$lt: aujourd_hui}
})
```

**Explications :**
- `new Date()` : crée un objet Date avec la date/heure actuelle
- `$lt: aujourd_hui` : "less than" = inférieur à aujourd'hui = en retard
- MongoDB compare automatiquement les dates

**Afficher les informations pertinentes :**
```javascript
db.livres.find(
    {"exemplaires.emprunt_actuel.date_retour_prevue": {$lt: new Date()}},
    {
        titre: 1,
        "exemplaires.emprunt_actuel": 1
    }
)
```

**Conseil :** En production, on créerait un index sur `exemplaires.emprunt_actuel.date_retour_prevue` pour accélérer cette requête fréquente.
</details>

---

#### Exercice 31 : Requête complexe combinée
**Objectif :** Trouver les livres de "Fantasy" avec une note supérieure à 4.5, publiés après 1990, triés par popularité

**Ce que vous devez pratiquer :** Combiner plusieurs critères avec notation pointée, tri et projection

<details>
<summary>💡 Solution</summary>

```javascript
db.livres.find(
    {
        categories: "Fantasy",
        note_moyenne: {$gt: 4.5},
        "publication.annee": {$gt: 1990}
    },
    {
        titre: 1,
        auteur: 1,
        note_moyenne: 1,
        nombre_emprunts_total: 1,
        _id: 0
    }
).sort({nombre_emprunts_total: -1})
```

**Explications :**
- Combinaison de 3 critères (AND implicite)
- `categories: "Fantasy"` : recherche dans le tableau
- `"publication.annee": {$gt: 1990}` : notation pointée sur objet imbriqué
- `sort({nombre_emprunts_total: -1})` : tri décroissant (les plus populaires d'abord)

**Résultat attendu :** Harry Potter (4.9, 234 emprunts)
</details>

---

#### 🎯 Exercice bonus : Recherche textuelle avec $regex
**Objectif :** Trouver tous les livres dont le titre contient "Harry" (insensible à la casse)

**Ce que vous devez pratiquer :** Recherche avec expressions régulières

<details>
<summary>💡 Solution</summary>

```javascript
db.livres.find({
    titre: {$regex: /Harry/i}  // i = insensible à la casse
})

// Ou avec une chaîne :
db.livres.find({
    titre: {$regex: "Harry", $options: "i"}
})
```

**Explications :**
- `$regex` : permet des recherches avec expressions régulières
- `/Harry/i` : le `i` rend la recherche insensible à la casse (HARRY = harry = Harry)
- Plus lent qu'une recherche exacte, mais plus flexible

**Pour une recherche plus performante :**
```javascript
// Créer un index textuel
db.livres.createIndex({titre: "text"})

// Recherche textuelle optimisée
db.livres.find({$text: {$search: "Harry"}})
```
</details>

---

#### ✅ Auto-évaluation

Avant de passer à la suite, vérifiez que vous maîtrisez :
- [ ] La notation pointée pour objets imbriqués (`"auteur.nom"`)
- [ ] La notation pointée pour tableaux d'objets (`"exemplaires.disponible"`)
- [ ] L'opérateur positionnel `$` dans les projections
- [ ] La notation pointée à 3 niveaux (`"a.b.c"`)
- [ ] L'opérateur `$in` pour chercher dans les tableaux
- [ ] La comparaison de dates avec `$lt`, `$gt`
- [ ] La combinaison de plusieurs critères sur documents complexes

⚠️ **Erreur fréquente à éviter :**
```javascript
// ❌ FAUX - provoque une erreur
db.livres.find({auteur.nom: "Orwell"})

// ✅ CORRECT - guillemets obligatoires
db.livres.find({"auteur.nom": "Orwell"})
```

---

### 4.3 Exercices de modification sur documents complexes (20 min)

Vous savez maintenant interroger des documents imbriqués. Apprenons à les **modifier** ! Cette section est cruciale pour comprendre comment mettre à jour des données dans des tableaux et objets imbriqués.

#### Exercice 32 : Modifier un champ imbriqué simple
**Objectif :** Corriger la nationalité de George Orwell : elle doit être "Anglaise" au lieu de "Britannique"

**Ce que vous devez pratiquer :** Utiliser `$set` avec notation pointée sur un objet imbriqué

<details>
<summary>💡 Solution</summary>

```javascript
db.livres.updateOne(
    {titre: "1984"},
    {$set: {"auteur.nationalite": "Anglaise"}}
)

// Vérifier le changement
db.livres.findOne(
    {titre: "1984"},
    {titre: 1, auteur: 1, _id: 0}
)
```

**Explications :**
- `$set` fonctionne aussi avec la notation pointée
- `"auteur.nationalite"` : guillemets obligatoires
- Seul le champ `nationalite` est modifié, les autres champs de `auteur` restent intacts
- Équivalent SQL : `UPDATE livres SET auteur_nationalite = 'Anglaise' WHERE titre = '1984'`
</details>

---

#### Exercice 33 : Ajouter un champ imbriqué
**Objectif :** Ajouter le site web officiel de J.K. Rowling dans le document Harry Potter

**Ce que vous devez pratiquer :** Ajouter un nouveau champ dans un objet imbriqué avec `$set`

<details>
<summary>💡 Solution</summary>

```javascript
db.livres.updateOne(
    {titre: "Harry Potter à l'école des sorciers"},
    {$set: {"auteur.site_web": "https://www.jkrowling.com"}}
)

// Vérifier
db.livres.findOne(
    {titre: "Harry Potter à l'école des sorciers"},
    {titre: 1, auteur: 1}
)
```

**Explications :**
- `$set` crée le champ `site_web` dans l'objet `auteur` s'il n'existe pas
- La structure reste cohérente : le site web est logiquement dans l'auteur
- Schéma flexible de MongoDB : on peut ajouter des champs à tout moment
</details>

---

#### Exercice 34 : Modifier un élément spécifique dans un tableau (opérateur positionnel $)
**Objectif :** L'exemplaire "LPP-001" du Petit Prince vient d'être abîmé. Changer son état de "Bon" à "Usé"

**Ce que vous devez pratiquer :** Utiliser l'opérateur positionnel `$` pour modifier un élément précis dans un tableau

<details>
<summary>💡 Solution</summary>

```javascript
db.livres.updateOne(
    {
        isbn: "978-2-07-036822-8",
        "exemplaires.code": "LPP-001"  // Critère : quel exemplaire ?
    },
    {
        $set: {"exemplaires.$.etat": "Usé"}  // $ = l'exemplaire qui match
    }
)

// Vérifier
db.livres.findOne(
    {isbn: "978-2-07-036822-8"},
    {titre: 1, exemplaires: 1}
)
```

**Explications :**
- `"exemplaires.code": "LPP-001"` dans le critère : identifie QUEL élément du tableau modifier
- `"exemplaires.$.etat"` : le `$` représente **l'élément du tableau qui a matché** le critère
- Sans `$`, MongoDB ne saurait pas quel exemplaire modifier
- ⚠️ Limitation : `$` ne modifie que le **premier** élément qui match

**Équivalent SQL :**
```sql
UPDATE exemplaires
SET etat = 'Usé'
WHERE livre_isbn = '978-2-07-036822-8' AND code = 'LPP-001'
```
</details>

---

#### Exercice 35 : Modifier un champ imbriqué à 3 niveaux
**Objectif :** Marie Dupont (M001) prolonge son emprunt du Petit Prince de 7 jours. Modifier la date de retour prévue

**Ce que vous devez pratiquer :** Opérateur `$` à 3 niveaux d'imbrication

<details>
<summary>💡 Solution</summary>

```javascript
// 1. D'abord, voir la date actuelle
db.livres.findOne(
    {"exemplaires.emprunt_actuel.membre_id": "M001"},
    {titre: 1, "exemplaires.$": 1}
)

// 2. Modifier la date (calculer nouvelle date)
let nouvelle_date = new Date("2024-01-31")  // 7 jours après la date initiale

db.livres.updateOne(
    {
        isbn: "978-2-07-036822-8",
        "exemplaires.emprunt_actuel.membre_id": "M001"
    },
    {
        $set: {
            "exemplaires.$.emprunt_actuel.date_retour_prevue": nouvelle_date
        }
    }
)

// 3. Vérifier
db.livres.findOne(
    {"exemplaires.emprunt_actuel.membre_id": "M001"},
    {titre: 1, "exemplaires.$": 1}
)
```

**Explications :**
- `"exemplaires.$.emprunt_actuel.date_retour_prevue"` : notation pointée à 3 niveaux avec `$`
- `$` représente l'exemplaire dont `emprunt_actuel.membre_id` vaut "M001"
- On modifie un champ profondément imbriqué dans le tableau
</details>

---

#### Exercice 36 : Ajouter un élément dans un tableau imbriqué (nouveau livre)
**Objectif :** La médiathèque achète un nouvel exemplaire du Petit Prince : code "LPP-004", état "Neuf", disponible, emplacement "Rayon A3"

**Ce que vous devez pratiquer :** Utiliser `$push` pour ajouter un objet dans un tableau

<details>
<summary>💡 Solution</summary>

```javascript
db.livres.updateOne(
    {isbn: "978-2-07-036822-8"},
    {
        $push: {
            exemplaires: {
                code: "LPP-004",
                etat: "Neuf",
                disponible: true,
                emplacement: "Rayon A3"
            }
        }
    }
)

// Vérifier
db.livres.findOne(
    {isbn: "978-2-07-036822-8"},
    {titre: 1, exemplaires: 1}
)
```

**Explications :**
- `$push` ajoute un nouvel objet complet à la fin du tableau `exemplaires`
- On peut ajouter un objet complexe avec plusieurs champs
- Le livre passe de 3 à 4 exemplaires
- Pas besoin d'opérateur `$` ici car on ajoute, on ne modifie pas un élément existant
</details>

---

#### Exercice 37 : Retirer un élément d'un tableau imbriqué
**Objectif :** L'exemplaire "1984-002" est perdu. Le retirer complètement de la base

**Ce que vous devez pratiquer :** Utiliser `$pull` pour supprimer un élément d'un tableau

<details>
<summary>💡 Solution</summary>

```javascript
db.livres.updateOne(
    {isbn: "978-2-253-00334-0"},
    {
        $pull: {
            exemplaires: {code: "1984-002"}
        }
    }
)

// Vérifier
db.livres.findOne(
    {isbn: "978-2-253-00334-0"},
    {titre: 1, exemplaires: 1}
)
```

**Explications :**
- `$pull` retire **tous les éléments** du tableau qui correspondent au critère
- `{code: "1984-002"}` : retire l'élément où `code` vaut "1984-002"
- Le livre "1984" passe de 2 à 1 exemplaire
- Alternative : `$pull` avec critères complexes : `{$pull: {exemplaires: {etat: "Usé", disponible: false}}}`
</details>

---

#### Exercice 38 : Incrémenter un compteur lors d'un emprunt
**Objectif :** Quand Harry Potter est emprunté, augmenter le compteur `nombre_emprunts_total` de 1

**Ce que vous devez pratiquer :** Combiner `$inc` pour gérer des statistiques

<details>
<summary>💡 Solution</summary>

```javascript
db.livres.updateOne(
    {isbn: "978-2-07-041999-0"},
    {$inc: {nombre_emprunts_total: 1}}
)

// Vérifier
db.livres.findOne(
    {isbn: "978-2-07-041999-0"},
    {titre: 1, nombre_emprunts_total: 1}
)
```

**Explications :**
- `$inc: {nombre_emprunts_total: 1}` : incrémente de 1 (atomique et thread-safe)
- Utile pour les statistiques : pas besoin de lire puis réécrire
- En production, cette opération serait combinée avec la mise à jour de l'exemplaire
</details>

---

#### Exercice 39 : Opération complexe - Simuler un emprunt complet
**Objectif :** Le membre "M003" emprunte l'exemplaire "HP1-003" de Harry Potter aujourd'hui, retour dans 14 jours

**Ce que vous devez pratiquer :** Combiner plusieurs opérateurs (`$set`, `$inc`, `$unset`, `$`)

<details>
<summary>💡 Solution</summary>

```javascript
// Dates de l'emprunt
let date_emprunt = new Date()
let date_retour = new Date()
date_retour.setDate(date_retour.getDate() + 14)  // +14 jours

// Mise à jour du livre
db.livres.updateOne(
    {
        isbn: "978-2-07-041999-0",
        "exemplaires.code": "HP1-003"
    },
    {
        $set: {
            "exemplaires.$.disponible": false,
            "exemplaires.$.emprunt_actuel": {
                membre_id: "M003",
                date_emprunt: date_emprunt,
                date_retour_prevue: date_retour
            }
        },
        $unset: {
            "exemplaires.$.emplacement": ""  // L'exemplaire n'est plus au rayon
        },
        $inc: {nombre_emprunts_total: 1}
    }
)

// Vérifier
db.livres.findOne(
    {isbn: "978-2-07-041999-0"},
    {titre: 1, exemplaires: 1, nombre_emprunts_total: 1}
)
```

**Explications :**
- Opération **atomique** qui fait 3 choses en une seule commande :
  1. `$set` : marque comme indisponible et ajoute les infos d'emprunt
  2. `$unset` : retire le champ `emplacement` (plus pertinent quand emprunté)
  3. `$inc` : incrémente le compteur global
- Tous les changements réussissent ou échouent ensemble (atomicité)
- En production, on mettrait aussi à jour le document du membre avec `$push`
</details>

---

#### Exercice 40 : Opération complexe - Simuler un retour de livre
**Objectif :** Le membre "M001" retourne l'exemplaire "LPP-002" du Petit Prince

**Ce que vous devez pratiquer :** Remettre l'exemplaire à disposition

<details>
<summary>💡 Solution</summary>

```javascript
db.livres.updateOne(
    {
        isbn: "978-2-07-036822-8",
        "exemplaires.code": "LPP-002"
    },
    {
        $set: {
            "exemplaires.$.disponible": true,
            "exemplaires.$.emplacement": "À ranger"
        },
        $unset: {
            "exemplaires.$.emprunt_actuel": ""  // Supprimer l'objet emprunt
        }
    }
)

// Vérifier
db.livres.findOne(
    {isbn: "978-2-07-036822-8"},
    {titre: 1, "exemplaires.$": 1}
)
```

**Explications :**
- `$set` : remet `disponible` à `true` et ajoute un emplacement temporaire
- `$unset` : supprime complètement l'objet `emprunt_actuel` (plus nécessaire)
- L'exemplaire redevient empruntable
- En production, on retirerait aussi l'emprunt de la liste du membre
</details>

---

#### 🎯 Exercice bonus : Mettre à jour plusieurs exemplaires d'un coup
**Objectif :** Tous les exemplaires "Usés" du Petit Prince doivent passer en réparation. Ajouter le champ `en_reparation: true` à tous

**Ce que vous devez pratiquer :** Mise à jour multiple dans un tableau avec `$[]` (tous les éléments)

<details>
<summary>💡 Solution</summary>

```javascript
// ⚠️ Cette syntaxe est avancée (MongoDB 3.6+)
db.livres.updateOne(
    {isbn: "978-2-07-036822-8"},
    {
        $set: {
            "exemplaires.$[elem].en_reparation": true
        }
    },
    {
        arrayFilters: [{"elem.etat": "Usé"}]  // Filtrer sur état = Usé
    }
)

// Vérifier
db.livres.findOne(
    {isbn: "978-2-07-036822-8"},
    {titre: 1, exemplaires: 1}
)
```

**Explications :**
- `$[elem]` : représente chaque élément du tableau (pas seulement le premier)
- `arrayFilters` : définit quel critère appliquer à `elem`
- Tous les exemplaires avec `etat: "Usé"` sont modifiés en une seule requête
- Plus efficace que boucler avec `$` (qui ne modifie que le premier)

**Alternative simple (si vous ne connaissez pas encore `arrayFilters`) :**
```javascript
// Méthode 1 : Modifier chaque exemplaire individuellement avec $
db.livres.updateOne(
    {isbn: "978-2-07-036822-8", "exemplaires.etat": "Usé"},
    {$set: {"exemplaires.$.en_reparation": true}}
)
// Répéter pour chaque exemplaire usé...
```
</details>

---

#### ✅ Auto-évaluation

Avant de passer à l'agrégation, vérifiez que vous maîtrisez :
- [ ] Modifier un champ imbriqué avec `$set` et notation pointée
- [ ] Utiliser l'opérateur positionnel `$` pour modifier un élément d'un tableau
- [ ] Ajouter un élément dans un tableau avec `$push`
- [ ] Retirer un élément d'un tableau avec `$pull`
- [ ] Supprimer un champ imbriqué avec `$unset`
- [ ] Combiner plusieurs opérateurs (`$set`, `$inc`, `$unset`) dans une seule mise à jour
- [ ] Comprendre l'opérateur `$[]` pour modifier plusieurs éléments (bonus)

⚠️ **Erreurs courantes :**
```javascript
// ❌ FAUX - Oubli du $ dans la mise à jour
db.livres.updateOne(
    {"exemplaires.code": "LPP-001"},
    {$set: {"exemplaires.etat": "Usé"}}  // Modifiera TOUS les exemplaires !
)

// ✅ CORRECT - Avec $ pour cibler l'élément spécifique
db.livres.updateOne(
    {"exemplaires.code": "LPP-001"},
    {$set: {"exemplaires.$.etat": "Usé"}}
)
```

---

### 4.4 Introduction à l'agrégation avec exercices (15 min)

L'**agrégation** est un outil puissant pour faire des **statistiques** et des **transformations** complexes sur vos données. C'est l'équivalent MongoDB des `GROUP BY`, `JOIN` et fonctions d'agrégation SQL.

#### 📊 Concept : Le pipeline d'agrégation

L'agrégation fonctionne comme un **pipeline** (tuyau) où les données passent par plusieurs **étapes** successives :

```javascript
db.collection.aggregate([
    {$match: {...}},      // Étape 1 : Filtrer (WHERE en SQL)
    {$project: {...}},    // Étape 2 : Sélectionner des champs (SELECT en SQL)
    {$group: {...}},      // Étape 3 : Grouper (GROUP BY en SQL)
    {$sort: {...}},       // Étape 4 : Trier (ORDER BY en SQL)
    {$limit: 5}           // Étape 5 : Limiter (LIMIT en SQL)
])
```

**Analogie :** Imaginez une chaîne de production :
1. Les documents entrent dans le pipeline
2. Chaque étape transforme les données
3. Le résultat final sort à la fin

#### Exercice 41 : Compter le nombre de livres par catégorie
**Objectif :** Afficher combien de livres existent dans chaque catégorie

**Ce que vous devez pratiquer :** `$unwind` pour "dérouler" un tableau + `$group` pour compter

<details>
<summary>💡 Solution</summary>

```javascript
db.livres.aggregate([
    {$unwind: "$categories"},  // Étape 1 : Dérouler le tableau categories
    {$group: {                  // Étape 2 : Grouper par catégorie
        _id: "$categories",
        nombre_livres: {$sum: 1}
    }},
    {$sort: {nombre_livres: -1}}  // Étape 3 : Trier par popularité
])
```

**Explications :**
- `$unwind: "$categories"` : chaque livre avec N catégories devient N documents séparés
  - Avant : `{titre: "HP", categories: ["Fantasy", "Jeunesse"]}`
  - Après : 2 documents → `{titre: "HP", categories: "Fantasy"}` et `{titre: "HP", categories: "Jeunesse"}`
- `$group` : regroupe par valeur de `categories` et compte avec `{$sum: 1}`
- `_id` dans `$group` : c'est le champ de regroupement (comme GROUP BY en SQL)
- `$` devant les champs : indique qu'on référence une valeur de document

**Résultat attendu :**
```javascript
[
  { _id: "Fantasy", nombre_livres: 1 },
  { _id: "Jeunesse", nombre_livres: 2 },
  { _id: "Science-Fiction", nombre_livres: 1 },
  ...
]
```
</details>

---

#### Exercice 42 : Calculer la note moyenne par catégorie
**Objectif :** Pour chaque catégorie, afficher la note moyenne des livres

**Ce que vous devez pratiquer :** `$group` avec `$avg` (moyenne)

<details>
<summary>💡 Solution</summary>

```javascript
db.livres.aggregate([
    {$unwind: "$categories"},
    {$group: {
        _id: "$categories",
        note_moyenne: {$avg: "$note_moyenne"},
        nombre_livres: {$sum: 1}
    }},
    {$sort: {note_moyenne: -1}}
])
```

**Explications :**
- `$avg: "$note_moyenne"` : calcule la moyenne du champ `note_moyenne` pour chaque groupe
- On peut combiner plusieurs accumulateurs : `$sum`, `$avg`, `$min`, `$max`, etc.
- Équivalent SQL : `SELECT categories, AVG(note_moyenne), COUNT(*) FROM livres GROUP BY categories`

**Résultat attendu :**
```javascript
[
  { _id: "Fantasy", note_moyenne: 4.9, nombre_livres: 1 },
  { _id: "Jeunesse", note_moyenne: 4.85, nombre_livres: 2 },
  ...
]
```
</details>

---

#### Exercice 43 : Compter le nombre total d'exemplaires par livre
**Objectif :** Afficher chaque livre avec son nombre total d'exemplaires

**Ce que vous devez pratiquer :** `$project` avec `$size` pour compter les éléments d'un tableau

<details>
<summary>💡 Solution</summary>

```javascript
db.livres.aggregate([
    {$project: {
        titre: 1,
        auteur: 1,
        nombre_exemplaires: {$size: "$exemplaires"}
    }},
    {$sort: {nombre_exemplaires: -1}}
])
```

**Explications :**
- `$project` : définit les champs à afficher dans le résultat
- `$size: "$exemplaires"` : compte le nombre d'éléments dans le tableau
- `titre: 1` : inclure le titre (comme dans les projections classiques)
- Pas besoin de `$unwind` ici : on veut juste compter, pas traiter chaque élément

**Résultat attendu :**
```javascript
[
  { titre: "Harry Potter à l'école des sorciers", nombre_exemplaires: 4 },
  { titre: "Le Petit Prince", nombre_exemplaires: 3 },
  { titre: "1984", nombre_exemplaires: 2 }
]
```
</details>

---

#### Exercice 44 : Compter les exemplaires disponibles vs empruntés
**Objectif :** Pour chaque livre, afficher combien d'exemplaires sont disponibles et combien sont empruntés

**Ce que vous devez pratiquer :** `$filter` pour filtrer un tableau dans une projection

<details>
<summary>💡 Solution</summary>

```javascript
db.livres.aggregate([
    {$project: {
        titre: 1,
        total_exemplaires: {$size: "$exemplaires"},
        disponibles: {
            $size: {
                $filter: {
                    input: "$exemplaires",
                    as: "ex",
                    cond: {$eq: ["$$ex.disponible", true]}
                }
            }
        },
        empruntes: {
            $size: {
                $filter: {
                    input: "$exemplaires",
                    as: "ex",
                    cond: {$eq: ["$$ex.disponible", false]}
                }
            }
        }
    }}
])
```

**Explications :**
- `$filter` : filtre les éléments d'un tableau selon une condition
  - `input` : le tableau à filtrer (`$exemplaires`)
  - `as` : nom de variable pour chaque élément (ici `ex`)
  - `cond` : condition (ici : `disponible == true`)
- `$$ex.disponible` : `$$` = référence à la variable définie dans `as`
- On applique `$size` sur le résultat filtré pour compter

**Résultat attendu :**
```javascript
[
  {
    titre: "Le Petit Prince",
    total_exemplaires: 3,
    disponibles: 2,
    empruntes: 1
  },
  ...
]
```
</details>

---

#### Exercice 45 : Trouver les auteurs les plus prolifiques
**Objectif :** Compter combien de livres chaque auteur a dans la médiathèque

**Ce que vous devez pratiquer :** Grouper sur un objet imbriqué

<details>
<summary>💡 Solution</summary>

```javascript
db.livres.aggregate([
    {$group: {
        _id: {
            nom: "$auteur.nom",
            prenom: "$auteur.prenom"
        },
        nombre_livres: {$sum: 1},
        livres: {$push: "$titre"}  // Bonus : lister les titres
    }},
    {$sort: {nombre_livres: -1}}
])
```

**Explications :**
- `_id` peut être un objet avec plusieurs champs : regroupe par nom ET prénom
- `$push: "$titre"` : crée un tableau avec tous les titres de l'auteur
- Utile pour savoir quel auteur a le plus de livres dans la collection

**Résultat attendu :**
```javascript
[
  {
    _id: {nom: "Rowling", prenom: "J.K."},
    nombre_livres: 1,
    livres: ["Harry Potter à l'école des sorciers"]
  },
  ...
]
```
</details>

---

#### Exercice 46 : Statistiques globales avec $facet
**Objectif :** Créer un tableau de bord avec plusieurs statistiques en une seule requête

**Ce que vous devez pratiquer :** `$facet` pour exécuter plusieurs pipelines en parallèle

<details>
<summary>💡 Solution</summary>

```javascript
db.livres.aggregate([
    {$facet: {
        // Pipeline 1 : Nombre total de livres
        total_livres: [
            {$count: "count"}
        ],

        // Pipeline 2 : Nombre total d'exemplaires
        total_exemplaires: [
            {$unwind: "$exemplaires"},
            {$count: "count"}
        ],

        // Pipeline 3 : Top 3 des catégories
        categories_populaires: [
            {$unwind: "$categories"},
            {$group: {
                _id: "$categories",
                count: {$sum: 1}
            }},
            {$sort: {count: -1}},
            {$limit: 3}
        ],

        // Pipeline 4 : Livre le plus populaire
        livre_populaire: [
            {$sort: {nombre_emprunts_total: -1}},
            {$limit: 1},
            {$project: {titre: 1, nombre_emprunts_total: 1, _id: 0}}
        ]
    }}
])
```

**Explications :**
- `$facet` : permet d'exécuter **plusieurs pipelines indépendants** sur les mêmes données
- Chaque clé de `$facet` devient un champ dans le résultat
- Très efficace pour créer des tableaux de bord complexes
- Une seule requête au lieu de 4 !

**Résultat attendu :**
```javascript
[{
  total_livres: [{count: 3}],
  total_exemplaires: [{count: 9}],
  categories_populaires: [
    {_id: "Jeunesse", count: 2},
    {_id: "Fantasy", count: 1},
    ...
  ],
  livre_populaire: [{titre: "Harry Potter à l'école des sorciers", nombre_emprunts_total: 234}]
}]
```
</details>

---

#### 🎯 Exercice bonus : Taux d'occupation de la médiathèque
**Objectif :** Calculer quel pourcentage des exemplaires est actuellement emprunté

**Ce que vous devez pratiquer :** Combiner plusieurs techniques d'agrégation

<details>
<summary>💡 Solution</summary>

```javascript
db.livres.aggregate([
    {$unwind: "$exemplaires"},
    {$group: {
        _id: null,  // Grouper TOUT ensemble (pas de séparation)
        total: {$sum: 1},
        empruntes: {
            $sum: {
                $cond: [{$eq: ["$exemplaires.disponible", false]}, 1, 0]
            }
        }
    }},
    {$project: {
        _id: 0,
        total_exemplaires: "$total",
        exemplaires_empruntes: "$empruntes",
        taux_occupation: {
            $multiply: [
                {$divide: ["$empruntes", "$total"]},
                100
            ]
        }
    }}
])
```

**Explications :**
- `_id: null` : groupe TOUS les documents ensemble (pas de subdivision)
- `$cond` : if/else → si `disponible == false`, compte 1, sinon 0
- `$divide` et `$multiply` : calculs mathématiques (pourcentage)
- `$project` à la fin : renommer et calculer le taux final

**Résultat attendu :**
```javascript
[{
  total_exemplaires: 9,
  exemplaires_empruntes: 3,
  taux_occupation: 33.33
}]
```
</details>

---

#### ✅ Auto-évaluation

Avant de terminer la Phase 4, vérifiez que vous comprenez :
- [ ] Le concept de pipeline d'agrégation (étapes successives)
- [ ] `$unwind` pour dérouler un tableau
- [ ] `$group` pour regrouper et compter (`$sum`, `$avg`, `$push`)
- [ ] `$project` avec `$size` pour compter les éléments d'un tableau
- [ ] `$filter` pour filtrer un tableau dans une projection
- [ ] `$facet` pour exécuter plusieurs pipelines en parallèle
- [ ] `$cond` pour les conditions if/else
- [ ] Les calculs mathématiques (`$divide`, `$multiply`)

#### 💡 Opérateurs d'agrégation utiles (résumé)

| Étape | Description | Équivalent SQL |
|-------|-------------|----------------|
| `$match` | Filtrer les documents | `WHERE` |
| `$project` | Sélectionner/calculer des champs | `SELECT` |
| `$group` | Regrouper et agréger | `GROUP BY` |
| `$sort` | Trier | `ORDER BY` |
| `$limit` | Limiter le nombre de résultats | `LIMIT` |
| `$unwind` | Dérouler un tableau | (pas d'équivalent direct) |
| `$lookup` | Jointure entre collections | `JOIN` (voir séance 2) |
| `$facet` | Plusieurs pipelines parallèles | (plusieurs requêtes) |

**Accumulateurs dans $group :**
- `$sum` : somme / comptage
- `$avg` : moyenne
- `$min` / `$max` : minimum / maximum
- `$push` : créer un tableau avec toutes les valeurs
- `$first` / `$last` : première / dernière valeur

---

## 🚀 Phase 5 : Mini-projet guidé - Système de gestion complet (40 min)

Cette dernière phase vous permet de mettre en pratique **tout ce que vous avez appris** à travers un mini-projet réaliste : ajouter un système d'avis, de recommandations et un tableau de bord à la médiathèque.

---

### 5.1 Mission : Ajouter un système d'avis sur les livres (10 min)

#### Étape 1 : Ajouter votre premier avis

**Objectif :** Marie Dupont (M001) vient de lire "Le Petit Prince" et veut laisser un avis positif.

**Ce que vous devez faire :**
1. Ajouter un tableau `avis` dans le document du livre
2. Chaque avis contient : membre_id, note (sur 5), commentaire, date

**💪 À vous de jouer !** Essayez d'écrire la requête avant de regarder la solution.

<details>
<summary>💡 Solution</summary>

```javascript
db.livres.updateOne(
    {isbn: "978-2-07-036822-8"},
    {$push: {
        avis: {
            membre_id: "M001",
            note: 5,
            commentaire: "Un classique intemporel ! Une lecture émouvante.",
            date: new Date(),
            utile: 0  // Nombre de "j'aime" (au début : 0)
        }
    }}
)

// Vérifier que l'avis a été ajouté
db.livres.findOne(
    {isbn: "978-2-07-036822-8"},
    {titre: 1, avis: 1}
)
```

**Explications :**
- `$push` ajoute un nouvel avis dans le tableau `avis`
- Le tableau est créé automatiquement s'il n'existe pas encore
- On embarque les avis dans le document livre (car < 100 avis attendus par livre)
</details>

---

#### Étape 2 : Ajouter plusieurs avis

**Objectif :** Ajouter 2 autres avis pour "Le Petit Prince" de membres différents.

**💪 À vous de jouer !** Ajoutez :
- Lucas Martin (M002) : note 4, commentaire "Très beau, mais un peu court"
- Un troisième avis de votre choix avec un nouveau membre_id (ex: "M003")

<details>
<summary>💡 Solution</summary>

```javascript
// Avis de Lucas (M002)
db.livres.updateOne(
    {isbn: "978-2-07-036822-8"},
    {$push: {
        avis: {
            membre_id: "M002",
            note: 4,
            commentaire: "Très beau, mais un peu court pour mon goût.",
            date: new Date(),
            utile: 2
        }
    }}
)

// Avis d'un troisième membre
db.livres.updateOne(
    {isbn: "978-2-07-036822-8"},
    {$push: {
        avis: {
            membre_id: "M003",
            note: 5,
            commentaire: "À lire absolument ! Plein de sagesse.",
            date: new Date(),
            utile: 5
        }
    }}
)

// Vérifier tous les avis
db.livres.findOne(
    {isbn: "978-2-07-036822-8"},
    {titre: 1, avis: 1, _id: 0}
)
```
</details>

---

#### Étape 3 : Calculer la nouvelle note moyenne avec l'agrégation

**Objectif :** Maintenant que le livre a plusieurs avis, calculer automatiquement la nouvelle note moyenne.

**💪 À vous de jouer !** Utilisez l'agrégation pour :
1. Filtrer le livre "Le Petit Prince"
2. Dérouler le tableau `avis` avec `$unwind`
3. Calculer la moyenne avec `$group` et `$avg`

<details>
<summary>💡 Solution</summary>

```javascript
let resultat = db.livres.aggregate([
    {$match: {isbn: "978-2-07-036822-8"}},
    {$unwind: "$avis"},
    {$group: {
        _id: "$isbn",
        titre: {$first: "$titre"},
        ancienne_note: {$first: "$note_moyenne"},
        nouvelle_note: {$avg: "$avis.note"},
        nombre_avis: {$sum: 1}
    }}
]).toArray()[0]

print(`=== Calcul de la nouvelle note ===`)
print(`Livre : ${resultat.titre}`)
print(`Ancienne note : ${resultat.ancienne_note}`)
print(`Nouvelle note : ${resultat.nouvelle_note}`)
print(`Basée sur ${resultat.nombre_avis} avis`)

// Bonus : Mettre à jour la note moyenne dans le document
db.livres.updateOne(
    {isbn: "978-2-07-036822-8"},
    {$set: {note_moyenne: resultat.nouvelle_note}}
)
```

**Explications :**
- `$unwind: "$avis"` : transforme chaque avis en document séparé
- `$avg: "$avis.note"` : calcule la moyenne des notes
- `$first` : récupère la première valeur (utile pour garder le titre)
- En production, on mettrait à jour automatiquement `note_moyenne` après chaque avis
</details>

---

### 5.2 Mission : Créer un système de recommandations (10 min)

#### Étape 4 : Recommander des livres selon les préférences

**Objectif :** Créer une fonction qui recommande des livres à un membre en fonction de ses préférences (catégories favorites).

**💪 À vous de jouer !** Créez une fonction `recommander(membre_id)` qui :
1. Récupère le membre et ses préférences
2. Trouve les livres correspondant à ses catégories préférées
3. Filtre uniquement les livres avec une note ≥ 4.0
4. Trie par note décroissante
5. Limite à 5 résultats

<details>
<summary>💡 Solution</summary>

```javascript
function recommander(membre_id) {
    // 1. Récupérer le membre
    let membre = db.membres.findOne({_id: membre_id})

    if (!membre) {
        print(`❌ Membre ${membre_id} introuvable`)
        return []
    }

    if (!membre.preferences || membre.preferences.length === 0) {
        print(`⚠️ ${membre.prenom} n'a pas de préférences définies`)
        return []
    }

    print(`=== Recommandations pour ${membre.prenom} ${membre.nom} ===`)
    print(`Préférences : ${membre.preferences.join(", ")}`)
    print("")

    // 2. Trouver les livres correspondants
    let livres = db.livres.find({
        categories: {$in: membre.preferences},
        note_moyenne: {$gte: 4.0}
    })
    .sort({note_moyenne: -1, nombre_emprunts_total: -1})
    .limit(5)
    .toArray()

    // 3. Afficher les recommandations
    livres.forEach((livre, index) => {
        print(`${index + 1}. ${livre.titre} - ${livre.auteur.prenom} ${livre.auteur.nom}`)
        print(`   Note : ${livre.note_moyenne}/5 | Emprunts : ${livre.nombre_emprunts_total}`)
        print(`   Catégories : ${livre.categories.join(", ")}`)
        print("")
    })

    return livres
}

// Tester la fonction
recommander("M001")  // Marie aime Fiction et Science-Fiction
recommander("M002")  // Lucas aime Fantasy et Jeunesse
```

**Explications :**
- `$in: membre.preferences` : cherche les livres dont au moins une catégorie match
- Double tri : d'abord par note, puis par popularité
- `.toArray()` : convertit le curseur en tableau JavaScript
</details>

---

#### Étape 5 : Améliorer les recommandations (exclusion des déjà lus)

**Objectif :** Améliorer la fonction pour ne PAS recommander les livres que le membre a déjà empruntés.

**💪 À vous de jouer !** Modifiez la fonction pour ajouter un filtre `$nin` (not in) qui exclut les livres dont l'ISBN est dans `emprunts_en_cours` du membre.

<details>
<summary>💡 Solution</summary>

```javascript
function recommanderAmeliore(membre_id) {
    let membre = db.membres.findOne({_id: membre_id})

    if (!membre || !membre.preferences) {
        print("Membre introuvable ou sans préférences")
        return []
    }

    // Extraire les ISBN des livres déjà empruntés
    let deja_empruntes = membre.emprunts_en_cours.map(e => e.livre_isbn)

    print(`=== Recommandations (hors déjà lus) pour ${membre.prenom} ===`)
    print(`Livres en cours d'emprunt : ${deja_empruntes.length}`)
    print("")

    // Recommander en excluant les déjà empruntés
    let livres = db.livres.find({
        categories: {$in: membre.preferences},
        note_moyenne: {$gte: 4.0},
        isbn: {$nin: deja_empruntes}  // ← Exclusion !
    })
    .sort({note_moyenne: -1})
    .limit(5)
    .toArray()

    livres.forEach((livre, index) => {
        print(`${index + 1}. ${livre.titre} (${livre.note_moyenne}/5)`)
    })

    return livres
}

// Tester
recommanderAmeliore("M001")
```

**Explications :**
- `.map(e => e.livre_isbn)` : extrait les ISBN du tableau d'emprunts
- `$nin` : "not in" = n'est pas dans la liste
- Permet d'éviter de recommander des livres déjà lus
</details>

---

### 5.3 Mission : Créer un tableau de bord de statistiques (10 min)

#### Étape 6 : Créer un dashboard avec plusieurs statistiques

**Objectif :** Utiliser `$facet` pour créer un tableau de bord complet avec plusieurs statistiques en **une seule requête**.

**💪 À vous de jouer !** Créez une agrégation avec `$facet` qui calcule :
1. Nombre total de livres
2. Nombre total d'exemplaires
3. Top 3 des catégories populaires
4. Le livre le plus emprunté

<details>
<summary>💡 Solution</summary>

```javascript
let dashboard = db.livres.aggregate([
    {$facet: {
        // Statistique 1 : Total de livres
        total_livres: [
            {$count: "count"}
        ],

        // Statistique 2 : Total d'exemplaires
        total_exemplaires: [
            {$unwind: "$exemplaires"},
            {$count: "count"}
        ],

        // Statistique 3 : Exemplaires disponibles vs empruntés
        disponibilite: [
            {$unwind: "$exemplaires"},
            {$group: {
                _id: null,
                total: {$sum: 1},
                disponibles: {
                    $sum: {$cond: ["$exemplaires.disponible", 1, 0]}
                },
                empruntes: {
                    $sum: {$cond: ["$exemplaires.disponible", 0, 1]}
                }
            }}
        ],

        // Statistique 4 : Top 3 des catégories
        categories_populaires: [
            {$unwind: "$categories"},
            {$group: {
                _id: "$categories",
                nombre_livres: {$sum: 1}
            }},
            {$sort: {nombre_livres: -1}},
            {$limit: 3}
        ],

        // Statistique 5 : Livre le plus populaire
        livre_star: [
            {$sort: {nombre_emprunts_total: -1}},
            {$limit: 1},
            {$project: {
                titre: 1,
                auteur: 1,
                nombre_emprunts_total: 1,
                note_moyenne: 1,
                _id: 0
            }}
        ]
    }}
]).toArray()[0]

// Affichage formaté du dashboard
print("╔═══════════════════════════════════════════════════════════╗")
print("║       📊 TABLEAU DE BORD - MÉDIATHÈQUE BUT3              ║")
print("╚═══════════════════════════════════════════════════════════╝")
print("")

print(`📚 Livres au catalogue : ${dashboard.total_livres[0].count}`)
print(`📖 Exemplaires physiques : ${dashboard.total_exemplaires[0].count}`)
print("")

let dispo = dashboard.disponibilite[0]
print(`✅ Disponibles : ${dispo.disponibles} (${((dispo.disponibles/dispo.total)*100).toFixed(1)}%)`)
print(`📤 Empruntés : ${dispo.empruntes} (${((dispo.empruntes/dispo.total)*100).toFixed(1)}%)`)
print("")

print("🏆 Top 3 des catégories :")
dashboard.categories_populaires.forEach((cat, index) => {
    print(`   ${index + 1}. ${cat._id} (${cat.nombre_livres} livres)`)
})
print("")

let star = dashboard.livre_star[0]
print(`⭐ Livre star : "${star.titre}"`)
print(`   de ${star.auteur.prenom} ${star.auteur.nom}`)
print(`   ${star.nombre_emprunts_total} emprunts | Note : ${star.note_moyenne}/5`)
```

**Explications :**
- `$facet` : exécute plusieurs pipelines en parallèle sur les mêmes données
- Chaque clé de `$facet` devient un champ dans le résultat
- Une seule requête remplace 5 requêtes séparées !
- Très performant pour les dashboards
</details>

---

### 5.4 Exercices de validation autonome (10 min)

Ces exercices finaux vous permettent de vérifier que vous maîtrisez l'ensemble des concepts. **Essayez de les faire sans regarder les solutions !**

#### Exercice 47 : Trouver les livres populaires disponibles

**Objectif :** Créer une requête qui trouve les livres Fantasy avec une note > 4.5, publiés après 1990, qui ont au moins un exemplaire disponible, triés par popularité.

**💪 À vous de jouer !**

<details>
<summary>💡 Solution</summary>

```javascript
db.livres.find(
    {
        categories: "Fantasy",
        "publication.annee": {$gt: 1990},
        note_moyenne: {$gt: 4.5},
        "exemplaires.disponible": true
    },
    {
        titre: 1,
        "auteur.nom": 1,
        "auteur.prenom": 1,
        note_moyenne: 1,
        nombre_emprunts_total: 1,
        _id: 0
    }
).sort({nombre_emprunts_total: -1})
```

**Ce que ça révise :**
- Critères multiples (AND implicite)
- Notation pointée sur objets et tableaux
- Projection
- Tri
</details>

---

#### Exercice 48 : Créer une fonction de calcul du taux d'occupation

**Objectif :** Écrire une fonction qui affiche quel pourcentage des exemplaires est actuellement emprunté.

**💪 À vous de jouer !**

<details>
<summary>💡 Solution</summary>

```javascript
function tauxOccupation() {
    let stats = db.livres.aggregate([
        {$unwind: "$exemplaires"},
        {$group: {
            _id: null,
            total: {$sum: 1},
            empruntes: {
                $sum: {$cond: ["$exemplaires.disponible", 0, 1]}
            }
        }},
        {$project: {
            _id: 0,
            total: 1,
            empruntes: 1,
            taux: {
                $multiply: [
                    {$divide: ["$empruntes", "$total"]},
                    100
                ]
            }
        }}
    ]).toArray()[0]

    print(`📊 Taux d'occupation : ${stats.taux.toFixed(1)}%`)
    print(`   (${stats.empruntes} empruntés sur ${stats.total} exemplaires)`)

    return stats
}

tauxOccupation()
```

**Ce que ça révise :**
- Agrégation avec `$unwind`, `$group`, `$project`
- `$cond` pour conditions
- Calculs mathématiques
- Fonctions JavaScript
</details>

---

#### Exercice 49 : Créer des index d'optimisation

**Objectif :** Identifier et créer les index nécessaires pour optimiser les requêtes fréquentes de la médiathèque.

**💪 À vous de jouer !** Créez des index pour :
1. Recherche par ISBN (très fréquente)
2. Recherche par catégorie
3. Recherche par disponibilité
4. Tri par note moyenne

<details>
<summary>💡 Solution</summary>

```javascript
// 1. Index unique sur ISBN (recherche exacte)
db.livres.createIndex({isbn: 1}, {unique: true})

// 2. Index sur les catégories (recherches fréquentes)
db.livres.createIndex({categories: 1})

// 3. Index sur la disponibilité (requête très fréquente)
db.livres.createIndex({"exemplaires.disponible": 1})

// 4. Index composé : catégorie + note (recherche + tri)
db.livres.createIndex({categories: 1, note_moyenne: -1})

// Vérifier les index créés
db.livres.getIndexes()

// Analyser les performances d'une requête
db.livres.find({categories: "Fantasy"}).explain("executionStats")
```

**Ce que ça révise :**
- Création d'index simples et composés
- Index unique
- Vérification avec `getIndexes()`
- Analyse des performances avec `explain()`

**Principe :** Indexer les champs utilisés dans `find()` et `sort()`, mais attention : trop d'index ralentit les écritures !
</details>

## ✅ Checklist de fin de séance

### Compétences acquises

À la fin de cette séance de 4 heures, vous devriez être capable de :

**Concepts fondamentaux**
- [ ] Expliquer les différences entre SQL et NoSQL
- [ ] Justifier quand utiliser MongoDB plutôt qu'une BDD relationnelle
- [ ] Comprendre le concept de schéma flexible
- [ ] Distinguer embedding et références

**Opérations CRUD**
- [ ] Créer des documents avec `insertOne()` et `insertMany()`
- [ ] Interroger avec `find()`, critères, projections, tri, limite
- [ ] Modifier avec `updateOne()`/`updateMany()` et les opérateurs `$set`, `$inc`, `$push`, `$pull`
- [ ] Supprimer avec `deleteOne()`/`deleteMany()`

**Documents complexes**
- [ ] Utiliser la notation pointée (`"auteur.nom"`, `"exemplaires.disponible"`)
- [ ] Manipuler des tableaux d'objets
- [ ] Utiliser l'opérateur positionnel `$` pour modifier un élément précis
- [ ] Travailler avec des documents à 3 niveaux d'imbrication

**Agrégation**
- [ ] Comprendre le concept de pipeline
- [ ] Utiliser `$match`, `$project`, `$group`, `$sort`, `$limit`
- [ ] Dérouler un tableau avec `$unwind`
- [ ] Calculer des statistiques avec `$sum`, `$avg`, `$count`
- [ ] Utiliser `$facet` pour des dashboards

**Outils**
- [ ] Se connecter à MongoDB Atlas
- [ ] Utiliser MongoDB Compass
- [ ] Écrire des requêtes dans mongosh
- [ ] Créer des index d'optimisation

---

### 💡 Points clés à retenir

1. **Flexibilité du schéma** : Les documents peuvent avoir des structures différentes dans la même collection
2. **Embedding vs Référence** : Privilégier l'embedding pour les données lues ensemble (règle : < 100 éléments)
3. **ObjectId** : Contient automatiquement la date de création
4. **Pas de JOIN** : Toute l'info est dans le document ou accessible via agrégation `$lookup`
5. **Types BSON** : Plus riches que JSON (Date, ObjectId, Decimal128, etc.)
6. **Notation pointée** : Guillemets obligatoires (`"champ.sous_champ"`)
7. **Opérateur `$`** : Représente l'élément du tableau qui a matché dans les updates
8. **Agrégation = pipeline** : Les données passent par plusieurs étapes de transformation
9. **Index = performance** : Indexer les champs utilisés dans `find()` et `sort()`

---

### 🎯 Auto-évaluation rapide

Testez-vous en écrivant ces requêtes **sans aide** :

```javascript
// 1. Insérer un nouveau livre avec auteur imbriqué et 2 exemplaires

// 2. Trouver les livres de George Orwell (notation pointée)

// 3. Augmenter la note moyenne d'un livre de 0.5

// 4. Ajouter un exemplaire à un livre existant ($push)

// 5. Compter les livres par catégorie (agrégation)

// 6. Lister les emprunts en retard (comparaison de dates)
```

<details>
<summary>💡 Solutions</summary>

```javascript
// 1. Insérer un nouveau livre avec auteur imbriqué et 2 exemplaires
db.livres.insertOne({
    isbn: "978-2-07-123456-7",
    titre: "Fondation",
    auteur: {
        nom: "Asimov",
        prenom: "Isaac",
        nationalite: "Américaine"
    },
    publication: {
        editeur: "Gallimard",
        annee: 1951
    },
    exemplaires: [
        {code: "FON-001", etat: "Bon", disponible: true, emplacement: "Rayon SF"},
        {code: "FON-002", etat: "Neuf", disponible: true, emplacement: "Rayon SF"}
    ],
    categories: ["Science-Fiction"],
    note_moyenne: 4.7,
    nombre_emprunts_total: 0
})

// 2. Trouver les livres de George Orwell (notation pointée)
db.livres.find({"auteur.nom": "Orwell"})

// 3. Augmenter la note moyenne d'un livre de 0.5
db.livres.updateOne(
    {titre: "1984"},
    {$inc: {note_moyenne: 0.5}}
)

// 4. Ajouter un exemplaire à un livre existant ($push)
db.livres.updateOne(
    {isbn: "978-2-07-036822-8"},
    {$push: {
        exemplaires: {
            code: "LPP-005",
            etat: "Neuf",
            disponible: true,
            emplacement: "Rayon A3"
        }
    }}
)

// 5. Compter les livres par catégorie (agrégation)
db.livres.aggregate([
    {$unwind: "$categories"},
    {$group: {
        _id: "$categories",
        nombre: {$sum: 1}
    }},
    {$sort: {nombre: -1}}
])

// 6. Lister les emprunts en retard (comparaison de dates)
db.livres.find({
    "exemplaires.emprunt_actuel.date_retour_prevue": {$lt: new Date()}
},
{
    titre: 1,
    "exemplaires.emprunt_actuel": 1
})
```
</details>

---

## 📚 Pour préparer la séance 2

### Ce que vous allez découvrir

La **Séance 2** approfondira les concepts vus aujourd'hui :
- **Agrégation avancée** : `$lookup` (JOIN MongoDB), `$facet`, pipelines complexes
- **Modélisation avancée** : Références entre collections, dénormalisation
- **Transactions** : ACID dans MongoDB (multi-documents)
- **Géospatial** : Requêtes sur des coordonnées GPS
- **Projet SteamCity** : Modéliser et gérer des données IoT temps réel

### Ressources complémentaires

Pour aller plus loin avant la séance 2 :

**Documentation officielle**
- [MongoDB CRUD Operations](https://docs.mongodb.com/manual/crud/)
- [Aggregation Pipeline](https://docs.mongodb.com/manual/aggregation/)
- [Data Modeling Introduction](https://docs.mongodb.com/manual/core/data-modeling-introduction/)

**Cours gratuits MongoDB University**
- M001 : MongoDB Basics (5 heures, certificat gratuit)
- M121 : The MongoDB Aggregation Framework

**Outils pratiques**
- [MongoDB Playground](https://mongoplayground.net/) : Tester des requêtes en ligne
- [Studio 3T](https://studio3t.com/) : IDE avancé pour MongoDB (gratuit pour étudiants)

### Défis optionnels

Si vous voulez pratiquer d'ici la prochaine séance :

1. **Modéliser votre bibliothèque personnelle**
   - Collection de films/séries avec acteurs, réalisateurs, avis
   - Implémenter un système de playlists

2. **Créer un système de gestion de notes BUT**
   - Étudiants, modules, notes, absences
   - Calculer moyennes par UE avec agrégation

3. **Mini réseau social**
   - Users, posts, likes, commentaires
   - Timeline avec requêtes complexes

---

**🎉 Félicitations !** Vous avez terminé la Séance 1 sur MongoDB. Vous maîtrisez maintenant les fondamentaux du NoSQL et êtes prêts pour des concepts plus avancés !

**Questions ?** N'hésitez pas à créer une [issue sur GitHub](https://github.com/IUTInfoAix-R510/Cours/issues) ou à contacter votre enseignant.

---

*Document généré pour le module R5.Real.10 - IUT d'Aix-Marseille - BUT Informatique 3ème année*
