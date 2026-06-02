import { Identifiable } from "./Identifiable.js";
import lighthouse from "lighthouse";
import runLighthouseAudit from "../../server/lighthouse/lighthouse.js";

export class Worker extends Identifiable {
    #queue

    constructor(queue) {
        super();

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

        return true; //Peephole for debugging
    }
}