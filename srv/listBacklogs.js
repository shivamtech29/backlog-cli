const fs = require('fs');
const objectToTable = require("./utils/objectToTable")
const {readFromFile} = require('./utils/fileUtility')


function listBacklogs(system){
    if(system == 0){
        const tasksJSON = readFromFile();
        const tasks = JSON.parse(tasksJSON);
    }
    else{
        // Code to fetch from Github and parse
    }
    console.log(objectToTable(tasks))
}

module.exports = listBacklogs