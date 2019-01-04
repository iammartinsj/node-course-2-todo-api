const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/model/todo');
const { User } = require('./../server/model/user');

var id = '5c2ebab45c84b110650af2eb';

// Todo.remove({}).then((todos) => {
//   console.log(todos);
// });

// Todo.findOneAndRemove({
//   _id: id
// }).then((doc) => {
//   console.log(doc);
// });

Todo.findByIdAndRemove(id).then((doc) => {
  console.log(doc);
});