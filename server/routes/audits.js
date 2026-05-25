import runLighthouseAudit from '../lighthouse/lighthouse.js';
import { callModal } from '../../assets/js/Client/ModalClient.js';
import { ModalChild } from '../../shared/classes/Modal.js';

export default async function routesAudits(app) {
    app.get('/audits', async (request, reply) => {
        return {
            sent: 'Please use a post request!'
        };
    });

    app.post('/audits', async (request, reply) => {
        const urls = request.body.urls
            .split(/\r?\n/)
            .map(url => url.trim())
            .filter(Boolean);
            
        return reply.view('pages/audits.njk', {
            title: 'Audit report',
            urls: urls,
        });
    });
}
