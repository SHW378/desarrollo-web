// Importar faker para generar datos de prueba
const faker = require("faker")

class productsService {
  constructor() {
    this.products = [] // Inicializar array de productos
    this.generate() // Generar datos de prueba al instanciar
  }

  // Generar 10 productos con datos aleatorios
  generate() {
    for (let index = 0; index < 10; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        image: faker.image.imageUrl(),
        productName: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.datatype.number({ min: 0, max: 100 }),
      });
    }
  }

  // Crear un nuevo producto
  create(data) {
    const newProduct = {
      id: faker.datatype.uuid(), // Generar ID único
      ...data
    }
    this.products.push(newProduct)
    return newProduct
  }

  // Obtener todos los productos
  getAll(){
    return this.products
  }

  // Obtener un producto por su ID
  getById(id){
    return this.products.find(item => item.id === id)
  }

  // Actualizar un producto existente
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

  // Eliminar un producto
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
