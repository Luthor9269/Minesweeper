const BaseController = require('./baseController')
const bcrypt = require('bcrypt')
const db = require('../models')

class RankingsController extends BaseController{
  constructor(model){
    super(model)
  }
  async rankings(req,res){
    //get rankings data from DB
  const rankingsData = await db.rankings.findAll({
    order:[["gameTime", "ASC"]],
  })
    //use ejs to showcase the ranks data here
    const data = []
    rankingsData.forEach((entry)=>{
      const individualEntry = entry.dataValues
      data.push(individualEntry)
    })
    console.log(data)
    res.render('./rankings', {data})
  }
}

module.exports = RankingsController