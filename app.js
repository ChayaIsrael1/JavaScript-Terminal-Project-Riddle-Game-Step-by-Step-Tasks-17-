// Entry point of the game. Run it with: node app.js
//
// This file should:
// 1. Import PromptSync (from 'prompt-sync') and create the `prompt` function.
// 2. Import the Riddle class, the Player class, and the array of all riddles (from riddles/index.js).
// 3. Show a welcome message and ask the player for their name, then create a Player object.
// 4. Loop over all riddles. For each riddle:
//    - save the start time (Date.now())
//    - create a Riddle object and call its ask() method
//    - save the end time (Date.now())
//    - save the time using player.recordTime()
// 5. After the loop, call player.showStats() to show total time and average time per riddle.

import PromptSync from 'prompt-sync';
const prompt = PromptSync()
import AllRiddles from './riddles/index.js';
import Player from './classes/Player.js'
import Riddle from './classes/Riddle.js'
import MultipleChoiceRiddle from './classes/MultipleChoiceRiddle.js';
import AllRiddles1 from './multipleChoiceRiddle/index.js'


console.log("Welcome to our game")
const myName = prompt(`What is your name?`);
const times = []
const p1 = new Player(myName, times)
console.log(`Hello ${myName} ,your user is ready`);
const choice = prompt(`To play game with choices enter 1, to play the regular game enter any other char`);
const level = prompt('Choose difficulty: easy / medium / hard: ');
if (choice !=1 )
{   const filterAllRiddles = AllRiddles.filter((riddle)=>{
    if (riddle.difficulty == level)
    {return true}
    })
    for(let i = 0; i<filterAllRiddles.length;i++){
    const startTime = Date.now()
    const R = new Riddle(filterAllRiddles[i])
    const addTime=R.ask(prompt, startTime)
    let endTime = Date.now()
    if (addTime)
    {endTime+=addTime}
    p1.recordTime(startTime,endTime)
}}
else {
    const filterAllRiddles = AllRiddles1.filter((riddle)=>{
    if (riddle.difficulty == level)
    {return true}
    })
    for(let i = 0; i<filterAllRiddles.length;i++){
    const startTime = Date.now()
    const R = new MultipleChoiceRiddle(filterAllRiddles[i])
    const addTime= R.ask(prompt, startTime)
    let endTime = Date.now()
    if (addTime)
    {endTime=endTime + addTime*1000}
    p1.recordTime(startTime,endTime)
}
}
p1.showStats()
