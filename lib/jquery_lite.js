/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

	window.$l = function(selector) {
	  let funcQ = [];
	  let arr;
	  const callQ = function() {
	    while(funcQ) {
	      const func = funcQ.pop();
	      func();
	    }
	  };
	  if (selector instanceof HTMLElement) {
	    arr = [new DOMNodeCollection(selector)];
	  } else if (typeof selector === 'string'){
	    const nodeList = document.querySelectorAll(selector);
	    const nodeListArr = Array.from(nodeList);
	    arr = new DOMNodeCollection(nodeListArr);
	  } else {
	    if (document.readyState === "complete") {
	      selector();
	    } else {
	      funcQ.push(selector);
	      window.addEventListener("DOMContentLoaded", callQ, false);
	    }
	  }
	  return arr;
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(htmlElementsArr) {
	    this.htmlElements = htmlElementsArr;
	  }
	}

	DOMNodeCollection.prototype.html = function(str) {
	  if (str) {
	    this.htmlElements.forEach(function(el) {
	      el.innerHTML = str;
	    });
	  } else {
	    return this.htmlElements[0].innerHTML;
	  }
	};

	DOMNodeCollection.prototype.empty = function() {
	  for (let i = 0; i < this.htmlElements.length; i++) {
	    this.htmlElements[i].innerHTML = "";
	  }
	};

	DOMNodeCollection.prototype.append = function(nodeObj) {
	  if (nodeObj instanceof DOMNodeCollection) {
	    for (let i = 0; i < nodeObj.length; i++) {
	      this.htmlElements.forEach((el) => {
	        el.innerHTML += nodeObj[i].outerHTML;
	      });
	    }
	  } else if (nodeObj instanceof HTMLElement) {
	    this.htmlElements.forEach((el) => {
	      el.innerHTML += nodeObj.outerHTML;
	    });
	  } else if (nodeObj instanceof String) {
	    this.htmlElements.forEach((el) => {
	      el.innerHTML += nodeObj;
	    });
	  }
	};

	DOMNodeCollection.prototype.addClass = function(newClass) {
	  this.htmlElements.forEach((el) => {
	    el.className += `${newClass} `;
	  });
	};

	DOMNodeCollection.prototype.removeClass = function(oldClass) {
	  this.htmlElements.forEach((el) => {
	    let classes = el.className.split(" ");
	    if (classes.includes(oldClass)) {
	      const idx = classes.indexOf(oldClass);
	      const newClasses = classes.slice(0,idx)
	                .concat(classes.slice(idx + 1), classes.length);
	      el.className = newClasses.join(" ");
	    }
	  });
	};

	DOMNodeCollection.prototype.removeClass = function(oldClass) {
	  this.htmlElements.forEach((el) => {
	    let classes = el.className.split(" ");
	    if (classes.includes(oldClass)) {
	      const idx = classes.indexOf(oldClass);
	      const newClasses = classes.slice(0,idx)
	                .concat(classes.slice(idx + 1), classes.length);
	      el.className = newClasses.join(" ");
	    }
	  });
	};

	DOMNodeCollection.prototype.attr = function(name, val) {
	  if (val === undefined) {
	    for (let i = 0; i < this.htmlElements.length; i++) {
	      if (this.htmlElements[i].hasAttribute(name)) {
	        return new DOMNodeCollection(this.htmlElements[i]);
	      }
	    }
	  } else {
	    this.htmlElements.forEach((el) => {
	      el.setAttribute(name, val);
	    });
	  }
	};


	DOMNodeCollection.prototype.children = function() {
	  const chillens = [];
	  this.htmlElements.forEach((el) => {
	    if (el.children) {
	      const childrenArr = Array.from(el.children);
	      childrenArr.forEach((chil) => {
	        chillens.push(chil);
	      });
	    }
	  });
	  return new DOMNodeCollection(chillens);
	};

	DOMNodeCollection.prototype.parent = function() {
	  const rents = [];
	  this.htmlElements.forEach((el) => {
	    if (el.parentNode) {
	      rents.push(el.parentNode);
	    }
	  });
	  return new DOMNodeCollection(rents);
	};

	DOMNodeCollection.prototype.find = function(selector) {
	  const arr = [];
	  this.htmlElements.forEach((el) => {
	    arr.push(el.querySelectorAll(selector));
	  });
	  return new DOMNodeCollection(arr);
	};

	DOMNodeCollection.prototype.remove = function() {
	  this.htmlElements.forEach((el) => {
	    el.parentNode.removeChild(el);
	  });
	};

	DOMNodeCollection.prototype.on = function(eventType, callback) {
	  this.htmlElements.forEach((el) => {
	    el.callback = callback;
	    el.addEventListener(eventType, callback, false);
	  });
	};

	DOMNodeCollection.prototype.off = function(eventType) {
	  this.htmlElements.forEach((el) => {
	    el.removeEventListener(eventType, el.callback, false);
	  });
	};
	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);
