export async function callWorker() {
    const modalContainer = document.querySelector('#modal[data-modal]');

    const modalResponse = await fetch('/modal', {
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