export default class NameNotProvidedError extends Error {
    constructor(message = "Name not provided") {
        super(message);
        this.name = "NameNotProvidedError";
    }
}
