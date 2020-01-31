import toDoListRepository from '../repository/todo-list'

const todoListLogic = {
  isItemNameValid(itemName) {
    const minLength = 3

    return itemName.length >= minLength
  },
  addItem(userId, addItemDetails) {
    const itemName = addItemDetails.newItemName
    if (this.isItemNameValid(itemName)) {
      return toDoListRepository.addItem(
        userId,
        addItemDetails.listId,
        addItemDetails.newItemName
      )
    } else {
      throw 'Break everything because the name is too long!!'
    }
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

  removeItem(userId, listId, itemId) {
    return toDoListRepository.removeItem(userId, listId, itemId)
  },

  deleteList(userId, listId) {
    return toDoListRepository.deleteList(userId, listId)
  }
}

export default todoListLogic
