import { Modal } from '../../../shared/classes/Modal.js' 

export async function callModal(modal = new Modal(), ...modalChildren) {
    const modalContainer = document.querySelector('#modal[data-modal]');

    const modalResponse = await fetch('./modal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            currentModal: modal,
            modalChildren
        })
    });

    const modalHtml = await modalResponse.text();

    modalContainer.outerHTML = modalHtml;
}