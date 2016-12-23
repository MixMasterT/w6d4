const MessageStore = require('./message_store.js');

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
