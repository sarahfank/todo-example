import uuid from 'uuid'
import listTestData from '../_config/test/test-data/list-test-data'
import itemTestData from '../_config/test/test-data/item-test-data'
import toDoListFacade from './todo-list'
import toDoListRepository from '../repository/todo-list'

context('to do list business logic', () => {
  describe('when validating an item name length', () => {
    it('should return true for item names over 2 characters', () => {
      const itemName = 'Go to the store'

      expect(toDoListFacade.isItemNameValid(itemName)).to.be.true
    })
    it('should return false for items under 3 characters', () => {
      const itemName = 'Np'

      expect(toDoListFacade.isItemNameValid(itemName)).to.be.false
    })
  })

  let userId

  beforeEach(() => {
    userId = uuid.v4()
  })

  describe('#getList', () => {
    context('when getting a users default list', () => {
      let actual, toDoList

      beforeEach(() => {
        toDoList = listTestData.build()

        td.replace(toDoListRepository, 'getList')
        td.when(
          toDoListRepository.getList(
            td.matchers.anything(),
            td.matchers.anything()
          )
        ).thenResolve(toDoList)

        return toDoListFacade.getList(userId).then(l => (actual = l))
      })

      it('should call the to do list repository', () => {
        td.verify(toDoListRepository.getList(userId, undefined))
      })

      it('should return the list', () => {
        expect(actual).to.eql(toDoList)
      })
    })

    context('when getting a users list by id', () => {
      let actual, toDoList

      beforeEach(() => {
        toDoList = listTestData.build()

        td.replace(toDoListRepository, 'getList')
        td.when(
          toDoListRepository.getList(
            td.matchers.anything(),
            td.matchers.anything()
          )
        ).thenResolve(toDoList)

        return toDoListFacade
          .getList(userId, toDoList._id)
          .then(l => (actual = l))
      })

      it('should call the to do list repository with the id', () => {
        td.verify(toDoListRepository.getList(userId, toDoList._id))
      })

      it('should return the list', () => {
        expect(actual).to.eql(toDoList)
      })
    })

    context('when getting a users list by id', () => {
      let actual, toDoList

      beforeEach(() => {
        toDoList = listTestData.build()

        td.replace(toDoListRepository, 'getList')
        td.when(
          toDoListRepository.getList(
            td.matchers.anything(),
            td.matchers.anything()
          )
        ).thenResolve(toDoList)

        return toDoListFacade
          .getList(userId, toDoList._id)
          .then(l => (actual = l))
      })

      it('should call the to do list repository', () => {
        td.verify(toDoListRepository.getList(userId, toDoList._id))
      })

      it('should return the list', () => {
        expect(actual).to.eql(toDoList)
      })
    })
  })

  describe('#getListsForUser', () => {
    let actual
    const expected = {
      userId,
      lists: [
        { _id: uuid.v4(), name: 'List 1' },
        { _id: uuid.v4(), name: 'List 2' }
      ]
    }

    beforeEach(() => {
      td.replace(toDoListRepository, 'getListsForUser')
      td.when(
        toDoListRepository.getListsForUser(td.matchers.anything())
      ).thenResolve(expected)

      return toDoListFacade.getListsForUser(userId).then(l => (actual = l))
    })

    it('should gets the users lists from the repository', () => {
      td.verify(toDoListRepository.getListsForUser(userId))
    })

    it('should return the lists from the repository', () => {
      expect(actual).to.eql(expected)
    })
  })

  describe('#getListsForUser', () => {
    let actual
    const expected = {
      userId,
      lists: [
        listTestData.buildEmpty(uuid.v4(), 'List 1'),
        listTestData.buildEmpty(uuid.v4(), 'List 2')
      ]
    }

    beforeEach(() => {
      td.replace(toDoListRepository, 'getListsForUser')
      td.when(
        toDoListRepository.getListsForUser(td.matchers.anything())
      ).thenResolve(expected)

      return toDoListFacade.getListsForUser(userId).then(l => (actual = l))
    })

    it('should gets the users lists from the repository', () => {
      td.verify(toDoListRepository.getListsForUser(userId))
    })

    it('should return the lists from the repository', () => {
      expect(actual).to.eql(expected)
    })
  })

  describe('#createList', () => {
    context('when creating a list without a name', () => {
      let actual, toDoList

      beforeEach(() => {
        toDoList = listTestData.buildEmpty()

        td.replace(toDoListRepository, 'createEmptyList')
        td.when(
          toDoListRepository.createEmptyList(
            td.matchers.anything(),
            td.matchers.anything()
          )
        ).thenResolve(toDoList)

        return toDoListFacade.createList(userId).then(l => (actual = l))
      })

      it('should call the repository with the userId and a default name', () => {
        td.verify(toDoListRepository.createEmptyList(userId, 'Default'))
      })

      it('should return the list', () => {
        expect(actual).to.eql(toDoList)
      })
    })

    context('when creating a list with a name', () => {
      let actual, toDoList
      const listName = 'This is a to do list'

      beforeEach(() => {
        toDoList = listTestData.buildEmpty()

        td.replace(toDoListRepository, 'createEmptyList')
        td.when(
          toDoListRepository.createEmptyList(
            td.matchers.anything(),
            td.matchers.anything()
          )
        ).thenResolve(toDoList)

        return toDoListFacade
          .createList(userId, listName)
          .then(l => (actual = l))
      })

      it('should call the repository with the userId and list name', () => {
        td.verify(toDoListRepository.createEmptyList(userId, listName))
      })

      it('should return the list', () => {
        expect(actual).to.eql(toDoList)
      })
    })
  })

  describe('#checkItem', () => {
    let actual, toDoItem
    const itemId = uuid.v4()
    const completedAt = new Date().toLocaleString()

    beforeEach(() => {
      toDoItem = itemTestData.build()

      td.replace(toDoListRepository, 'checkItem')
      td.when(
        toDoListRepository.checkItem(
          td.matchers.anything(),
          td.matchers.anything()
        )
      ).thenResolve(toDoItem)

      return toDoListFacade
        .checkItem(itemId, completedAt)
        .then(l => (actual = l))
    })

    it('should call the to do list repository', () => {
      td.verify(toDoListRepository.checkItem(itemId, completedAt))
    })

    it('should return the item from the repository', () => {
      expect(actual).to.eql(toDoItem)
    })
  })

  describe('#uncheckItem', () => {
    let actual, toDoItem
    const itemId = uuid.v4()

    beforeEach(() => {
      toDoItem = itemTestData.build()

      td.replace(toDoListRepository, 'uncheckItem')
      td.when(
        toDoListRepository.uncheckItem(td.matchers.anything())
      ).thenResolve(toDoItem)

      return toDoListFacade.uncheckItem(itemId).then(l => (actual = l))
    })

    it('should call the to do list repository', () => {
      td.verify(toDoListRepository.uncheckItem(itemId))
    })

    it('should return the item from the repository', () => {
      expect(actual).to.eql(toDoItem)
    })
  })

  describe('#addItem', () => {
    let actual, toDoList, listId
    const newItemName = 'New Test Item'

    beforeEach(() => {
      toDoList = listTestData.build()

      listId = toDoList._id
      const itemDetails = { listId, newItemName }

      td.replace(toDoListRepository, 'addItem')
      td.when(
        toDoListRepository.addItem(
          td.matchers.anything(),
          td.matchers.anything(),
          td.matchers.anything()
        )
      ).thenResolve(toDoList)

      return toDoListFacade.addItem(userId, itemDetails).then(l => (actual = l))
    })

    it('should call the to do list repository', () => {
      td.verify(toDoListRepository.addItem(userId, listId, newItemName))
    })

    it('should return the item from the repository', () => {
      expect(actual).to.eql(toDoList)
    })
  })

  describe('#removeItem', () => {
    let actual, toDoList, listId, itemId

    beforeEach(() => {
      toDoList = listTestData.build()

      listId = toDoList._id
      itemId = toDoList.items[0]._id

      td.replace(toDoListRepository, 'removeItem')
      td.when(
        toDoListRepository.removeItem(
          td.matchers.anything(),
          td.matchers.anything(),
          td.matchers.anything()
        )
      ).thenResolve(toDoList)

      return toDoListFacade
        .removeItem(userId, listId, itemId)
        .then(l => (actual = l))
    })

    it('should call the to do list repository', () => {
      td.verify(toDoListRepository.removeItem(userId, listId, itemId))
    })

    it('should return the item from the repository', () => {
      expect(actual).to.eql(toDoList)
    })
  })

  describe('#deleteList', () => {
    let listId

    beforeEach(() => {
      listId = uuid.v4()

      td.replace(toDoListRepository, 'deleteList')
      td.when(
        toDoListRepository.deleteList(
          td.matchers.anything(),
          td.matchers.anything()
        )
      ).thenResolve()

      return toDoListFacade.deleteList(userId, listId)
    })

    it('should call the to do list repository', () => {
      td.verify(toDoListRepository.deleteList(userId, listId))
    })
  })
})
