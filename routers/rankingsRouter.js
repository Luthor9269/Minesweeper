const express = require('express')
const router = express.Router()

class RankingsRouter {
  //router routes to correspongin controller therefore we take this argument 
  constructor(controller){
    this.controller = controller
  }
  router(){
    router.get('/', this.controller.rankings)
    return router
  }
}
module.exports  = RankingsRouter