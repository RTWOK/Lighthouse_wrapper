export default async function routesDebug(app) {
    app.get("/debug", async (request, reply) => {
        return reply.view("pages/index.njk", {
            title: "Lighthouse Wrapper"
        });
    });
}
