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
      name: 'product1',
      price: 1000
    }
  ]);
})

app.listen(port, () => {
  console.log("Mi port is working on: " + port)
  console.log("http://localhost:" + port)
})
