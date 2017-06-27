var request = require("request");

var options = {
    method: 'POST',
    url: 'http://jsonplaceholder.typicode.com/posts',
    headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/json'
    },
    body: '{"listid": 2311427, "scoreT": 1, "scoreCT": 2}'
};

request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
});
