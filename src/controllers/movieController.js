import Movie from '../models/Movie.js'

export const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find().populate('directorId', 'name nationality')
    res.json(movies)
  } catch (err) {
    next(err)
  }
}

export const getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('directorId', 'name nationality')
    if (!movie) {
      const error = new Error('Movie not found')
      error.status = 404
      throw error
    }
    res.json(movie)
  } catch (err) {
    next(err)
  }
}

export const createMovie = async (req, res, next) => {
  try {
    const { title, genre, releaseYear } = req.body
    if (!title || !genre || !releaseYear) {
      const error = new Error('Missing required fields')
      error.status = 400
      throw error
    }
    const movie = new Movie(req.body)
    await movie.save()
    res.status(201).json(movie)
  } catch (err) {
    next(err)
  }
}

export const updateMovie = async (req, res, next) => {
  try {
    const { title, genre, releaseYear } = req.body
    if (!title || !genre || !releaseYear) {
      const error = new Error('Missing required fields')
      error.status = 400
      throw error
    }
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!movie) {
      const error = new Error('Movie not found')
      error.status = 404
      throw error
    }
    res.json(movie)
  } catch (err) {
    next(err)
  }
}

export const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id)
    if (!movie) {
      const error = new Error('Movie not found')
      error.status = 404
      throw error
    }
    res.json({ message: 'Movie deleted' })
  } catch (err) {
    next(err)
  }
}
