import routesHome from "./routes/home.js";
import routesSingleAudit from "./routes/singleAudit.js";
import routesMotivation from "./routes/motivation.js";

export default async function routes(app) {
    app.register(routesHome);
    app.register(routesSingleAudit);
    app.register(routesMotivation);
}
