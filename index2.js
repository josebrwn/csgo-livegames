const CircularJSON = require('circular-json');
const io = require("socket.io-client");
const patch = require('socketio-wildcard')(io.Manager);
const listId = process.argv[2] ||  '2318553'; // find a recent one at hltv.org/matches
const url1 = 'http://scorebot2.hltv.org:10022'; // the old HTTP scorebot
const url2 = 'https://scorebot-secure.hltv.org'; // the new HTTPS scorebot

var self = this;
self.socket = io.connect(url2);
patch(self.socket); // piggyback socketio-wildcard
// var token = '919ec6936750a42af1002dcddc3b4fe0';
// var t = JSON.stringify({
//   token: token,
//   listId: listId
// });
// console.log(t);
/*
  two things to test:
  1. can you connect to the scorebot?
  2. can you send and receive messages?
*/
self.socket.on('connect', function () {
  console.log("Eureka, you connected!!!");
  console.log(CircularJSON.stringify(self.socket));
  self.socket.emit("readyForMatch", listId);
  console.log(CircularJSON.stringify(self.socket));
  // self.socket.emit("readyForMatch", t); // the site passes a token and listId, it used to work with just passing the listId
  self.socket.on('*', function (data) {
      console.log(data); // if you get data here via url2, success!
  });
});
