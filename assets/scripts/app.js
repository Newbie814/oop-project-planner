/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App/Components.js":
/*!*******************************!*\
  !*** ./src/App/Components.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Component\": () => (/* binding */ Component)\n/* harmony export */ });\nclass Component {\r\n  constructor(hostElementId, insertBefore = false) {\r\n    if (hostElementId) {\r\n      this.hostElement = document.getElementById(hostElementId);\r\n    } else {\r\n      this.hostElement = document.body;\r\n    }\r\n    this.insertBefore = insertBefore;\r\n  }\r\n\r\n  destroy() {\r\n    if (this.element) {\r\n      this.element.remove();\r\n    }\r\n  }\r\n\r\n  show() {\r\n    this.hostElement.insertAdjacentElement(\r\n      this.insertBefore ? 'afterbegin' : 'afterend',\r\n      this.element\r\n    );\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://project-planner-oop/./src/App/Components.js?");

/***/ }),

/***/ "./src/App/ProjectItems.js":
/*!*********************************!*\
  !*** ./src/App/ProjectItems.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ProjectItem\": () => (/* binding */ ProjectItem)\n/* harmony export */ });\n/* harmony import */ var _Tooltip_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tooltip.js */ \"./src/App/Tooltip.js\");\n/* harmony import */ var _Utility_DOMhelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utility/DOMhelper.js */ \"./src/Utility/DOMhelper.js\");\n\r\n\r\n\r\nclass ProjectItem {\r\n  hasActiveToolTip = false;\r\n\r\n  constructor(id, updateProjectListsFunction, type) {\r\n    this.id = id;\r\n    this.updateProjectListsHandler = updateProjectListsFunction;\r\n    this.connectMoreInfoBtn();\r\n    this.connectSwitchButton(type);\r\n    this.connectDragHandler();\r\n  }\r\n\r\n  showMoreInfoHandler() {\r\n    if (this.hasActiveToolTip) {\r\n      return;\r\n    }\r\n    const projectElement = document.getElementById(this.id);\r\n    const toolTipText = projectElement.dataset.extraInfo;\r\n\r\n    const toolTip = new _Tooltip_js__WEBPACK_IMPORTED_MODULE_0__.ToolTip(\r\n      () => {\r\n        this.hasActiveToolTip = false;\r\n      },\r\n      toolTipText,\r\n      this.id\r\n    );\r\n    toolTip.show();\r\n    this.hasActiveToolTip = true;\r\n  }\r\n\r\n  connectDragHandler() {\r\n    const item = document.getElementById(this.id);\r\n    item.addEventListener('dragstart', (event) => {\r\n      event.dataTransfer.setData('text/plain', this.id);\r\n      event.dataTransfer.effectAllowed = 'move';\r\n    });\r\n    console.log(item);\r\n\r\n    item.addEventListener('dragend', (event) => {\r\n      console.log(event);\r\n    });\r\n  }\r\n\r\n  connectMoreInfoBtn() {\r\n    const projectItemElement = document.getElementById(this.id);\r\n    const moreInfoBtn = projectItemElement.querySelector(\r\n      'button:first-of-type'\r\n    );\r\n    moreInfoBtn.addEventListener('click', this.showMoreInfoHandler.bind(this));\r\n  }\r\n\r\n  connectSwitchButton(type) {\r\n    const projectItemElement = document.getElementById(this.id);\r\n    let switchBtn = projectItemElement.querySelector('button:last-of-type');\r\n    switchBtn = _Utility_DOMhelper_js__WEBPACK_IMPORTED_MODULE_1__.DOMHelper.clearEventListeners(switchBtn);\r\n    switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';\r\n    switchBtn.addEventListener(\r\n      'click',\r\n      this.updateProjectListsHandler.bind(null, this.id)\r\n    );\r\n  }\r\n\r\n  update(updateProjectListsFunction, type) {\r\n    this.updateProjectListsHandler = updateProjectListsFunction;\r\n    this.connectSwitchButton(type);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://project-planner-oop/./src/App/ProjectItems.js?");

/***/ }),

/***/ "./src/App/ProjectList.js":
/*!********************************!*\
  !*** ./src/App/ProjectList.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ProjectList\": () => (/* binding */ ProjectList)\n/* harmony export */ });\n/* harmony import */ var _ProjectItems_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProjectItems.js */ \"./src/App/ProjectItems.js\");\n/* harmony import */ var _Utility_DOMhelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utility/DOMhelper.js */ \"./src/Utility/DOMhelper.js\");\n\r\n\r\n\r\nclass ProjectList {\r\n  projects = [];\r\n\r\n  constructor(type) {\r\n    this.type = type;\r\n\r\n    const projectItems = document.querySelectorAll(`#${type}-projects li`);\r\n    for (const projectItem of projectItems) {\r\n      this.projects.push(\r\n        new _ProjectItems_js__WEBPACK_IMPORTED_MODULE_0__.ProjectItem(\r\n          projectItem.id,\r\n          this.switchProject.bind(this),\r\n          this.type\r\n        )\r\n      );\r\n    }\r\n    console.log(this.projects);\r\n    this.connectDropHandler();\r\n  }\r\n\r\n  connectDropHandler() {\r\n    const list = document.querySelector(`#${this.type}-projects ul`);\r\n    list.addEventListener('dragenter', (event) => {\r\n      event.preventDefault();\r\n      list.parentElement.classList.add('droppable');\r\n    });\r\n\r\n    list.addEventListener('dragover', (event) => {\r\n      event.preventDefault();\r\n    });\r\n\r\n    list.addEventListener('dragleave', (event) => {\r\n      if (event.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {\r\n        list.parentElement.classList.remove('droppable');\r\n      }\r\n    });\r\n\r\n    list.addEventListener('drop', (event) => {\r\n      const projectId = event.dataTransfer.getData('text/plain');\r\n\r\n      if (this.projects.find((p) => p.id === projectId)) {\r\n        return;\r\n      }\r\n\r\n      document\r\n        .getElementById(projectId)\r\n        .querySelector('button:last-of-type')\r\n        .click();\r\n      list.parentElement.classList.remove('droppable');\r\n      event.preventDefault();\r\n    });\r\n  }\r\n\r\n  setSwitchHandlerFunction(switchHandlerFuction) {\r\n    this.switchHandler = switchHandlerFuction;\r\n  }\r\n\r\n  addProject(project) {\r\n    this.projects.push(project);\r\n    _Utility_DOMhelper_js__WEBPACK_IMPORTED_MODULE_1__.DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);\r\n    project.update(this.switchProject.bind(this), this.type);\r\n  }\r\n\r\n  switchProject(projectId) {\r\n    this.switchHandler(this.projects.find((p) => p.id === projectId));\r\n    this.projects = this.projects.filter((p) => p.id !== projectId);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://project-planner-oop/./src/App/ProjectList.js?");

/***/ }),

/***/ "./src/App/Tooltip.js":
/*!****************************!*\
  !*** ./src/App/Tooltip.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ToolTip\": () => (/* binding */ ToolTip)\n/* harmony export */ });\n/* harmony import */ var _Components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Components.js */ \"./src/App/Components.js\");\n\r\n\r\nclass ToolTip extends _Components_js__WEBPACK_IMPORTED_MODULE_0__.Component {\r\n  constructor(closeNotifierFunction, text, hostElementId) {\r\n    super(hostElementId);\r\n    this.closeNotifier = closeNotifierFunction;\r\n    this.text = text;\r\n    this.create();\r\n  }\r\n\r\n  closeToolTip = () => {\r\n    this.destroy();\r\n    this.closeNotifier();\r\n  };\r\n\r\n  create() {\r\n    const toolTipElement = document.createElement('div');\r\n    toolTipElement.className = 'card';\r\n    const toolTipTemplate = document.getElementById('toolTip');\r\n    const toolTipBody = document.importNode(toolTipTemplate.content, true);\r\n    toolTipBody.querySelector('p').textContent = this.text;\r\n    toolTipElement.append(toolTipBody);\r\n    const hostElementPositionLeft = this.hostElement.offsetLeft;\r\n    const hostElementPositionTop = this.hostElement.offsetTop;\r\n    const hostElementHeight = this.hostElement.clientHeight;\r\n    const hostElementWidth = this.hostElement.clientWidth;\r\n    const parentElementScrolling = this.hostElement.parentElement.scrollTop;\r\n\r\n    const x = hostElementPositionLeft + 20;\r\n    const y =\r\n      hostElementPositionTop + hostElementHeight - parentElementScrolling - 10;\r\n\r\n    toolTipElement.style.position = 'absolute';\r\n    toolTipElement.style.left = x + 'px';\r\n    toolTipElement.style.top = y + 'px';\r\n    toolTipElement.style.width = hostElementWidth - 40 + 'px';\r\n\r\n    console.log(this.hostElement.getBoundingClientRect());\r\n    toolTipElement.addEventListener('click', this.closeToolTip);\r\n    this.element = toolTipElement;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://project-planner-oop/./src/App/Tooltip.js?");

/***/ }),

/***/ "./src/Utility/DOMhelper.js":
/*!**********************************!*\
  !*** ./src/Utility/DOMhelper.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DOMHelper\": () => (/* binding */ DOMHelper)\n/* harmony export */ });\nclass DOMHelper {\r\n  static clearEventListeners(element) {\r\n    const clonedElement = element.cloneNode(true);\r\n    element.replaceWith(clonedElement);\r\n    return clonedElement;\r\n  }\r\n\r\n  static moveElement(elementId, newDestinationSelector) {\r\n    const element = document.getElementById(elementId);\r\n    const destination = document.querySelector(newDestinationSelector);\r\n    destination.append(element);\r\n    element.scrollIntoView({ behavior: 'smooth' });\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://project-planner-oop/./src/Utility/DOMhelper.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_ProjectList_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App/ProjectList.js */ \"./src/App/ProjectList.js\");\n\r\n\r\nclass App {\r\n  static init() {\r\n    const activeProjectsList = new _App_ProjectList_js__WEBPACK_IMPORTED_MODULE_0__.ProjectList('active');\r\n    const finishedProjectsList = new _App_ProjectList_js__WEBPACK_IMPORTED_MODULE_0__.ProjectList('finished');\r\n    activeProjectsList.setSwitchHandlerFunction(\r\n      finishedProjectsList.addProject.bind(finishedProjectsList)\r\n    );\r\n    finishedProjectsList.setSwitchHandlerFunction(\r\n      activeProjectsList.addProject.bind(activeProjectsList)\r\n    );\r\n    const timerId = setTimeout(this.startAnalytics, 3000);\r\n\r\n    document\r\n      .getElementById('stop-analytics-btn')\r\n      .addEventListener('click', () => {\r\n        clearTimeout(timerId);\r\n      });\r\n  }\r\n  static startAnalytics() {\r\n    const analyticsScript = document.createElement('script');\r\n    analyticsScript.src = 'assets/scripts/Utility/Analytics.js';\r\n    analyticsScript.defer = true;\r\n    document.head.append(analyticsScript);\r\n  }\r\n}\r\n\r\nApp.init();\r\n\n\n//# sourceURL=webpack://project-planner-oop/./src/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;