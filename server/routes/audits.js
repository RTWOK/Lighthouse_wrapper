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
            auditsQueueId: auditsQueueId
        });
    });

    app.post('/audits/status', async (request, reply) => {
        const auditsQueueId = request.body.auditsQueueId;
        const queue = app.jobs.get(auditsQueueId).queue;

        const workload = queue.urls.length;
        const currentIndex = queue.index;

        console.log('working on Link ', currentIndex, ' of ', workload)

        return {}

        
        



        // const html = await reply.viewAsync('partials/audit.njk', {
        //     queue: queue
        // });

        // reply.type('text/html');

        // return html;
    });
}
