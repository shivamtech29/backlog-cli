const fs = require('fs');
const objectToTable = require("./utils/objectToTable")
const {readBacklogsFromFile} = require('./utils/fileUtility')


function listBacklogs(){
    const tasksJSON = readBacklogsFromFile();
    const tasks = JSON.parse(tasksJSON);
    console.log(objectToTable(tasks))
}

module.exports = listBacklogs