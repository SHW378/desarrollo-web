const ProductsService = require('./services/productsService')

const service = new ProductsService()

console.log('Initial products count:', service.getAll().length)

const all = service.getAll()
const firstId = all[0].id
console.log('\nFirst product before update:', service.getById(firstId))

// Update product
const updated = service.update(firstId, { productName: 'UPDATED_NAME', price: '999.99' })
console.log('\nAfter update (returned):', updated)
console.log('\nAfter update (getById):', service.getById(firstId))

// Delete product
const del = service.delete(firstId)
console.log('\nDelete returned:', del)
console.log('After delete, getById:', service.getById(firstId))
console.log('Final products count:', service.getAll().length)
