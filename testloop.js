// call this when tweeting. if self.interval < timers.tweet_sec then do not send.
var self = this; // 'this', the child process
self.time = 0;
self.interval; // time remaining.


var setTwitterTimer = function(time) {
  clearInterval(self.interval);
  self.time = time;
  // "Infinite Loop" Execution ~ setInterval().
  self.interval = setInterval(() => {
    var _s;
    self.time = self.time - 1;
    _s = Number(self.time);
    console.log(self.time);
  }, 1000); // fixed at 1 sec.
};


var foo = 30;
setTwitterTimer(foo);
