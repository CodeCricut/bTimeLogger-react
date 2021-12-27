export default class InvalidIdFormatError extends Error {
    constructor(message = "Invalid ID format.") {
        super(message);
        this.name = "InvalidIdFormatError";
    }
}
