export default class MissingModelInfoError extends Error {
    constructor(message = "Missing model information.") {
        super(message);
        this.name = "MissingModelInfoError";
    }
}
