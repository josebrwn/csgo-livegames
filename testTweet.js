const twit = require('twit');
const config = require('./config_twit.js');
const CircularJSON = require('circular-json');

var T = new twit(config);
var msg = '{"id":12522,"csgogame_id":2706,"team1_id":7155,"team2_id":8049,"hltv_game_id":2313152,"match_finished":false,"bestof":1,"team1_win_percentage":0.488,"team1_win_percentage_live":0.560252,"team2_win_percentage":0.512,"team2_win_percentage_live":0.439748,"match_status":1,"match_number":1,"map_name":"overpass","team1_score":1,"team2_score":0,"team1_oddsct":0.502,"team1_oddst":0.493,"team1_winodds":0.488,"team1_side":"T","team2_side":"CT","team1_wins":null,"team2_wins":null,"team1_winodds_live":0.560252}';
var msg = JSON.parse(msg);
/*
var tweet = '' + msg["hltv_game_id"];
tweet = tweet + '\nt1 ' + msg["team1_id"];
tweet = tweet + '\nt2 ' + msg["team2_id"];
tweet = tweet + '\nt1wp ' + parseFloat(msg["team1_win_percentage"]).toFixed(4);
tweet = tweet + '\nt2wp ' + parseFloat(msg["team2_win_percentage"]).toFixed(4);
tweet = tweet + '\nr ' + msg["match_number"];
tweet = tweet + '\nm ' + msg["map_name"];
tweet = tweet + '\nbo ' + msg["bestof"];
tweet = tweet + '\nt1wol ' + parseFloat(msg["team1_winodds_live"]).toFixed(4);
tweet = tweet + '\ns1 ' + msg["team1_score"];
tweet = tweet + '\ns2 ' + msg["team2_score"];
tweet = tweet + '\nt1wpl ' + parseFloat(msg["team1_win_percentage_live"]).toFixed(4);
tweet = tweet + '\nt2wpl ' + parseFloat(msg["team2_win_percentage_live"]).toFixed(4);
tweet = tweet + '\nt1w ' + msg["team1_wins"];
tweet = tweet + '\nt2w ' + msg["team2_wins"];
tweet = tweet.substring(0,139);
*/

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

    console.log(tweet);
    try {
      T.post('statuses/update', { status: tweet }, function(err, data, response) {
        if (data.toString().indexOf('errors:')>0) {
          console.log(data); // probably an error
        }
        else {
          console.log('OK', data);
        }
      });
    }
    catch (e) {
      console.log(e);
    }
