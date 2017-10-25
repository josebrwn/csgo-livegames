/*
 currentTime: make GMT more readable
 IsJsonString: checks if a string is json
 leftDisjoin: efficient ES6 function to find difference between 2 arrays
*/
module.exports = {




  currentTime: () => {
    _time = new Date().toISOString().
    replace(/T/, ' ').    // replace T with a space
    replace(/\..+/, '');
    return _time;
  },

  IsJsonString: (str) => {
      try {
          JSON.parse(str);
      } catch (e) {
          return false;
      }
      return true;
  },

  leftDisjoin: (newArr, oldArr) => {
    var oldSet = new Set(oldArr);
    return newArr.filter(function(x) { return !oldSet.has(x); });
  },

  sendTweet: (msg) => {


    const CircularJSON = require('circular-json');

    const twit = require('twit');
    // staging will send from nxt335_lg_01, production from nxt335_lg_02
    const config = require('./config_twit.js');
    var T = new twit(config);
    var msg = JSON.parse(msg);
    var send = false;

    // decide whether to send tweet


    if (msg["team1_win_percentage_live"] === undefined) {
      console.log('WARNING', 'cannot parse tweet');
      return;
    }
    if (msg["team1_score"] == 1 || msg["team2_score"] == 1) { send = true;}
    if (Math.abs(msg["team1_score"] - msg["team2_score"]) > 1) { send = true;}

    if ( msg["team1_win_percentage_live"].toFixed(3) > 0.98 || msg["team2_win_percentage_live"].toFixed(3) > 0.98 ) { send = false;}
    console.log('send tweet', send);
    if (!send) {return;}

    // HACK remove this when the model is updated
    var t1;
    var t2;
    if (msg["team1_name"] === undefined) {
      t1 = msg["team1_id"];
    }
    else {
      t1 = msg["team1_name"];
    }
    if (msg["team2_name"] === undefined) {
      t2 = msg["team2_id"];
    }
    else {
      t2 = msg["team2_name"];
    }

    var tweet = '';
    if (parseFloat(msg["team1_win_percentage_live"]).toFixed(4) > parseFloat(msg["team2_win_percentage_live"]).toFixed(4))
    {
      tweet = tweet + t1 + " are a  " + parseFloat((msg["team1_win_percentage_live"])*100).toFixed(2) + "% favorite";
      tweet = tweet + " over " +  t2 ;
      tweet = tweet + ', score ' + msg["team1_score"] +" to "+ msg["team2_score"] ;
    }
    else
    {
      tweet = tweet + t2 + " are a " + parseFloat((msg["team2_win_percentage_live"])*100).toFixed(2) + "% favorite";
      tweet = tweet + " over " +  t1 ;
      tweet = tweet + ', score ' + msg["team2_score"] + " to " + msg["team1_score"] ;
    }
    tweet = tweet + ", in match " +  msg["match_number"] + " of " +  msg["bestof"]  ;
    if (process.env.NODE_ENV === 'production') {
      tweet = tweet + '. http://***REMOVED***.com/matchups/' + msg["csgogame_id"];
    }
    else {
      tweet = tweet + '. http://***REMOVED***.staging.wpengine.com/matchups/' + msg["csgogame_id"];
    }
    tweet = tweet.substring(0,139);
    try {
      T.post('statuses/update', { status: tweet }, function(err, data, response) {
        reply = CircularJSON.stringify(data);

        if (reply.indexOf('"errors":')>0) {
          console.log(data); // probably an error
        }
        else {
          // console.log('OK');
        }
      });
    }
    catch (e) {
      console.log(e);
    }

  }

};
