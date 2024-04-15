const fs = require('fs');
const listBacklogs = require('./listBacklogs');
const {throwNameValidationError, noValidBacklogFoundError}  = require('./utils/errors')

function updateBacklog(name, status){
    const tasksJSON = fs.readFileSync('./backlog-db/backlogs.json', 'utf8');
    const tasks = JSON.parse(tasksJSON);
    if(!name || typeof name !== 'string' || name.startsWith("-")) throwNameValidationError();
    
    const indexToUpdate = tasks.findIndex(obj => obj.Name.toLowerCase() === name.toLowerCase());

    if (indexToUpdate !== -1) {
        tasks[indexToUpdate].Status = status;
        console.log("Successfuly updated");
    } else {
        listBacklogs();
        noValidBacklogFoundError(name);
    }
    const updatedTasksJSON = JSON.stringify(tasks);
    fs.writeFileSync('./backlog-db/backlogs.json', updatedTasksJSON);
    listBacklogs();
}

module.exports = updateBacklog