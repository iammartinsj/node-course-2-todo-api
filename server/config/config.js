var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  const config = require('./config.json');
  const evnConfig = config[env];

  Object.keys(evnConfig).forEach((key) => {
    process.env[key] = evnConfig[key];
  });
}

// if (env === 'development') {
//   process.env.port = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// } else if (env === 'test') {
//   process.env.port = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }
