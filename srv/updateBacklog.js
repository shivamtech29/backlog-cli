const fs = require('fs');

function updateBacklog(name, status){
    const tasksJSON = fs.readFileSync('./backlog-db/backlogs.json', 'utf8');
    const tasks = JSON.parse(tasksJSON);

    const indexToUpdate = tasks.findIndex(obj => obj.Name.toLowerCase() === name.toLowerCase());

    if (indexToUpdate !== -1) {
        tasks[indexToUpdate].Status = status;
        console.log("Successfuly updated");
    } else {
        console.log("Backlog with name", name, "not found.");
    }
    const updatedTasksJSON = JSON.stringify(tasks);
    fs.writeFileSync('./backlog-db/backlogs.json', updatedTasksJSON);
}

module.exports = updateBacklog