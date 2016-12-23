const Inbox = {
  render() {
    const inbox = document.createElement('ul');
    inbox.className = 'messages';
    inbox.innerHTML = 'A lovely message';
    return inbox;
  }
};

module.exports = Inbox;
