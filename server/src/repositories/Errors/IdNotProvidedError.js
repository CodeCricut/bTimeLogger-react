export default class IdNotProvidedError extends Error {
    constructor(message = "No ID provided.") {
        super(message);
        this.name = "IdNotProvidedError";
    }
}
