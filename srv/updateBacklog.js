const fs = require('fs');
const listBacklogs = require('./listBacklogs');
const {throwNameValidationError, noValidBacklogFoundError}  = require('./utils/errors')
const {writeToFile, readFromFile} = require('./utils/fileUtility')

function updateBacklog(name, status){
    if(system == 0){
        const tasksJSON = readFromFile();
        const tasks = JSON.parse(tasksJSON);
    }
    else{
        // Code to fetch from Github and parse
    }
    if(!name || typeof name !== 'string' || name.startsWith("-")) throwNameValidationError();
    
    const indexToUpdate = tasks.findIndex(obj => obj.Name.toLowerCase() === name.toLowerCase());

    if (indexToUpdate !== -1) {
        tasks[indexToUpdate].Status = status;
        console.log("Successfuly updated");
    } else {
        listBacklogs();
        noValidBacklogFoundError(name);
    }
    if(system == 0){
        const updatedTasksJSON = JSON.stringify(tasks);
        writeToFile(updatedTasksJSON);
    }
    else{
        // Code to add to Github
    }
    listBacklogs();
}

module.exports = updateBacklog