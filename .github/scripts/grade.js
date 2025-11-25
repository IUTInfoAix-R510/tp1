#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { MongoClient } from 'mongodb';
import { analyzeStructure } from './analyze-structure.js';
import { analyzeStatic } from './analyze-static.js';
import { runTests } from './run-tests.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const TEST_DB_NAME = 'tp_grading_test';

/**
 * Grade a student's MongoDB playground file
 */
async function gradeAssignment(filePath) {
    console.log('🎓 Starting automatic grading...\n');

    // Read the student's file
    const code = fs.readFileSync(filePath, 'utf8');

    // Initialize report
    const report = {
        timestamp: new Date().toISOString(),
        file: path.basename(filePath),
        structure: { score: 0, maxScore: 10, details: [] },
        static: { score: 0, maxScore: 40, completedExercises: 0, correctKeywords: 0, details: [] },
        tests: { score: 0, maxScore: 50, results: [] },
        totalScore: 0,
        feedback: []
    };

    try {
        // Step 1: Analyze structure (10 points)
        console.log('📋 Step 1/3: Analyzing structure...');
        report.structure = analyzeStructure(code);
        console.log(`   Score: ${report.structure.score}/${report.structure.maxScore}\n`);

        // Step 2: Static analysis (40 points)
        console.log('🔍 Step 2/3: Performing static analysis...');
        report.static = analyzeStatic(code);
        console.log(`   Score: ${report.static.score}/${report.static.maxScore}`);
        console.log(`   Completed: ${report.static.completedExercises}/49 exercises\n`);

        // Step 3: Run automated tests (50 points)
        console.log('🧪 Step 3/3: Running automated tests...');
        const client = new MongoClient(MONGODB_URI);

        try {
            await client.connect();
            console.log('   ✅ Connected to MongoDB');

            const db = client.db(TEST_DB_NAME);
            report.tests = await runTests(code, db);
            console.log(`   Score: ${report.tests.score}/${report.tests.maxScore}\n`);
        } finally {
            await client.close();
            console.log('   ✅ Disconnected from MongoDB\n');
        }

        // Calculate total score
        report.totalScore = report.structure.score + report.static.score + report.tests.score;

        // Generate feedback
        if (report.totalScore >= 80) {
            report.feedback.push('🎉 Excellent travail ! Vous maîtrisez bien MongoDB.');
        } else if (report.totalScore >= 60) {
            report.feedback.push('👍 Bon travail ! Quelques points à améliorer.');
        } else if (report.totalScore >= 40) {
            report.feedback.push('⚠️ Travail correct mais incomplet. Revoyez les exercices manquants.');
        } else {
            report.feedback.push('❌ Travail insuffisant. Consultez le README et complétez tous les exercices.');
        }

        // Add specific recommendations
        if (report.structure.score < report.structure.maxScore) {
            report.feedback.push('📝 N\'oubliez pas de remplir vos informations personnelles en haut du fichier.');
        }
        if (report.static.completedExercises < 49) {
            report.feedback.push(`📊 ${49 - report.static.completedExercises} exercices restent à compléter.`);
        }
        if (report.tests.score < report.tests.maxScore * 0.7) {
            report.feedback.push('🐛 Plusieurs requêtes ne produisent pas les résultats attendus. Testez-les dans mongosh.');
        }

    } catch (error) {
        console.error('❌ Error during grading:', error);
        report.error = error.message;
        report.feedback.push('❌ Une erreur s\'est produite pendant la notation. Vérifiez la syntaxe de votre code.');
    }

    // Write report to file
    const reportPath = path.join(path.dirname(filePath), '.github/scripts/grade-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // Display summary
    console.log('═══════════════════════════════════════════════════════════');
    console.log('📊 GRADING SUMMARY');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`Student file: ${report.file}`);
    console.log(`Grading date: ${new Date(report.timestamp).toLocaleString('fr-FR')}`);
    console.log('');
    console.log(`Structure:       ${report.structure.score}/${report.structure.maxScore} points`);
    console.log(`Static Analysis: ${report.static.score}/${report.static.maxScore} points`);
    console.log(`Automated Tests: ${report.tests.score}/${report.tests.maxScore} points`);
    console.log('───────────────────────────────────────────────────────────');
    console.log(`TOTAL SCORE:     ${report.totalScore}/100 points`);
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    report.feedback.forEach(msg => console.log(msg));
    console.log('');

    return report;
}

// Main execution
const filePath = process.argv[2];
if (!filePath) {
    console.error('Usage: node grade.js <path-to-playground-file>');
    process.exit(1);
}

if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found: ${filePath}`);
    process.exit(1);
}

gradeAssignment(filePath)
    .then(report => {
        process.exit(report.totalScore >= 50 ? 0 : 1);
    })
    .catch(error => {
        console.error('Fatal error:', error);
        process.exit(1);
    });
