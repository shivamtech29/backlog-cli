// CRUD on Github Issues
const {readFromFile} = require('./fileUtility')
    
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


function listBacklogs(){
    const credentials = readFromFile("./backlog-db/githubCredentials.json");
    const creds = JSON.parse(credentials);
    const cred = creds.filter(obj => obj.default === true);
    const apiUrl = `https://api.github.com/repos/${cred[0].username}/${cred[0].repo}/issues`;
    var tasks = []
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
                "TaskID": issue.id,
                "Number": issue.number
              }
            tasks.push(task);
        });
        return tasks
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
}


async function readFromGithub(apiUrl,cred){
    tasks = []

    return fetch(apiUrl, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cred.token}`
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
        return tasks
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
}

async function issueMarkAsClosed(name,reason){
    var tasks = await listBacklogs()
    console.log(tasks);
    const updTasks = tasks.filter(obj => obj.Name == name);
    console.log(updTasks);
    const taskNumber = updTasks[0].Number;
    const credentials = readFromFile("./backlog-db/githubCredentials.json");
    const creds = JSON.parse(credentials);
    const cred = creds.filter(obj => obj.default === true);

    const apiUrl = `https://api.github.com/repos/${cred[0].username}/${cred[0].repo}/issues/${taskNumber}`;
    console.log(apiUrl);
    const issueData = {
        title: updTasks.Name,
        body:  updTasks.Description,
        labels: [
            `priority ${updTasks.Priority}`,
            `deadline ${updTasks.Deadline}`
        ],
        state: "closed",
        state_reason: reason
    };

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cred[0].token}` // Replace with your GitHub token
        },
        body: JSON.stringify(issueData)
    };
    fetch(apiUrl, options)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to create issue: ${response.statusText}`);
        }
        return response.json();
    })
    .then(issue => {
        console.log('Issue created successfully:', issue.html_url);
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
}

module.exports = {
    getLabel,
    readFromGithub,
    issueMarkAsClosed
}