function throwDeadlineValidationError(deadline){
    throw "Deadline should be of format dd-mm-yyyy Received "+deadline
}

function throwNameValidationError(){
    throw "Expected name: Required Parameter.\n Use -n <name> with command"
}

function noValidBacklogFoundError(name){
    throw `No backlog found with name ${name}`
}

module.exports = {
    throwDeadlineValidationError,
    throwNameValidationError,
    noValidBacklogFoundError
}