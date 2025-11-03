const faker = require('faker')

class brandsService {
  constructor() {
    this.brands = []
    this.generate()
  }

  generate() {
    for (let index = 0; index < 10; index++) {
      this.brands.push({
        id: faker.datatype.uuid(),
        brandName: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        active: faker.datatype.boolean()
      })
    }
  }

  create(data) {
    const newBrand = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.brands.push(newBrand)
    return newBrand
  }

  getAll() {
    return this.brands
  }

  getById(id) {
    return this.brands.find(item => item.id === id)
  }

  update(id, changes) {
    const index = this.brands.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Brand Not Found')
    }
    const brand = this.brands[index]
    this.brands[index] = {
      ...brand,
      ...changes
    }
    return this.brands[index]
  }

  delete(id) {
    const index = this.brands.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Brand Not Found')
    }
    this.brands.splice(index, 1)
    return { id }
  }
}

module.exports = brandsService
