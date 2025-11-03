const faker = require('faker')

class categoriesService {
  constructor() {
    this.categories = []
    this.generate()
  }

  generate() {
    for (let index = 0; index < 10; index++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        categoryName: faker.commerce.department(),
        description: faker.commerce.productDescription(),
        active: faker.datatype.boolean()
      })
    }
  }

  create(data) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.categories.push(newCategory)
    return newCategory
  }

  getAll() {
    return this.categories
  }

  getById(id) {
    return this.categories.find(item => item.id === id)
  }

  update(id, changes) {
    const index = this.categories.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Category Not Found')
    }
    const category = this.categories[index]
    this.categories[index] = {
      ...category,
      ...changes
    }
    return this.categories[index]
  }

  delete(id) {
    const index = this.categories.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Category Not Found')
    }
    this.categories.splice(index, 1)
    return { id }
  }
}

module.exports = categoriesService
