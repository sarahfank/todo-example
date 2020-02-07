import express from 'express'
import dotenv from 'dotenv'
import todoListLogic from '../business-logic/todo-list.js'
import { configOptions } from '../_config/config'

dotenv.config()
const env = process.env.NODE_ENV || 'development'
const config = configOptions[env]

const router = express.Router()

router.post('/addItem', (req, res) => {
  return todoListLogic.addItem(req.userId, req.body).then(vm => res.json(vm))
})

router.post('/auth', (req, res) => {
  res.cookie(config.userCookieName, req.body.userId, {
    maxAge: 900000,
    httpOnly: true
  })
  res.send()
})

router.get('/list', (req, res) => {
  return todoListLogic.getList(req.userId).then(vm => res.json(vm))
})

router.get('/list/:listId', (req, res) => {
  return todoListLogic
    .getList(req.userId, req.params.listId)
    .then(vm => res.json(vm))
})

router.get('/lists', (req, res) => {
  return todoListLogic.getListsForUser(req.userId).then(vm => res.json(vm))
})

router.post('/createList', (req, res) => {
  return todoListLogic
    .createList(req.userId, req.body.name)
    .then(vm => res.json(vm))
})

router.delete('/removeItem/:listId/:itemId', (req, res) => {
  return todoListLogic
    .removeItem(req.userId, req.params.listId, req.params.itemId)
    .then(res.status(200).end())
})

router.put('/checkItem', (req, res) => {
  const itemId = req.body.itemId
  const completedAt = req.body.completedAt
  return todoListLogic.checkItem(itemId, completedAt).then(vm => res.json(vm))
})

router.put('/uncheckItem', (req, res) => {
  const itemId = req.body.itemId
  return todoListLogic.uncheckItem(itemId).then(() => res.status(200).end())
})

router.delete('/deleteList/:listId', (req, res) => {
  return todoListLogic
    .deleteList(req.userId, req.params.listId)
    .then(() => res.status(200).end())
})

export default router
