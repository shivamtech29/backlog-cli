const fs = require('fs');
const objectToTable = require("./utils/objectToTable")

function listBacklogs(){
    const tasksJSON = fs.readFileSync('./srv/db/backlogs.json', 'utf8');
    const tasks = JSON.parse(tasksJSON);
    console.log(objectToTable(tasks))
}

module.exports = listBacklogs