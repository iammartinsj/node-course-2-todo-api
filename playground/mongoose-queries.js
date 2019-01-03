const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/model/todo');
const { User } = require('./../server/model/user');

var id = '5c2db9c50f6060c209b4e91f';

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos find ', todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo findOne ', todo);
// });

// Todo.findById(id).then((todo) => {
//   console.log('Todo findBy', todo);
// });

User.findById(id).then((user) => {
  if(!user){
    return console.log('id not found');
  }
  console.log(user);
}).catch((e) => console.log(e));