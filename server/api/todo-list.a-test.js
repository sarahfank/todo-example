import uuid from 'uuid'
import supertest from 'supertest'
import app from '../start-server'

describe('/api', () => {
  let userId, request
  before(() => {
    userId = uuid.v4()
    request = supertest.agent(app)
    return request.post('/api/auth').send({ userId })
  })

  describe('/list', () => {
    context('When the user does NOT have a list', () => {
      it('should return a null list', () => {
        return request.get('/api/list').then(res => {
          expect(res.body).to.be.null
        })
      })
    })
  })

  context('When creating a list', () => {
    let listId, createdList

    beforeEach(() => {
      return request.post('/api/createList').then(res => {
        createdList = res.body
        listId = createdList._id
      })
    })

    afterEach(() => {
      return request.delete(`/api/deleteList/${listId}`).expect(200)
    })

    // it('should create an empty list', () => {
    //   expect(createdList.userId).to.equal(userId)
    //   expect(createdList.items).to.be.empty
    //   expect(createdList.name).to.equal('Default')
    // })

    context('When adding items to the list', () => {
      let listWithItems
      const item1Name = 'Buy some food'
      const item2Name = 'Make dinner'

      beforeEach(() => {
        const item1 = { listId, newItemName: item1Name }
        const item2 = { listId, newItemName: item2Name }

        return request
          .post('/api/addItem')
          .send(item1)
          .then(() =>
            request
              .post('/api/addItem')
              .send(item2)
              .then(res => (listWithItems = res.body))
          )
      })

      it('should contain two items', () => {
        expect(listWithItems.items.length).to.equal(2)
      })

      it('should contain the first item', () => {
        expect(listWithItems.items[0].name).to.equal(item1Name)
      })

      it('should contain the second item', () => {
        expect(listWithItems.items[1].name).to.equal(item2Name)
      })

      context('When removing from a list', () => {
        let listAfterDeleting

        beforeEach(() => {
          return request
            .delete(`/api/removeItem/${listId}/${listWithItems.items[0]._id}`)
            .then(() => request.get('/api/list'))
            .then(res => (listAfterDeleting = res.body))
        })

        it('should still have the other item in the list', () => {
          expect(listAfterDeleting.items.length).to.equal(1)
          expect(listAfterDeleting.items[0].name).to.equal(item2Name)
        })
      })
    })
  })

  context('When creating two lists', () => {
    let list1, list2
    const list1Name = 'Work'
    const list2Name = 'Personal'

    beforeEach(() => {
      return request
        .post('/api/createList')
        .send({ name: list1Name })
        .then(res => (list1 = res.body))
        .then(() => request.post('/api/createList').send({ name: list2Name }))
        .then(res => (list2 = res.body))
    })

    afterEach(() => {
      return request
        .delete(`/api/deleteList/${list1._id}`)
        .expect(200)
        .then(() => request.delete(`/api/deleteList/${list2._id}`).expect(200))
    })

    it('should create the first list', () => {
      expect(list1.name).to.equal(list1Name)
    })

    it('should create the second list', () => {
      expect(list2.name).to.equal(list2Name)
    })

    context('When adding items to both lists', () => {
      let workListWithItems, personalListWithItems
      const workItem1 = 'Go to meeting'
      const workItem2 = 'Go to another meeting'
      const personalItem1 = 'Have fun'

      beforeEach(() => {
        return request
          .post('/api/addItem')
          .send({ listId: list1._id, newItemName: workItem1 })
          .then(() =>
            request
              .post('/api/addItem')
              .send({ listId: list1._id, newItemName: workItem2 })
          )
          .then(() =>
            request
              .post('/api/addItem')
              .send({ listId: list2._id, newItemName: personalItem1 })
          )
          .then(() =>
            request
              .get(`/api/list/${list1._id}`)
              .then(res => (workListWithItems = res.body))
          )
          .then(() =>
            request
              .get(`/api/list/${list2._id}`)
              .then(res => (personalListWithItems = res.body))
          )
      })

      it('should save the work items', () => {
        expect(workListWithItems.items[0].name).to.equal(workItem1)
        expect(workListWithItems.items[1].name).to.equal(workItem2)
      })

      it('should save the personal items', () => {
        expect(personalListWithItems.items[0].name).to.equal(personalItem1)
      })
    })

    context('When getting the users lists', () => {
      let userLists

      beforeEach(() => {
        return request
          .get('/api/lists')
          .expect(200)
          .then(res => (userLists = res.body))
      })

      // it('should return the lists for the user', () => {
      //   expect(userLists.userId).to.eql(userId)
      // })

      it('should include two lists', () => {
        expect(userLists.lists.length).to.equal(2)
      })

      it('should include the first list', () => {
        expect(userLists.lists[0]._id).to.eql(list1._id)
        expect(userLists.lists[0].name).to.eql(list1Name)
      })

      it('should include the second list', () => {
        expect(userLists.lists[1]._id).to.eql(list2._id)
        expect(userLists.lists[1].name).to.eql(list2Name)
      })
    })
  })
})
