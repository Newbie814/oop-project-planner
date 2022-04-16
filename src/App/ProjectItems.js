import { ToolTip } from './Tooltip';
import { DOMHelper } from '../Utility/DOMhelper';

export class ProjectItem {
  // hasActiveToolTip = false;

  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.hasActiveToolTip = false;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectMoreInfoBtn();
    this.connectSwitchButton(type);
    this.connectDragHandler();
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
    const item = document.getElementById(this.id);
    item.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', this.id);
      event.dataTransfer.effectAllowed = 'move';
    });
    console.log(item);

    item.addEventListener('dragend', (event) => {
      console.log(event);
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
