const faker = require('faker');
const express = require('express');
const { id_ID } = require('faker/lib/locales');
const router = express.Router();

const brands = [];
 for (let index = 0; index < 10; index++) {
    brands.push({
      id: faker.datatype.uuid(),
      brandName: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      active: faker.datatype.boolean()
    });
  }

router.get("/", (req, res) => {
  res.json(brands);
});

router.get('/filter', (req, res) => {
  res.send('Soy una ruta de filtro')
})

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const brand = brands.find(b => b.id === id);
  res.json(brand);
});

router.post('/', (req, res) => {
  const {brandName, description, active} = req.body;
  const newBrand = {
    id: brands.length +1,
    brandName,
    description,
    active
  }
  brands.push(newBrand);
  res.status(201).json({
    message: 'created',
    data: newBrand
  })
})

router.patch('/:id', (req, res) => {
  const {id} = req.params;
  const {brandName, description, active} = req.body;
  const brand = brands.find(b => b.id === parseInt(id));
  if (brand) {
     if (brandName) brand.brandName = brandName;
      if (description) brand.description = description;
        if (active) brand.active = active;
    res.json({
      message: 'Updated',
      data: brand
    })
  } else {
    res.status(404).json({message: 'Brand not found'})
  }
})

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  const brandIndex = brands.findIndex(m => m.id ==id);
  if(brandIndex !== -1) {
    brands.splice(brandIndex, 1);
    res.json({
      message: 'Deleted',
      id
    })
  } else{
    res.status(404).json({message: 'Brand not found'})
  }
})
module.exports = router;
