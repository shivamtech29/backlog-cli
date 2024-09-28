const chalk = require('chalk'); // For adding color, if installed (npm install chalk)

function showCommands() {
    console.log(chalk.bold("\nAvailable Commands:"));
    
    console.log(chalk.green("\nAdd a backlog"));
    console.log(chalk.yellow("  backlog -a -n \"Name\" -d \"Description\" -dl \"01-01-2024\" -p \"Low\" -t"));

    console.log(chalk.green("\nList a backlog by priority"));
    console.log(chalk.yellow("  backlog -l -p \"high\""));

    console.log(chalk.green("\nList a backlog by status"));
    console.log(chalk.yellow("  backlog -l -w"));

    console.log(chalk.green("\nList all backlogs"));
    console.log(chalk.yellow("  backlog -la"));

    console.log(chalk.green("\nEdit a backlog"));
    console.log(chalk.yellow("  backlog -e -n \"Name\" -un \"UpdatedName\" -d \"Description\" -dl \"02-02-2024\" -p \"High\""));

    console.log(chalk.green("\nImport backlogs"));
    console.log(chalk.yellow("  backlog -imp -pth \"./path_to_file\""));

    console.log(chalk.green("\nUpdate status of backlog"));
    console.log(chalk.yellow("  backlog -n \"Name\" -w"));

    console.log(chalk.green("\nRemove a backlog"));
    console.log(chalk.yellow("  backlog -r -n \"Name\""));

    console.log(""); // For better spacing
}

module.exports = showCommands;