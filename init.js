const fs = require('fs');
const path = require('path');

function initBacklog(){
const data = [
    {
        "Name": "demo",
        "Description": "demo-description",
        "Priority": "low",
        "Deadline": "27-04-2024",
        "Status": "completed",
        "TaskId": 100
    }
];

const directoryPath = 'backlog-db';
const fileName = 'backlogs.json';
const filePath = path.join(directoryPath, fileName);

fs.mkdir(directoryPath, { recursive: true }, (err) => {
    if (err) {
        console.error('Error creating directory:', err);
    } else {
        console.log('Directory created:', directoryPath);

        const jsonData = JSON.stringify(data, null, 2); 

        fs.writeFile(filePath, jsonData, (err) => {
            if (err) {
                console.error('Error creating JSON file:', err);
            } else {
                console.log('JSON file created:', filePath);
            }
        });
    }
});


}

module.exports = initBacklog