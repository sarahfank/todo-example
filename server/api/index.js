import express from 'express'
import useMiddleware from './middleware/user-middleware'
import todoList from './todo-list'

const router = express.Router()

router.use(useMiddleware)
router.use(todoList)

export default router
