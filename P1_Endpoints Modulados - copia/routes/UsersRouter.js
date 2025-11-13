// Importación de dependencias necesarias
const express = require('express');
const router = express.Router();
const UsersService = require('../services/usersServices'); // Asume que el servicio está en esta ruta
const service = new UsersService();

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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   Name:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                     format: email
 *                   password:
 *                     type: string
 *                     format: password
 */
router.get('/', (req, res) => {
  const users = service.getAll();
  res.json({ users });
});

router.get('/filter', (req, res) => {
  res.send('Soy una ruta de filtro');
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
 *         description: El ID (UUID) del usuario.
 *     responses:
 *       200:
 *         description: Detalles del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 Name:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 password:
 *                   type: string
 *                   format: password
 *       404:
 *         description: Usuario no encontrado.
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = service.getById(id);
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
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             example:
 *               Name: "John Doe"
 *               username: "johndoe99"
 *               email: "john.doe@example.com"
 *               password: "supersecret123"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 */
router.post('/', (req, res) => {
  const body = req.body;
  const newUser = service.create(body);
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
 *         description: El ID (UUID) del usuario a actualizar.
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
 *                 format: email
 *             example:
 *               username: "johndoe_new"
 *               email: "john.new@example.com"
 *     responses:
 *       200:
 *         description: Usuario actualizado.
 *       404:
 *         description: Usuario no encontrado.
 */
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const user = service.update(id, body);
  res.json(user);
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
 *         description: El ID (UUID) del usuario a eliminar.
 *     responses:
 *       200:
 *         description: Usuario eliminado.
 *       404:
 *         description: Usuario no encontrado.
 */
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const respuesta = service.delete(id);
  res.json(respuesta);
});

// Exportar el router
module.exports = router;
