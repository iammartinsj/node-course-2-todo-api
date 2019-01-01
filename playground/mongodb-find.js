const { MongoClient, ObjectID } = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err){
    return console.log('Unable to connect to MongoDB Server', err);
  }
  console.log('Connected to MongoDB Server');
  const db = client.db('TodoApp');;

  db.collection('Users').find({name: 'Robert Downy'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  });

  // client.close();
});