require('./config/config');

//Third Party Modules
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

//Relative Modules
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./model/todo');
const { User } = require('./model/user');
const { authenticate } = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//POST Todos Endpoint
app.post('/todos', authenticate, (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET Todos Endpoint(List)
app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
}); 

//GET Todos Endpoint(Single)
app.get('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  const creator = req.user._id;
  if(!ObjectID.isValid(id)){
   res.status(404).send();
  }
  Todo.findOne({
    _id: id,
    _creator: creator
  }).then((todo) => {
    if(!todo){
      res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

//DELETE Todos Endpoint
app.delete('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  const creator = req.user._id;
  if(!ObjectID.isValid(id)){
    res.status(404).send();
  }

  Todo.findOneAndRemove({
    _id: id,
    _creator: creator
  }).then((todo) => {
    if(!todo){
      res.status(404).send();
    }
    res.send({todo});
  }).catch(() => res.status(400).send());
});

//PATCH Todos Endpoint
app.patch('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  const creator = req.user._id;
  const body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)){
    res.status(404).send();
  }
  
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({
    _id: id,
    _creator: creator
  }, { $set: body }, { new: true }).then((todo) => {
    if (!todo) {
      res.status(404).send();
    }
    res.send({ todo });
  }).catch((e) => res.status(400).send(e));
});

//POST Users Endpoint
app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User({
    email: body.email,
    password: body.password
  });

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  })
  .catch((e) => res.status(400).send(e));
});

//POST User login  Endpoint
app.post('/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user)
    });
  }).catch((e) => {
    res.status(400).send(e);
  });
});

//Delete User Auth Token Endpoint
app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send()
  }).catch((e) => {
    res.status(400).send(e);
  });
});

//GET Users-me  Endpoint
app.get('/users/me', authenticate, (req,res) => {
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`started on port ${port}`);
});

//Export App
module.exports = { app }