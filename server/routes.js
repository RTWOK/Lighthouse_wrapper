import routesSingleAudit from "./routes/singleAudit";
import routesMotivation from "./routes/motivation";

export default async function routes(app) {
    app.register(routesSingleAudit);
    app.register(routesMotivation);
};