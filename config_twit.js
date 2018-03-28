//config.js
/*
  TWITTER APP CONFIGURATION
*/
if (process.env.NODE_ENV === 'production') {
  module.exports = {
    consumer_key: '',
    consumer_secret: '',
    access_token: '',
    access_token_secret: '',
    timeout_ms: 30000
  }
}
else { // other environments tweet to stage, first one wins
  module.exports = {
    consumer_key: '',
    consumer_secret: '',
    access_token: '',
    access_token_secret: '',
    timeout_ms: 30000
  }
}
