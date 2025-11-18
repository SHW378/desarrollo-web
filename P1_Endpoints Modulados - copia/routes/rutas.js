const express = require('express');

const productsRouter = require('./productsRouter');
const userRouter = require('./UsersRouter');
const categoriesRouter = require('./CategoriesRouter');
const brandsRouter = require('./BrandsRouter');

function routerApi(app) {
  const router = express.Router();
  // Prefijo para todas las rutas
  app.use('/', router);

  // Asigna las rutas
  router.use('/products', productsRouter);
  router.use('/users', userRouter);
  router.use('/categories', categoriesRouter);
  router.use('/brands', brandsRouter);
}

module.exports = routerApi;
