Contributing to backlog-cli
First off, thanks for taking the time to contribute! 🎉

The following is a set of guidelines for contributing to the [Your Project Name] CLI. These are mostly guidelines, not strict rules, so use your best judgment, and feel free to propose changes to this document.

Code of Conduct
By participating in this project, you agree to uphold the Code of Conduct. Please review it to ensure that your contributions are respectful and constructive.

How to Contribute
Reporting Bugs 🐛
If you encounter any bugs while using the CLI, please:

Search for existing issues to ensure it's not already reported.
If no issue exists, create a new issue using the bug report template. Include detailed steps to reproduce, expected behavior, actual behavior, and any relevant logs or screenshots.
Suggesting Features 💡
If you have a feature request or an enhancement idea:

Search for existing feature requests in the issues tab.
If none exists, create a new issue using the feature request template. Be as clear as possible about why the feature would be useful and how it should work.
Contributing Code 🔨
You can contribute code in the form of:

Bug fixes
New features
Documentation improvements
Before submitting code, please make sure it aligns with the existing project structure and conventions (see Style Guide and Testing).

Development Workflow
1. Fork the repository
Create a fork of the repository to work on changes without affecting the main codebase:

bash
Copy code
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
2. Set up the development environment
Install the project's dependencies:

bash
Copy code
npm install
Make sure the CLI is linked locally:

bash
Copy code
npm link
Now you can test the CLI tool locally by running the commands as if it was globally installed.

3. Create a new branch
Create a new branch to work on your changes:

bash
Copy code
git checkout -b feature/your-feature
4. Make changes
Follow the Style Guide.
Ensure your changes don’t break any existing functionality.
Add unit tests for any new features or bug fixes (see Testing).
5. Commit your changes
Please follow the Commit Message Guidelines.

6. Push your branch
bash
Copy code
git push origin feature/your-feature
Style Guide
Ensure your code follows the established coding style in the repository:

Use ESLint for JavaScript code formatting. Lint your code by running:

bash
Copy code
npm run lint
Indentation: Use 2 spaces for indentation.

Variable naming: Use camelCase for variables and functions.

Write JSDoc comments for functions and methods.

Testing
Before submitting your changes, make sure all existing tests pass and that you've written new tests where applicable:

Run tests:

bash
Copy code
npm test
Add new tests for any features or bug fixes you’ve implemented.

Commit Message Guidelines
We use a structured format for commit messages based on Conventional Commits. This helps automate the release process and generate changelogs.

Each commit message should have the following format:

php
Copy code
<type>(<scope>): <subject>
Type: The type of change you’re committing. Common types include:

feat: A new feature
fix: A bug fix
docs: Documentation changes
style: Formatting, missing semi-colons, etc.
refactor: Code changes that neither fix a bug nor add a feature
test: Adding or modifying tests
chore: Changes to the build process or auxiliary tools and libraries
Scope: The part of the codebase affected (e.g., cli, auth, config).

Subject: A short, descriptive message about the change.

Example:

sql
Copy code
feat(cli): add support for new flag --verbose
Code Review
After you’ve submitted your Pull Request (PR), it will be reviewed by the maintainers. They may ask you to make changes before it can be merged. PRs that do not adhere to these guidelines will be rejected.
