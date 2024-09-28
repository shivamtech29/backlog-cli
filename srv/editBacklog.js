const {writeToFile, readFromFile} = require('./utils/fileUtility')
const listBacklogs = require("./listBacklogs")

function editBacklog(options, system) {
    const tasksJSON = readFromFile();
    const tasks = JSON.parse(tasksJSON);

    // Find the task by task name (case-insensitive)
    const taskIndex = tasks.findIndex(task => task.Name.toLowerCase() === options.name.toLowerCase());

    if (taskIndex === -1) {
        console.log("Task not found");
        return;
    }

    var taskToUpdate = tasks[taskIndex];

    // Validation for new options and updating the task
    if (options.updatedname && typeof options.updatedname === 'string' && !options.updatedname.startsWith("-")) {
        taskToUpdate.Name = options.updatedname.toLowerCase();
    } else {
        throwNameValidationError();
    }

    if (options.description && typeof options.description === 'string') {
        taskToUpdate.Description = options.description.toLowerCase();
    }

    if (options.deadline && typeof options.deadline === 'string') {
        const deadlineLength = options.deadline.length;
        if (deadlineLength == 10) {
            taskToUpdate.Deadline = options.deadline.toLowerCase();
        } else {
            throwDeadlineValidationError(options.deadline);
        }
    }

    if (options.priority && typeof options.priority === 'string') {
        taskToUpdate.Priority = options.priority.toLowerCase();
    }

    tasks[taskIndex] = taskToUpdate;

    // Save the updated tasks back to the file
    const updatedTasksJSON = JSON.stringify(tasks, null, 2);
    writeToFile(updatedTasksJSON);

    listBacklogs(system);

    console.log("Successfully updated task");
}

module.exports = editBacklog