const faker = require('faker');
const express = require('express');
const router = express.Router();

const categories = [];
  for (let index = 0; index < 10; index++) {
    categories.push({
      Id: index + 1,
      categoryName: faker.commerce.department(),
      description: faker.commerce.productDescription(),
      active: faker.datatype.boolean()
    });
  }
router.get("/", (req, res) => {
  res.json(categories);
});

router.get('/filter', (req, res) => {
  res.send('Soy una ruta de filtro')
});

router.get("/:id", (req, res) =>{
  const { id } = req.params;
  const category = categories.find(cat => cat.Id === parseInt(id));
  res.json(category);
});

module.exports = router;
