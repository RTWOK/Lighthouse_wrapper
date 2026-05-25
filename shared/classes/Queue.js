export class Queue {
    #urls;
    #index

    constructor(urls = []){
        this.urls = urls;
        this.index = 0;
    }

    set urls(value) {
        this.#urls = value;
    }

    get urls() {
        return this.#urls;
    }

    get index() {
        return this.#index;
    }

    reset() {
        this.#index = 0;
    }

    claimNext() {
        const currentPosition = this.#index;
        let next = null;

        if (currentPosition < this.#urls.length) {
            next = this.#urls[currentPosition]
            this.#index++;
        }

        return next
    }
}