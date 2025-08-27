const express = require('express');
const app = express();
const port = 3000;
const faker = require('faker');
const routerApi = require('./routes/rutas')

//Middleware to parse JSON bodies
app.get("/", (req, res) => {
  res.send("Hola mi server en express")
})

app.get("/nuevaruta", (req, res) => {
  res.send("Hola soy una nueva ruta")
})

app.listen(port, () => {
  console.log("Mi port is working on: " + port)
  console.log("http://localhost:" + port)
})


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


app.get('/category/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  });
});

routerApi(app);
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
