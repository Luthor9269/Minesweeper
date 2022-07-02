const db = require("../models");
const BaseController = require("./baseController");

//Global variables for the methods to use
let currentGameId;
//game functions 
const checkForMines = (boardItems)=>{
  //what happens when the square is clicked
  //check for bombs in surrounding area 
  //opens up the boxes if no bombs are around them 
  let width = 10
  let mines = 20
  let isLeftEdge = false
  let isRightEdge = false
  for(let i=0; i <boardItems.length;i+=1){
    const id = boardItems[i].id
    //logic to show isLeft/RightEdge
    if(id===0 || id%width===0){
      isLeftEdge = true
    }else{isLeftEdge=false}
    if(id%width===width-1){
      isRightEdge = true
    }else{isRightEdge=false}
    //topleft of square
    if(id>10 && !isLeftEdge && boardItems[i-10-1].content === 'mine'){
      boardItems[i].bombsAround +=1
    }
    //top of square  
    if(id>9 && boardItems[i-10].content==='mine'){
      boardItems[i].bombsAround +=1
    }
    //topRight of square
    if(id>9 && !isRightEdge && boardItems[i-10+1].content==='mine'){
      boardItems[i].bombsAround +=1
    }
    //left of square
    if(!isLeftEdge && boardItems[i-1].content==='mine'){
      boardItems[i].bombsAround +=1
    }
    //right of square
    if(!isRightEdge && boardItems[i+1].content==='mine'){
      boardItems[i].bombsAround +=1
    }
    //botLeft of square
    if(!isLeftEdge && id<90 && boardItems[i+10-1].content==='mine'){
      boardItems[i].bombsAround +=1
    }
    //bot of square
    if(id<90 && boardItems[i+10].content==='mine'){
      boardItems[i].bombsAround +=1
    }
    //botRight of square
    if(!isRightEdge && id<90 && boardItems[i+10+1].content==='mine'){
      boardItems[i].bombsAround +=1
    }
  }
}
class GameController extends BaseController {
  constructor(model) {
    super(model);
  }
  game(req, res) {
    res.render("./game2.ejs");
  }
  async boardItems(req, res) {
    console.log("running in boardItems")
    //creating the boardItems here to pass to the frontend Script
    let width = 10
    let mines = 20
    const boardItems = []
    //create the backend data akak the board items that are populated
    const mineArray = Array(mines).fill("mine");
    const emptyArray = Array(width * width - mines).fill("empty");
    const gameArray = emptyArray.concat(mineArray);
    //shuffles the array and gives us random placement each time we refresh
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5);
    for( let i=0;i<width*width;i+=1){
      //create boardItems object
      const squareInfo = {
        id: i,
        content: shuffledArray[i],
        bombsAround:0,
        opened: false,
      }
      boardItems.push(squareInfo)
    }
    checkForMines(boardItems)
    const playerId = req.cookies.playerId
    const insertData = await db.games.create({
      playerId: playerId,
      time:0,
      won: false,
      board: {boardItems},
    })
    currentGameId= insertData.dataValues.id
    console.log(boardItems)
    res.send(boardItems);
    //pass the data back to render using the public folder/script.js
    //using res.send
    //take data and send it to DB
  }
  async postGameData (req,res){
    const data = req.body
    const getData = await db.games.update(
      {
        time: data.time,
        won: data.won,
        squaresOpened: data.openedSquares
      },
      {where:{id: currentGameId}})
      if(data.won===true){
        const playerData = await db.players.findOne({where:{id:req.cookies.playerId}})
        const gameData = await db.games.findOne({where:{id: currentGameId}})
        //find the game that is currently being recorded on top and use that to update rankings chart
        const postToRankings = await db.rankings.create({
        playerId: gameData.dataValues.playerId,
        playerName: playerData.dataValues.name,
        playerCountry: playerData.dataValues.country,
        gameId: gameData.dataValues.id,
        gameTime: gameData.dataValues.time,
        gameBoard: gameData.dataValues.board
      })
      }
      //do smth to pass the data into rankings
  }
}

module.exports = GameController;