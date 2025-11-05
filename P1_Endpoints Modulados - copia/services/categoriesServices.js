// Importar faker para generar datos de prueba
const faker = require('faker')

class categoriesService {
  constructor() {
    this.categories = [] // Inicializar array de categorías
    this.generate() // Generar datos de prueba al instanciar
  }

  // Generar 10 categorías con datos aleatorios
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

  // Crear una nueva categoría
  create(data) {
    const newCategory = {
      id: faker.datatype.uuid(), // Generar ID único
      ...data
    }
    this.categories.push(newCategory)
    return newCategory
  }

  // Obtener todas las categorías
  getAll() {
    return this.categories
  }

  // Obtener una categoría por su ID
  getById(id) {
    return this.categories.find(item => item.id === id)
  }

  // Actualizar una categoría existente
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

  // Eliminar una categoría
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
