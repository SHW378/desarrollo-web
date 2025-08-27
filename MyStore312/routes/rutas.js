const productsRouter = require('./productsRouter')

function routerApi(app) {
  app.views('/products', productsRouter);
}

module.exports = routerApi;
