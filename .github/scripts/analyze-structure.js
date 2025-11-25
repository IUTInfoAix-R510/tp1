/**
 * Analyze the structure of the student's file (10 points)
 * Checks:
 * - Personal information filled (name, first name, date, group)
 * - Custom database name (not tp_mongodb_prenom_nom)
 * - All 49 exercises have some content
 */

export function analyzeStructure(code) {
    const result = {
        score: 0,
        maxScore: 10,
        details: []
    };

    // Check 1: Personal information filled (2 points)
    const nameRegex = /Nom\s*:\s*(?!_+\s*$)(.+)/;
    const prenomRegex = /Prénom\s*:\s*(?!_+\s*$)(.+)/;
    const dateRegex = /Date\s*:\s*(?!_+\s*$)(.+)/;
    const groupeRegex = /Groupe\s*:\s*(?!_+\s*$)(.+)/;

    const hasName = nameRegex.test(code);
    const hasPrenom = prenomRegex.test(code);
    const hasDate = dateRegex.test(code);
    const hasGroupe = groupeRegex.test(code);

    const personalInfoComplete = hasName && hasPrenom && hasDate && hasGroupe;

    if (personalInfoComplete) {
        result.score += 2;
        result.details.push({
            check: 'Personal information',
            passed: true,
            message: 'All personal information filled'
        });
    } else {
        const missing = [];
        if (!hasName) missing.push('nom');
        if (!hasPrenom) missing.push('prénom');
        if (!hasDate) missing.push('date');
        if (!hasGroupe) missing.push('groupe');
        result.details.push({
            check: 'Personal information',
            passed: false,
            message: `Missing: ${missing.join(', ')}`
        });
    }

    // Check 2: Custom database name (2 points)
    const dbNameRegex = /use\s*\(\s*['"](?!tp_mongodb_prenom_nom['"])([^'"]+)['"]\s*\)/;
    const dbNameMatch = code.match(dbNameRegex);

    if (dbNameMatch) {
        result.score += 2;
        result.details.push({
            check: 'Database name',
            passed: true,
            message: `Custom database: ${dbNameMatch[1]}`
        });
    } else {
        result.details.push({
            check: 'Database name',
            passed: false,
            message: 'Default database name not changed'
        });
    }

    // Check 3: Exercise completion indicators (6 points)
    // Count exercises with actual content (not just comments)
    const exercisePattern = /\/\/ ────+\s+Exercice\s+(\d+)\s+────+[\s\S]*?\/\/ Votre réponse :\s*\n([\s\S]*?)(?=\/\/ ────+|\/\/ ═══|$)/g;

    let matches;
    let completedCount = 0;
    const exercises = [];

    while ((matches = exercisePattern.exec(code)) !== null) {
        const exerciseNum = parseInt(matches[1]);
        const content = matches[2].trim();

        // Check if there's actual code (not just empty lines or comments)
        const hasCode = /\S/.test(content) &&
                       !/^\/\//.test(content.trim()) &&
                       content.trim() !== '';

        if (hasCode) {
            completedCount++;
        }

        exercises.push({ number: exerciseNum, hasContent: hasCode });
    }

    const completionRate = completedCount / 49;
    const completionPoints = Math.round(completionRate * 6);
    result.score += completionPoints;

    result.details.push({
        check: 'Exercise completion',
        passed: completedCount >= 45,
        message: `${completedCount}/49 exercises have content (${completionPoints}/6 points)`
    });

    return result;
}
