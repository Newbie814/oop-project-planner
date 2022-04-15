import { ProjectItem } from './ProjectItems.js';
import { DOMHelper } from '../Utility/DOMhelper.js';

export class ProjectList {
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

    list.addEventListener('drop', (event) => {
      const projectId = event.dataTransfer.getData('text/plain');

      if (this.projects.find((p) => p.id === projectId)) {
        return;
      }

      document
        .getElementById(projectId)
        .querySelector('button:last-of-type')
        .click();
      list.parentElement.classList.remove('droppable');
      event.preventDefault();
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
