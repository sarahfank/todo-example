'use strict'

const toDoListRepository = require('../repository/todo-list')

module.exports = {
  isItemNameValid(itemName) {
    const minLength = 3

    return itemName.length >= minLength
  },
  getList(userId, listId) {
    return toDoListRepository.getList(userId, listId)
  },

  getListsForUser(userId) {
    return toDoListRepository.getListsForUser(userId)
  },

  createList(userId, listName = 'Default') {
    return toDoListRepository.createEmptyList(userId, listName)
  },

  checkItem(itemId, completedAt) {
    return toDoListRepository.checkItem(itemId, completedAt)
  },

  uncheckItem(itemId) {
    return toDoListRepository.uncheckItem(itemId)
  },

  addItem(userId, addItemDetails) {
    return toDoListRepository.addItem(
      userId,
      addItemDetails.listId,
      addItemDetails.newItemName
    )
  },

  removeItem(userId, listId, itemId) {
    return toDoListRepository.removeItem(userId, listId, itemId)
  },

  deleteList(userId, listId) {
    return toDoListRepository.deleteList(userId, listId)
  }
}
