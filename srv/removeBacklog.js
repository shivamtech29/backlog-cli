const fs = require('fs');

function removeBacklog(name){
    const tasksJSON = fs.readFileSync('./srv/db/backlogs.json', 'utf8');
    const tasks = JSON.parse(tasksJSON);

    const updTasks = tasks.filter(obj => obj.Name.toLowerCase() !== name.toLowerCase());
    
    const updatedTasksJSON = JSON.stringify(updTasks);
    fs.writeFileSync('./srv/db/backlogs.json', updatedTasksJSON);
    console.log("Successfully removed task..");
}

module.exports = removeBacklog