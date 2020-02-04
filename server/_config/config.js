export const configOptions = {
  development: {
    db: 'mongodb://localhost/todo',
    port: process.env.PORT || 3001,
    userCookieName: 'user'
  },
  test: {
    db: 'mongodb://localhost/todo-integration',
    port: process.env.PORT || 3001,
    userCookieName: 'user'
  },
  production: {
    db:
      'mongodb://pdrean4:willchangesoon@cluster0-shard-00-00-pg36l.mongodb.net:27017,cluster0-shard-00-01-pg36l.mongodb.net:27017,cluster0-shard-00-02-pg36l.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
    port: process.env.PORT || 3001,
    userCookieName: 'user'
  }
}
