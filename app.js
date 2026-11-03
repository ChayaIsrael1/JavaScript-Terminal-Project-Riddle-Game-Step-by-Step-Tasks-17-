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
import Riddle from './classes/Riddle.js'
import MultipleChoiceRiddle from './classes/MultipleChoiceRiddle.js'
import * as riddlesApi from './api/riddlesApi.js'
import * as playersApi from './api/playersApi.js'
import Player from './classes/Player.js';


let Choose
while (Choose != "0") {

Choose = prompt(`What do you want to do?
1. Play the game
2. Create a new riddle
3. Read all riddles
4. Update an existing riddle
5. Delete a riddle
6. View leaderboard
0. Exit
`);
    switch (Choose) {
        case "1":
            {
                console.log("Welcome to our game")
                const myName = prompt(`What is your name?`);
                let p = await playersApi.findPlayerByName(myName)
                let min = 0
                if (p != null){
                    if (p.times.length != 0) {
                        min = Math.min(...p.times)
                        console.log(`Hi ${p.name}! Your previous lowest time was ${min} seconds.`)
                    }
                    else
                    console.log(`Hi ${p.name}!`)
                    const p1 = await game(p)
                    const minN = p1.lowestTime
                    if (min <= minN && min != 0) {
                        console.log("no New record!")
                    }
                    else {
                        await playersApi.updatePlayer(p.id, p1)
                        if (min == 0)
                        console.log("Time saved.")
                        else
                        console.log("New record! Time updated.")
                    }
                }
                else {
                    console.log(`Hi new user!`)
                    p = await playersApi.createPlayer(myName)
                    const p1 =await game(p)
                    await playersApi.updatePlayer(p.id, p1)
                }
                break;
            }
        case "2":
            {
                const name = prompt('enter name please:')
                const taskDescription = prompt('Enter description:')
                const correctAnswer = prompt('Enter correct answer:')
                const difficulty = "easy"
                const rid = {
                    name,
                    taskDescription,
                    correctAnswer,
                    difficulty,
                }
                await riddlesApi.createRiddle(rid)
                break;
            }
        case "3":
            {
                try {
                const riddles = await riddlesApi.getAllRiddles()
                riddles.forEach(riddle => {
                    console.log(`${riddle.name}${riddle.taskDescription}${riddle.correctAnswer}`)
                });
                console.log(riddles)}
                catch(error){console.log("server problem");console.error();}
                break;
            }
        case "4":
            {
                const id = prompt('enter id please:')
                const name = prompt('enter name please:')
                const taskDescription = prompt('Enter description:')
                const correctAnswer = prompt('Enter correct answer:')
                const difficulty = "easy"
                const rid = {
                    name,
                    taskDescription,
                    correctAnswer,
                    difficulty,
                }
                await riddlesApi.updateRiddle(id, rid)
                break;
            }
        case "5":
            {
                const id = prompt('enter id please:')
                await riddlesApi.deleteRiddle(id)
                break;
            }
        case "6":
            {
                try {
                const allPlayers = await playersApi.getAllPlayers();
                const filteredPlayers = allPlayers.filter(p => p.lowestTime !== null && p.lowestTime !== undefined);
                filteredPlayers.sort((a, b) => a.lowestTime - b.lowestTime);
                filteredPlayers.forEach(player => {
                    console.log(`${player.name} - ${player.lowestTime} seconds`);
                });}
                catch(error){console.log("server problem");console.error();}
                break;
            }
        default:
            {
                break;
            }

    }
}

async function game(player) {
    const p1 = new Player(player)
    console.log(`Hello ${player.name} ,your user is ready`);
    const choice = prompt(`To play game with choices enter 1, to play the regular game enter any other char`);
    const level = prompt('Choose difficulty: easy / medium / hard: ');
    let filterAllRiddles
    let server = false
    let trys = 0 
    while(!server && trys<10){
try{
    filterAllRiddles = await riddlesApi.getAllRiddles()
    trys++
    if (filterAllRiddlesundefined)
    server = true
}
catch (error){console.log('error, try again')}    }

    if (level != "easy" && level != "medium" && level != "hard") {
        console.log("All levels")
    }
    else {
        filterAllRiddles = filterAllRiddles.filter((riddle) => {
            if (riddle.difficulty == level) { 
                return true }
        })
    }
    filterAllRiddles = shuffle(filterAllRiddles)
    for (let i = 0; i < filterAllRiddles.length; i++) {
        const startTime = Date.now()
        let R
        if (choice == 1) { R = new MultipleChoiceRiddle(filterAllRiddles[i]) }
        else { R = new Riddle(filterAllRiddles[i]) }
        const addTime = R.ask(prompt, startTime)
        let endTime = Date.now()
        if (addTime) { endTime = endTime + addTime * 1000 }
        p1.recordTime(startTime, endTime)
    }
    p1.showStats()
    console.log(p1)
    return p1
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}