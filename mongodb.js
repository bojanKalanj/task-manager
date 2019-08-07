// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

const { MongoClient, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true })
  .then((error, client) => {
    if (error) {
      return console.log('Unable to connect to database, ', error);
    }
    // console.log('Connected correctly!');
    const db = client.db(databaseName);

    db.collection('tasks')
      .deleteOne({ description: 'Taks two description' })
      .then(task => console.log(task))
      .catch(error => console.log(error));
    // db.collection('tasks')
    //   .updateMany({}, { $set: { completed: true } })
    //   .then(tasks => {
    //     console.log(tasks);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    // db.collection('tasks').findOne(
    //   { _id: new ObjectId('5d45a53a45c7460b08dc2590') },
    //   (error, result) => {
    //     error ? console.log(error) : console.log(result);
    //   }
    // );

    // db.collection('tasks')
    //   .find({ completed: false })
    //   .toArray((error, result) => {
    //     error ? console.log(error) : console.log(result);
    //   });

    // db.collection('users').insertOne({
    //   name: 'Bojan',
    //   age: '27'
    // }),
    //   (error, result) => {
    //     if (error) return console.log('Unable to insert to database');
    //     console.log(result);
    //   };

    // db.collection('users').insertMany(
    //   [
    //     {
    //       name: 'bojan',
    //       age: 22
    //     },
    //     {
    //       name: 'random',
    //       age: '300'
    //     }
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log(error);
    //     }

    //     console.log(result);
    //   }
    // );

    // db.collection('tasks').insertMany(
    //   [
    //     {
    //       description: 'Taks one description',
    //       completed: true
    //     },
    //     {
    //       description: 'Taks two description',
    //       completed: false
    //     },
    //     {
    //       description: 'Taks three description',
    //       completed: false
    //     }
    //   ],
    //   (error, result) => {
    //     error ? console.log(error) : console.log(result.ops);
    //   }
    // );
  })
  .catch(error => console.log('ERROR'));
