const express = require('express')
const router = express.Router()

class GameRouter {
  //router routes to correspongin controller therefore we take this argument 
  constructor(controller){
    this.controller = controller
  }
  router(){
    router.get('/', this.controller.game)
    router.get('/boardItems', this.controller.boardItems)
    router.post('/postGameData', this.controller.postGameData)
    return router
  }
}
module.exports  = GameRouter