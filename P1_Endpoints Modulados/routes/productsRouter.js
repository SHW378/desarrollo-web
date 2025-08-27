const faker = require('faker');
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
    name: faker.commerce.productName(),
    price: parseInt(faker.commerce.price(), 10),
    image: faker.image.imageUrl()
  });
}
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Soy una ruta de filtro')
})

router.get("/:id", (req, res) =>{
  const { id } = req.params; // Extraemos el parametro id de los parametros ruta
  res.json({
    id: parseInt(id), // Devolvemos el id recibido
    name: 'Coca-Cola',
    price: 50
  });
});



module.exports = router;
