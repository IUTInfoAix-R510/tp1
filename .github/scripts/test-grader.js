#!/usr/bin/env node

/**
 * Test script for the grading system (without MongoDB)
 * Tests only structure and static analysis
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { analyzeStructure } from './analyze-structure.js';
import { analyzeStatic } from './analyze-static.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testGrader(filePath) {
    console.log('═══════════════════════════════════════════════════════════');
    console.log('🧪 TESTING GRADING SYSTEM (Structure + Static Analysis Only)');
    console.log('═══════════════════════════════════════════════════════════\n');

    // Read the student's file
    const code = fs.readFileSync(filePath, 'utf8');

    const report = {
        timestamp: new Date().toISOString(),
        file: path.basename(filePath),
        structure: { score: 0, maxScore: 10, details: [] },
        static: { score: 0, maxScore: 40, completedExercises: 0, correctKeywords: 0, details: [] },
        tests: { score: 0, maxScore: 50, message: 'Skipped (MongoDB not available)' },
        totalScore: 0,
        feedback: []
    };

    try {
        // Step 1: Analyze structure (10 points)
        console.log('📋 Step 1/2: Analyzing structure...');
        report.structure = analyzeStructure(code);
        console.log(`   Score: ${report.structure.score}/${report.structure.maxScore}`);

        // Show details
        report.structure.details.forEach(detail => {
            const icon = detail.passed ? '✅' : '❌';
            console.log(`   ${icon} ${detail.check}: ${detail.message}`);
        });
        console.log('');

        // Step 2: Static analysis (40 points)
        console.log('🔍 Step 2/2: Performing static analysis...');
        report.static = analyzeStatic(code);
        console.log(`   Score: ${report.static.score}/${report.static.maxScore}`);
        console.log(`   Completed: ${report.static.completedExercises}/49 exercises`);
        console.log(`   Keywords correctness: ${report.static.correctKeywords}%`);

        // Show sample of exercise analysis (first 10)
        console.log('\n   Sample exercise analysis (first 10):');
        report.static.details.slice(0, 10).forEach(detail => {
            const icon = detail.passed ? '✅' : '❌';
            console.log(`   ${icon} Ex ${detail.exercise}: ${detail.message}`);
        });
        console.log('');

        // Calculate total (without tests)
        report.totalScore = report.structure.score + report.static.score;

        // Generate feedback
        const percentWithoutTests = (report.totalScore / 50) * 100;

        console.log('💬 Feedback generation...');
        if (percentWithoutTests >= 80) {
            report.feedback.push('🎉 Excellent structure and keyword usage!');
        } else if (percentWithoutTests >= 60) {
            report.feedback.push('👍 Good structure, some improvements possible.');
        } else {
            report.feedback.push('⚠️ Work needs improvement. Check missing exercises.');
        }

        if (report.structure.score < report.structure.maxScore) {
            report.feedback.push('📝 Remember to fill in all personal information.');
        }
        if (report.static.completedExercises < 49) {
            report.feedback.push(`📊 ${49 - report.static.completedExercises} exercises still to complete.`);
        }

        console.log('');

        // Write report
        const reportPath = path.join(__dirname, 'test-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

        // Display summary
        console.log('═══════════════════════════════════════════════════════════');
        console.log('📊 TEST GRADING SUMMARY');
        console.log('═══════════════════════════════════════════════════════════');
        console.log(`Student file: ${report.file}`);
        console.log(`Test date: ${new Date(report.timestamp).toLocaleString('fr-FR')}`);
        console.log('');
        console.log(`Structure:       ${report.structure.score}/${report.structure.maxScore} points`);
        console.log(`Static Analysis: ${report.static.score}/${report.static.maxScore} points`);
        console.log(`Automated Tests: ${report.tests.score}/${report.tests.maxScore} points (${report.tests.message})`);
        console.log('───────────────────────────────────────────────────────────');
        console.log(`PARTIAL SCORE:   ${report.totalScore}/50 points (without tests)`);
        console.log(`PROJECTED:       ${Math.round((report.totalScore / 50) * 100)}/100 (if tests pass perfectly)`);
        console.log('═══════════════════════════════════════════════════════════');
        console.log('');

        console.log('💬 Feedback:');
        report.feedback.forEach(msg => console.log(`   ${msg}`));
        console.log('');

        console.log(`✅ Test report saved to: ${reportPath}`);
        console.log('');
        console.log('ℹ️  Note: To test with MongoDB, start MongoDB locally with:');
        console.log('   sudo systemctl start mongodb');
        console.log('   or use Docker:');
        console.log('   docker run -d -p 27017:27017 mongo:7.0');

        return report;

    } catch (error) {
        console.error('❌ Error during testing:', error);
        report.error = error.message;
        report.feedback.push('❌ An error occurred. Check your code syntax.');
        return report;
    }
}

// Main execution
const filePath = process.argv[2];
if (!filePath) {
    console.error('Usage: node test-grader.js <path-to-playground-file>');
    console.error('Example: node test-grader.js ../../playground-tp1-test.mongodb.js');
    process.exit(1);
}

if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found: ${filePath}`);
    process.exit(1);
}

testGrader(filePath)
    .then(report => {
        process.exit(0);
    })
    .catch(error => {
        console.error('Fatal error:', error);
        process.exit(1);
    });
