//todo: long polling

import { Modal, ModalChild } from '../../shared/classes/Modal.js';
import { callModal } from './Client/ModalClient.js';

const auditContainer = document.querySelector('#audits[data-audits]');

async function poll(container) {
    const response = await fetch('/audits/status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            auditsQueueId: container.dataset.auditsQueueId,
        })
    });

    setTimeout(() => poll(container), 2000);

    await callModal(new Modal({
        title: 'Audit is running'
    }), new ModalChild({
        title: 'Loading',
        message: 'Your audit is being prepared. Please wait!',
    }));
}

poll(auditContainer)
