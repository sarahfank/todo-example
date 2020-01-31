import uuid from 'uuid'

export default {
  build(id) {
    id = id || uuid.v4()
    return {
      _id: id,
      name: 'A to do test item ' + id,
      complete: false,
      completedAt: new Date().toLocaleString()
    }
  }
}