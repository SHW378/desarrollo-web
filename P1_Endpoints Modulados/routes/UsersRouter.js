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

module.exports = router;
