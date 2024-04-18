const fs = require('fs');
const objectToTable = require("./utils/objectToTable")
const {readFromFile} = require('./utils/fileUtility')
const {getLabel} = require("./utils/githubUtility")

async function listBacklogs(system, flag = 0){
    var tasks;
    if(system == 0){
        tasksJSON = readFromFile();
        tasks = JSON.parse(tasksJSON);
        console.log(objectToTable(tasks))
    }
    else{
        const credentials = readFromFile("./backlog-db/githubCredentials.json");
        const creds = JSON.parse(credentials);
        const cred = creds.filter(obj => obj.default === true);
        const apiUrl = `https://api.github.com/repos/${cred[0].username}/${cred[0].repo}/issues`;
        tasks = []

        return fetch(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cred[0].token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch issues');
            }
            return response.json();
        })
        .then(issues => {
            issues.forEach(issue => {
                labels = getLabel(issue.labels)
                var task = {
                    "Name": issue.title,
                    "Description": issue.description,
                    "Priority": labels.priority,
                    "Deadline": labels.deadline,
                    "Status": issue.state,
                    "TaskID": issue.id
                  }
                tasks.push(task);
            });
            if(flag == 0)
            console.log(objectToTable(tasks))
            else return tasks
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
    }
    
}

module.exports = listBacklogs