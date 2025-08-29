const productsRouter = require('./productsRouter')

function routerApi(app) {
  app.use('/products', productsRouter);
}

module.exports = routerApi;

const UserRouter = require('./UsersRouter')

function routerApi(app) {
  app.use('/users', UserRouter);
}
module.exports = routerApi;
