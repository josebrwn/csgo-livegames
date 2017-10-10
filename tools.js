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
    const twit = require('twit');
    // staging will send from nxt335_lg_01, production from nxt335_lg_02
    const config = require('./config_twit.js');

    var T = new twit(config);
    var msg = JSON.parse(msg);

    if (process.env.NODE_ENV === 'staging') {
      var tweet = '';
      if (parseFloat(msg["team1_win_percentage_live"]).toFixed(4) > parseFloat(msg["team2_win_percentage_live"]).toFixed(4))
      {
        tweet = tweet + msg["team1_name"] + " are a  " + parseFloat((msg["team1_win_percentage_live"])*100).toFixed(2) + "% favorite";
        tweet = tweet + " over " +  msg["team2_name"] ;
        tweet = tweet + ', score ' + msg["team1_score"] +" to "+ msg["team2_score"] ;
      }
      else
      {
        tweet = tweet + msg["team2_name"] + " are a " + parseFloat((msg["team2_win_percentage_live"])*100).toFixed(2) + "% favorite";
        tweet = tweet + " over " +  msg["team1_name"] ;
        tweet = tweet + ', score ' + msg["team2_score"] + " to  " + msg["team1_score"] ;
      }
      tweet = tweet + ", in match " +  msg["match_number"] + " of " +  msg["bestof"]  ;
      tweet = tweet + '. http://***REMOVED***.com/matchups/' + msg["csgogame_id"];
    }
    if (process.env.NODE_ENV === 'production') {
      var tweet = '';
      tweet = tweet + '\nt1 ' + msg["team1_id"];
      tweet = tweet + '\nt2 ' + msg["team2_id"];
      tweet = tweet + '\nt1wp ' + parseFloat(msg["team1_win_percentage"]).toFixed(4);
      tweet = tweet + '\nt2wp ' + parseFloat(msg["team2_win_percentage"]).toFixed(4);
      tweet = tweet + '\nround ' + msg["match_number"];
      tweet = tweet + '\nmap ' + msg["map_name"];
      tweet = tweet + '\nbo ' + msg["bestof"];
      tweet = tweet + '\nt1wol ' + parseFloat(msg["team1_winodds_live"]).toFixed(4);
      tweet = tweet + '\ns1 ' + msg["team1_score"];
      tweet = tweet + '\ns2 ' + msg["team2_score"];
      tweet = tweet + '\nt1wpl ' + parseFloat(msg["team1_win_percentage_live"]).toFixed(4);
      tweet = tweet + '\nt2wpl ' + parseFloat(msg["team2_win_percentage_live"]).toFixed(4);
      tweet = tweet + '\nt1w ' + msg["team1_wins"];
      tweet = tweet + '\nt2w ' + msg["team2_wins"];
    }
    tweet = tweet.substring(0,139);

    try {
      T.post('statuses/update', { status: tweet }, function(err, data, response) {
        if (data.toString().indexOf('errors:')>0) {
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
