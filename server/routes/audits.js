import { callModal } from '../../assets/js/Client/ModalClient.js';
import { ModalChild } from '../../shared/classes/Modal.js';
import { Queue } from '../../shared/classes/Queue.js';
import { Worker } from '../../shared/classes/Worker.js';

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

            const id = 'auditsQueue1'
            app.jobs.set(id, {
                queue: new Queue(urls),
            })

            const auditsQueue = app.jobs.get(id)
            const worker = new Worker(auditsQueue.queue)
            
        return reply.view('pages/audits.njk', {
            title: 'Audit report',
            urls: auditsQueue.queue.urls,
        });
    });
}
