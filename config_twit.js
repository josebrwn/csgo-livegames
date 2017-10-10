//config.js
/*
  TWITTER APP CONFIGURATION
  Owner	nxt335
  Owner ID	893460385809874944
  Owner ntake_odds
  Owner ID 917869675429556225
*/
if (process.env.NODE_ENV === 'staging') {
  module.exports = {
    consumer_key: '***REMOVED***',
    consumer_secret: '***REMOVED***',
    access_token: '***REMOVED***',
    access_token_secret: '***REMOVED***',
    timeout_ms: 30000
  }
}
else if (process.env.NODE_ENV === 'production') {
  module.exports = {
    consumer_key: '***REMOVED***',
    consumer_secret: '***REMOVED***',
    access_token: '***REMOVED***',
    access_token_secret: '***REMOVED***',
    timeout_ms: 30000
  }
}
