const express = require('express');
const router = express.Router();
const UsersService = require('../services/usersServices');
const service = new UsersService();

router.get('/', (req, res) => {
  const users = service.getAll();
  res.json({ users });
});

router.get('/filter', (req, res) => {
  res.send('Soy una ruta de filtro');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = service.getById(id);
  res.json({ user });
});

router.post('/', (req, res) => {
  const body = req.body;
  const newUser = service.create(body);
  res.status(201).json(newUser);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const user = service.update(id, body);
  res.json(user);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const respuesta = service.delete(id);
  res.json(respuesta);
});

module.exports = router;
