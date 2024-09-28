const { writeToFile, readFromFile } = require("../utils/fileUtility");
const listBacklogs = require('../listBacklogs');

function importBacklogs(system, options){
    var tasks;
    if(system != 0){
    return
    }
    path = options.path.toLowerCase()
    tasksJSONNew = readFromFile(path);
    var tasks1 = JSON.parse(tasksJSONNew);
    tasksJSON = readFromFile();
    var tasks2 = JSON.parse(tasksJSON);

    tasks = tasks2.concat(tasks1)
    const updatedTasksJSON = JSON.stringify(tasks, null, 2);
    writeToFile(updatedTasksJSON)
    listBacklogs(system)
}


module.exports = importBacklogs