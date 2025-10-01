const faker = require('faker');
const express = require('express');
const router = express.Router();

const users = [];
  for (let index = 0; index < 10; index++) {
    users.push({
      id: index + 1,
      Name: faker.name.findName(),
      username: faker.name.findName(),
      password: faker.internet.password(),
    });
  }

router.get('/', (req, res) => {
  res.json(users);
});

router.get('/filter', (req, res) => {
  res.send('Soy una ruta de filtro')
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const movie = movies.find(m => m.id === parseInt(id));
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
});

router.post('/', (req, res) => {
  const { Name, username, password } = req.body;
  const newUser = {
    id: users.length + 1,
    Name,
    username,
    password
  };
  users.push(newUser);
  res.status(201).json({
    message: 'created',
    data: newUser
  });
});

router.patch("/:id", (req, res) => {
  const {id} = req.params;
  const {title, year, Category} = req.body;
  const movie = movies.find(m => m.id === parseInt(id));
  if(movie){
    if(title) movie.title = title;
    if(year) movie.year = year;
    if(Category) movie.Category = Category;
    res.json({
      message: 'Updated',
      data: movie
    });
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
});

router.delete("/:id", (req, res) =>{
  const {id} = req.params;
  const movieIndex = movies.findIndex(m => m.id === parseInt(id));
  if(movieIndex !== -1){
    movies.splice(movieIndex, 1);
    res.json({
      message: 'Deleted',
      id
    });
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
});
module.exports = router;
