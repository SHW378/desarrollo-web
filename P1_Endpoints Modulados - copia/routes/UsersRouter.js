// Importación de dependencias necesarias
const express = require('express');
const router = express.Router();
const UsersService = require('../services/usersServices');
const service = new UsersService();

// Obtener todos los usuarios
router.get('/', (req, res) => {
  const users = service.getAll();
  res.json({ users });
});

// Ruta de filtro (placeholder)
router.get('/filter', (req, res) => {
  res.send('Soy una ruta de filtro');
});

// Obtener un usuario por su ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = service.getById(id);
  res.json({ user });
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
  const body = req.body;
  const newUser = service.create(body);
  res.status(201).json(newUser);
});

// Actualizar un usuario por su ID
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const user = service.update(id, body);
  res.json(user);
});

// Eliminar un usuario por su ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const respuesta = service.delete(id);
  res.json(respuesta);
});

// Exportar el router
module.exports = router;
