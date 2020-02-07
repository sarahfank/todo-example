import axios from 'axios'
import dotenv from 'dotenv'
import userConfig, { configOptions } from './config'

dotenv.config()
const env = process.env.NODE_ENV || 'development'
const config = configOptions[env]
const apiUrl = config.apiUrl

function authenticateUser() {
  return axios
    .post(apiUrl + '/api/auth', {
      userId: userConfig.defaultUserId
    })
    .then(res => res.data)
}

function getList(listId) {
  let url = apiUrl + '/api/list'
  if (listId) url += `/${listId}`
  return axios.get(url).then(res => {
    if (!res.data) return createList()
    return res.data
  })
}

function getLists() {
  return axios.get(apiUrl + '/api/lists').then(res => {
    return res.data
  })
}

function createList(name) {
  return axios.post(apiUrl + '/api/createList', { name }).then(res => {
    return axios.get(apiUrl + '/api/list').then(res => res.data)
  })
}

function addItem(listId, newItemName) {
  const data = { listId, newItemName }
  return axios.post(apiUrl + '/api/addItem', data).then(res => res.data)
}

function removeItem(listId, itemId) {
  return axios.deleteapiUrl + `/api/removeItem/${listId}/${itemId}`
}

function checkItem(itemId, completedAt) {
  const data = { itemId, completedAt }
  return axios.put(apiUrl + '/api/checkItem', data)
}

function uncheckItem(itemId) {
  return axios.put(apiUrl + '/api/uncheckItem', { itemId })
}

export default {
  authenticateUser,
  getList,
  createList,
  getLists,
  checkItem,
  uncheckItem,
  addItem,
  removeItem
}
