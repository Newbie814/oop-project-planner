export class Component {
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
