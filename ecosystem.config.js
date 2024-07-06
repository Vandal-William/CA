module.exports = {
    apps: [
      {
        name: 'api-business',
        script: 'main.js',
        cwd: '/var/www/api-business/src',
        watch: true,
        env: {
          NODE_ENV: 'production'
        }
      },
      {
        name: 'api-publication',
        script: 'main.js',
        cwd: '/var/www/api-publication/src',
        watch: true,
        env: {
          NODE_ENV: 'production'
        }
      },
    ],
    deploy: {
      production: {
        user: 'ubuntu',
        host: '54.38.35.141',
        ref: 'origin/main',
        repo: 'https://github.com/Vandal-William/CA',
        path: '/home/ubuntu/management',
        'post-deploy': 'chmod +x ./deploy.sh && ./deploy.sh && pm2 reload ecosystem.config.js --env production'
      }
    }
  };
  