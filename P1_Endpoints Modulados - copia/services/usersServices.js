const faker = require('faker')

class usersService {
  constructor() {
    this.users = []
    this.generate()
  }

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

  create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.users.push(newUser)
    return newUser
  }

  getAll() {
    return this.users
  }

  getById(id) {
    return this.users.find(item => item.id === id)
  }

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

  delete(id) {
    const index = this.users.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('User Not Found')
    }
    this.users.splice(index, 1)
    return { id }
  }
}

module.exports = usersService
