const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// USERS
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
  // user
  //   .save()
  //   .then(user => res.send(user).status(201))
  //   .catch(error => {
  //     res.status(400).send(error);
  //   });
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users).status(200);
  } catch (error) {
    res.send(error).status(500);
  }
  // User.find({})
  //   .then(users => res.send(users).status(200))
  //   .catch(error => res.send(error).status(500));
});

app.get('/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send();
    }
  } catch (e) {
    res.status(500).send(e);
  }

  // User.findById(id)
  //   .then(user => {
  //     if (!user) {
  //       return res.status(404).send();
  //     }
  //     res.send(user);
  //   })
  //   .catch(() => res.status(500).send());
});

// TASKS
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    const savedTask = await task.save();
    res.status(200).send(savedTask);
  } catch (error) {
    res.send(error).status(400);
  }
  // task
  //   .save()
  //   .then(task => res.send(task).status(201))
  //   .catch(error => res.send(error).status(400));
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
  // Task.find({})
  //   .then(tasks => res.status(200).send(tasks))
  //   .catch(error => {
  //     res.status(500).send();
  //   });
});

app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (task) {
      res.status(200).send(task);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).send();
  }
  // Task.findById(id)
  //   .then(task => {
  //     if (task) {
  //       res.status(200).send(task);
  //     } else {
  //       res.status(404).send();
  //     }
  //   })
  //   .catch(error => res.status(500).send(error));
});

app.listen(port, () => {
  console.log('Server is up on port: ', port);
});
