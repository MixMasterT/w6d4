const DOMNodeCollection = require("./dom_node_collection.js");

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

$l.ajax = function(ops) {
  
}
