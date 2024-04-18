const fs = require('fs');
const objectToTable = require("./utils/objectToTable")
const {readFromFile} = require('./utils/fileUtility')
const listBacklogs = require("./listBacklogs")

function listBacklogByPriority(tasks,priority){
    const updTasks = tasks.filter(obj => obj.Priority.toLowerCase() === priority.toLowerCase());
    console.log(objectToTable(updTasks));
}
function listBacklogByDeadline(tasks,deadline){
    const updTasks = tasks.filter(obj => obj.Deadline === deadline);
    console.log(objectToTable(updTasks));
}
function listBacklogByStatus(tasks,status){
    const updTasks = tasks.filter(obj => obj.Status.toLowerCase() === status.toLowerCase());
    console.log(objectToTable(updTasks));
}


async function listBacklog(options,system){
    var tasks;
    if(system == 0){
        const tasksJSON = readFromFile();
        tasks = JSON.parse(tasksJSON);
    }
    else{
        tasks = await listBacklogs(system,1)
    }

    if(options.priority)listBacklogByPriority(tasks,options.priority)
    if(system == 0 && options.todo)listBacklogByStatus(tasks, "todo")
    if(options.deadline)listBacklogByDeadline(tasks,options.deadline)
    if(system == 0 && options.working)listBacklogByStatus(tasks, "working")
    if(system == 0 && options.completed)listBacklogByStatus(tasks, "completed")
}

module.exports = listBacklog