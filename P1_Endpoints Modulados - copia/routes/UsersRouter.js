const express = require('express');
const usersService = require('../services/usersServices');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Manejo de usuarios
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Una lista de usuarios.
 */
router.get('/', (req, res) => {
  const users = usersService.getAll();
  res.json({ users });
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener un usuario por su ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del usuario.
 *     responses:
 *       200:
 *         description: Detalles del usuario.
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = usersService.getById(id);
  res.json({ user });
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado.
 */
router.post('/', (req, res) => {
  const body = req.body;
  const newUser = usersService.create(body);
  res.status(201).json(newUser);
});

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Actualizar un usuario parcialmente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado.
 */
router.patch('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = usersService.update(id, body);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del usuario.
 *     responses:
 *       200:
 *         description: Usuario eliminado.
 */
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const respuesta = usersService.delete(id);
    res.json(respuesta);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
