/*
 LOOP_EVERY_MS loop_every_ms > 1000 * alert_every_loop * 2
 controls how often the scraper runs. was 180000 in production.

 ALERT_EVERY_LOOP every Nth loop report on inactivity
 MAX_INACTIVE inactivity can go an hour during breaks
 TIMEOUT_MS api timeout hits occasionally at 10000?
 WAIT_MS wait ms only useful if varying loop durations
*/
module.exports = {
    "LOOP_EVERY_MS": 60000,
    "TIMEOUT_MS": 30000,
    "MAX_INACTIVE": 7200,
    "ALERT_EVERY_LOOP": 60,
    "WAIT_MS": 2000,
    "TWEET_SEC": 36 // 2400 per day
};
