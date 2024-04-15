const fs = require('fs');
const listBacklogs = require('./listBacklogs');
const {throwNameValidationError, noValidBacklogFoundError}  = require('./utils/errors')

function removeBacklog(options){
    const tasksJSON = fs.readFileSync('./backlog-db/backlogs.json', 'utf8');
    const tasks = JSON.parse(tasksJSON);

    if(!options.name || 
        typeof options.name !== 'string' || 
        options.name.startsWith("-")) throwNameValidationError();
    
    const updTasks = tasks.filter(obj => obj.Name.toLowerCase() !== options.name.toLowerCase());
    
    if (tasks.length > updTasks.length){
        const updatedTasksJSON = JSON.stringify(updTasks);
        console.log("Successfully removed task..");
        fs.writeFileSync('./backlog-db/backlogs.json', updatedTasksJSON);
    }
    else {
        noValidBacklogFoundError(options.name)
    }
    
    listBacklogs();
}

module.exports = removeBacklog