const request = require("request");
const timers = require('./timers');

// to test, export/set env variables:
// API_URL=http://localhost:56285/api/v1/CSGO/Pinnacle

// note the server expects "API-KEY" - separator is different!
const api_url = process.env.API_URL || 'http://jsonplaceholder.typicode.com/posts';
const api_key = process.env.API_KEY || '***REMOVED***';

var options = {
    method: 'POST',
    url: api_url,
    headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'API-KEY': api_key
    },
    timeout: timers["TIMEOUT_MS"] // default is 120000
};

gameStatusJSON = JSON.stringify();
options.body = gameStatusJSON;

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
