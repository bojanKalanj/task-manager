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
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users).status(200);
  } catch (error) {
    res.send(error).status(500);
  }
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
});

app.patch('/users/:id', async (req, res) => {
  const id = req.params.id;
  const keysToUpdate = ['name', 'email', 'password'];
  validateKeys(keysToUpdate, req.body, res);
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (updatedUser) {
      res.status(200).send(updatedUser);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.send(400).send(error);
  }
});

app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  deleteFromDocuments(User, id, res);
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
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
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
});

app.patch('/tasks/:id', async (req, res) => {
  const id = req.params.id;
  const keysToUpdate = ['description', 'completed'];
  validateKeys(keysToUpdate, req.body, res);

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    if (updatedTask) {
      res.status(200).send(updatedTask);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id;
  deleteFromDocuments(Task, id, res);
});

// HELPERS
validateKeys = (keysToUpdate, reqBody, res) => {
  const keysFromReq = Object.keys(reqBody);
  var invalidKey = null;
  const isValidKey = keysFromReq.every(key => {
    invalidKey = key;
    return keysToUpdate.includes(key);
  });
  if (!isValidKey) {
    return res
      .status(400)
      .send({ error: `${invalidKey} is not valid filed for update` });
  }
};

deleteFromDocuments = async (Model, id, res) => {
  try {
    const deletedItem = await Model.findByIdAndDelete(id);
    if (deletedItem) {
      res.status(200).send(deletedItem);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).send();
  }
};

app.listen(port, () => {
  console.log('Server is up on port: ', port);
});
