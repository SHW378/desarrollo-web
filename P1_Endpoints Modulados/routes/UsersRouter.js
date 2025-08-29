const faker = require('faker');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const users = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    users.push({
      id: index + 1,
      Name: faker.name.findName(),
      username: faker.name.findName(),
      password: faker.internet.password(),
    });
  }
  res.json(users);
});

router.get('/filter', (req, res) => {
  res.send('Soy una ruta de filtro')
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id: id,
    Name: faker.name.findName(),
    username: faker.name.findName(),
    password: faker.internet.password()
  });
});

module.exports = router;
