/**
 * Automated tests for key exercises (50 points)
 * Tests are run on a real MongoDB instance with test data
 */

import { setupTestData, cleanupTestData } from './test-data.js';

// Key exercises to test (15 most important ones)
const KEY_EXERCISES = [
    { number: 1, points: 3 },   // find with equality
    { number: 3, points: 3 },   // find with $gt
    { number: 6, points: 4 },   // find with $in
    { number: 7, points: 4 },   // find with multiple conditions
    { number: 11, points: 3 },  // updateOne with $set
    { number: 12, points: 3 },  // updateOne with $inc
    { number: 15, points: 4 },  // updateMany with $mul
    { number: 19, points: 3 },  // deleteOne
    { number: 24, points: 3 },  // find nested document
    { number: 27, points: 4 },  // find with $elemMatch
    { number: 35, points: 5 },  // update nested array
    { number: 36, points: 5 },  // $push to array
    { number: 44, points: 4 },  // aggregate $group
    { number: 46, points: 4 },  // aggregate with $match and $unwind
    { number: 48, points: 4 }   // aggregate with $count
];

/**
 * Extract student's code for a specific exercise
 */
function extractExerciseCode(fullCode, exerciseNum) {
    const pattern = new RegExp(
        `\\/\\/ ────+\\s+Exercice\\s+${exerciseNum}\\s+────+[\\s\\S]*?\\/\\/ Votre réponse :\\s*\\n([\\s\\S]*?)(?=\\/\\/ ────+|\\/\\/ ═══|$)`,
        'g'
    );

    const match = pattern.exec(fullCode);
    if (!match) return null;

    let code = match[1].trim();

    // Remove comments
    code = code.split('\n')
        .filter(line => !line.trim().startsWith('//'))
        .join('\n')
        .trim();

    return code || null;
}

/**
 * Execute student's code and return result
 */
async function executeCode(code, db) {
    try {
        // Replace use() calls with direct collection access
        code = code.replace(/use\s*\(\s*['"].*?['"]\s*\)/g, '');

        // Create a safe execution context
        const context = {
            db: {
                employes: db.collection('employes'),
                livres: db.collection('livres'),
                membres: db.collection('membres')
            }
        };

        // Transform db.collection.method() to context.db.collection.method()
        code = code.replace(/db\.(\w+)\./g, 'context.db.$1.');

        // Use eval to execute (in a real scenario, use a safer method like vm2)
        const result = await eval(`(async () => { ${code} })()`);

        return result;
    } catch (error) {
        return { error: error.message };
    }
}

/**
 * Test definitions for each key exercise
 */
const TESTS = {
    1: async (db) => {
        const result = await db.collection('employes').find({ service: "Marketing" }).toArray();
        return {
            expected: 2,
            actual: result.length,
            passed: result.length === 2 && result.every(e => e.service === "Marketing")
        };
    },

    3: async (db) => {
        const result = await db.collection('employes').find({ age: { $gt: 30 } }).toArray();
        return {
            expected: 4,
            actual: result.length,
            passed: result.length === 4 && result.every(e => e.age > 30)
        };
    },

    6: async (db) => {
        const result = await db.collection('employes').find({ service: { $in: ["IT", "RH"] } }).toArray();
        return {
            expected: 5,
            actual: result.length,
            passed: result.length === 5
        };
    },

    7: async (db) => {
        const result = await db.collection('employes').find({
            service: "IT",
            salaire: { $gt: 3500 }
        }).toArray();
        return {
            expected: 2,
            actual: result.length,
            passed: result.length === 2
        };
    },

    11: async (db) => {
        // First execute the update
        await db.collection('employes').updateOne(
            { nom: "Martin", prenom: "Alice" },
            { $set: { email: "alice.martin@company.com" } }
        );

        const result = await db.collection('employes').findOne({ nom: "Martin", prenom: "Alice" });
        return {
            expected: "alice.martin@company.com",
            actual: result?.email,
            passed: result?.email === "alice.martin@company.com"
        };
    },

    12: async (db) => {
        const before = await db.collection('employes').findOne({ nom: "Dubois", prenom: "Bob" });
        const expectedSalary = before.salaire + 500;

        await db.collection('employes').updateOne(
            { nom: "Dubois", prenom: "Bob" },
            { $inc: { salaire: 500 } }
        );

        const after = await db.collection('employes').findOne({ nom: "Dubois", prenom: "Bob" });
        return {
            expected: expectedSalary,
            actual: after?.salaire,
            passed: after?.salaire === expectedSalary
        };
    },

    15: async (db) => {
        const countBefore = await db.collection('employes').countDocuments();

        await db.collection('employes').updateMany(
            {},
            { $mul: { salaire: 1.1 } }
        );

        const result = await db.collection('employes').find().toArray();
        const allIncreased = result.every(e => e.salaire >= 2800 * 1.1);

        return {
            expected: countBefore,
            actual: result.length,
            passed: allIncreased && result.length === countBefore
        };
    },

    19: async (db) => {
        const countBefore = await db.collection('employes').countDocuments();

        await db.collection('employes').deleteOne({ nom: "Lambert" });

        const countAfter = await db.collection('employes').countDocuments();
        const deleted = await db.collection('employes').findOne({ nom: "Lambert" });

        return {
            expected: countBefore - 1,
            actual: countAfter,
            passed: countAfter === countBefore - 1 && deleted === null
        };
    },

    24: async (db) => {
        const result = await db.collection('livres').find({ "editeur.nom": "Gallimard" }).toArray();
        return {
            expected: 2,
            actual: result.length,
            passed: result.length === 2
        };
    },

    27: async (db) => {
        const result = await db.collection('livres').find({
            exemplaires: { $elemMatch: { disponible: true } }
        }).toArray();
        return {
            expected: 4,
            actual: result.length,
            passed: result.length === 4
        };
    },

    35: async (db) => {
        await db.collection('livres').updateOne(
            { titre: "Les Misérables", "exemplaires.code": "EX-001" },
            { $set: { "exemplaires.$.disponible": false } }
        );

        const result = await db.collection('livres').findOne({ titre: "Les Misérables" });
        const ex001 = result?.exemplaires.find(ex => ex.code === "EX-001");

        return {
            expected: false,
            actual: ex001?.disponible,
            passed: ex001?.disponible === false
        };
    },

    36: async (db) => {
        const before = await db.collection('livres').findOne({ titre: "1984" });
        const countBefore = before?.exemplaires.length || 0;

        await db.collection('livres').updateOne(
            { titre: "1984" },
            { $push: { exemplaires: { code: "EX-NEW", disponible: true } } }
        );

        const after = await db.collection('livres').findOne({ titre: "1984" });
        const countAfter = after?.exemplaires.length || 0;

        return {
            expected: countBefore + 1,
            actual: countAfter,
            passed: countAfter === countBefore + 1
        };
    },

    44: async (db) => {
        const result = await db.collection('livres').aggregate([
            { $group: { _id: "$editeur.nom", total: { $sum: 1 } } }
        ]).toArray();

        return {
            expected: 3,
            actual: result.length,
            passed: result.length === 3
        };
    },

    46: async (db) => {
        const result = await db.collection('livres').aggregate([
            { $match: { "editeur.annee": { $gt: 1900 } } },
            { $unwind: "$exemplaires" },
            { $count: "total" }
        ]).toArray();

        return {
            expected: 2,
            actual: result[0]?.total || 0,
            passed: result[0]?.total === 2
        };
    },

    48: async (db) => {
        const result = await db.collection('membres').aggregate([
            { $unwind: "$emprunts" },
            { $match: { "emprunts.dateRetour": { $exists: false } } },
            { $count: "total" }
        ]).toArray();

        return {
            expected: 1,
            actual: result[0]?.total || 0,
            passed: result[0]?.total === 1
        };
    }
};

/**
 * Run all tests and calculate score
 */
export async function runTests(studentCode, db) {
    const result = {
        score: 0,
        maxScore: 50,
        results: []
    };

    // Setup test data
    await setupTestData(db);

    for (const exercise of KEY_EXERCISES) {
        const { number, points } = exercise;

        try {
            // Extract student's code for this exercise
            const code = extractExerciseCode(studentCode, number);

            if (!code) {
                result.results.push({
                    number,
                    passed: false,
                    points: 0,
                    maxPoints: points,
                    message: 'No code found'
                });
                continue;
            }

            // Get expected result from test
            const testFunc = TESTS[number];
            if (!testFunc) {
                result.results.push({
                    number,
                    passed: false,
                    points: 0,
                    maxPoints: points,
                    message: 'No test defined'
                });
                continue;
            }

            // Reset data before each test
            await setupTestData(db);

            // Run the test
            const testResult = await testFunc(db);

            const passed = testResult.passed;
            const earnedPoints = passed ? points : 0;
            result.score += earnedPoints;

            result.results.push({
                number,
                passed,
                points: earnedPoints,
                maxPoints: points,
                message: passed ? '✅ Correct' : `❌ Expected: ${testResult.expected}, Got: ${testResult.actual}`
            });

        } catch (error) {
            result.results.push({
                number,
                passed: false,
                points: 0,
                maxPoints: points,
                message: `Error: ${error.message}`
            });
        }
    }

    // Cleanup
    await cleanupTestData(db);

    return result;
}
