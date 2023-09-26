const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = { 
   users_list :
   [
      { 
         id : 'xyz789',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : 'abc123', 
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : 'ppp222', 
         name: 'Mac',
         job: 'Professor',
      }, 
      {
         id: 'yat999', 
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: 'zap555', 
         name: 'Dennis',
         job: 'Bartender',
      }
   ]
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id'];
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

app.post('/users', (req, res) => {
    var userToAdd = req.body;
    const id = generateRandomID();

    userToAdd = {id: id, ...userToAdd};
    addUser(userToAdd);
    res.status(201).send(userToAdd);
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    if (id === undefined)
        res.status(404).send('Resource not found.');
    else {
        removeUserById(id);
        res.status(204).end();
    }
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    console.log(name)
    console.log(job)
    if (name != undefined && job != undefined) {
        let result = findUserByNameJob(name, job);
        result = {users_list: result};
        res.send(result);
    }
    else {
        res.send(users);
    }
});

function removeUserById(id) {
    users['users_list'] = users['users_list'].filter((user) => user.id !== id);
}

function addUser(user) {
    users['users_list'].push(user);
}

function findUserById(id) {
    return users['users_list'].find((user) => user['id'] === id);
}

function findUserByNameJob(name, job) {
    return users['users_list'].find((user) => user['name'] === name && user['job'] === job);
}

function generateRandomID() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});