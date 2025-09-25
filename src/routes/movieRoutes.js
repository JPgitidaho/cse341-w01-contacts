import express from 'express'
import {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} from '../controllers/movieController.js'
import requireAuth from '../middlewares/requireAuth.js'

const router = express.Router()

router.get('/', getMovies)
router.get('/:id', getMovieById)
router.post('/', requireAuth, createMovie)
router.put('/:id', requireAuth, updateMovie)
router.delete('/:id', requireAuth, deleteMovie)

export default router
