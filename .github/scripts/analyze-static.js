/**
 * Static analysis of student code (40 points)
 * Checks for:
 * - Correct MongoDB methods usage
 * - Expected keywords per exercise
 * - Syntax correctness
 */

import * as acorn from 'acorn';

// Expected patterns for each exercise category
const EXPECTED_PATTERNS = {
    // Phase 3.4: Query exercises (1-10)
    1: { keywords: ['find', 'Marketing'], methods: ['find'] },
    2: { keywords: ['findOne', 'age', '32'], methods: ['findOne'] },
    3: { keywords: ['find', 'age', '$gt', '30'], methods: ['find'] },
    4: { keywords: ['find', 'salaire', '$lt', '3000'], methods: ['find'] },
    5: { keywords: ['find', 'age', '$gte', '$lte'], methods: ['find'] },
    6: { keywords: ['find', '$in', 'IT', 'RH'], methods: ['find'] },
    7: { keywords: ['find', 'service', 'IT', 'salaire', '$gt'], methods: ['find'] },
    8: { keywords: ['find', '$or', 'age', 'salaire'], methods: ['find'] },
    9: { keywords: ['find', '$ne', 'IT'], methods: ['find'] },
    10: { keywords: ['find', 'nom', '$regex', '^D'], methods: ['find'] },

    // Phase 3.5: Update exercises (11-18)
    11: { keywords: ['updateOne', 'Alice', 'Martin', '$set', 'email'], methods: ['updateOne'] },
    12: { keywords: ['updateOne', 'Bob', 'Dubois', '$inc', 'salaire', '500'], methods: ['updateOne'] },
    13: { keywords: ['updateOne', 'Charlie', 'Lambert', '$set', 'service', 'IT'], methods: ['updateOne'] },
    14: { keywords: ['updateOne', 'Alice', 'Martin', '$push', 'competences', 'MongoDB'], methods: ['updateOne'] },
    15: { keywords: ['updateMany', '$mul', 'salaire', '1.1'], methods: ['updateMany'] },
    16: { keywords: ['updateMany', '$set', 'actif', 'true'], methods: ['updateMany'] },
    17: { keywords: ['updateMany', 'service', 'IT', '$push', 'JavaScript'], methods: ['updateMany'] },
    18: { keywords: ['updateOne', 'Bob', 'Dubois', '$pull', 'Excel'], methods: ['updateOne'] },

    // Phase 3.6: Delete exercises (19-23)
    19: { keywords: ['deleteOne', 'Lambert'], methods: ['deleteOne'] },
    20: { keywords: ['deleteMany', 'age', '$gt', '33'], methods: ['deleteMany'] },
    21: { keywords: ['deleteMany', 'service', 'RH'], methods: ['deleteMany'] },
    22: { keywords: ['deleteMany', 'competences', '$exists', 'false'], methods: ['deleteMany'] },
    23: { keywords: ['drop'], methods: ['drop'] },

    // Phase 4.2: Nested documents queries (24-34)
    24: { keywords: ['find', 'editeur', 'Gallimard'], methods: ['find'] },
    25: { keywords: ['find', 'auteur', 'Victor', 'Hugo'], methods: ['find'] },
    26: { keywords: ['find', 'editeur', 'annee', '$gt', '1850'], methods: ['find'] },
    27: { keywords: ['find', 'exemplaires', '$elemMatch', 'disponible', 'true'], methods: ['find'] },
    28: { keywords: ['find', 'exemplaires', 'code', 'EX-001'], methods: ['find'] },
    29: { keywords: ['find', 'exemplaires', '$size', '2'], methods: ['find'] },
    30: { keywords: ['find', 'exemplaires', '$elemMatch', 'code', 'EX-001', 'disponible'], methods: ['find'] },
    31: { keywords: ['find', 'adresse', 'ville', 'Aix-en-Provence'], methods: ['find'] },
    32: { keywords: ['find', 'adresse', 'codePostal', '$regex', '^13'], methods: ['find'] },
    33: { keywords: ['find', 'preferences', 'Fantasy'], methods: ['find'] },
    34: { keywords: ['find', 'preferences', '$size', '$gte', '2'], methods: ['find'] },

    // Phase 4.3: Complex updates (35-43)
    35: { keywords: ['updateOne', 'titre', 'Les Misérables', '$set', 'disponible', 'false'], methods: ['updateOne'] },
    36: { keywords: ['updateOne', 'titre', '1984', '$push', 'exemplaires'], methods: ['updateOne'] },
    37: { keywords: ['updateOne', 'titre', 'Les Misérables', '$pull', 'exemplaires', 'EX-003'], methods: ['updateOne'] },
    38: { keywords: ['updateOne', 'titre', '1984', '$set', 'disponible', 'true'], methods: ['updateOne'] },
    39: { keywords: ['updateOne', 'nom', 'Sophie', 'Durand', '$push', 'preferences', 'Science-Fiction'], methods: ['updateOne'] },
    40: { keywords: ['updateOne', 'nom', 'Lucas', 'Bernard', '$pull', 'preferences', 'Policier'], methods: ['updateOne'] },
    41: { keywords: ['updateOne', 'nom', 'Sophie', 'Durand', '$set', 'adresse', 'ville', 'Marseille'], methods: ['updateOne'] },
    42: { keywords: ['updateOne', 'nom', 'Lucas', 'Bernard', '$push', 'emprunts'], methods: ['updateOne'] },
    43: { keywords: ['updateOne', 'nom', 'Lucas', 'Bernard', '$set', 'dateRetour'], methods: ['updateOne'] },

    // Phase 4.4: Aggregation (44-49)
    44: { keywords: ['aggregate', '$group', 'editeur', '$sum'], methods: ['aggregate'] },
    45: { keywords: ['aggregate', '$project', 'exemplaires', '$size', '$avg'], methods: ['aggregate'] },
    46: { keywords: ['aggregate', '$match', 'editeur', 'annee', '$gt', '1900', '$unwind', '$sum'], methods: ['aggregate'] },
    47: { keywords: ['aggregate', '$group', 'adresse', 'ville', '$sum'], methods: ['aggregate'] },
    48: { keywords: ['aggregate', '$unwind', 'emprunts', '$match', 'dateRetour', '$exists', 'false', '$count'], methods: ['aggregate'] },
    49: { keywords: ['aggregate', '$unwind', 'emprunts', '$lookup'], methods: ['aggregate'] }
};

export function analyzeStatic(code) {
    const result = {
        score: 0,
        maxScore: 40,
        completedExercises: 0,
        correctKeywords: 0,
        details: []
    };

    // Extract exercises from code
    const exercisePattern = /\/\/ ────+\s+Exercice\s+(\d+)\s+────+[\s\S]*?\/\/ Votre réponse :\s*\n([\s\S]*?)(?=\/\/ ────+|\/\/ ═══|$)/g;

    let matches;
    const exercises = new Map();

    while ((matches = exercisePattern.exec(code)) !== null) {
        const exerciseNum = parseInt(matches[1]);
        const content = matches[2].trim();
        exercises.set(exerciseNum, content);
    }

    // Analyze each exercise
    let totalKeywordScore = 0;
    let exercisesWithContent = 0;

    for (let i = 1; i <= 49; i++) {
        const content = exercises.get(i) || '';
        const expected = EXPECTED_PATTERNS[i];

        if (!expected) continue; // Skip if no pattern defined

        // Check if exercise has content
        const hasContent = /\S/.test(content) &&
                          !/^\/\//.test(content.trim()) &&
                          content.trim() !== '';

        if (!hasContent) {
            result.details.push({
                exercise: i,
                passed: false,
                message: 'Empty or only comments'
            });
            continue;
        }

        exercisesWithContent++;

        // Check for expected methods
        const methodsFound = expected.methods.filter(method =>
            new RegExp(`\\.${method}\\s*\\(`).test(content)
        );

        // Check for expected keywords (case insensitive)
        const keywordsFound = expected.keywords.filter(keyword =>
            content.toLowerCase().includes(keyword.toLowerCase())
        );

        const keywordScore = keywordsFound.length / expected.keywords.length;
        totalKeywordScore += keywordScore;

        const passed = methodsFound.length > 0 && keywordScore >= 0.5;

        result.details.push({
            exercise: i,
            passed: passed,
            methodsFound: methodsFound.length,
            methodsExpected: expected.methods.length,
            keywordsFound: keywordsFound.length,
            keywordsExpected: expected.keywords.length,
            message: passed ? 'Looks correct' : `Missing: ${expected.methods.filter(m => !methodsFound.includes(m)).join(', ')}`
        });
    }

    result.completedExercises = exercisesWithContent;
    result.correctKeywords = Math.round((totalKeywordScore / 49) * 100);

    // Calculate score
    // 20 points for completion (exercises with content)
    const completionScore = Math.round((exercisesWithContent / 49) * 20);

    // 20 points for keyword correctness
    const keywordScore = Math.round((totalKeywordScore / 49) * 20);

    result.score = completionScore + keywordScore;

    return result;
}
