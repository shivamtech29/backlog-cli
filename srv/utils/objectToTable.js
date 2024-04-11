const Table = require('cli-table3');

function objectToTable(tasks){
    const table = new Table();

    const headers = Object.keys(tasks[0]);
    table.push(headers);

    tasks.forEach(task => {
        const row = headers.map(header => task[header]);
        table.push(row);
    });
    return table.toString()
}

module.exports = objectToTable