const BaseController = require('./baseController')
const bcrypt = require('bcrypt')
const db = require('../models')


class PlayersController extends BaseController{
  constructor(model){
    super(model)
  }
  login(req,res){
    res.render('./login.ejs')
  }
  async loginD(req,res){
    console.log("running in loginD")
    //get the data from login
    const data = req.body
    const playerEmail = data.email
    const password = data.password
    //get data from db
    const dbData = await db.players.findOne({where: {email: playerEmail}})
    const dbPassword = dbData.password
    try{
      const correctPassword = await bcrypt.compare(password, dbPassword)
      if(correctPassword===true){
        console.log("password is correct")
        res.cookie('login', 'TRUE');
        res.cookie('playerId', dbData.id);
        console.log(dbData.id)
        res.redirect('/players')
      }else{
        console.log('Password is wrong')
        res.send("Wrong password")
      }
    }catch(err){
      console.log(err)
    }
  }
  signUp(req,res){
    res.render('./signUp.ejs')
  }
  async signUpData(req,res){
    try{
      console.log("running in the post route")
      const data = req.body
      const password = data.password
      console.log(data)
      //creating a random salt each time 
      const salt = await bcrypt.genSalt()
      //adding the salt to the password and creating a hash
      const hashedPassword = await bcrypt.hash(password, salt)
      console.log(password)
      console.log(salt)
      console.log(hashedPassword)
      //you can combine the two steps above by passsing in the default value of 10 from line 23 
      // const hashedPassword  = await bcrypt.hash(password, 10)
      //sending the sign up data to the Database
      const insertData = await db.players.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        country: data.country
      })
      console.log(insertData)
      res.redirect('/players/login')
    } catch(err){
      console.log("You got an error:", err)
      res.status(500).send(err)
    }
  }
  players(req,res){

    res.render('./mainPage.ejs')
    //the players info and their ranks 
  }
  logOut(req,res){
    res.clearCookie('login');
    res.clearCookie('playerId');
    res.redirect('/players/login')
  }
}

module.exports = PlayersController