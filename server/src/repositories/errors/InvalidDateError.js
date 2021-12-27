export default class InvalidDateError extends Error {
    constructor(message = "Invalid date format.") {
        super(message);
        this.name = "InvalidDateError";
    }
}
