const uuid = require('uuid');
const {throwDeadlineValidationError, throwNameValidationError}  = require('./utils/errors')
const {writeToFile, readFromFile} = require('./utils/fileUtility')

function addBacklog(options,system){
    // Validation:
    // Name: Required, Deadline: xx-xx-yyyy, priority&description: optional

    var backlogObject = {
        name:           options.name,
        description:    options.description,
        priority:       options.priority,
        deadline:       options.deadline,
        status:         "todo"
    }
    
    if(typeof options.deadline === 'string'){
        const deadlineLength = options.deadline.length;
        if(deadlineLength != 10) throwDeadlineValidationError(options.deadline)
    }
    else throwDeadlineValidationError(options.deadline);
    
    if(!options.name || 
        typeof options.name !== 'string' || 
        options.name.startsWith("-")) throwNameValidationError();
    
    if(!options.description || typeof options.description !== 'string') backlogObject.description = "no description";
    if(!options.priority    || typeof options.priority    !== 'string') backlogObject.priority = "low";
    
    if(system == 0) addToFile(backlogObject)
    else            addToGithub(backlogObject)
}

function addToFile(backlogObject){

    const taskid = uuid.v4();
    const tasksJSON = readFromFile()
    const tasks = JSON.parse(tasksJSON);
    
    const newTask = { 
        Name:           backlogObject.name.toLowerCase(),
        Description:    backlogObject.description.toLowerCase(),
        Priority:       backlogObject.priority.toLowerCase(),
        Deadline:       backlogObject.deadline.toLowerCase(),
        Status:         backlogObject.status.toLowerCase(),
        TaskID:         taskid
    };

    tasks.push(newTask);
    const updatedTasksJSON = JSON.stringify(tasks);

    writeToFile(updatedTasksJSON);
    console.log("Successfully added task..");
}

function addToGithub(backlogObject){
    const credentials = readFromFile("./backlog-db/githubCredentials.json");
    const creds = JSON.parse(credentials);
    const cred = creds.filter(obj => obj.default === true);

    const apiUrl = `https://api.github.com/repos/${cred[0].username}/${cred[0].repo}/issues`;
    console.log(apiUrl);
    const issueData = {
        title: backlogObject.name,
        body:  backlogObject.description1,
        labels: [
            `priority ${backlogObject.priority}`,
            `deadline ${backlogObject.deadline}`
        ]
    };

    const options = {
        method: 'POST',
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

module.exports = addBacklog