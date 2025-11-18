// Importar faker para generar datos de prueba
const faker = require('faker')

class brandsService {
  constructor() {
    this.brands = [] // Inicializar array de marcas
    this.generate() // Generar datos de prueba al instanciar
  }

  // Generar 10 marcas con datos aleatorios
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

  // Crear una nueva marca
  create(data) {
    const newBrand = {
      id: faker.datatype.uuid(), // Generar ID único
      ...data
    }
    this.brands.push(newBrand)
    return newBrand
  }

  // Obtener todas las marcas
  getAll() {
    return this.brands
  }

  // Obtener una marca por su ID
  getById(id) {
    return this.brands.find(item => item.id === id)
  }

  // Actualizar una marca existente
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

  // Eliminar una marca
  delete(id) {
    const index = this.brands.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Brand Not Found')
    }
    this.brands.splice(index, 1)
    return { id }
  }
}

module.exports = new brandsService
