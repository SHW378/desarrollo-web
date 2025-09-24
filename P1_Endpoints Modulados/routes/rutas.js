const productsRouter = require('./productsRouter')
const UserRouter = require('./UsersRouter')
const Categories = require('./CategoriesRouter')
const Brands = require('./BrandsRouter')

function routerApi(app) {
  app.use('/products', productsRouter);
  app.use('/users', UserRouter);
  app.use('/categories', Categories);
  app.use('/brands', Brands);
  app.use('/movies', require('./moviesRouter'));
}

module.exports = routerApi;
