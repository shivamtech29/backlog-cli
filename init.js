const fs = require('fs');
const path = require('path');
const inquirer = require("inquirer");
const {writeToFile, readFromFile} = require('./srv/utils/fileUtility')

function createFileDirectory(directoryPath,fileName,data){
    const filePath = path.join(directoryPath, fileName);

    fs.mkdir(directoryPath, { recursive: true }, (err) => {
        if (err) {
            console.error('Error creating directory:', err);
        } else {
            const jsonData = JSON.stringify(data, null, 2); 

            fs.writeFile(filePath, jsonData, (err) => {
                if (err) {
                    console.error('Error creating JSON file:', err);
                }
            });
        }
    });
}

function initBacklogFs(){
const data = [
    {
        "Name": "demo",
        "Description": "demo-description",
        "Priority": "low",
        "Deadline": "27-04-2024",
        "Status": "completed",
        "TaskID": 100
    }
];
const directoryPath = 'backlog-db';
const fileName = 'backlogs.json';
createFileDirectory(directoryPath,fileName,data);

const fileNameG = "githubCredentials.json";
const directoryPathG = "backlog-db";
const dataG = [{
    default:  null
}]
createFileDirectory(directoryPathG,fileNameG,dataG);
}

async function initBacklogGh(){
    inquirer
        .prompt([
            {
                type: "input",
                name: "username",
                message: "Enter your GitHub username:",
            },
            {
                type: "input",
                name: "repo",
                message: "Enter your GitHub repo:",
            },
            {
                type: "password",
                name: "token",
                message: "Enter your GitHub Personal Access Token:",
            },
        ])
        .then((answers) => {
            const credentials = readFromFile("./backlog-db/githubCredentials.json");
            const creds = JSON.parse(credentials);
            const updCreds = creds.filter(obj => obj.default !== null);
            var defaultrepo = false
            if(updCreds == []) defaultrepo = true
            const data = {
            username: answers.username,
            token:    answers.token,
            repo:     answers.repo,
            default:  defaultrepo
            }
            updCreds.push(data)
            const updatedJSON = JSON.stringify(updCreds);

            writeToFile(updatedJSON,"./backlog-db/githubCredentials.json");
          })
          .catch((error) => {
          console.log(error);
})
        
}

module.exports = {
    initBacklogFs,
    initBacklogGh
}