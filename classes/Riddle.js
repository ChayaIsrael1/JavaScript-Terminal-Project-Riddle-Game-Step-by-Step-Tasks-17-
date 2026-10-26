// The Riddle class. Export it as the default export.
//
// Properties (received in the constructor):
// - id
// - name
// - taskDescription
// - correctAnswer
//
// Method:
// - ask(prompt)
//   - show the riddle (name and taskDescription) to the player
//   - ask the player for an answer using the `prompt` function that is passed in
//   - keep asking until the answer is correct
export default class Riddle {
    constructor(obj) {
        this.id = obj.id
        this.name = obj.name
        this.taskDescription = obj.taskDescription
        this.correctAnswer = obj.correctAnswer
    }
    ask(prompt) {
        let correct = false
        while (!correct) {
            console.log(`${this.id} : ${this.name}
        ${this.taskDescription}`)
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