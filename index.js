import Grid from './grid.js'

const gridItems = [];
let currentLevel = 0
let moves = 0 //count of player moves

//get references to the 25 grid lights that make up the playboard
for (let i = 0; i <= 24; i++){
    const gridItem = document.getElementById(`${i}`)
    gridItems.push(gridItem)
}

//find the adjacent lights (up, down, left, right) and toggle their lights on / off
const lightClick = node => {
    console.log("Clicked: " + node.id)
    const adjacentLights = findAdjacentLights(node.id)
    console.log(adjacentLights)
    Object.values(adjacentLights).forEach(light =>{
        if (light != null){ //because the adjacents which are over the edge of the board are marked "null", we must check for that value before calling toggleLight()
            toggleLight(gridItems[light]) 
        }
    })
    moves++
    const remainingLights = countTotalLights();
    console.log("Remaining Lights: " + remainingLights)
    if (remainingLights <= 0){
        console.log("Victory!")
        levelCleared();
    }
    
}

//determine which lights are above, below, left, and right 
const findAdjacentLights = id => {
    const left = checkForLeftEdge(id, parseInt(id, 10) - 1)
    const up = checkForTopEdge(id, parseInt(id, 10) - 5)
    const right = checkForRightEdge(id, parseInt(id, 10) + 1)
    const down = checkForBottomEdge(id, parseInt(id, 10) + 5)
    
    return { id, up, down, left, right }
}

//turn illuminated lights off and vice versa
const toggleLight = light =>{
    light.classList.toggle('illuminated')

}

//used to help determine if the player has cleared the level
const countTotalLights = () => {
    const illuminatedLights = document.querySelectorAll('.illuminated')
    return illuminatedLights.length
}

const levelCleared = () => {
    currentLevel += 1
    const victoryPanel = document.getElementById('level-cleared')
    victoryPanel.classList.remove('hide')
    const moveCountText = document.getElementById('move-count')
    moveCountText.innerText = "Cleared in " + moves + " moves."
    const startNextLevelButton = document.getElementById('next-level-button')
    startNextLevelButton.addEventListener('click', function(){
        victoryPanel.classList.add('hide')
        beginNewLevel(levels[currentLevel])
    })

}

//these 4 helper methods prevent passing nonsense values for above / left / right / below light values
const checkForTopEdge = (clicked, potentialAdjacent) =>{
    //console.log("Checking " + potentialAdjacent)
    //console.log("Is it 0?" + clicked % 5)
    if (potentialAdjacent >= 0){
        //console.log("returning " + potentialAdjacent)
        return potentialAdjacent
    } else{
        //console.log("returning null")
        return null
    }
}

const checkForLeftEdge = (clicked, potentialAdjacent) =>{
    if (clicked % 5 != 0){
        return potentialAdjacent
    } else {
        return null
    }
}

const checkForRightEdge = (clicked, potentialAdjacent) =>{
    console.log("checking " + clicked)
    
    
    if ((parseInt(clicked, 10) + 1) % 5 != 0){
        return potentialAdjacent
    } else {
        return null
    }

}

const checkForBottomEdge = (clicked, potentialAdjacent) => {
    if (potentialAdjacent <= 24){
        return potentialAdjacent
    } else {
        return null
    }
}

//expects an array of integers <= 24
const beginNewLevel = initialLights =>{
    //first turn off all active lights
    console.log(initialLights)
    gridItems.forEach(item =>{
        if (item.classList.contains('illuminated')){
            item.classList.remove('illuminated')
        }
    })

    //then turn on the indicated lights
    initialLights.forEach(light =>{
        gridItems[light].classList.add('illuminated')
    })

    moves = 0;
}

const restartCurrentLevel = () =>{
    beginNewLevel(levels[currentLevel])
}

gridItems.forEach(item =>{
    item.addEventListener('click', () => lightClick(item))
})

const level0 = [10,12,14]
const level1 = [7,11,13,17]
const level2 = [5,7,9,15,17,19]

const levels = [level0,level1,level2]

const restartCurrentLevelButton = document.getElementById('restart-current-level')
restartCurrentLevelButton.addEventListener('click', () => restartCurrentLevel())

beginNewLevel(levels[currentLevel])