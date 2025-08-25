const express = require('express');
const app = express();
const port = 3000;

//Middleware to parse JSON bodies
app.get("/", (req, res) => {
  res.send("Hola mi server en express")
})

app.get("/nuevaruta", (req, res) => {
  res.send("Hola soy una nueva ruta")
})

app.get("/products", (req, res) => {
  res.json([
    {
      name: 'Coca-Cola',
      price: 50
    },
    {
      name: 'pepsi',
      price: 48
    },
    {
      name: 'Doritos',
      price: 30
    }
  ]);
})

app.listen(port, () => {
  console.log("Mi port is working on: " + port)
  console.log("http://localhost:" + port)
})

app.get("/products/:id", (req, res) =>{
  const { id } = req.params; // Extraemos el parametro id de los parametros ruta
  res.json({
    id, // Devolvemos el id recibido
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
