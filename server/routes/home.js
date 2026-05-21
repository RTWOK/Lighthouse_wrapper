export default async function routesHome(app) {
    app.get("/", async (request, reply) => {
        return reply.view("pages/index.njk", {
            title: "Lighthouse Wrapper"
        });
    });
}
