export default async function routesMotivation(app) {
    app.get("/motivation", async (request, reply) => {
        return reply.view("pages/motivation.njk", {
            title: "Motivation"
        });
    });
}
