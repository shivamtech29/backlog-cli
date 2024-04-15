const fs = require('fs');
const listBacklogs = require('./listBacklogs');


function removeBacklog(name){
    const tasksJSON = fs.readFileSync('./backlog-db/backlogs.json', 'utf8');
    const tasks = JSON.parse(tasksJSON);

    const updTasks = tasks.filter(obj => obj.Name.toLowerCase() !== name.toLowerCase());
    
    const updatedTasksJSON = JSON.stringify(updTasks);
    fs.writeFileSync('./backlog-db/backlogs.json', updatedTasksJSON);
    console.log("Successfully removed task..");
    listBacklogs();
}

module.exports = removeBacklog