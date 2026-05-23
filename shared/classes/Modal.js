class ModalBase {
    constructor() {
        this._id = crypto.randomUUID();
    }

    get id() {
        return this._id;
    }
}

export class Modal extends ModalBase {
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
        this._overline = String(value || '').trim();
    }

    get overline() {
        return this._overline;
    }

    set title(value) {
        this._title = String(value || '').trim();
    }

    get title() {
        return this._title;
    }

    set footer(value) {
        this._footer = String(value || '').trim();
    }

    get footer() {
        return this._footer;
    }

    set children(value) {
        this._children = Array.isArray(value)
            ? value.map((child) => child instanceof ModalChild ? child : new ModalChild(child))
            : [];
    }

    get children() {
        return this._children;
    }

    addChild(child) {
        this._children.push(child instanceof ModalChild ? child : new ModalChild(child));

        return this;
    }

    removeChild(child) {
        if (Number.isInteger(child)) {
            this._children.splice(child, 1);

            return this;
        }

        const childId = child instanceof ModalChild ? child.id : String(child || '').trim();

        this._children = this._children.filter((currentChild) => {
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

export class ModalChild extends ModalBase {
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

        this._type = allowedTypes.includes(nextType) ? nextType : 'info';
    }

    get type() {
        return this._type;
    }

    set title(value) {
        this._title = String(value || '').trim();
    }

    get title() {
        return this._title;
    }

    set message(value) {
        this._message = String(value || '').trim();
    }

    get message() {
        return this._message;
    }

    set lifetime(value) {
        const nextLifetime = Number(value);

        this._lifetime = Number.isFinite(nextLifetime) && nextLifetime >= 0 ? nextLifetime : 0;
    }

    get lifetime() {
        return this._lifetime;
    }

    set tags(value) {
        this._tags = Array.isArray(value) ? value.map((tag) => String(tag).trim()).filter(Boolean) : [];
    }

    get tags() {
        return this._tags;
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
