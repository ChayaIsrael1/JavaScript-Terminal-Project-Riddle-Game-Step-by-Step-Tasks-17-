import Riddle from './Riddle.js'; 

export default class MultipleChoiceRiddle extends Riddle{
    constructor(obj){
        super(obj)
        this.choices = obj.choices;  
    }
    ask(prompt, start) {
        let correct = false
        let timeLimitOver = 0
        while (!correct) {
        console.log(`${this.id} : ${this.name}
        ${this.taskDescription}
        the options: ${this.choices}`)
            const answer = prompt('Enter your answer..');
            if (((Date.now() - start)/1000)>=this.timeLimit && timeLimitOver==0)
            {    console.log(`Too slow! ${this.timeLimit} seconds penalty applied.`);
                timeLimitOver= this.timeLimit}
            if (answer == this.correctAnswer) {
                correct = true
                console.log("---Current answer---")
            }
            else {
                console.log("---Worng answer---")
            }
        }
    return timeLimitOver
    }

}