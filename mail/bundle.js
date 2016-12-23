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

	const Router = __webpack_require__(1);
	const Inbox = __webpack_require__(2);

	const routes = {
	  inbox: Inbox,
	};

	document.addEventListener('DOMContentLoaded', function() {

	  const sideNav = document.getElementsByClassName('sidebar-nav');
	  sideNav[0].addEventListener('click', function(e) {
	    const li = e.target;
	    let newLoc = li.innerText.toLowerCase();
	    if (['compose', 'inbox', 'sent'].includes(newLoc)) {
	      window.location.hash = newLoc;
	    }
	  }, false);

	  const content = document.getElementsByClassName('content')[0];
	  const router = new Router(content, routes);
	  router.start();
	}, false);


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Router {
	  constructor(node, routes) {
	    this.node = node;
	    this.routes = routes;
	  }

	  start() {
	    this.render();
	    window.addEventListener('hashchange', () => {
	      this.render();
	    }, false);
	  }

	  render() {
	    this.node.innerHTML = "";
	    const component = this.activeRoute();
	    if (component) {
	      this.node.appendChild(component.render());
	    }
	  }

	  activeRoute() {
	    let hash = window.location.hash.slice(1);
	    return this.routes[hash];
	  }
	}

	module.exports = Router;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(3);

	const Inbox = {
	  render() {
	    const inbox = document.createElement('ul');
	    const messages = MessageStore.getInboxMessages();

	    messages.forEach((message) => {
	      const messageNode = this.renderMessage(message);
	      inbox.appendChild(messageNode);
	    });

	    return inbox;
	  },
	  renderMessage(message) {
	    console.log(message);
	    let messageNode = document.createElement('li');
	    messageNode.className = "message";

	    let from = document.createElement('span');
	    from.className = "messages from";
	    from.innerText = message.from;

	    messageNode.append(from);

	    let subject = document.createElement('span');
	    subject.className = "messages subject";
	    subject.innerText = message.subject;
	    messageNode.append(subject);

	    let body = document.createElement('span');
	    body.className = "messages body";
	    body.innerText = message.body;
	    messageNode.append(body);
	    //console.log(messageNode);
	    return messageNode;
	  }
	};

	module.exports = Inbox;


/***/ },
/* 3 */
/***/ function(module, exports) {

	let messages = {
	  sent: [
	    {to: "Miky@mail.com", subject: "Check this out", body: "It's so cool"},
	    {to: "Linah@mail.com", subject: "Cutie Baby!!!", body: "We love you and Merry Xmas!"}
	  ],
	  inbox: [
	    {from: "grandma@mail.com", subject: "Fwd: Fwd: Fwd: Check this out", body:
	"Stay at home mom discovers cure for leg cramps. Doctors hate her"},
	  {from: "person@mail.com", subject: "Questionnaire", body: "Take this free quiz win $1000 dollars"}
	]
	};

	const MessageStore = {
	  getInboxMessages() {
	    return messages.inbox;
	  },

	  getSentMessages() {
	    return messages.sent;
	  }
	};

	module.exports = MessageStore;


/***/ }
/******/ ]);