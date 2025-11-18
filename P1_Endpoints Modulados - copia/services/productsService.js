// Importar faker para generar datos de prueba
const faker = require("faker")
const brandsServise = require('./brandsServices');
const categoriesServise = require('./categoriesServices');

class productsService {
  constructor() { // Recibe los servicios de marcas y categorías como dependencias
    this.products = [] // Inicializar array de productos
    this.brandsServise = brandsServise // Referencia al servicio de marcas
    this.categoriesServise = categoriesServise // Referencia al servicio de categorías
    this.generate() // Generar datos de prueba al instanciar
  }

  // Generar 10 productos con datos aleatorios
  generate() {
    const brands = this.brandsServise.getAll();
    const categories = this.categoriesServise.getAll();

    if (brands.length === 0 || categories.length === 0) {
      console.warn("Error, no se puede generar sin brands ni categories");
      return;
    }

    for (let index = 0; index < 10; index++) {
      const randombrand = brands[Math.floor(Math.random() * brands.length)];
      const randomcategory = categories[Math.floor(Math.random() * categories.length)];

      this.products.push({
        id: faker.datatype.uuid(),
        image: faker.image.imageUrl(),
        productName: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.datatype.number({ min: 0, max: 100 }),
        brandId: randombrand.id,
        categoryId: randomcategory.id
      });
    }
  }

  // Crear un nuevo producto
  create(data) {
    const brand = this.brandsServise.getById(data.brandId);
    if (!brand) {
      throw new Error('Brand no encontrada');
    }

    const category = this.categoriesServise.getById(data.categoryId)
    if (!category) {
      throw new Error('Category no encontrada');
    }
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
    if (changes.brandId) {
      const brand = this.brandsServise.getById(changes.brandId);
      if (!brand) {
        throw new Error('Brand no encontrada');
      }
    }
    if (changes.categoryId) {
      const category = this.categoriesServise.getById(changes.categoryId);
      if (!category) {
        throw new Error('Category no encontrada');
      }
    }
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


  brandEnUso(brandId) {
    return this.products.some(product => product.brandId === brandId)
  }

  categoryEnUso(categoryId) {
    return this.products.some(product => product.categoryId === categoryId)
  }
}
module.exports = new productsService;
