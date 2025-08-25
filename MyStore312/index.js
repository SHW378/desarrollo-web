const express = require('express');
const app = express();
const port = 3000;
const faker = require('faker');

//Middleware to parse JSON bodies
app.get("/", (req, res) => {
  res.send("Hola mi server en express")
})

app.get("/nuevaruta", (req, res) => {
  res.send("Hola soy una nueva ruta")
})

app.get("/products", (req, res) => {
const products = [];
const {size} = req.query
const limit = size || 10;
for(let index = 0; index < limit; index++){
  products.push ({
    name: faker.commerce.productName(),
    price: parseInt(faker.commerce.price(), 10),
    image: faker.image.imageUrl()
  });
}
  res.json(products);
});



app.listen(port, () => {
  console.log("Mi port is working on: " + port)
  console.log("http://localhost:" + port)
})

app.get('/products/filter', (req, res) => {
  res.send('Soy una ruta de filtro')
})

app.get("/products/:id", (req, res) =>{
  const { id } = req.params; // Extraemos el parametro id de los parametros ruta
  res.json({
    id: parseInt(id), // Devolvemos el id recibido
    name: 'Coca-Cola',
    price: 50
  });
});


app.get('/category/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  });
});

app.get('/users', (req, res) => {
  const { username, lastname } = req.query;
  if (username && lastname ) {
    res.json({
      username,
      lastname
    });
  } else {
    res.send("No hay parametros Query");
  }
});
/*
GET = Obtiene datos
POST = Crea datos
DELETE = Elimina datos
PUT = Actualiza datos (completo)
PATCH = Actualiza datos (parcial)

api.example.com/tasks/{id}/
api.example.com/people/{id}/
api.example.com/users/{id}/tasks/
*/
