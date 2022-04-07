class ToolTip {}

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
  }
}

class ProjectItem {
  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectMoreInfoBtn();
    this.connectSwitchButton(type);
  }

  connectMoreInfoBtn() {}

  connectSwitchButton(type) {
    const projectItemElement = document.getElementById(this.id);
    let switchBtn = projectItemElement.querySelector('button:last-of-type');
   switchBtn = DOMHelper.clearEventListeners(switchBtn);
   switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
    switchBtn.addEventListener('click', this.updateProjectListsHandler.bind(null, this.id));
  }

  update(updateProjectListsFunction, type) {
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectSwitchButton(type)
  }
}

class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;

    const projectItems = document.querySelectorAll(`#${type}-projects li`);
    for (const projectItem of projectItems) {
      this.projects.push(
        new ProjectItem(projectItem.id, this.switchProject.bind(this), this.type)
      );
    }
    console.log(this.projects);
  }

  setSwitchHandlerFunction(switchHandlerFuction) {
    this.switchHandler = switchHandlerFuction;
  }

  addProject(project) {
    this.projects.push(project)
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }

  switchProject(projectId) {
    
this.switchHandler(this.projects.find(p => p.id === projectId))
this.projects = this.projects.filter(p => p.id !== projectId)
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
  }
}

App.init();
