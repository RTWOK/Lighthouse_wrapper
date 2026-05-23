// assets/js/Debug/Configuration.js
var configuration = {
  debug: true
};
var Configuration_default = configuration;

// shared/classes/Modal.js
var ModalBase = class {
  constructor() {
    this._id = crypto.randomUUID();
  }
  get id() {
    return this._id;
  }
};
var Modal = class extends ModalBase {
  constructor({
    overline = "",
    title = "",
    footer = "",
    children = []
  } = {}) {
    super();
    this.overline = overline;
    this.title = title;
    this.footer = footer;
    this.children = children;
  }
  set overline(value) {
    this._overline = String(value || "").trim();
  }
  get overline() {
    return this._overline;
  }
  set title(value) {
    this._title = String(value || "").trim();
  }
  get title() {
    return this._title;
  }
  set footer(value) {
    this._footer = String(value || "").trim();
  }
  get footer() {
    return this._footer;
  }
  set children(value) {
    this._children = Array.isArray(value) ? value.map((child) => child instanceof ModalChild ? child : new ModalChild(child)) : [];
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
    const childId = child instanceof ModalChild ? child.id : String(child || "").trim();
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
};
var ModalChild = class extends ModalBase {
  constructor({
    type = "info",
    title = "",
    message = "",
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
    const allowedTypes = ["info", "warning", "error"];
    const nextType = String(value || "").trim();
    this._type = allowedTypes.includes(nextType) ? nextType : "info";
  }
  get type() {
    return this._type;
  }
  set title(value) {
    this._title = String(value || "").trim();
  }
  get title() {
    return this._title;
  }
  set message(value) {
    this._message = String(value || "").trim();
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
};

// assets/js/Api/ModalApi.js
async function callModal(modal = new Modal(), ...modalChildren) {
  const newModal = await fetch("/modal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      currentModal: modal,
      modalChildren,
      event: {
        type: "audit-started"
      }
    })
  });
  const modalHtml = await newModal.text();
  document.querySelector("[data-modal]").outerHTML = modalHtml;
}

// assets/js/Debug/DebugModalTool.js
function debugModalTool() {
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
      document.querySelector("[data-modal]").outerHTML = modalHtml;
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
    return String(tags || "").split(",").map((tag) => tag.trim()).filter(Boolean);
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

// assets/js/Main.js
if (Configuration_default.debug) {
  debugModalTool();
}
var form = document.querySelector("[data-audit-form]");
if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    form.classList.add("is-loading");
    await callModal(new Modal({
      title: "Audit is running"
    }), new ModalChild({
      title: "Loading",
      message: "Your audit is being prepared. Please wait!"
    }));
    form.submit();
  });
}
