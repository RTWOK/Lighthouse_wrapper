import configuration from './Debug/Configuration.js';
import debugModalTool from './Debug/DebugModalTool.js';
import { Modal, ModalChild } from '../../shared/classes/Modal.js';
import { callModal } from './Api/ModalApi.js';

if (configuration.debug) {
    debugModalTool();
}

const form = document.querySelector("[data-audit-form]");

if (form) {
    form.addEventListener("submit" , async (event) => {
        event.preventDefault();

        form.classList.add("is-loading");

        await callModal(new Modal({
            title: 'Audit is running'
        }), new ModalChild({
            title: 'Loading',
            message: 'Your audit is being prepared. Please wait!',
        }));

        form.submit();
    });
}
