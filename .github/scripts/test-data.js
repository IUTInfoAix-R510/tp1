/**
 * Test data for automated grading
 * This data will be inserted into MongoDB for testing student queries
 */

export const TEST_DATA = {
    employes: [
        { nom: "Martin", prenom: "Alice", age: 28, service: "IT", salaire: 3500, competences: ["Python", "SQL"] },
        { nom: "Dubois", prenom: "Bob", age: 35, service: "RH", salaire: 3200, competences: ["Excel", "PowerPoint"] },
        { nom: "Lambert", prenom: "Charlie", age: 32, service: "RH", salaire: 2900, competences: ["Word", "Excel"] },
        { nom: "Durand", prenom: "Diana", age: 29, service: "Marketing", salaire: 3100, competences: ["Photoshop", "Illustrator"] },
        { nom: "Moreau", prenom: "Eve", age: 31, service: "IT", salaire: 4200, competences: ["Java", "MongoDB", "Docker"] },
        { nom: "Petit", prenom: "Frank", age: 27, service: "Marketing", salaire: 2800 },
        { nom: "Roux", prenom: "Grace", age: 33, service: "IT", salaire: 3800, competences: ["JavaScript", "React"] },
        { nom: "Bernard", prenom: "Hugo", age: 26, service: "Finance", salaire: 3300, competences: ["Excel"] }
    ],

    livres: [
        {
            isbn: "978-2-07-036822-7",
            titre: "Les Misérables",
            auteur: { nom: "Hugo", prenom: "Victor" },
            editeur: { nom: "Gallimard", annee: 1862 },
            exemplaires: [
                { code: "EX-001", disponible: true },
                { code: "EX-002", disponible: true },
                { code: "EX-003", disponible: false }
            ]
        },
        {
            isbn: "978-0-452-28423-4",
            titre: "1984",
            auteur: { nom: "Orwell", prenom: "George" },
            editeur: { nom: "Penguin Books", annee: 1949 },
            exemplaires: [
                { code: "EX-004", disponible: true },
                { code: "EX-005", disponible: false }
            ]
        },
        {
            isbn: "978-2-253-00241-1",
            titre: "Le Comte de Monte-Cristo",
            auteur: { nom: "Dumas", prenom: "Alexandre" },
            editeur: { nom: "Le Livre de Poche", annee: 1844 },
            exemplaires: [
                { code: "EX-006", disponible: true }
            ]
        },
        {
            isbn: "978-2-07-037620-8",
            titre: "Notre-Dame de Paris",
            auteur: { nom: "Hugo", prenom: "Victor" },
            editeur: { nom: "Gallimard", annee: 1831 },
            exemplaires: [
                { code: "EX-007", disponible: true },
                { code: "EX-008", disponible: true }
            ]
        }
    ],

    membres: [
        {
            numero: "M001",
            nom: "Durand",
            prenom: "Sophie",
            adresse: {
                rue: "10 Avenue Jules Ferry",
                codePostal: "13100",
                ville: "Aix-en-Provence"
            },
            preferences: ["Roman", "Policier"],
            emprunts: [
                {
                    isbn: "978-2-07-036822-7",
                    dateEmprunt: new Date("2024-01-15"),
                    dateRetour: new Date("2024-02-01")
                }
            ]
        },
        {
            numero: "M002",
            nom: "Bernard",
            prenom: "Lucas",
            adresse: {
                rue: "5 Rue de la République",
                codePostal: "13001",
                ville: "Marseille"
            },
            preferences: ["Science-Fiction", "Fantasy", "Policier"],
            emprunts: [
                {
                    isbn: "978-0-452-28423-4",
                    dateEmprunt: new Date("2024-02-10")
                    // Pas de dateRetour = en cours
                }
            ]
        },
        {
            numero: "M003",
            nom: "Petit",
            prenom: "Emma",
            adresse: {
                rue: "25 Boulevard Victor Hugo",
                codePostal: "13200",
                ville: "Arles"
            },
            preferences: ["Histoire", "Biographie"],
            emprunts: []
        },
        {
            numero: "M004",
            nom: "Martin",
            prenom: "Thomas",
            adresse: {
                rue: "15 Cours Mirabeau",
                codePostal: "13100",
                ville: "Aix-en-Provence"
            },
            preferences: ["Fantasy", "Jeunesse"],
            emprunts: []
        }
    ]
};

/**
 * Initialize test database with test data
 */
export async function setupTestData(db) {
    console.log('   Setting up test data...');

    // Drop existing collections
    const collections = await db.listCollections().toArray();
    for (const collection of collections) {
        await db.collection(collection.name).drop();
    }

    // Insert test data
    await db.collection('employes').insertMany(TEST_DATA.employes);
    await db.collection('livres').insertMany(TEST_DATA.livres);
    await db.collection('membres').insertMany(TEST_DATA.membres);

    console.log('   ✅ Test data inserted');
    console.log(`      - ${TEST_DATA.employes.length} employes`);
    console.log(`      - ${TEST_DATA.livres.length} livres`);
    console.log(`      - ${TEST_DATA.membres.length} membres`);
}

/**
 * Clean up test database
 */
export async function cleanupTestData(db) {
    console.log('   Cleaning up test data...');
    await db.dropDatabase();
    console.log('   ✅ Test database dropped');
}
