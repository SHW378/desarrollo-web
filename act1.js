const express = require('express');
const app = express();

//Ruta basica
app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

//Middleware para manejar errores 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Hubo un error en el servidor');
});

//Iniciar servidor en el puerto 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});