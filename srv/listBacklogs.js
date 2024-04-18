const fs = require('fs');
const objectToTable = require("./utils/objectToTable")
const {readFromFile} = require('./utils/fileUtility')

function getLabel(labels){
    var impLabels = {}
    labels.forEach(label => {
      const parts = label.name.split(' ');
      const labelName = parts[0];
      switch (labelName) {
        case 'priority':
        impLabels["priority"] = parts[1];
          break;
        case 'deadline':
        impLabels["deadline"] = parts[1];
          break;
        default:
          break;
      }
    });
    return impLabels;
}

function listBacklogs(system){
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

        fetch(apiUrl, {
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
            console.log(objectToTable(tasks))
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
    }
    
}

module.exports = listBacklogs