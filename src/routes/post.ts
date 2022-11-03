import { Router } from 'express'
import { create, deletePost, index, update } from '../controllers/postController'
import validate from '../validations/base-validation'
import { validatePost } from '../validations/create-validation'

const router = Router()
router.get('/', index)
router.post('/', validate(validatePost), create)
router.put('/:id', validate(validatePost), update)
router.delete('/:id', deletePost)

export default router