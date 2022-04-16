import { Component } from './Components';

export class ToolTip extends Component {
  constructor(closeNotifierFunction, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
    this.closeToolTip = () => {
      this.destroy();
      this.closeNotifier();
    };
    this.create();
  }

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
