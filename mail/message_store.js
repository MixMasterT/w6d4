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
