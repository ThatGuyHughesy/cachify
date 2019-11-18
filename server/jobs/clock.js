const { CronJob } = require('cron');
const pruner = require('./pruner.js');

const prunePlaylistsJob = new CronJob({
  cronTime: '*/5 * * * *',
  onTick: pruner.prunePlaylists()
});

prunePlaylistsJob.start();
