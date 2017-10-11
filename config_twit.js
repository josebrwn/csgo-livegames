//config.js
/*
  TWITTER APP CONFIGURATION
  Owner	nxt335
  Owner ID	893460385809874944
  Owner ntake_odds
  Owner ID 917869675429556225
*/
if (process.env.NODE_ENV === 'production') {
  module.exports = {
    consumer_key: '***REMOVED***',
    consumer_secret: '***REMOVED***',
    access_token: '***REMOVED***',
    access_token_secret: '***REMOVED***',
    timeout_ms: 30000
  }
}
else { // other environments tweet to stage, first one wins
  module.exports = {
    consumer_key: '***REMOVED***',
    consumer_secret: '***REMOVED***',
    access_token: '893460385809874944-XmrUzgSyVj5rKnExrvzHZu5O1e8MONn',
    access_token_secret: 'YdTXt9GnGJR3ygqQjmPDXKJlryBLh0nAIxlCgVfUuK1Dl',
    timeout_ms: 30000
  }
}
