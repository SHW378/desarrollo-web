const express = require('express');

const productsRouter = require('./productsRouter');
const userRouter = require('./UsersRouter');
const categoriesRouter = require('./CategoriesRouter');
const brandsRouter = require('./BrandsRouter');

function routerApi(app) {


  const router = express.Router();
<<<<<<< HEAD
  // Prefijo para todas las rutas
  app.use('/', router);
  // Asigna las rutas
  router.use('/products', productsRouter);
  router.use('/users', userRouter);
  router.use('/categories', categoriesRouter);
  router.use('/brands', brandsRouter);
=======
  //Instancias de los servicios (sin dependencias primero)
  const usersService = new UsersService();
  const categoriesService = new CategoriesService();
  const brandsService = new BrandsService();
  //Se crea el servicio de productos con las dependencias
  const productsService = new ProductsService(brandsService, categoriesService);
  //Instancia de los routers
  router.use('/products', productsRouter(productsService));
  router.use('/users', userRouter(usersService));
  router.use('/categories', categoriesRouter(categoriesService, productsService));
  router.use('/brands', brandsRouter(brandsService, productsService));

      app.use('/', router);

>>>>>>> 47b4dc4 ( Debugueo ip de swagger e index y agrego funcion en rutas)
}

module.exports = routerApi;
