import { Router } from 'express';
import { getDirectors, getDirectorById, createDirector, updateDirector, deleteDirector } from '../controllers/directorController.js';

const router = Router();

router.get('/', getDirectors);
router.get('/:id', getDirectorById);
router.post('/', createDirector);
router.put('/:id', updateDirector);
router.delete('/:id', deleteDirector);

export default router;
