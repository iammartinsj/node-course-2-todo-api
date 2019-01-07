//Third Party Modules
const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

//Relative Modules
const { Todo } = require('./../../model/todo');
const { User } = require('./../../model/user');

//Statuc Users Id
const userOneId = new ObjectID();
const userTwoId = new ObjectID();

//Static User documents
const users = [{
  _id: userOneId,
  email: 'elon.musk@email.com',
  password: '123abc',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, '123abc').toString()
  }]
},{
  _id: userTwoId,
  email: 'larry.page@gmail.com',
  password: 'abc123',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'}, '123abc').toString()
  }]
}];

//Static Todo documents
const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  _creator: userOneId
},{
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 1300,
  _creator: userTwoId
}];

//Remove exisiting documents to datatabase
//Insert new todo documents to datatabase
const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => {
    done();
  });
};

//Remove exisiting documents to datatabase
//Insert new user documents to datatabase
const populateUsers = (done) => {
  User.remove({}).then(() => {
    const userOne = new User(users[0]).save();
    const userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

//Export methods
module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
}

