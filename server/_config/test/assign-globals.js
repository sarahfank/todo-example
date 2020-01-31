import chai from 'chai'
import td from 'testdouble'

td.config({ ignoreWarnings: true })

Object.assign(global, {
  assert: chai.assert,
  expect: chai.expect,
  td
})
