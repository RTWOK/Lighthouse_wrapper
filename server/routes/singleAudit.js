import { runDummyAudit } from "../lighthouse/dummyAudit.js";

export default async function routesSingleAudit(app) {
    app.get("/singleAudit", async (request, reply) => {
        const data = runDummyAudit();

        return {
            sent: data
        };
    });

    app.post("/singleAudit", async (request, reply) => {
        const data = runDummyAudit();

        return {
            sent: data
        };
    });
}
