import express from 'express'
import toDoListFacade from '../business-logic/todo-list.js'
import { configOptions } from '../_config/config'

const env = (process.env.NODE_ENV = process.env.NODE_ENV || 'development')
const config = configOptions[env]

const router = express.Router()

router.post('/auth', (req, res) => {
  res.cookie(config.userCookieName, req.body.userId, {
    maxAge: 900000,
    httpOnly: true
  })
  res.send()
})

router.get('/list', (req, res) => {
  return toDoListFacade.getList(req.userId).then(vm => res.json(vm))
})

router.get('/list/:listId', (req, res) => {
  return toDoListFacade
    .getList(req.userId, req.params.listId)
    .then(vm => res.json(vm))
})

router.get('/lists', (req, res) => {
  return toDoListFacade.getListsForUser(req.userId).then(vm => res.json(vm))
})

router.post('/createList', (req, res) => {
  return toDoListFacade
    .createList(req.userId, req.body.name)
    .then(vm => res.json(vm))
})

router.post('/addItem', (req, res) => {
  return toDoListFacade.addItem(req.userId, req.body).then(vm => res.json(vm))
})

router.delete('/removeItem/:listId/:itemId', (req, res) => {
  return toDoListFacade
    .removeItem(req.userId, req.params.listId, req.params.itemId)
    .then(res.status(200).end())
})

router.put('/checkItem', (req, res) => {
  const itemId = req.body.itemId
  const completedAt = req.body.completedAt
  return toDoListFacade.checkItem(itemId, completedAt).then(vm => res.json(vm))
})

router.put('/uncheckItem', (req, res) => {
  const itemId = req.body.itemId
  return toDoListFacade.uncheckItem(itemId).then(() => res.status(200).end())
})

router.delete('/deleteList/:listId', (req, res) => {
  return toDoListFacade
    .deleteList(req.userId, req.params.listId)
    .then(() => res.status(200).end())
})

export default router
