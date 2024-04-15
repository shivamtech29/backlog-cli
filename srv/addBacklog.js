const fs = require('fs');
const uuid = require('uuid');
const {throwDeadlineValidationError, throwNameValidationError}  = require('./utils/errors')

function addBacklog(options){
    // Validation:
    // Name: Required, Deadline: xx-xx-yyyy, priority&description: optional

    var backlogObject = {
        name:           options.name,
        description:    options.description,
        priority:       options.priority,
        deadline:       options.deadline,
        status:         "todo"
    }
    
    if(typeof options.deadline === 'string'){
        const deadlineLength = options.deadline.length;
        if(deadlineLength != 10) throwDeadlineValidationError(options.deadline)
    }
    else throwDeadlineValidationError(options.deadline);
    
    if(!options.name || 
        typeof options.name !== 'string' || 
        options.name.startsWith("-")) throwNameValidationError();
    
    if(!options.description || typeof options.description !== 'string') backlogObject.description = "no description";
    if(!options.priority    || typeof options.priority    !== 'string') backlogObject.priority = "low";
    
    addToFile(backlogObject)
}

function addToFile(backlogObject){

    const taskid = uuid.v4();
    const tasksJSON = fs.readFileSync('./backlog-db/backlogs.json', 'utf8');
    const tasks = JSON.parse(tasksJSON);
    
    const newTask = { 
        Name:           backlogObject.name.toLowerCase(),
        Description:    backlogObject.description.toLowerCase(),
        Priority:       backlogObject.priority.toLowerCase(),
        Deadline:       backlogObject.deadline.toLowerCase(),
        Status:         backlogObject.status.toLowerCase(),
        TaskID:         taskid
    };

    tasks.push(newTask);
    const updatedTasksJSON = JSON.stringify(tasks);

    fs.writeFileSync('./backlog-db/backlogs.json', updatedTasksJSON);
    console.log("Successfully added task..");
}

module.exports = addBacklog