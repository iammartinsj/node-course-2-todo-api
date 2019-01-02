const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err){
    return console.log('Unable to connect to MongoDB Server', err);
  }
  console.log('Connected to MongoDB Server');
  const db = client.db('TodoApp');

  db.collection('Users').findOneAndUpdate({
    _id: ObjectID('5c2b7094e3549826c022903f')
  }, {
    $set: {
      name: 'Brad Pitt',
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });
});