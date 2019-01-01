const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err){
    return console.log('Unable to connect to MongoDB Server', err);
  }
  console.log('Connected to MongoDB Server');
  const db = client.db('TodoApp');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if(err){
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.collection('Users').insertOne({
    name: 'Robert Downy',
    age: 53,
    location: 'United State America'
  }, (err, result) => {
    if(err){
      return console.log('Unable to insert user', err);
    }
    console.log(JSON.stringify(result.ops));
  });

  client.close();
});