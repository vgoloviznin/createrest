const stringify = require('stringify-object')
const chalk = require('chalk')

const { createRest, flattenRoutes, printRoutes } = require('../dist')

const ObjectController = {
  index() {},
  create() {},
  read() {},
  update() {},
  patch() {},
  destroy() {},

  beforeEach() {},
  afterEach() {},
}

const AuthController = {}

const rou_tes = createRest(r => {
  r.resources('demo', ObjectController)
})

printRoutes(routes, true)


const routes = createRest(r => {
  r.before(filterUnsafe)
  r.before(redirectByToken)

  r.scope('auth', r => {
    r.before(AuthController.redirectAuthenticated)

    r.get(AuthController.getSession)
    r.post(AuthController.createSession)
    r.delete(AuthController.resetSession)

    r.scope('recovery', r => {
      r.before(AuthController.clearSessionCache)
      r.post(AuthController.startPasswordRecovery)
      r.post('send-email', AuthController.sendRecoveryEmail)
      r.post('change-password', AuthController.changePasswordAfterRecovery)
    })

    r.delete('session', AuthController.checkSessions, AuthController.resetAllSessions)
  })

  r.resources('cards', CardsController, { noPatch: true }, r => {
    r.before(CoreController.checkActivated('cards'))
    r.get('trending', CardsController.getTrending)
    r.get('latest', CardsController.updateCache, CardsController.getLatest)

    r.get('featured', isAuthenticated, CardsController.getFeatured, Format.specify('cards-featured'))

    r.member(r => {
      r.get('rating', CardsController.getCardRating)
    })
  })
})


printRoutes(routes, true)
