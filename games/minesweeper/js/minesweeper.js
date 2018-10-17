document.addEventListener('DOMContentLoaded', function() {
    let completed = false
    const board = document.querySelector('#board')

    const BOARD_SIZE = 10
    const NUM_TILES = BOARD_SIZE**2

    let allTiles = []

    board.addEventListener('contextmenu', (evt) => {
        evt.preventDefault()
    })

    const numLandmines = BOARD_SIZE
    let landminePositions = []

    let isAdjacentSafe

    const placeLandmines = () => {
      while ( landminePositions.length < numLandmines) {
        let position = Math.random() * ((NUM_TILES-1) - 1) + 1
        position = Math.floor(position)
        if (!landminePositions.includes(position)) landminePositions.push(position)
      }
    }

    // Generates array of detailed tiles
    const setTilesDetails = () => {
      allTiles = []
      for(let i=1; i <= NUM_TILES; i++) {
        // Make detailed mineless tiles
        if(!landminePositions.includes(i)) {
          let surroundingTiles = []
          surroundingTiles.push(i-BOARD_SIZE, i+BOARD_SIZE)
          // For tiles on the left:
          if ( (i-1)%BOARD_SIZE === 0 ) {
            surroundingTiles.push(
              i+1, i-(BOARD_SIZE-1), i+(BOARD_SIZE+1)
            )
          // For tiles on right:
          } else if ( i%BOARD_SIZE === 0) {
            surroundingTiles.push(
              i-1, i-(BOARD_SIZE+1), i+(BOARD_SIZE-1)
            )
          // For surrounded tiles
          } else {
            surroundingTiles.push(
              i-1, i+1, i-(BOARD_SIZE+1), i-(BOARD_SIZE-1), i+(BOARD_SIZE-1), i+(BOARD_SIZE+1)
            )
          }

          //Remove tiles outside board
          surroundingTiles = surroundingTiles.filter(tile => (
            tile > 0 && tile <= NUM_TILES
          ))

          let numLandmines = 0
          surroundingTiles.forEach(tile => {
            if(landminePositions.includes(tile)) numLandmines += 1
          })

          const tile = {
            position: i,
            type: 'safe',
            numLandmines,
            surroundingTiles,
            hidden: true,
            flagged: false
          }
          allTiles.push(tile)
        // Make detailes mine tiles
        } else {
          const tile = {
            position: i,
            type: 'landmine',
            hidden: true,
            flagged: false
          }
          allTiles.push(tile)
        }
      }
    }


    const renderTiles = (tiles) => {
      board.innerHTML = ''
      const tilesNodes = document.createDocumentFragment()

      tiles.forEach((tile) => {
        let background = document.createElement('div')

        if (tile.flagged) {
          background.id = tile.position
          background.className = 'flagged'
        } else if (!tile.hidden && tile.type === 'safe') {
          background.className = tile.type
          background.innerHTML = tile.numLandmines !== 0 ? tile.numLandmines : ''
        } else if(!tile.hidden && tile.type === 'landmine' && completed) {
          background.className = 'landmine-green'
        } else if (!tile.hidden && tile.type === 'landmine') {
          background.className = tile.type
        } else {
          background.id = tile.position
          background.className = 'hidden'
        }

        const tileNode = document.createElement('div')
        tileNode.className = 'tile'
        tileNode.append(background)

        tilesNodes.appendChild(tileNode)
      })

      board.appendChild(tilesNodes)
    }

    placeLandmines()
    setTilesDetails()
    renderTiles(allTiles)

    function displayTile(tileId) {
      if (tileId) {
        const tileObj = allTiles[tileId-1]
        if (tileObj.flagged) {
          return
        } else if (tileObj.type === 'landmine') {
          gameLost()
          return
        } else if (tileObj.type === 'safe' && tileObj.numLandmines === 0) {
          tileObj.hidden = false
          openAdjacentClearTiles(tileObj)
        } else {
          tileObj.hidden = false
          renderTiles(allTiles)
        }
        if (checkForWin(allTiles)) gameWon()
      }
    }

    function resetGame() {
      completed = false
      clearTimeout(isAdjacentSafe)
      landminePositions = []
      placeLandmines()
      setTilesDetails()
      renderTiles(allTiles)
    }

    function flagTile(tileId) {
      if (tileId) {
        const tileObj = allTiles[tileId-1]
        tileObj.flagged = !tileObj.flagged
        renderTiles(allTiles)
      }
    }

    function gameLost() {
      allTiles.forEach(tile => {
        tile.hidden = false
        tile.flagged = false
      })
      renderTiles(allTiles)
    }

    function checkForWin(tiles) {
      return tiles.filter(tile => tile.hidden && tile.type === 'safe').length === 0
    }

    function gameWon() {
      completed = true
      allTiles.forEach(tile => {
        tile.hidden = false
        tile.flagged = false
      })
      renderTiles(allTiles)
    }

    function openAdjacentClearTiles(tile) {
      tile.surroundingTiles.forEach(surround => {
        const sibling = allTiles[surround-1]

        if (sibling.type === 'safe' && sibling.hidden) {
          sibling.hidden = false
          if(sibling.numLandmines === 0) {
            isAdjacentSafe = setTimeout(() => {openAdjacentClearTiles(sibling)}, 50)
          }
        }
      })

      renderTiles(allTiles)
    }

    document.addEventListener('mousedown', (event) => {
      const tileId = event.target.id
      switch (event.which) {
        // Handle left click
        case 1:
          displayTile(tileId)
          break
        case 3:
        // Handle right click
          flagTile(tileId)
          break
        default:
          break
      }
    })

    document.querySelector('.reset-button')
      .addEventListener('click', resetGame)
  })
