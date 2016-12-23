const Router = require('./router.js');
const Inbox = require('./Inbox.js');

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
