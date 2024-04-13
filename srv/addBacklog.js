const fs = require('fs');

function addBacklog(options){
    // validate inputs
    addToFile(options.name, options.description, options.priority, options.deadline, "Todo")
}

function addToFile(name,des,prio,deadline,status){

    const tasksJSON = fs.readFileSync('./backlog-db/backlogs.json', 'utf8');
    const tasks = JSON.parse(tasksJSON);
    
    const newTask = { 
        Name: name.toLowerCase(),
        Description: des.toLowerCase(),
        Priority: prio.toLowerCase(),
        Deadline: deadline.toLowerCase(),
        Status: status.toLowerCase()
    };

    tasks.push(newTask);
    const updatedTasksJSON = JSON.stringify(tasks);

    fs.writeFileSync('./backlog-db/backlogs.json', updatedTasksJSON);
    console.log("Successfully added task..");
}

module.exports = addBacklog