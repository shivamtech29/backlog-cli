const fs = require('fs');
const listBacklogs = require('./listBacklogs');
const {throwNameValidationError, noValidBacklogFoundError}  = require('./utils/errors')
const {writeToFile, readFromFile} = require('./utils/fileUtility')

function updateBacklog(name, status, system){
    if(system == 0){
        const tasksJSON = readFromFile();
        const tasks = JSON.parse(tasksJSON);
        if(!name || typeof name !== 'string' || name.startsWith("-")) throwNameValidationError();
    
        const indexToUpdate = tasks.findIndex(obj => obj.Name.toLowerCase() === name.toLowerCase());

        if (indexToUpdate !== -1) {
            tasks[indexToUpdate].Status = status;
            console.log("Successfuly updated");
        } else {
            listBacklogs(system);
            noValidBacklogFoundError(name);
        }
        const updatedTasksJSON = JSON.stringify(tasks);
        writeToFile(updatedTasksJSON);

        listBacklogs(system);
    }
    else{
        issueMarkAsClosed(options.name,"completed")
    }
    
}

module.exports = updateBacklog