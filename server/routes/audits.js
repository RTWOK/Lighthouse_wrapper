import { callModal } from '../../assets/js/Client/ModalClient.js';
import { ModalChild } from '../../shared/classes/Modal.js';
import { Queue } from '../../shared/classes/Queue.js';
import { Worker } from '../../shared/classes/Worker.js';
import configuration from '../lighthouse/configuration.js';
import { Identifiable } from '../../shared/classes/Identifiable.js';

export default async function routesAudits(app) {
    app.get('/audits', async (request, reply) => {
        return {
            sent: 'Please use a post request!'
        };
    });

    app.post('/audits', async (request, reply) => {
        const auditsQueueId = new Identifiable().id;
        const urls = request.body.urls
            .split(/\r?\n/)
            .map(url => url.trim())
            .filter(Boolean);

        app.jobs.set(auditsQueueId, {
            queue: new Queue(urls),
        })

        for (let i = 0; i < configuration.workers.amount; i++) {
            const worker = new Worker(app.jobs.get(auditsQueueId).queue);
            worker.work();
        }
            
        return reply.view('pages/audits.njk', {
            title: 'Audit report',
            urls: app.jobs.get(auditsQueueId).queue.urls,
        });
    });
}
