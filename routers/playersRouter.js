// need express because it has the function of routers
const express = require('express')
const router = express.Router()

class PlayersRouter {
  //router routes to correspongin controller thereofre we take this argument 
  constructor(controller){
    this.controller = controller
  }
  router(){
    router.get('/', this.controller.players)
    router.get('/login', this.controller.login)
    router.post('/login', this.controller.loginD)
    router.get('/signUp', this.controller.signUp)
    router.post('/signUp', this.controller.signUpData)
    router.get('/logOut', this.controller.logOut)
    return router
  }
}
module.exports  = PlayersRouter