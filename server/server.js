var env = process.env.NODE_ENV || 'development';

if(env === 'development'){
  process.env.port = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if(env === 'test'){
  process.env.port = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}

//Third Party Modules
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

//Relative Modules
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./model/todo');
const { User } = require('./model/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//POST todo
app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET todoS
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
}); 

//GET todos (single)
app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  if(!ObjectID.isValid(id)){
   res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if(!todo){
      res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

//DELETE todos (single)
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  if(!ObjectID.isValid(id)){
    res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo){
      res.status(404).send();
    }
    res.send({todo});
  }).catch(() => res.status(400).send());
});

app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
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

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo){
      res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => res.status(400).send(e));
});

app.listen(port, () => {
  console.log(`started on port ${port}`);
});

module.exports = { app }