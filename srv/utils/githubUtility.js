// CRUD on Github Issues

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

module.exports = {
    getLabel,
    readFromGithub
}