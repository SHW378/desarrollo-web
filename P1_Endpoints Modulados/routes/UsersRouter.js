const faker = require('faker');
const express = require('express');
const router = express.Router();

const users = [];
  for (let index = 0; index < 10; index++) {
    users.push({
      id: faker.datatype.uuid(),
      Name: faker.name.findName(),
      username: faker.name.findName(),
      password: faker.internet.password(),
    });
  }

router.get('/', (req, res) => {
  res.json(users);
});

router.get('/filter', (req, res) => {
  res.send('Soy una ruta de filtro')
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(item => item.id === id);
  res.json(user);
});

router.post('/', (req, res) => {
  const { Name, username, password } = req.body;
  const newUser = {
    id: users.length + 1,
    Name,
    username,
    password
  };
  users.push(newUser);
  res.status(201).json({
    message: 'created',
    data: newUser
  });
});

router.patch('/:id', (req, res) => {
  const {id} = req.params;
  const {Name, username, password} = req.body;
  const user = users.find(item => item.id === parseInt(id));
  if (user) {
    if (Name) user.Name = Name;
    if (username) user.username = username;
    if (password) user.password = password;
    res.json({
      message:'Updated',
      data: user
    });
  } else {
    res.status(404).json({message: 'User not found'})
  }
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  const userIndex = users.findIndex(u => u.id == id)
  if (userIndex !== -1) {
    users.splice(userIndex,1)
    res.json({
      message: 'Deleted',
      id
    })
  } else {
    res.status(404).json({message: 'User not found'})
  }
})
module.exports = router;
