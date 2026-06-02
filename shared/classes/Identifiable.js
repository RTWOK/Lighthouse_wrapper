export class Identifiable {
    #id;

    constructor() {
        this.#id = crypto.randomUUID();
    }

    get id() {
        return this.#id;
    }
}