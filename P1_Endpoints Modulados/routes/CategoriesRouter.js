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

router.post('/', (req, res) =>{
  const {categoryName, description, active} = req.body;
  const newCategory = {
    id: categories.length +1,
    categoryName,
    description,
    active
  }
  categories.push(newCategory);
  res.status(201).json({
    message: 'created',
    data: newCategory
  })
})

router.patch('/:id', (req, res) => {
  const  {id} = req.params;
  const {categoryName, description, active} = req.body;
  const category = categories.find(cat => cat.id == id);
  if(category) {
    if (tittle) category.categoryName = categoryName;
    if(description) category.description = description;
    if(active) category.active = active;
    res.json({
      message: 'Updated',
      data: category
    })
  } else {
    res.status(404).json({ message: 'Category not found'})
  }
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  const categoryIndex = categories.findIndex(cat => cat.id == id);
  if (categoryIndex !== -1){
    categories.splice(categoryIndex, 1);
    res.json({
      message: 'Deleted',
      id
    })
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
})
module.exports = router;
