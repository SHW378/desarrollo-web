const express = require('express');

const router = express.Router();

let movies = [
  { id: 1, title: 'Como entrenar a tu Dragon', year: 2010, Category: 'Animada' },
  { id: 2, title: 'Una pelicula de nuevos', year: 2000, Category: 'Animada' },
  { id: 3, title: 'Interestellar', year: 2014, Category: 'Scr-Fi' },
  { id: 4, title: 'Lalaland', year: 2010, Category: 'Musical' },
  { id: 5, title: 'Cuestion de tiempo', year: 2014, Category: 'Romance' },
  { id: 6, title: 'GoodFella', year: 1996, Category: 'Suspenso' },
  { id: 7, title: 'Mision Rescate', year: 2015, Category: 'Sci-Fi' },
  { id: 8, title: 'Clouds', year: 2018, Category: 'Live Action' },
  { id: 9, title: 'Batman Return', year: 2010, Category: 'Action' },
  { id: 10, title: 'Me Before you', year: 2015, Category: 'Romance' },
  { id: 11, title: 'Perdida', year: 2012, Category: 'Drama' },
  { id: 12, title: '¿Y donde estan las rubias', year: 2004, Category: 'Comedia' },
]

//Obtener todas las peliculas
router.get('/', (req, res) => {
  res.json(movies);
})

//
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const movie = movie.find(m => m.id === id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: 'Movie not found' })
  }

})
router.post('/', (req, res) => {
  const { tittle, year, category } = req.body;
  const newMovie = {
    id: movies.length + 1,
    title,
    year,
    category
  }
  movies.push(newMovie);
  res.status(201).json({
    message: 'created',
    data: newMovie
  });
})


router.patch("/:id", (req, res) => {
  const {id} = req.params;
  const {title, year, category} = req.body;
  const movie = movies.find(m => m.id == id);
  if(movie){
    if(title) movie.title = title;
     if(year) movie.year = year;
      if(category) movie.category = category;
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
  const movieIndex = movies.findIndex(m => m.id == id);
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
