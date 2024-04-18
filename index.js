const addBacklog = require("./srv/addBacklog")
const listBacklog = require("./srv/listBacklog")
const listBacklogs = require("./srv/listBacklogs")
const updateBacklog = require("./srv/updateBacklog")
const removeBacklog = require("./srv/removeBacklog")
const {initBacklogFs, initBacklogGh} = require("./init")
const {readFromFile} = require('./srv/utils/fileUtility')

var system = 0; // 0 for FS and 1 for GH
try{
    const credentials = readFromFile("./backlog-db/githubCredentials.json");
    const creds = JSON.parse(credentials);
    if (creds[0].default === null) system = 0;
    else system = 1;
}catch(error){
    console.log("Initialising.....");
}

function init(options){
    if (options.init){
        initBacklogFs(options)
        if(options.setcredentials) initBacklogGh(options)
    }
    if (options.setcredentials){
        initBacklogGh(options)
    }
    if (options.add){
        addBacklog(options,system)
    }
    if (options.list){
        listBacklog(options,system)
    }
    if(options.listall){
        listBacklogs(system)
    }
    if(options.remove){
        removeBacklog(options,system)
    }
    if(!options.list && options.completed){
        updateBacklog(options.name, "completed", system)
    }
    if(!options.list && options.working){
        updateBacklog(options.name, "working", system)
    }
}

module.exports = init