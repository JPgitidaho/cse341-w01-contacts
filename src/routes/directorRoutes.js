import express from 'express'
import {
  getDirectors,
  getDirectorById,
  createDirector,
  updateDirector,
  deleteDirector
} from '../controllers/directorController.js'
import requireAuth from '../middlewares/requireAuth.js'

const router = express.Router()

router.get('/', getDirectors)
router.get('/:id', getDirectorById)
router.post('/', requireAuth, createDirector)
router.put('/:id', requireAuth, updateDirector)
router.delete('/:id', requireAuth, deleteDirector)

export default router
