const fs = require('fs');
const objectToTable = require("./utils/objectToTable")

function listBacklogByPriority(tasks,priority){
    const updTasks = tasks.filter(obj => obj.Priority.toLowerCase() === priority.toLowerCase());
    console.log(objectToTable(updTasks));
}
function listBacklogByDeadline(tasks,deadline){
    const updTasks = tasks.filter(obj => obj.Deadline.toLowerCase() === deadline.toLowerCase());
    console.log(objectToTable(updTasks));
}
function listBacklogByStatus(tasks,status){
    const updTasks = tasks.filter(obj => obj.Status.toLowerCase() === status.toLowerCase());
    console.log(objectToTable(updTasks));
}


function listBacklog(options){
    const tasksJSON = fs.readFileSync('./backlog-db/backlogs.json', 'utf8');
    const tasks = JSON.parse(tasksJSON);
    
    if(options.priority)listBacklogByPriority(tasks,options.priority)
    if(options.todo)listBacklogByStatus(tasks, "todo")
    if(options.deadline)listBacklogByDeadline(tasks,options.deadline)
    if(options.working)listBacklogByStatus(tasks, "working")
    if(options.completed)listBacklogByStatus(tasks, "completed")
}

module.exports = listBacklog