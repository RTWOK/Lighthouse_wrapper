import { Identifiable } from "./Identifiable.js"

export class Modal extends Identifiable {
    #overline;
    #title;
    #footer;
    #children;

    constructor({
        overline = '',
        title = '',
        footer = '',
        children = []
    } = {}) {
        super();

        this.overline = overline;
        this.title = title;
        this.footer = footer;
        this.children = children;
    }

    set overline(value) {
        this.#overline = String(value || '').trim();
    }

    get overline() {
        return this.#overline;
    }

    set title(value) {
        this.#title = String(value || '').trim();
    }

    get title() {
        return this.#title;
    }

    set footer(value) {
        this.#footer = String(value || '').trim();
    }

    get footer() {
        return this.#footer;
    }

    set children(value) {
        this.#children = Array.isArray(value)
            ? value.map((child) => child instanceof ModalChild ? child : new ModalChild(child))
            : [];
    }

    get children() {
        return this.#children;
    }

    addChild(child) {
        this.#children.push(child instanceof ModalChild ? child : new ModalChild(child));

        return this;
    }

    removeChild(child) {
        if (Number.isInteger(child)) {
            this.#children.splice(child, 1);

            return this;
        }

        const childId = child instanceof ModalChild ? child.id : String(child || '').trim();

        this.#children = this.#children.filter((currentChild) => {
            return currentChild !== child && currentChild.id !== childId;
        });

        return this;
    }

    toJSON() {
        return {
            id: this.id,
            overline: this.overline,
            title: this.title,
            footer: this.footer,
            children: this.children
        };
    }
}

export class ModalChild extends Identifiable {
    #type;
    #title;
    #message;
    #lifetime;
    #tags;

    constructor({
        type = 'info',
        title = '',
        message = '',
        lifetime = 0,
        tags = []
    } = {}) {
        super();

        this.type = type;
        this.title = title;
        this.message = message;
        this.lifetime = lifetime;
        this.tags = tags;
    }

    set type(value) {
        const allowedTypes = ['info', 'warning', 'error'];
        const nextType = String(value || '').trim();

        this.#type = allowedTypes.includes(nextType) ? nextType : 'info';
    }

    get type() {
        return this.#type;
    }

    set title(value) {
        this.#title = String(value || '').trim();
    }

    get title() {
        return this.#title;
    }

    set message(value) {
        this.#message = String(value || '').trim();
    }

    get message() {
        return this.#message;
    }

    set lifetime(value) {
        const nextLifetime = Number(value);

        this.#lifetime = Number.isFinite(nextLifetime) && nextLifetime >= 0 ? nextLifetime : 0;
    }

    get lifetime() {
        return this.#lifetime;
    }

    set tags(value) {
        this.#tags = Array.isArray(value) ? value.map((tag) => String(tag).trim()).filter(Boolean) : [];
    }

    get tags() {
        return this.#tags;
    }

    toJSON() {
        return {
            id: this.id,
            type: this.type,
            title: this.title,
            message: this.message,
            lifetime: this.lifetime,
            tags: this.tags
        };
    }
}
