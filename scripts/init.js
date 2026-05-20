#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ANSI escape codes for stunning terminal aesthetics (Silicon-Valley-style)
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m'
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
  console.clear();
  // ASCII Art Banner
  console.log(`${colors.green}${colors.bright}`);
  console.log(`    ▲  ____            _   _        ____              _     _                    `);
  console.log(`   / \\|  _ \\ __ _  ___| |_(_) ___  | __ )  ___   ___ | |_  ___|_ __ __ _ _ __    `);
  console.log(`  / _ \\ |_) / _\` |/ _ \\ __| |/ __| |  _ \\ / _ \\ / _ \\| __|/ __| '__/ _\` | '_ \\   `);
  console.log(` / ___ \\  _ < (_| |  __/ |_| | (__  | |_) | (_) | (_) | |_ \\__ \\ | | (_| | |_) |  `);
  console.log(`/_/   \\_\\_| \\_\\__,_|\\___|\\__|_|\\___| |____/ \\___/ \\___/ \\__|___/_|  \\__,_| .__/   `);
  console.log(`                                                                         |_|      `);
  console.log(`==================================================================================${colors.reset}`);
  console.log(`${colors.cyan}${colors.bright}Welcome to Agentic Bootstrap v1.0.0${colors.reset}`);
  console.log(`Let's scaffold a production-grade AI-Agent collaboration workflow for your project.\n`);

  try {
    // Question 1: Project Name
    const projectNameInput = await askQuestion(`${colors.bright}❓ 1. Project Name (default: my-agentic-app): ${colors.reset}`);
    const projectName = projectNameInput.trim() || 'my-agentic-app';

    // Question 2: Tech Stack
    console.log(`\n${colors.bright}❓ 2. Select your Technical Stack:${colors.reset}`);
    console.log(`  [1] React / Next.js (TypeScript)`);
    console.log(`  [2] Vue / Nuxt (TypeScript)`);
    console.log(`  [3] Express / Node.js (Backend)`);
    console.log(`  [4] Pure HTML / Vanilla CSS / Modern JS`);
    const techChoiceInput = await askQuestion(`${colors.cyan}Enter selection [1-4] (default: 1): ${colors.reset}`);
    const techChoice = techChoiceInput.trim() || '1';

    let techStackName = '';
    let techCursorRules = '';
    switch (techChoice) {
      case '2':
        techStackName = 'Vue/Nuxt (TypeScript)';
        techCursorRules = '- Adhere to composition API and explicit TS typing.\n- Ensure RWD styles are configured via CSS variables.';
        break;
      case '3':
        techStackName = 'Express/Node.js';
        techCursorRules = '- Restrict modules to ES6 ESM modules.\n- Enforce strict separation between routes, controllers, and services.';
        break;
      case '4':
        techStackName = 'Vanilla Web Suite';
        techCursorRules = '- Use pure, semantic HTML5.\n- Configure core design tokens as CSS variables in global stylesheet.';
        break;
      default:
        techStackName = 'React/Next.js (TypeScript)';
        techCursorRules = '- Prioritize React functional components with TS interface typings.\n- Adhere strictly to Next.js App Router rules and server component segregation.';
    }

    // Question 3: Staging Environment Assessment Questionnaire
    console.log(`\n${colors.bright}❓ 3. Let's assess your Environment Strategy (Staging & Production):${colors.reset}`);
    const hasUsers = await askQuestion(`  • Will this project have active/paying users? (y/n, default: n): `);
    const hasOAuth = await askQuestion(`  • Does it integrate OAuth, payment systems, or third-party webhooks? (y/n, default: n): `);
    
    const isStagingNeeded = hasUsers.toLowerCase().startsWith('y') || hasOAuth.toLowerCase().startsWith('y');
    
    console.log(`\n${colors.magenta}${colors.bright}💡 System Recommendation:${colors.reset}`);
    if (isStagingNeeded) {
      console.log(`  => ${colors.green}${colors.bright}STAGING ENVIRONMENT REQUIRED.${colors.reset} (Based on security, integration, and risk profiles)`);
    } else {
      console.log(`  => ${colors.yellow}${colors.bright}DIRECT PRODUCTION DEPLOYMENT ALLOWED.${colors.reset} (Suitable for simple MVPs/landing pages)`);
    }

    // Question 4: Agent Language Preference
    console.log(`\n${colors.bright}❓ 4. Preferred Language for AI Agent developer chat:${colors.reset}`);
    console.log(`  [1] Traditional Chinese (繁體中文)`);
    console.log(`  [2] English`);
    const langChoiceInput = await askQuestion(`${colors.cyan}Enter selection [1-2] (default: 1): ${colors.reset}`);
    const langChoice = langChoiceInput.trim() || '1';
    const devLang = langChoice === '2' ? 'English' : 'Traditional Chinese (繁體中文)';

    console.log(`\n----------------------------------------------------------------------------------`);
    console.log(`${colors.cyan}🔄 Bootstrapping configurations in progress...${colors.reset}`);

    // Generate customized .cursorrules
    const cursorRulesContent = `# AI Agent Rules for ${projectName}

You are the AI Software Engineer operating on this repository. You must read and strictly conform to the **Agentic Software Engineering (ASE) Protocol** defined in \`PROJECT_RULES.md\`.

## 1. System Alignment Directives
- **Developer Chat Language**: Speak to the user in **${devLang}**.
- **Technical Language**: Write ALL code, variables, TS interfaces, comments, Git commits, and PRs in **English-only**.

## 2. Tech Stack Customization (${techStackName})
${techCursorRules}

## 3. Deployment Constraints (${isStagingNeeded ? 'Staging + Production' : 'Production-Only'})
- **Branching constraint**: AI is restricted to \`feature/*\` and \`bugfix/*\`.
${isStagingNeeded ? '- **CI/CD rule**: PRs merge to `develop` (Staging deployment) -> merge to `main` (Production deployment).' : '- **CI/CD rule**: Commits merge directly to `main` for Production.'}
- Never hardcode secrets. Always configure \`.env\` variables and verify in \`.gitignore\`.
`;

    // Generate customized task.md
    const taskMdContent = `# Task List - ${projectName}

- [ ] Initialize Environment Configurations
  - [ ] Set up \`.env.example\`
  - [ ] Initialize Git repository
- [ ] Implement Core Foundations
  - [ ] Configure global styling / CSS variables
  - [ ] Establish initial database/data schema
- [ ] Feature Scaffolding
  - [ ] Develop primary landing/login pages
  - [ ] Establish primary backend endpoints / mock APIs
- [ ] Verification & Deployment Setup
  - [ ] Set up automated CI/CD workflows
  - [ ] Deploy to initial Staging/Production environments
`;

    // Generate .env.example
    let envExampleContent = `# Environmental parameters for ${projectName}\n\nPORT=3000\nNODE_ENV=development\nDATABASE_URL=postgresql://user:pass@localhost:5432/db\n`;
    if (isStagingNeeded) {
      envExampleContent += `\n# Staging Third-Party API parameters\nSTAGING_OAUTH_REDIRECT_URL=https://staging.my-app.com/api/callback\nSTAGING_API_KEY=your_staging_key\n`;
    }
    envExampleContent += `\n# Production Third-Party API parameters\nPROD_OAUTH_REDIRECT_URL=https://my-app.com/api/callback\nPROD_API_KEY=your_production_key\n`;

    // Write files to root directory
    fs.writeFileSync('.cursorrules', cursorRulesContent);
    fs.writeFileSync('task.md', taskMdContent);
    fs.writeFileSync('.env.example', envExampleContent);

    console.log(`${colors.green}✔ Created customized .cursorrules${colors.reset}`);
    console.log(`${colors.green}✔ Created customized task.md${colors.reset}`);
    console.log(`${colors.green}✔ Created .env.example${colors.reset}`);

    console.log(`\n==================================================================================`);
    console.log(`${colors.green}${colors.bright}🎉 SUCCESS: ${projectName} is successfully bootstrapped!${colors.reset}`);
    console.log(`----------------------------------------------------------------------------------`);
    console.log(`Next Steps:`);
    console.log(`  1. Git Init your new workspace: \`git init\``);
    console.log(`  2. Clone/Copy \`PROJECT_RULES.md\` to your root.`);
    console.log(`  3. Boot up Cursor/Windsurf, and let your AI Agent read \`.cursorrules\`.`);
    console.log(`  4. Happy Coding! 🚀\n`);

  } catch (error) {
    console.error(`\n${colors.red}❌ Error occurred: ${error.message}${colors.reset}`);
  } finally {
    rl.close();
  }
}

main();
