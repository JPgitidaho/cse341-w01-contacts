import Movie from '../models/Movie.js';

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
};

export const createMovie = async (req, res) => {
  try {
    const { title, genre, releaseYear } = req.body;
    if (!title || !genre || !releaseYear) return res.status(400).json({ error: 'Missing required fields' });
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const { title, genre, releaseYear } = req.body;
    if (!title || !genre || !releaseYear) return res.status(400).json({ error: 'Missing required fields' });
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json({ message: 'Movie deleted' });
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
};
