module.exports = {
  apps: [
    {
      name: 'cachify',
      script: './index.js',
      interpreter: 'node@10.5.0',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
