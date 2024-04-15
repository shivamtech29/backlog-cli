
function throwDeadlineValidationError(deadline){
    throw new Error("Deadline should be of format dd-mm-yyyy Received "+deadline)
}

function throwNameValidationError(){
    throw new Error("Expected name: Required Parameter.\n Use -n <name> with command")
}

module.exports = {
    throwDeadlineValidationError,
    throwNameValidationError
}