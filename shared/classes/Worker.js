import lighthouse from "lighthouse";
import runLighthouseAudit from "../../server/lighthouse/lighthouse.js";

export class Worker {
    #queue

    constructor(queue) {
        this.queue = queue;
    }

    set queue(value) {
        this.#queue = value;
    }

    get queue() {
        return this.#queue;
    }

    runLighthouse(url) {
        return runLighthouseAudit(url);
    }

    async work() {
        this.queue.reset();
        let jobAvailable = true;

        while (jobAvailable) {
            const currentJob = this.#queue.claimNext();

            if (currentJob === null) {
                jobAvailable = false;
            } else {
                const result = await this.runLighthouse(currentJob);
                this.#queue.pushResult(currentJob, result);
            }
        }
    }
}