const express = require('express');

const productsRouter = require('./productsRouter')
const userRouter = require('./UsersRouter')
const categoriesRouter = require('./CategoriesRouter')
const brandsRouter = require('./BrandsRouter')

const ProductsService = require('../services/productsService')
const UsersService = require('../services/usersServices')
const CategoriesService = require('../services/categoriesServices')
const BrandsService = require('../services/BrandsServices')

function routerApi(app) {
  const router = express.Router();
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
}

module.exports = routerApi;
