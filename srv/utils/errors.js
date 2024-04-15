function throwDeadlineValidationError(deadline){
    throw new Error("Deadline should be of format dd-mm-yyyy Received "+deadline)
}

function throwNameValidationError(){
    throw new Error("Expected name: Required Parameter.\n Use -n <name> with command")
}

function noValidBacklogFoundError(name){
    throw new Error(`No backlog found with name ${name}`)
}

module.exports = {
    throwDeadlineValidationError,
    throwNameValidationError,
    noValidBacklogFoundError
}