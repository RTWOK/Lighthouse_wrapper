export default async function routesModal(app) {
    app.get('/modal', async (request, reply) => {
        return {
            sent: 'Get Modal'
        };
    });

    app.post('/modal', async (request, reply) => {
        return {
            sent: 'Post Modal'
        };
    });
}
