const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// USERS
app.post('/users', (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(user => res.send(user).status(201))
    .catch(error => {
      res.status(400).send(error);
    });
});

app.get('/users', (req, res) => {
  User.find({})
    .then(users => res.send(users).status(200))
    .catch(error => res.send(error).status(500));
});

app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then(user => {
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    })
    .catch(() => res.status(500).send());
});

// TASKS
app.post('/tasks', (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then(task => res.send(task).status(201))
    .catch(error => res.send(error).status(400));
});

app.listen(port, () => {
  console.log('Server is up on port: ', port);
});

app.get('/tasks', (req, res) => {
  Task.find({})
    .then(tasks => res.status(200).send(tasks))
    .catch(error => {
      res.status(500).send();
    });
});

app.get('/tasks/:id', (req, res) => {
  const { id } = req.params;
  Task.findById(id)
    .then(task => {
      if (task) {
        res.status(200).send(task);
      } else {
        res.status(404).send();
      }
    })
    .catch(error => res.status(500).send(error));
});
