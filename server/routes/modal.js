import { Modal } from '../../shared/classes/Modal.js';

export default async function routesModal(app) {
    app.get('/modal', async (request, reply) => {
        return {
            sent: 'use post!'
        };
    });

    app.post('/modal', async (request, reply) => {
        console.log(request.body.currentModal)

        const modal = new Modal(request.body.currentModal);
        const modalChildren = request.body.modalChildren || [];

        if (modalChildren.length > 0) {
            modalChildren.forEach((modalChild) => {
                modal.addChild(modalChild);
            });
        }

        const html = await reply.viewAsync('partials/modal.njk', {
            modal
        });

        reply.type('text/html');

        return html;
    });
}
