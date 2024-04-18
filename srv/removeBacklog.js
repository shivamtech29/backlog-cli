const fs = require('fs');
const listBacklogs = require('./listBacklogs');
const {throwNameValidationError, noValidBacklogFoundError}  = require('./utils/errors')
const {writeToFile, readFromFile} = require('./utils/fileUtility')
const {issueMarkAsClosed} = require("./utils/githubUtility")

function removeBacklog(options,system){
    if(system == 0){
        const tasksJSON = readFromFile();
        const tasks = JSON.parse(tasksJSON);
        if(!options.name || 
            typeof options.name !== 'string' || 
            options.name.startsWith("-")) throwNameValidationError();
        
        const updTasks = tasks.filter(obj => obj.Name.toLowerCase() !== options.name.toLowerCase());
        
        if (tasks.length > updTasks.length){
            console.log("Successfully removed task..");
            const updatedTasksJSON = JSON.stringify(updTasks);
            writeToFile(updatedTasksJSON);
        }
        else {
            noValidBacklogFoundError(options.name)
        }
        
        listBacklogs();
    }
    else{
        issueMarkAsClosed(options.name,"not_planned")
    }

    
}

module.exports = removeBacklog