const fs = require('fs');
const listBacklogs = require('./listBacklogs');
const {throwNameValidationError, noValidBacklogFoundError}  = require('./utils/errors')
const {writeBacklogsToFile, readBacklogsFromFile} = require('./utils/fileUtility')

function removeBacklog(options){
    const tasksJSON = readBacklogsFromFile();
    const tasks = JSON.parse(tasksJSON);

    if(!options.name || 
        typeof options.name !== 'string' || 
        options.name.startsWith("-")) throwNameValidationError();
    
    const updTasks = tasks.filter(obj => obj.Name.toLowerCase() !== options.name.toLowerCase());
    
    if (tasks.length > updTasks.length){
        const updatedTasksJSON = JSON.stringify(updTasks);
        console.log("Successfully removed task..");
        writeBacklogsToFile(updatedTasksJSON);
    }
    else {
        noValidBacklogFoundError(options.name)
    }
    
    listBacklogs();
}

module.exports = removeBacklog