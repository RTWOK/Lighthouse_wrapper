import { Modal, ModalChild } from '../../../shared/classes/Modal.js';
import { callModal } from '../Api/ModalApi.js';

export default function debugModalTool() {
    const modalDebugForm = document.querySelector("[data-modal-debug-form]");
    const modalDebugChildren = document.querySelector("[data-modal-debug-children]");
    const modalDebugChildTemplate = document.querySelector("[data-modal-debug-child-template]");
    const modalDebugAddChild = document.querySelector("[data-modal-debug-add-child]");

    if (modalDebugChildren && modalDebugChildTemplate) {
        addModalDebugChild();
    }

    if (modalDebugForm) {
        modalDebugForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const formData = new FormData(modalDebugForm);
            const modalData = new Modal({
                overline: formData.get("overline"),
                title: formData.get("containerTitle"),
                footer: formData.get("footer"),
                children: getModalDebugChildren()
            });

            console.log("Debug modal press detected", modalData);

            const modalCall = await callModal(modalData);
            const modalHtml = await modalCall.text();

            document.querySelector('[data-modal]').outerHTML = modalHtml;
        });
    }

    if (modalDebugAddChild) {
        modalDebugAddChild.addEventListener("click", () => {
            addModalDebugChild();
        });
    }

    function addModalDebugChild() {
        const childFragment = modalDebugChildTemplate.content.cloneNode(true);

        modalDebugChildren.append(childFragment);
    }

    function getModalDebugChildren() {
        return [...modalDebugChildren.querySelectorAll("[data-modal-debug-child]")].map((child) => {
            const childFormData = new FormData();

            child.querySelectorAll("input, select, textarea").forEach((field) => {
                childFormData.set(field.name, field.value);
            });

            return new ModalChild({
                type: childFormData.get("type"),
                title: childFormData.get("title"),
                message: childFormData.get("message"),
                lifetime: Number(childFormData.get("lifetime")),
                tags: parseTags(childFormData.get("tags"))
            });
        });
    }

    function parseTags(tags) {
        return String(tags || '')
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean);
    }

    document.addEventListener("click", (event) => {
        const removeButton = event.target.closest("[data-modal-debug-remove-child]");

        if (!removeButton || !modalDebugChildren) {
            return;
        }

        const child = removeButton.closest("[data-modal-debug-child]");

        if (child && modalDebugChildren.children.length > 1) {
            child.remove();
        }
    });
}
