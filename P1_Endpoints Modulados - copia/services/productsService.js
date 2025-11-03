const faker = require("faker")

class productsService {
  constructor() {
    this.products = []
    this.generate()
  }

  generate() {
    for (let index = 0; index < 10; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        image: faker.image.imageUrl(),
        productName: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.datatype.number({ min: 0, max: 100 }),
        categoryId: faker.datatype.number({ min: 1, max: 10 }),
        brandId: faker.datatype.number({ min: 1, max: 10 })
      });
    }
  }

  create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct)
    return newProduct
  }

  getAll(){
    return this.products
  }

  getById(id){
    return this.products.find(item => item.id === id)
  }

  update(id, changes) {
    const index = this.products.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Product Not Found')
    }
    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...changes
    }
    return this.products[index]
  }

  delete(id) {
    const index = this.products.findIndex(item)
    if (index === -1 ){
      throw new Error('Product Not Found')
    }
    this.products.splice(index, 1)
    return { id }
  }
}

module.exports = productsService;
