const faker = require('faker');
const express = require('express');
const router = express.Router();

const products = [];
for (let index = 0; index < 10; index++) {
  products.push({
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

router.get("/", (req, res) => {
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Soy una ruta de filtro')
})

router.get("/:id", (req, res) => {
  const { id } = req.params; // Extraemos el parametro id de los parametros ruta
  const product = products.find(item => item.id === id);
  res.json(product);
});

router.get('/category/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  const filteredProducts = products.filter(item => item.categoryId === Number(categoryId));
  res.json(filteredProducts);
});

router.get('/brand/:brandId', (req, res) => {
  const { brandId } = req.params;
  const filteredProducts = products.filter(item => item.brandId === Number(brandId));
  res.json(filteredProducts);
});

router.post('/', (req, res) => {
  const { image, productName, description, price, stock, categoryId, brandId } = req.body;
  const newProduct = {
    id: products.length + 1,
    image,
    productName,
    description,
    price,
    stock,
    categoryId,
    brandId
  };
  products.push(newProduct);
  res.status(201).json({
    message: 'created',
    data: newProduct
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { image, productName, description, price, stock, categoryId, brandId } = req.body;
  const product = products.find(item => item.id === id);
  if (product) {
    if (image) product.image = image;
    if (productName) product.productName = productName;
    if (description) product.description = description;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (categoryId) product.categoryId = categoryId;
    if (brandId) product.brandId = brandId;
    res.json({
      message: 'Updated',
      data: product
    });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex(item => item.id === id);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    res.json({
      message: 'Deleted',
      id
    });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
})
module.exports = router;
