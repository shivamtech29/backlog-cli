const fs = require('fs');
const listBacklogs = require('./listBacklogs');
const {throwNameValidationError, noValidBacklogFoundError}  = require('./utils/errors')
const {writeToFile, readFromFile} = require('./utils/fileUtility')

function removeBacklog(options){
    if(system == 0){
        const tasksJSON = readFromFile();
        const tasks = JSON.parse(tasksJSON);
    }
    else{
        // Code to fetch from Github and parse
    }

    if(!options.name || 
        typeof options.name !== 'string' || 
        options.name.startsWith("-")) throwNameValidationError();
    
    const updTasks = tasks.filter(obj => obj.Name.toLowerCase() !== options.name.toLowerCase());
    
    if (tasks.length > updTasks.length){
        console.log("Successfully removed task..");
        if(system == 0){
            const updatedTasksJSON = JSON.stringify(updTasks);
            writeToFile(updatedTasksJSON);
        }
        else{
            // Code to add to Github
        }
    }
    else {
        noValidBacklogFoundError(options.name)
    }
    
    listBacklogs();
}

module.exports = removeBacklog