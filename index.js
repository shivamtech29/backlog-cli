const addBacklog = require("./srv/addBacklog")
const listBacklog = require("./srv/listBacklog")
const listBacklogs = require("./srv/listBacklogs")
const updateBacklog = require("./srv/updateBacklog")
const removeBacklog = require("./srv/removeBacklog")
const editBacklog = require("./srv/editBacklog")
const showCommands = require("./srv/showCommands")
const { initBacklogFs, initBacklogGh } = require("./init")
const { readFromFile } = require('./srv/utils/fileUtility')
const importBacklogs = require("./srv/transfer/import")

function getSystem() {
    try {
        const credentials = readFromFile("./backlog-db/githubCredentials.json");
        const creds = JSON.parse(credentials);
        if (creds[0].default === null) return 0;
        else return 1;
    } catch (error) {
        console.log("Initialising.....");
    }
}

function init(options) {
    if (options.init) {
        initBacklogFs(options)
        if (options.setcredentials) initBacklogGh(options)
    }
    if (options.setcredentials) {
        initBacklogGh(options)
    }
    if (options.add) {
        var system = getSystem()
        addBacklog(options, system)
    }
    if (options.list) {
        var system = getSystem()
        listBacklog(options, system)
    }
    if (options.listall) {
        var system = getSystem()
        listBacklogs(system)
    }
    if (options.remove) {
        var system = getSystem()
        removeBacklog(options, system)
    }
    if (options.completed) {
        var system = getSystem()
        updateBacklog(options.name, "completed", system)
    }
    if (options.working) {
        var system = getSystem()
        updateBacklog(options.name, "working", system)
    }
    if (options.edit) {
        var system = getSystem()
        editBacklog(options, system)
    }
    if (options.import) {
        var system = getSystem()
        importBacklogs(system, options)
    }
    if (options.command) {
        showCommands()
    }
}

module.exports = init