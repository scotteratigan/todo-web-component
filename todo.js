class ToDos extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.container = this.makeElement({ type: "div" });
    this.container.className = "todo-container";
    this.container.innerHTML = `
      <style>
        div.todo-container {
          background: var(--background);
          color: var(--color);
          padding: 1rem;
          border-radius: 0.25rem;

        }
        li.completed {
          text-decoration: line-through;
        }
      </style>`;
    this.header = this.makeElement({ type: "h3" });
    this.list = this.makeElement({ type: "ul" });
    this.input = this.makeElement({ type: "input" });
    const _this = this;
    this.input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        _this.handleAddNewTask(e, _this);
      }
    })
    this.submitBtn = this.makeElement({ type: "button", textContent: "Add New Task", clickEvent: this.handleAddNewTask });
    this.container.append(this.header, this.list, this.input, this.submitBtn);
    this.appendNewTodo("Learn Web Components", this);
    this.appendNewTodo("Implement Web Components", this);
    this.shadowRoot.append(this.container);
  }

  makeElement(opts) {
    const type = opts.type || "div";
    const textContent = opts.textContent;
    const clickEvent = opts.clickEvent;
    const elm = document.createElement(type);
    if (textContent) elm.textContent = textContent;
    const _this = this; // need to retain a reference to the class
    if (clickEvent) elm.addEventListener("click", function (event) {
      clickEvent(event, _this);
    });
    return elm;
  }

  appendNewTodo(task, _this) {
    const taskLI = _this.makeElement({ type: "li", textContent: task, clickEvent: _this.handleToggleTask });
    const taskRemoveBtn = _this.makeElement({ type: "button", textContent: "X", clickEvent: _this.handleRemoveTask });
    taskRemoveBtn.style.marginLeft = "0.5em";
    taskLI.append(taskRemoveBtn);
    this.list.append(taskLI);
  }

  handleAddNewTask(e, _this) {
    const task = _this.input.value;
    if (task) {
      _this.appendNewTodo(task, _this);
      _this.input.value = "";
    }
  }

  handleToggleTask(e, _this) {
    e.target.classList.toggle("completed");
  }

  handleRemoveTask(e, _this) {
    const taskToRemove = e.path[1];
    taskToRemove.remove();
  }

  connectedCallback() {
    this.header.textContent = this.dataset.title || "To Do List"; // can't access dataset until <to-dos> element exists
  }
}

customElements.define("to-dos", ToDos);
