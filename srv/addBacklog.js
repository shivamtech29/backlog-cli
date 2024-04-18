const uuid = require('uuid');
const {throwDeadlineValidationError, throwNameValidationError}  = require('./utils/errors')
const {writeToFile, readFromFile} = require('./utils/fileUtility')

function addBacklog(options,system){
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
    
    if(system == 0) addToFile(backlogObject)
    else            addToGithub(backlogObject)
}

function addToFile(backlogObject){

    const taskid = uuid.v4();
    const tasksJSON = readFromFile()
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

    writeToFile(updatedTasksJSON);
    console.log("Successfully added task..");
}

function addToGithub(backlogObject){
    // Code to add to Github Issues
}

module.exports = addBacklog