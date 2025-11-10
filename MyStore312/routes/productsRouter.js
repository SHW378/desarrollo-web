const faker = require('faker');
const express = require('express');
const productsService = require('../services/productsService');
const router = express.Router();
const Services = new productsService();

router.get("/", async(req, res) => {
  const products = await Services.getAll();
  res.json({products})
});

router.get('/filter', (req, res) => {
  res.send('Soy una ruta de filtro')
})

router.get("/:id", async (req, res, next) =>{
  try {
  const { id } = req.params;// Extraemos el parametro id
  const product = await  Services.getById(id);
  res.json({product});
  } catch (error) {
    next(error); //si ocurre un error, pasa al middleware
  }
});

router.post("/", async (req, res) => {
  const body = req.body;
  const newProduct = await Services.create(body);
  res.status(201).json(
    newProduct
  );
});

router.patch('/:id', async(req, res) => {
  const {id} = req.params;
  const body = req.body;
  const product = await Services.update(id, body);
  res.json({
    product
  });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const respuesta = await Services.delete(id);
  res.json({respuesta});
})

module.exports = router;

/* ejemplo de middleware
function (req,res, next) {
  if(something){
    res.send('stop!')
  }else {
    next();
  }
}
*/
