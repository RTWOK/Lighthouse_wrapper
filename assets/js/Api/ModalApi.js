import { Modal } from '../../../shared/classes/Modal.js';

export async function callModal(modal = new Modal(), ...modalChildren) {
    const newModal = await fetch('/modal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            currentModal: modal,
            modalChildren,
            event: {
                type: 'audit-started'
            }
        })
    });

    const modalHtml = await newModal.text();

    document.querySelector('[data-modal]').outerHTML = modalHtml;
}
