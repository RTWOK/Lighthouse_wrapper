export default async function routesSingleAudit(app) {
  app.get("/singleAudit", async (request, reply) => {
    const data = request.body.text

    return {
        sent: data
    };
  });
}