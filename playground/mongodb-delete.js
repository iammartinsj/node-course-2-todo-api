//Third Party Modules
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err){
    return console.log('Unable to connect to MongoDB Server', err);
  }
  console.log('Connected to MongoDB Server');
  const db = client.db('TodoApp');;

  //deleteMany
  // db.collection('Users').deleteMany({name:'Robert Downy'}).then((result) => {
  //   console.log(result);
  // });

  //deleteOne
  // db.collection('Users').deleteOne({name:'Johnny Deff'}).then((result) => {
  //   console.log(result);
  // });

  //findOneAndDelete
  db.collection('Users').findOneAndDelete({_id: new ObjectID('5c2b1fdef50bfd0dd0053a9b')}).then((result) => {
    console.log(result);
  });

  // client.close();
});