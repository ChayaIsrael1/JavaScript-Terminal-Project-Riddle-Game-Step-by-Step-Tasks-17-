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
        this.difficulty = obj.difficulty
        this.taskDescription = obj.taskDescription
        this.correctAnswer = obj.correctAnswer
        this.timeLimit = obj.timeLimit
        this.hint = obj.hint
    }
    ask(prompt, start) {
        let correct = false
        let timeLimitOver = 0
        let usehint = 0  

        while (!correct) {
            console.log(`${this.id} : ${this.name}
        ${this.taskDescription}`)
            const answer = prompt('Enter your answer.. for hint press H (that will add time to your )');
            if (answer=="H" && usehint==0)
            {    console.log(`The hint: ${this.hint}. seconds penalty applied.`);
                usehint= 10}
            if (((Date.now() - start)/1000)>this.timeLimit && timeLimitOver==0)
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
    return timeLimitOver+usehint
    }
}