const express = require('express')
const cookieParser = require('cookie-parser')


const db = require('./models/index.js')


//Import controllers
const PlayersController = require('./controllers/playersController.js')
const GameController = require('./controllers/gameController.js')
const RankingsController = require('./controllers/rankingsController.js')
//Import routers
const PlayersRouter = require('./routers/playersRouter.js')
const GameRouter = require('./routers/gameRouter.js')
const RankingsRouter = require('./routers/rankingsRouter.js')


//initialise controllers 
const playersController = new PlayersController(db.players)
const gameController = new GameController(db.games)
const rankingsController = new RankingsController(db.rankings)


//initialise routers
const playersRouter = new PlayersRouter(playersController).router()
const gameRouter = new GameRouter(gameController).router()
const rankingsRouter = new RankingsRouter(rankingsController).router()

const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(cookieParser())
app.use(express.json());

//middleware for user authentication if no cookies, redirect to login
app.use((req, res, next)=>{
  const login = req.cookies.login;
  if(req.path==='/players/login' || req.path==='/players/signUp'){
    console.log("Login middleware will stop running here");
    next()
  }else if(login === 'TRUE'){
  next();
  }
  else{
    console.log("theres no login cookie");
    res.render("./login");}
    return;
});

//to res to axios call
//only for sending data
app.get('/test', (req,res)=>{
  res.send({
    id:1,
    name: 'mayank',
    gameState: [{id:2},{id:3},{id:4}],
  })
})

app.use('/players', playersRouter)
app.use('/game', gameRouter)
app.use('/rankings', rankingsRouter)





app.listen(3005, ()=> console.log("Running in port 3005"))