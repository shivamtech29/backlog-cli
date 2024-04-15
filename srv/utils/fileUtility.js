const fs = require('fs');

function readBacklogsFromFile(){
    return fs.readFileSync('./backlog-db/backlogs.json', 'utf8');
}

function writeBacklogsToFile(tasks){
    fs.writeFileSync('./backlog-db/backlogs.json', tasks);
}

module.exports = {
    readBacklogsFromFile,
    writeBacklogsToFile
}