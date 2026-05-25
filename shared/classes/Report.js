export class Queue {
    #urls;

    constructor(urls = []){
        this.urls = urls;
    }

    set urls(value) {
        this.#urls = value;
    }

    get urls() {
        return this.#urls;
    }
}