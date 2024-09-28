#! /usr/bin/env node

const figlet = require("figlet")
const {Command} = require("commander")

const init = require("./index")

const program = new Command()
console.log(figlet.textSync("Backlog"))

program
    .version("1.2.0")
    .description("manage your backlogs via cli")
    .option("-i, --init","Initialise")
    .option("-a, --add", "Add a Backlog")
    .option("-n, --name <value>", "Backlog name")
    .option("-un, --updatedname <value>", "Backlog name")
    .option("-d, --description <value>", "Backlog description")
    .option("-p, --priority <value>", "Backlog priority")
    .option("-dl, --deadline <value>", "Backlog deadline")
    .option("-t, --todo", "Status todo")
    .option("-l, --list", "List a Backlog")
    .option("-la, --listall", "List all Backlogs")
    .option("-r, --remove", "Remove a Backlog")
    .option("-c, --completed", "Completed status")
    .option("-w, --working", "Working status")
    .option("-sc, --setcredentials", "Set username, repo and token")
    .option("-cmd, --command", "Show all sample commands for CLI")
    .option("-pth, --path <value>", "Provide path of file to import backlogs")
    .option("-e, --edit", "Edit description, deadline, name, priority of backlogs")
    .option("-imp, --import", "Import backlogs from a file providing path to file")
    .parse(process.argv);

const options = program.opts()

init(options)