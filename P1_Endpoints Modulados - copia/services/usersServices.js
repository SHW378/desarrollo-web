// Importar faker para generar datos de prueba
const faker = require('faker')

class usersService {
  constructor() {
    this.users = [] // Inicializar array de usuarios
    this.generate() // Generar datos de prueba al instanciar
  }

  // Generar 10 usuarios con datos aleatorios
  generate() {
    for (let index = 0; index < 10; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        Name: faker.name.findName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      })
    }
  }

  // Crear un nuevo usuario
  create(data) {
    const newUser = {
      id: faker.datatype.uuid(), // Generar ID único
      ...data
    }
    this.users.push(newUser)
    return newUser
  }

  // Obtener todos los usuarios
  getAll() {
    return this.users
  }

  // Obtener un usuario por su ID
  getById(id) {
    return this.users.find(item => item.id === id)
  }

  // Actualizar un usuario existente
  update(id, changes) {
    const index = this.users.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('User Not Found')
    }
    const user = this.users[index]
    this.users[index] = {
      ...user,
      ...changes
    }
    return this.users[index]
  }

  // Eliminar un usuario
  delete(id) {
    const index = this.users.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('User Not Found')
    }
    this.users.splice(index, 1)
    return { id }
  }
}

module.exports = new usersService
