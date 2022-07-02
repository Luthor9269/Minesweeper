
//global variables
let width = 10
let mines = 20
let gameOver = false
let timeInSeconds = 1
let firstClick = true
let squaresOpened = 0

//game helper functions
const click = async (allData, currentIndex)=>{
  squaresOpened +=1
  //we need to check if the square has a bomb or not
  const square = document.getElementById(`${currentIndex}`)
  //if square has a mine, end the game
  if(squaresOpened===80){
    square.classList.add('opened')
    gameOver = true
    const messageContainer = document.createElement('div')
    messageContainer.setAttribute('id', 'messageContainer')
    messageContainer.innerText = 'You Won! Congratulations'
    const mainContainer = document.getElementById('mainContainer')
    mainContainer.append(messageContainer)
    console.log('You won')
    //game winning data to be passed back to the router
    const data = {
      time: timeInSeconds,
      won: true,
      openedSquares: squaresOpened,
    }
    const board = document.querySelector('.board')
    setTimeout(()=>{
      board.remove()
      //create buttons to restart and show ranking
      const restartButton = document.createElement('button')
      restartButton.setAttribute('id', 'restartButton')
      restartButton.innerText = 'Play again'
      restartButton.setAttribute('onclick', 'goToGame()')
      const mainContainer = document.getElementById('mainContainer')
      restartButton.setAttribute('onclick', 'goToGame()')
      mainContainer.appendChild(restartButton)
    }, 3000)
    try{
    await axios.post('/game/postGameData', data)
    }
    catch(err){
      console.log(err)
    }
    //do something here
    return
  }
  if(square.classList.contains('mine')){
    squaresOpened-=1
    console.log('game over')
    square.classList.add('bomb')
    gameOver = true
    const messageContainer = document.createElement('div')
    messageContainer.setAttribute('id', 'messageContainer')
    messageContainer.innerText = 'You opened a mine!'
    const mainContainer = document.getElementById('mainContainer')
    mainContainer.append(messageContainer)
    //send data back to the DB through an axios call
    //opens up all the bombs
    for(let i=0; i<allData.length; i+=1){
      if(allData[i].content==='mine'){
        const square2 = document.getElementById(`${i}`)
        //here need to make an axios call to POST, update the boardItem in the DATABASE
        square2.classList.add('bomb')
        square2.innerText = '💣 '
      }
    }
    const data = {
      time: timeInSeconds,
      won: false,
      openedSquares: squaresOpened,
    }
    const board = document.querySelector('.board')
    setTimeout(()=>{
      board.remove()
      //create buttons to restart and show ranking
      const restartButton = document.createElement('button')
      restartButton.setAttribute('id', 'restartButton')
      restartButton.innerText = 'Play again'
      const mainContainer = document.getElementById('mainContainer')
      restartButton.setAttribute('onclick', 'goToGame()')
      mainContainer.appendChild(restartButton)
    }, 3000)
    try{
    await axios.post('/game/postGameData', data)
    }
    catch(err){
      console.log(err)
    }
    return
  }
  if(square.classList.contains('opened')){
    squaresOpened-=1
    return
  }

  if(allData[currentIndex].bombsAround>0){
    //here need to make an axios call to POST, update the boardItem in the DATABASE
    square.classList.add('opened')
    square.innerText = allData[currentIndex].bombsAround
  }
  if(allData[currentIndex].bombsAround===0){
    square.classList.add('opened')
    let isLeftEdge = false
    let isRightEdge = false
      //defining isleft/right edge
    if(currentIndex===0 || currentIndex%width===0){
        isLeftEdge = true
      }else{isLeftEdge=false}
    if(currentIndex%width===width-1){
        isRightEdge = true
      }else{isRightEdge=false}

    setTimeout(()=>{
          //top left
          if(currentIndex>10 && !isLeftEdge ){
          click(allData, currentIndex-10-1)
        }
        //top
        if(currentIndex>9 ){
          click(allData, currentIndex-10)
        }
        //top right
        if(currentIndex>9 && !isRightEdge){
          click(allData, currentIndex-10+1)
        }
        //left
        if(!isLeftEdge ){
          click(allData, currentIndex-1)
        }
        //right 
        if(!isRightEdge ){
          click(allData, currentIndex+1)
        }
        //bot left
        if(currentIndex<90 && !isLeftEdge ){
          click(allData, currentIndex+10-1)
        }
        //bot 
        if(currentIndex<90 ){
          click(allData, currentIndex+10)
        }
        //bot right
        if(!isRightEdge && currentIndex<90 ){
          click(allData, currentIndex+10+1)
        }

        }, 10)
        return
    }
  }

//check for win or loss 
const checkWin = (allData)=>{
  allData.forEach((contents)=>{
    if(contents.contents==='opened'){
      squaresOpened+=1
    }
  })
  console.log(squaresOpened)
}

//board addEventlistener function
const boardEventFunction = ()=>{
  //to ensure the event listeneer doesnt run at every click on the board
  if(firstClick===false){
    return
  }

  const timerContainer = document.createElement('div')
  timerContainer.setAttribute('id','timerContainer')
  const timerDisplay = document.createElement('div')
  timerDisplay.setAttribute('id','timerDisplay')
  const mainContainer = document.getElementById('mainContainer')
  mainContainer.appendChild(timerContainer)
  timerContainer.append(timerDisplay)

  const ref = setInterval(() => {
    timerDisplay.innerText = `⏲️ ${timeInSeconds} Seconds`
    timeInSeconds+=1
    //adding the stop button inside here
    if(gameOver ===true){
      clearInterval(ref)
    }
    //if this is the first click then change variable to false so it doesnt repeat
    if(firstClick===true){
      firstClick = false
    }
  }, 1000);
}


const createButton = document.getElementById('createButton')
//button that runs in backend to create board data
createButton.addEventListener('click', async ()=>{
  //hides the button after pressing
  createButton.setAttribute('style', 'display:none')
  const data = await axios.get('/game/boardItems')
  const allData = data.data
  //use this data to create board div, square div, square div information and classes
  const board = document.createElement('div')
  const mainContainer = document.getElementById('mainContainer')
  board.classList.add('board')
  mainContainer.append(board)
//creating the squares to be placed inside the board element
//giving the squares unique ids and classes through the boardItems object
  for( let i=0;i<width*width;i+=1){
    const currentData = allData[i]
    const square = document.createElement('div')
    square.setAttribute('id', currentData.id)
    square.classList.add(`${currentData.content}`)
    ///////////can change here
    square.innerText = currentData.content
    square.addEventListener('click', ()=>{
      click(allData, i)
    })
    board.appendChild(square)
    
  }
//adding eventListener to board
board.addEventListener('click', boardEventFunction)

})

