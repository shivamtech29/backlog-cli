const addBacklog = require("./srv/addBacklog")
const listBacklog = require("./srv/listBacklog")
const listBacklogs = require("./srv/listBacklogs")
const updateBacklog = require("./srv/updateBacklog")
const removeBacklog = require("./srv/removeBacklog")
const initBacklog = require("./init")

function init(options){
    if (options.init){
        initBacklog()
    }
    if (options.add){
        addBacklog(options)
    }
    if (options.list){
        listBacklog(options)
    }
    if(options.listall){
        listBacklogs()
    }
    if(options.remove){
        removeBacklog(options)
    }
    if(!options.list && options.completed){
        updateBacklog(options.name, "completed")
    }
    if(!options.list && options.working){
        updateBacklog(options.name, "working")
    }
}

module.exports = init