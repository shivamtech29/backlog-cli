const fs = require('fs');

function readFromFile(path = "./backlog-db/backlogs.json"){
    return fs.readFileSync(path, 'utf8');
}

function writeToFile(tasks,path = './backlog-db/backlogs.json'){
    fs.writeFileSync(path, tasks);
}

module.exports = {
    readFromFile,
    writeToFile
}