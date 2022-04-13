class DOMHelper {
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destination = document.querySelector(newDestinationSelector);
    destination.append(element);
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

class Component {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }

  destroy() {
    if (this.element) {
      this.element.remove();
    }
  }

  show() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? 'afterbegin' : 'afterend',
      this.element
    );
  }
}

class ToolTip extends Component {
  constructor(closeNotifierFunction, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
    this.create();
  }

  // arrow function 'this' is automatically the surrounding this not the this of it's own function object
  closeToolTip = () => {
    this.destroy();
    this.closeNotifier();
  };

  create() {
    const toolTipElement = document.createElement('div');
    toolTipElement.className = 'card';
    const toolTipTemplate = document.getElementById('toolTip');
    const toolTipBody = document.importNode(toolTipTemplate.content, true);
    toolTipBody.querySelector('p').textContent = this.text;
    toolTipElement.append(toolTipBody);
    const hostElementPositionLeft = this.hostElement.offsetLeft;
    const hostElementPositionTop = this.hostElement.offsetTop;
    const hostElementHeight = this.hostElement.clientHeight;
    const hostElementWidth = this.hostElement.clientWidth;
    const parentElementScrolling = this.hostElement.parentElement.scrollTop;

    const x = hostElementPositionLeft + 20;
    const y =
      hostElementPositionTop + hostElementHeight - parentElementScrolling - 10;

    toolTipElement.style.position = 'absolute';
    toolTipElement.style.left = x + 'px';
    toolTipElement.style.top = y + 'px';
    toolTipElement.style.width = hostElementWidth - 40 + 'px';

    console.log(this.hostElement.getBoundingClientRect());
    toolTipElement.addEventListener('click', this.closeToolTip);
    this.element = toolTipElement;
  }
}

class ProjectItem {
  hasActiveToolTip = false;

  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectMoreInfoBtn();
    this.connectSwitchButton(type);
  }

  showMoreInfoHandler() {
    if (this.hasActiveToolTip) {
      return;
    }
    const projectElement = document.getElementById(this.id);
    const toolTipText = projectElement.dataset.extraInfo;

    const toolTip = new ToolTip(
      () => {
        this.hasActiveToolTip = false;
      },
      toolTipText,
      this.id
    );
    toolTip.show();
    this.hasActiveToolTip = true;
  }

  connectDragHandler() {
    document.getElementById(this.id).addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', this.id);
      event.dataTransfer.effectAllowed = 'move';
    });
  }

  connectMoreInfoBtn() {
    const projectItemElement = document.getElementById(this.id);
    const moreInfoBtn = projectItemElement.querySelector(
      'button:first-of-type'
    );
    moreInfoBtn.addEventListener('click', this.showMoreInfoHandler.bind(this));
  }

  connectSwitchButton(type) {
    const projectItemElement = document.getElementById(this.id);
    let switchBtn = projectItemElement.querySelector('button:last-of-type');
    switchBtn = DOMHelper.clearEventListeners(switchBtn);
    switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
    switchBtn.addEventListener(
      'click',
      this.updateProjectListsHandler.bind(null, this.id)
    );
  }

  update(updateProjectListsFunction, type) {
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectSwitchButton(type);
  }
}

class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;

    const projectItems = document.querySelectorAll(`#${type}-projects li`);
    for (const projectItem of projectItems) {
      this.projects.push(
        new ProjectItem(
          projectItem.id,
          this.switchProject.bind(this),
          this.type
        )
      );
    }
    console.log(this.projects);
    this.connectDropHandler();
  }

  connectDropHandler() {
    const list = document.querySelector(`#${this.type}-projects ul`);
    list.addEventListener('dragenter', (event) => {
      event.preventDefault();
      list.parentElement.classList.add('droppable');
    });

    list.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    list.addEventListener('dragleave', (event) => {
      if (event.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {
        list.parentElement.classList.remove('droppable');
      }
    });
  }

  setSwitchHandlerFunction(switchHandlerFuction) {
    this.switchHandler = switchHandlerFuction;
  }

  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }

  switchProject(projectId) {
    this.switchHandler(this.projects.find((p) => p.id === projectId));
    this.projects = this.projects.filter((p) => p.id !== projectId);
  }
}

class App {
  static init() {
    const activeProjectsList = new ProjectList('active');
    const finishedProjectsList = new ProjectList('finished');
    activeProjectsList.setSwitchHandlerFunction(
      finishedProjectsList.addProject.bind(finishedProjectsList)
    );
    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList)
    );
    const timerId = setTimeout(this.startAnalytics, 3000);

    document
      .getElementById('stop-analytics-btn')
      .addEventListener('click', () => {
        clearTimeout(timerId);
      });
  }
  static startAnalytics() {
    const analyticsScript = document.createElement('script');
    analyticsScript.src = 'analytics.js';
    analyticsScript.defer = true;
    document.head.append(analyticsScript);
  }
}

App.init();
