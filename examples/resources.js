const stringify = require('stringify-object')
const chalk = require('chalk')

const { createRest, flattenRoutes, printRoutes } = require('../dist')

const ObjectController = {
  index() {},
  create() {},
  read() {},
  update() {},
  destroy() {},

  beforeEach() {},
  afterEach() {},
}

const routes = createRest(r => {
  r.resources('demo', ObjectController)
})

printRoutes(routes, true)
