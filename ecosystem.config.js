module.exports = {
  apps: [
    {
    name      : "speculo",
    script    : "index.js",
    env: {
    },
    env_production: {
      NODE_ENV: "production"
    }
  }],
  deploy: {
    production : {
      user : "node",
      host : process.env.IP ? process.env.IP : '',
      repo : "git@github.com:victorchabbert/speculo.git",
      ref  : "origin/master",
      path : "/home/node/speculo",
      "post-setup": "yarn",
      "post-deploy" : "pm2 startOrRestart ecosystem.config.js --env production"
    },
    dev : {
      user : "node",
      host : process.env.IP ? process.env.IP : '',
      repo : "git@github.com:victorchabbert/speculo.git",
      ref  : "origin/development",
      path : "/home/node/speculo",
      "post-setup": "yarn",
      "post-deploy" : "pm2 startOrRestart ecosystem.config.js --env production"
    }
  }
}
