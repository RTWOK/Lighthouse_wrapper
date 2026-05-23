import runLighthouseAudit from '../lighthouse/lighthouse.js';

export default async function routesSingleAudit(app) {
    app.get('/singleAudit', async (request, reply) => {
        return {
            sent: 'Please use a post request!'
        };
    });

    app.post('/singleAudit', async (request, reply) => {
        const report = await runLighthouseAudit(request.body.url);

        return reply.view('pages/singleAudit.njk', {
            title: 'Audit report',
            reports: [
                {
                    url: request.body.url,
                    html: report
                }
            ]
        });
    });
}
