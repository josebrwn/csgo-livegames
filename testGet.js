var request = require("request");
const CircularJSON = require('circular-json');
var logging = require('./logging');

var options = {
    method: 'GET',
    url: 'https://www.pinnacle.com/webapi/1.15/api/v1/GuestLines/Today/12', // eSports = 12
    headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/json'
    },
    body: ''
};

request(options, function(error, response, body) {
    if (error) throw new Error(error);
    var foo = CircularJSON.parse(body);
    console.log(CircularJSON.stringify(foo,null,2)); // pretty JSON
});
