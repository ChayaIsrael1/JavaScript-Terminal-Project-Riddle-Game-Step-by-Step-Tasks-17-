import Riddle from './Riddle.js'; 

export default class MultipleChoiceRiddle extends Riddle{
    constructor(obj){
        super(obj)
        this.choices = obj.choices;  
    }
    ask(prompt) {
        let correct = false
        while (!correct) {
        console.log(`${this.id} : ${this.name}
        ${this.taskDescription}
        the options: ${this.choices}`)
            const answer = prompt('Enter your answer..');
            if (answer == this.correctAnswer) {
                correct = true
                console.log("---Current answer---")
            }
            else {
                console.log("---Worng answer---")
            }
        }
    }

}