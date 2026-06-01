export class Queue {
    #urls;
    #index;
    #results;

    constructor(urls = []){
        this.urls = urls;
        this.#results = [];
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

    get results() {
        return this.#results;
    }

    reset() {
        this.#index = 0;
    }

    pushResult(url, result) {
        this.#results.push({url, result})
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