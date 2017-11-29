// https://www.pinnacle.com/webapi/1.15/api/v1/GuestLines/Today/12
// include the libraries we need
var request = require('request');
var cheerio = require('cheerio');

// set some defaults: THIS STEP DOES NOTHING
req = request.defaults({
	// jar: true,                 // save cookies to jar
	// rejectUnauthorized: false,
	// followAllRedirects: true   // allow redirections
});

// scrape the page
req.get({
    url: "https://www.pinnacle.com/webapi/1.15/api/v1/GuestLines/Today/12",
    headers: {
     }
  }, function(err, resp, body) {

	// load the html into cheerio
	var $ = cheerio.load(body);

  console.log(body);

});
