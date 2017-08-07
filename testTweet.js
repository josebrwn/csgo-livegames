const twit = require('twit');
const config = require('./config_twit.js');
const CircularJSON = require('circular-json');

var T = new twit(config);
var msg = '{"id":12522,"csgogame_id":2706,"team1_id":7155,"team2_id":8049,"hltv_game_id":2313152,"match_finished":false,"bestof":1,"team1_win_percentage":0.488,"team1_win_percentage_live":0.560252,"team2_win_percentage":0.512,"team2_win_percentage_live":0.439748,"match_status":1,"match_number":1,"map_name":"overpass","team1_score":1,"team2_score":0,"team1_oddsct":0.502,"team1_oddst":0.493,"team1_winodds":0.488,"team1_side":"T","team2_side":"CT","team1_wins":null,"team2_wins":null,"team1_winodds_live":0.560252}';
var msg = JSON.parse(msg);

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
console.log (tweet);
try {
  T.post('statuses/update', { status: tweet }, function(err, data, response) {
    console.log(data);
  });
}
catch (e) {
  console.log(e);
}
