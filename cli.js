#! /usr/bin/env node

const figlet = require("figlet")
const {Command} = require("commander")

const init = require("./index")

const program = new Command()
console.log(figlet.textSync("Backlog"))

program
    .version("0.0.1")
    .description("manage your backlogs via cli")
    .option("-i, --init","Initialise")
    .option("-a, --add", "Add a Backlog")
    .option("-n, --name <value>", "Backlog name")
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
    .option("-rp, --repo", "Use this repo instead of deafult")
    .parse(process.argv);

const options = program.opts()

init(options)