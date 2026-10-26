// The Player class. Export it as the default export.
//
// Properties:
// - name
// - times (an array that holds the time it took to solve each riddle)
//
// Methods:
// - recordTime(start, end)
//   - calculate the duration (end - start) and add it to the times array
// - showStats()
//   - show the total time and the average time per riddle
export default class Player{
    constructor(name,times){
        this.name = name
        this.times = times
    }
    recordTime(start, end){
        this.times.push((end-start)/1000)
    }
    showStats(){
    let sum =0 
    this.times.forEach(time => {
        sum+= time
    }); 
    console.log(`Total time: ${sum} sec, average time: ${sum/this.times.length} sec`)
    }
}