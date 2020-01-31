import uuid from 'uuid'
import itemData from './item-test-data'

export default {
  build(id) {
    id = id || uuid.v4()

    const userId = uuid.v4()
    const name = 'Test list ' + id
    const items = [itemData.build(id)]
    return {
      _id: uuid.v4(),
      userId,
      name,
      items
    }
  },

  buildEmpty(id, listName) {
    id = id || uuid.v4()

    const userId = uuid.v4()
    const name = listName || 'Test list ' + id

    return {
      _id: uuid.v4(),
      userId,
      name,
      items: []
    }
  }
}
