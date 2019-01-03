//Third Party Modules
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

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

app.listen(port, () => {
  console.log(`started on port ${port}`);
});

module.exports = { app }